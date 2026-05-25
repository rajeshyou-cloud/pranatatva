'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Shield, Lock } from 'lucide-react'
import { formatINR } from '@/lib/utils'
import type { BookingData } from './BookingFlow'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

interface Props {
  data: BookingData
}

export default function StepPayment({ data }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePayment() {
    setLoading(true)
    setError(null)

    try {
      // 1. Create booking + Razorpay order
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const { orderId, bookingRef, keyId } = await res.json()
      if (!orderId) throw new Error('Could not create order.')

      // 2. Load Razorpay SDK if not already loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Razorpay SDK failed to load'))
          document.head.appendChild(script)
        })
      }

      // 3. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: keyId,
        amount: data.pricePaise,
        currency: 'INR',
        name: 'PranaTatva',
        description: data.serviceName,
        order_id: orderId,
        prefill: {
          name: data.clientName,
          email: data.clientEmail,
          contact: data.clientPhone,
        },
        theme: { color: '#C4780A' },
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          // 4. Verify payment on server
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, bookingRef }),
          })
          if (verifyRes.ok) {
            router.push(`/booking/confirmation?ref=${bookingRef}`)
          } else {
            setError('Payment verification failed. Please contact support.')
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      })
      rzp.open()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="card max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-brand-violet/10 flex items-center justify-center mx-auto">
        <Lock className="w-7 h-7 text-brand-violet" />
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-brand-violet">Secure Payment</h2>
        <p className="text-gray-500 text-sm mt-1">Complete your booking for <strong>{data.serviceName}</strong></p>
      </div>

      <div className="rounded-xl bg-brand-violet/5 p-5">
        <p className="text-sm text-gray-500">Total Amount</p>
        <p className="text-4xl font-bold text-brand-violet mt-1">{formatINR(data.pricePaise)}</p>
        <p className="text-xs text-gray-400 mt-1">Incl. GST</p>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <Shield className="w-4 h-4 text-brand-sage" />
        Secured by Razorpay — UPI, Cards, Net Banking, Wallets accepted
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn-gold w-full text-base py-4 disabled:opacity-60"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Opening Payment…</>
        ) : (
          `Pay ${formatINR(data.pricePaise)}`
        )}
      </button>

      <p className="text-xs text-gray-400">
        A GST-compliant invoice will be emailed to {data.clientEmail} after payment.
      </p>
    </div>
  )
}
