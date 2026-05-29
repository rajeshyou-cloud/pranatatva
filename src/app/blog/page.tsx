import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Healing Journal — Wisdom on Spiritual Growth',
  description: 'Explore articles on Theta Healing, Akashic Records, Sadhana, manifestation, and spiritual awakening from the practitioners at PranaTatva.',
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
            {/* Featured image panel */}
            <div className="relative min-h-[200px] md:min-h-0 overflow-hidden">
              <Image
                src="/images/blog/theta_healing_images_animated_202605291238.jpeg"
                alt={featured.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/30 to-transparent" />
              <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1.5">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {featured.category}
                </span>
                <p className="text-white/50 text-xs">{featured.readTime} min read</p>
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
