import Link from 'next/link'
import { Sparkles, Heart, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-white">PranaTatva</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              A sacred space for spiritual healing, manifestation, and inner transformation.
              Guided by ancient wisdom, grounded in compassion.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Sessions are complementary wellness services and are not a substitute for licensed
              medical, psychological, or psychiatric care.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Home'],
                ['/services', 'Services'],
                ['/about', 'About'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-brand-amber transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-amber flex-shrink-0" />
                <a href="mailto:hello@pranatatva.in" className="hover:text-brand-amber transition-colors">
                  hello@pranatatva.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-amber flex-shrink-0" />
                <a href="tel:+919999999999" className="hover:text-brand-amber transition-colors">
                  +91 99999 99999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PranaTatva. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-brand-amber" /> in India
          </p>
        </div>
      </div>
    </footer>
  )
}
