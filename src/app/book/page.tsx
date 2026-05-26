import type { Metadata } from 'next'
import BookingFlow from '@/components/booking/BookingFlow'

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Choose your slot and book a healing session with PranaTatva.',
}

export default function BookPage({ searchParams }: { searchParams: { service?: string } }) {
  return (
    <section className="py-16 bg-brand-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold text-brand-violet mb-2">
          Book a Session
        </h1>
        <p className="text-gray-500 mb-10">
          Complete the steps below to secure your slot. Payment is collected after you confirm the details.
        </p>
        <BookingFlow initialService={searchParams.service} />
      </div>
    </section>
  )
}
