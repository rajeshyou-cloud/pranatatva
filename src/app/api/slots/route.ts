import { NextRequest, NextResponse } from 'next/server'

interface Slot {
  id: string
  start_time: string
  end_time: string
  is_available: boolean
}

// Hemavathi: Mon/Wed/Fri/Sat  |  Shruthi: Tue/Thu/Sat/Sun
// 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
const SCHEDULE: Record<string, number[]> = {
  hema: [1, 3, 5, 6],
  shru: [0, 2, 4, 6],
}

const TIMES = ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

function endTime(start: string): string {
  const [h, m] = start.split(':').map(Number)
  const end = new Date(0, 0, 0, h + 1, m)
  return `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`
}

// Deterministic "already booked" slots — looks realistic without a DB
function isBookedForDate(dateStr: string, time: string): boolean {
  const hash = [...(dateStr + time)].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return hash % 7 === 0  // ~1 in 7 slots looks booked
}

function staticSlots(practitionerId: string, dateStr: string): Slot[] {
  const date = new Date(dateStr)
  const dayOfWeek = date.getUTCDay() // use UTC to avoid timezone flipping the day

  const workDays = SCHEDULE[practitionerId] ?? SCHEDULE['hema']
  if (!workDays.includes(dayOfWeek)) return []

  return TIMES.map((t, i) => ({
    id: `${practitionerId}-${dateStr}-${i}`,
    start_time: t,
    end_time: endTime(t),
    is_available: !isBookedForDate(dateStr, t),
  }))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const practitioner_id = searchParams.get('practitioner_id')
  const date = searchParams.get('date')

  if (!practitioner_id || !date) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  // Demo mode — no Supabase connected
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ slots: staticSlots(practitioner_id, date) })
  }

  // Production — query Supabase
  try {
    const { createAdminSupabase } = await import('@/lib/supabase/admin')
    const supabase = createAdminSupabase()
    const { data: slots, error } = await supabase
      .from('availability_slots')
      .select('id, start_time, end_time, is_available')
      .eq('practitioner_id', practitioner_id)
      .eq('date', date)
      .order('start_time')

    if (error) throw error
    return NextResponse.json({ slots: slots ?? [] })
  } catch {
    // Supabase misconfigured — fall back to static
    return NextResponse.json({ slots: staticSlots(practitioner_id, date) })
  }
}
