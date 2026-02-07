-- =============================================================================
-- Visit My Ayodhya - Master Leads Table
-- =============================================================================
-- This migration creates a single table for all website form submissions (leads).
-- Use the Supabase anon (publishable) key in the browser; RLS ensures clients
-- can only INSERT, not read or modify existing rows.
-- =============================================================================

-- Master leads table: one row per form submission
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  CONSTRAINT leads_source_check CHECK (
    source IN ('contact', 'expert_help', 'booking', 'quick_planner')
  )
);

-- Index for filtering by source and time (for dashboard/admin queries)
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_source ON public.leads (source);
CREATE INDEX idx_leads_payload_gin ON public.leads USING gin (payload);

-- Optional: comment for documentation
COMMENT ON TABLE public.leads IS 'All website form submissions (contact, expert help, booking, quick planner). RLS allows only INSERT from anon/authenticated.';

-- =============================================================================
-- Row Level Security (RLS)
-- =============================================================================
-- Enable RLS. By default, no role can do anything until we add policies.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anon key or authenticated users) to INSERT only.
-- No SELECT/UPDATE/DELETE for anon → clients cannot read or change leads.
-- Use the service_role key (server-side only) to read/manage leads.
CREATE POLICY "leads_insert_anon_and_authenticated"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No other policies for anon/authenticated → they cannot SELECT, UPDATE, or DELETE.
-- service_role (backend/dashboard) bypasses RLS and has full access.
