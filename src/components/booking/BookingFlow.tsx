'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import StepServiceSelect, { services } from './StepServiceSelect'
import StepSlotPicker from './StepSlotPicker'
import StepCustomerForm from './StepCustomerForm'
import StepReview from './StepReview'
import StepPayment from './StepPayment'

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

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center mb-10 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-shrink-0">
            <div className={`flex items-center gap-2 ${step >= s.id ? 'text-brand-violet' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors
                ${step > s.id ? 'bg-brand-violet border-brand-violet text-white'
                  : step === s.id ? 'border-brand-violet text-brand-violet'
                  : 'border-gray-300 text-gray-400'}`}
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

      {/* Step panels */}
      {step === 1 && <StepServiceSelect data={data} onNext={next} />}
      {step === 2 && <StepSlotPicker data={data} onNext={next} onBack={back} />}
      {step === 3 && <StepCustomerForm data={data} onNext={next} onBack={back} />}
      {step === 4 && <StepReview data={data as BookingData} onNext={next} onBack={back} />}
      {step === 5 && <StepPayment data={data as BookingData} />}
    </div>
  )
}
