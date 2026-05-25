'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Star { x: number; y: number; size: number; opacity: number; delay: number; twinkle: boolean }

const services = [
  { symbol: '◈', name: 'Theta Healing Deep Dive', desc: 'Enter the theta brainwave state and permanently dissolve the limiting beliefs that have held you back for years.', price: '₹2,500', slug: 'theta-healing-deep-dive', practitioner: 'Hemavathi' },
  { symbol: '◇', name: 'Tarot Card Reading', desc: "Shruthi's intuitive readings illuminate your path — clarity on love, career, purpose, and the soul's next direction.", price: '₹1,800', slug: 'tarot-card-reading', practitioner: 'Shruthi' },
  { symbol: '✦', name: 'Akashic Records Soul Reading', desc: 'Access the cosmic library of your soul — past lives, karmic contracts, and the blueprint of your highest potential.', price: '₹2,200', slug: 'akashic-records-soul-reading', practitioner: 'Shruthi' },
]

const testimonials = [
  { name: 'Priya M.', location: 'Bengaluru', quote: 'Hemavathi shifted something I had carried for 12 years in a single session. I left feeling completely free — lighter than I have felt in my entire adult life.' },
  { name: 'Rahul S.', location: 'Hyderabad', quote: 'After one session I finally understood why I kept self-sabotaging. Within 10 days I received two new client referrals and a promotion offer.' },
  { name: 'Deepa K.', location: 'Chennai', quote: "Shruthi's Tarot reading gave me clarity I had been seeking for months. The accuracy was uncanny and her guidance was grounded and compassionate." },
]

