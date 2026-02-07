# Admin Panel

The admin panel at **`/admin-panel`** lets authenticated users view all leads (form submissions) in a structured way.

## Security

- **Access:** Only signed-in users can see the panel. Unauthenticated visitors see a login form.
- **Auth:** Supabase Email (email + password). Create admin users in [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Users → Add user.
- **RLS:** The `leads` table allows:
  - **INSERT** for `anon` and `authenticated` (public forms).
  - **SELECT** only for `authenticated` (admin panel). No UPDATE/DELETE for clients.
- **SQL injection:** All reads and writes use the Supabase client (parameterized queries). Form input is never concatenated into SQL. Validation (Zod) and type-safe payloads further limit bad input.

## Setup

1. **Run the new migration** so authenticated users can read leads:
   - In Supabase SQL Editor, run: `supabase/migrations/20250206000000_leads_select_authenticated.sql`
   - Or with CLI: `npx supabase db push`

2. **Create an admin user** in Supabase:
   - Dashboard → Authentication → Users → “Add user” → Email + password. Use this to sign in at `/admin-panel`.

3. **Enable Email auth** in Supabase:
   - Authentication → Providers → Email: enable “Email” and, if you want, “Confirm email” (optional for admin).

## Usage

1. Open `/admin-panel`.
2. Sign in with the admin email and password.
3. View all leads; filter by source (Contact, Expert Help, Booking, Quick Planner).
4. Each lead shows: source, timestamp, ID, and all payload fields in a grid.

## Environment

Uses the same Supabase env as the rest of the site:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

No service role key is required; the panel uses the authenticated user’s session to read leads (RLS allows SELECT for `authenticated`).
