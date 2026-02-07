import { supabase } from './client'

/** Allowed lead sources; must match DB constraint. */
export type LeadSource = 'contact' | 'expert_help' | 'booking' | 'quick_planner'

/** Payload shapes per source (for type safety when building payloads). */
export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export type ExpertHelpPayload = {
  name: string
  phone: string
  query: string
  message: string
}

export type BookingPayload = {
  fullName: string
  email: string
  phone: string
  numberOfGuests: string
  visitDate: string
  specialRequests: string
  dietaryPreferences: string
  /** Slugs of attractions selected in the itinerary (order preserved). */
  selectedAttractions: string[]
}

export type QuickPlannerPayload = {
  name: string
  phone: string
  visitDate: string
  numberOfPeople: string
  interestArea: string
}

export type LeadPayload =
  | ContactPayload
  | ExpertHelpPayload
  | BookingPayload
  | QuickPlannerPayload

export interface SubmitLeadResult {
  success: boolean
  error?: string
}

/**
 * Submit a lead to the master leads table.
 * Uses anon key; RLS allows only INSERT, so this is safe from the browser.
 */
export async function submitLead(
  source: LeadSource,
  payload: LeadPayload
): Promise<SubmitLeadResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { success: false, error: 'Supabase is not configured' }
  }

  const { error } = await supabase.from('leads').insert({ source, payload })

  if (error) {
    console.error('[leads] submit error:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}
