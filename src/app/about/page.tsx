import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Heart, Sparkles, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | PranaTatva',
  description: 'Meet Hemavathi and Shruthi — the certified healing practitioners behind PranaTatva. Theta Healing, Tarot, Akashic Records, Reiki, EFT and more.',
}

const values = [
  {
    icon: Heart,
    title: 'Compassionate Presence',
    description: 'Every session is held in a non-judgmental, deeply compassionate space where your truth is honoured without condition.',
  },
  {
    icon: Sparkles,
    title: 'Ancient Wisdom, Modern Access',
    description: 'We weave Vedic traditions, energy work, and proven healing modalities into practices that fit modern life.',
  },
  {
    icon: Globe,
    title: 'Inclusive & Multilingual',
    description: 'Sessions available in English, Hindi, and Telugu — so healing is never lost in translation.',
  },
  {
    icon: Award,
    title: 'Ethical Practice',
    description: 'We are transparent about what we offer: complementary wellness — never a replacement for medical care.',
  },
]

const practitioners = [
  {
    name: 'Hemavathi',
    role: 'Theta Healing Practitioner & Akashic Records Guide',
    accent: '#C4780A',
    initial: 'H',
    stats: [
      { val: '1,400+', lbl: 'Sessions Conducted' },
      { val: '8+',     lbl: 'Years of Practice' },
      { val: '3',      lbl: 'Languages' },
    ],
    bio: [
      'Hemavathi is a certified Theta Healing practitioner whose journey into energy medicine began over eight years ago through her own profound experience with ancestral healing. What started as a personal quest became a calling — to guide others through the subconscious layers that hold them back from the life they are meant to live.',
      'Her practice centres on Theta Healing, where she works directly with the theta brainwave state to identify and shift limiting beliefs at their root. She also facilitates Akashic Records readings — accessing the energetic blueprint of a soul\'s journey to bring clarity on relationships, life purpose, and karmic patterns.',
      'Hemavathi weaves Reiki and Manifestation coaching into her sessions, creating a holistic container that addresses the energetic, emotional, and intentional dimensions of healing. Clients often describe sessions with her as "deeply still yet quietly transformative."',
    ],
    tags: ['Theta Healing', 'Akashic Records', 'Reiki', 'Manifestation', 'Belief Work', 'Ancestral Healing'],
    cta: 'Book with Hemavathi',
  },
  {
    name: 'Shruthi',
    role: 'Tarot Reader, Numerologist & EFT Practitioner',
    accent: '#8B5A2A',
    initial: 'S',
    stats: [
      { val: '900+',  lbl: 'Readings Given' },
      { val: '6+',    lbl: 'Years of Practice' },
      { val: '3',     lbl: 'Languages' },
    ],
    bio: [
      'Shruthi\'s relationship with Tarot began not as mysticism but as a mirror — a tool for honest self-inquiry that she has since refined into a precise, compassionate practice over six years. Her readings go beyond prediction; they are conversations between the seeker and their own deeper knowing.',
      'As a trained Numerologist, Shruthi maps the mathematical patterns of a person\'s name and birth date to reveal life-path themes, soul urges, and the timing of significant transitions. She brings the same methodical clarity to her EFT (Emotional Freedom Technique) sessions, helping clients release trapped emotional charge from anxiety, grief, and recurring patterns.',
      'Shruthi\'s approach is grounded and practical — she translates intuitive insight into tangible next steps. Seekers leave her sessions with not just clarity but a concrete sense of what to do with it.',
    ],
    tags: ['Tarot Reading', 'Numerology', 'EFT Tapping', 'Chakra Balancing', 'Intuitive Guidance', 'Emotional Release'],
    cta: 'Book with Shruthi',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #FBF7F0 0%, #F5EFE4 60%, #EDE4D4 100%)', padding: '5rem 0 4rem' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(196,120,10,0.08)', border: '1px solid rgba(196,120,10,0.22)', borderRadius: '100px', padding: '6px 16px 6px 10px', marginBottom: '1.8rem' }}>
              <span style={{ fontSize: '9px', color: '#C4780A' }}>✦</span>
              <span style={{ fontSize: '12px', color: '#5C3D28', letterSpacing: '0.04em' }}>Meet the Practitioners</span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem,4vw,3.4rem)', color: '#1A0C04', fontWeight: 400, lineHeight: 1.15, marginBottom: '1.4rem' }}>
              Rooted in Ancient Wisdom,<br />
              <em style={{ color: '#C4780A' }}>Present in Your Journey</em>
            </h1>
            <p style={{ color: '#5C3D28', lineHeight: 1.9, fontSize: '1rem', maxWidth: '520px', opacity: 0.8 }}>
              PranaTatva was founded on a simple belief: every person carries within them the capacity
              for healing, abundance, and deep peace. Hemavathi and Shruthi serve as guides —
              not gurus — helping you access what was always yours.
            </p>
          </div>
        </div>
      </section>

      {/* Practitioners */}
      {practitioners.map((p, idx) => (
        <section
          key={p.name}
          style={{ background: idx % 2 === 0 ? '#FFFFFF' : '#FBF7F0', padding: '5rem 0' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Info card — alternates side */}
              <div style={{ order: idx % 2 === 0 ? 1 : 2 }}>

                {/* Name & role */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '1.6rem' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: `${p.accent}18`,
                    border: `2px solid ${p.accent}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-playfair)', fontSize: '26px', color: p.accent,
                    flexShrink: 0,
                  }}>
                    {p.initial}
                  </div>
                  <div>
                    <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0C04', fontWeight: 500, lineHeight: 1 }}>{p.name}</h2>
                    <p style={{ fontSize: '13px', color: p.accent, marginTop: '5px', fontStyle: 'italic' }}>{p.role}</p>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: '2rem', padding: '1.2rem 1.6rem', background: `${p.accent}08`, borderRadius: '14px', border: `1px solid ${p.accent}18`, marginBottom: '2rem' }}>
                  {p.stats.map(s => (
                    <div key={s.lbl}>
                      <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', color: '#1A0C04', fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: '10px', color: '#9C7A60', marginTop: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {p.bio.map((para, i) => (
                    <p key={i} style={{ color: '#5C3D28', lineHeight: 1.9, fontSize: '0.93rem' }}>{para}</p>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ padding: '5px 14px', borderRadius: '100px', background: `${p.accent}10`, border: `1px solid ${p.accent}28`, color: p.accent, fontSize: '11.5px', fontWeight: 500 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/services"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1A0C04', color: '#F5EFE4', borderRadius: '100px', padding: '13px 28px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}
                >
                  {p.cta} <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>

              {/* Decorative panel — no photo */}
              <div style={{
                order: idx % 2 === 0 ? 2 : 1,
                background: `linear-gradient(145deg, ${p.accent}08 0%, ${p.accent}14 100%)`,
                border: `1px solid ${p.accent}20`,
                borderRadius: '24px',
                padding: '3rem 2.5rem',
                display: 'flex', flexDirection: 'column', gap: '1.4rem',
              }}>
                <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: p.accent, opacity: 0.7, marginBottom: '0.5rem' }}>
                  ✦ &nbsp;Specialisations
                </div>
                {p.tags.map((tag, i) => (
                  <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: 'rgba(255,255,255,0.7)', borderRadius: '12px', border: `1px solid ${p.accent}18`, backdropFilter: 'blur(4px)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.accent, opacity: 0.7, flexShrink: 0 }} />
                    <span style={{ fontSize: '13.5px', color: '#3D2010', fontWeight: 500 }}>{tag}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#9C7A60', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {i < 2 ? 'Signature' : i < 4 ? 'Core' : 'Offered'}
                    </span>
                  </div>
                ))}
                <div style={{ marginTop: '0.5rem', padding: '1rem 1.2rem', background: `${p.accent}0D`, borderRadius: '10px', border: `1px dashed ${p.accent}30` }}>
                  <p style={{ fontSize: '11.5px', color: '#7A5540', lineHeight: 1.7, fontStyle: 'italic' }}>
                    Sessions available in <strong>English</strong>, <strong>Hindi</strong> &amp; <strong>Telugu</strong>.
                    Online &amp; in-person options available.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* Values */}
      <section style={{ background: '#F5EFE4', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C4780A', marginBottom: '0.8rem' }}>✦ &nbsp;Our Principles</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#1A0C04', fontWeight: 400 }}>What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} style={{ background: '#FFFFFF', borderRadius: '18px', padding: '2rem 1.6rem', border: '1px solid rgba(196,120,10,0.12)' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(196,120,10,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <v.icon style={{ width: 22, height: 22, color: '#C4780A' }} />
                </div>
                <h3 className="font-display" style={{ fontSize: '1.05rem', color: '#1A0C04', fontWeight: 600, marginBottom: '0.6rem' }}>{v.title}</h3>
                <p style={{ color: '#7A5540', fontSize: '13px', lineHeight: 1.75 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1A0C04', padding: '5rem 0', textAlign: 'center' }}>
        <div className="max-w-xl mx-auto px-4">
          <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#D4AD25', opacity: 0.7, marginBottom: '1.2rem' }}>✦ &nbsp;Begin Today</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#F5EFE4', fontWeight: 400, marginBottom: '1.2rem' }}>
            Ready to Start Your<br /><em style={{ color: '#D4AD25' }}>Inner Journey?</em>
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.55)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '2.4rem' }}>
            Explore sessions with Hemavathi or Shruthi. Every journey begins with a single, courageous step inward.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4AD25', color: '#1A0C04', borderRadius: '100px', padding: '13px 28px', fontSize: '13.5px', fontWeight: 600, textDecoration: 'none' }}>
              Explore Sessions <ArrowRight style={{ width: 15, height: 15 }} />
            </Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(212,173,37,0.3)', color: 'rgba(245,239,228,0.72)', borderRadius: '100px', padding: '12px 26px', fontSize: '13.5px', textDecoration: 'none' }}>
              Free Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: '#FBF7F0', padding: '2.5rem 0', borderTop: '1px solid #E2D5C4' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p style={{ fontSize: '11px', color: '#9C7A60', lineHeight: 1.8 }}>
            All sessions offered by PranaTatva are complementary wellness services intended to support holistic well-being.
            They are not a substitute for licensed medical, psychological, or psychiatric care.
            Please consult a qualified healthcare professional for medical concerns.
          </p>
        </div>
      </section>
    </>
  )
}
