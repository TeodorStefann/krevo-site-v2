"use client";

import { Navbar } from "@/components/krevo/Navbar";
import { Footer } from "@/components/krevo/Footer";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

export default function ConfidentialitatePage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <NoiseOverlay />
      <Navbar />
      <main className="px-6 pt-28 pb-[100px]">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-[36px] font-bold text-white md:text-[42px]">
            Politică de{" "}
            <span className="section-title-accent">confidențialitate</span>
          </h1>
          <div
            className="mt-4 h-px w-[60px] bg-[#6b21a8]"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-krevo-silver">
            Ultima actualizare: iulie 2026 · GDPR (UE 2016/679)
          </p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-krevo-silver">
            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                1. Identificarea operatorului
              </h2>
              <p>
                Operatorul datelor cu caracter personal este Krevo, firmă de
                servicii digitale din Craiova, România. Responsabil contact:
                Teodor Chiurtu —{" "}
                <a
                  href="mailto:teodor@krevo.ro"
                  className="text-[#a855f7] hover:text-white"
                >
                  teodor@krevo.ro
                </a>
                , telefon 0774451822.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                2. Date colectate
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Date de identificare și contact: nume, email, telefon
                  (opțional)
                </li>
                <li>
                  Date de conținut: mesaj, interes (FirmFlow, site,
                  automatizări AI etc.)
                </li>
                <li>
                  Date tehnice: cookies esențiale; cookies de analiză doar cu
                  consimțământ
                </li>
                <li>
                  Date de navigare uzuale (IP, browser), dacă instrumente de
                  analiză sunt activate
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                3. Date din chestionar (quiz)
              </h2>
              <p>
                Când completați chestionarul de pe site colectăm răspunsurile și
                adresa de email pentru a vă contacta cu informații despre
                FirmFlow.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                4. Scopul prelucrării
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Gestionarea solicitărilor de contact și a relației
                  precontractuale / contractuale
                </li>
                <li>
                  Livrarea și suportul serviciilor digitale (SaaS, AI, web)
                </li>
                <li>Îndeplinirea obligațiilor legale</li>
                <li>
                  Îmbunătățirea site-ului și a experienței utilizatorului, în
                  baza consimțământului unde este necesar
                </li>
              </ul>
              <p className="mt-3">
                Datele din formular pot fi stocate în infrastructură cloud
                securizată și/sau transmise pe email către teodor@krevo.ro.
                Nu vindem date personale către terți.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                5. Drepturile utilizatorului
              </h2>
              <p className="mb-3">
                Aveți dreptul la: acces, rectificare, ștergere, restricționare,
                opoziție, portabilitate și retragerea consimțământului. Răspundem
                în termenul legal (de regulă o lună). Plângeri: ANSPDCP —
                www.dataprotection.ro.
              </p>
              <p>
                Durata păstrării: de regulă până la 24 de luni de la ultima
                interacțiune, sau mai mult dacă legea o cere.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                6. Contact
              </h2>
              <p>
                Pentru exercitarea drepturilor GDPR sau întrebări despre
                confidențialitate: teodor@krevo.ro · 0774451822 · Craiova,
                România. Vezi și{" "}
                <a href="/termeni" className="text-[#a855f7] hover:text-white">
                  Termenii și condițiile
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
