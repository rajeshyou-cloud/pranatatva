import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createAdminSupabase } from '@/lib/supabase/admin'
import type { BookingData } from '@/components/booking/BookingFlow'

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
}

export async function POST(req: NextRequest) {
  const body: BookingData = await req.json()

  if (!body.intakeConsent) {
    return NextResponse.json({ error: 'Intake consent is required.' }, { status: 400 })
  }

  const supabase = createAdminSupabase()

  // Lock the slot
  const { error: slotErr } = await supabase
    .from('availability_slots')
    .update({ is_available: false })
    .eq('id', body.slotId)
    .eq('is_available', true)

  if (slotErr) {
    return NextResponse.json({ error: 'Slot no longer available. Please choose another.' }, { status: 409 })
  }

  // Create booking record
  const { data: booking, error: bookingErr } = await supabase
    .from('bookings')
    .insert({
      service_id: body.serviceSlug,
      practitioner_id: body.practitionerId,
      slot_id: body.slotId,
      client_name: body.clientName,
      client_email: body.clientEmail,
      client_phone: body.clientPhone,
      client_concern: body.clientConcern || null,
      intake_consent: true,
      intake_consent_at: new Date().toISOString(),
      whatsapp_opt_in: body.whatsappOptIn,
      status: 'pending',
      payment_status: 'pending',
      amount_paise: body.pricePaise,
    })
    .select('booking_ref')
    .single()

  if (bookingErr || !booking) {
    return NextResponse.json({ error: 'Could not create booking.' }, { status: 500 })
  }

  // Create Razorpay order
  const order = await getRazorpay().orders.create({
    amount: body.pricePaise,
    currency: 'INR',
    receipt: booking.booking_ref,
    notes: {
      booking_ref: booking.booking_ref,
      service: body.serviceName,
      client: body.clientName,
    },
  })

  return NextResponse.json({
    orderId: order.id,
    bookingRef: booking.booking_ref,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  })
}
