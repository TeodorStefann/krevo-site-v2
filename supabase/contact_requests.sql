-- contact_requests: form submissions from krevo.ro contact section
create extension if not exists "pgcrypto";

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  interest text not null,
  message text not null,
  read boolean not null default false
);

alter table public.contact_requests enable row level security;

-- Service role (used by /api/contact) has full access; RLS is bypassed for service_role
grant usage on schema public to anon, authenticated, service_role;
grant all on table public.contact_requests to service_role;
grant select on table public.contact_requests to authenticated;

-- Optional: allow authenticated users to mark as read
create policy "authenticated_select_contact_requests"
  on public.contact_requests
  for select
  to authenticated
  using (true);

create policy "authenticated_update_contact_requests"
  on public.contact_requests
  for update
  to authenticated
  using (true)
  with check (true);

comment on table public.contact_requests is 'Contact form submissions from the Krevo marketing site';
