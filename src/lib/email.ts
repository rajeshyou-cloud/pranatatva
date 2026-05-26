import { Resend } from 'resend'
import { formatINR, formatDate, formatTime } from './utils'

function getResend() { return new Resend(process.env.RESEND_API_KEY!) }
const FROM = () => process.env.EMAIL_FROM ?? 'PranaTatva <hello@pranatatva.in>'
const ADMIN = () => process.env.ADMIN_EMAIL ?? 'hello@pranatatva.in'

export interface BookingEmailRecord {
  booking_ref: string
  client_name: string
  client_email: string
  client_phone: string
  amount_paise: number
  service_name: string
  practitioner_name: string
  slot_date?: string   // ISO date string e.g. "2026-06-15"
  slot_time?: string   // 24h time string e.g. "14:00"
  zoom_link?: string | null
}

const AMBER = '#C4780A'
const DARK = '#2C1A0E'
const CREAM = '#FBF7F0'
const GOLD = '#D4AD25'
const MUTED = '#9C7A60'

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0ebe3;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:32px auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
    <!-- Header -->
    <div style="background:${DARK};padding:28px 32px;display:flex;align-items:center;gap:12px;">
      <div style="width:36px;height:36px;background:${GOLD};border-radius:50%;display:inline-block;vertical-align:middle;margin-right:12px;"></div>
      <span style="color:${CREAM};font-size:22px;font-weight:bold;letter-spacing:0.05em;vertical-align:middle;">PranaTatva</span>
      <span style="color:${MUTED};font-size:13px;font-style:italic;margin-left:auto;vertical-align:middle;">Art of Healing</span>
    </div>
    <!-- Body -->
    <div style="background:${CREAM};padding:36px 32px;">
      ${content}
    </div>
    <!-- Footer -->
    <div style="background:#efe9df;padding:20px 32px;text-align:center;border-top:1px solid rgba(196,120,10,0.15);">
      <p style="margin:0;font-size:11px;color:${MUTED};line-height:1.7;">
        PranaTatva Spiritual Wellness · hello@pranatatva.in<br>
        This is a complementary wellness service and is not a substitute for licensed medical,
        psychological, or psychiatric care.
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function sendBookingConfirmationEmail(booking: BookingEmailRecord) {
  const zoomLink = booking.zoom_link ?? null
  const slotLine = booking.slot_date && booking.slot_time
    ? `${formatDate(booking.slot_date)} at ${formatTime(booking.slot_time)}`
    : null

  const html = emailWrapper(`
    <h1 style="margin:0 0 6px;font-size:26px;color:${DARK};">You're Booked! 🙏</h1>
    <p style="margin:0 0 24px;color:${MUTED};font-size:15px;">
      Your healing session has been confirmed, ${booking.client_name}.
    </p>

    <!-- Booking card -->
    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;border-left:4px solid ${AMBER};">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;width:40%;">Booking Reference</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;font-weight:bold;font-family:monospace;">${booking.booking_ref}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Service</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.service_name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Practitioner</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.practitioner_name}</td>
        </tr>
        ${slotLine ? `
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Date & Time</td>
          <td style="padding:6px 0;color:${AMBER};font-size:14px;font-weight:bold;">${slotLine}</td>
        </tr>` : ''}
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Amount</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.amount_paise === 0 ? 'Free' : formatINR(booking.amount_paise)}</td>
        </tr>
      </table>
    </div>

    ${zoomLink ? `
    <!-- Zoom link -->
    <div style="background:${DARK};border-radius:12px;padding:24px;margin-bottom:24px;text-align:center;">
      <p style="margin:0 0 8px;color:rgba(255,255,255,0.6);font-size:13px;">Join your session via Zoom:</p>
      <a href="${zoomLink}" style="color:${GOLD};font-size:15px;word-break:break-all;font-weight:bold;">${zoomLink}</a>
      <p style="margin:12px 0 0;color:rgba(255,255,255,0.4);font-size:12px;">Please join 5 minutes before your scheduled time.</p>
    </div>` : `
    <!-- Zoom link pending -->
    <div style="background:#f5f0e8;border-radius:12px;padding:18px 24px;margin-bottom:24px;border:1px solid rgba(196,120,10,0.2);text-align:center;">
      <p style="margin:0;color:${MUTED};font-size:13px;">Your video session link will be sent separately before your session.</p>
    </div>`}

    <!-- What's next -->
    <h2 style="margin:0 0 12px;font-size:16px;color:${DARK};">What happens next?</h2>
    <ul style="margin:0 0 24px;padding-left:20px;color:#555;font-size:14px;line-height:2;">
      <li>You'll receive a reminder 24 hours and 1 hour before your session.</li>
      ${booking.amount_paise > 0 ? '<li>A GST-compliant invoice is attached to this email.</li>' : ''}
      <li>To reschedule or cancel, email <a href="mailto:hello@pranatatva.in" style="color:${AMBER};">hello@pranatatva.in</a> at least 24 hours in advance.</li>
    </ul>

    <p style="margin:0;font-size:13px;color:${MUTED};font-style:italic;">
      With gratitude &amp; healing intentions,<br>
      <strong style="color:${DARK};">The PranaTatva Team</strong>
    </p>
  `)

  await getResend().emails.send({
    from: FROM(),
    to: booking.client_email,
    subject: `Booking Confirmed — ${booking.service_name} | PranaTatva`,
    html,
  })
}

export async function sendPractitionerAlertEmail(booking: BookingEmailRecord) {
  const slotLine = booking.slot_date && booking.slot_time
    ? `${formatDate(booking.slot_date)} at ${formatTime(booking.slot_time)}`
    : 'Slot TBD'

  const html = emailWrapper(`
    <h1 style="margin:0 0 6px;font-size:22px;color:${DARK};">New Booking Received</h1>
    <p style="margin:0 0 24px;color:${MUTED};font-size:14px;">A new session has been confirmed.</p>

    <div style="background:white;border-radius:12px;padding:24px;border-left:4px solid ${AMBER};">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;width:40%;">Booking Ref</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;font-family:monospace;font-weight:bold;">${booking.booking_ref}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Service</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.service_name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Practitioner</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.practitioner_name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Date & Time</td>
          <td style="padding:6px 0;color:${AMBER};font-size:14px;font-weight:bold;">${slotLine}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Client</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.client_name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Email</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;"><a href="mailto:${booking.client_email}" style="color:${AMBER};">${booking.client_email}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Phone</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.client_phone}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:${MUTED};font-size:13px;">Amount</td>
          <td style="padding:6px 0;color:${DARK};font-size:13px;">${booking.amount_paise === 0 ? 'Free' : formatINR(booking.amount_paise)}</td>
        </tr>
      </table>
    </div>
  `)

  await getResend().emails.send({
    from: FROM(),
    to: ADMIN(),
    subject: `New Booking: ${booking.service_name} — ${booking.booking_ref}`,
    html,
  })
}
