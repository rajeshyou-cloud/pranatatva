import Link from 'next/link'
import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog/posts'

export const metadata: Metadata = {
  title: 'Healing Journal — Wisdom on Spiritual Growth',
  description: 'Explore articles on Theta Healing, Akashic Records, Sadhana, manifestation, and spiritual awakening from the practitioners at PranaTatva.',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Healing Modalities': 'bg-amber-100 text-amber-800',
  'Soul Work':          'bg-purple-100 text-purple-800',
  'Sadhana':            'bg-green-100 text-green-800',
  'Manifestation':      'bg-orange-100 text-orange-800',
  'Spiritual Growth':   'bg-blue-100 text-blue-800',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Hero */}
      <div className="bg-brand-charcoal pt-6 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-amber text-xs font-medium tracking-widest uppercase mb-2">PranaTatva Healing Journal</p>
          <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
            Wisdom for the <span className="text-brand-amber italic">Inner Journey</span>
          </h1>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Insights on healing, sadhana, and spiritual growth — grounded in ancient wisdom, written for modern seekers.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-14">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-amber/10 hover:shadow-md transition-shadow">
            <div className="md:grid md:grid-cols-[1fr_2fr]">
              {/* Decorative panel */}
              <div className="bg-brand-charcoal min-h-[200px] md:min-h-0 flex flex-col justify-end p-8">
                <div className="w-12 h-1 bg-brand-amber rounded mb-4" />
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {featured.category}
                </span>
                <p className="text-white/40 text-xs">{featured.readTime} min read</p>
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs text-brand-amber font-medium uppercase tracking-wider mb-2">Featured</span>
                <h2 className="font-display text-2xl text-[#2C1A0E] group-hover:text-brand-amber transition-colors mb-3 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <div className="w-7 h-7 rounded-full bg-brand-amber/20 flex items-center justify-center font-semibold text-brand-amber text-sm">
                    {featured.author[0]}
                  </div>
                  <span className="text-gray-600 font-medium">{featured.author}</span>
                  <span>·</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <h2 className="font-display text-xl text-[#2C1A0E] mb-6">All Articles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-brand-amber/10 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-brand-amber to-[#8B5A2A]" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime} min</span>
                </div>
                <h3 className="font-display text-base text-[#2C1A0E] group-hover:text-brand-amber transition-colors leading-snug mb-2 flex-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
                  <div className="w-6 h-6 rounded-full bg-brand-amber/15 flex items-center justify-center font-semibold text-brand-amber text-xs">
                    {post.author[0]}
                  </div>
                  <span className="text-gray-600">{post.author}</span>
                  <span className="ml-auto">{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-brand-charcoal rounded-2xl p-10 text-center">
          <p className="text-brand-amber text-sm font-medium tracking-widest uppercase mb-3">Begin Your Journey</p>
          <h3 className="font-display text-2xl text-white mb-3">Ready to experience healing?</h3>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">Book a Free Discovery Call with Hemavathi or Shruthi — no obligation, no cost.</p>
          <Link href="/services/free-discovery-call" className="inline-block bg-brand-amber text-white text-sm font-medium rounded-full px-7 py-3 hover:bg-[#A36208] transition-colors">
            Claim Your Free Session →
          </Link>
        </div>
      </div>
    </div>
  )
}
