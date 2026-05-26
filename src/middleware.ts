import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SALT = 'pranatatva-gate-v1'

async function hashToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + SALT)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow the access page and its API through
  if (pathname.startsWith('/access') || pathname === '/api/access') {
    return NextResponse.next()
  }

  const sitePassword = process.env.SITE_PASSWORD
  // No password configured → site is publicly accessible
  if (!sitePassword) return NextResponse.next()

  const cookieToken = request.cookies.get('pt_gate')?.value
  const expectedToken = await hashToken(sitePassword)

  if (cookieToken !== expectedToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/access'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.webp).*)',
  ],
}
