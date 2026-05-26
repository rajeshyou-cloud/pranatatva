import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingRef } = body

  // Demo / free mode — no real payment to verify
  if (!process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ success: true })
  }

  // ── Production path ────────────────────────────────────────────────
  try {
    const crypto = (await import('crypto')).default

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const { createAdminSupabase } = await import('@/lib/supabase/admin')
    const supabase = createAdminSupabase()

    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed', payment_status: 'paid', payment_id: razorpay_payment_id })
      .eq('booking_ref', bookingRef)
      .select(`
        id,
        booking_ref,
        client_name,
        client_email,
        client_phone,
        amount_paise,
        services ( name ),
        practitioners ( name, zoom_link ),
        availability_slots ( slot_date, slot_time )
      `)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: 'Could not update booking.' }, { status: 500 })
    }

    await supabase.from('payments').insert({
      booking_id: booking.id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount_paise: booking.amount_paise,
      status: 'paid',
    })

    // Fire-and-forget emails
    import('@/lib/email')
      .then(({ sendBookingConfirmationEmail, sendPractitionerAlertEmail }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const b = booking as any
        const emailRecord = {
          booking_ref: booking.booking_ref,
          client_name: booking.client_name,
          client_email: booking.client_email,
          client_phone: booking.client_phone,
          amount_paise: booking.amount_paise,
          service_name: b.services?.name ?? 'Session',
          practitioner_name: b.practitioners?.name ?? 'Practitioner',
          slot_date: b.availability_slots?.slot_date ?? undefined,
          slot_time: b.availability_slots?.slot_time ?? undefined,
          zoom_link: b.practitioners?.zoom_link ?? null,
        }
        sendBookingConfirmationEmail(emailRecord).catch(console.error)
        sendPractitionerAlertEmail(emailRecord).catch(console.error)
      })
      .catch(console.error)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('[payments/verify]', e)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}
