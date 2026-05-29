'use client'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Calendar, Users } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import HeroA from '@/components/hero/HeroA'
import HeroB from '@/components/hero/HeroB'
import HeroC from '@/components/hero/HeroC'
import HeroD from '@/components/hero/HeroD'

const services = [
  {
    icon: '✦',
    title: 'Akashic Readings',
    practitioner: 'Hemavathi',
    pColor: '#8B5A2A',
    description: 'An energetic reading of your soul\'s past, present, and future — accessed intuitively by Hemavathi as a certified Akashic reader.',
    price: '₹5,100',
    duration: '45 min',
    href: '/services/akashic-records-soul-reading',
    tag: 'Reading',
    tagColor: '#1A6052',
  },
  {
    icon: '☽',
    title: 'Tarot Reading',
    practitioner: 'Shruthi',
    pColor: '#6A3D8A',
    description: 'Intuitive Tarot readings that illuminate your path and offer clarity on love, career, and purpose.',
    price: '₹2,400',
    duration: '45 min',
    href: '/services/tarot-card-reading',
    tag: 'Tarot',
    tagColor: '#6A3D8A',
  },
  {
    icon: '◆',
    title: 'Theta Healing',
    practitioner: 'Hemavathi',
    pColor: '#8B5A2A',
    description: 'Enter the theta brainwave state to permanently dissolve limiting beliefs and energetic blocks.',
    price: 'On Request',
    duration: '45 min',
    href: '/services/theta-healing-deep-dive',
    tag: 'Healing',
    tagColor: '#C4780A',
  },
]

const testimonials = [
  {
    name: 'Priya M.',
    location: 'Bengaluru',
    quote: 'Hemavathi shifted something I had carried for 12 years in a single session. I left feeling completely free — lighter than I have felt in my entire adult life.',
    rating: 5,
  },
  {
    name: 'Rahul S.',
    location: 'Hyderabad',
    quote: 'After one session I finally understood why I kept self-sabotaging. Within 10 days I received two new client referrals and a promotion offer. Life-changing.',
    rating: 5,
  },
  {
    name: 'Deepa K.',
    location: 'Chennai',
    quote: "Shruthi's Tarot reading gave me clarity I had been seeking for months. The accuracy was uncanny and her guidance was grounded and compassionate.",
    rating: 5,
  },
]

const HERO_MAP = { A: HeroA, B: HeroB, C: HeroC, D: HeroD }

