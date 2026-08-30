import { Navbar } from "@/components/krevo/Navbar";
import Link from "next/link";
import { CinematicFooter } from "@/components/krevo/CinematicFooter";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

import type { Metadata } from "next";

/* Pagină de server, ca să poată avea titlu propriu în Google.
   Avea „use client” fără să folosească vreun hook — moștenea
   titlul paginii principale și nu se indexa corect. */
export const metadata: Metadata = {
  title: "Politica de cookies",
  description:
    "Ce stocăm în browserul tău și de ce. Fără urmărire, fără analytics.",
  alternates: { canonical: "/cookie-policy" },
};

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
                1. Nu folosim cookies
              </h2>
              <p>
                Simplu și verificabil: krevo.ro nu setează niciun cookie. Nu
                avem Google Analytics, nu avem pixeli de urmărire, nu avem
                reclame și nu urmărim vizitatorii de la o pagină la alta. Poți
                verifica singur, în orice browser, la secțiunea de stocare a
                site-ului.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                2. Ce stocăm, totuși, în browserul tău
              </h2>
              <p className="mb-3">
                Un singur lucru, și doar în memoria browserului tău — nu ajunge
                pe serverele noastre și nu identifică pe nimeni:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Un semn că ai văzut deja animația de deschidere, ca să nu ți-o
                  arătăm din nou la fiecare pagină. Dispare când închizi
                  browserul.
                </li>
              </ul>
              <p className="mt-3">
                Se șterge oricând din setările browserului, la secțiunea de date
                ale site-ului.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                3. De ce nu vezi un banner de cookies
              </h2>
              <p>
                Pentru că nu avem ce să-ți cerem. Legea cere consimțământ doar
                pentru cookies care nu sunt strict necesare — analytics,
                publicitate, urmărire. Noi nu folosim niciunul. Un banner care
                nu blochează nimic ar fi doar o formalitate care îți fură o
                secundă degeaba.
              </p>
              <p className="mt-3">
                Dacă vom introduce vreodată astfel de instrumente, actualizăm
                această pagină și îți cerem acordul înainte să le activăm.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-[18px] font-bold text-white">
                4. Contact
              </h2>
              <p>
                Pentru întrebări despre cookies sau date personale:
                teodor@krevo.ro · 0774 451 822 · Craiova, România. Vezi și{" "}
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
