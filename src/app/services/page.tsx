'use client'

import { useState } from 'react'
import Link from 'next/link'

const HEMA = { name: 'Hemavathi', initial: 'H', color: '#8B5A2A', role: 'Healing · Manifestation · Training' }
const SHRU = { name: 'Shruthi', initial: 'S', color: '#6A3D8A', role: 'Tarot · Akashic · Numerology' }
const BOTH = { name: 'Hemavathi · Shruthi', initial: 'H', color: '#8B5A2A', role: 'Choose your practitioner' }

function priceLabel(p: number | null) {
  if (p === null) return 'On Request'
  if (p === 0) return 'Free'
  return '₹' + (p / 100).toLocaleString('en-IN')
}

// Reusable hero SVGs keyed by visual theme
function svgConsultation(stroke = '#E8C840') {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" opacity=".55">
      <polygon points="55,14 70,42 100,42 77,62 86,90 55,73 24,90 33,62 10,42 40,42" stroke={stroke} strokeWidth="1" fill="none"/>
      <circle cx="55" cy="55" r="14" fill={stroke} opacity=".28"/>
    </svg>
  )
}
function svgReading(stroke = '#C8A8E8') {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" opacity=".6">
      <ellipse cx="55" cy="55" rx="42" ry="28" stroke={stroke} strokeWidth="1" fill="none"/>
      <ellipse cx="55" cy="55" rx="28" ry="18" stroke="#E8A020" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
      <circle cx="55" cy="55" r="8" stroke={stroke} strokeWidth="1" fill="none"/>
      <circle cx="55" cy="55" r="3" fill={stroke} opacity=".8"/>
    </svg>
  )
}
function svgHealing(stroke = '#80E8C0') {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" opacity=".55">
      <circle cx="55" cy="55" r="44" stroke={stroke} strokeWidth="1" fill="none"/>
      <circle cx="55" cy="55" r="28" stroke="#E8A020" strokeWidth="1" fill="none" strokeDasharray="3 5"/>
      <circle cx="55" cy="55" r="9" fill={stroke} opacity=".8"/>
    </svg>
  )
}
function svgCourse(stroke = '#E8C880') {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" opacity=".55">
      <circle cx="55" cy="55" r="40" stroke={stroke} strokeWidth="1" fill="none"/>
      <circle cx="55" cy="55" r="28" stroke="#E8A020" strokeWidth="1" fill="none" strokeDasharray="5 4"/>
      <line x1="55" y1="15" x2="55" y2="95" stroke={stroke} strokeWidth=".8" opacity=".5"/>
      <line x1="15" y1="55" x2="95" y2="55" stroke={stroke} strokeWidth=".8" opacity=".5"/>
      <circle cx="55" cy="55" r="8" fill={stroke} opacity=".55"/>
    </svg>
  )
}
function svgSadhana(stroke = '#E080A0') {
  return (
    <svg width="110" height="110" viewBox="0 0 110 110" opacity=".55">
      <polygon points="55,12 95,78 15,78" stroke={stroke} strokeWidth="1.5" fill="none"/>
      <polygon points="55,98 95,32 15,32" stroke="#E8A020" strokeWidth="1.5" fill="none"/>
      <circle cx="55" cy="55" r="12" stroke={stroke} strokeWidth="1" fill="none"/>
      <circle cx="55" cy="55" r="4.5" fill={stroke} opacity=".8"/>
    </svg>
  )
}

type Prac = { name: string; initial: string; color: string; role: string }
type Service = {
  slug: string; name: string; category: string; practitioner: Prac
  duration: string; pricePaise: number | null
  tags: { label: string; cls: string }[]
  desc: string; badge: string | null; badgeColor: string | null
  bookBtnCls: string; heroGrad: string; heroSvg: React.ReactNode; featured?: boolean
}

