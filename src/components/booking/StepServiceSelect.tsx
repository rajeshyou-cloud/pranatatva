'use client'

import { formatINR } from '@/lib/utils'
import type { BookingData } from './BookingFlow'

export const services = [
  {
    slug: 'theta-healing-deep-dive',
    name: 'Theta Healing Deep Dive',
    category: 'Healing · Theta State',
    duration: 60,
    pricePaise: 250000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#3D2010,#6B3A18)',
    btnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
  },
  {
    slug: 'abundance-manifestation',
    name: 'Abundance Manifestation Session',
    category: 'Manifestation · Abundance',
    duration: 75,
    pricePaise: 300000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#1A3028,#2A5038)',
    btnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
  },
  {
    slug: 'tarot-card-reading',
    name: 'Tarot Card Reading',
    category: 'Tarot · Guidance',
    duration: 45,
    pricePaise: 180000,
    practitionerId: 'shru',
    practitionerName: 'Shruthi',
    pracColor: '#6A3D8A',
    pracInitial: 'S',
    heroGrad: 'linear-gradient(135deg,#1E0A38,#3A1860)',
    btnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
  },
  {
    slug: 'spiritual-awakening-mastery',
    name: 'Spiritual Awakening Mastery Program',
    category: 'Training · Certification',
    duration: 0,
    pricePaise: 2200000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#2A1808,#5A3010)',
    btnCls: 'bg-[#B85A3C] hover:bg-[#8B3A28]',
  },
  {
    slug: 'akashic-records-soul-reading',
    name: 'Akashic Records Soul Reading',
    category: 'Akashic Records',
    duration: 60,
    pricePaise: 220000,
    practitionerId: 'shru',
    practitionerName: 'Shruthi',
    pracColor: '#6A3D8A',
    pracInitial: 'S',
    heroGrad: 'linear-gradient(135deg,#0E1A38,#1A3060)',
    btnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
  },
  {
    slug: 'vasthu-consultation',
    name: 'Vasthu Consultation',
    category: 'Consultation · Vasthu',
    duration: 60,
    pricePaise: 50000,
    practitionerId: 'shru',
    practitionerName: 'Shruthi',
    pracColor: '#6A3D8A',
    pracInitial: 'S',
    heroGrad: 'linear-gradient(135deg,#1E0A38,#3A1860)',
    btnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
  },
  {
    slug: 'psychic-consultation',
    name: 'Psychic Consultation',
    category: 'Consultation · Psychic',
    duration: 60,
    pricePaise: 50000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#2A1808,#5A3010)',
    btnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
  },
  {
    slug: 'akashic-consultation',
    name: 'Akashic Consultation',
    category: 'Consultation · Akashic',
    duration: 60,
    pricePaise: 150000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#0E1A2A,#1A3040)',
    btnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
  },
  {
    slug: 'akashic-readings',
    name: 'Akashic Readings',
    category: 'Akashic · Soul Reading',
    duration: 45,
    pricePaise: 510000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#0E1A38,#1A3060)',
    btnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
  },
  {
    slug: 'tarot-reading',
    name: 'Tarot Reading',
    category: 'Tarot · Guidance',
    duration: 45,
    pricePaise: 240000,
    practitionerId: 'shru',
    practitionerName: 'Shruthi',
    pracColor: '#6A3D8A',
    pracInitial: 'S',
    heroGrad: 'linear-gradient(135deg,#1E0A38,#3A1860)',
    btnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
  },
  {
    slug: 'akashic-reading-course',
    name: 'Akashic Reading Course',
    category: 'Course · Certification',
    duration: 0,
    pricePaise: 1500000,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#0E1A38,#1A3058)',
    btnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
  },
  {
    slug: 'tarot-reading-course',
    name: 'Tarot Reading Course',
    category: 'Course · Certification',
    duration: 0,
    pricePaise: 1500000,
    practitionerId: 'shru',
    practitionerName: 'Shruthi',
    pracColor: '#6A3D8A',
    pracInitial: 'S',
    heroGrad: 'linear-gradient(135deg,#1E0A38,#3A1860)',
    btnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
  },
  {
    slug: 'numerology',
    name: 'Numerology',
    category: 'Course · Numerology',
    duration: 0,
    pricePaise: 666600,
    practitionerId: 'shru',
    practitionerName: 'Shruthi',
    pracColor: '#6A3D8A',
    pracInitial: 'S',
    heroGrad: 'linear-gradient(135deg,#1E0A38,#2A1858)',
    btnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
  },
  {
    slug: 'free-discovery-call',
    name: 'Free Discovery Call',
    category: 'Consultation · Free',
    duration: 30,
    pricePaise: 0,
    practitionerId: 'hema',
    practitionerName: 'Hemavathi or Shruthi',
    pracColor: '#8B5A2A',
    pracInitial: 'H',
    heroGrad: 'linear-gradient(135deg,#1A1A10,#383818)',
    btnCls: 'bg-[#3D6B4F] hover:bg-[#2A4F38]',
  },
]

interface Props {
  data: Partial<BookingData>
  onNext: (update: Partial<BookingData>) => void
}

export default function StepServiceSelect({ data, onNext }: Props) {
  return (
    <div>
      <div className="eyebrow mb-1">Choose your session</div>
      <h2 className="font-display text-[26px] font-medium text-brand-heading mb-6">
        Select a Service
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map(s => {
          const isSelected = data.serviceSlug === s.slug
          return (
            <button
              key={s.slug}
              onClick={() => onNext({
                serviceSlug: s.slug,
                serviceName: s.name,
                pricePaise: s.pricePaise,
                duration: s.duration,
                practitionerId: s.practitionerId,
                practitionerName: s.practitionerName,
              })}
              className={`bg-white border rounded-[18px] overflow-hidden text-left hover:-translate-y-0.5 hover:shadow-md transition-all group
                ${isSelected ? 'border-2 border-brand-violet shadow-md' : 'border border-brand-border'}`}
            >
              {/* Mini hero */}
              <div className="h-16 relative flex items-center justify-center" style={{ background: s.heroGrad }}>
                <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: s.pracColor }}
                  >
                    {s.pracInitial}
                  </div>
                  <span className="text-[11px] text-white/90">{s.practitionerName}</span>
                </div>
                {s.duration > 0 && (
                  <div className="absolute bottom-2 right-3 bg-black/60 rounded-full px-2 py-0.5 text-[11px] text-white/90">
                    {s.duration} min
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wide text-brand-sage mb-1">{s.category}</div>
                <div className="font-display text-[15px] text-brand-heading mb-2 leading-snug">{s.name}</div>
                <div className="flex justify-between items-center">
                  <span className="font-display text-[18px] text-brand-violet">
                    {s.pricePaise === 0 ? 'Free' : formatINR(s.pricePaise)}
                  </span>
                  <span className={`text-[12px] text-white px-3 py-1 rounded-full transition-colors ${s.btnCls}`}>
                    Select →
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
