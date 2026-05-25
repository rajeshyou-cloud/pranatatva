import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import AdBanner from '@/components/layout/AdBanner'
import LayoutShell from '@/components/layout/LayoutShell'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'PranaTatva — Inner Healing',
    template: '%s | PranaTatva',
  },
  description:
    'Book 1:1 healing sessions, Theta Healing, Tarot readings, Akashic Records, and manifestation coaching with expert spiritual practitioners across India.',
  keywords: ['spiritual healing', 'theta healing', 'tarot reading', 'akashic records', 'manifestation coaching', 'energy healing India'],
  openGraph: {
    siteName: 'PranaTatva',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          <AdBanner />
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
