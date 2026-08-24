"use client";

import { Navbar } from "@/components/krevo/Navbar";
import Link from "next/link";
import { CinematicFooter } from "@/components/krevo/CinematicFooter";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

export default function CookiePolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <NoiseOverlay />
      <Navbar />
      <main className="px-6 pt-28 pb-[100px]">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-[36px] font-bold text-white md:text-[42px]">
            Politică de{" "}
            <span className="section-title-accent">cookies</span>
          </h1>
          <div
            className="mt-4 h-px w-[60px] bg-[#0052CC]"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-krevo-silver">
            Ultima actualizare: iulie 2026 · Conform GDPR (UE 2016/679)
          </p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-krevo-silver">
            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                1. Ce sunt cookies
              </h2>
              <p>
                Cookies sunt fișiere mici stocate pe dispozitivul tău când
                vizitezi krevo.ro. Ne ajută să facem site-ul să funcționeze
                corect și să reținem preferințele tale legate de bannerul de
                consimțământ. În prezent, krevo.ro nu folosește instrumente de
                analytics (ex. Google Analytics) și nu setează cookies de
                urmărire a traficului.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                2. Cookies esențiale
              </h2>
              <p>
                Aceste cookies sunt necesare pentru funcționarea de bază a
                site-ului (navigare, securitate, afișarea corectă a paginilor).
                Nu pot fi dezactivate din bannerul de consimțământ, deoarece
                fără ele site-ul nu ar funcționa corespunzător.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                3. Preferința de consimțământ
              </h2>
              <p>
                Salvăm local în browser alegerea ta din bannerul de cookies
                ({"„Am înțeles”"} sau {"„Doar esențiale”"}), astfel încât să nu te
                întrebăm din nou la fiecare vizită. Această preferință este
                stocată în localStorage, nu prin cookies de analytics.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                4. Cum îți gestionezi alegerea
              </h2>
              <p>
                La prima vizită apare un banner unde poți confirma preferința.
                Poți șterge datele site-ului din setările browserului pentru a
                reseta alegerea și a vedea din nou bannerul. Dacă pe viitor vom
                introduce cookies non-esențiale (ex. analytics), vom actualiza
                această politică și vom cere consimțământul înainte de a le
                activa.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                5. Contact
              </h2>
              <p>
                Pentru întrebări despre cookies sau date personale:
                teodor@krevo.ro · 0774451822 · Craiova, România. Vezi și{" "}
                <Link
                  href="/confidentialitate"
                  className="text-[#3399FF] hover:text-white"
                >
                  Politica de confidențialitate
                </Link>{" "}
                și{" "}
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
