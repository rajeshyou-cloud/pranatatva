'use client'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const bookingSteps = [
  { label: 'Browse Services',  href: '/services' },
  { label: 'Service Details',  href: null },
  { label: 'Pick a Slot',      href: null },
  { label: 'Intake Form',      href: null },
  { label: 'Checkout',         href: null },
  { label: 'Confirmation',     href: null },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isOnServices() {
    return pathname === '/services' || pathname.startsWith('/services/')
  }

  return (
    <nav
      className="hidden md:flex fixed left-0 top-0 w-[230px] h-screen z-50 flex-col overflow-y-auto"
      style={{ background: '#2C1A0E', scrollbarWidth: 'none' }}
      aria-label="Main navigation"
    >
      {/* Spacer: 40px AdBanner + 62px Header = 102px — keeps booking flow below the header */}
      <div style={{ height: 102, flexShrink: 0 }} />

      {/* ── Booking flow ── */}
      <div className="pt-1 flex-1">
        <p
          className="px-[18px] pt-4 pb-1.5 text-[9px] uppercase tracking-[2px]"
          style={{ color: 'rgba(245,239,228,0.28)' }}
        >
          Booking Flow
        </p>

        {bookingSteps.map((step, i) => {
          const isActive = step.href ? (step.href === '/services' ? isOnServices() : pathname === step.href) : false
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2.5 px-[18px] py-[9px] border-l-[2.5px] text-[12.5px] transition-all duration-150',
                isActive
                  ? 'border-[#D4AD25] bg-[rgba(212,173,37,0.12)] text-white'
                  : 'border-transparent text-white/38 cursor-default'
              )}
            >
              <div
                className={cn(
                  'w-[20px] h-[20px] rounded-full border flex items-center justify-center text-[9px] flex-shrink-0 font-medium',
                  isActive
                    ? 'bg-[#D4AD25] border-[#D4AD25] text-[#2C1A0E]'
                    : 'border-white/22 text-white/38'
                )}
              >
                {i + 1}
              </div>
              {step.label}
            </div>
          )
        })}
      </div>

      {/* ── Practitioners ── */}
      <div className="px-[18px] py-4 border-t border-white/[0.07]">
        <p className="text-[9px] uppercase tracking-[1.5px] mb-2.5" style={{ color: 'rgba(245,239,228,0.26)' }}>
          Practitioners
        </p>
        <div className="flex items-center gap-2 mb-2.5">
          <div
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0"
            style={{ background: '#8B5A2A' }}
          >
            H
          </div>
          <div>
            <div className="text-[11px]" style={{ color: 'rgba(245,239,228,0.68)' }}>Hemavathi</div>
            <div className="text-[9px] leading-snug" style={{ color: 'rgba(245,239,228,0.32)' }}>Healing · Manifestation</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0"
            style={{ background: '#6A3D8A' }}
          >
            S
          </div>
          <div>
            <div className="text-[11px]" style={{ color: 'rgba(245,239,228,0.68)' }}>Shruthi</div>
            <div className="text-[9px] leading-snug" style={{ color: 'rgba(245,239,228,0.32)' }}>Tarot · Akashic Records</div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-[18px] py-3 border-t border-white/[0.05]" style={{ color: 'rgba(245,239,228,0.22)' }}>
        <p className="text-[10px] leading-[1.75]">
          PranaTatva · Web App v1.0<br />
          Sunrise Ashram Design<br />
          Confidential · May 2026
        </p>
      </div>
    </nav>
  )
}
