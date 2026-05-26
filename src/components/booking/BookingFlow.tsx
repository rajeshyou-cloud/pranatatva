'use client'

import { useState } from 'react'
import { CheckCircle2, Clock, Video, Shield, RefreshCw, FileText } from 'lucide-react'
import StepServiceSelect, { services } from './StepServiceSelect'
import StepSlotPicker from './StepSlotPicker'
import StepCustomerForm from './StepCustomerForm'
import StepReview from './StepReview'
import StepPayment from './StepPayment'
import { formatINR } from '@/lib/utils'

export type BookingData = {
  serviceSlug: string
  serviceName: string
  pricePaise: number
  duration: number
  slotId: string
  slotDate: string
  slotTime: string
  practitionerId: string
  practitionerName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientConcern: string
  whatsappOptIn: boolean
  intakeConsent: boolean
}

const steps = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Date & Time' },
  { id: 3, label: 'Your Details' },
  { id: 4, label: 'Review' },
  { id: 5, label: 'Payment' },
]

function ServiceInfoCard({ data }: { data: Partial<BookingData> }) {
  const svc = services.find(s => s.slug === data.serviceSlug)
  if (!svc) return null

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(196,120,10,0.18)', background: '#FFFDF9' }}
    >
      {/* Gradient hero strip */}
      <div
        className="relative flex items-end px-4 pb-4 pt-12"
        style={{ background: svc.heroGrad, minHeight: 110 }}
      >
        {/* Decorative mandala */}
        <svg
          width="90" height="90" viewBox="0 0 90 90" fill="none"
          className="absolute right-3 top-3 opacity-30"
        >
          <circle cx="45" cy="45" r="42" stroke="white" strokeWidth="0.8"/>
          <circle cx="45" cy="45" r="28" stroke="white" strokeWidth="0.8" strokeDasharray="4 4"/>
          <circle cx="45" cy="45" r="14" stroke="white" strokeWidth="0.8"/>
          <circle cx="45" cy="45" r="4" fill="white" opacity="0.6"/>
        </svg>

        {/* Practitioner badge */}
        <div className="flex items-center gap-2 bg-black/50 rounded-full px-2.5 py-1.5 backdrop-blur-sm">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
            style={{ background: svc.pracColor }}
          >
            {svc.pracInitial}
          </div>
          <span className="text-[12px] text-white/90 font-medium">{svc.practitionerName}</span>
        </div>
      </div>

      {/* Service info */}
      <div className="px-4 py-4 space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#9C7A60' }}>
            {svc.category}
          </div>
          <h3 className="font-display text-[17px] leading-snug" style={{ color: '#1A0C04' }}>
            {svc.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-[22px]" style={{ color: '#C4780A' }}>
            {svc.pricePaise === 0 ? 'Free' : formatINR(svc.pricePaise)}
          </span>
          {svc.pricePaise > 0 && (
            <span className="text-[11px]" style={{ color: '#9C7A60' }}>per session</span>
          )}
        </div>

        {/* Session details */}
        <div className="space-y-2 pt-1 border-t" style={{ borderColor: 'rgba(196,120,10,0.1)' }}>
          {[
            {
              icon: Clock,
              label: 'Duration',
              value: svc.duration === 0 ? '8-week program' : `${svc.duration} minutes`,
            },
            { icon: Video, label: 'Format', value: 'Video call (Zoom)' },
            {
              icon: Shield,
              label: 'Payment',
              value: svc.pricePaise === 0 ? 'No payment needed' : 'Secure · Razorpay',
            },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1.5" style={{ color: '#9C7A60' }}>
                <row.icon style={{ width: 12, height: 12 }} /> {row.label}
              </span>
              <span style={{ color: '#3D2010' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div
          className="rounded-xl px-3 py-2.5 space-y-1.5"
          style={{ background: 'rgba(196,120,10,0.05)', border: '1px solid rgba(196,120,10,0.1)' }}
        >
          {[
            { icon: FileText, text: 'GST invoice emailed on payment' },
            { icon: RefreshCw, text: 'Free reschedule up to 24h before' },
            { icon: Shield,    text: 'DPDP Act 2023 compliant' },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-2 text-[11px]" style={{ color: '#7A5540' }}>
              <b.icon style={{ width: 11, height: 11, flexShrink: 0, color: '#C4780A' }} />
              {b.text}
            </div>
          ))}
        </div>

        {/* Help link */}
        <p className="text-[11px] text-center pt-1" style={{ color: '#9C7A60' }}>
          Questions?{' '}
          <a href="/contact" style={{ color: '#C4780A', textDecoration: 'underline' }}>
            Chat with us →
          </a>
        </p>
      </div>
    </div>
  )
}

export default function BookingFlow({ initialService }: { initialService?: string }) {
  const svc = initialService ? services.find(s => s.slug === initialService) : undefined
  const [step, setStep] = useState(svc ? 2 : 1)
  const [data, setData] = useState<Partial<BookingData>>(
    svc ? {
      serviceSlug: svc.slug,
      serviceName: svc.name,
      pricePaise: svc.pricePaise,
      duration: svc.duration,
      practitionerId: svc.practitionerId,
      practitionerName: svc.practitionerName,
    } : {}
  )

  function next(update: Partial<BookingData>) {
    setData(prev => ({ ...prev, ...update }))
    setStep(s => s + 1)
  }

  function back() {
    setStep(s => s - 1)
  }

  const showInfoPanel = step >= 2 && !!data.serviceSlug

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center mb-10 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-shrink-0">
            <div className={`flex items-center gap-2 ${step >= s.id ? 'text-brand-violet' : 'text-gray-400'}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors
                  ${step > s.id
                    ? 'bg-brand-violet border-brand-violet text-white'
                    : step === s.id
                      ? 'border-brand-violet text-brand-violet'
                      : 'border-gray-300 text-gray-400'
                  }`}
              >
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-8 sm:w-16 mx-2 transition-colors ${step > s.id ? 'bg-brand-violet' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Two-column layout: step content + service info panel */}
      <div className={`flex gap-8 items-start ${showInfoPanel ? 'lg:grid lg:grid-cols-[1fr_280px]' : ''}`}>
        {/* Step panels */}
        <div className="min-w-0 flex-1">
          {step === 1 && <StepServiceSelect data={data} onNext={next} />}
          {step === 2 && <StepSlotPicker data={data} onNext={next} onBack={back} />}
          {step === 3 && <StepCustomerForm data={data} onNext={next} onBack={back} />}
          {step === 4 && <StepReview data={data as BookingData} onNext={next} onBack={back} />}
          {step === 5 && <StepPayment data={data as BookingData} />}
        </div>

        {/* Service info panel — steps 2–5, desktop only */}
        {showInfoPanel && (
          <div className="hidden lg:block flex-shrink-0 sticky top-[120px]">
            <ServiceInfoCard data={data} />
          </div>
        )}
      </div>
    </div>
  )
}
