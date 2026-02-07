'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

type Lead = {
  id: string
  created_at: string
  source: string
  payload: Record<string, unknown>
}

const SOURCE_LABELS: Record<string, string> = {
  contact: 'Contact',
  expert_help: 'Expert Help',
  booking: 'Booking',
  quick_planner: 'Quick Planner',
}

export default function AdminPanelPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [leadsError, setLeadsError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [filterSource, setFilterSource] = useState<string>('')

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!loading) setLoading(false)
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [loading])

  useEffect(() => {
    if (!user) {
      setLeads([])
      return
    }
    setLeadsLoading(true)
    setLeadsError(null)
    supabase
      .from('leads')
      .select('id, created_at, source, payload')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        setLeadsLoading(false)
        if (error) {
          setLeadsError(error.message)
          setLeads([])
          return
        }
        setLeads((data as Lead[]) ?? [])
      })
  }, [user])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setAuthLoading(true)
    const trimEmail = email.trim().toLowerCase()
    const { error } = await supabase.auth.signInWithPassword({ email: trimEmail, password })
    setAuthLoading(false)
    if (error) {
      setAuthError(error.message)
      return
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setLeads([])
  }

  const filteredLeads = filterSource
    ? leads.filter((l) => l.source === filterSource)
    : leads

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1A3A] flex items-center justify-center">
        <p className="text-white/80">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B1A3A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 md:p-8">
          <h1 className="text-xl font-bold text-[#0B1A3A] mb-2">Admin Panel</h1>
          <p className="text-sm text-[#7f8c8d] mb-6">Sign in with your admin email.</p>
          <form onSubmit={handleSignIn} className="space-y-4">
            {authError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{authError}</p>
            )}
            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97B2B]/20 focus:border-[#D97B2B]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D97B2B]/20 focus:border-[#D97B2B]"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <header className="bg-white border-b border-[#e8e6e1] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-bold text-[#0B1A3A]">Leads – Admin Panel</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#7f8c8d] truncate max-w-[180px]" title={user.email}>
              {user.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm font-medium text-[#D97B2B] hover:text-[#c86a1a]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="text-sm font-semibold text-[#0B1A3A]">Filter by source:</label>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-3 py-2 border border-[#e8e6e1] rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D97B2B]/20"
          >
            <option value="">All</option>
            {Object.entries(SOURCE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <span className="text-sm text-[#7f8c8d]">
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
          </span>
        </div>

        {leadsError && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">{leadsError}</p>
        )}

        {leadsLoading ? (
          <p className="text-[#7f8c8d]">Loading leads...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="text-[#7f8c8d]">No leads yet.</p>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white border border-[#e8e6e1] rounded-xl overflow-hidden shadow-sm"
              >
                <div className="px-4 py-3 border-b border-[#e8e6e1] flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold text-[#0B1A3A] uppercase tracking-wide">
                    {SOURCE_LABELS[lead.source] ?? lead.source}
                  </span>
                  <span className="text-xs text-[#7f8c8d]">
                    {new Date(lead.created_at).toLocaleString()}
                  </span>
                  <span className="text-xs text-[#7f8c8d] font-mono">{lead.id}</span>
                </div>
                <div className="p-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                    {typeof lead.payload === 'object' && lead.payload !== null &&
                      Object.entries(lead.payload as Record<string, unknown>).map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-0.5">
                          <dt className="font-medium text-[#0B1A3A] capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                          </dt>
                          <dd className="text-[#7f8c8d] break-words">
                            {Array.isArray(value)
                              ? value.join(', ')
                              : typeof value === 'object' && value !== null
                                ? JSON.stringify(value)
                                : String(value ?? '')}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
