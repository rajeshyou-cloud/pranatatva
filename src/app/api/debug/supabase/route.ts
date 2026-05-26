import { NextResponse } from 'next/server'

// TEMPORARY DEBUG ENDPOINT — remove after fixing
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !serviceKey) {
    return NextResponse.json({
      error: 'Missing env vars',
      hasUrl: !!url,
      hasServiceKey: !!serviceKey,
      hasAnonKey: !!anonKey,
    })
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, serviceKey)

    const [practitioners, services] = await Promise.all([
      supabase.from('practitioners').select('id, name, slug'),
      supabase.from('services').select('id, name, slug'),
    ])

    return NextResponse.json({
      url: url.slice(0, 40) + '...',
      keyFormat: serviceKey.startsWith('eyJ') ? 'legacy-jwt' : 'new-format',
      practitioners: { data: practitioners.data, error: practitioners.error },
      services: { data: services.data, error: services.error },
    })
  } catch (e) {
    return NextResponse.json({ exception: String(e) })
  }
}
