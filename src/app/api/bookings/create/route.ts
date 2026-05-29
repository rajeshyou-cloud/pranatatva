import { NextRequest, NextResponse } from 'next/server'
import type { BookingData } from '@/components/booking/BookingFlow'

function demoRef(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `PT-${ts}-${rand}`
}

export async function POST(req: NextRequest) {
  const body: BookingData = await req.json()

  if (!body.intakeConsent) {
    return NextResponse.json({ error: 'Intake consent is required.' }, { status: 400 })
  }

  const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasRazorpay = !!process.env.RAZORPAY_KEY_ID

  // Full demo — no Supabase at all
  if (!hasSupabase) {
    return NextResponse.json({ bookingRef: demoRef(), orderId: 'demo', keyId: null, demo: true })
  }

  // ── Supabase is connected ──────────────────────────────────
  try {
    const { createAdminSupabase } = await import('@/lib/supabase/admin')
    const supabase = createAdminSupabase()

    // Resolve slugs to UUIDs
    console.log('[bookings/create] looking up service slug:', body.serviceSlug, '| practitioner slug:', body.practitionerId)

    const [serviceResult, practitionerResult] = await Promise.all([
      supabase.from('services').select('id').eq('slug', body.serviceSlug).single(),
      supabase.from('practitioners').select('id').eq('slug', body.practitionerId).single(),
    ])

    console.log('[bookings/create] service result:', JSON.stringify({ data: serviceResult.data, error: serviceResult.error }))
    console.log('[bookings/create] practitioner result:', JSON.stringify({ data: practitionerResult.data, error: practitionerResult.error }))

    if (!serviceResult.data || !practitionerResult.data) {
      return NextResponse.json({ error: 'Service or practitioner not found.' }, { status: 404 })
    }

    const service = serviceResult.data
    const practitioner = practitionerResult.data

    // Lock the slot
    const { error: slotErr } = await supabase
      .from('availability_slots')
      .update({ is_available: false })
      .eq('id', body.slotId)
      .eq('is_available', true)

    if (slotErr) {
      return NextResponse.json(
        { error: 'Slot no longer available. Please choose another.' },
        { status: 409 },
      )
    }

    // Create booking record
    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .insert({
        service_id: service.id,
        practitioner_id: practitioner.id,
        slot_id: body.slotId,
        client_name: body.clientName,
        client_email: body.clientEmail,
        client_phone: body.clientPhone,
        client_concern: body.clientConcern || null,
        intake_consent: true,
        intake_consent_at: new Date().toISOString(),
        whatsapp_opt_in: body.whatsappOptIn,
        status: 'pending',
        payment_status: body.pricePaise === 0 ? 'free' : 'pending',
        amount_paise: body.pricePaise,
      })
      .select('booking_ref')
      .single()

    if (bookingErr || !booking) {
      return NextResponse.json({ error: 'Could not create booking.' }, { status: 500 })
    }

    // Free bookings — confirm immediately and send emails
    if (body.pricePaise === 0) {
      await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('booking_ref', booking.booking_ref)

      const emailRecord = {
        booking_ref: booking.booking_ref,
        client_name: body.clientName,
        client_email: body.clientEmail,
        client_phone: body.clientPhone,
        amount_paise: 0,
        service_name: body.serviceName,
        practitioner_name: body.practitionerName,
        slot_date: body.slotDate,
        slot_time: body.slotTime,
        zoom_link: null,
      }

      console.log('[bookings/create] free booking confirmed, sending emails')
      console.log('[bookings/create] RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)
      console.log('[bookings/create] EMAIL_FROM:', process.env.EMAIL_FROM)
      console.log('[bookings/create] client email:', body.clientEmail, '| admin email:', process.env.ADMIN_EMAIL)

      const { sendBookingConfirmationEmail, sendPractitionerAlertEmail } = await import('@/lib/email')
      const [clientResult, adminResult] = await Promise.allSettled([
        sendBookingConfirmationEmail(emailRecord),
        sendPractitionerAlertEmail(emailRecord),
      ])
      if (clientResult.status === 'rejected') console.error('[bookings/create] client email failed:', clientResult.reason)
      else console.log('[bookings/create] client email sent ok')
      if (adminResult.status === 'rejected') console.error('[bookings/create] admin email failed:', adminResult.reason)
      else console.log('[bookings/create] admin email sent ok')

      return NextResponse.json({ bookingRef: booking.booking_ref, orderId: 'free', keyId: null })
    }

    // Paid booking — no Razorpay configured yet, simulate payment
    if (!hasRazorpay) {
      return NextResponse.json({
        bookingRef: booking.booking_ref,
        orderId: 'demo',
        keyId: null,
        demo: true,
      })
    }

    // ── Real Razorpay ──────────────────────────────────────────
    const Razorpay = await import('razorpay').then(m => m.default)
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const order = await rzp.orders.create({
      amount: body.pricePaise,
      currency: 'INR',
      receipt: booking.booking_ref,
      notes: { booking_ref: booking.booking_ref, service: body.serviceName, client: body.clientName },
    })

    return NextResponse.json({
      orderId: order.id,
      bookingRef: booking.booking_ref,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (e) {
    console.error('[bookings/create]', e)
    return NextResponse.json({ error: 'Internal error. Please try again.' }, { status: 500 })
  }
}
