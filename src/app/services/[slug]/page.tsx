import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, User, Users, Shield, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react'
import { formatINR } from '@/lib/utils'

const services: Record<string, {
  slug: string; name: string; category: string; sessionType: string
  duration: number; pricePaise: number; description: string
  practitioner: string; pracColor: string; tags: string[]; includes: string[]
}> = {
  'theta-healing-deep-dive': {
    slug: 'theta-healing-deep-dive',
    name: 'Theta Healing Deep Dive',
    category: 'Healing · Theta State',
    sessionType: '1on1',
    duration: 60,
    pricePaise: 250000,
    description: 'Hemavathi guides you into the theta brainwave state — the gateway to your subconscious mind — to identify and permanently dissolve the limiting beliefs, fears, and inherited patterns that are holding you back from living your fullest life.',
    practitioner: 'Hemavathi',
    pracColor: '#8B5A2A',
    tags: ['Healing', 'Theta State', 'Energy Work'],
    includes: ['Pre-session intake form and intention setting', 'Deep theta-state guided induction', 'Belief identification and permanent release', 'Post-session integration notes from Hemavathi', 'Zoom video link sent to your email', 'GST-compliant invoice emailed automatically'],
  },
  'abundance-manifestation': {
    slug: 'abundance-manifestation',
    name: 'Abundance Manifestation Session',
    category: 'Manifestation · Abundance',
    sessionType: '1on1',
    duration: 75,
    pricePaise: 300000,
    description: 'Clear financial, career, and abundance blocks using Hemavathi\'s sacred blend of Theta Healing and manifestation codes. Transformative and deeply practical — most clients report tangible shifts within 10 days.',
    practitioner: 'Hemavathi',
    pracColor: '#8B5A2A',
    tags: ['Manifestation', 'Abundance', 'Theta Healing'],
    includes: ['Abundance block identification and release', 'Theta-state manifestation anchoring', 'Personalised 30-day manifestation practices', 'Action steps for immediate alignment', 'Zoom video link sent to your email', 'GST-compliant invoice emailed automatically'],
  },
  'tarot-card-reading': {
    slug: 'tarot-card-reading',
    name: 'Tarot Card Reading',
    category: 'Tarot · Guidance',
    sessionType: '1on1',
    duration: 45,
    pricePaise: 180000,
    description: 'Shruthi\'s intuitive Tarot readings illuminate your path, reveal hidden patterns, and offer clarity on love, career, purpose, and the year ahead. Grounded, compassionate, and deeply accurate.',
    practitioner: 'Shruthi',
    pracColor: '#6A3D8A',
    tags: ['Tarot', 'Guidance', 'Intuitive Reading'],
    includes: ['Full spread reading tailored to your question', 'In-depth card interpretation', 'Practical guidance and next steps', 'Recording of key insights', 'Zoom video link sent to your email', 'GST-compliant invoice emailed automatically'],
  },
  'spiritual-awakening-mastery': {
    slug: 'spiritual-awakening-mastery',
    name: 'Spiritual Awakening Mastery Program',
    category: 'Training · Certification',
    sessionType: '1on1',
    duration: 0,
    pricePaise: 2200000,
    description: 'Hemavathi\'s 8-week immersive training in Theta Healing, manifestation principles, and spiritual leadership. Includes live group sessions, 1:1 mentoring, journal work, and a completion certificate.',
    practitioner: 'Hemavathi',
    pracColor: '#8B5A2A',
    tags: ['Training', 'Certification', 'Theta Healing'],
    includes: ['8 live group sessions (2 hrs each)', '2 private 1:1 mentoring sessions with Hemavathi', 'Course workbook and journal prompts', 'Private student community access', 'Completion certificate', 'Lifetime access to session recordings'],
  },
  'akashic-records-soul-reading': {
    slug: 'akashic-records-soul-reading',
    name: 'Akashic Records Soul Reading',
    category: 'Akashic Records · Soul Journey',
    sessionType: '1on1',
    duration: 60,
    pricePaise: 220000,
    description: 'Shruthi accesses your Akashic Records — the energetic library of your soul\'s complete journey — to uncover past-life patterns, soul contracts, karmic debts, and your highest life purpose.',
    practitioner: 'Shruthi',
    pracColor: '#6A3D8A',
    tags: ['Akashic Records', 'Soul Journey', 'Past Lives'],
    includes: ['Full Akashic Records opening and prayer', 'Past-life pattern and soul contract exploration', 'Karma clearing and purpose alignment', 'Written summary of key insights', 'Zoom video link sent to your email', 'GST-compliant invoice emailed automatically'],
  },
  'free-discovery-call': {
    slug: 'free-discovery-call',
    name: 'Free Discovery Call',
    category: 'Consultation · Free',
    sessionType: '1on1',
    duration: 30,
    pricePaise: 0,
    description: 'A sacred 30-minute conversation with Hemavathi or Shruthi to understand your healing needs and guide you to the right service. No commitment needed — only an open heart.',
    practitioner: 'Hemavathi or Shruthi',
    pracColor: '#8B5A2A',
    tags: ['Consultation', 'Free', 'Introductory'],
    includes: ['Understand your current healing needs', 'Explore which service is the best fit', 'Meet your practitioner before booking', 'No payment required', 'Zoom video link sent to your email'],
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = services[params.slug]
  if (!s) return {}
  return {
    title: s.name,
    description: s.description.slice(0, 160),
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const s = services[params.slug]
  if (!s) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-violet to-brand-purple py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="text-white/60 text-sm hover:text-white mb-6 inline-flex items-center gap-1">
            ← Back to Services
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="text-brand-amber text-xs font-medium uppercase tracking-wide capitalize">
                {s.category}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold mt-2 mb-4">{s.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {s.duration === 0 ? '8-week program' : `${s.duration} min`}
                </span>
                <span className="flex items-center gap-1">
                  {s.sessionType === 'group'
                    ? <><Users className="w-4 h-4" /> Group session</>
                    : <><User className="w-4 h-4" /> 1:1 session</>}
                </span>
                <span>with {s.practitioner}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-brand-amber">{formatINR(s.pricePaise)}</p>
              <p className="text-white/50 text-xs mt-1">Incl. GST • Secure Razorpay</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: description */}
            <div className="lg:col-span-2 space-y-8">
              <div className="card">
                <h2 className="font-display text-2xl font-semibold text-brand-violet mb-4">
                  About This Session
                </h2>
                <p className="text-gray-600 leading-relaxed">{s.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {s.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="font-display text-2xl font-semibold text-brand-violet mb-4">
                  What&rsquo;s Included
                </h2>
                <ul className="space-y-3">
                  {s.includes.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  This is a complementary wellness service and is not a substitute for licensed
                  medical, psychological, or psychiatric care. Please consult a qualified healthcare
                  professional for medical concerns.
                </p>
              </div>
            </div>

            {/* Right: booking card */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="font-display text-2xl font-semibold text-brand-violet mb-2">
                  Book This Session
                </h3>
                <p className="text-3xl font-bold text-brand-violet mb-1">
                  {formatINR(s.pricePaise)}
                </p>
                <p className="text-xs text-gray-400 mb-6">GST-compliant invoice emailed on payment</p>

                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-violet" /> Pick any available slot
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-brand-violet" /> Secure payment via Razorpay
                  </li>
                </ul>

                <Link
                  href={`/book?service=${s.slug}`}
                  className="btn-primary w-full justify-center text-base py-4"
                >
                  Book Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>

                <p className="text-xs text-center text-gray-400 mt-4">
                  You&rsquo;ll choose your slot on the next screen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
