"use client";

import { Navbar } from "@/components/krevo/Navbar";
import { Footer } from "@/components/krevo/Footer";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

export default function TermeniPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <NoiseOverlay />
      <Navbar />
      <main className="px-6 pt-28 pb-[100px]">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-[36px] font-bold text-white md:text-[42px]">
            Termeni și{" "}
            <span className="section-title-accent">condiții</span>
          </h1>
          <div
            className="mt-4 h-px w-[60px] bg-[#6b21a8]"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-krevo-silver">
            Ultima actualizare: iulie 2026 · Conform GDPR (UE 2016/679)
          </p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-krevo-silver">
            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                1. Identificarea operatorului
              </h2>
              <p>
                Operatorul datelor și furnizorul serviciilor prezentate pe
                krevo.ro este Krevo, firmă de servicii digitale din Craiova,
                România. Persoana de contact: Teodor Chiurtu. Email:{" "}
                <a
                  href="mailto:teodor@krevo.ro"
                  className="text-[#a855f7] hover:text-white"
                >
                  teodor@krevo.ro
                </a>
                . Telefon: 0774451822. Site: https://krevo.ro.
              </p>
              <p className="mt-3">
                Acești Termeni reglementează accesul la site și relația dintre
                Krevo și utilizatori / clienți înainte de încheierea unui
                contract comercial distinct.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                2. Servicii oferite
              </h2>
              <p className="mb-3">
                Krevo oferă servicii digitale, inclusiv:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Platforma SaaS FirmFlow (implementare, configurare, suport)
                </li>
                <li>Dezvoltare de site-uri web profesionale</li>
                <li>Automatizări și soluții pe bază de AI</li>
                <li>Consultanță și implementări personalizate</li>
              </ul>
              <p className="mt-3">
                Demo-urile și materialele de pe site au scop ilustrativ. Datele
                prezentate în demo sunt fictive. Condițiile concrete ale unui
                proiect se stabilesc prin ofertă și/sau contract separat.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                3. Prețuri și plăți
              </h2>
              <p>
                Prețurile afișate pe site, dacă există, sunt orientative și pot
                fi actualizate fără notificare prealabilă. Prețul final,
                termenele și modalitatea de plată se confirmă în ofertă sau în
                contractul încheiat cu clientul. Facturarea și plata se fac
                conform acordului scris între părți. Krevo își rezervă dreptul
                de a refuza sau amâna livrarea până la confirmarea plății, unde
                este cazul.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                4. Obligațiile părților
              </h2>
              <p className="mb-3">
                <span className="font-semibold text-white">Krevo</span> se
                angajează să furnizeze serviciile cu diligență profesională, în
                limitele ofertei/contractului, și să protejeze datele personale
                conform Politicii de confidențialitate.
              </p>
              <p>
                <span className="font-semibold text-white">Clientul / utilizatorul</span>{" "}
                se angajează să furnizeze informații corecte, să folosească
                site-ul și serviciile în scopuri legale, să respecte drepturile
                de proprietate intelectuală și să colaborize rezonabil la
                implementare (accese, feedback, aprobări).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                5. Limitarea răspunderii
              </h2>
              <p>
                Site-ul și materialele demonstrative sunt oferite „ca atare”.
                Krevo nu garantează rezultate comerciale specifice și nu
                răspunde pentru daune indirecte, pierderi de profit, întreruperi
                de activitate sau pierderi de date rezultate din utilizarea
                site-ului sau a demo-urilor, în măsura permisă de lege. Răspunderea
                contractuală pentru proiecte livrate este limitată la valoarea
                plătită pentru serviciul respectiv, dacă legea nu prevede altfel.
                Disponibilitatea site-ului poate fi afectată de mentenanță sau
                cauze independente de controlul Krevo.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                6. Proprietate intelectuală
              </h2>
              <p>
                Conținutul site-ului krevo.ro (texte, design, logo, capturi,
                materiale demo), marca FirmFlow și software-ul aferent aparțin
                Krevo sau licențiatorilor săi. Este interzisă copierea,
                redistribuirea sau utilizarea comercială fără acord scris.
                Drepturile asupra livrabilelor din proiecte se reglementează în
                contractul cu clientul.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                7. Modificarea termenilor
              </h2>
              <p>
                Krevo poate actualiza acești Termeni. Versiunea aplicabilă este
                cea publicată pe această pagină, cu data ultimei actualizări.
                Continuarea utilizării site-ului după publicarea modificărilor
                constituie acceptarea noilor termeni, în măsura permisă de lege.
                Pentru relațiile contractuale în derulare, se aplică clauzele
                din contractul respectiv.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                8. Legea aplicabilă
              </h2>
              <p>
                Acești Termeni sunt guvernați de legea română. Orice litigiu
                legat de site sau de relația precontractuală se soluționează pe
                cale amiabilă; în caz contrar, de instanțele competente din
                România. Consumatorii pot apela și la mecanismele ANPC / SOL,
                conform legii.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                9. Date colectate
              </h2>
              <p className="mb-3">
                Prin formularul de contact, chestionarul de pe site și canalele
                afișate putem colecta:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Nume complet</li>
                <li>Adresă de email</li>
                <li>Număr de telefon (opțional)</li>
                <li>Interesul declarat (ex. FirmFlow, site, automatizări AI)</li>
                <li>Conținutul mesajului / descrierea firmei</li>
                <li>Răspunsurile din chestionarul diagnostic</li>
                <li>
                  Date tehnice minime necesare funcționării site-ului (ex.
                  cookies esențiale)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                10. Scopul prelucrării
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Răspuns la solicitări, oferte și discuții precontractuale
                </li>
                <li>
                  Furnizarea serviciilor digitale: platforme SaaS, automatizări
                  AI, site-uri și consultanță
                </li>
                <li>
                  Comunicare operațională legată de proiecte și suport
                </li>
                <li>
                  Respectarea obligațiilor legale aplicabile în România
                </li>
                <li>
                  Îmbunătățirea experienței pe site, în limitele preferințelor
                  de cookies
                </li>
              </ul>
              <p className="mt-3">
                Temeiuri GDPR tipice: art. 6 alin. (1) lit. b) (măsuri
                precontractuale / contract), lit. f) (interes legitim) și lit. a)
                (consimțământ), după caz.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                11. Drepturile utilizatorului
              </h2>
              <p className="mb-3">
                Conform GDPR, aveți dreptul la acces, rectificare, ștergere,
                restricționare, opoziție, portabilitate și retragerea
                consimțământului. Puteți depune plângere la ANSPDCP
                (www.dataprotection.ro).
              </p>
              <p>
                Detaliile complete privind confidențialitatea sunt în{" "}
                <a
                  href="/confidentialitate"
                  className="text-[#a855f7] hover:text-white"
                >
                  Politica de confidențialitate
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                12. Contact
              </h2>
              <p>
                Pentru întrebări despre termeni sau date personale:
                teodor@krevo.ro · WhatsApp 0774451822 · Craiova, România.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
