'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Lock, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Invalid credentials. Please check your email and password.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-violet to-brand-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-brand-amber" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-white">PranaTatva</h1>
          <p className="text-white/60 text-sm mt-1">Admin Portal</p>
        </div>

        <form onSubmit={handleLogin} className="card space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-brand-violet" />
            <h2 className="font-semibold text-brand-violet">Sign In</h2>
          </div>

          <div>
            <label className="label" htmlFor="email">Email Address</label>
            <input
              id="email" type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@pranatatva.in"
            />
          </div>

          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password" type="password" required
              value={password} onChange={e => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Signing in…</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
