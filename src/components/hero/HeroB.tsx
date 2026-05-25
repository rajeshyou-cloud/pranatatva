'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Calendar, Users } from 'lucide-react'

const CSS = `
@keyframes hB-cw      { to { transform:rotate(360deg); } }
@keyframes hB-ccw     { to { transform:rotate(-360deg); } }
@keyframes hB-fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes hB-fadeIn  { from { opacity:0; } to { opacity:1; } }
@keyframes hB-shimmer { 0%,100% { opacity:.2; transform:scale(1); } 50% { opacity:.65; transform:scale(1.2); } }
@keyframes hB-glow    { 0%,100% { opacity:.5; } 50% { opacity:.9; } }
@keyframes hB-floatA  { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-7px); } }
@keyframes hB-floatB  { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(6px); } }
@keyframes hB-spark   { 0%,100% { opacity:.12; transform:scale(1); } 50% { opacity:.65; transform:scale(1.45); } }

/* ── Responsive ── */
@media (max-width: 767px) {
  .hB-section { flex-direction: column !important; min-height: auto !important; }
  .hB-left {
    width: 100% !important;
    padding: 2.8rem 1.5rem 2rem !important;
  }
  .hB-left h1 { font-size: 2.4rem !important; line-height: 1.12 !important; }
  .hB-left p  { font-size: 0.85rem !important; max-width: 100% !important; margin-bottom: 1.6rem !important; }
  .hB-cta-row { margin-bottom: 1.8rem !important; gap: 0.75rem !important; }
  .hB-cta-row a { padding: 11px 22px !important; font-size: 13px !important; }
  .hB-stats-row { gap: 2rem !important; margin-bottom: 1.4rem !important; }
  .hB-right { width: 100% !important; height: 320px !important; flex-shrink: 0 !important; }
  .hB-pill  { display: none !important; }
  .hB-social { bottom: 18% !important; }
  .hB-eyebrow { margin-bottom: 1.2rem !important; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .hB-left  { width: 55% !important; padding: 3rem 2rem 3rem 4% !important; }
  .hB-right { width: 45% !important; }
  .hB-left h1 { font-size: clamp(2rem,3.6vw,3rem) !important; }
}
`

const badges = [
  { Icon: Calendar, text: 'Easy online booking, instant confirmation' },
  { Icon: Shield,   text: 'Razorpay · GST invoice · 100% secure' },
  { Icon: Users,    text: 'Hemavathi & Shruthi — certified practitioners' },
  { Icon: Star,     text: 'English · Hindi · Telugu supported' },
]

const stats = [
  { val: '1,400+', lbl: 'Sessions' },
  { val: '900+',   lbl: 'Readings' },
  { val: '10+',    lbl: 'Modalities' },
]

const pills = [
  { label: 'Theta Healing',    top: '10%',   left: '11%',  anim: 'hB-floatA', dur: '3.6s', delay: '0s'   },
  { label: 'Tarot Reading',    top: '10%',   right: '9%',  anim: 'hB-floatB', dur: '4.0s', delay: '0.3s' },
  { label: 'Akashic Records',  top: '45%',   left: '3%',   anim: 'hB-floatB', dur: '3.8s', delay: '0.6s' },
  { label: 'Reiki Healing',    top: '45%',   right: '3%',  anim: 'hB-floatA', dur: '4.2s', delay: '0.9s' },
  { label: 'Manifestation',    bottom: '13%',left: '11%',  anim: 'hB-floatA', dur: '3.4s', delay: '1.2s' },
  { label: 'Chakra Balancing', bottom: '13%',right: '8%',  anim: 'hB-floatB', dur: '3.9s', delay: '1.5s' },
]

const sparks = [
  [16,20],[79,16],[8,52],[88,46],[22,77],[85,79],[50,6],[50,90],[63,28],[33,65],
  [71,60],[12,38],[91,33],[44,14],[57,82],[75,44],[25,55],
]

