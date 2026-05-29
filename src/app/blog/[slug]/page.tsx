import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getAllSlugs, blogPosts } from '@/lib/blog/posts'

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 2)
  const others = blogPosts.filter(p => p.slug !== post.slug && !related.includes(p)).slice(0, 2 - related.length)
  const suggestions = [...related, ...others].slice(0, 2)

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Header strip — compact */}
      <div className="bg-brand-charcoal pt-5 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs mb-3 transition-colors">
            ← Back to Journal
          </Link>
          <div className="flex items-center gap-3 mb-2.5">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
              {post.category}
            </span>
            <span className="text-white/30 text-xs">{post.readTime} min read</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-white leading-snug mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-amber/30 flex items-center justify-center font-semibold text-brand-amber text-sm">
              {post.author[0]}
            </div>
            <p className="text-white/60 text-xs">{post.author} · {post.authorRole} · {formatDate(post.publishedAt)}</p>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Lead excerpt */}
        <p className="text-[#5C3D28] text-base leading-relaxed border-l-4 border-brand-amber pl-4 mb-8 italic">
          {post.excerpt}
        </p>

        <article
          className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-[#2C1A0E]
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[15px]
            prose-li:text-gray-600 prose-li:text-[15px]
            prose-strong:text-[#2C1A0E]
            prose-a:text-[#C4780A] prose-a:no-underline hover:prose-a:underline
            prose-ul:space-y-1 prose-ol:space-y-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-brand-amber/10 text-brand-amber px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-brand-amber/20" />

        {/* Author card */}
        <div className="bg-white rounded-2xl p-6 border border-brand-amber/10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-amber/20 flex items-center justify-center font-semibold text-brand-amber text-lg flex-shrink-0">
            {post.author[0]}
          </div>
          <div>
            <p className="font-medium text-[#2C1A0E] mb-0.5">{post.author}</p>
            <p className="text-xs text-gray-400 mb-2">{post.authorRole}</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              {post.author === 'Hemavathi'
                ? 'Hemavathi is a certified Theta Healing practitioner, Certified NLP Practitioner, and spiritual guide with over 18 years of experience in energy healing, ancestral clearing, and abundance work.'
                : 'Shruthi is a trained Tarot reader and Akashic Records practitioner who combines symbolic interpretation with soul-level insight to help clients find clarity and direction.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-brand-charcoal rounded-2xl p-8 text-center">
          <p className="text-brand-amber text-xs font-medium tracking-widest uppercase mb-2">Work with us</p>
          <h3 className="font-display text-xl text-white mb-2">Ready to begin?</h3>
          <p className="text-white/50 text-sm mb-5">Book a free 30-minute Discovery Call — no obligation.</p>
          <Link href="/services/free-discovery-call" className="inline-block bg-brand-amber text-white text-sm font-medium rounded-full px-6 py-2.5 hover:bg-[#A36208] transition-colors">
            Claim Free Session →
          </Link>
        </div>

        {/* Related posts */}
        {suggestions.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-xl text-[#2C1A0E] mb-6">More from the Journal</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {suggestions.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-xl border border-brand-amber/10 p-5 hover:shadow-md transition-shadow">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {p.category}
                  </span>
                  <h4 className="font-display text-sm text-[#2C1A0E] group-hover:text-brand-amber transition-colors mt-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{p.readTime} min · {p.author}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
