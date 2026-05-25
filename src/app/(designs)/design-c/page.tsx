import Link from 'next/link'

const services = [
  { tag: 'Healing', name: 'Theta Healing Deep Dive', desc: 'A deeply immersive session that dissolves limiting beliefs held in the subconscious — permanent, gentle, profound.', price: '₹2,500', slug: 'theta-healing-deep-dive', who: 'Hemavathi' },
  { tag: 'Tarot', name: 'Tarot Card Reading', desc: 'Intuitive readings for clarity on love, career, relationships, and the soul\'s next chapter. Every card tells a story.', price: '₹1,800', slug: 'tarot-card-reading', who: 'Shruthi' },
  { tag: 'Akashic', name: 'Akashic Records Soul Reading', desc: 'Journey into the eternal records of your soul — patterns, past lives, and the gifts you carry into this lifetime.', price: '₹2,200', slug: 'akashic-records-soul-reading', who: 'Shruthi' },
]

const testimonials = [
  { name: 'Priya M.', city: 'Bengaluru', text: 'Hemavathi shifted something I had carried for 12 years in a single session. I left feeling lighter than I have felt in my entire adult life.' },
  { name: 'Rahul S.', city: 'Hyderabad', text: 'After one session I finally understood why I kept self-sabotaging. Within 10 days I received two new client referrals and a promotion offer.' },
  { name: 'Deepa K.', city: 'Chennai', text: "Shruthi's Tarot reading gave me clarity I had been seeking for months. The accuracy was uncanny and her guidance was grounded and compassionate." },
]

function LotusSVG() {
  return (
    <svg viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      {/* Outer decorative ring */}
      <circle cx="220" cy="220" r="205" stroke="#4A6B3E" strokeWidth=".6" strokeDasharray="2 10" opacity=".35" />
      <circle cx="220" cy="220" r="185" stroke="#4A6B3E" strokeWidth=".4" opacity=".2" />

      {/* 8 large petals */}
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <path key={i}
          d={`M220,220 C208,182 196,140 220,92 C244,140 232,182 220,220`}
          stroke="#4A6B3E" strokeWidth="1" fill="none" opacity={i%2===0?".7":".5"}
          transform={`rotate(${a} 220 220)`}
        />
      ))}

      {/* 8 secondary petals */}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((a,i) => (
        <path key={i}
          d={`M220,220 C213,193 206,160 220,128 C234,160 227,193 220,220`}
          stroke="#B36040" strokeWidth=".8" fill="none" opacity=".45"
          transform={`rotate(${a} 220 220)`}
        />
      ))}

      {/* Inner geometry */}
      <circle cx="220" cy="220" r="62" stroke="#4A6B3E" strokeWidth=".8" opacity=".5" />
      <circle cx="220" cy="220" r="38" stroke="#4A6B3E" strokeWidth=".6" opacity=".4" />
      <circle cx="220" cy="220" r="18" stroke="#4A6B3E" strokeWidth=".8" opacity=".6" />
      <circle cx="220" cy="220" r="6" fill="#4A6B3E" opacity=".5" />

      {/* 4 corner leaf sprigs */}
      {[0,90,180,270].map((a,i) => (
        <g key={i} transform={`rotate(${a} 220 220)`}>
          <path d="M220,24 C210,35 200,50 210,60 C215,50 218,38 220,24Z" fill="#4A6B3E" opacity=".3" />
          <path d="M220,24 C230,35 240,50 230,60 C225,50 222,38 220,24Z" fill="#4A6B3E" opacity=".2" />
          <line x1="220" y1="24" x2="220" y2="55" stroke="#4A6B3E" strokeWidth=".8" opacity=".4" />
        </g>
      ))}
    </svg>
  )
}

