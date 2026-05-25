import Link from 'next/link'

const services = [
  { accent: '#D4500A', category: 'Theta Healing', name: 'Theta Healing Deep Dive', desc: 'Permanently dissolve limiting beliefs held deep in the subconscious mind through the powerful theta brainwave state.', price: '₹2,500', slug: 'theta-healing-deep-dive', who: 'Hemavathi' },
  { accent: '#B81818', category: 'Tarot & Guidance', name: 'Tarot Card Reading', desc: "Shruthi's sharp intuitive readings illuminate your path in love, career, and spiritual purpose with stunning clarity.", price: '₹1,800', slug: 'tarot-card-reading', who: 'Shruthi' },
  { accent: '#E8A818', category: 'Akashic Records', name: 'Akashic Records Soul Reading', desc: 'Unlock the eternal archive of your soul — discover karmic patterns, gifts, and the blueprint of your highest life.', price: '₹2,200', slug: 'akashic-records-soul-reading', who: 'Shruthi' },
]

const testimonials = [
  { name: 'Priya M.', city: 'Bengaluru', text: 'Hemavathi shifted something I had carried for 12 years in a single session. I left feeling completely free — lighter than I have felt in my entire adult life.' },
  { name: 'Rahul S.', city: 'Hyderabad', text: 'After one session I finally understood why I kept self-sabotaging. Within 10 days I received two new client referrals and a promotion offer. Life-changing.' },
  { name: 'Deepa K.', city: 'Chennai', text: "Shruthi's Tarot reading gave me the clarity I had been seeking for months. The accuracy was uncanny and her guidance was both grounded and compassionate." },
]

function MandalaSVG() {
  const petals8 = Array.from({ length: 8 }, (_, i) => i * 45)
  const petals16 = Array.from({ length: 16 }, (_, i) => i * 22.5)
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Outermost ring */}
      <circle cx="240" cy="240" r="230" stroke="#D4500A" strokeWidth=".6" opacity=".2" />
      <circle cx="240" cy="240" r="215" stroke="#E8A818" strokeWidth=".5" strokeDasharray="1 6" opacity=".3" />

      {/* Outer petal ring (16 petals) */}
      {petals16.map((a, i) => (
        <path key={`op${i}`}
          d="M240,240 C234,204 226,162 240,112 C254,162 246,204 240,240"
          stroke={i % 2 === 0 ? '#D4500A' : '#E8A818'} strokeWidth={i % 2 === 0 ? '1.2' : '.8'}
          fill="none" opacity={i % 2 === 0 ? '.55' : '.35'}
          transform={`rotate(${a} 240 240)`}
        />
      ))}

      {/* Middle geometric ring */}
      <circle cx="240" cy="240" r="110" stroke="#D4500A" strokeWidth=".8" opacity=".35" />
      {petals8.map((a, i) => (
        <path key={`mp${i}`}
          d={`M240,240 C234,216 228,188 240,158 C252,188 246,216 240,240`}
          stroke="#B81818" strokeWidth="1" fill="none" opacity=".5"
          transform={`rotate(${a} 240 240)`}
        />
      ))}

      {/* Diamond points at 8 directions on r=110 */}
      {petals8.map((a, i) => {
        const rad = a * Math.PI / 180
        const x = 240 + 110 * Math.sin(rad)
        const y = 240 - 110 * Math.cos(rad)
        return (
          <g key={`dp${i}`} transform={`translate(${x},${y}) rotate(${a})`}>
            <path d="M0,-8 L5,0 L0,8 L-5,0Z" fill="#E8A818" opacity=".6" />
          </g>
        )
      })}

      {/* Inner petal ring */}
      <circle cx="240" cy="240" r="70" stroke="#E8A818" strokeWidth=".8" opacity=".4" />
      {petals16.map((a, i) => (
        <path key={`ip${i}`}
          d="M240,240 C237,226 232,208 240,188 C248,208 243,226 240,240"
          stroke="#D4500A" strokeWidth=".8" fill={i % 4 === 0 ? '#D4500A' : 'none'}
          fillOpacity=".1" opacity=".55"
          transform={`rotate(${a} 240 240)`}
        />
      ))}

      {/* Inner circles */}
      <circle cx="240" cy="240" r="42" stroke="#B81818" strokeWidth=".8" opacity=".5" />
      <circle cx="240" cy="240" r="26" stroke="#E8A818" strokeWidth="1" opacity=".6" />
      <circle cx="240" cy="240" r="14" stroke="#D4500A" strokeWidth="1" opacity=".7" />
      <circle cx="240" cy="240" r="6" fill="#E8A818" opacity=".8" />
      <circle cx="240" cy="240" r="2.5" fill="#D4500A" />

      {/* Corner triangles */}
      {petals8.map((a, i) => {
        const rad = a * Math.PI / 180
        const x = 240 + 178 * Math.sin(rad)
        const y = 240 - 178 * Math.cos(rad)
        return (
          <g key={`ct${i}`} transform={`translate(${x},${y}) rotate(${a})`}>
            <path d={`M0,-10 L8,8 L-8,8Z`} stroke="#E8A818" strokeWidth=".8" fill="none" opacity=".4" />
          </g>
        )
      })}
    </svg>
  )
}

