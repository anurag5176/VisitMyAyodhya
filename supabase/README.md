# Supabase migrations

This folder contains SQL migrations for the Visit My Ayodhya backend.

## Leads table

- **Migration:** `migrations/20250205000000_create_leads_table.sql`
- **Table:** `public.leads` — stores all form submissions (contact, expert help, booking, quick planner).
- **RLS:** Only `INSERT` is allowed for `anon` and `authenticated`; no SELECT/UPDATE/DELETE from the client.

## How to run

1. **Supabase Dashboard (SQL Editor)**  
   Open the migration file, copy its contents, and run them in the SQL Editor of your Supabase project.

2. **Supabase CLI**  
   From the project root: `npx supabase db push` (after linking the project).

Full setup steps and env vars: see **docs/SUPABASE_SETUP.md**.
