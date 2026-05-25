import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const designs = [
  {
    id: 'A',
    label: 'Current Live Design',
    name: 'Warm Earthen',
    desc: 'The original design — warm saffron amber on a dark espresso hero, transitioning to a warm parchment background. Earthy, grounded, and traditional Indian wellness aesthetics.',
    href: '/',
    badge: 'Live Now',
    badgeColor: '#22A060',
    palette: ['#2C1A0E', '#C4780A', '#E8A020', '#FBF7F0', '#5C3D28'],
    paletteNames: ['Espresso', 'Saffron Amber', 'Bright Amber', 'Parchment', 'Earth Brown'],
    fonts: 'Playfair Display + DM Sans',
    mood: 'Grounded · Earthy · Traditional',
    best: 'Clients who value a warm, trusted, traditional spiritual feel',
  },
  {
    id: 'B',
    label: 'Design Option B',
    name: 'Celestial Dark',
    desc: 'A luxurious deep-space aesthetic with obsidian backgrounds, animated star-fields, and gold constellation accents. Feels like a high-end astrology or cosmic retreat brand.',
    href: '/design-b',
    badge: 'New',
    badgeColor: '#7060E0',
    palette: ['#07071A', '#0E0C2A', '#D4AF37', '#BCC8D8', '#D4A0A8'],
    paletteNames: ['Obsidian', 'Deep Cosmos', 'Stellar Gold', 'Moonsilver', 'Rose Mist'],
    fonts: 'Cormorant Garamond + Nunito',
    mood: 'Luxury · Mysterious · Cosmic',
    best: 'Clients drawn to astrology, night-time energy, celestial healing',
  },
  {
    id: 'C',
    label: 'Design Option C',
    name: 'Sacred Minimal',
    desc: 'A clean, breathable spa aesthetic with botanical illustrations, generous whitespace, and a sage-terracotta palette. Feels like a luxury Ayurvedic retreat or Japanese wellness studio.',
    href: '/design-c',
    badge: 'New',
    badgeColor: '#4A6B3E',
    palette: ['#FAFAF8', '#F0EAE0', '#4A6B3E', '#B36040', '#8A9E85'],
    paletteNames: ['Pearl White', 'Warm Linen', 'Deep Sage', 'Terracotta', 'Smoke Green'],
    fonts: 'Libre Baskerville + Outfit',
    mood: 'Calm · Clean · Mindful',
    best: 'Clients who prefer modern wellness brands, minimalist aesthetics',
  },
  {
    id: 'D',
    label: 'Design Option D',
    name: 'Saffron Ritual',
    desc: 'A bold, vibrant Indian festival aesthetic with rich saffron-crimson palette, mandala motifs, geometric patterns, and Cinzel display typography. Feels celebratory and culturally rooted.',
    href: '/design-d',
    badge: 'New',
    badgeColor: '#D4500A',
    palette: ['#FAF4E0', '#D4500A', '#B81818', '#E8A818', '#2A1008'],
    paletteNames: ['Ivory', 'Saffron', 'Kumkum Red', 'Marigold', 'Sacred Brown'],
    fonts: 'Cinzel + Poppins',
    mood: 'Bold · Vibrant · Culturally Rich',
    best: 'Clients who want a distinctly Indian spiritual brand identity',
  },
]

function PaletteSwatch({ colors, names }: { colors: string[], names: string[] }) {
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {colors.map((c, i) => (
        <div key={i} title={names[i]} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: '2px solid #E8D9C4', flexShrink: 0 }} />
      ))}
    </div>
  )
}