const services: Service[] = [

  // ═══════════════════════════════════════════════
  // CONSULTATIONS
  // ═══════════════════════════════════════════════
  {
    slug: 'free-discovery-call',
    name: 'Free Discovery Call',
    category: 'consultation',
    practitioner: BOTH,
    duration: '30 min',
    pricePaise: 0,
    tags: [{ label: 'Consultation', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }, { label: 'Free', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }],
    desc: 'A sacred 30-minute conversation with Hemavathi or Shruthi to understand your healing needs and guide you to the right service — no commitment needed, only an open heart.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#3D6B4F] hover:bg-[#2A4F38]',
    heroGrad: 'linear-gradient(140deg,#1A1A10 0%,#383818 55%,#101008 100%)',
    heroSvg: svgConsultation('#E8C840'),
  },
  {
    slug: 'vasthu-consultation',
    name: 'Vasthu Consultation',
    category: 'consultation',
    practitioner: SHRU,
    duration: 'As needed',
    pricePaise: 50000,
    tags: [{ label: 'Consultation', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }, { label: 'Vasthu', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }],
    desc: 'Harmonise the energy flow of your home or office with Shruthi\'s Vasthu Shastra consultation — aligning your space with natural forces for health, prosperity, and lasting peace.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E0A38 0%,#3A1860 55%,#0E0520 100%)',
    heroSvg: svgConsultation('#C8A8E8'),
  },
  {
    slug: 'psychic-consultation',
    name: 'Psychic Consultation',
    category: 'consultation',
    practitioner: HEMA,
    duration: 'As needed',
    pricePaise: 50000,
    tags: [{ label: 'Consultation', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'Psychic', cls: 'bg-[#FAEAE4] text-[#6B2818]' }],
    desc: 'Hemavathi offers direct intuitive guidance on your most pressing life questions — relationships, career, timing, and important decisions — through pure psychic perception.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#2A1808 0%,#5A3010 55%,#1A0C04 100%)',
    heroSvg: svgConsultation('#E8A020'),
  },
  {
    slug: 'akashic-consultation',
    name: 'Akashic Consultation',
    category: 'consultation',
    practitioner: HEMA,
    duration: 'As needed',
    pricePaise: 150000,
    tags: [{ label: 'Consultation', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'Akashic', cls: 'bg-[#E4F4F6] text-[#1A4A52]' }],
    desc: 'A focused Akashic Records consultation with Hemavathi — accessing specific guidance from your soul\'s energetic record to bring clarity on pressing life questions.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#0E1A2A 0%,#1A3040 55%,#080E18 100%)',
    heroSvg: svgConsultation('#80C8D8'),
  },

  // ═══════════════════════════════════════════════
  // READINGS
  // ═══════════════════════════════════════════════
  {
    slug: 'akashic-readings',
    name: 'Akashic Readings',
    category: 'reading',
    practitioner: HEMA,
    duration: '45 min',
    pricePaise: 510000,
    tags: [{ label: 'Akashic', cls: 'bg-[#E4F4F6] text-[#1A4A52]' }, { label: 'Soul Reading', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }],
    desc: 'Akashic Reading is a spiritual practice believed to be an energetic record of the soul\'s past, present, and future — accessed intuitively by Hemavathi as a certified Akashic reader.',
    badge: 'Premium', badgeColor: '#1A6052',
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#0E1A38 0%,#1A3060 55%,#080E20 100%)',
    heroSvg: svgReading('#80A8E8'),
    featured: true,
  },
  {
    slug: 'tarot-reading',
    name: 'Tarot Reading',
    category: 'reading',
    practitioner: SHRU,
    duration: '45 min',
    pricePaise: 240000,
    tags: [{ label: 'Tarot', cls: 'bg-[#F0EBF8] text-[#3D2460]' }, { label: 'Guidance', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }],
    desc: 'Shruthi\'s intuitive Tarot readings illuminate your path, reveal hidden patterns, and offer clarity on love, career, purpose, and the year ahead. Grounded, compassionate, and deeply accurate.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E0A38 0%,#3A1860 55%,#0E0520 100%)',
    heroSvg: svgReading('#C8A8E8'),
  },

  // ═══════════════════════════════════════════════
  // HEALINGS / COUNSELLINGS
  // ═══════════════════════════════════════════════
  {
    slug: 'theta-healing',
    name: 'Theta Healing',
    category: 'healing',
    practitioner: HEMA,
    duration: '45 min',
    pricePaise: null,
    tags: [{ label: 'Healing', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'Theta State', cls: 'bg-[#F0EBF8] text-[#3D2460]' }],
    desc: 'Hemavathi guides you into the theta brainwave state to identify and permanently release the limiting beliefs, fears, and inherited patterns holding you back from living your fullest life.',
    badge: 'Most booked', badgeColor: '#C4780A',
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#3D2010 0%,#6B3A18 55%,#2C1408 100%)',
    heroSvg: svgHealing('#E8A020'),
    featured: true,
  },
  {
    slug: 'manifestation-session',
    name: 'Manifestation Session',
    category: 'healing',
    practitioner: HEMA,
    duration: '30 min',
    pricePaise: null,
    tags: [{ label: 'Manifestation', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }, { label: 'Abundance', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }],
    desc: 'Clear financial, career, and abundance blocks using Hemavathi\'s sacred blend of Theta Healing and manifestation codes. Most clients report tangible shifts within 10 days.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#1A3028 0%,#2A5038 55%,#0E2018 100%)',
    heroSvg: svgHealing('#5DC48A'),
  },
  {
    slug: 'reiki-healing-hemavathi',
    name: 'Reiki Healing',
    category: 'healing',
    practitioner: HEMA,
    duration: '45 min',
    pricePaise: null,
    tags: [{ label: 'Reiki', cls: 'bg-[#E4F4F6] text-[#1A4A52]' }, { label: 'Energy Healing', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }],
    desc: 'Universal life force energy is channelled through Hemavathi to clear energy blockages, promote deep healing, and restore balance across the physical, emotional, and spiritual body.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#0E2A2A 0%,#1A4040 55%,#081818 100%)',
    heroSvg: svgHealing('#80E8D0'),
  },
  {
    slug: 'reiki-healing-shruthi',
    name: 'Reiki Healing',
    category: 'healing',
    practitioner: SHRU,
    duration: '45 min',
    pricePaise: null,
    tags: [{ label: 'Reiki', cls: 'bg-[#F0EBF8] text-[#3D2460]' }, { label: 'Energy Healing', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }],
    desc: 'Universal life force energy is channelled through Shruthi to clear energy blockages, promote deep healing, and restore balance across the physical, emotional, and spiritual body.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E0A38 0%,#2A1858 55%,#0E0520 100%)',
    heroSvg: svgHealing('#C8A8E8'),
  },
  {
    slug: 'eft-healing',
    name: 'EFT (Emotional Freedom Technique)',
    category: 'healing',
    practitioner: SHRU,
    duration: '30 min',
    pricePaise: null,
    tags: [{ label: 'EFT', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }, { label: 'Tapping', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }],
    desc: 'EFT tapping combines ancient acupressure with modern psychology to rapidly release emotional blocks, anxiety, and trauma held in the body. Gentle, effective, and deeply liberating.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E1038 0%,#381A60 55%,#0E0820 100%)',
    heroSvg: svgHealing('#A8C8E8'),
  },
  {
    slug: 'chakra-healing-hemavathi',
    name: 'Chakra Healing',
    category: 'healing',
    practitioner: HEMA,
    duration: '30 min',
    pricePaise: null,
    tags: [{ label: 'Chakra', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'Energy Work', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }],
    desc: 'A systematic clearing and balancing of all seven chakras with Hemavathi to restore energetic alignment, emotional stability, and physical vitality. Includes targeted energy work on blocked centres.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#2A1808 0%,#502818 55%,#180C04 100%)',
    heroSvg: svgHealing('#E8A820'),
  },
  {
    slug: 'chakra-healing-shruthi',
    name: 'Chakra Healing',
    category: 'healing',
    practitioner: SHRU,
    duration: '30 min',
    pricePaise: null,
    tags: [{ label: 'Chakra', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }, { label: 'Energy Work', cls: 'bg-[#E4F4F6] text-[#1A4A52]' }],
    desc: 'A systematic clearing and balancing of all seven chakras with Shruthi to restore energetic alignment, emotional stability, and physical vitality. Includes targeted energy work on blocked centres.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E0A38 0%,#3A1860 55%,#0E0520 100%)',
    heroSvg: svgHealing('#C8A8E8'),
  },
  {
    slug: 'lama-fera',
    name: 'Lama Fera',
    category: 'healing',
    practitioner: SHRU,
    duration: '30 min',
    pricePaise: null,
    tags: [{ label: 'Lama Fera', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }, { label: 'Tibetan Healing', cls: 'bg-[#E4F4F6] text-[#1A4A52]' }],
    desc: 'A powerful Tibetan Buddhist healing technique that works directly with the energy field to clear karmic blocks, negative patterns, and entities — bringing profound peace and lightness.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#100A28 0%,#201848 55%,#080510 100%)',
    heroSvg: svgHealing('#B8A0D8'),
  },

  // ═══════════════════════════════════════════════
  // COURSES
  // ═══════════════════════════════════════════════
  {
    slug: 'akashic-reading-course',
    name: 'Akashic Reading Course',
    category: 'course',
    practitioner: HEMA,
    duration: '10 days',
    pricePaise: 1500000,
    tags: [{ label: 'Course', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'Certification', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }],
    desc: 'Hemavathi\'s 10-day certification course in Akashic Records reading. Learn to open the Records, access soul information, and offer transformative guidance to others. Certificate upon completion.',
    badge: 'Certification', badgeColor: '#3D6B4F',
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#0E1A38 0%,#1A3058 55%,#080E20 100%)',
    heroSvg: svgCourse('#80A8E8'),
  },
  {
    slug: 'tarot-reading-course',
    name: 'Tarot Reading Course',
    category: 'course',
    practitioner: SHRU,
    duration: '15 days',
    pricePaise: 1500000,
    tags: [{ label: 'Course', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }, { label: 'Certification', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }],
    desc: 'Shruthi\'s 15-day Tarot certification program for beginners to advanced learners. Master card meanings, spreads, intuitive reading, and client guidance skills. Certificate upon completion.',
    badge: 'Certification', badgeColor: '#3D6B4F',
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E0A38 0%,#3A1860 55%,#0E0520 100%)',
    heroSvg: svgCourse('#C8A8E8'),
  },
  {
    slug: 'eft-course',
    name: 'EFT Course',
    category: 'course',
    practitioner: HEMA,
    duration: '10 days',
    pricePaise: null,
    tags: [{ label: 'Course', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'EFT', cls: 'bg-[#E4F2EB] text-[#1A3D25]' }],
    desc: '10-day EFT certification training with Hemavathi. Learn the complete tapping protocol for self-healing and client sessions, including trauma-informed approaches and advanced sequences.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#2A1808 0%,#503020 55%,#1A0C04 100%)',
    heroSvg: svgCourse('#E8A820'),
  },
  {
    slug: 'chakra-healing-course',
    name: 'Chakra Healing Course',
    category: 'course',
    practitioner: HEMA,
    duration: '10 days',
    pricePaise: null,
    tags: [{ label: 'Course', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }, { label: 'Chakra', cls: 'bg-[#E4F4F6] text-[#1A4A52]' }],
    desc: 'A 10-day comprehensive training in chakra anatomy, energy assessment, and hands-on healing techniques. Emerge as a certified chakra healer with practical skills for self and client work.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#C4780A] hover:bg-[#A86008]',
    heroGrad: 'linear-gradient(140deg,#0E2018 0%,#1A3828 55%,#081008 100%)',
    heroSvg: svgCourse('#80D8B0'),
  },
  {
    slug: 'numerology',
    name: 'Numerology',
    category: 'course',
    practitioner: SHRU,
    duration: '15 days',
    pricePaise: 666600,
    tags: [{ label: 'Course', cls: 'bg-[#F3EBF8] text-[#6A3D8A]' }, { label: 'Numerology', cls: 'bg-[#FDF0D8] text-[#7A4A04]' }],
    desc: 'Shruthi\'s 15-day numerology course reveals the sacred mathematics of your life path, destiny, and soul expression. Learn to decode names and birth dates for yourself and others.',
    badge: null, badgeColor: null,
    bookBtnCls: 'bg-[#6A3D8A] hover:bg-[#4A2A6A]',
    heroGrad: 'linear-gradient(140deg,#1E0A38 0%,#3A1860 55%,#0E0520 100%)',
    heroSvg: svgCourse('#C8A8E8'),
  },

  // ═══════════════════════════════════════════════
  // SADHANAS  (all Hemavathi · 10 days · On Request)
  // ═══════════════════════════════════════════════
  ...(
    [
      { slug: 'kamakhya-kalpa-sadhana', name: 'Kamakhya Kalpa Sadhana', desc: 'A 10-day sacred practice invoking the goddess Kamakhya — the supreme power of desire, creation, and transformation — through mantra, ritual, and deep meditative intention.' },
      { slug: 'varahi-sadhana',         name: 'Varahi Sadhana',         desc: 'A 10-day devotional practice dedicated to Goddess Varahi, the fierce protector who removes obstacles, neutralises enemies, and bestows courage and material well-being.' },
      { slug: 'baghlamukhi-sadhana',    name: 'Baghlamukhi Sadhana',    desc: 'A 10-day sadhana to Goddess Baghlamukhi, the paralyser of negative forces. Grants power to overcome opposition, legal matters, and adversarial energies.' },
      { slug: 'dakshina-kali-sadhana',  name: 'Dakshina Kali Sadhana',  desc: 'A 10-day practice dedicated to Dakshina Kali — the benevolent form of Kali who destroys ego and illusion, and bestows liberation, fearlessness, and divine grace.' },
      { slug: 'arunachaleswara-sadhana',name: 'Arunachaleswara Sadhana',desc: 'A 10-day sadhana connecting with the divine energy of Arunachaleswara — the fire manifestation of Lord Shiva at Tiruvannamalai — for deep purification and awakening.' },
      { slug: 'tarathmika-sadhana',     name: 'Tarathmika Sadhana',     desc: 'A 10-day practice dedicated to Goddess Tara, the saviour and guide across the ocean of existence. Cultivates wisdom, compassion, and swift liberation from suffering.' },
      { slug: 'hanuman-sadhana',        name: 'Hanuman Sadhana',        desc: 'A 10-day devotional practice to Lord Hanuman, the embodiment of strength, devotion, and divine service. Removes obstacles, bestows courage, and deepens spiritual practice.' },
      { slug: 'ashta-lakshmi-sadhana',  name: 'Ashta Lakshmi Sadhana',  desc: 'A 10-day invocation of the eight forms of Goddess Lakshmi — covering wealth, health, strength, courage, victory, learning, family, and abundance in all dimensions of life.' },
      { slug: 'navakali-sadhana',       name: 'Navakali Sadhana',       desc: 'A 10-day practice invoking the nine forms of Goddess Kali — representing the complete spectrum of transformation, protection, and liberation through the divine feminine.' },
    ] as const
  ).map(s => ({
    ...s,
    category: 'sadhana' as const,
    practitioner: HEMA,
    duration: '10 days',
    pricePaise: null as null,
    tags: [
      { label: 'Sadhana', cls: 'bg-[#FAEAE4] text-[#6B2818]' },
      { label: '10 Days',  cls: 'bg-[#FDF0D8] text-[#7A4A04]' },
    ],
    badge: null as null,
    badgeColor: null as null,
    bookBtnCls: 'bg-[#B85A3C] hover:bg-[#8B3A28]',
    heroGrad: 'linear-gradient(140deg,#2A0808 0%,#501018 55%,#1A0408 100%)',
    heroSvg: svgSadhana('#E080A0'),
  })),
]

