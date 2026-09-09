-- Popup poster: admin-managed announcement image shown to visitors.
-- Migration 0002.

create table public.popup_posters (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  storage_path text not null,
  link_url text,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.popup_posters enable row level security;

create policy "popup: active readable by everyone"
  on public.popup_posters for select
  using (active or public.is_admin());

create policy "popup: admin write"
  on public.popup_posters for insert
  with check (public.is_admin());

create policy "popup: admin update"
  on public.popup_posters for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "popup: admin delete"
  on public.popup_posters for delete
  using (public.is_admin());

create trigger popup_set_updated_at
  before update on public.popup_posters
  for each row execute function public.set_updated_at();
