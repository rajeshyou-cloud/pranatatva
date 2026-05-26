'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import {
  format, addMonths, subMonths, startOfMonth, endOfMonth,
  eachDayOfInterval, getDay, isBefore, startOfDay, isToday,
  addDays, isSameDay,
} from 'date-fns'
import { cn, formatTime } from '@/lib/utils'
import type { BookingData } from './BookingFlow'

interface Slot {
  id: string
  start_time: string
  end_time: string
  is_available: boolean
}

interface Props {
  data: Partial<BookingData>
  onNext: (update: Partial<BookingData>) => void
  onBack: () => void
}

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function StepSlotPicker({ data, onNext, onBack }: Props) {
  const today = startOfDay(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(today, 1))
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(false)
  const [slotError, setSlotError] = useState<string | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const leadingBlanks = getDay(monthStart) // 0=Sun

  useEffect(() => {
    if (!selectedDate || !data.practitionerId) return
    setLoading(true)
    setSelectedSlot(null)
    setSlotError(null)
    fetch(`/api/slots?practitioner_id=${data.practitionerId}&date=${format(selectedDate, 'yyyy-MM-dd')}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setSlotError(d.error); setSlots([]) }
        else setSlots(d.slots ?? [])
      })
      .catch(() => setSlotError('Could not load slots. Please try again.'))
      .finally(() => setLoading(false))
  }, [selectedDate, data.practitionerId])

  function handleConfirm() {
    if (!selectedSlot) return
    onNext({
      slotId: selectedSlot.id,
      slotDate: format(selectedDate, 'yyyy-MM-dd'),
      slotTime: selectedSlot.start_time,
    })
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center mb-8">
        {['Date & Time', 'Intake Form', 'Payment'].map((step, idx) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'w-8 h-8 rounded-full border-2 flex items-center justify-center text-[12px]',
                idx === 0
                  ? 'bg-[#FDF0D8] border-brand-violet text-[#7A4A04] font-medium'
                  : 'border-brand-border text-brand-sage bg-white'
              )}>
                {idx === 0 ? '1' : idx + 1}
              </div>
              <div className={cn('text-[10px] mt-0.5', idx === 0 ? 'text-brand-violet font-medium' : 'text-brand-sage')}>
                {step}
              </div>
            </div>
            {idx < 2 && <div className="flex-1 h-0.5 bg-brand-border mx-1 mb-4 min-w-[32px]" />}
          </div>
        ))}
      </div>

      <div className="eyebrow mb-1">Step 1 of 3</div>
      <h2 className="font-display text-[26px] font-medium text-brand-heading mb-1">
        Choose your date &amp; time
      </h2>
      <p className="text-[13px] text-brand-sage mb-8">
        {data.serviceName} · {data.practitionerName ?? 'PranaTatva'} · {data.duration ? `${data.duration} min` : ''}
      </p>

      {/* Calendar */}
      <div className="bg-white border border-brand-border rounded-2xl p-6 mb-6">
        {/* Month nav */}
        <div className="flex justify-between items-center mb-5">
          <span className="font-display text-[18px] text-brand-heading">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(m => subMonths(m, 1))}
              disabled={isBefore(monthStart, today)}
              className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-sage hover:border-brand-violet hover:text-brand-violet disabled:opacity-30 transition-colors"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentMonth(m => addMonths(m, 1))}
              className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-sage hover:border-brand-violet hover:text-brand-violet transition-colors"
            >
              ›
            </button>
          </div>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 text-center mb-2">
          {DAY_LABELS.map(d => (
            <div key={d} className="text-[11px] text-brand-sage font-medium py-1 tracking-wide">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} />
          ))}
          {monthDays.map(day => {
            const isPast = isBefore(day, today)
            const isSelected = isSameDay(day, selectedDate)
            const isTodayDay = isToday(day)
            return (
              <button
                key={day.toISOString()}
                disabled={isPast}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  'h-10 rounded-[9px] flex items-center justify-center text-[13px] transition-all',
                  isPast ? 'text-brand-border cursor-default' : 'hover:bg-[#FDF0D8] hover:text-brand-violet',
                  isSelected && 'bg-brand-violet text-white font-medium hover:bg-brand-violet hover:text-white',
                  isTodayDay && !isSelected && 'border border-brand-violet text-brand-violet',
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-[11px] text-brand-sage">
          <span>● Available</span>
          <span className="opacity-40">● Unavailable</span>
          <span className="text-brand-violet">◆ Today</span>
        </div>
      </div>

      {/* Time slots */}
      <div className="bg-white border border-brand-border rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[14px] font-medium text-brand-heading">
            {data.practitionerName ?? 'Practitioner'}&apos;s available times — {format(selectedDate, 'EEEE d MMMM')}
          </div>
          <div className="text-[12px] text-brand-sage">IST (UTC +5:30)</div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-brand-violet text-sm py-8 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading slots…
          </div>
        ) : slotError ? (
          <p className="text-red-500 text-[13px] py-8 text-center">{slotError}</p>
        ) : slots.length === 0 ? (
          <p className="text-brand-sage text-[13px] py-8 text-center">
            No slots available on this date. Please try another day.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {slots.map(slot => {
              const isSelected = selectedSlot?.id === slot.id
              return (
                <button
                  key={slot.id}
                  disabled={!slot.is_available}
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    'py-3 px-2 rounded-[10px] border text-center text-[13px] transition-all',
                    !slot.is_available
                      ? 'opacity-35 cursor-default border-dashed border-brand-border text-[12px]'
                      : isSelected
                        ? 'border-brand-violet bg-[#FDF0D8] text-[#7A4A04] font-medium'
                        : 'border-brand-border hover:border-brand-violet hover:text-brand-violet hover:bg-[#FDF0D8]'
                  )}
                >
                  <div>{formatTime(slot.start_time)}</div>
                  <div className={cn('text-[10px] mt-0.5', isSelected ? 'text-brand-violet' : 'text-brand-sage')}>
                    {!slot.is_available ? 'Fully booked' : isSelected ? 'Selected ✓' : 'Available'}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border-[1.5px] border-brand-border-dk text-brand-body text-[14px] hover:border-brand-violet hover:text-brand-violet transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedSlot}
          className="flex-1 py-3 rounded-full bg-brand-violet text-white text-[14px] font-medium hover:bg-brand-purple transition-colors disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
