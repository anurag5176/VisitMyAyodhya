# Supabase backend setup

This project sends all website form submissions (leads) to a single Supabase table. The browser uses the **anon (publishable) key** only; Row Level Security (RLS) ensures clients can **insert** but not read or modify leads.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Wait for the database to be ready.

## 2. Run the migration

Apply the leads table and RLS policies:

**Option A – Supabase Dashboard (SQL Editor)**

1. In the dashboard, open **SQL Editor**.
2. Copy the contents of `supabase/migrations/20250205000000_create_leads_table.sql`.
3. Paste and run the script.

**Option B – Supabase CLI**

```bash
npx supabase link --project-ref your-project-ref
npx supabase db push
```

(Requires Supabase CLI and a linked project.)

## 3. Environment variables

1. In Supabase: **Project Settings** → **API**.
2. Copy **Project URL** and **anon public** key.
3. In the app root, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

4. Set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
```

- Use the **anon public** key in the browser (this is the “publishable” key).
- Do **not** put the `service_role` key in the frontend or in `NEXT_PUBLIC_*` env vars. Use it only in a secure backend (e.g. server-only API or admin tool).

## 4. Security overview

- **RLS** is enabled on `public.leads`.
- **Policy:** `anon` and `authenticated` can **INSERT** only (with no extra checks). There are **no** SELECT/UPDATE/DELETE policies for these roles, so:
  - Visitors can submit forms (insert rows).
  - Visitors cannot read or change existing leads.
- **Viewing leads:** Use the Supabase Dashboard (Table Editor) or a backend/dashboard that uses the **service_role** key (server-side only). The service role bypasses RLS.

## 5. Verifying

1. Start the app: `pnpm dev`.
2. Submit a form (Contact, Booking, Expert Help, or Quick Planner).
3. In Supabase: **Table Editor** → **leads**. You should see the new row (when using an account that has full DB access, e.g. dashboard with service role).

If inserts fail, check:

- Migration has been run (table and policy exist).
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in `.env.local`.
- `source` is one of: `contact`, `expert_help`, `booking`, `quick_planner` (see `docs/LEADS_TABLE.md`).
