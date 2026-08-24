-- ═══════════════════════════════════════════════════════════════════════
--  KREVO — tabela mesajelor din formularul de contact
--
--  Se rulează în proiectul Supabase AL SITE-ULUI (krevo-site),
--  NU în cel al platformei FirmFlow.
--
--  Supabase → SQL Editor → lipești tot → Run.
-- ═══════════════════════════════════════════════════════════════════════

create table if not exists contact_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  interest   text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_requests_created
  on contact_requests (created_at desc);

create index if not exists idx_contact_requests_unread
  on contact_requests (created_at desc) where read = false;

-- ── Securitate ────────────────────────────────────────────────────────
-- RLS pornit, FĂRĂ nicio politică pentru anon/authenticated.
-- Înseamnă: nimeni nu poate citi sau scrie din browser.
-- Site-ul scrie prin service_role, care ocolește RLS și stă doar pe server.
-- Tu citești mesajele din Supabase → Table Editor.
alter table contact_requests enable row level security;

revoke all on contact_requests from anon, authenticated;

-- ...dar service_role (cu care scrie serverul site-ului) are nevoie
-- explicit de drepturi. În proiectele Supabase noi nu le mai moștenește
-- automat, iar fără ele scrierea dă „permission denied" (HTTP 403).
grant usage on schema public to service_role;
grant all privileges on table public.contact_requests to service_role;
alter default privileges in schema public grant all on tables to service_role;

notify pgrst, 'reload schema';

-- Verificare
select 'gata' as status, count(*) as mesaje from contact_requests;
