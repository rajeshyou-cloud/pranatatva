'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Shield, Lock, CheckCircle2 } from 'lucide-react'
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

  const isFree = data.pricePaise === 0

  async function handlePayment() {
    setLoading(true)
    setError(null)

    try {
      // Step 1: Create booking (+ Razorpay order in production)
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}))
        throw new Error(msg || 'Could not create booking. Please try again.')
      }

      const { orderId, bookingRef, keyId, demo } = await res.json()

      // Demo mode or free booking — skip Razorpay
      if (demo || isFree || !keyId || orderId === 'demo' || orderId === 'free') {
        router.push(`/booking/confirmation?ref=${bookingRef}`)
        return
      }

      // Step 2: Load Razorpay SDK
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Razorpay SDK failed to load.'))
          document.head.appendChild(script)
        })
      }

      // Step 3: Open Razorpay checkout
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
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          // Step 4: Verify payment on server
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
    <div className="max-w-md mx-auto text-center space-y-6">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
        style={{ background: 'rgba(196,120,10,0.1)' }}>
        {isFree
          ? <CheckCircle2 style={{ width: 28, height: 28, color: '#3D6B4F' }} />
          : <Lock style={{ width: 28, height: 28, color: '#C4780A' }} />
        }
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold" style={{ color: '#1A0C04' }}>
          {isFree ? 'Confirm Your Free Session' : 'Secure Payment'}
        </h2>
        <p className="text-sm mt-1" style={{ color: '#7A5540' }}>
          {isFree
            ? 'No payment needed — confirm to secure your slot.'
            : <>Complete your booking for <strong>{data.serviceName}</strong></>
          }
        </p>
      </div>

      {/* Amount box */}
      <div className="rounded-2xl p-5" style={{ background: 'rgba(196,120,10,0.06)', border: '1px solid rgba(196,120,10,0.15)' }}>
        <p className="text-sm mb-1" style={{ color: '#9C7A60' }}>
          {isFree ? 'Session cost' : 'Total amount'}
        </p>
        <p className="font-display text-4xl font-bold" style={{ color: '#C4780A' }}>
          {isFree ? 'Free' : formatINR(data.pricePaise)}
        </p>
        {!isFree && <p className="text-xs mt-1" style={{ color: '#9C7A60' }}>Incl. GST</p>}
      </div>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#9C7A60' }}>
        <Shield style={{ width: 14, height: 14, color: '#5A8A6A' }} />
        {isFree
          ? 'Your booking is held for 24 hours — no card required.'
          : 'Secured by Razorpay — UPI, Cards, Net Banking, Wallets'
        }
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-4 rounded-full text-base font-semibold transition-colors disabled:opacity-60"
        style={{ background: isFree ? '#3D6B4F' : '#D4AD25', color: isFree ? 'white' : '#1A0C04' }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" />
            {isFree ? 'Confirming…' : 'Opening Payment…'}
          </span>
        ) : isFree ? (
          'Confirm Free Booking'
        ) : (
          `Pay ${formatINR(data.pricePaise)}`
        )}
      </button>

      <p className="text-xs" style={{ color: '#9C7A60' }}>
        {isFree
          ? `A confirmation will be sent to ${data.clientEmail}`
          : `A GST-compliant invoice will be emailed to ${data.clientEmail} after payment.`
        }
      </p>
    </div>
  )
}