export default function DesignCPage() {
  return (
    <div style={{ fontFamily:"'Outfit', system-ui, sans-serif", background:'#FAFAF8', color:'#2A3828', minHeight:'100vh' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawLine { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
        .bask { font-family:'Libre Baskerville',Georgia,serif; }
        .fade0 { animation:fadeIn 1s cubic-bezier(.16,1,.3,1) both; }
        .fade1 { animation:fadeIn 1s .2s cubic-bezier(.16,1,.3,1) both; }
        .fade2 { animation:fadeIn 1s .4s cubic-bezier(.16,1,.3,1) both; }
        .nav-spa { font-size:.8rem; color:#4A6B3E; letter-spacing:.06em; text-decoration:none; transition:color .2s; }
        .nav-spa:hover { color:#2A4A28; }
        .card-spa { background:white; border:1px solid #E0D8CE; border-radius:12px; padding:2rem; transition:all .3s; }
        .card-spa:hover { border-color:#4A6B3E; transform:translateY(-3px); box-shadow:0 12px 32px rgba(74,107,62,.08); }
        .btn-terra { display:inline-block; padding:.8rem 2rem; border-radius:8px; background:#B36040; color:white; font-size:.86rem; font-weight:500; letter-spacing:.04em; text-decoration:none; transition:all .2s; }
        .btn-terra:hover { background:#954E30; }
        .btn-sage { display:inline-block; padding:.8rem 2rem; border-radius:8px; border:1.5px solid #4A6B3E; color:#4A6B3E; font-size:.86rem; font-weight:500; letter-spacing:.04em; text-decoration:none; transition:all .2s; }
        .btn-sage:hover { background:#4A6B3E; color:white; }
        .rule { width:40px; height:1.5px; background:#4A6B3E; margin:.8rem 0; }
        .tag-chip { display:inline-block; font-size:.66rem; letter-spacing:.12em; text-transform:uppercase; padding:.2rem .8rem; border-radius:4px; background:#EEF4EC; color:#4A6B3E; }
      ` }} />

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:999, height:'66px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 3rem', background:'rgba(250,250,248,.94)', backdropFilter:'blur(12px)', borderBottom:'1px solid #E8E0D4' }}>
        <Link href="/designs" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          {/* Botanical leaf mark */}
          <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
            <path d="M11,26 C6,20 2,12 4,6 C7,0 11,2 11,2 C11,2 15,0 18,6 C20,12 16,20 11,26Z" stroke="#4A6B3E" strokeWidth="1.2" fill="none" />
            <line x1="11" y1="26" x2="11" y2="4" stroke="#4A6B3E" strokeWidth=".8" />
            <path d="M11,16 C8,14 5,13 5,11" stroke="#4A6B3E" strokeWidth=".7" fill="none" />
            <path d="M11,12 C14,10 17,9 17,7" stroke="#4A6B3E" strokeWidth=".7" fill="none" />
          </svg>
          <div>
            <span className="bask" style={{ fontSize:'1.1rem', color:'#2A3828', fontWeight:400 }}>Prana</span>
            <span className="bask" style={{ fontSize:'1.1rem', color:'#4A6B3E', fontWeight:700 }}>Tatva</span>
          </div>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:'2.2rem' }}>
          {['Services','About Us','Events','Blog'].map(l => <a key={l} href="#" className="nav-spa">{l}</a>)}
          <span style={{ width:'1px', height:'18px', background:'#E0D8CE', display:'inline-block' }} />
          <a href="#" className="nav-spa" style={{ color:'#6A8060' }}>Sign In</a>
          <a href="/book" className="btn-terra" style={{ padding:'.45rem 1.2rem', fontSize:'.8rem', borderRadius:'6px' }}>Book a Session</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'55fr 45fr', alignItems:'center', paddingTop:'66px', background:'#FAFAF8', overflow:'hidden' }}>
        {/* Left */}
        <div className="fade0" style={{ padding:'5rem 3rem 5rem 4rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.7rem', marginBottom:'1.8rem' }}>
            <div style={{ width:'28px', height:'1px', background:'#B36040' }} />
            <span style={{ fontSize:'.68rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#B36040' }}>Healing · Transformation · Clarity</span>
          </div>
          <h1 className="bask fade1" style={{ fontSize:'clamp(2.8rem,5vw,4.5rem)', lineHeight:1.15, color:'#1A2418', marginBottom:'1.6rem', maxWidth:'480px' }}>
            Sacred Healing<br />
            for the <em style={{ color:'#4A6B3E' }}>Modern Soul</em>
          </h1>
          <p className="fade2" style={{ fontSize:'1rem', color:'#5A7055', lineHeight:1.9, marginBottom:'2.2rem', maxWidth:'400px', fontWeight:300 }}>
            Discover 1:1 healing sessions crafted by master practitioners Hemavathi and Shruthi — where ancient wisdom meets your present moment.
          </p>
          <div className="fade2" style={{ display:'flex', gap:'.85rem', flexWrap:'wrap', marginBottom:'3rem' }}>
            <a href="/services" className="btn-terra">Explore Sessions</a>
            <a href="/about" className="btn-sage">Meet Our Healers</a>
          </div>
          {/* Trust row */}
          <div className="fade2" style={{ display:'flex', gap:'2.5rem', paddingTop:'2rem', borderTop:'1px solid #E8E0D4', flexWrap:'wrap' }}>
            {[['2,300+','Sessions Completed'],['4.9 ★','Average Rating'],['₹1,800','Starting From']].map(([v,l]) => (
              <div key={l}>
                <div className="bask" style={{ fontSize:'1.4rem', color:'#4A6B3E', fontWeight:400 }}>{v}</div>
                <div style={{ fontSize:'.7rem', color:'#8A9E85', letterSpacing:'.08em', textTransform:'uppercase', marginTop:'.15rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: botanical illustration */}
        <div className="fade1" style={{ position:'relative', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F0EAE0', padding:'3rem' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 50% 50%, #E8E0D040 0%, transparent 70%)' }} />
          <div style={{ width:'min(380px,90%)', height:'min(380px,90%)', position:'relative', zIndex:1 }}>
            <LotusSVG />
          </div>
          <div style={{ position:'absolute', bottom:'3rem', left:'50%', transform:'translateX(-50%)', textAlign:'center' }}>
            <div className="bask" style={{ fontSize:'.8rem', color:'#8A9E85', fontStyle:'italic', letterSpacing:'.06em' }}>Inner healing · Sacred space</div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'0 4rem', overflow:'hidden' }}>
        <div style={{ flex:1, height:'1px', background:'#E8E0D4' }} />
        <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" fill="#4A6B3E" opacity=".4" /><circle cx="10" cy="10" r="7" stroke="#4A6B3E" strokeWidth=".6" fill="none" opacity=".25" /></svg>
        <div style={{ flex:1, height:'1px', background:'#E8E0D4' }} />
      </div>

      {/* PRACTITIONERS */}
      <section style={{ padding:'5rem 4rem', background:'#FAFAF8' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <div style={{ marginBottom:'2.5rem' }}>
            <span style={{ fontSize:'.66rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#B36040' }}>Our Practitioners</span>
            <div className="rule" />
            <h2 className="bask" style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', color:'#1A2418', fontWeight:400 }}>Gifted Healers, Sacred Space</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
            {[
              { name:'Hemavathi', init:'H', color:'#C4900A', role:'Certified Theta Healing Practitioner · Master Level', bio:'Seven years of dedicated practice, 1,400+ sessions, and a rare gift for reaching the root of what holds you back.', spec:['Theta Healing','Manifestation','Spiritual Training'], stats:'1,400+ sessions · 7 years' },
              { name:'Shruthi', init:'S', color:'#6A3D8A', role:'Tarot Reader · Akashic Records Practitioner · Numerologist', bio:'A natural intuitive with 900+ readings across India, Shruthi offers clarity with compassion and extraordinary precision.', spec:['Tarot','Akashic Records','Numerology'], stats:'900+ readings · 5 years' },
            ].map((p, i) => (
              <div key={p.name} style={{ display:'grid', gridTemplateColumns:'80px 1fr auto', gap:'1.5rem', alignItems:'center', padding:'2.2rem 0', borderTop: i===0 ? '1px solid #E8E0D4' : undefined, borderBottom:'1px solid #E8E0D4' }}>
                <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:`${p.color}12`, border:`1.5px solid ${p.color}30`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span className="bask" style={{ fontSize:'1.6rem', color:p.color, fontStyle:'italic' }}>{p.init}</span>
                </div>
                <div>
                  <h3 className="bask" style={{ fontSize:'1.25rem', color:'#1A2418', fontWeight:400, marginBottom:'.2rem' }}>{p.name}</h3>
                  <p style={{ fontSize:'.76rem', color:'#8A9E85', marginBottom:'.5rem', letterSpacing:'.02em' }}>{p.role}</p>
                  <p style={{ fontSize:'.84rem', color:'#5A7055', lineHeight:1.7, maxWidth:'520px' }}>{p.bio}</p>
                  <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap', marginTop:'.7rem' }}>
                    {p.spec.map(s => <span key={s} className="tag-chip">{s}</span>)}
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div className="bask" style={{ fontSize:'.78rem', color:'#4A6B3E', fontStyle:'italic' }}>{p.stats}</div>
                  <a href="/book" className="btn-sage" style={{ marginTop:'.8rem', fontSize:'.76rem', padding:'.45rem 1.1rem', display:'inline-block' }}>Book with {p.name.split(' ')[0]}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding:'5rem 4rem', background:'#F0EAE0' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <div style={{ marginBottom:'2.5rem' }}>
            <span style={{ fontSize:'.66rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#B36040' }}>Healing Sessions</span>
            <div className="rule" />
            <h2 className="bask" style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', color:'#1A2418', fontWeight:400 }}>How Can We Help You?</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
            {services.map(s => (
              <div key={s.name} className="card-spa">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                  <span className="tag-chip">{s.tag}</span>
                  <span style={{ fontSize:'.72rem', color:'#8A9E85' }}>{s.who}</span>
                </div>
                <h3 className="bask" style={{ fontSize:'1.18rem', color:'#1A2418', fontWeight:400, marginBottom:'.65rem', lineHeight:1.35 }}>{s.name}</h3>
                <p style={{ fontSize:'.84rem', color:'#5A7055', lineHeight:1.8, marginBottom:'1.5rem' }}>{s.desc}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'.9rem', borderTop:'1px solid #F0EAE0' }}>
                  <span className="bask" style={{ fontSize:'1.2rem', color:'#B36040', fontWeight:400 }}>{s.price}</span>
                  <a href={`/book?service=${s.slug}`} style={{ fontSize:'.76rem', color:'#4A6B3E', textDecoration:'none', fontWeight:500, letterSpacing:'.04em' }}>Book Session →</a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <a href="/services" className="btn-sage">View All 6 Services</a>
          </div>
        </div>
      </section>

      {/* RECOMMENDER BANNER */}
      <section style={{ padding:'3rem 4rem', background:'#4A6B3E' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' }}>
          <div>
            <h3 className="bask" style={{ fontSize:'1.3rem', color:'white', fontWeight:400, fontStyle:'italic', marginBottom:'.4rem' }}>Not sure where to start your healing journey?</h3>
            <p style={{ fontSize:'.85rem', color:'rgba(255,255,255,.7)', lineHeight:1.7 }}>Answer 5 gentle questions — our AI guides you to the perfect session for where you are right now.</p>
          </div>
          <a href="/recommend" style={{ display:'inline-block', padding:'.75rem 1.8rem', border:'1.5px solid rgba(255,255,255,.5)', borderRadius:'6px', color:'white', fontSize:'.84rem', textDecoration:'none', whiteSpace:'nowrap', letterSpacing:'.04em', transition:'all .2s', background:'rgba(255,255,255,.08)' }}>Find My Healing Path →</a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:'5rem 4rem', background:'#FAFAF8' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <div style={{ marginBottom:'2.5rem' }}>
            <span style={{ fontSize:'.66rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#B36040' }}>Healing Stories</span>
            <div className="rule" />
            <h2 className="bask" style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', color:'#1A2418', fontWeight:400 }}>Real Transformations</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'2.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name}>
                <div className="bask" style={{ fontSize:'3.5rem', color:'#B36040', opacity:.25, lineHeight:.9, marginBottom:'.3rem' }}>&ldquo;</div>
                <p className="bask" style={{ fontSize:'.98rem', color:'#3A4A38', lineHeight:1.9, fontStyle:'italic', marginBottom:'1.2rem' }}>{t.text}</p>
                <div style={{ width:'28px', height:'1px', background:'#B36040', marginBottom:'.6rem' }} />
                <div style={{ fontSize:'.76rem', color:'#2A3828', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase' }}>{t.name}</div>
                <div style={{ fontSize:'.7rem', color:'#8A9E85' }}>{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'5rem 4rem', background:'#1A2418', textAlign:'center' }}>
        <div style={{ maxWidth:'520px', margin:'0 auto' }}>
          <div style={{ width:'1px', height:'48px', background:'#4A6B3E', margin:'0 auto 2rem' }} />
          <h2 className="bask" style={{ fontSize:'clamp(2rem,4vw,3rem)', color:'#F0EAE0', fontWeight:400, fontStyle:'italic', marginBottom:'1rem', lineHeight:1.2 }}>
            Your Transformation<br />Begins With One Step
          </h2>
          <p style={{ color:'#5A7055', lineHeight:1.9, marginBottom:'2.2rem', fontSize:'.95rem' }}>
            Book your first session today. No prior experience needed — only an open heart.
          </p>
          <a href="/services" className="btn-terra">Book a Session</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#FAFAF8', padding:'2.5rem 4rem', borderTop:'1px solid #E8E0D4', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <div className="bask" style={{ fontSize:'1rem', color:'#2A3828', fontWeight:400 }}>PranaTatva</div>
          <div style={{ fontSize:'.7rem', color:'#8A9E85', marginTop:'.2rem' }}>Inner Healing · India · EN | हि | తె</div>
        </div>
        <div style={{ fontSize:'.7rem', color:'#B0A898', textAlign:'center' }}>Sessions are complementary wellness services, not a substitute for medical advice.</div>
        <Link href="/designs" style={{ fontSize:'.7rem', color:'#8A9E85', textDecoration:'none', borderBottom:'1px solid #C8C0B8' }}>← Design Options</Link>
      </footer>
    </div>
  )
}