export default function HeroB() {
  return (
    <section className="hB-section" style={{ display: 'flex', minHeight: 'calc(100vh - 102px)' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ══ LEFT — dark espresso ══ */}
      <div className="hB-left" style={{
        width: '55%',
        background: '#2C1A0E',
        backgroundImage: 'radial-gradient(ellipse 80% 70% at 28% 52%, #3D2010 0%, #2C1A0E 52%, #1A0C04 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '4.5rem 3.5rem 4.5rem 6%',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '2.2rem', left: '6%', display: 'flex', alignItems: 'center', gap: '10px', animation: 'hB-fadeIn .4s ease both' }}>
          <div style={{ width: 26, height: 1, background: 'linear-gradient(90deg,#C4780A,#D4AD25)' }} />
          <span style={{ fontSize: '9px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#C4780A', opacity: 0.65 }}>Spiritual Wellness · India</span>
        </div>

        <div className="hB-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'rgba(212,173,37,0.09)', border: '1px solid rgba(212,173,37,0.26)', borderRadius: '100px', padding: '7px 16px 7px 9px', marginBottom: '1.6rem', alignSelf: 'flex-start', animation: 'hB-fadeUp .5s .04s ease both' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(212,173,37,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#D4AD25' }}>✦</div>
          <span style={{ fontSize: '11.5px', color: 'rgba(245,239,228,0.72)', letterSpacing: '0.01em' }}>500+ Seekers Healed Across India</span>
        </div>

        <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem,4.4vw,4.2rem)', color: '#F5EFE4', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.6rem', animation: 'hB-fadeUp .6s .1s ease both' }}>
          Begin Your<br />
          <span style={{ color: '#D4AD25', fontStyle: 'italic' }}>Inner Journey</span>
        </h1>

        <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '0.9rem', lineHeight: 1.95, maxWidth: '410px', marginBottom: '2.2rem', animation: 'hB-fadeUp .6s .18s ease both' }}>
          Book personalised healing sessions — Tarot, Akashic Records, Theta Healing and more — with Hemavathi and Shruthi. Guided by ancient wisdom, delivered with modern ease.
        </p>

        <div className="hB-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.6rem', animation: 'hB-fadeUp .6s .26s ease both' }}>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4AD25', color: '#1A0C04', borderRadius: '100px', padding: '13px 28px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            Explore Sessions <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
          <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', border: '1.5px solid rgba(212,173,37,0.38)', color: 'rgba(245,239,228,0.78)', borderRadius: '100px', padding: '12px 26px', fontSize: '14px', textDecoration: 'none' }}>
            Meet Our Practitioners
          </Link>
        </div>

        <div className="hB-stats-row" style={{ display: 'flex', gap: '2.5rem', paddingBottom: '1.8rem', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '1.8rem', animation: 'hB-fadeUp .6s .32s ease both' }}>
          {stats.map(s => (
            <div key={s.val}>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.65rem', color: '#D4AD25', fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '9.5px', color: 'rgba(245,239,228,0.32)', marginTop: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', animation: 'hB-fadeUp .6s .38s ease both' }}>
          {badges.map(({ Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(245,239,228,0.36)', fontSize: '12.5px' }}>
              <Icon style={{ width: 14, height: 14, color: '#D4AD25', flexShrink: 0 }} />
              {text}
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '2.2rem', left: '6%', display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['✦', '·', '✦', '·', '✦'].map((c, i) => (
            <span key={i} style={{ fontSize: i % 2 === 0 ? '8px' : '11px', color: '#D4AD25', opacity: i % 2 === 0 ? 0.38 : 0.14 }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ══ RIGHT — Mandala on warm cream ══ */}
      <div className="hB-right" style={{
        width: '45%',
        background: 'radial-gradient(ellipse 78% 68% at 50% 48%, #EAD9BE 0%, #F0E6D3 38%, #F5EFE4 68%, #EDE4D4 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />

        <svg style={{ position: 'absolute', width: '88%', height: '88%', top: '6%', left: '6%', opacity: 0.065, pointerEvents: 'none' }} viewBox="0 0 500 500" fill="none" stroke="#8B5A2A" strokeWidth="0.8">
          <circle cx="250" cy="250" r="82"/><circle cx="332" cy="250" r="82"/><circle cx="291" cy="321" r="82"/>
          <circle cx="209" cy="321" r="82"/><circle cx="168" cy="250" r="82"/><circle cx="209" cy="179" r="82"/>
          <circle cx="291" cy="179" r="82"/>
          <circle cx="250" cy="250" r="163" strokeDasharray="4 10"/>
          <circle cx="250" cy="250" r="234" strokeDasharray="2 14"/>
        </svg>

        {sparks.map(([x, y], i) => (
          <div key={i} style={{ position: 'absolute', left: x + '%', top: y + '%', width: i % 4 === 0 ? '4px' : '2.5px', height: i % 4 === 0 ? '4px' : '2.5px', borderRadius: '50%', background: '#D4AD25', animation: `hB-spark ${2.8 + (i % 5) * 0.5}s ease-in-out ${i * 0.22}s infinite`, pointerEvents: 'none' }} />
        ))}

        {/* Ring 1 */}
        <div style={{ position: 'absolute', width: 456, height: 456, top: '50%', left: '50%', marginTop: -228, marginLeft: -228, animation: 'hB-cw 92s linear infinite' }}>
          <svg viewBox="0 0 456 456" style={{ width: '100%', height: '100%', opacity: 0.28 }} fill="none">
            <circle cx="228" cy="228" r="220" stroke="#C4780A" strokeWidth="0.7" strokeDasharray="5 11"/>
            {Array.from({ length: 24 }, (_, i) => { const a = (i/24)*Math.PI*2; return <line key={i} x1={228+211*Math.cos(a)} y1={228+211*Math.sin(a)} x2={228+220*Math.cos(a)} y2={228+220*Math.sin(a)} stroke="#C4780A" strokeWidth="1.8"/> })}
          </svg>
        </div>

        {/* Ring 2 */}
        <div style={{ position: 'absolute', width: 372, height: 372, top: '50%', left: '50%', marginTop: -186, marginLeft: -186, animation: 'hB-ccw 68s linear infinite' }}>
          <svg viewBox="0 0 372 372" style={{ width: '100%', height: '100%', opacity: 0.36 }} fill="none">
            <circle cx="186" cy="186" r="179" stroke="#D4AD25" strokeWidth="0.9"/>
            <circle cx="186" cy="186" r="166" stroke="#C4780A" strokeWidth="0.5" strokeDasharray="3 8"/>
            {Array.from({ length: 8 }, (_, i) => { const a=(i/8)*Math.PI*2,hw=7,px=186+179*Math.cos(a),py=186+179*Math.sin(a); return <polygon key={i} points={`${px},${py-hw} ${px+hw},${py} ${px},${py+hw} ${px-hw},${py}`} fill="#D4AD25" opacity="0.92"/> })}
          </svg>
        </div>

        {/* Ring 3 */}
        <div style={{ position: 'absolute', width: 294, height: 294, top: '50%', left: '50%', marginTop: -147, marginLeft: -147, animation: 'hB-cw 48s linear infinite' }}>
          <svg viewBox="0 0 294 294" style={{ width: '100%', height: '100%', opacity: 0.44 }} fill="none">
            <circle cx="147" cy="147" r="140" stroke="#C4780A" strokeWidth="0.9" strokeDasharray="4 7"/>
            {Array.from({ length: 12 }, (_, i) => { const a=(i/12)*Math.PI*2; return <circle key={i} cx={147+140*Math.cos(a)} cy={147+140*Math.sin(a)} r="3.5" fill="#D4AD25" opacity="0.9"/> })}
          </svg>
        </div>

        {/* Ring 4 */}
        <div style={{ position: 'absolute', width: 218, height: 218, top: '50%', left: '50%', marginTop: -109, marginLeft: -109, animation: 'hB-ccw 32s linear infinite' }}>
          <svg viewBox="0 0 218 218" style={{ width: '100%', height: '100%', opacity: 0.50 }} fill="none">
            <circle cx="109" cy="109" r="103" stroke="#D4AD25" strokeWidth="1.2"/>
            <circle cx="109" cy="109" r="89" stroke="#C4780A" strokeWidth="0.6" strokeDasharray="3 5"/>
            {Array.from({ length: 6 }, (_, i) => { const a=(i/6)*Math.PI*2; return <line key={i} x1={109+89*Math.cos(a)} y1={109+89*Math.sin(a)} x2={109+103*Math.cos(a)} y2={109+103*Math.sin(a)} stroke="#D4AD25" strokeWidth="2" opacity="0.85"/> })}
          </svg>
        </div>

        {/* Ring 5 — lotus petals */}
        <div style={{ position: 'absolute', width: 148, height: 148, top: '50%', left: '50%', marginTop: -74, marginLeft: -74 }}>
          <svg viewBox="0 0 148 148" style={{ width: '100%', height: '100%', opacity: 0.55 }} fill="none">
            {Array.from({ length: 8 }, (_, i) => { const a=(i/8)*Math.PI*2,px=74+44*Math.cos(a),py=74+44*Math.sin(a),rot=(i/8)*360; return <ellipse key={i} cx={px} cy={py} rx="11" ry="28" fill="rgba(212,173,37,0.1)" stroke="rgba(196,120,10,0.52)" strokeWidth="1" transform={`rotate(${rot} ${px} ${py})`}/> })}
            <circle cx="74" cy="74" r="28" stroke="#D4AD25" strokeWidth="1" strokeDasharray="3 4"/>
          </svg>
        </div>

        {/* Glow halo */}
        <div style={{ position: 'absolute', width: 230, height: 230, top: '50%', left: '50%', marginTop: -115, marginLeft: -115, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,173,37,0.2) 0%, rgba(196,120,10,0.08) 52%, transparent 75%)', animation: 'hB-glow 4.5s ease-in-out infinite' }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 10, animation: 'hB-fadeIn .9s .2s ease both' }}>
          <Image src="/Logo.png" alt="PranaTatva" width={188} height={170} style={{ objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 6px 26px rgba(196,120,10,0.44)) drop-shadow(0 2px 8px rgba(196,120,10,0.22))' }} priority />
        </div>

        {/* Social proof */}
        <div className="hB-social" style={{ position: 'absolute', bottom: '26%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(196,120,10,0.22)', borderRadius: '100px', padding: '5px 15px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 3px 16px rgba(196,120,10,0.1)', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap', zIndex: 10, animation: 'hB-floatB 5.5s ease-in-out infinite' }}>
          <span style={{ fontSize: '11px', color: '#D4AD25' }}>★★★★★</span>
          <span style={{ fontSize: '10px', color: '#5C3D28' }}>Rated 5★ by 500+ Seekers</span>
        </div>

        {/* Pills */}
        {pills.map((p, i) => {
          const pos: Record<string, string> = {}
          if (p.top)    pos.top    = p.top
          if (p.bottom) pos.bottom = p.bottom
          if (p.left)   pos.left   = p.left
          if (p.right)  pos.right  = p.right
          return (
            <div key={p.label} className="hB-pill" style={{ position: 'absolute', ...pos, background: 'rgba(255,255,255,0.86)', border: '1px solid rgba(196,120,10,0.22)', borderRadius: '100px', padding: '6px 14px', fontSize: '10.5px', color: '#5C3D28', letterSpacing: '0.03em', backdropFilter: 'blur(8px)', boxShadow: '0 3px 14px rgba(196,120,10,0.1)', animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`, whiteSpace: 'nowrap', zIndex: 8 }}>
              <span style={{ color: '#C4780A', marginRight: '5px', fontSize: '8px' }}>✦</span>{p.label}
            </div>
          )
        })}

        {[{top:'6%',left:'7%'},{top:'6%',right:'7%'},{bottom:'6%',left:'7%'},{bottom:'6%',right:'7%'}].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, color: '#C4780A', fontSize: '14px', animation: `hB-shimmer ${3 + i * 0.55}s ease-in-out ${i * 0.45}s infinite` }}>✦</div>
        ))}

        <div style={{ position: 'absolute', bottom: '1.6rem', left: 0, right: 0, textAlign: 'center', fontSize: '8.5px', letterSpacing: '4px', textTransform: 'uppercase', color: '#9C7A60' }}>
          Sacred Healing Portal · India
        </div>
      </div>
    </section>
  )
}
