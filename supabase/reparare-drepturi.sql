-- ═══════════════════════════════════════════════════════════════════════
--  REPARARE — dă drepturi rolului cu care scrie site-ul
--
--  Eroarea „permission denied for table contact_requests" (HTTP 403)
--  apare pentru că service_role nu primește automat drepturi pe tabelele
--  create manual, în proiectele Supabase noi.
--
--  Rulează în proiectul krevo-site → SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════

grant usage on schema public to service_role;
grant all privileges on table public.contact_requests to service_role;

-- ca să nu mai pățim asta la nicio tabelă viitoare din proiectul ăsta
alter default privileges in schema public
  grant all on tables to service_role;

notify pgrst, 'reload schema';

-- Verificare: trebuie să apară service_role cu INSERT și SELECT
select grantee, privilege_type
from information_schema.role_table_grants
where table_name = 'contact_requests'
order by grantee, privilege_type;
