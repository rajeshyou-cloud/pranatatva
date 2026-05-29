import Link from 'next/link'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Healing Journal — Wisdom on Spiritual Growth',
  description: 'Explore articles on Theta Healing, Akashic Records, Sadhana, manifestation, and spiritual awakening from the practitioners at PranaTatva.',
}

function CategoryVisual({ category }: { category: string }) {
  const A = '#C4780A'   // amber
  const AL = 'rgba(196,120,10,0.18)'
  const AM = 'rgba(196,120,10,0.35)'

  if (category === 'Healing Modalities') return (
    // θ symbol + theta brainwave pattern
    <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none">
      {/* Rings */}
      <circle cx="100" cy="96" r="72" stroke={AL} strokeWidth="1" />
      <circle cx="100" cy="96" r="50" stroke={AM} strokeWidth="1" />
      {/* θ symbol */}
      <text x="100" y="122" textAnchor="middle" fontSize="80" fill={A} fontFamily="Georgia,serif" opacity="0.92">θ</text>
      {/* Theta brainwave — sinusoidal, slow frequency */}
      <path d="M18,158 C28,144 38,172 48,158 C58,144 68,172 78,158 C88,144 98,172 108,158 C118,144 128,172 138,158 C148,144 158,172 168,158 C175,148 180,158 182,158"
            stroke={A} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Sparkles */}
      <circle cx="34" cy="46" r="1.5" fill={A} opacity="0.5" />
      <circle cx="166" cy="40" r="1" fill={A} opacity="0.4" />
      <circle cx="172" cy="130" r="1.5" fill={A} opacity="0.4" />
      <circle cx="28" cy="128" r="1" fill={A} opacity="0.3" />
    </svg>
  )

  if (category === 'Soul Work') return (
    // Akasha eye + stars + infinity
    <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none">
      <circle cx="100" cy="100" r="72" stroke={AL} strokeWidth="1" />
      {/* Eye shape */}
      <path d="M40,100 Q100,48 160,100 Q100,152 40,100Z" stroke={A} strokeWidth="1.2" opacity="0.5" />
      {/* Iris */}
      <circle cx="100" cy="100" r="22" stroke={A} strokeWidth="1.2" opacity="0.7" />
      <circle cx="100" cy="100" r="10" fill={A} opacity="0.5" />
      <circle cx="106" cy="95" r="3" fill="white" opacity="0.3" />
      {/* Stars */}
      {[[38,52],[162,52],[38,148],[162,148],[100,30],[100,170]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill={A} opacity="0.45" />
      ))}
      {/* Infinity at base */}
      <path d="M72,165 C72,158 82,158 100,165 C118,172 128,172 128,165 C128,158 118,158 100,165 C82,172 72,172 72,165Z"
            stroke={A} strokeWidth="1.2" opacity="0.5" />
    </svg>
  )

  if (category === 'Sadhana') return (
    // OM symbol + sunrise rays
    <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none">
      <circle cx="100" cy="100" r="72" stroke={AL} strokeWidth="1" />
      {/* Sunrise rays */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
        const r = (deg * Math.PI) / 180
        return <line key={i} x1={100 + Math.cos(r)*38} y1={100 + Math.sin(r)*38}
                     x2={100 + Math.cos(r)*62} y2={100 + Math.sin(r)*62}
                     stroke={A} strokeWidth="1" opacity={i%2===0?'0.5':'0.25'} />
      })}
      {/* OM text */}
      <text x="100" y="118" textAnchor="middle" fontSize="68" fill={A} fontFamily="Georgia,serif" opacity="0.9">ॐ</text>
    </svg>
  )

  if (category === 'Manifestation') return (
    // Golden spiral + radiating stars
    <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none">
      <circle cx="100" cy="100" r="72" stroke={AL} strokeWidth="1" />
      {/* Spiral approximation */}
      <path d="M100,100 Q130,70 130,100 Q130,140 100,140 Q60,140 60,100 Q60,58 100,58 Q148,58 148,100 Q148,152 100,152"
            stroke={A} strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
      {/* Center dot */}
      <circle cx="100" cy="100" r="4" fill={A} opacity="0.8" />
      {/* Radiating stars */}
      {[[40,40],[160,40],[40,160],[160,160],[100,28],[100,172],[28,100],[172,100]].map(([cx,cy],i) => (
        <text key={i} x={cx} y={cy+4} textAnchor="middle" fontSize="10" fill={A} opacity="0.4">✦</text>
      ))}
    </svg>
  )

  if (category === 'Spiritual Growth') return (
    // Ascending triangle + light rays
    <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none">
      <circle cx="100" cy="100" r="72" stroke={AL} strokeWidth="1" />
      {/* Triangle */}
      <polygon points="100,42 148,148 52,148" stroke={A} strokeWidth="1.4" opacity="0.7" />
      {/* Inner triangle */}
      <polygon points="100,66 132,132 68,132" stroke={A} strokeWidth="1" opacity="0.35" />
      {/* Rays from apex */}
      {[-50,-30,-15,0,15,30,50].map((angle,i) => {
        const r = ((angle - 90) * Math.PI) / 180
        return <line key={i} x1="100" y1="42"
                     x2={100 + Math.cos(r)*55} y2={42 + Math.sin(r)*55}
                     stroke={A} strokeWidth="1" opacity={i===3?'0.5':'0.2'} />
      })}
      {/* Center eye */}
      <circle cx="100" cy="114" r="6" stroke={A} strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="114" r="2.5" fill={A} opacity="0.5" />
    </svg>
  )

  // Default
  return (
    <svg viewBox="0 0 200 200" className="w-36 h-36" fill="none">
      <circle cx="100" cy="100" r="72" stroke={AL} strokeWidth="1" />
      <circle cx="100" cy="100" r="44" stroke={AM} strokeWidth="1" />
      <circle cx="100" cy="100" r="18" fill={A} opacity="0.3" />
      <circle cx="100" cy="100" r="6" fill={A} opacity="0.7" />
    </svg>
  )
}

