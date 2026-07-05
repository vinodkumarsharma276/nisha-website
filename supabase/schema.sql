-- canishablogs — blogs table + Row Level Security (RLS)
-- HOW TO RUN: Supabase dashboard → SQL Editor → New query → paste all → Run.
-- Safe to re-run (drops/recreates the policies).

-- 1. Table -------------------------------------------------------------------
create table if not exists public.blogs (
  id         bigint primary key generated always as identity,
  title      text not null,
  excerpt    text,
  content    text not null,
  date       text,
  "readTime" text,
  category   text,
  views      text,
  created_at timestamptz default now()
);

-- 2. Row Level Security ------------------------------------------------------
alter table public.blogs enable row level security;

-- Public (anon key) can READ all blogs — powers the public /blog page.
drop policy if exists "Allow public read access" on public.blogs;
create policy "Allow public read access"
  on public.blogs for select
  using (true);

-- Only signed-in Supabase Auth users can WRITE. The admin form signs in with
-- email/password, so inserts/updates/deletes carry an authenticated JWT.
-- The public anon key alone cannot write.
drop policy if exists "Allow authenticated insert" on public.blogs;
create policy "Allow authenticated insert"
  on public.blogs for insert to authenticated
  with check (true);

drop policy if exists "Allow authenticated update" on public.blogs;
create policy "Allow authenticated update"
  on public.blogs for update to authenticated
  using (true) with check (true);

drop policy if exists "Allow authenticated delete" on public.blogs;
create policy "Allow authenticated delete"
  on public.blogs for delete to authenticated
  using (true);
