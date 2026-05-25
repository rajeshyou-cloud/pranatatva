'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card text-center py-14">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Send className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-brand-violet mb-2">Message Sent!</h3>
        <p className="text-gray-600">We&rsquo;ll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <h2 className="font-display text-2xl font-semibold text-brand-violet">Send a Message</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="name">Full Name *</label>
          <input id="name" name="name" required className="input-field" placeholder="Priya Sharma" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email Address *</label>
          <input id="email" name="email" type="email" required className="input-field" placeholder="priya@example.com" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="phone">Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" className="input-field" placeholder="+91 98765 43210" />
      </div>

      <div>
        <label className="label" htmlFor="subject">Subject *</label>
        <select id="subject" name="subject" required className="input-field">
          <option value="">Select a topic…</option>
          <option value="session_enquiry">Session Enquiry</option>
          <option value="corporate_wellness">Corporate Wellness</option>
          <option value="which_session">Which session is right for me?</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us a little about what you're looking for…"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or WhatsApp us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
        <Send className="ml-2 w-4 h-4" />
      </button>
    </form>
  )
}
