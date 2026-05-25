import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { name, email, phone, subject, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY!)
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    replyTo: email,
    subject: `PranaTatva Contact: ${subject ?? 'New message'}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ?? '—'}</p>
      <p><strong>Subject:</strong> ${subject ?? '—'}</p>
      <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>
    `,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