function PatternBorder({ color1 = '#D4500A', color2 = '#E8A818', height = 5 }: { color1?: string, color2?: string, height?: number }) {
  return (
    <div style={{
      height: `${height}px`,
      backgroundImage: `repeating-linear-gradient(90deg, ${color1} 0px, ${color1} 6px, ${color2} 6px, ${color2} 12px, transparent 12px, transparent 14px, ${color1} 14px, ${color1} 16px, transparent 16px, transparent 18px)`,
      opacity: .7,
    }} />
  )
}

export default function DesignDPage() {
  return (
    <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", background: '#FAF4E0', color: '#2A1008', minHeight: '100vh' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mandalaRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }
        .cinzel { font-family:'Cinzel',serif; }
        .a0 { animation:fadeIn 1s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation:fadeIn 1s .2s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation:fadeIn 1s .4s cubic-bezier(.16,1,.3,1) both; }
        .mandala-spin { animation:mandalaRotate 60s linear infinite; transform-origin:center; }
        .nav-d { font-size:.78rem; color:#5A2808; letter-spacing:.08em; text-decoration:none; transition:color .2s; font-family:'Cinzel',serif; }
        .nav-d:hover { color:#D4500A; }
        .btn-saffron { display:inline-block; padding:.8rem 2rem; background:#D4500A; color:white; font-size:.84rem; font-weight:600; letter-spacing:.06em; text-decoration:none; font-family:'Cinzel',serif; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:all .2s; }
        .btn-saffron:hover { background:#B84008; }
        .btn-ivory { display:inline-block; padding:.8rem 2rem; background:transparent; border:2px solid #D4500A; color:#D4500A; font-size:.84rem; font-weight:600; letter-spacing:.06em; text-decoration:none; font-family:'Cinzel',serif; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); transition:all .2s; }
        .btn-ivory:hover { background:#D4500A; color:white; }
        .btn-crimson { display:inline-block; padding:.75rem 2rem; background:#B81818; color:white; font-size:.82rem; font-weight:600; letter-spacing:.06em; text-decoration:none; font-family:'Cinzel',serif; transition:all .2s; }
        .btn-crimson:hover { background:#8A1010; }
        .card-d { background:white; border:1px solid #E8D8C0; border-radius:4px; padding:1.8rem; transition:all .3s; position:relative; overflow:hidden; }
        .card-d:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(212,80,10,.1); }
        .card-d::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; }
        .service-icon { width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; font-family:'Cinzel',serif; font-size:1.1rem; font-weight:600; }
        .stat-box { text-align:center; padding:1.5rem; border:1px solid rgba(255,255,255,.2); }
        .section-eyebrow { font-size:.65rem; letter-spacing:.35em; text-transform:uppercase; color:#D4500A; margin-bottom:.6rem; font-family:'Cinzel',serif; }
        .diamond-divider { width:12px; height:12px; background:#D4500A; transform:rotate(45deg); opacity:.6; }
      ` }} />

      {/* PATTERN TOP STRIPE */}
      <PatternBorder />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: '5px', left: 0, right: 0, zIndex: 999, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2.5rem', background: '#FAF4E0', borderBottom: '1px solid #E8D8C0' }}>
        <Link href="/designs" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <polygon points="15,2 17,12 27,12 19,18 22,28 15,22 8,28 11,18 3,12 13,12" stroke="#D4500A" strokeWidth="1.2" fill="none" opacity=".7" />
            <circle cx="15" cy="15" r="4" fill="#E8A818" />
          </svg>
          <div>
            <span className="cinzel" style={{ fontSize: '1.15rem', color: '#2A1008', fontWeight: 600, letterSpacing: '.08em' }}>Prana</span>
            <span className="cinzel" style={{ fontSize: '1.15rem', color: '#D4500A', fontWeight: 600, letterSpacing: '.08em' }}>Tatva</span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Services', 'About', 'Events', 'Blog', 'Corporate'].map(l => (
            <a key={l} href="#" className="nav-d">{l}</a>
          ))}
          <span style={{ width: '1px', height: '20px', background: '#E8D8C0' }} />
          <a href="#" className="nav-d" style={{ color: '#7A4020' }}>Sign In</a>
          <a href="/book" className="btn-saffron" style={{ padding: '.42rem 1.2rem', fontSize: '.78rem', clipPath: 'none', borderRadius: '2px' }}>Book a Session</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'grid', gridTemplateColumns: '55fr 45fr', overflow: 'hidden', paddingTop: '65px' }}>
        {/* Left: saffron */}
        <div style={{ background: '#D4500A', position: 'relative', display: 'flex', alignItems: 'center', padding: '5rem 3rem 5rem 4rem', overflow: 'hidden' }}>
          {/* Background texture */}
          <div style={{ position: 'absolute', inset: 0, opacity: .08, backgroundImage: 'repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 24px)' }} />
          {/* Corner ornament */}
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', opacity: .15 }}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <polygon points="40,4 46,30 72,30 52,46 60,72 40,56 20,72 28,46 8,30 34,30" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="a0 section-eyebrow" style={{ color: 'rgba(255,255,255,.75)', marginBottom: '1.4rem' }}>✦ &nbsp; Sacred Healing · Ancient Wisdom &nbsp; ✦</div>
            <h1 className="cinzel a1" style={{ fontSize: 'clamp(2.5rem,5.5vw,4.5rem)', lineHeight: 1.12, color: 'white', marginBottom: '1.5rem', maxWidth: '440px', fontWeight: 600 }}>
              Begin Your<br />
              <span style={{ color: '#FAE090' }}>Sacred</span><br />
              Healing Journey
            </h1>
            <p className="a2" style={{ fontSize: '.96rem', color: 'rgba(255,255,255,.78)', lineHeight: 1.85, marginBottom: '2.2rem', maxWidth: '380px', fontWeight: 300 }}>
              Master practitioners Hemavathi and Shruthi offer 1:1 healing sessions grounded in ancient Indian wisdom and modern spiritual science.
            </p>
            <div className="a2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/services" style={{ display: 'inline-block', padding: '.85rem 2rem', background: '#FAF4E0', color: '#D4500A', fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: '.82rem', letterSpacing: '.07em', textDecoration: 'none', borderRadius: '2px', transition: 'all .2s' }}>Explore Sessions</a>
              <a href="/services" style={{ display: 'inline-block', padding: '.85rem 2rem', background: 'transparent', border: '2px solid rgba(255,255,255,.6)', color: 'white', fontFamily: "'Cinzel',serif", fontSize: '.82rem', letterSpacing: '.07em', textDecoration: 'none', borderRadius: '2px' }}>Free Discovery Call</a>
            </div>
            {/* Stats */}
            <div className="a2" style={{ display: 'flex', gap: '0', marginTop: '3.5rem', borderTop: '1px solid rgba(255,255,255,.2)', paddingTop: '2rem' }}>
              {[['2,300+', 'Sessions'], ['7 yrs', 'Practice'], ['4.9★', 'Rating']].map(([v, l], i) => (
                <div key={l} style={{ flex: 1, paddingRight: '1.5rem', borderRight: i < 2 ? '1px solid rgba(255,255,255,.15)' : 'none', paddingLeft: i > 0 ? '1.5rem' : 0 }}>
                  <div className="cinzel" style={{ fontSize: '1.6rem', color: '#FAE090', fontWeight: 600 }}>{v}</div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.55)', letterSpacing: '.15em', textTransform: 'uppercase', marginTop: '.2rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: ivory with mandala */}
        <div style={{ background: '#FAF4E0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
          {/* Pattern background */}
          <div style={{ position: 'absolute', inset: 0, opacity: .04, backgroundImage: 'repeating-linear-gradient(45deg, #D4500A 0px, #D4500A 1px, transparent 1px, transparent 12px)' }} />
          <div style={{ width: 'min(380px,90%)', height: 'min(380px,90%)', position: 'relative', zIndex: 1 }}>
            <div className="mandala-spin">
              <MandalaSVG />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '3rem', right: '3rem' }}>
            <div className="cinzel" style={{ fontSize: '.7rem', color: '#C0A080', letterSpacing: '.15em', textTransform: 'uppercase' }}>Inner Healing</div>
          </div>
        </div>
      </section>

      {/* PATTERN DIVIDER */}
      <PatternBorder color1="#B81818" color2="#E8A818" />

      {/* PRACTITIONERS */}
      <section style={{ padding: '5rem 3.5rem', background: '#FAF4E0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-eyebrow">Our Practitioners</div>
              <h2 className="cinzel" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#2A1008', fontWeight: 600 }}>Masters of Sacred Arts</h2>
            </div>
            <a href="/about" style={{ fontSize: '.76rem', color: '#D4500A', textDecoration: 'none', fontFamily: "'Cinzel',serif", letterSpacing: '.08em', borderBottom: '1px solid #D4500A', paddingBottom: '1px' }}>Meet Both Healers →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Hemavathi', init: 'H', ring: '#D4500A', bg: '#FFF0E8', role: 'Theta Healing Practitioner · Master Level · Manifestation Coach', bio: 'Seven years, 1,400+ sessions. Hemavathi works at the deepest level of the mind — reaching blocks that talk therapy cannot touch.', spec: ['Theta Healing', 'Manifestation', 'Spiritual Training'], price: 'From ₹2,500' },
              { name: 'Shruthi', init: 'S', ring: '#B81818', bg: '#FFF0F0', role: 'Tarot Reader · Akashic Records · Numerologist', bio: 'Five years, 900+ readings. Shruthi brings extraordinary intuitive clarity to every session — her readings are known for precision and compassion.', spec: ['Tarot', 'Akashic Records', 'Numerology'], price: 'From ₹1,800' },
            ].map(p => (
              <div key={p.name} style={{ background: 'white', border: '1px solid #E8D8C0', borderRadius: '4px', padding: '2rem', display: 'flex', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, ${p.ring}, ${p.ring}88)` }} />
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: p.bg, border: `2px solid ${p.ring}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="cinzel" style={{ fontSize: '1.8rem', color: p.ring, fontWeight: 600 }}>{p.init}</span>
                </div>
                <div>
                  <h3 className="cinzel" style={{ fontSize: '1.2rem', color: '#2A1008', fontWeight: 600, marginBottom: '.2rem' }}>{p.name}</h3>
                  <p style={{ fontSize: '.73rem', color: '#8A6050', marginBottom: '.6rem', letterSpacing: '.03em' }}>{p.role}</p>
                  <p style={{ fontSize: '.85rem', color: '#5A3828', lineHeight: 1.75, marginBottom: '.9rem' }}>{p.bio}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1rem' }}>
                    {p.spec.map(s => (
                      <span key={s} style={{ fontSize: '.66rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.2rem .7rem', background: '#FAF4E0', border: `1px solid ${p.ring}30`, color: p.ring, borderRadius: '2px' }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="cinzel" style={{ fontSize: '.8rem', color: p.ring, fontWeight: 500 }}>{p.price}</span>
                    <a href="/book" style={{ fontSize: '.73rem', color: '#2A1008', textDecoration: 'none', fontFamily: "'Cinzel',serif", letterSpacing: '.06em', borderBottom: `1px solid ${p.ring}50`, paddingBottom: '1px' }}>Book Session →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: '5rem 3.5rem', background: '#2A1008' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-eyebrow" style={{ color: '#E8A818' }}>Healing Sessions</div>
            <h2 className="cinzel" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#FAF4E0', fontWeight: 600 }}>Choose Your Sacred Path</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
            {services.map(s => (
              <div key={s.name} className="card-d" style={{ borderLeft: `4px solid ${s.accent}`, background: '#3A1A10', border: 'none', borderLeft: `4px solid ${s.accent}` } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '.64rem', letterSpacing: '.15em', textTransform: 'uppercase', color: s.accent, fontFamily: "'Cinzel',serif" }}>{s.category}</span>
                  <span style={{ fontSize: '.7rem', color: '#8A6050' }}>{s.who}</span>
                </div>
                <h3 className="cinzel" style={{ fontSize: '1.1rem', color: '#FAF4E0', fontWeight: 600, marginBottom: '.7rem', lineHeight: 1.35 }}>{s.name}</h3>
                <p style={{ fontSize: '.83rem', color: '#A07860', lineHeight: 1.75, marginBottom: '1.4rem' }}>{s.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '.9rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                  <span className="cinzel" style={{ fontSize: '1.2rem', color: s.accent, fontWeight: 600 }}>{s.price}</span>
                  <a href={`/book?service=${s.slug}`} style={{ fontSize: '.74rem', color: '#C0A080', textDecoration: 'none', fontFamily: "'Cinzel',serif", letterSpacing: '.06em', transition: 'color .2s' }}>Book Session →</a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/services" style={{ display: 'inline-block', padding: '.75rem 2rem', border: '1.5px solid rgba(232,168,24,.4)', borderRadius: '2px', color: '#E8A818', fontSize: '.82rem', textDecoration: 'none', fontFamily: "'Cinzel',serif", letterSpacing: '.08em', transition: 'all .2s' }}>View All 6 Sessions</a>
          </div>
        </div>
      </section>

      {/* PATTERN DIVIDER */}
      <PatternBorder color1="#E8A818" color2="#D4500A" />

      {/* AI RECOMMENDER */}
      <section style={{ padding: '3.5rem 3.5rem', background: '#B81818' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '.64rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', fontFamily: "'Cinzel',serif", marginBottom: '.5rem' }}>AI Guidance</div>
            <h3 className="cinzel" style={{ fontSize: '1.4rem', color: 'white', fontWeight: 600, marginBottom: '.4rem' }}>Not Sure Where to Begin?</h3>
            <p style={{ fontSize: '.86rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.7 }}>Answer 5 gentle questions — our AI recommends the perfect session and practitioner for you.</p>
          </div>
          <a href="/recommend" style={{ display: 'inline-block', padding: '.8rem 2rem', background: '#FAF4E0', color: '#B81818', fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: '.82rem', letterSpacing: '.06em', textDecoration: 'none', borderRadius: '2px', whiteSpace: 'nowrap', transition: 'all .2s' }}>Find My Healing Path →</a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '5rem 3.5rem', background: '#1E0A04' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-eyebrow" style={{ color: '#E8A818' }}>Healing Stories</div>
            <h2 className="cinzel" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#FAF4E0', fontWeight: 600 }}>Real Transformations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#2A1008', border: '1px solid rgba(232,168,24,.12)', borderRadius: '4px', padding: '2rem', position: 'relative' }}>
                <div className="cinzel" style={{ fontSize: '4rem', color: '#E8A818', opacity: .25, lineHeight: .8, marginBottom: '.2rem' }}>&ldquo;</div>
                <p style={{ fontSize: '.9rem', color: '#C0A080', lineHeight: 1.8, marginBottom: '1.4rem', fontStyle: 'italic' }}>{t.text}</p>
                <div style={{ height: '1px', background: 'rgba(232,168,24,.15)', marginBottom: '.9rem' }} />
                <div className="cinzel" style={{ fontSize: '.72rem', color: '#E8A818', letterSpacing: '.12em', textTransform: 'uppercase' }}>{t.name}</div>
                <div style={{ fontSize: '.68rem', color: '#6A4030', marginTop: '.1rem' }}>{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5.5rem 3.5rem', background: 'linear-gradient(135deg,#D4500A 0%,#B81818 50%,#D4500A 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .06, backgroundImage: 'repeating-linear-gradient(45deg,white 0px,white 1px,transparent 1px,transparent 16px)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.8rem', opacity: .5 }}>
            <div className="diamond-divider" />
            <div className="diamond-divider" style={{ transform: 'rotate(45deg) scale(1.5)' }} />
            <div className="diamond-divider" />
          </div>
          <h2 className="cinzel" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.1rem', lineHeight: 1.1 }}>
            Your Sacred Transformation<br />Begins Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,.75)', lineHeight: 1.85, marginBottom: '2.5rem', fontSize: '.96rem' }}>
            Book your first healing session. No prior experience needed — only an open heart and the willingness to heal.
          </p>
          <a href="/services" style={{ display: 'inline-block', padding: '1rem 3rem', background: '#FAF4E0', color: '#D4500A', fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: '.9rem', letterSpacing: '.08em', textDecoration: 'none', borderRadius: '2px', transition: 'all .2s' }}>Book a Session</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0E0504', padding: '3rem 3.5rem', borderTop: '3px solid #3A1A10', textAlign: 'center' }}>
        <PatternBorder color1="#D4500A40" color2="#E8A81840" height={3} />
        <div style={{ paddingTop: '2rem' }}>
          <div className="cinzel" style={{ fontSize: '1.2rem', color: '#E8A818', letterSpacing: '.1em', fontWeight: 600, marginBottom: '.4rem' }}>PranaTatva</div>
          <p style={{ fontSize: '.7rem', color: '#5A3828', letterSpacing: '.06em' }}>Sacred Healing · India · EN | हि | తె</p>
          <p style={{ fontSize: '.65rem', color: '#3A1A10', marginTop: '1.5rem' }}>© 2026 PranaTatva. Sessions are complementary wellness services and not a substitute for medical advice.</p>
          <div style={{ marginTop: '1.2rem' }}>
            <Link href="/designs" style={{ fontSize: '.7rem', color: '#6A3020', textDecoration: 'none', fontFamily: "'Cinzel',serif", borderBottom: '1px solid #3A1A10', paddingBottom: '1px' }}>← Back to Design Options</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