const CATEGORY_COLORS: Record<string, string> = {
  'Healing Modalities': 'bg-amber-100 text-amber-800',
  'Soul Work':          'bg-purple-100 text-purple-800',
  'Sadhana':            'bg-emerald-100 text-emerald-800',
  'Manifestation':      'bg-orange-100 text-orange-800',
  'Spiritual Growth':   'bg-sky-100 text-sky-800',
}

const CATEGORY_ICONS: Record<string, string> = {
  'Healing Modalities': '✦',
  'Soul Work':          '◎',
  'Sadhana':            '☽',
  'Manifestation':      '✧',
  'Spiritual Growth':   '∞',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="min-h-screen bg-[#FBF7F0]">

      {/* ── Hero ── */}
      <div className="bg-brand-charcoal py-8 px-4 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/5 translate-x-1/2" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/5 translate-x-1/2" />
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div>
            <p className="text-brand-amber text-xs font-medium tracking-widest uppercase mb-1.5">PranaTatva Healing Journal</p>
            <h1 className="font-display text-3xl md:text-4xl text-white">
              Wisdom for the <span className="text-brand-amber italic">Inner Journey</span>
            </h1>
            <p className="text-white/45 text-sm mt-1.5 max-w-lg">
              Insights on healing, sadhana, and spiritual growth — grounded in ancient wisdom.
            </p>
          </div>
          <div className="hidden md:flex gap-2 flex-shrink-0">
            {['Healing', 'Sadhana', 'Soul Work'].map(tag => (
              <span key={tag} className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Featured post ── */}
        <div className="mb-2">
          <p className="text-xs text-brand-amber font-medium tracking-widest uppercase mb-4">Featured Article</p>
        </div>
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8D9C4] hover:shadow-lg transition-all duration-300 md:grid md:grid-cols-[260px_1fr]">
            {/* Decorative left panel — category-specific visual */}
            <div className="bg-brand-charcoal relative min-h-[200px] md:min-h-0 flex flex-col items-center justify-center p-6 overflow-hidden">
              <CategoryVisual category={featured.category} />
              <div className="mt-3 text-center">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {featured.category}
                </span>
                <p className="text-white/30 text-xs mt-1.5">{featured.readTime} min read</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col justify-center">
              <h2 className="font-display text-xl md:text-2xl text-[#2C1A0E] group-hover:text-brand-amber transition-colors leading-snug mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-amber/20 flex items-center justify-center font-semibold text-brand-amber text-sm">
                    {featured.author[0]}
                  </div>
                  <div>
                    <p className="text-[#2C1A0E] text-xs font-medium">{featured.author}</p>
                    <p className="text-gray-400 text-xs">{formatDate(featured.publishedAt)}</p>
                  </div>
                </div>
                <span className="text-brand-amber text-xs font-medium group-hover:gap-2 transition-all">
                  Read article →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── All Articles grid ── */}
        <p className="text-xs text-brand-amber font-medium tracking-widest uppercase mb-4">All Articles</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {rest.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl border border-[#E8D9C4] hover:border-brand-amber/30 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
            >
              {/* Category header */}
              <div className="bg-[#FBF7F0] border-b border-[#E8D9C4] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-brand-amber text-sm">{CATEGORY_ICONS[post.category] ?? '✦'}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {post.category}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{post.readTime} min</span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-[15px] text-[#2C1A0E] group-hover:text-brand-amber transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0E8DC]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-brand-amber/15 flex items-center justify-center text-brand-amber text-[10px] font-bold">
                      {post.author[0]}
                    </div>
                    <span className="text-xs text-gray-500">{post.author}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="bg-brand-charcoal rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <p className="text-brand-amber text-xs font-medium tracking-widest uppercase mb-1">Begin Your Journey</p>
            <h3 className="font-display text-2xl text-white mb-1">Ready to experience healing?</h3>
            <p className="text-white/45 text-sm">Book a Free Discovery Call — no obligation, no cost.</p>
          </div>
          <Link
            href="/services/free-discovery-call"
            className="flex-shrink-0 bg-brand-amber text-white text-sm font-medium rounded-full px-7 py-3 hover:bg-[#A36208] transition-colors whitespace-nowrap"
          >
            Claim Free Session →
          </Link>
        </div>
      </div>
    </div>
  )
}
