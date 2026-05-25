'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/services',  label: 'Services' },
  { href: '/about',     label: 'About Us' },
  { href: '/contact',   label: 'Contact' },
]

export default function Header({ sidebarVisible = false }: { sidebarVisible?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={`fixed top-[40px] right-0 z-40 h-[62px] bg-brand-charcoal border-b border-white/[0.07] transition-all duration-300 ${sidebarVisible ? 'left-0 md:left-[230px]' : 'left-0'}`}
    >
      <div className="h-full px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 h-full py-1">
          <Image
            src="/Logo.png"
            alt="PranaTatva"
            width={48}
            height={44}
            style={{ objectFit: 'contain' }}
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[20px] text-white leading-none">
              Prana<span className="text-brand-amber">Tatva</span>
            </span>
            <span className="text-[10.5px] italic tracking-wide text-white/40 leading-none mt-1">
              Art of Healing
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-white/65 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="text-[11px] text-white/50 border border-white/20 rounded-full px-3 py-1.5 cursor-pointer hover:text-white/80 transition-colors select-none">
            EN · हि · తె
          </span>
          <button className="text-[13px] text-white/75 border border-white/25 rounded-full px-4 py-1.5 hover:text-white transition-colors">
            Sign in
          </button>
          <Link
            href="/services"
            className="text-[13px] font-medium bg-brand-amber text-white rounded-full px-5 py-1.5 hover:bg-brand-purple transition-colors"
          >
            Book a session
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'absolute top-[62px] left-0 right-0 bg-brand-charcoal border-t border-white/10 md:hidden transition-all duration-200',
        mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      )}>
        <nav className="px-6 py-5 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm text-white/70 hover:text-white py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/services" className="btn-primary w-full justify-center mt-3">
            Book a Session
          </Link>
        </nav>
      </div>
    </header>
  )
}
