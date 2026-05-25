'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CSS = `
@keyframes hC-fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
@keyframes hC-fadeIn  { from { opacity:0; } to { opacity:1; } }
@keyframes hC-cw      { to { transform:rotate(360deg); } }
@keyframes hC-ccw     { to { transform:rotate(-360deg); } }
@keyframes hC-drift   { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-13px) rotate(1.5deg); } }
@keyframes hC-pulse   { 0%,100% { opacity:.12; transform:scale(1); } 50% { opacity:.28; transform:scale(1.04); } }
@keyframes hC-spark   { 0%,100% { opacity:.14; transform:scale(1); } 50% { opacity:.72; transform:scale(1.5); } }
@keyframes hC-floatA  { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-7px); } }
@keyframes hC-floatB  { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(6px); } }
@keyframes hC-glowLotus { 0%,100% { filter:drop-shadow(0 0 22px rgba(180,140,255,.38)); } 50% { filter:drop-shadow(0 0 50px rgba(180,140,255,.7)); } }
@keyframes hC-shimmer { 0%,100% { opacity:.2; transform:scale(1); } 50% { opacity:.65; transform:scale(1.2); } }

/* ── Responsive ── */
@media (max-width: 767px) {
  .hC-wrap { flex-direction: column !important; padding: 0 !important; }
  .hC-left {
    flex: none !important; width: 100% !important; max-width: 100% !important;
    padding: 2.8rem 1.5rem 1.8rem !important;
  }
  .hC-left h1 { font-size: 2.3rem !important; margin-bottom: 0.4rem !important; }
  .hC-left p  { font-size: 0.84rem !important; max-width: 100% !important; margin-bottom: 1.5rem !important; }
  .hC-cta-row { gap: 0.75rem !important; margin-bottom: 2rem !important; }
  .hC-cta-row a { padding: 11px 22px !important; font-size: 13px !important; }
  .hC-right {
    flex: none !important; width: 100% !important;
    height: 320px !important; overflow: hidden !important;
    padding: 0 !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
    position: relative !important;
  }
  .hC-pill, .hC-social { display: none !important; }
  .hC-lotus { width: 80% !important; max-width: 280px !important; }
  .hC-eyebrow { margin-bottom: 1.2rem !important; }
  .hC-rule { margin-bottom: 1rem !important; }
  .hC-stats { gap: 1.8rem !important; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .hC-left { flex: 0 0 50% !important; padding: 3rem 2% 3rem 4% !important; }
  .hC-right { flex: 0 0 48% !important; }
  .hC-left h1 { font-size: clamp(2rem,3.8vw,3rem) !important; }
}
`

const stats = [
  { val: '1,400+', lbl: 'Sessions · Hemavathi' },
  { val: '900+',   lbl: 'Readings · Shruthi' },
  { val: '10+',    lbl: 'Healing Modalities' },
]

const STARS = [
  [4,10,true],[13,67,false],[27,87,true],[46,6,false],[60,91,true],[77,9,false],
  [91,73,true],[95,26,false],[34,46,true],[56,31,false],[19,36,true],[83,85,false],
  [50,14,true],[70,58,false],[22,74,true],[88,43,false],[38,20,true],[62,80,false],
  [8,52,false],[85,18,true],[44,92,false],[72,35,true],[16,28,false],[90,64,true],
]

const pills = [
  { label: 'Theta Healing',    top: '8%',    left: '5%',   anim: 'hC-floatA', dur: '3.6s', delay: '0s'   },
  { label: 'Tarot Reading',    top: '8%',    right: '4%',  anim: 'hC-floatB', dur: '4.0s', delay: '0.3s' },
  { label: 'Akashic Records',  top: '44%',   left: '2%',   anim: 'hC-floatB', dur: '3.8s', delay: '0.6s' },
  { label: 'Reiki Healing',    top: '44%',   right: '2%',  anim: 'hC-floatA', dur: '4.2s', delay: '0.9s' },
  { label: 'Manifestation',    bottom: '9%', left: '5%',   anim: 'hC-floatA', dur: '3.4s', delay: '1.2s' },
  { label: 'Chakra Balancing', bottom: '9%', right: '4%',  anim: 'hC-floatB', dur: '3.9s', delay: '1.5s' },
]

export default function HeroC() {
  return (
    <section
      style={{
        minHeight: 'calc(100vh - 102px)',
        background: '#0D0820',
        backgroundImage: [
          'radial-gradient(ellipse 65% 55% at 80% 38%, rgba(130,65,240,0.58) 0%, transparent 62%)',
          'radial-gradient(ellipse 70% 65% at 12% 70%, rgba(55,18,110,0.78) 0%, transparent 58%)',
          'linear-gradient(158deg, #0D0820 0%, #150E38 28%, #26166A 58%, #150E38 100%)',
        ].join(','),
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Ambient rings */}
      <div style={{ position: 'absolute', top: '50%', right: '22%', transform: 'translate(50%,-50%)', pointerEvents: 'none' }}>
        {[380, 308, 236, 164].map((r, i) => (
          <div key={i} style={{ position: 'absolute', width: r * 2, height: r * 2, borderRadius: '50%', border: '1px solid rgba(150,110,255,0.08)', top: '50%', left: '50%', marginTop: -r, marginLeft: -r, animation: `hC-pulse ${6 + i * 2}s ease-in-out ${i}s infinite` }} />
        ))}
      </div>

      {/* Stars */}
      {STARS.map(([x, y, isGold], i) => (
        <div key={i} style={{ position: 'absolute', left: x + '%', top: y + '%', width: i % 5 === 0 ? '3.5px' : i % 3 === 0 ? '2.5px' : '1.5px', height: i % 5 === 0 ? '3.5px' : i % 3 === 0 ? '2.5px' : '1.5px', borderRadius: '50%', background: isGold ? '#E8C840' : 'rgba(200,178,255,0.8)', animation: `hC-spark ${2.5 + (i % 5) * 0.6}s ease-in-out ${i * 0.24}s infinite`, pointerEvents: 'none' }} />
      ))}

      <div className="hC-wrap" style={{ display: 'flex', width: '100%', padding: '4rem 3% 4rem 6%', alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* ══ LEFT ══ */}
        <div className="hC-left" style={{ flex: '0 0 48%', maxWidth: 560 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.4rem', animation: 'hC-fadeIn .4s ease both' }}>
            <div style={{ width: 26, height: 1, background: 'linear-gradient(90deg, #8B5CF6, #E8C840)' }} />
            <span style={{ fontSize: '9px', letterSpacing: '3.5px', textTransform: 'uppercase', color: 'rgba(180,160,255,0.6)' }}>Spiritual Wellness · India</span>
          </div>

          <div className="hC-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(150,110,255,0.1)', border: '1px solid rgba(150,110,255,0.3)', borderRadius: '100px', padding: '6px 16px 6px 10px', marginBottom: '1.8rem', animation: 'hC-fadeUp .5s .04s ease both' }}>
            <span style={{ fontSize: 13 }}>✨</span>
            <span style={{ fontSize: '11px', color: 'rgba(220,208,255,0.82)', letterSpacing: '0.04em' }}>500+ Seekers Healed Across India</span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem,4.5vw,4.4rem)', color: '#F5F0FF', fontWeight: 400, lineHeight: 1.08, marginBottom: '0.5rem', animation: 'hC-fadeUp .6s .1s ease both' }}>
            Awaken Your
          </h1>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem,4.5vw,4.4rem)', color: '#E8C840', fontWeight: 400, lineHeight: 1.08, marginBottom: '1.4rem', fontStyle: 'italic', animation: 'hC-fadeUp .6s .16s ease both' }}>
            Highest Self
          </h1>

          <div className="hC-rule" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.4rem', animation: 'hC-fadeIn .6s .2s ease both' }}>
            <div style={{ height: '1.5px', width: 38, background: 'linear-gradient(90deg, #8B5CF6, #E8C840)' }} />
            <span style={{ fontSize: '9.5px', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(180,160,255,0.55)' }}>Ancient Wisdom · Modern Healing</span>
          </div>

          <p style={{ color: 'rgba(215,205,255,0.6)', fontSize: '0.9rem', lineHeight: 1.95, maxWidth: '420px', marginBottom: '2rem', animation: 'hC-fadeUp .6s .24s ease both' }}>
            Step into a sacred space of transformation. Hemavathi and Shruthi bring you time-honoured healing modalities — Theta, Akashic, Tarot, Reiki — channelled with devotion.
          </p>

          <div className="hC-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem', animation: 'hC-fadeUp .6s .32s ease both' }}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E8C840', color: '#0D0820', borderRadius: '100px', padding: '13px 28px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>
              Begin Your Journey <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
            <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(150,110,255,0.38)', color: 'rgba(215,205,255,0.8)', borderRadius: '100px', padding: '12px 26px', fontSize: '13.5px', textDecoration: 'none', background: 'transparent' }}>
              Our Practitioners
            </Link>
          </div>

          <div className="hC-stats" style={{ display: 'flex', gap: '2.5rem', paddingTop: '1.6rem', borderTop: '1px solid rgba(150,110,255,0.14)', animation: 'hC-fadeUp .6s .4s ease both' }}>
            {stats.map(s => (
              <div key={s.val}>
                <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.65rem', color: '#E8C840', fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '10px', color: 'rgba(190,170,255,0.42)', marginTop: '3px', letterSpacing: '0.04em' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT — Celestial Lotus ══ */}
        <div className="hC-right" style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '1%', position: 'relative' }}>

          {/* Outer ring 1 */}
          <div style={{ position: 'absolute', width: 510, height: 510, top: '50%', left: '50%', marginTop: -255, marginLeft: -255, animation: 'hC-cw 65s linear infinite' }}>
            <svg viewBox="0 0 510 510" style={{ width: '100%', height: '100%', opacity: 0.22 }} fill="none">
              <circle cx="255" cy="255" r="246" stroke="#B08AFF" strokeWidth="0.7" strokeDasharray="5 11"/>
              {Array.from({ length: 18 }, (_, i) => { const a=(i/18)*Math.PI*2; return <line key={i} x1={255+237*Math.cos(a)} y1={255+237*Math.sin(a)} x2={255+246*Math.cos(a)} y2={255+246*Math.sin(a)} stroke="#E8C840" strokeWidth="1.5"/> })}
            </svg>
          </div>

          {/* Outer ring 2 */}
          <div style={{ position: 'absolute', width: 428, height: 428, top: '50%', left: '50%', marginTop: -214, marginLeft: -214, animation: 'hC-ccw 48s linear infinite' }}>
            <svg viewBox="0 0 428 428" style={{ width: '100%', height: '100%', opacity: 0.28 }} fill="none">
              <circle cx="214" cy="214" r="206" stroke="#E8C840" strokeWidth="0.8"/>
              <circle cx="214" cy="214" r="194" stroke="#B08AFF" strokeWidth="0.5" strokeDasharray="3 8"/>
              {Array.from({ length: 8 }, (_, i) => { const a=(i/8)*Math.PI*2,hw=7,px=214+206*Math.cos(a),py=214+206*Math.sin(a); return <polygon key={i} points={`${px},${py-hw} ${px+hw},${py} ${px},${py+hw} ${px-hw},${py}`} fill="#E8C840" opacity="0.92"/> })}
            </svg>
          </div>

          {/* Lotus illustration */}
          <div className="hC-lotus" style={{ position: 'relative', width: '88%', maxWidth: 430, aspectRatio: '1', animation: 'hC-drift 8s ease-in-out infinite' }}>
            <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', animation: 'hC-glowLotus 5s ease-in-out infinite' }}>
              <defs>
                <radialGradient id="hC3-aura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(160,120,255,0.32)"/>
                  <stop offset="100%" stopColor="rgba(160,120,255,0)"/>
                </radialGradient>
                <radialGradient id="hC3-innerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(232,200,64,0.25)"/>
                  <stop offset="100%" stopColor="rgba(232,200,64,0)"/>
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="188" fill="url(#hC3-aura)"/>
              {Array.from({ length: 12 }, (_, i) => { const a=(i/12)*Math.PI*2-Math.PI/2,px=200+132*Math.cos(a),py=200+132*Math.sin(a),rot=(i/12)*360; return <ellipse key={i} cx={px} cy={py} rx="18" ry="52" fill="rgba(160,120,255,0.06)" stroke="rgba(180,148,255,0.48)" strokeWidth="1.2" transform={`rotate(${rot} ${px} ${py})`}/> })}
              {Array.from({ length: 8 }, (_, i) => { const a=(i/8)*Math.PI*2-Math.PI/2,px=200+85*Math.cos(a),py=200+85*Math.sin(a),rot=(i/8)*360; return <ellipse key={i} cx={px} cy={py} rx="16" ry="38" fill="rgba(160,120,255,0.1)" stroke="rgba(200,172,255,0.68)" strokeWidth="1.5" transform={`rotate(${rot} ${px} ${py})`}/> })}
              {Array.from({ length: 6 }, (_, i) => { const a=(i/6)*Math.PI*2-Math.PI/2,px=200+48*Math.cos(a),py=200+48*Math.sin(a),rot=(i/6)*360; return <ellipse key={i} cx={px} cy={py} rx="12" ry="26" fill="rgba(232,200,64,0.14)" stroke="rgba(232,200,64,0.78)" strokeWidth="1.5" transform={`rotate(${rot} ${px} ${py})`}/> })}
              <circle cx="200" cy="200" r="162" stroke="rgba(160,120,255,0.15)" strokeWidth="0.8" fill="none"/>
              <circle cx="200" cy="200" r="106" stroke="rgba(190,160,255,0.22)" strokeWidth="0.8" fill="none"/>
              <circle cx="200" cy="200" r="60" stroke="rgba(232,200,64,0.34)" strokeWidth="1" fill="none"/>
              <circle cx="200" cy="200" r="52" fill="url(#hC3-innerGlow)"/>
              <circle cx="200" cy="200" r="50" fill="rgba(245,242,255,0.92)" stroke="rgba(200,172,255,0.65)" strokeWidth="1.5"/>
              <foreignObject x="147" y="147" width="106" height="106">
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden' }}>
                  <img src="/Logo.png" alt="PranaTatva" style={{ width: '82px', height: '74px', objectFit: 'contain' }} />
                </div>
              </foreignObject>
            </svg>

            {/* Close-orbit rotating ring */}
            <div style={{ position: 'absolute', inset: '-8%', animation: 'hC-cw 30s linear infinite' }}>
              <svg viewBox="0 0 520 520" style={{ width: '100%', height: '100%', opacity: 0.28 }}>
                <circle cx="260" cy="260" r="252" stroke="#E8C840" strokeWidth="0.8" strokeDasharray="4 12" fill="none"/>
                {Array.from({ length: 16 }, (_, i) => { const a=(i/16)*Math.PI*2; return <line key={i} x1={260+244*Math.cos(a)} y1={260+244*Math.sin(a)} x2={260+252*Math.cos(a)} y2={260+252*Math.sin(a)} stroke="#E8C840" strokeWidth="1.5"/> })}
              </svg>
            </div>
          </div>

          {/* Pills */}
          {pills.map((p, i) => {
            const pos: Record<string, string> = {}
            if (p.top)    pos.top    = p.top
            if (p.bottom) pos.bottom = p.bottom
            if (p.left)   pos.left   = p.left
            if (p.right)  pos.right  = p.right
            return (
              <div key={p.label} className="hC-pill" style={{ position: 'absolute', ...pos, background: 'rgba(20,12,48,0.78)', border: '1px solid rgba(150,110,255,0.35)', borderRadius: '100px', padding: '6px 14px', fontSize: '10.5px', color: 'rgba(220,208,255,0.9)', letterSpacing: '0.03em', backdropFilter: 'blur(12px)', boxShadow: '0 3px 18px rgba(100,60,220,0.2)', animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`, whiteSpace: 'nowrap', zIndex: 8 }}>
                <span style={{ color: '#E8C840', marginRight: '5px', fontSize: '8px' }}>✦</span>{p.label}
              </div>
            )
          })}

          {/* Social proof */}
          <div className="hC-social" style={{ position: 'absolute', bottom: '18%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(20,12,48,0.82)', border: '1px solid rgba(232,200,64,0.3)', borderRadius: '100px', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(12px)', whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 20px rgba(100,60,220,0.22)', animation: 'hC-floatB 5.5s ease-in-out infinite' }}>
            <span style={{ fontSize: '11px', color: '#E8C840' }}>★★★★★</span>
            <span style={{ fontSize: '10px', color: 'rgba(215,205,255,0.85)' }}>Rated 5★ by 500+ Seekers</span>
          </div>

          {[{top:'6%',left:'3%'},{top:'6%',right:'3%'},{bottom:'6%',left:'3%'},{bottom:'6%',right:'3%'}].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', ...pos, color: '#E8C840', fontSize: '13px', animation: `hC-shimmer ${3 + i * 0.55}s ease-in-out ${i * 0.45}s infinite` }}>✦</div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 60" style={{ display: 'block', width: '100%' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F0E8D6" opacity="0.1"/>
        </svg>
      </div>
    </section>
  )
}
