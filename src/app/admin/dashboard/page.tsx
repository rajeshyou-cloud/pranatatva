import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminSupabase } from '@/lib/supabase/admin'
import { formatINR, formatDate } from '@/lib/utils'
import { Calendar, TrendingUp, Users, CheckCircle2, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Dashboard' }

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
  no_show: 'bg-gray-100 text-gray-600',
}

interface BookingRow {
  id: string
  booking_ref: string
  client_name: string
  client_email: string
  status: string
  payment_status: string
  amount_paise: number
  created_at: string
  services: { name: string }[] | null
  practitioners: { name: string }[] | null
}

export default async function AdminDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const admin = createAdminSupabase()
  const { data } = await admin
    .from('bookings')
    .select('id, booking_ref, client_name, client_email, status, payment_status, amount_paise, created_at, services(name), practitioners(name)')
    .order('created_at', { ascending: false })
    .limit(50)

  const allBookings: BookingRow[] = (data ?? []) as unknown as BookingRow[]
  const confirmed = allBookings.filter(b => b.status === 'confirmed' || b.status === 'completed')
  const pending = allBookings.filter(b => b.status === 'pending')
  const totalRevenue = confirmed.reduce((sum, b) => sum + b.amount_paise, 0)

  const stats = [
    { label: 'Total Revenue', value: formatINR(totalRevenue), icon: TrendingUp, color: 'text-brand-violet' },
    { label: 'Confirmed Bookings', value: String(confirmed.length), icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Pending Payment', value: String(pending.length), icon: Clock, color: 'text-yellow-600' },
    { label: 'Total Clients', value: String(new Set(allBookings.map(b => b.client_email)).size), icon: Users, color: 'text-blue-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-charcoal text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold">PranaTatva Admin</h1>
            <p className="text-white/60 text-xs">Bookings Dashboard</p>
          </div>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button className="text-white/70 hover:text-white text-sm">Sign Out</button>
        </form>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">{s.label}</p>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-brand-charcoal">Recent Bookings</h2>
            <a href="/api/admin/export" className="text-sm text-brand-violet hover:underline">
              Export CSV
            </a>
          </div>

          {allBookings.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No bookings yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Ref', 'Client', 'Service', 'Date', 'Amount', 'Status', 'Payment'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allBookings.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-brand-violet font-medium">
                        {b.booking_ref}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-brand-charcoal">{b.client_name}</p>
                        <p className="text-gray-400 text-xs">{b.client_email}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{(b.services as { name: string }[] | null)?.[0]?.name ?? '—'}</td>
                      <td className="px-5 py-4 text-gray-600 text-xs">{formatDate(b.created_at)}</td>
                      <td className="px-5 py-4 font-semibold text-brand-violet">
                        {formatINR(b.amount_paise)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[b.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                          b.payment_status === 'paid' ? 'bg-green-100 text-green-700'
                          : b.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                          {b.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
