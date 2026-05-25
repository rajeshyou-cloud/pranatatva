'use client'
import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useTheme, DesignTheme } from '@/contexts/ThemeContext'

const DESIGNS: { id: DesignTheme; name: string; dot: string }[] = [
  { id: 'A', name: 'Midnight Cosmos',  dot: '#2C1A0E' },
  { id: 'B', name: 'Sacred Split',     dot: '#F5EFE4' },
  { id: 'C', name: 'Dawn Ritual',      dot: '#B85410' },
  { id: 'D', name: 'Pure Clarity',     dot: '#FBF7F0' },
]

export default function AdBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { theme, setTheme } = useTheme()

  if (dismissed) return null

  return (
    <div
      data-ad-banner
      className="fixed top-0 left-0 right-0 z-[60] h-[40px] flex items-center px-3"
      style={{
        background: 'linear-gradient(90deg,#1A0C04 0%,#2C1A0E 30%,#3D2010 50%,#2C1A0E 70%,#1A0C04 100%)',
        borderBottom: '1px solid rgba(196,120,10,0.28)',
      }}
    >
      {/* ── Design switcher — left ── */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="hidden sm:block text-[8.5px] text-white/28 uppercase tracking-[0.18em] mr-1.5 select-none">
          Design
        </span>
        {DESIGNS.map(d => (
          <button
            key={d.id}
            onClick={() => setTheme(d.id)}
            title={d.name}
            style={{
              position: 'relative',
              width: 26, height: 22,
              borderRadius: '5px',
              fontSize: '10px',
              fontWeight: theme === d.id ? 700 : 400,
              background: theme === d.id
                ? 'rgba(212,173,37,0.18)'
                : 'rgba(255,255,255,0.05)',
              color: theme === d.id ? '#D4AD25' : 'rgba(255,255,255,0.3)',
              border: theme === d.id
                ? '1px solid rgba(212,173,37,0.45)'
                : '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              transition: 'all .15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '3px',
            }}
          >
            {/* Colour dot representing the design palette */}
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: d.dot,
              border: '1px solid rgba(255,255,255,0.2)',
              flexShrink: 0,
            }} />
            {d.id}
          </button>
        ))}
      </div>

      {/* ── Promo text — centre ── */}
      <p className="flex-1 text-[11px] text-white/70 text-center leading-none select-none px-2">
        <span className="text-brand-amber mr-1">✦</span>
        <span className="font-medium text-white/85 hidden sm:inline">Free Discovery Call</span>
        <span className="mx-1.5 text-white/25 hidden sm:inline">·</span>
        <span className="hidden md:inline">Start your healing journey — no obligation, no cost.</span>
        <Link
          href="/contact"
          className="ml-1.5 text-brand-amber hover:text-brand-amber/80 underline underline-offset-2 decoration-brand-amber/40 transition-colors text-[10.5px]"
        >
          Claim free session →
        </Link>
      </p>

      {/* ── Dismiss — right ── */}
      <button
        onClick={() => setDismissed(true)}
        className="w-6 h-6 flex items-center justify-center text-white/28 hover:text-white/65 transition-colors rounded shrink-0"
        aria-label="Dismiss"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}
