'use client'

import { Shield } from 'lucide-react'
import type { BookingData } from './BookingFlow'

interface Props {
  data: Partial<BookingData>
  onNext: (update: Partial<BookingData>) => void
  onBack: () => void
}

export default function StepCustomerForm({ data, onNext, onBack }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onNext({
      clientName: fd.get('name') as string,
      clientEmail: fd.get('email') as string,
      clientPhone: fd.get('phone') as string,
      clientConcern: fd.get('concern') as string,
      whatsappOptIn: fd.get('whatsapp') === 'on',
      intakeConsent: fd.get('consent') === 'on',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <h2 className="font-display text-2xl font-semibold text-brand-violet">Your Details</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="name">Full Name *</label>
          <input
            id="name" name="name" required defaultValue={data.clientName}
            className="input-field" placeholder="Priya Sharma"
          />
        </div>
        <div>
          <label className="label" htmlFor="email">Email Address *</label>
          <input
            id="email" name="email" type="email" required defaultValue={data.clientEmail}
            className="input-field" placeholder="priya@example.com"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="phone">WhatsApp / Phone *</label>
        <input
          id="phone" name="phone" type="tel" required defaultValue={data.clientPhone}
          className="input-field" placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label className="label" htmlFor="concern">
          What brings you to this session? (Optional)
        </label>
        <textarea
          id="concern" name="concern" rows={4} defaultValue={data.clientConcern}
          className="input-field resize-none"
          placeholder="Share a little about your current situation or intention — this helps the practitioner prepare…"
        />
        <p className="text-xs text-gray-400 mt-1">This is private and shared only with your practitioner.</p>
      </div>

      {/* WhatsApp opt-in */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="whatsapp"
          defaultChecked={data.whatsappOptIn}
          className="mt-1 rounded border-gray-300 text-brand-violet focus:ring-brand-violet"
        />
        <span className="text-sm text-gray-600">
          Send me session reminders and booking confirmation via WhatsApp.
          You can opt out at any time by replying STOP.
        </span>
      </label>

      {/* DPDP / intake consent — MANDATORY */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 rounded border-amber-300 text-brand-violet focus:ring-brand-violet"
          />
          <span className="text-sm text-amber-800">
            <span className="font-semibold">I understand and agree *</span><br />
            I understand that PranaTatva offers complementary wellness services and that
            these sessions are <strong>not a substitute for licensed medical, psychological,
            or psychiatric care</strong>. I have read and accept the{' '}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </span>
        </label>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600">
          <Shield className="w-3.5 h-3.5" />
          Your consent is recorded with a timestamp as required by the DPDP Act 2023.
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button type="submit" className="btn-primary flex-1">Review Booking</button>
      </div>
    </form>
  )
}
