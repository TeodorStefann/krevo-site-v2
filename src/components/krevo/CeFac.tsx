"use client";

import { CoverflowCarousel, type CoverflowSlide } from "./CoverflowCarousel";
import { TitleReveal } from "./animations/TitleReveal";
import { MotionButton } from "@/components/ui/MotionButton";

/* Carduri de serviciu desenate pe identitatea Krevo (în /public/ce-fac).
   Când ai capturi reale din produse, înlocuiește fișierele cu același
   nume și apar singure — cel mai credibil portofoliu e produsul însuși. */
const SLIDES: CoverflowSlide[] = [
  {
    src: "/ce-fac/saas.jpg",
    alt: "Dashboardul FirmFlow — situația firmei în timp real",
    title: "Platforme SaaS custom",
    subtitle: "Sisteme care conduc firme întregi — ca FirmFlow",
  },
  {
    src: "/ce-fac/ai.jpg",
    alt: "AI-ul FirmFlow generând un deviz din fotografii de șantier",
    title: "Automatizări cu AI",
    subtitle: "Oferte, devize și documente generate în minute",
  },
  {
    src: "/ce-fac/site.jpg",
    alt: "Arta vizuală a site-ului Krevo",
    title: "Site-uri de prezentare",
    subtitle: "Design UI/UX care vinde, nu doar arată bine",
  },
  {
    src: "/ce-fac/telefon.jpg",
    alt: "Aplicația de telefon a muncitorului — un singur buton de pontaj",
    title: "Aplicații de telefon",
    subtitle: "Firma ta, în buzunarul întregii echipe",
  },
  {
    src: "/ce-fac/rapoarte.jpg",
    alt: "Istoricul de prezență pe 7 zile din FirmFlow",
    title: "Dashboarduri & rapoarte",
    subtitle: "Cifrele firmei, pe un singur ecran",
  },
  {
    src: "/ce-fac/teren.jpg",
    alt: "Verificarea GPS a echipei de teren în FirmFlow",
    title: "Digitalizare pentru firme de teren",
    subtitle: "Construcții, instalații, inginerie — fără hârtii",
  },
];

/**
 * „Tot ce construiesc" — vitrina serviciilor Krevo, compactă: doar
 * imagini în coverflow, cu legendă mică sub cardul activ. Se rotește
 * singură până pune omul mâna pe ea.
 */
export function CeFac() {
  return (
    <section
      id="ce-fac"
      data-reveal
      className="relative overflow-hidden px-6 py-16 md:py-[92px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(760px 460px at 50% 55%, rgba(0,102,255,0.045), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">Serviciile</p>
        <h2 className="text-center text-[30px] leading-tight font-bold text-white sm:text-[36px]">
          <TitleReveal text="Tot ce construiesc" accentLast />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-krevo-silver">
          De la site-uri la sisteme cu AI — totul făcut de un singur om,
          cap-coadă.
        </p>

        <div className="mt-6">
          <CoverflowCarousel
            slides={SLIDES}
            showCaption
            showPagination
            autoPlayMs={3200}
            dragHint="Trage"
            label="Serviciile Krevo"
          />
        </div>

        {/* Momentul de confuzie: omul a văzut șase servicii și se întreabă
            care e al lui. Aici îl prindem, nu trei secțiuni mai jos. */}
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-[#0F2647] bg-gradient-to-b from-[#080B12] to-[#05070C] px-6 py-9 text-center md:px-10">
          <p className="font-serif text-[21px] leading-snug font-bold text-white md:text-[25px]">
            Nu știi care dintre ele{" "}
            <span className="section-title-accent">ți se potrivește?</span>
          </p>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-krevo-silver">
            Două întrebări, treizeci de secunde, și îți spun exact ce i-ar
            folosi firmei tale — cu ce recuperezi și cât durează. Fără să dai
            vreun număr de telefon.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MotionButton label="Află ce îți trebuie" href="/ce-ti-trebuie" />
            <MotionButton
              label="Vezi toate serviciile"
              href="/servicii"
              varianta="secundar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