export default function DesignsPage() {
  return (
    <>
      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg,#1A0C04,#3D2010)', padding: '4rem 3rem 3rem', textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: '#C4780A' }}>Design Showcase</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'white', fontWeight: 400, lineHeight: 1.2, marginTop: '0.6rem', marginBottom: '0.8rem' }}>
          Choose Your PranaTatva Design
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.96rem', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
          Four distinct visual directions for the portal. Preview each design in full — then tell us which one feels right for your brand.
        </p>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'rgba(255,255,255,.5)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.2)', paddingBottom: '2px' }}>
          ← Back to main site
        </Link>
      </div>

      {/* Design cards */}
      <div style={{ background: '#F5EFE4', padding: '3rem 2.5rem', minHeight: 'calc(100vh - 280px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(520px,1fr))', gap: '1.5rem' }}>
          {designs.map(d => (
            <div key={d.id} style={{ background: 'white', border: '1px solid #E8D9C4', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Color bar */}
              <div style={{ height: '6px', background: `linear-gradient(to right, ${d.palette[1]}, ${d.palette[2]}, ${d.palette[3]})` }} />

              <div style={{ padding: '1.8rem 2rem', flex: 1 }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9C7A60', marginBottom: '0.3rem' }}>{d.label}</div>
                    <h2 className="font-display" style={{ fontSize: '1.5rem', color: '#1A0E06', fontWeight: 500, marginBottom: '0' }}>
                      <span style={{ color: '#C4780A', marginRight: '0.5rem', fontStyle: 'italic' }}>Option {d.id}:</span>{d.name}
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.28rem 0.75rem', borderRadius: '100px', background: `${d.badgeColor}18`, color: d.badgeColor, border: `1px solid ${d.badgeColor}30`, flexShrink: 0 }}>
                    {d.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#5C3D28', lineHeight: 1.8, marginBottom: '1.4rem' }}>{d.desc}</p>

                {/* Palette */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9C7A60', marginBottom: '0.5rem' }}>Colour Palette</div>
                  <PaletteSwatch colors={d.palette} names={d.paletteNames} />
                </div>

                {/* Details row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.4rem' }}>
                  <div style={{ background: '#F5EFE4', borderRadius: '8px', padding: '0.8rem' }}>
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9C7A60', marginBottom: '0.3rem' }}>Typography</div>
                    <div style={{ fontSize: '0.8rem', color: '#3D2010', fontWeight: 500 }}>{d.fonts}</div>
                  </div>
                  <div style={{ background: '#F5EFE4', borderRadius: '8px', padding: '0.8rem' }}>
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9C7A60', marginBottom: '0.3rem' }}>Mood</div>
                    <div style={{ fontSize: '0.8rem', color: '#3D2010', fontWeight: 500 }}>{d.mood}</div>
                  </div>
                </div>

                <div style={{ padding: '0.9rem', background: '#F5EFE4', borderRadius: '8px', borderLeft: `3px solid ${d.badgeColor}`, marginBottom: '1.4rem' }}>
                  <div style={{ fontSize: '0.66rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9C7A60', marginBottom: '0.2rem' }}>Best For</div>
                  <div style={{ fontSize: '0.82rem', color: '#3D2010' }}>{d.best}</div>
                </div>
              </div>

              {/* CTA footer */}
              <div style={{ borderTop: '1px solid #E8D9C4', padding: '1.1rem 2rem', background: '#FEFCF8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                {d.id === 'A' ? (
                  <span style={{ fontSize: '0.78rem', color: '#4A6B3E', fontWeight: 500 }}>✓ Currently active on your portal</span>
                ) : (
                  <span style={{ fontSize: '0.78rem', color: '#9C7A60' }}>Full homepage preview</span>
                )}
                <Link
                  href={d.href}
                  target={d.id !== 'A' ? '_blank' : undefined}
                  rel={d.id !== 'A' ? 'noopener noreferrer' : undefined}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.55rem 1.4rem', borderRadius: '100px', background: '#C4780A', color: 'white', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0 }}
                >
                  Preview Design {d.id} <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Selection note */}
        <div style={{ maxWidth: '1200px', margin: '2.5rem auto 0', background: 'white', border: '1px solid #E8D9C4', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4780A', marginBottom: '0.3rem' }}>How to choose</div>
            <p style={{ fontSize: '0.85rem', color: '#5C3D28', lineHeight: 1.7 }}>
              Preview each design by clicking the button. Share the link with your team or client. Once decided, your developer will apply the chosen design across all pages of the portal as the final theme.
            </p>
          </div>
          <a href="mailto:team@pranatatva.com?subject=Design Selection" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.7rem 1.6rem', borderRadius: '100px', border: '1.5px solid #C4780A', color: '#C4780A', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>
            Share My Choice <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  )
}
