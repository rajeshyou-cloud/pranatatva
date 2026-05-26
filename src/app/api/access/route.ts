import { NextResponse } from 'next/server'
import { createHash } from 'crypto'

const SALT = 'pranatatva-gate-v1'

function hashToken(password: string): string {
  return createHash('sha256').update(password + SALT).digest('hex')
}

export async function POST(req: Request) {
  const body = await req.json() as { password?: string }

  const expected = process.env.SITE_PASSWORD
  if (!expected || body.password !== expected) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('pt_gate', hashToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return res
}
