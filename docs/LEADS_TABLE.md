# Leads table schema and payloads

All website form submissions are stored in a single table: `public.leads`.

## Table: `public.leads`

| Column      | Type         | Description                                  |
|------------|--------------|----------------------------------------------|
| `id`       | `uuid`       | Primary key (default `gen_random_uuid()`)    |
| `created_at` | `timestamptz` | Set to `now()` on insert                    |
| `source`   | `text`       | One of: `contact`, `expert_help`, `booking`, `quick_planner` |
| `payload`  | `jsonb`      | Form data; shape depends on `source`        |

**Constraint:** `source` must be one of: `contact`, `expert_help`, `booking`, `quick_planner`.

## Payload shapes by source

### `contact`

From: Contact page / About page contact form.

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

### `expert_help`

From: “Request Expert Help” modal (Plan & Book page).

```json
{
  "name": "string",
  "phone": "string",
  "query": "string",
  "message": "string"
}
```

`query` values: `itinerary`, `group`, `timing`, `accommodation`, `transport`, `special`, `other`, or empty.

### `booking`

From: “Complete Your Booking” form (Plan & Book page).

```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "numberOfGuests": "string",
  "visitDate": "string",
  "specialRequests": "string",
  "dietaryPreferences": "string"
}
```

### `quick_planner`

From: “Get Personalized Recommendations” form (Home page).

```json
{
  "visitDate": "string",
  "numberOfPeople": "string",
  "interestArea": "string"
}
```

`interestArea`: `all`, `temples`, `cultural`, `heritage`.

## Indexes

- `idx_leads_created_at` – list/filter by time.
- `idx_leads_source` – filter by source.
- `idx_leads_payload_gin` – GIN index on `payload` for JSONB queries if needed.

## RLS

- **INSERT:** allowed for `anon` and `authenticated` (one policy, no extra checks).
- **SELECT / UPDATE / DELETE:** no policies for `anon` or `authenticated` → only server/service_role can read or modify rows.

See `docs/SUPABASE_SETUP.md` for setup and security overview.
