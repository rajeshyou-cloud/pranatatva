'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Calendar, Users } from 'lucide-react'

const CSS = `
@keyframes hA-rotate    { to { transform: rotate(360deg); } }
@keyframes hA-rotateCCW { to { transform: rotate(-360deg); } }
@keyframes hA-fadeUp    { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes hA-twinkle   { 0%,100% { opacity:.1; } 50% { opacity:.55; } }
@keyframes hA-float     { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }

/* ── Responsive ── */
@media (max-width: 767px) {
  .hA-wrap { flex-direction: column !important; padding: 0 !important; gap: 0 !important; }
  .hA-left {
    flex: none !important; width: 100% !important; max-width: 100% !important;
    padding: 2.8rem 1.5rem 1.8rem !important;
  }
  .hA-left h1 { font-size: 2.4rem !important; }
  .hA-left p  { font-size: 0.85rem !important; max-width: 100% !important; margin-bottom: 1.5rem !important; }
  .hA-cta-row { gap: 0.75rem !important; margin-bottom: 1.6rem !important; flex-wrap: wrap !important; }
  .hA-cta-row a { padding: 11px 22px !important; font-size: 13px !important; }
  .hA-badges  { gap: 7px !important; }
  .hA-right {
    flex: none !important; width: 100% !important; padding: 0 !important;
    height: 290px !important; overflow: hidden !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
  }
  .hA-float-stat { display: none !important; }
  .hA-eyebrow span:last-child { font-size: 10.5px !important; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .hA-left { flex: 0 0 50% !important; }
  .hA-right { flex: 0 0 48% !important; }
  .hA-left h1 { font-size: clamp(2rem,3.8vw,3rem) !important; }
}
`

const PARTICLES = [
  { x:4,  y:12, s:2.5, o:.4, d:4,   dl:0   },
  { x:10, y:68, s:1.5, o:.3, d:5,   dl:1   },
  { x:22, y:88, s:3,   o:.25,d:3.5, dl:.7  },
  { x:35, y:6,  s:2,   o:.3, d:5.5, dl:1.5 },
  { x:48, y:94, s:1.5, o:.2, d:4.5, dl:2   },
  { x:62, y:4,  s:2.5, o:.35,d:4,   dl:.3  },
  { x:78, y:92, s:2,   o:.25,d:6,   dl:1.2 },
  { x:91, y:18, s:3,   o:.3, d:3.8, dl:.8  },
  { x:96, y:60, s:1.5, o:.2, d:5,   dl:2.2 },
  { x:15, y:42, s:2,   o:.25,d:4.2, dl:1.8 },
  { x:55, y:14, s:1.5, o:.3, d:5.5, dl:.5  },
  { x:82, y:44, s:2.5, o:.2, d:4,   dl:1.4 },
  { x:42, y:82, s:2,   o:.3, d:3.5, dl:.2  },
  { x:7,  y:80, s:1.5, o:.25,d:4.8, dl:2.5 },
  { x:70, y:72, s:3,   o:.2, d:4.2, dl:.6  },
  { x:88, y:82, s:1.5, o:.35,d:5,   dl:1.6 },
]

const badges = [
  { Icon: Calendar, text: 'Easy online booking with instant confirmation' },
  { Icon: Shield,   text: 'Secure Razorpay payments · GST invoice' },
  { Icon: Users,    text: 'Hemavathi & Shruthi — 2 expert practitioners' },
  { Icon: Star,     text: 'Sessions conducted in English' },
]

