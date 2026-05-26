'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AccessPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FBF7F0 0%, #F0E6D3 60%, #EAD9BE 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid rgba(196,120,10,0.15)',
        padding: '3rem 2.5rem',
        boxShadow: '0 8px 48px rgba(196,120,10,0.1)',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.6rem' }}>
          <Image src="/Logo.png" alt="PranaTatva" width={72} height={66} style={{ objectFit: 'contain' }} priority />
        </div>

        <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem', color: '#1A0C04', fontWeight: 500, marginBottom: '0.4rem' }}>
          Prana<span style={{ color: '#C4780A' }}>Tatva</span>
        </div>
        <p style={{ fontSize: '11px', color: '#9C7A60', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2.4rem' }}>
          Private Preview
        </p>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(196,120,10,0.25), transparent)', marginBottom: '2rem' }} />

        <p style={{ fontSize: '13.5px', color: '#5C3D28', lineHeight: 1.7, marginBottom: '2rem' }}>
          This site is currently in private preview.<br />Enter the access password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: `1.5px solid ${error ? '#E05C5C' : 'rgba(196,120,10,0.25)'}`,
              background: '#FBF7F0',
              fontSize: '14px',
              color: '#1A0C04',
              outline: 'none',
              marginBottom: '0.8rem',
              boxSizing: 'border-box',
            }}
          />

          {error && (
            <p style={{ fontSize: '12px', color: '#C0392B', marginBottom: '0.8rem', textAlign: 'left' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '100px',
              background: loading || !password ? 'rgba(196,120,10,0.4)' : '#1A0C04',
              color: '#F5EFE4',
              fontSize: '13.5px',
              fontWeight: 600,
              border: 'none',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Verifying…' : 'Enter Site'}
          </button>
        </form>

        <p style={{ fontSize: '10.5px', color: '#C4A882', marginTop: '2rem', lineHeight: 1.6 }}>
          PranaTatva — Spiritual Wellness · India<br />
          <span style={{ opacity: 0.6 }}>Pre-launch preview · Not for public distribution</span>
        </p>
      </div>
    </div>
  )
}