export default function DesignBPage() {
  const [stars, setStars] = useState<Star[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setStars(Array.from({ length: 130 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.08 ? 2.8 : Math.random() < 0.25 ? 1.6 : 0.7,
      opacity: Math.random() * 0.55 + 0.15,
      delay: Math.random() * 6,
      twinkle: Math.random() > 0.38,
    })))
  }, [])

  return (
    <div style={{ fontFamily: "'Nunito', system-ui, sans-serif", background: '#07071A', color: '#BCC8D8', minHeight: '100vh' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,600&family=Nunito:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle { 0%,100%{opacity:.12;transform:scale(.85)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes floatUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes goldPulse { 0%,100%{opacity:.08} 50%{opacity:.18} }
        .cel { font-family: 'Cormorant Garamond', Georgia, serif; }
        .star { position:absolute; border-radius:50%; background:white; pointer-events:none; }
        .star.t { animation:twinkle var(--d,4s) ease-in-out infinite; }
        .a0 { animation:floatUp 1.1s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation:floatUp 1.1s .18s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation:floatUp 1.1s .36s cubic-bezier(.16,1,.3,1) both; }
        .a3 { animation:floatUp 1.1s .52s cubic-bezier(.16,1,.3,1) both; }
        .ring { animation:rotateSlow 50s linear infinite; transform-origin:center; }
        .ring2 { animation:rotateSlow 30s linear infinite reverse; transform-origin:center; }
        .card-cel { transition:border-color .3s,transform .3s; }
        .card-cel:hover { border-color:rgba(212,175,55,.48)!important; transform:translateY(-5px); }
        .nav-a { color:#7A90B0; font-size:.78rem; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; transition:color .2s; }
        .nav-a:hover { color:#D4AF37; }
        .btn-gold { display:inline-block; padding:.85rem 2.2rem; border-radius:100px; background:#D4AF37; color:#07071A; font-weight:700; font-size:.88rem; letter-spacing:.05em; text-decoration:none; transition:all .2s; }
        .btn-gold:hover { background:#E8C850; transform:translateY(-1px); }
        .btn-ghost { display:inline-block; padding:.85rem 2.2rem; border-radius:100px; border:1px solid rgba(212,175,55,.38); color:#D4AF37; font-size:.88rem; letter-spacing:.05em; text-decoration:none; transition:all .2s; }
        .btn-ghost:hover { border-color:rgba(212,175,55,.7); background:rgba(212,175,55,.06); }
        .stat-val { font-family:'Cormorant Garamond',Georgia,serif; font-size:1.7rem; color:#D4AF37; font-weight:400; }
        .stat-lbl { font-size:.68rem; color:#6A7A90; letter-spacing:.12em; text-transform:uppercase; margin-top:.15rem; }
        .quote-mark { font-family:'Cormorant Garamond',Georgia,serif; font-size:5rem; color:#D4AF37; opacity:.22; line-height:1; margin-bottom:-.8rem; display:block; }
        .quote-text { font-family:'Cormorant Garamond',Georgia,serif; font-style:italic; font-size:1.02rem; color:#B0C0D4; line-height:1.85; font-weight:300; }
      ` }} />

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:999, height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2.5rem', background:'rgba(7,7,26,.82)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(212,175,55,.1)' }}>
        <Link href="/designs" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="3" fill="#D4AF37" />
            {[0,45,90,135].map(a => <ellipse key={a} cx="13" cy="7.5" rx="2.2" ry="5" fill="#D4AF37" opacity=".6" transform={`rotate(${a} 13 13)`} />)}
            {[22.5,67.5,112.5,157.5].map(a => <ellipse key={a} cx="13" cy="7.5" rx="2.2" ry="5" fill="#D4AF37" opacity=".3" transform={`rotate(${a} 13 13)`} />)}
          </svg>
          <span className="cel" style={{ fontSize:'1.25rem', color:'#D4AF37', letterSpacing:'.05em', fontWeight:400 }}>PranaTatva</span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
          {['Services','About','Events','Blog'].map(l => <a key={l} href="#" className="nav-a">{l}</a>)}
          <a href="#" className="nav-a" style={{ border:'1px solid rgba(212,175,55,.3)', padding:'.35rem 1rem', borderRadius:'100px', color:'#D4AF37' }}>Sign In</a>
          <a href="/book" className="btn-gold" style={{ padding:'.4rem 1.2rem', fontSize:'.8rem' }}>Book a Session</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'radial-gradient(ellipse 70% 80% at 25% 50%,#0E0C2A 0%,#07071A 65%)' }}>
        {/* Stars */}
        {mounted && stars.map((s, i) => (
          <div key={i} className={`star${s.twinkle ? ' t' : ''}`}
            style={{ left:`${s.x}%`, top:`${s.y}%`, width:`${s.size}px`, height:`${s.size}px`, opacity:s.opacity, '--d':`${2.8+s.delay}s`, animationDelay:`${s.delay}s` } as React.CSSProperties} />
        ))}

        {/* Celestial rings - right side */}
        <div style={{ position:'absolute', right:'-120px', top:'50%', transform:'translateY(-50%)', width:'640px', height:'640px', opacity:.1, pointerEvents:'none' }}>
          <svg viewBox="0 0 640 640" fill="none" style={{ width:'100%', height:'100%' }}>
            <g className="ring">
              <circle cx="320" cy="320" r="305" stroke="#D4AF37" strokeWidth=".6" />
              {Array.from({length:24}).map((_,i) => {
                const a = (i*15)*Math.PI/180
                return <line key={i} x1={320+292*Math.cos(a)} y1={320+292*Math.sin(a)} x2={320+305*Math.cos(a)} y2={320+305*Math.sin(a)} stroke="#D4AF37" strokeWidth="1.2" />
              })}
            </g>
            <g className="ring2">
              <circle cx="320" cy="320" r="230" stroke="#D4AF37" strokeWidth=".5" strokeDasharray="3 9" />
              <circle cx="320" cy="320" r="155" stroke="#D4AF37" strokeWidth=".5" />
              {Array.from({length:8}).map((_,i) => {
                const a = (i*45)*Math.PI/180
                const x1=320+145*Math.cos(a), y1=320+145*Math.sin(a)
                const x2=320+165*Math.cos(a), y2=320+165*Math.sin(a)
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="1" />
              })}
            </g>
            <circle cx="320" cy="320" r="60" stroke="#D4AF37" strokeWidth=".5" strokeDasharray="2 5" />
            <circle cx="320" cy="320" r="20" stroke="#D4AF37" strokeWidth=".8" />
            <circle cx="320" cy="320" r="5" fill="#D4AF37" opacity=".6" />
          </svg>
        </div>

        {/* Content */}
        <div style={{ position:'relative', zIndex:10, maxWidth:'1200px', margin:'0 auto', padding:'0 2.5rem', paddingTop:'90px', width:'100%' }}>
          <div className="a0" style={{ fontSize:'.68rem', letterSpacing:'.35em', textTransform:'uppercase', color:'#D4AF37', marginBottom:'1.6rem' }}>
            ✦ &nbsp; Inner Healing with PranaTatva &nbsp; ✦
          </div>
          <h1 className="cel a1" style={{ fontSize:'clamp(3.8rem,8.5vw,7.5rem)', lineHeight:1.03, fontWeight:300, fontStyle:'italic', color:'#EDE8DC', marginBottom:'1.8rem', maxWidth:'680px' }}>
            Heal Into<br />
            <span style={{ color:'#D4AF37' }}>Your Highest</span><br />
            Self
          </h1>
          <p className="a2" style={{ fontSize:'1.04rem', color:'#7A90B0', lineHeight:1.85, marginBottom:'2.4rem', maxWidth:'420px', fontWeight:300 }}>
            Sacred 1:1 healing sessions with master practitioners Hemavathi and Shruthi — Theta Healing, Tarot, Akashic Records, and Manifestation Coaching delivered across India.
          </p>
          <div className="a3" style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <a href="/services" className="btn-gold">Begin Your Journey</a>
            <a href="/services" className="btn-ghost">Explore Sessions →</a>
          </div>

          {/* Stats */}
          <div className="a3" style={{ display:'flex', gap:'3rem', marginTop:'4rem', paddingTop:'2.5rem', borderTop:'1px solid rgba(212,175,55,.1)', flexWrap:'wrap' }}>
            {[['2,300+','Healing Sessions'],['7 yrs','Combined Practice'],['4.9 ★','Client Rating'],['₹1,800','Starting From']].map(([v,l]) => (
              <div key={l}><div className="stat-val">{v}</div><div className="stat-lbl">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTITIONERS */}
      <section style={{ padding:'5.5rem 2.5rem', background:'#09091E', borderTop:'1px solid rgba(212,175,55,.07)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div style={{ fontSize:'.68rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#D4AF37', marginBottom:'.7rem' }}>The Healers</div>
            <h2 className="cel" style={{ fontSize:'clamp(2rem,4vw,3rem)', color:'#EDE8DC', fontWeight:300, fontStyle:'italic' }}>Masters of the Sacred Arts</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1.2rem' }}>
            {[
              { name:'Hemavathi', init:'H', col:'#C4900A', role:'Certified Theta Healing Practitioner · Master Level · Manifestation Coach', stats:'1,400+ sessions · 7 years', spec:['Theta Healing','Manifestation','Spiritual Training'] },
              { name:'Shruthi', init:'S', col:'#9060B8', role:'Tarot Reader · Akashic Records Practitioner · Numerologist · Intuitive Channel', stats:'900+ readings · 5 years', spec:['Tarot','Akashic Records','Numerology'] },
            ].map(p => (
              <div key={p.name} className="card-cel" style={{ background:'rgba(255,255,255,.022)', border:'1px solid rgba(212,175,55,.13)', borderRadius:'18px', padding:'2rem', backdropFilter:'blur(10px)', display:'flex', gap:'1.2rem' }}>
                <div style={{ width:'54px', height:'54px', borderRadius:'50%', background:`${p.col}18`, border:`1.5px solid ${p.col}50`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span className="cel" style={{ fontSize:'1.5rem', color:p.col, fontStyle:'italic' }}>{p.init}</span>
                </div>
                <div>
                  <h3 className="cel" style={{ fontSize:'1.45rem', color:'#EDE8DC', fontWeight:400, marginBottom:'.25rem' }}>{p.name}</h3>
                  <p style={{ fontSize:'.76rem', color:'#7A90B0', lineHeight:1.65, marginBottom:'.5rem' }}>{p.role}</p>
                  <p style={{ fontSize:'.7rem', color:'#D4AF37', marginBottom:'.8rem' }}>✦ {p.stats}</p>
                  <div style={{ display:'flex', gap:'.45rem', flexWrap:'wrap' }}>
                    {p.spec.map(s => <span key={s} style={{ fontSize:'.66rem', letterSpacing:'.08em', textTransform:'uppercase', padding:'.18rem .65rem', borderRadius:'100px', border:'1px solid rgba(212,175,55,.22)', color:'#7A90B0' }}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding:'5.5rem 2.5rem', background:'#07071A' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div style={{ fontSize:'.68rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#D4AF37', marginBottom:'.7rem' }}>Sacred Sessions</div>
            <h2 className="cel" style={{ fontSize:'clamp(2rem,4vw,3rem)', color:'#EDE8DC', fontWeight:300, fontStyle:'italic' }}>Choose Your Path</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:'1.1rem', marginBottom:'2.2rem' }}>
            {services.map(s => (
              <div key={s.name} className="card-cel" style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(212,175,55,.1)', borderRadius:'18px', padding:'2rem', backdropFilter:'blur(8px)', cursor:'pointer' }}>
                <div className="cel" style={{ fontSize:'2.2rem', color:'#D4AF37', marginBottom:'1rem' }}>{s.symbol}</div>
                <div style={{ fontSize:'.66rem', letterSpacing:'.15em', textTransform:'uppercase', color:'#6A7A90', marginBottom:'.55rem' }}>{s.practitioner}</div>
                <h3 className="cel" style={{ fontSize:'1.3rem', color:'#EDE8DC', fontWeight:400, marginBottom:'.75rem', lineHeight:1.3 }}>{s.name}</h3>
                <p style={{ fontSize:'.82rem', color:'#5A6A80', lineHeight:1.75, marginBottom:'1.4rem' }}>{s.desc}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(212,175,55,.08)', paddingTop:'1rem' }}>
                  <span className="cel" style={{ fontSize:'1.4rem', color:'#D4AF37', fontWeight:400 }}>{s.price}</span>
                  <a href={`/book?service=${s.slug}`} style={{ fontSize:'.76rem', color:'#7A90B0', textDecoration:'none', letterSpacing:'.06em', transition:'color .2s' }}>Book Session →</a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <a href="/services" className="btn-ghost">View All 6 Sessions</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:'5.5rem 2.5rem', background:'#09091E', borderTop:'1px solid rgba(212,175,55,.07)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div style={{ fontSize:'.68rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#D4AF37', marginBottom:'.7rem' }}>Healing Stories</div>
            <h2 className="cel" style={{ fontSize:'clamp(2rem,4vw,3rem)', color:'#EDE8DC', fontWeight:300, fontStyle:'italic' }}>Real Transformations</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))', gap:'2rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ paddingLeft:'1.5rem', borderLeft:'1px solid rgba(212,175,55,.18)' }}>
                <span className="quote-mark">&ldquo;</span>
                <p className="quote-text">{t.quote}</p>
                <div style={{ marginTop:'1.2rem', fontSize:'.72rem', color:'#D4AF37', letterSpacing:'.1em', textTransform:'uppercase' }}>{t.name}</div>
                <div style={{ fontSize:'.68rem', color:'#4A5A70' }}>{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI RECOMMENDER */}
      <section style={{ padding:'3.5rem 2.5rem', background:'rgba(212,175,55,.04)', borderTop:'1px solid rgba(212,175,55,.08)', borderBottom:'1px solid rgba(212,175,55,.08)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.5rem', flexWrap:'wrap' }}>
          <div>
            <div style={{ fontSize:'.68rem', letterSpacing:'.25em', textTransform:'uppercase', color:'#D4AF37', marginBottom:'.5rem' }}>AI Guidance</div>
            <h3 className="cel" style={{ fontSize:'1.5rem', color:'#EDE8DC', fontWeight:400, fontStyle:'italic', marginBottom:'.4rem' }}>Not sure where to begin your healing journey?</h3>
            <p style={{ fontSize:'.85rem', color:'#6A7A90', lineHeight:1.7 }}>Answer 5 gentle questions — our AI guides you to the perfect session and practitioner for where your soul is right now.</p>
          </div>
          <a href="/recommend" className="btn-gold" style={{ whiteSpace:'nowrap' }}>Find My Healing Path →</a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'6rem 2.5rem', background:'linear-gradient(135deg,#07071A 0%,#13104A 50%,#07071A 100%)', borderTop:'1px solid rgba(212,175,55,.12)', textAlign:'center' }}>
        <div style={{ maxWidth:'580px', margin:'0 auto' }}>
          <div style={{ fontSize:'.68rem', letterSpacing:'.35em', textTransform:'uppercase', color:'#D4AF37', marginBottom:'1.5rem' }}>✦ Begin Today ✦</div>
          <h2 className="cel" style={{ fontSize:'clamp(2.5rem,5vw,4rem)', color:'#EDE8DC', fontWeight:300, fontStyle:'italic', marginBottom:'1.2rem', lineHeight:1.08 }}>
            Your Transformation<br />Begins With One Step
          </h2>
          <p style={{ color:'#5A6A80', lineHeight:1.85, marginBottom:'2.5rem', fontSize:'1rem' }}>
            Book your first session today. No prior experience required — only an open heart.
          </p>
          <a href="/services" className="btn-gold">Book a Session</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#03030D', padding:'3rem 2.5rem', borderTop:'1px solid rgba(212,175,55,.07)', textAlign:'center' }}>
        <div className="cel" style={{ fontSize:'1.2rem', color:'#D4AF37', letterSpacing:'.06em', marginBottom:'.4rem' }}>PranaTatva</div>
        <p style={{ fontSize:'.72rem', color:'#2E3E54', letterSpacing:'.05em' }}>Inner Healing · India · EN | हि | తె</p>
        <p style={{ fontSize:'.65rem', color:'#1E2E3E', marginTop:'1.5rem' }}>© 2026 PranaTatva. Sessions are complementary wellness services and not a substitute for medical advice.</p>
        <div style={{ marginTop:'1.2rem' }}>
          <Link href="/designs" style={{ fontSize:'.7rem', color:'#3A5070', textDecoration:'none', borderBottom:'1px solid #1E3050', paddingBottom:'1px' }}>← Back to Design Options</Link>
        </div>
      </footer>
    </div>
  )
}