export default function HomePage() {
  const { theme } = useTheme()
  const Hero = HERO_MAP[theme]

  return (
    <>
      {/* Active hero design */}
      <Hero />

      {/* ════════════════════════════════════════════
          PRACTITIONERS
      ════════════════════════════════════════════ */}
      <section style={{ background: '#F0E8D6', borderTop: '1px solid #E8D9C4', padding: '5rem 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-11">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Our Practitioners</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1A0E06', fontWeight: 400 }}>
              Gifted Healers, Sacred Space
            </h2>
          </div>

          {/* ── Hemavathi — featured founder card ── */}
          <div
            className="flex flex-col md:flex-row"
            style={{ background: 'white', border: '1px solid rgba(196,120,10,0.28)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 6px 28px rgba(196,120,10,0.09)', marginBottom: '1.25rem' }}
          >
            {/* Left gradient panel */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center gap-3 py-10 px-8 md:py-0"
              style={{ background: 'linear-gradient(160deg,#3D1E04,#6B3A18,#4A2510)', minWidth: 210, position: 'relative' }}
            >
              {/* Ambient mandala */}
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none" style={{ position: 'absolute', opacity: 0.07, pointerEvents: 'none' }}>
                <circle cx="80" cy="80" r="75" stroke="#D4AD25" strokeWidth="0.8"/>
                <circle cx="80" cy="80" r="55" stroke="#D4AD25" strokeWidth="0.8" strokeDasharray="5 5"/>
                <circle cx="80" cy="80" r="35" stroke="#D4AD25" strokeWidth="0.8"/>
                <circle cx="80" cy="80" r="15" stroke="#D4AD25" strokeWidth="1"/>
              </svg>

              {/* Monogram */}
              <div style={{ position: 'relative', width: 76, height: 76, borderRadius: '50%', background: 'rgba(196,120,10,0.18)', border: '2px solid rgba(212,173,37,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-playfair)', fontSize: '2.3rem', color: '#D4AD25' }}>
                H
              </div>

              {/* Founder badge */}
              <span style={{ position: 'relative', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.18em', padding: '4px 12px', borderRadius: '100px', background: 'rgba(212,173,37,0.16)', color: '#D4AD25', border: '1px solid rgba(212,173,37,0.32)' }}>
                ✦ Founder
              </span>

              {/* Sessions count */}
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: '#F5EFE4', fontWeight: 600, lineHeight: 1 }}>1,400+</div>
                <div style={{ fontSize: '9px', color: 'rgba(245,239,228,0.42)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>Sessions</div>
              </div>
            </div>

            {/* Right content */}
            <div style={{ padding: '1.8rem 2rem', flex: 1 }}>
              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#C4780A', fontWeight: 600 }}>
                  Founder & Lead Practitioner
                </span>
              </div>
              <h3 className="font-display" style={{ fontSize: '1.8rem', color: '#1A0E06', fontWeight: 400, lineHeight: 1, marginBottom: '0.5rem' }}>
                Hemavathi
              </h3>
              <p style={{ fontSize: '11.5px', color: '#9C7A60', fontStyle: 'italic', marginBottom: '1rem' }}>
                Certified Theta Healing Practitioner · Master Level · Certified NLP · Certified Instructor
              </p>
              <p style={{ fontSize: '12.5px', color: '#5C3D28', lineHeight: 1.85, marginBottom: '1.2rem' }}>
                The visionary behind PranaTatva, Hemavathi brings 18 years of practice and a master-level depth to every session.
                She specialises in dissolving deep-rooted limiting beliefs through Theta Healing and guiding seekers into lasting
                states of abundance, clarity, and spiritual alignment.
              </p>

              {/* Stats row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', paddingTop: '1rem', marginBottom: '1.1rem', borderTop: '1px solid #E8D9C4' }}>
                {[
                  { val: '18 yrs', lbl: 'Practice' },
                  { val: 'NLP', lbl: 'Certified' },
                  { val: 'Instructor', lbl: 'Certified' },
                  { val: '5★', lbl: 'Client rating' },
                ].map(s => (
                  <div key={s.lbl}>
                    <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.05rem', color: '#C4780A', fontWeight: 600, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '9px', color: '#9C7A60', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Specialties */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['Theta Healing', 'Manifestation', 'Spiritual Training', 'Reiki', 'NLP', 'Akashic Records'].map(tag => (
                  <span key={tag} style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '4px', background: 'rgba(196,120,10,0.08)', color: '#8B4A10', border: '1px solid rgba(196,120,10,0.14)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Shruthi — associate practitioner card ── */}
          <div style={{ background: 'white', border: '1px solid #E8D9C4', borderRadius: '18px', padding: '1.5rem 1.6rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-playfair)', fontSize: '20px', background: '#6A3D8A18', color: '#6A3D8A', border: '2px solid #6A3D8A40' }}>
              S
            </div>
            <div>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#6A3D8A', fontWeight: 600, marginBottom: '2px' }}>
                Healing Guide
              </div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#1A0E06', marginBottom: '0.3rem' }}>Shruthi</h3>
              <p style={{ fontSize: '11.5px', color: '#9C7A60', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                Tarot Reader · Akashic Records Practitioner · Numerologist · EFT Practitioner
              </p>
              <p style={{ fontSize: '11px', color: '#6A3D8A' }}>✦ 900+ readings · 6 years of practice · Intuitive Channel</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '0.8rem' }}>
                {['Tarot', 'Akashic Records', 'Numerology', 'EFT', 'Chakra Balancing'].map(s => (
                  <span key={s} style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '4px', background: '#F5EFE4', color: '#5C3D28', border: '1px solid #E8D9C4' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          SERVICES PREVIEW
      ════════════════════════════════════════════ */}
      <section style={{ background: '#FAF6EE', padding: '5rem 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-11">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Popular Sessions</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1A0E06', fontWeight: 400 }}>
              How Can We Help You?
            </h2>
            <p style={{ color: '#5C3D28', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: '500px', margin: '0.8rem auto 0' }}>
              Each session is a sacred space crafted to meet you exactly where you are on your healing journey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1.4rem' }}>
            {services.map(s => (
              <div
                key={s.title}
                style={{ background: 'white', border: '1px solid #E8D9C4', borderRadius: '18px', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s' }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(196,120,10,0.1)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = ''
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                }}
              >
                <div style={{ height: '4px', background: `linear-gradient(90deg, ${s.tagColor}, ${s.tagColor}88)` }} />
                <div style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '3px 9px', borderRadius: '4px', background: `${s.tagColor}14`, color: s.tagColor, border: `1px solid ${s.tagColor}28` }}>{s.tag}</span>
                    <span style={{ fontSize: '10px', color: s.pColor, fontWeight: 500 }}>{s.practitioner}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.15rem', color: '#1A0E06', marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '12.5px', color: '#5C3D28', lineHeight: 1.75, marginBottom: '1.2rem' }}>{s.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E8D9C4', paddingTop: '1rem' }}>
                    <div>
                      <span className="font-display" style={{ fontSize: '1.15rem', color: '#C4780A' }}>{s.price}</span>
                      <div style={{ fontSize: '10px', color: '#9C7A60', marginTop: '1px' }}>{s.duration} · per session</div>
                    </div>
                    <Link href={s.href} style={{ fontSize: '12px', fontWeight: 600, color: '#C4780A', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {s.price === 'On Request' ? 'Enquire' : 'Book now'} <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/services" className="btn-secondary inline-flex">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════ */}
      <section style={{ background: '#F5EFE4', padding: '5rem 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-11">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="eyebrow">Healing Stories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1A0E06', fontWeight: 400 }}>
              Real Transformations
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.4rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: 'white', border: '1px solid #E8D9C4', borderRadius: '18px', padding: '1.6rem' }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} style={{ width: 14, height: 14, fill: '#D4AD25', color: '#D4AD25' }} />
                  ))}
                </div>
                <p className="font-display" style={{ fontSize: '13.5px', color: '#5C3D28', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1.2rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p style={{ fontWeight: 500, color: '#1A0E06', fontSize: '13px' }}>{t.name}</p>
                  <p style={{ color: '#9C7A60', fontSize: '11px' }}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #1A0C04 0%, #2C1A0E 40%, #3D2010 70%, #2C1A0E 100%)', padding: '5rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06, pointerEvents: 'none' }}>
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="190" stroke="#E8A020" strokeWidth="1"/>
            <circle cx="200" cy="200" r="140" stroke="#C47840" strokeWidth="1" strokeDasharray="6 6"/>
            <circle cx="200" cy="200" r="90" stroke="#E8A020" strokeWidth="1"/>
            <circle cx="200" cy="200" r="40" stroke="#C47840" strokeWidth="2"/>
            <circle cx="200" cy="200" r="10" fill="#E8A020"/>
          </svg>
        </div>
        <div style={{ position: 'relative' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'white', fontWeight: 400, lineHeight: 1.2, margin: '1.5rem 0 1rem' }}>
            Your Transformation Begins<br />With One Step
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.58)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Book your first session today. No prior experience needed — only an open heart.
          </p>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4AD25', color: '#1A0C04', borderRadius: '100px', padding: '14px 32px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            Book a Session <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </section>
    </>
  )
}
