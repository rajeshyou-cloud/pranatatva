import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with PranaTatva for enquiries, corporate wellness programs, or any questions about our sessions.',
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@pranatatva.in',
    href: 'mailto:hello@pranatatva.in',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Chat',
    value: 'Click to chat on WhatsApp',
    href: 'https://wa.me/919999999999',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours on working days',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <>
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <h1 className="section-title mb-4">Let&rsquo;s Connect</h1>
            <p className="section-subtitle">
              Have a question, want to enquire about corporate wellness programs, or just want
              to know which session is right for you? We&rsquo;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* Form */}
            <ContactForm />

            {/* Contact details */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-violet mb-8">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-6">
                {contactInfo.map(info => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-brand-charcoal hover:text-brand-violet transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-brand-charcoal font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-brand-violet/5 border border-brand-violet/10">
                <h3 className="font-display text-lg font-semibold text-brand-violet mb-2">
                  Corporate Wellness Enquiries
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Interested in wellness programs for your team? We offer group healing sessions,
                  subscription plans, and consolidated GST invoicing for corporate clients.
                  Reach out and we&rsquo;ll put together a custom proposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
