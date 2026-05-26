import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Calendar, Clock, Mail, Download } from 'lucide-react'

export const metadata: Metadata = { title: 'Booking Confirmed' }

export default function ConfirmationPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams.ref ?? '—'

  return (
    <section className="py-24 bg-brand-cream min-h-screen">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="font-display text-4xl font-semibold text-brand-violet mb-3">
          You&rsquo;re Booked!
        </h1>
        <p className="text-gray-600 mb-2">
          Your healing session has been confirmed.
        </p>
        <p className="text-sm font-mono bg-brand-violet/10 text-brand-violet px-4 py-2 rounded-lg inline-block mb-8">
          Booking Ref: <strong>{ref}</strong>
        </p>

        {/* What happens next */}
        <div className="card text-left space-y-4 mb-8">
          <h2 className="font-display text-xl font-semibold text-brand-violet">What happens next?</h2>
          <div className="space-y-3">
            {[
              { icon: Mail, text: 'A booking confirmation email with your invoice has been sent to your inbox.' },
              { icon: Calendar, text: 'You will receive a reminder email 24 hours and 1 hour before your session.' },
              { icon: Clock, text: 'Join the Zoom video link 5 minutes before your session start time.' },
              { icon: Download, text: 'Your GST-compliant invoice is attached to your email.' },
            ].map(item => (
              <div key={item.text} className="flex items-start gap-3">
                <item.icon className="w-5 h-5 text-brand-violet flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/services" className="btn-secondary flex-1">
            Book Another Session
          </Link>
          <Link href="/" className="btn-primary flex-1">
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Need to reschedule or cancel? Email us at{' '}
          <a href="mailto:hello@pranatatva.in" className="text-brand-violet hover:underline">
            hello@pranatatva.in
          </a>
        </p>
      </div>
    </section>
  )
}
