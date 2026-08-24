"use client";

import { Navbar } from "@/components/krevo/Navbar";
import Link from "next/link";
import { CinematicFooter } from "@/components/krevo/CinematicFooter";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

export default function ConfidentialitatePage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <NoiseOverlay />
      <Navbar />
      <main className="px-6 pt-28 pb-[100px]">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-[36px] font-bold text-white md:text-[42px]">
            Politică de{" "}
            <span className="section-title-accent">confidențialitate</span>
          </h1>
          <div
            className="mt-4 h-px w-[60px] bg-[#0052CC]"
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
                Operatorul datelor cu caracter personal este Krevo, Persoană
                fizică autorizată din Craiova, România. Responsabil contact:
                Teodor Chiurtu —{" "}
                <a
                  href="mailto:teodor@krevo.ro"
                  className="text-[#3399FF] hover:text-white"
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
                  Date tehnice: cookies esențiale și preferința de consimțământ
                  salvată local în browser
                </li>
                <li>
                  Nu folosim în prezent cookies de analytics sau de urmărire
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                3. Temeiul juridic al prelucrării
              </h2>
              <p className="mb-3">
                Conform art. 6 din GDPR, prelucrăm datele pe următoarele
                temeiuri, în funcție de scop:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Formularul de contact — demersuri precontractuale la cererea
                  dumneavoastră (art. 6 alin. 1 lit. b)
                </li>
                <li>
                  Livrarea serviciilor contractate — executarea contractului
                  (art. 6 alin. 1 lit. b)
                </li>
                <li>
                  Facturare și evidențe fiscale — obligație legală (art. 6
                  alin. 1 lit. c)
                </li>
                <li>
                  Securitatea site-ului și prevenirea abuzurilor — interes
                  legitim (art. 6 alin. 1 lit. f)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                4. Date în platforma FirmFlow
              </h2>
              <p className="mb-3">
                Când folosiți FirmFlow ca client, putem prelucra date necesare
                funcționării platformei, inclusiv:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Date de pontaj și locație GPS ale angajaților, pentru
                  verificarea prezenței la locul de muncă
                </li>
                <li>
                  Date despre angajați și roluri (nume, contact, atribuții,
                  sarcini, concedii)
                </li>
                <li>
                  Date operaționale despre proiecte, materiale și activități
                </li>
                <li>
                  Conținut generat sau asistat de AI (oferte, recomandări,
                  insight-uri), pe baza datelor pe care le introduceți în
                  platformă
                </li>
              </ul>
              <p className="mt-3">
                Aceste date sunt prelucrate pentru livrarea serviciului, la
                cererea și pe contul clientului (firma care utilizează
                FirmFlow), conform contractului și GDPR.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                5. Scopul prelucrării
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
                  Îmbunătățirea site-ului și a experienței utilizatorului
                </li>
              </ul>
              <p className="mt-3">
                Pentru funcționarea serviciilor folosim următorii furnizori, în
                calitate de persoane împuternicite: Supabase (stocarea
                datelor, infrastructură în Uniunea Europeană), Resend (transmiterea
                notificărilor pe email, SUA — transfer în afara SEE pe baza
                clauzelor contractuale standard aprobate de Comisia Europeană)
                și Anthropic (procesarea cererilor către asistentul AI din
                FirmFlow, SUA — același mecanism de transfer). Nu vindem date
                personale către terți.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                6. Drepturile utilizatorului
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
                7. Cookies
              </h2>
              <p>
                Detaliile despre cookies și preferința de consimțământ sunt în{" "}
                <Link
                  href="/cookie-policy"
                  className="text-[#3399FF] hover:text-white"
                >
                  Politica de cookies
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                8. Contact
              </h2>
              <p>
                Pentru exercitarea drepturilor GDPR sau întrebări despre
                confidențialitate: teodor@krevo.ro · 0774451822 · Craiova,
                România. Vezi și{" "}
                <Link href="/termeni" className="text-[#3399FF] hover:text-white">
                  Termenii și condițiile
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <CinematicFooter />
    </div>
  );
}
