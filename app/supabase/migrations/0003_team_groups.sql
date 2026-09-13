-- Team groups: advisors, cabinet, and working teams.
-- Mirrors the groups listed on the public About page.

alter table public.team_members
  add column if not exists team_group text not null default 'executive-council';
