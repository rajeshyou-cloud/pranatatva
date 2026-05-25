'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const CSS = `
@keyframes hD-fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes hD-fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes hD-cw       { to { transform:rotate(360deg); } }
@keyframes hD-ccw      { to { transform:rotate(-360deg); } }
@keyframes hD-shimmer  { 0%,100% { opacity:.22; transform:scale(1); } 50% { opacity:.65; transform:scale(1.2); } }
@keyframes hD-floatA   { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-7px); } }
@keyframes hD-floatB   { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(6px); } }
@keyframes hD-glowPulse{ 0%,100% { box-shadow:0 0 55px rgba(212,173,37,0.25),0 0 110px rgba(196,120,10,0.12); } 50% { box-shadow:0 0 80px rgba(212,173,37,0.42),0 0 160px rgba(196,120,10,0.22); } }
@keyframes hD-spark    { 0%,100% { opacity:.15; transform:scale(1); } 50% { opacity:.7; transform:scale(1.4); } }

/* ── Responsive ── */
@media (max-width: 767px) {
  .hD-section { flex-direction: column !important; min-height: auto !important; align-items: stretch !important; }
  .hD-left {
    width: 100% !important;
    padding: 2.8rem 1.5rem 2rem !important;
    border-right: none !important;
    border-bottom: 1px solid #E2D5C4 !important;
  }
  .hD-left h1 { font-size: 2.3rem !important; line-height: 1.08 !important; margin-bottom: 1.2rem !important; }
  .hD-left p  { font-size: 0.85rem !important; max-width: 100% !important; margin-bottom: 1.6rem !important; }
  .hD-cta-row { gap: 0.75rem !important; margin-bottom: 1.8rem !important; flex-wrap: wrap !important; }
  .hD-cta-row a { padding: 11px 22px !important; font-size: 13px !important; }
  .hD-stats   { gap: 1.8rem !important; }
  .hD-right {
    width: 100% !important;
    height: 340px !important;
    flex-shrink: 0 !important;
  }
  .hD-pill { display: none !important; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .hD-left  { width: 52% !important; padding: 3.5rem 2rem 3.5rem 5% !important; }
  .hD-right { width: 48% !important; }
  .hD-left h1 { font-size: clamp(2.2rem,3.8vw,4rem) !important; }
}
`

const practitioners = [
  { name: 'Hemavathi', tag: 'Theta · Akashic · Manifestation', color: '#8B5A2A' },
  { name: 'Shruthi',   tag: 'Tarot · Numerology · EFT',        color: '#6A3D8A' },
]

const stats = [
  { val: '1,400+', lbl: 'Sessions' },
  { val: '900+',   lbl: 'Readings' },
  { val: '10+',    lbl: 'Modalities' },
]

/* Hexagonal orbit — 6 pills around the central logo */
const pills = [
  { label: 'Theta Healing',    top: '11%',  left: '14%',  anim: 'hD-floatA', dur: '3.6s', delay: '0s'   },
  { label: 'Tarot Reading',    top: '11%',  right: '11%', anim: 'hD-floatB', dur: '4.0s', delay: '0.3s' },
  { label: 'Akashic Records',  top: '46%',  left: '3%',   anim: 'hD-floatB', dur: '3.8s', delay: '0.6s' },
  { label: 'Reiki Healing',    top: '46%',  right: '3%',  anim: 'hD-floatA', dur: '4.2s', delay: '0.9s' },
  { label: 'Manifestation',    bottom:'14%',left: '14%',  anim: 'hD-floatA', dur: '3.4s', delay: '1.2s' },
  { label: 'Chakra Balancing', bottom:'14%',right: '10%', anim: 'hD-floatB', dur: '3.9s', delay: '1.5s' },
]

/* Scattered gold sparks on the right panel */
const sparks = [
  [18,22],[80,18],[10,55],[88,48],[25,75],[82,78],[50,8],[50,90],[65,30],[35,65],
  [72,62],[15,40],[90,35],
]

export default function HeroD() {
  return (
    <section className="hD-section" style={{
      minHeight: 'calc(100vh - 102px)',
      background: '#FBF7F0',
      display: 'flex',
      alignItems: 'stretch',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ══ LEFT — editorial text (52%) ══ */}
      <div className="hD-left" style={{
        width: '52%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '4.5rem 4rem 4.5rem 7%',
        borderRight: '1px solid #E2D5C4',
        position: 'relative',
        background: 'linear-gradient(160deg, #FBF7F0 0%, #F5EFE4 100%)',
      }}>
        {/* Top ornament */}
        <div style={{ position: 'absolute', top: '2.2rem', left: '7%', display: 'flex', alignItems: 'center', gap: '10px', animation: 'hD-fadeIn .4s ease both' }}>
          <div style={{ width: 26, height: 1, background: 'linear-gradient(90deg,#C4780A,#D4AD25)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#C4780A', opacity: 0.7 }}>Spiritual Wellness · India</span>
        </div>

        {/* Badge pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196,120,10,0.07)', border: '1px solid rgba(196,120,10,0.22)', borderRadius: '100px', padding: '6px 14px 6px 8px', marginBottom: '1.8rem', alignSelf: 'flex-start', animation: 'hD-fadeUp .5s .06s ease both' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(196,120,10,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#C4780A' }}>✦</div>
          <span style={{ fontSize: '11px', color: '#5C3D28', letterSpacing: '0.02em' }}>500+ Seekers Healed Across India</span>
        </div>

        {/* Headline */}
        <h1 className="font-display" style={{ fontSize: 'clamp(3rem,5vw,5.4rem)', color: '#1A0C04', fontWeight: 400, lineHeight: 1.0, marginBottom: '2rem', animation: 'hD-fadeUp .6s .1s ease both' }}>
          Begin<br />
          Your<br />
          <em style={{ color: '#C4780A' }}>Inner<br />Journey</em>
        </h1>

        {/* Rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.6rem', animation: 'hD-fadeIn .6s .2s ease both' }}>
          <div style={{ height: '1.5px', width: 42, background: 'linear-gradient(90deg, #C4780A, #D4AD25)' }} />
          <span style={{ fontSize: '9.5px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#9C7A60' }}>Ancient Wisdom · Modern Healing</span>
          <div style={{ height: '1.5px', flex: 1, background: 'linear-gradient(90deg, #D4AD25, transparent)' }} />
        </div>

        <p style={{ color: '#5C3D28', fontSize: '0.9rem', lineHeight: 2, maxWidth: '380px', marginBottom: '2.2rem', animation: 'hD-fadeUp .6s .25s ease both' }}>
          Discover Theta Healing, Tarot, Akashic Records, sacred Sadhanas and more — curated by certified practitioners and delivered with compassionate precision.
        </p>

        {/* CTAs */}
        <div className="hD-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.8rem', animation: 'hD-fadeUp .6s .32s ease both' }}>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1A0C04', color: '#F5EFE4', borderRadius: '100px', padding: '13px 28px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
            Explore Services <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(26,12,4,0.2)', color: '#3D2010', borderRadius: '100px', padding: '12px 26px', fontSize: '13.5px', textDecoration: 'none' }}>
            Free Discovery Call
          </Link>
        </div>

        {/* Stats */}
        <div className="hD-stats" style={{ display: 'flex', gap: '2.5rem', paddingBottom: '1.8rem', borderBottom: '1px solid #E2D5C4', marginBottom: '1.6rem', animation: 'hD-fadeUp .6s .38s ease both' }}>
          {stats.map(s => (
            <div key={s.val}>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.7rem', color: '#1A0C04', fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '9.5px', color: '#9C7A60', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Practitioners */}
        <div style={{ display: 'flex', gap: '1.8rem', animation: 'hD-fadeUp .6s .44s ease both' }}>
          {practitioners.map(p => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${p.color}10`, border: `1.5px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-playfair)', fontSize: '16px', color: p.color, flexShrink: 0 }}>{p.name[0]}</div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A0C04', lineHeight: 1 }}>{p.name}</p>
                <p style={{ fontSize: '9.5px', color: '#9C7A60', marginTop: '3px' }}>{p.tag}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div style={{ position: 'absolute', bottom: '2.2rem', left: '7%', display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['✦', '·', '✦', '·', '✦'].map((c, i) => (
            <span key={i} style={{ fontSize: i % 2 === 0 ? '8px' : '11px', color: '#C4780A', opacity: i % 2 === 0 ? 0.45 : 0.18 }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ══ RIGHT — Sacred Mandala + Logo (48%) ══ */}
      <div className="hD-right" style={{
        width: '48%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 75% 65% at 50% 48%, #EAD9BE 0%, #F0E6D3 35%, #F5EFE4 70%, #EDE4D4 100%)',
      }}>

        {/* Flower of Life watermark — very subtle sacred geometry background */}
        <svg style={{ position: 'absolute', width: '90%', height: '90%', top: '5%', left: '5%', opacity: 0.07, pointerEvents: 'none' }} viewBox="0 0 500 500" fill="none" stroke="#8B5A2A" strokeWidth="0.8">
          {/* 7 circles — Seed of Life */}
          <circle cx="250" cy="250" r="82"/>
          <circle cx="332" cy="250" r="82"/>
          <circle cx="291" cy="321" r="82"/>
          <circle cx="209" cy="321" r="82"/>
          <circle cx="168" cy="250" r="82"/>
          <circle cx="209" cy="179" r="82"/>
          <circle cx="291" cy="179" r="82"/>
          {/* Outer bounding circle */}
          <circle cx="250" cy="250" r="163" strokeDasharray="4 10"/>
          <circle cx="250" cy="250" r="230" strokeDasharray="2 14"/>
        </svg>

        {/* Gold sparkle dots */}
        {sparks.map(([x, y], i) => (
          <div key={i} style={{ position: 'absolute', left: x + '%', top: y + '%', width: i % 4 === 0 ? '4px' : '2.5px', height: i % 4 === 0 ? '4px' : '2.5px', borderRadius: '50%', background: '#D4AD25', animation: `hD-spark ${2.8 + (i % 5) * 0.5}s ease-in-out ${i * 0.22}s infinite`, pointerEvents: 'none' }} />
        ))}

        {/* ── Ring system (5 rings) ── */}

        {/* Ring 1 — outermost, dashed tick ring, slow CW */}
        <div style={{ position: 'absolute', width: 460, height: 460, top: '50%', left: '50%', marginTop: -230, marginLeft: -230, animation: 'hD-cw 100s linear infinite' }}>
          <svg viewBox="0 0 460 460" style={{ width: '100%', height: '100%', opacity: 0.30 }} fill="none">
            <circle cx="230" cy="230" r="222" stroke="#C4780A" strokeWidth="0.7" strokeDasharray="5 12"/>
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i / 24) * Math.PI * 2
              return <line key={i} x1={230 + 213 * Math.cos(a)} y1={230 + 213 * Math.sin(a)} x2={230 + 222 * Math.cos(a)} y2={230 + 222 * Math.sin(a)} stroke="#C4780A" strokeWidth="1.8"/>
            })}
          </svg>
        </div>

        {/* Ring 2 — diamond marks, CCW */}
        <div style={{ position: 'absolute', width: 370, height: 370, top: '50%', left: '50%', marginTop: -185, marginLeft: -185, animation: 'hD-ccw 72s linear infinite' }}>
          <svg viewBox="0 0 370 370" style={{ width: '100%', height: '100%', opacity: 0.38 }} fill="none">
            <circle cx="185" cy="185" r="178" stroke="#D4AD25" strokeWidth="0.9"/>
            <circle cx="185" cy="185" r="165" stroke="#C4780A" strokeWidth="0.5" strokeDasharray="3 8"/>
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2, hw = 7
              const px = 185 + 178 * Math.cos(a), py = 185 + 178 * Math.sin(a)
              return <polygon key={i} points={`${px},${py - hw} ${px + hw},${py} ${px},${py + hw} ${px - hw},${py}`} fill="#D4AD25" opacity="0.95"/>
            })}
          </svg>
        </div>

        {/* Ring 3 — dot marks, CW */}
        <div style={{ position: 'absolute', width: 290, height: 290, top: '50%', left: '50%', marginTop: -145, marginLeft: -145, animation: 'hD-cw 50s linear infinite' }}>
          <svg viewBox="0 0 290 290" style={{ width: '100%', height: '100%', opacity: 0.44 }} fill="none">
            <circle cx="145" cy="145" r="138" stroke="#C4780A" strokeWidth="0.9" strokeDasharray="4 7"/>
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2
              return <circle key={i} cx={145 + 138 * Math.cos(a)} cy={145 + 138 * Math.sin(a)} r="3.5" fill="#D4AD25" opacity="0.9"/>
            })}
          </svg>
        </div>

        {/* Ring 4 — inner line ring, CCW */}
        <div style={{ position: 'absolute', width: 216, height: 216, top: '50%', left: '50%', marginTop: -108, marginLeft: -108, animation: 'hD-ccw 34s linear infinite' }}>
          <svg viewBox="0 0 216 216" style={{ width: '100%', height: '100%', opacity: 0.50 }} fill="none">
            <circle cx="108" cy="108" r="102" stroke="#D4AD25" strokeWidth="1.2"/>
            <circle cx="108" cy="108" r="88" stroke="#C4780A" strokeWidth="0.6" strokeDasharray="3 5"/>
            {Array.from({ length: 6 }, (_, i) => {
              const a = (i / 6) * Math.PI * 2
              return <line key={i} x1={108 + 88 * Math.cos(a)} y1={108 + 88 * Math.sin(a)} x2={108 + 102 * Math.cos(a)} y2={108 + 102 * Math.sin(a)} stroke="#D4AD25" strokeWidth="2" opacity="0.85"/>
            })}
          </svg>
        </div>

        {/* Ring 5 — lotus petals (static, no rotation) */}
        <div style={{ position: 'absolute', width: 148, height: 148, top: '50%', left: '50%', marginTop: -74, marginLeft: -74 }}>
          <svg viewBox="0 0 148 148" style={{ width: '100%', height: '100%', opacity: 0.55 }} fill="none">
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * Math.PI * 2
              const px = 74 + 44 * Math.cos(a), py = 74 + 44 * Math.sin(a)
              const rot = (i / 8) * 360
              return (
                <ellipse key={i} cx={px} cy={py} rx="11" ry="28"
                  fill="rgba(212,173,37,0.12)" stroke="rgba(196,120,10,0.55)" strokeWidth="1"
                  transform={`rotate(${rot} ${px} ${py})`}
                />
              )
            })}
            <circle cx="74" cy="74" r="28" stroke="#D4AD25" strokeWidth="1" strokeDasharray="3 4"/>
          </svg>
        </div>

        {/* Central amber glow halo */}
        <div style={{ position: 'absolute', width: 220, height: 220, top: '50%', left: '50%', marginTop: -110, marginLeft: -110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,173,37,0.22) 0%, rgba(196,120,10,0.1) 50%, transparent 75%)', animation: 'hD-glowPulse 4s ease-in-out infinite' }} />

        {/* ── Logo centrepiece ── */}
        <div style={{ position: 'relative', zIndex: 10, animation: 'hD-fadeIn .9s .2s ease both' }}>
          <Image
            src="/Logo.png"
            alt="PranaTatva"
            width={268}
            height={244}
            style={{ objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 6px 28px rgba(196,120,10,0.45)) drop-shadow(0 2px 8px rgba(196,120,10,0.25))' }}
            priority
          />
        </div>

        {/* Social proof badge — floats just below logo */}
        <div style={{
          position: 'absolute', bottom: '28%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(196,120,10,0.25)',
          borderRadius: '100px', padding: '6px 16px',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 4px 18px rgba(196,120,10,0.12)',
          backdropFilter: 'blur(8px)',
          animation: 'hD-floatB 5s ease-in-out infinite',
          whiteSpace: 'nowrap', zIndex: 10,
        }}>
          <span style={{ fontSize: '11px', color: '#D4AD25', letterSpacing: '1px' }}>★★★★★</span>
          <span style={{ fontSize: '10.5px', color: '#5C3D28' }}>Rated 5★ by 500+ Seekers</span>
        </div>

        {/* Floating modality pills — hexagonal orbit */}
        {pills.map((p, i) => {
          const posStyle: Record<string, string> = {}
          if (p.top)    posStyle.top    = p.top
          if (p.bottom) posStyle.bottom = p.bottom
          if (p.left)   posStyle.left   = p.left
          if (p.right)  posStyle.right  = p.right
          return (
            <div
              key={p.label}
              className="hD-pill"
              style={{
                position: 'absolute', ...posStyle,
                background: 'rgba(255,255,255,0.86)',
                border: '1px solid rgba(196,120,10,0.24)',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '10.5px', color: '#5C3D28',
                letterSpacing: '0.03em',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 3px 14px rgba(196,120,10,0.1)',
                animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
                whiteSpace: 'nowrap', zIndex: 8,
              }}
            >
              <span style={{ color: '#C4780A', marginRight: '5px', fontSize: '8px' }}>✦</span>
              {p.label}
            </div>
          )
        })}

        {/* Corner shimmer ✦ */}
        {[
          { top: '6%',   left: '7%'  },
          { top: '6%',   right: '7%' },
          { bottom: '6%',left: '7%'  },
          { bottom: '6%',right: '7%' },
        ].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, color: '#C4780A', fontSize: '14px', animation: `hD-shimmer ${3 + i * 0.55}s ease-in-out ${i * 0.45}s infinite` }}>✦</div>
        ))}

        {/* Bottom label */}
        <div style={{ position: 'absolute', bottom: '1.6rem', left: 0, right: 0, textAlign: 'center', fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: '#9C7A60' }}>
          Art of Healing · India
        </div>
      </div>
    </section>
  )
}
