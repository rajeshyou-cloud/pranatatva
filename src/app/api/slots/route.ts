import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const practitioner_id = searchParams.get('practitioner_id')
  const date = searchParams.get('date')

  if (!practitioner_id || !date) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const supabase = createAdminSupabase()
  const { data: slots, error } = await supabase
    .from('availability_slots')
    .select('id, start_time, end_time, is_available')
    .eq('practitioner_id', practitioner_id)
    .eq('date', date)
    .order('start_time')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ slots: slots ?? [] })
}
