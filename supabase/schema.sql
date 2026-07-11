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

-- Only the admin user can WRITE. Writes are locked to a specific Supabase Auth
-- user id (auth.uid()), so even another signed-in user (or the public anon key)
-- cannot insert/update/delete. Replace the UUID below if the admin user changes:
--   select id, email from auth.users;
drop policy if exists "Allow authenticated insert" on public.blogs;
drop policy if exists "Allow admin insert" on public.blogs;
create policy "Allow admin insert"
  on public.blogs for insert to authenticated
  with check (auth.uid() = 'b71d27e8-76dc-4dc0-875b-aa889f417892'::uuid);

drop policy if exists "Allow authenticated update" on public.blogs;
drop policy if exists "Allow admin update" on public.blogs;
create policy "Allow admin update"
  on public.blogs for update to authenticated
  using (auth.uid() = 'b71d27e8-76dc-4dc0-875b-aa889f417892'::uuid)
  with check (auth.uid() = 'b71d27e8-76dc-4dc0-875b-aa889f417892'::uuid);

drop policy if exists "Allow authenticated delete" on public.blogs;
drop policy if exists "Allow admin delete" on public.blogs;
create policy "Allow admin delete"
  on public.blogs for delete to authenticated
  using (auth.uid() = 'b71d27e8-76dc-4dc0-875b-aa889f417892'::uuid);

-- ============================================================================
-- Contact form submissions
-- ============================================================================
create table if not exists public.contact_messages (
  id         bigint primary key generated always as identity,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

-- Anyone (public anon key) can SUBMIT a message, with basic length limits to curb abuse.
drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 200 and
    char_length(email) between 3 and 320 and
    char_length(subject) between 1 and 300 and
    char_length(message) between 1 and 5000
  );

-- Only the admin user can READ / DELETE messages.
drop policy if exists "Admin can read contact messages" on public.contact_messages;
create policy "Admin can read contact messages"
  on public.contact_messages for select to authenticated
  using (auth.uid() = 'b71d27e8-76dc-4dc0-875b-aa889f417892'::uuid);

drop policy if exists "Admin can delete contact messages" on public.contact_messages;
create policy "Admin can delete contact messages"
  on public.contact_messages for delete to authenticated
  using (auth.uid() = 'b71d27e8-76dc-4dc0-875b-aa889f417892'::uuid);
