# PWS Platform — Next.js + Supabase Migration Design

Date: 2026-09-09
Status: Approved (in-chat design approved by project owner)

## Overview

Migrate the PAF-IAST Welfare Society (PWS) static HTML/CSS/JS prototype into a
production Next.js application backed by Supabase. One application serves the
public site and the role-gated admin portal.

## Goals

- Preserve the prototype's honest, factual copy and content structure; replace
  the warm-cream visual identity with the minimalist PWS design system.
- Public pages render as React Server Components reading Supabase directly.
- Admin portal manages events, news, gallery, team members, and reviews
  form submissions — no code deploys for content changes.
- All writes gated by Row-Level Security; anonymous visitors can only INSERT
  submissions and SELECT published content.

## Non-Goals

- Member accounts for the public (no student login).
- Email sending (no transactional email; submissions live in the portal inbox).
- Comments, likes, analytics, i18n, payments.

## Tech Stack

- Next.js (App Router) + TypeScript `strict: true`
- Tailwind CSS + Lucide React icons (shadcn/ui patterns where useful, no full
  component library pull-in for v1)
- Supabase: PostgreSQL, Auth (email + password), Storage, RLS
- React Hook Form + Zod on public forms; Server Actions re-validate

## Visual Design System

Minimalist, white-space heavy.

| Token | Value | Use |
|---|---|---|
| pws-green | #006400 | Primary, CTAs, links |
| pws-sage | #4F9856 | Secondary accents, hovers |
| pws-teal | #006C43 | Tertiary, dark sections |
| background | #FFFFFF | Page background |
| off-white | #F2F4F2 | Alternate section background |
| charcoal | #222222 | Body text |
| border | #E4E9E4 | Hairline borders |

Typography: DM Sans (body/UI), a display serif for hero headlines
(Playfair Display, as in prototype — headline font only). Google Fonts via
`next/font`, no external stylesheet.

Layout: max-width 1160px container, generous vertical rhythm, restrained
animation (fade-up on scroll only, respects `prefers-reduced-motion`).

## Site Map

Public (`(public)` route group):
- `/` Home
- `/about` About (purpose, values, advisor, team — team from DB)
- `/programs` Our work
- `/events` Events (published only, honest empty state)
- `/gallery` Stories (published images, honest empty state)
- `/news` News (published posts)
- `/get-involved` Membership / volunteering / partnership application
- `/contact` General enquiry + contact details

Admin (`(admin)` route group, auth-gated):
- `/admin/login`
- `/admin` Dashboard: submission inbox + counts
- `/admin/events`, `/admin/news`, `/admin/gallery`, `/admin/team` CRUD
- `/admin/submissions` review + mark handled

## Architecture

Single Next.js app, route groups `(public)` and `(admin)`.

```
src/
  app/
    (public)/layout.tsx        # Header + Footer
    (public)/page.tsx ...      # public pages
    (admin)/admin/...          # portal pages
    actions/                   # server actions (forms, CRUD)
  components/
    site/                      # header, footer, hero, sections
    forms/                     # RHF + Zod form components
    admin/                     # portal UI
    ui/                        # small primitives (Button, Input, etc.)
  lib/
    supabase/                  # client.ts, server.ts, admin.ts
    data/                      # typed query functions per table
    validation/                # zod schemas shared client/server
  types/                       # DB row types
  middleware.ts                # /admin session gate
```

- **`lib/supabase/server.ts`** — `createServerClient` from `@supabase/ssr`
  bound to Next.js cookies. Used by RSC pages, layouts, server actions.
- **`lib/supabase/client.ts`** — browser client for client components.
- **`lib/supabase/admin.ts`** — service-role client, `server-only`, used
  solely for admin auth lookups where RLS cannot self-serve.
- **Data functions** in `lib/data/*` return typed rows; single source of row
  shapes in `types/database.ts`.

## Database Schema

One migration: `supabase/migrations/0001_init.sql`.