const categories = [
  { id: 'all',          label: 'All services' },
  { id: 'consultation', label: '∞ Consultation' },
  { id: 'reading',      label: '◆ Readings' },
  { id: 'healing',      label: '✦ Healings' },
  { id: 'course',       label: '☽ Courses' },
  { id: 'sadhana',      label: '🕉 Sadhanas' },
]

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory)

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-pagebg border-b border-brand-border px-6 md:px-11 pt-10 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow">✦ PranaTatva Offerings</div>
          <h1 className="font-display text-4xl font-medium text-brand-heading mb-2">All Healing Services</h1>
          <p className="text-sm text-brand-body max-w-xl leading-relaxed mb-0">
            Explore 1:1 healing sessions, manifestation coaching, spiritual trainings, Tarot readings, courses, and sacred Sadhanas — held in sacred space by our gifted practitioners.
          </p>
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 py-5 items-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full border text-[12.5px] transition-all whitespace-nowrap
                  ${activeCategory === cat.id
                    ? 'bg-brand-violet border-brand-violet text-white font-medium'
                    : 'bg-transparent border-brand-border-md text-brand-body hover:border-brand-violet hover:text-brand-violet'
                  }`}
              >
                {cat.label}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              <button className="text-[12px] text-brand-sage border border-brand-border rounded-full px-3.5 py-1.5 bg-white">
                Hemavathi ▾
              </button>
              <button className="text-[12px] text-brand-sage border border-brand-border rounded-full px-3.5 py-1.5 bg-white">
                Shruthi ▾
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-11 py-9">
        {/* AI Banner */}
        <div className="bg-gradient-to-r from-brand-sec-bg to-[#FDF0D8] border border-brand-secondary/20 rounded-2xl p-5 mb-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-brand-secondary/15 border border-brand-secondary/30 flex items-center justify-center text-xl flex-shrink-0">✦</div>
            <div>
              <div className="text-[15px] font-medium text-brand-heading">Not sure where to begin your inner healing journey?</div>
              <div className="text-[12px] text-brand-sage mt-0.5">Answer 5 gentle questions — our AI guides you to the perfect service and practitioner for where your soul is right now.</div>
            </div>
          </div>
          <a href="/ai-recommender" className="flex-shrink-0 px-5 py-2.5 rounded-full bg-brand-violet text-white text-[13px] font-medium hover:bg-brand-purple transition-colors whitespace-nowrap">
            Find my healing path →
          </a>
        </div>

        {/* Results bar */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[13px] text-brand-sage">
            Showing {filtered.length} service{filtered.length !== 1 ? 's' : ''} · 2 practitioners
          </span>
        </div>

        {/* Card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => {
            const isOnRequest = s.pricePaise === null
            const bookHref = isOnRequest
              ? `/contact?service=${s.slug}`
              : `/book?service=${s.slug}`

            return (
              <div
                key={s.slug}
                className={`bg-white border rounded-[18px] overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg group
                  ${s.featured ? 'border-2 border-brand-violet' : 'border border-brand-border'}`}
              >
                {/* Hero image */}
                <div className="h-[188px] relative flex items-center justify-center overflow-hidden" style={{ background: s.heroGrad }}>
                  {s.badge && (
                    <div
                      className="absolute top-3 left-3 text-white text-[9px] font-medium uppercase tracking-wide px-2.5 py-1 rounded"
                      style={{ background: s.badgeColor ?? '#C4780A' }}
                    >
                      {s.badge}
                    </div>
                  )}
                  {s.heroSvg}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 bg-black/65 rounded-full px-2.5 py-1">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0"
                        style={{ background: s.practitioner.color }}
                      >
                        {s.practitioner.initial}
                      </div>
                      <span className="text-[11px] text-white/90">{s.practitioner.name}</span>
                    </div>
                    <div className="bg-black/65 rounded-full px-2.5 py-1 text-[11px] text-white/88">
                      {s.duration}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-[18px]">
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    {s.tags.map(t => (
                      <span key={t.label} className={`text-[9px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded ${t.cls}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display text-[18px] text-brand-heading mb-1.5 leading-snug">{s.name}</h2>
                  <p className="text-[12.5px] text-brand-body leading-relaxed mb-3.5">{s.desc}</p>

                  <div className="flex justify-between items-center border-t border-brand-border pt-3">
                    <div className="font-display text-[20px] text-brand-violet">
                      {priceLabel(s.pricePaise)}
                      {s.pricePaise !== null && s.pricePaise > 0 && (
                        <small className="font-sans text-[11px] font-normal text-brand-sage"> / session</small>
                      )}
                    </div>
                    <a
                      href={bookHref}
                      className={`px-5 py-2 rounded-full text-white text-[12.5px] font-medium transition-colors ${s.bookBtnCls}`}
                    >
                      {isOnRequest ? 'Enquire' : s.pricePaise === 0 ? 'Book free' : 'Book now'}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legal disclaimer */}
        <p className="mt-12 text-xs text-brand-sage text-center max-w-xl mx-auto">
          All sessions are complementary wellness services and are not a substitute for licensed medical, psychological, or psychiatric care. Please consult a qualified healthcare professional for any medical concerns.
        </p>
      </div>
    </div>
  )
}
