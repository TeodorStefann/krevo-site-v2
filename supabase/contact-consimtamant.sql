-- ═══════════════════════════════════════════════════════════════════════
--  DOVADA CONSIMȚĂMÂNTULUI la formularul de contact
--
--  Formularul cerea bifa „sunt de acord cu Politica de Confidențialitate”,
--  dar bifa se verifica doar în browser și nu se salva nicăieri. Dacă
--  cineva ar fi întrebat pe ce temei îi ții datele, n-aveai ce arăta.
--
--  Salvăm de acum MOMENTUL și TEXTUL exact acceptat.
--  Rulează în proiectul krevo-site → SQL Editor.
-- ═══════════════════════════════════════════════════════════════════════

alter table contact_requests
  add column if not exists consent_at timestamptz;

alter table contact_requests
  add column if not exists consent_text text;

comment on column contact_requests.consent_at is
  'Momentul în care persoana a bifat acordul, în formular.';
comment on column contact_requests.consent_text is
  'Textul exact afișat lângă bifă, la momentul acceptării.';

notify pgrst, 'reload schema';

select 'gata' as status,
       count(*) as mesaje,
       count(consent_at) as cu_dovada
from contact_requests;
