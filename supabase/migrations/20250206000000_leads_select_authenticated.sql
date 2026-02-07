-- =============================================================================
-- Allow authenticated users (admin panel) to SELECT leads only.
-- No UPDATE or DELETE; only read access for logged-in users.
-- =============================================================================

CREATE POLICY "leads_select_authenticated"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);
