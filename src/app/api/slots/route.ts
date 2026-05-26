import { NextRequest, NextResponse } from 'next/server'

// ── Demo mode only (no Supabase URL configured) ───────────────
// Hemavathi: Mon/Wed/Fri/Sat  |  Shruthi: Tue/Thu/Sat/Sun
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

function isBookedForDate(dateStr: string, time: string): boolean {
  const hash = [...(dateStr + time)].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return hash % 7 === 0
}

function staticSlots(practitionerId: string, dateStr: string) {
  const date = new Date(dateStr)
  const dayOfWeek = date.getUTCDay()
  const workDays = SCHEDULE[practitionerId] ?? SCHEDULE['hema']
  if (!workDays.includes(dayOfWeek)) return []
  return TIMES
    .filter(t => !isBookedForDate(dateStr, t))
    .map((t, i) => ({
      id: `${practitionerId}-${dateStr}-${i}`,
      start_time: t,
      end_time: endTime(t),
      is_available: true,
    }))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const practitioner_id = searchParams.get('practitioner_id')
  const date = searchParams.get('date')

  if (!practitioner_id || !date) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  // Demo mode — no Supabase configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ slots: staticSlots(practitioner_id, date) })
  }

  // Production — Supabase only, no silent fallback
  try {
    const { createAdminSupabase } = await import('@/lib/supabase/admin')
    const supabase = createAdminSupabase()

    const { data: prac, error: pracErr } = await supabase
      .from('practitioners')
      .select('id')
      .eq('slug', practitioner_id)
      .single()

    if (pracErr || !prac) {
      return NextResponse.json({ error: 'Practitioner not found.' }, { status: 404 })
    }

    const { data: slots, error } = await supabase
      .from('availability_slots')
      .select('id, start_time, end_time, is_available')
      .eq('practitioner_id', prac.id)
      .eq('date', date)
      .eq('is_available', true)   // booked slots are invisible to all users
      .order('start_time')

    if (error) throw error
    return NextResponse.json({ slots: slots ?? [] })
  } catch (e) {
    console.error('[slots]', e)
    return NextResponse.json({ error: 'Could not load slots. Please try again.' }, { status: 500 })
  }
}