### Tables

- `admins(id uuid PK references auth.users, role text default 'admin',
  created_at timestamptz)`
- `events(id uuid PK, title text, slug text unique, description text,
  date date, location text, status text check in ('draft','published')
  default 'draft', image_path text, created_at, updated_at)`
- `news(id uuid PK, title text, slug text unique, excerpt text, body text,
  status text check ('draft','published') default 'draft',
  published_at timestamptz, created_at, updated_at)`
- `gallery_images(id uuid PK, caption text, alt_text text,
  storage_path text, sort_order int default 0, status text
  check ('draft','published') default 'draft', created_at)`
- `team_members(id uuid PK, name text, role text, photo_path text,
  sort_order int default 0, created_at)`
- `submissions(id uuid PK, kind text check ('enquiry','application'),
  payload jsonb, handled boolean default false, created_at)`

### RLS

- Helper `is_admin()` — SECURITY DEFINER function: `exists (select 1 from
  public.admins where id = auth.uid())`.
- `events`, `news`, `gallery_images`: SELECT to anon/authenticated only when
  `status = 'published'`; all operations to admins.
- `team_members`: SELECT to everyone (public roster); writes admin-only.
- `submissions`: INSERT to anon (with basic field-shape constraint via policy
  check), SELECT/UPDATE to admins only.
- `admins`: SELECT to admins only (self-lookup); INSERT/DELETE via
  service-role only, never from the app.

### Storage

- Bucket `media` — public read. Upload/delete limited to admins via storage
  policies checking `is_admin()`. Serves event covers, gallery images, team
  photos. One bucket, path prefixes `events/`, `gallery/`, `team/`.

### Indexes

- `events(status, date)`, `news(status, published_at desc)`,
  `gallery_images(status, sort_order)`, `team_members(sort_order)`,
  `submissions(handled, created_at desc)`.

## Auth & Admin Portal

- Supabase Auth email + password. First admin created in Supabase dashboard
  (create auth user, then insert `admins` row) — documented in README.
- `middleware.ts` protects `/admin/*`: no session → redirect `/admin/login`.
- Admin layout independently re-checks session + `admins` row (defense in
  depth; middleware is UX, layout is the gate).
- Portal uses server actions for all mutations; forms are progressive —
  plain HTML forms with server-side validation (RHF reserved for the more
  complex public forms).
- Submissions inbox: list newest first, expand payload, mark handled.

## Forms

- `get-involved` application: interest (membership/volunteering/partnership),
  full name, email, phone optional, connection to PAF-IAST, message. Zod
  schema; client-side RHF; server action re-validates and inserts.
- `contact` enquiry: name, email, subject, message → `submissions`.
- Success/error rendered inline; honeypot field for spam; no mailto.

## Error Handling

- Data functions return typed results; pages render honest empty states when
  no published content exists (prototype behavior preserved).
- Server actions return `{ ok: true } | { ok: false, message, fieldErrors? }`.
- Admin CRUD surfaces failures inline, never loses form input.

## Performance & SEO

- RSC-first; client JS only for interactive islands (nav toggle, forms,
  lightbox-free gallery for v1).
- `next/font` self-hosted fonts. Per-page `metadata` export with descriptions
  from prototype.
- ISR-free for v1: dynamic rendering for DB-backed pages is acceptable at
  this traffic level; revisit with revalidation tags later.

## Testing & Verification

- `tsc --noEmit` and `next build` clean.
- Apply migration to a Supabase project; smoke: RLS blocks anon writes to
  content tables, anon INSERT on submissions works, published-only SELECT.
- Manual walkthrough of every public page + each admin CRUD flow.

## Open Decisions Made

- Visual: fresh minimalist PWS palette, prototype copy retained.
- Page set: full 7 + Get Involved.
- Submissions stored in Supabase (inbox in portal), no email.
- Auth: Supabase email+password + `admins` table.
- One release: public site + full portal.
