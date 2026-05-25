import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Heart, Sparkles, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the PranaTatva practitioners — spiritual healers and manifestation coaches dedicated to your transformation.',
}

const values = [
  {
    icon: Heart,
    title: 'Compassionate Presence',
    description: 'Every session is held in a non-judgmental, deeply compassionate space where your truth is honoured.',
  },
  {
    icon: Sparkles,
    title: 'Ancient Wisdom, Modern Access',
    description: 'We weave Vedic traditions, energy work, and modern coaching into accessible, effective practices.',
  },
  {
    icon: Globe,
    title: 'Inclusive & Multilingual',
    description: 'Sessions available in English, Hindi, and Telugu so healing is never lost in translation.',
  },
  {
    icon: Award,
    title: 'Ethical Practice',
    description: 'We are transparent about what we offer: complementary wellness — never a replacement for medical care.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-cream via-white to-brand-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-violet/10 text-brand-violet text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="section-title mb-6">
              Rooted in Ancient Wisdom,<br />
              <span className="italic text-brand-gold">Present in Your Journey</span>
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg">
              PranaTatva was born from a simple belief: every person carries within them the capacity
              for healing, abundance, and deep peace. Our practitioners serve as guides — not gurus —
              helping you access what was always yours.
            </p>
          </div>
        </div>
      </section>

      {/* Lead practitioner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* photo placeholder */}
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-brand-violet/20 to-brand-amber/20 flex items-center justify-center">
              <div className="text-center text-brand-violet/40">
                <Sparkles className="w-16 h-16 mx-auto mb-3" />
                <p className="text-sm">Practitioner Photo</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-4xl font-semibold text-brand-violet mb-2">Lakshmmi</h2>
              <p className="text-brand-gold font-medium mb-6">Spiritual Healer & Manifestation Coach</p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With over a decade of immersion in Vedic traditions, energy medicine, and
                  conscious living, Lakshmmi has guided hundreds of seekers across India and
                  the diaspora toward clarity, healing, and abundance.
                </p>
                <p>
                  Her work draws from Reiki, Pranic Healing, Vedic Astrology, past-life
                  regression, and breathwork — integrated into a uniquely personal approach
                  for each client.
                </p>
                <p>
                  Lakshmmi holds certifications in multiple healing modalities and continues
                  her own practice of daily meditation and study of the ancient texts.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {['Energy Healing', 'Manifestation', 'Vedic Astrology', 'Past Life Regression', 'Breathwork'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href="/services" className="btn-primary mt-8 inline-flex">
                Book with Lakshmmi <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(v => (
              <div key={v.title} className="card text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-brand-violet" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-violet mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            All sessions offered by PranaTatva are complementary wellness services intended to
            support holistic well-being. They are not a substitute for licensed medical,
            psychological, or psychiatric care. Please consult a qualified healthcare professional
            for medical concerns.
          </p>
        </div>
      </section>
    </>
  )
}
