'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

const BOOKING_STEPS = [
  {
    label: 'Browse Services',
    active: (p: string, _s: string | null) => p === '/services' || p.startsWith('/services/'),
  },
  {
    label: 'Select a Service',
    active: (p: string, s: string | null) => p === '/book' && (s === '1' || s === null),
  },
  {
    label: 'Date & Time',
    active: (p: string, s: string | null) => p === '/book' && s === '2',
  },
  {
    label: 'Your Details',
    active: (p: string, s: string | null) => p === '/book' && s === '3',
  },
  {
    label: 'Review',
    active: (p: string, s: string | null) => p === '/book' && s === '4',
  },
  {
    label: 'Payment',
    active: (p: string, s: string | null) => p === '/book' && s === '5',
  },
  {
    label: 'Confirmation',
    active: (p: string, _s: string | null) => p.startsWith('/booking/confirmation'),
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const stepParam = searchParams.get('step')

  const activeIndex = BOOKING_STEPS.findIndex(s => s.active(pathname, stepParam))

  return (
    <nav
      className="hidden md:flex fixed left-0 top-0 w-[230px] h-screen z-50 flex-col overflow-y-auto"
      style={{ background: '#2C1A0E', scrollbarWidth: 'none' }}
      aria-label="Main navigation"
    >
      {/* Spacer: 40px AdBanner + 62px Header = 102px */}
      <div style={{ height: 102, flexShrink: 0 }} />

      {/* ── Booking flow ── */}
      <div className="pt-1 flex-1">
        <p
          className="px-[18px] pt-4 pb-1.5 text-[9px] uppercase tracking-[2px]"
          style={{ color: 'rgba(245,239,228,0.28)' }}
        >
          Booking Flow
        </p>

        {BOOKING_STEPS.map((step, i) => {
          const isCompleted = activeIndex !== -1 && i < activeIndex
          const isActive = i === activeIndex
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-2.5 px-[18px] py-[9px] border-l-[2.5px] text-[12.5px] transition-all duration-150',
                isActive
                  ? 'border-[#D4AD25] bg-[rgba(212,173,37,0.12)] text-white'
                  : isCompleted
                    ? 'border-[rgba(212,173,37,0.35)] text-white/55'
                    : 'border-transparent text-white/30 cursor-default'
              )}
            >
              <div
                className={cn(
                  'w-[20px] h-[20px] rounded-full border flex items-center justify-center text-[9px] flex-shrink-0 font-medium',
                  isActive
                    ? 'bg-[#D4AD25] border-[#D4AD25] text-[#2C1A0E]'
                    : isCompleted
                      ? 'bg-[rgba(212,173,37,0.22)] border-[rgba(212,173,37,0.45)] text-[#D4AD25]'
                      : 'border-white/15 text-white/30'
                )}
              >
                {isCompleted ? <CheckCircle2 style={{ width: 11, height: 11 }} /> : i + 1}
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
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]" style={{ color: 'rgba(245,239,228,0.68)' }}>Hemavathi</span>
              <span className="text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(212,173,37,0.18)', color: '#D4AD25', border: '1px solid rgba(212,173,37,0.3)', letterSpacing: '0.14em' }}>Founder</span>
            </div>
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
