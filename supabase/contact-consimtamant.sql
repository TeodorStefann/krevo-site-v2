-- ═══════════════════════════════════════════════════════════════════════
--  DOVADA CONSIMȚĂMÂNTULUI la formularul de contact
--
--  Formularul cerea bifa „sunt de acord cu Politica de Confidențialitate”,
--  dar bifa se verifica doar în browser și nu se salva nicăieri. Dacă
--  cineva ar fi întrebat pe ce temei îi ții datele, n-aveai ce arăta.
--
--  Salvăm de acum MOMENTUL și TEXTUL exact acceptat.
--
--  ⚠️ RULEAZĂ ÎN PROIECTUL SITE-ULUI (krevo-site), NU în FirmFlow.
--  Există o tabelă `contact_requests` în amândouă. Scriptul verifică
--  singur unde ești și refuză să pornească în proiectul greșit — tot ce
--  face e într-un singur bloc, deci ori se execută complet, ori deloc.
-- ═══════════════════════════════════════════════════════════════════════

do $$
begin
  -- ── Garda de proiect ────────────────────────────────────────────────
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'users'
  ) then
    raise exception
      'PROIECT GRESIT. Esti in FirmFlow. Scriptul asta e pentru proiectul krevo-site (cel cu formularul de contact). Nu s-a modificat nimic.';
  end if;

  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'contact_requests'
  ) then
    raise exception
      'Tabela contact_requests lipseste. Ruleaza intai supabase/contact-requests.sql.';
  end if;

  -- ── Coloanele noi ───────────────────────────────────────────────────
  execute 'alter table public.contact_requests add column if not exists consent_at timestamptz';
  execute 'alter table public.contact_requests add column if not exists consent_text text';

  execute 'comment on column public.contact_requests.consent_at is ''Momentul in care persoana a bifat acordul, in formular.''';
  execute 'comment on column public.contact_requests.consent_text is ''Textul exact afisat langa bifa, la momentul acceptarii.''';

  raise notice '-- contact_requests: consent_at si consent_text sunt pe loc.';
end $$;

notify pgrst, 'reload schema';

-- `cu_dovada` va fi 0 pentru mesajele primite până acum — normal, coloana
-- abia a apărut. Contează ca de la primul mesaj nou în sus să crească.
select 'gata' as status,
       count(*) as mesaje,
       count(consent_at) as cu_dovada
from contact_requests;
