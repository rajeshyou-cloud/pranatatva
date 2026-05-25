import { Resend } from 'resend'
import { formatINR } from './utils'

function getResend() { return new Resend(process.env.RESEND_API_KEY!) }
const FROM = () => process.env.EMAIL_FROM!
const ADMIN = () => process.env.ADMIN_EMAIL!

interface BookingRecord {
  booking_ref: string
  client_name: string
  client_email: string
  client_phone: string
  amount_paise: number
  zoom_link: string | null
  slot_id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  practitioners?: any
}

export async function sendBookingConfirmationEmail(booking: BookingRecord) {
  const svc = Array.isArray(booking.services) ? booking.services[0] : booking.services
  const prac = Array.isArray(booking.practitioners) ? booking.practitioners[0] : booking.practitioners
  const serviceName = svc?.name ?? 'Session'
  const practitionerName = prac?.name ?? 'Practitioner'
  const zoomLink = booking.zoom_link ?? prac?.zoom_link ?? '#'

  await getResend().emails.send({
    from: FROM(),
    to: booking.client_email,
    subject: `Booking Confirmed — ${serviceName} | PranaTatva`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2C3A;">
        <div style="background: linear-gradient(135deg, #3D1A6E, #6B3FA0); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; font-size: 28px; margin: 0;">PranaTatva</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Your booking is confirmed</p>
        </div>
        <div style="background: #FDF6EC; padding: 32px; border-radius: 0 0 12px 12px;">
          <p>Dear ${booking.client_name},</p>
          <p>Your session has been successfully booked. We look forward to welcoming you.</p>
          <div style="background: white; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #3D1A6E;">
            <p style="margin: 0 0 8px;"><strong>Booking Reference:</strong> ${booking.booking_ref}</p>
            <p style="margin: 0 0 8px;"><strong>Service:</strong> ${serviceName}</p>
            <p style="margin: 0 0 8px;"><strong>Practitioner:</strong> ${practitionerName}</p>
            <p style="margin: 0 0 8px;"><strong>Amount Paid:</strong> ${formatINR(booking.amount_paise)}</p>
          </div>
          <div style="background: #3D1A6E; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); margin: 0 0 8px; font-size: 14px;">Join your session via:</p>
            <a href="${zoomLink}" style="color: #E8B84B; font-size: 16px; word-break: break-all;">${zoomLink}</a>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 12px;">Please join 5 minutes before your scheduled time.</p>
          </div>
          <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px;">
            This is a complementary wellness service and is not a substitute for licensed medical,
            psychological, or psychiatric care. To reschedule or cancel, email hello@pranatatva.in.
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendPractitionerAlertEmail(booking: BookingRecord) {
  const svc = Array.isArray(booking.services) ? booking.services[0] : booking.services
  const serviceName = svc?.name ?? 'Session'

  await getResend().emails.send({
    from: FROM(),
    to: ADMIN(),
    subject: `New Booking: ${serviceName} — ${booking.booking_ref}`,
    html: `
      <p><strong>New booking received!</strong></p>
      <p><strong>Ref:</strong> ${booking.booking_ref}</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Client:</strong> ${booking.client_name}</p>
      <p><strong>Email:</strong> ${booking.client_email}</p>
      <p><strong>Phone:</strong> ${booking.client_phone}</p>
      <p><strong>Amount:</strong> ${formatINR(booking.amount_paise)}</p>
    `,
  })
}
