# PWS Website — PAF-IAST Welfare Society

Production platform for the PAF-IAST Welfare Society: a public site plus a
role-gated admin portal, built on Next.js and Supabase.

## Stack

- Next.js (App Router, React Server Components) + TypeScript `strict`
- Tailwind CSS + Lucide React
- Supabase — PostgreSQL, Auth, Storage, Row-Level Security
- React Hook Form + Zod

## Repository layout

- `app/` — the Next.js application
  - `src/app/(public)/` — public pages (Home, About, Programs, Events,
    Gallery, News, Get Involved, Contact)
  - `src/app/(admin)/admin/` — admin portal (dashboard, submissions inbox,
    events / news / gallery / team CRUD)
  - `src/app/actions/` — server actions
  - `src/lib/` — Supabase clients, typed data access, Zod schemas
  - `supabase/migrations/` — SQL migrations
- Root — original static prototype (`*.html`) and design docs
  (`docs/superpowers/specs/`)

## Design system

| Token | Value |
|---|---|
| Primary (pws-green) | `#006400` |
| Secondary (pws-sage) | `#4F9856` |
| Tertiary (pws-teal) | `#006C43` |
| Background | `#FFFFFF` |
| Off-white | `#F2F4F2` |
| Text (charcoal) | `#222222` |

Fonts: DM Sans (UI) and Playfair Display (headlines), self-hosted via
`next/font`.

## Setup

1. Install dependencies:

   ```bash
   cd app
   npm install
   ```

2. Create a Supabase project at https://supabase.com, then run the
   migration `supabase/migrations/0001_init.sql` in the SQL Editor.

3. Copy `app/.env.example` to `app/.env.local` and fill in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
   SUPABASE_SERVICE_ROLE_KEY=<service role key>   # server-only
   ```

4. Create the first admin:
   - In Supabase dashboard, Authentication → Users → "Add user" (email +
     password, auto-confirm).
   - In SQL Editor, allow that user into the portal:

     ```sql
     insert into public.admins (id)
     values ('<auth user uuid>');
     ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

   Public site: http://localhost:3000 — Admin portal: http://localhost:3000/admin

## Managing content

- **Events / News / Gallery / Team**: sign in at `/admin`, edit there.
  Published items appear on the public site immediately (revalidated).
- **Images**: upload to the `media` bucket (Storage) in the Supabase
  dashboard using paths like `gallery/photo-1.jpg`, `team/president.jpg`,
  `events/drive.jpg`, then reference the path in the portal forms.
- **Submissions**: public Get Involved applications and Contact enquiries
  land in `/admin/submissions`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |

## Security model

- Anonymous visitors can only `INSERT` into `submissions` and `SELECT`
  published content — enforced by RLS, not by the app.
- All content writes require a row in `public.admins`.
- The service-role key never reaches the browser; the admin client module is
  `server-only`.
