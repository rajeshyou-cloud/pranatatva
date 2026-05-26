'use client'

import { Clock, Calendar, User, Mail, Phone, Shield } from 'lucide-react'
import { formatINR, formatDate, formatTime } from '@/lib/utils'
import type { BookingData } from './BookingFlow'

interface Props {
  data: BookingData
  onNext: (update: Partial<BookingData>) => void
  onBack: () => void
}

export default function StepReview({ data, onNext, onBack }: Props) {
  return (
    <div className="card space-y-6">
      <h2 className="font-display text-2xl font-semibold text-brand-violet">Review Your Booking</h2>

      {/* Session summary */}
      <div className="rounded-xl bg-brand-violet/5 border border-brand-violet/10 p-5 space-y-3">
        <h3 className="font-semibold text-brand-violet">{data.serviceName}</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-violet" />
            {formatDate(data.slotDate)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-violet" />
            {formatTime(data.slotTime)} • {data.duration === 0 ? '8-week program' : `${data.duration} min`}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-brand-violet" />
            with {data.practitionerName}
          </div>
        </div>
      </div>

      {/* Client details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Your Details</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> {data.clientName}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> {data.clientEmail}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" /> {data.clientPhone}
          </div>
        </div>
        {data.clientConcern && (
          <div className="p-3 rounded-lg bg-gray-50 text-sm text-gray-600 italic">
            &ldquo;{data.clientConcern}&rdquo;
          </div>
        )}
      </div>

      {/* Consent confirmation */}
      <div className="flex items-start gap-2 text-xs text-gray-500">
        <Shield className="w-4 h-4 text-brand-sage flex-shrink-0 mt-0.5" />
        <span>
          Your intake consent has been recorded with the current timestamp as required by DPDP Act 2023.
          {data.whatsappOptIn && ' WhatsApp reminders opted in.'}
        </span>
      </div>

      {/* Price */}
      <div className="border-t pt-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total payable</p>
          <p className="text-3xl font-bold text-brand-violet">{formatINR(data.pricePaise)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Incl. GST • Secure Razorpay payment</p>
        </div>
        <div className="text-right text-xs text-gray-400">
          <p>Session video link sent</p>
          <p>via email + WhatsApp</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">Back</button>
        <button onClick={() => onNext({})} className="btn-gold flex-1 text-base py-4">
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
