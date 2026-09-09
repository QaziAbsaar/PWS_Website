-- PWS platform initial schema: admins, content tables, submissions, RLS, storage.
-- Migration 0001.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Updated-at helper (referenced by triggers below — must exist first)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Admin role
-- ---------------------------------------------------------------------------

create table public.admins (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- Helper used by every RLS policy. SECURITY DEFINER so it can read public.admins
-- regardless of the caller's row-level view of that table.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Events
-- ---------------------------------------------------------------------------

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  date date,
  location text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_status_date_idx on public.events (status, date desc);

alter table public.events enable row level security;

create policy "events: published readable by everyone"
  on public.events for select
  using (status = 'published' or public.is_admin());

create policy "events: admin write"
  on public.events for insert
  with check (public.is_admin());

create policy "events: admin update"
  on public.events for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "events: admin delete"
  on public.events for delete
  using (public.is_admin());

create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- News
-- ---------------------------------------------------------------------------

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index news_status_published_idx on public.news (status, published_at desc);

alter table public.news enable row level security;

create policy "news: published readable by everyone"
  on public.news for select
  using (status = 'published' or public.is_admin());

create policy "news: admin write"
  on public.news for insert
  with check (public.is_admin());

create policy "news: admin update"
  on public.news for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "news: admin delete"
  on public.news for delete
  using (public.is_admin());

create trigger news_set_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Gallery images
-- ---------------------------------------------------------------------------

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  caption text not null default '',
  alt_text text not null default '',
  storage_path text not null,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index gallery_status_order_idx on public.gallery_images (status, sort_order);

alter table public.gallery_images enable row level security;

create policy "gallery: published readable by everyone"
  on public.gallery_images for select
  using (status = 'published' or public.is_admin());

create policy "gallery: admin write"
  on public.gallery_images for insert
  with check (public.is_admin());

create policy "gallery: admin update"
  on public.gallery_images for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "gallery: admin delete"
  on public.gallery_images for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Team members
-- ---------------------------------------------------------------------------

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index team_order_idx on public.team_members (sort_order);

alter table public.team_members enable row level security;

create policy "team: readable by everyone"
  on public.team_members for select
  using (true);

create policy "team: admin write"
  on public.team_members for insert
  with check (public.is_admin());

create policy "team: admin update"
  on public.team_members for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "team: admin delete"
  on public.team_members for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Submissions (public form intake)
-- ---------------------------------------------------------------------------

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('enquiry', 'application')),
  payload jsonb not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create index submissions_inbox_idx on public.submissions (handled, created_at desc);

alter table public.submissions enable row level security;

-- Anon may only insert valid shapes; nothing public can read rows back.
create policy "submissions: anon insert"
  on public.submissions for insert
  with check (
    kind in ('enquiry', 'application')
    and jsonb_typeof(payload) = 'object'
    and (payload -> 'name') is not null
    and (payload -> 'email') is not null
  );

create policy "submissions: admin read"
  on public.submissions for select
  using (public.is_admin());

create policy "submissions: admin update"
  on public.submissions for update
  using (public.is_admin())
  with check (public.is_admin());

-- No delete policy: submissions are retained, only marked handled.

-- ---------------------------------------------------------------------------
-- admins RLS (last, so is_admin exists)
-- ---------------------------------------------------------------------------

alter table public.admins enable row level security;

create policy "admins: admin read"
  on public.admins for select
  using (public.is_admin());

-- No insert/update/delete policies on admins: rows are managed with the
-- service role from the Supabase dashboard, never from the app.

-- ---------------------------------------------------------------------------
-- Storage: single public-read bucket "media"
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media: public read"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "media: admin upload"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

create policy "media: admin update"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin());

create policy "media: admin delete"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());
