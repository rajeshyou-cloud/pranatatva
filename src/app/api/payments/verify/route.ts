import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminSupabase } from '@/lib/supabase/admin'
import { sendBookingConfirmationEmail, sendPractitionerAlertEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingRef,
  } = await req.json()

  // Verify Razorpay signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminSupabase()

  const { data: booking, error } = await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      payment_status: 'paid',
      payment_id: razorpay_payment_id,
    })
    .eq('booking_ref', bookingRef)
    .select('id, booking_ref, client_name, client_email, client_phone, amount_paise, zoom_link, slot_id, services(name), practitioners(name, zoom_link)')
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendBookingConfirmationEmail(booking as any).catch(console.error)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendPractitionerAlertEmail(booking as any).catch(console.error)

  return NextResponse.json({ success: true })
}
