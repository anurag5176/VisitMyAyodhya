import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/**
 * Browser-safe Supabase client using the anon (publishable) key.
 * Safe to use in the client: RLS ensures leads table only allows INSERT,
 * so users cannot read or modify other submissions.
 * If env vars are missing, operations will fail at runtime (submitLead returns an error).
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