export default function HeroA() {
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 102px)',
        background: '#190C04',
        backgroundImage: 'radial-gradient(ellipse 85% 80% at 12% 55%, #3D2010 0%, #2C1A0E 42%, #190C04 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.x + '%', top: p.y + '%',
          width: p.s + 'px', height: p.s + 'px', borderRadius: '50%',
          background: '#D4AD25', opacity: p.o,
          animation: `hA-twinkle ${p.d}s ease-in-out ${p.dl}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div className="hA-wrap" style={{
        display: 'flex', width: '100%',
        padding: '4rem 4% 4rem 6%',
        alignItems: 'center', gap: '2%',
        position: 'relative', zIndex: 1,
      }}>

        {/* LEFT */}
        <div className="hA-left" style={{ flex: '0 0 46%', maxWidth: 540 }}>
          <div className="hA-eyebrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: '9px',
            background: 'rgba(212,173,37,0.09)', border: '1px solid rgba(212,173,37,0.26)',
            borderRadius: '100px', padding: '7px 16px 7px 9px',
            marginBottom: '1.8rem', animation: 'hA-fadeUp .5s ease both',
          }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(212,173,37,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#D4AD25' }}>✦</div>
            <span style={{ fontSize: '11.5px', color: 'rgba(245,239,228,0.72)' }}>500+ Seekers Healed Across India</span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem,4vw,4rem)', color: '#F5EFE4', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.4rem', animation: 'hA-fadeUp .6s .08s ease both' }}>
            Begin Your<br /><em style={{ color: '#D4AD25' }}>Inner Journey</em>
          </h1>

          <p style={{ color: 'rgba(245,239,228,0.5)', fontSize: '0.88rem', lineHeight: 1.9, maxWidth: '400px', marginBottom: '2rem', animation: 'hA-fadeUp .6s .16s ease both' }}>
            Personalised healing with Hemavathi and Shruthi — Theta Healing, Tarot, Akashic Records, Reiki and more. Ancient wisdom, modern ease.
          </p>

          <div className="hA-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.4rem', animation: 'hA-fadeUp .6s .24s ease both' }}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4AD25', color: '#1A0C04', borderRadius: '100px', padding: '13px 26px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
              Explore Sessions <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
            <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(212,173,37,0.28)', color: 'rgba(245,239,228,0.72)', borderRadius: '100px', padding: '12px 24px', fontSize: '13.5px', textDecoration: 'none', background: 'transparent' }}>
              Meet Our Practitioners
            </Link>
          </div>

          <div className="hA-badges" style={{ display: 'flex', flexDirection: 'column', gap: '9px', animation: 'hA-fadeUp .6s .32s ease both' }}>
            {badges.map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(245,239,228,0.36)', fontSize: '12px' }}>
                <Icon style={{ width: 13, height: 13, color: '#D4AD25', flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — mandala */}
        <div className="hA-right" style={{ flex: '0 0 52%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="hA-float-stat" style={{ position: 'absolute', top: '6%', right: '5%', zIndex: 2, background: 'rgba(28,14,4,0.7)', border: '1px solid rgba(212,173,37,0.22)', borderRadius: '14px', padding: '10px 16px', textAlign: 'center', backdropFilter: 'blur(8px)', animation: 'hA-float 4s ease-in-out infinite' }}>
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: '#D4AD25', fontWeight: 700, lineHeight: 1 }}>1,400+</div>
            <div style={{ fontSize: '9px', color: 'rgba(245,239,228,0.42)', marginTop: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sessions · Hemavathi</div>
          </div>
          <div className="hA-float-stat" style={{ position: 'absolute', bottom: '8%', left: '3%', zIndex: 2, background: 'rgba(28,14,4,0.7)', border: '1px solid rgba(212,173,37,0.22)', borderRadius: '14px', padding: '10px 16px', textAlign: 'center', backdropFilter: 'blur(8px)', animation: 'hA-float 5s ease-in-out 1.5s infinite' }}>
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: '#D4AD25', fontWeight: 700, lineHeight: 1 }}>900+</div>
            <div style={{ fontSize: '9px', color: 'rgba(245,239,228,0.42)', marginTop: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Readings · Shruthi</div>
          </div>

          {/* Logo at mandala heart */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3, width: 96, height: 96, borderRadius: '50%',
            background: 'radial-gradient(circle, #F5EFE4 55%, rgba(245,239,228,0) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(212,173,37,0.5), 0 0 80px rgba(212,173,37,0.18)',
          }}>
            <Image src="/Logo.png" alt="PranaTatva" width={76} height={69} style={{ objectFit: 'contain' }} priority />
          </div>

          <svg viewBox="0 0 500 500" style={{ width: '100%', maxWidth: 500, height: 'auto' }} fill="none">
            <defs>
              <path id="hA-textRing" d="M 250,250 m -228,0 a 228,228 0 1,0 456,0 a 228,228 0 1,0 -456,0"/>
              <radialGradient id="hA-cGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#D4AD25" stopOpacity="0.9"/>
                <stop offset="55%"  stopColor="#C4780A" stopOpacity="0.45"/>
                <stop offset="100%" stopColor="#C4780A" stopOpacity="0"/>
              </radialGradient>
            </defs>

            <g><animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="130s" repeatCount="indefinite"/>
              <circle cx="250" cy="250" r="228" stroke="#C4780A" strokeWidth="0.5" strokeDasharray="3 10" opacity="0.18"/>
              <text fontSize="8.5" fill="#C4780A" opacity="0.48" letterSpacing="3.5">
                <textPath href="#hA-textRing">{'✦ HEALING · THETA · TAROT · AKASHIC · REIKI · CHAKRA · PRANA · MANIFESTATION · KARMA · SHAKTI · DHARMA · MOKSHA · ✦ HEALING · THETA · TAROT · AKASHIC ·'}</textPath>
              </text>
            </g>

            <g><animateTransform attributeName="transform" type="rotate" from="0 250 250" to="-360 250 250" dur="72s" repeatCount="indefinite"/>
              <circle cx="250" cy="250" r="196" stroke="#C4780A" strokeWidth="0.8" opacity="0.28"/>
              <circle cx="250" cy="250" r="180" stroke="#E8A020" strokeWidth="0.4" strokeDasharray="2 6" opacity="0.18"/>
              {Array.from({ length: 24 }, (_, i) => {
                const a = (i / 24) * Math.PI * 2
                return <line key={i} x1={250 + 188 * Math.cos(a)} y1={250 + 188 * Math.sin(a)} x2={250 + 196 * Math.cos(a)} y2={250 + 196 * Math.sin(a)} stroke="#C4780A" strokeWidth="1.5" opacity="0.35"/>
              })}
            </g>

            <g><animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="52s" repeatCount="indefinite"/>
              <circle cx="250" cy="250" r="155" stroke="#E8A020" strokeWidth="0.8" opacity="0.3"/>
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i / 8) * Math.PI * 2, r = 155, hw = 6
                const px = 250 + r * Math.cos(a), py = 250 + r * Math.sin(a)
                return <polygon key={i} points={`${px},${py - hw} ${px + hw},${py} ${px},${py + hw} ${px - hw},${py}`} fill="#C4780A" opacity="0.6"/>
              })}
            </g>

            <g><animateTransform attributeName="transform" type="rotate" from="0 250 250" to="-360 250 250" dur="36s" repeatCount="indefinite"/>
              <circle cx="250" cy="250" r="112" stroke="#D4AD25" strokeWidth="1" opacity="0.35"/>
              <circle cx="250" cy="250" r="98" stroke="#D4AD25" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.22"/>
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2
                return <circle key={i} cx={250 + 112 * Math.cos(a)} cy={250 + 112 * Math.sin(a)} r="3.5" fill="#D4AD25" opacity="0.65"/>
              })}
            </g>

            <circle cx="250" cy="250" r="72" stroke="#D4AD25" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="250" cy="250" r="60" fill="url(#hA-cGlow)" opacity="0.6"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
