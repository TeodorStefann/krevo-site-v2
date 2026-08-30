"use client";

import { useState } from "react";
import Link from "next/link";
import { MotionButton } from "@/components/ui/MotionButton";
import { AnimatePresence, motion } from "framer-motion";
import { TitleReveal } from "./animations/TitleReveal";
import { fundalSectiune } from "@/lib/krevo/fundal";
import { useClipEconom } from "@/lib/krevo/clipEconom";

/** Haloul care urmărește cursorul pe card. */
function urmaresteCursorul(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const CARD_PILLS = [
  "Date securizate",
  "Funcționează pe telefon",
  "AI integrat nativ",
];

/** Aplicația live — de aici intră direct în FirmFlow. */
const APP_URL = "https://firmflow.ro";

/* Comutatorul de funcții: fiecare tab schimbă produsul viu din ramă.
   REGULA: `src` se pune DOAR când fișierul chiar există în /public/clipuri
   — un tab fără clip primește panoul de prezentare, nu un player negru gol.
   Când filmezi un clip nou: pui fișierul în /public/clipuri și adaugi
   `src` + `video: true` la tabul lui. Atât. */
type Tab = {
  id: string;
  eticheta: string;
  legenda: string;
  alt: string;
  fit: "cover" | "contain";
  src?: string;
  video?: boolean;
  /** Pentru taburile fără clip: ce arată panoul de prezentare. */
  titluPanou?: string;
  puncte?: string[];
};

const TABURI: Tab[] = [
  {
    id: "deviz-poze",
    eticheta: "Deviz din poze",
    src: "/clipuri/deviz-poze.mp4",
    video: true,
    alt: "Deviz generat cu AI din fotografii de șantier, în FirmFlow",
    legenda: "Din 3 poze de pe șantier — deviz complet, cu totaluri, în sub un minut.",
    fit: "cover",
  },
  {
    id: "oferta",
    eticheta: "Ofertă AI",
    src: "/clipuri/oferta-ai.mp4",
    video: true,
    alt: "Ofertă tehnică generată cu AI în FirmFlow",
    legenda:
      "Din brief-ul lucrării — ofertă tehnică completă, cu deviz și etape, cât îți torni cafeaua.",
    fit: "cover",
    titluPanou: "Oferta se scrie singură.",
    puncte: [
      "Scrii lucrarea în două rânduri — AI-ul scrie oferta tehnică întreagă",
      "Deviz estimativ, etape de execuție, condiții și garanții incluse",
      "PDF cu identitatea firmei tale, salvat în istoric",
    ],
  },
  {
    id: "factura",
    eticheta: "Facturi",
    src: "/clipuri/factura.mp4",
    video: true,
    alt: "Factură emisă direct din deviz în FirmFlow",
    legenda:
      "Factura se emite direct din deviz — un click, PDF gata de trimis.",
    fit: "cover",
    titluPanou: "Din deviz în factură, cu un click.",
    puncte: [
      "Liniile devizului trec singure în factură — zero muncă dublă",
      "Numerotare automată, după regimul tău de facturare",
      "PDF profesional + XML e-Factura, gata de trimis",
    ],
  },
  {
    id: "dashboard",
    eticheta: "Dashboard",
    src: "/clipuri/dashboard.mp4",
    video: true,
    alt: "Dashboardul patronului în FirmFlow",
    legenda: "Situația firmei, în fiecare dimineață — pe un singur ecran.",
    fit: "cover",
    titluPanou: "Firma ta, pe un singur ecran.",
    puncte: [
      "Cine e prezent, ce proiecte sunt active, ce e urgent — live",
      "AI-ul îți spune dimineața unde să te uiți întâi",
      "Fără apeluri, fără grupuri de WhatsApp, fără haos",
    ],
  },
  {
    id: "pontaj",
    eticheta: "Pontaj — patron",
    src: "/clipuri/pontaj.mp4",
    video: true,
    alt: "Pontaj cu verificare GPS în FirmFlow",
    legenda:
      "Toată echipa, pe hartă: cine e la șantier, cine lipsește, ultimele 7 zile.",
    fit: "cover",
    titluPanou: "Vezi cine e pe șantier. Cu dovadă.",
    puncte: [
      "Fiecare pontare e confirmată cu GPS, la punctul de lucru",
      "Istoric pe 7 zile, om cu om — prezențe, absențe, întârzieri",
      "Foaia colectivă de prezență se exportă cu un click",
    ],
  },
  {
    id: "pontaj-muncitor",
    eticheta: "Pontaj — muncitor",
    src: "/clipuri/pontaj-muncitor.mp4",
    video: true,
    alt: "Pontajul muncitorului în FirmFlow — un singur buton",
    legenda:
      "Ce vede muncitorul: un singur buton. GPS-ul confirmă locația, prezența e marcată.",
    fit: "cover",
    titluPanou: "Pentru muncitor: un singur buton.",
    puncte: [
      "Apasă AM VENIT când ajunge — atât are de învățat",
      "GPS-ul confirmă singur că e la locație",
      "Merge pe orice telefon, fără instalare complicată",
    ],
  },
];

/** Panoul de prezentare pentru taburile care nu au încă filmare —
    aceeași ramă de aplicație, dar cu funcția explicată, nu un player gol. */
function PanouFunctie({ tab }: { tab: Tab }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(60% 70% at 50% 38%, rgba(0,102,255,0.12), transparent 70%), linear-gradient(180deg, #0d1117 0%, #080b12 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-md text-center">
        <span className="inline-block rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 px-3 py-1 text-[10.5px] font-semibold tracking-[0.14em] text-[#3399FF] uppercase">
          Funcție live în aplicație
        </span>
        <p className="mt-4 text-[22px] leading-snug font-bold text-white md:text-[26px]">
          {tab.titluPanou}
        </p>
        <ul className="mt-5 space-y-2.5 text-left">
          {tab.puncte?.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-white/75">
              <span className="mt-0.5 text-[#3399FF]" aria-hidden="true">✓</span>
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] text-white/40">
          Filmarea din aplicație vine în curând — până atunci o vezi live, în
          proba gratuită de 5 zile.
        </p>
      </div>
    </div>
  );
}

/**
 * Vitrina produsului: panou split, nu carte poștală. Stânga — identitatea
 * și butoanele. Dreapta — PRODUSUL însuși, viu, umplând cardul până la
 * margini, cu bara de browser deasupra.
 */
export function Portfolio() {
  const [activ, setActiv] = useState(0);
  const tab = TABURI[activ];
  const refClip = useClipEconom();

  return (
    <section
      id="portofoliu"
      data-reveal
      className="relative overflow-hidden px-6 py-16 md:py-[92px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={fundalSectiune("/bg-s-portfolio.jpg")}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">Produsul</p>
        <h2 className="text-center font-serif text-[28px] font-bold text-white sm:text-4xl md:text-[3.25rem]">
          <TitleReveal text="Ce am construit" accentLast />
        </h2>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <article
            onMouseMove={urmaresteCursorul}
            className="spotlight-card flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a] transition-colors duration-300 hover:border-[#3399FF]/40"
          >
            {/* ── Sus: identitatea și acțiunile — trei rânduri ordonate ── */}
            <div className="flex flex-col gap-5 p-7 md:p-8">
              {/* rândul 1: cine e produsul (stânga) + acțiunile (dreapta) */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/firmflow-logo.png"
                    alt="FirmFlow logo"
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-auto object-contain"
                  />
                  <h3 className="text-[30px] leading-none font-bold md:text-[34px]">
                    <span className="text-white">Firm</span>
                    <span className="text-[#3399FF]">Flow</span>
                  </h3>
                  <span className="ml-1 rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.12em] text-[#3399FF] uppercase">
                    Lansat 2026
                  </span>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <MotionButton label="Intră în FirmFlow" href={APP_URL} extern />
                  <MotionButton
                    label="Vezi prezentarea"
                    href="/firmflow"
                    varianta="secundar"
                  />
                </div>
              </div>

              {/* rândul 2: ce face, într-o singură frază lată */}
              <p className="max-w-3xl text-[15px] leading-relaxed text-white/90">
                Sistemul de operare al firmei tale: pontaj cu GPS, deviz din
                poze, oferte și facturi generate cu AI — totul într-un singur
                loc. Pentru firmele care au depășit Excel-ul, dar nu au buget de
                SAP.
              </p>

              {/* rândul 3: garanțiile (stânga) + tehnologia (dreapta) */}
              <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <ul className="flex flex-wrap gap-2">
                  {CARD_PILLS.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-krevo-silver"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
                <p className="text-[12px] text-krevo-silver/80 sm:text-right">
                  Construit cu tehnologia folosită de Google și Anthropic.
                </p>
              </div>
            </div>

            {/* ── Jos: produsul viu, pe toată lățimea — scris clar ─────── */}
            <div className="group/pin relative flex flex-col border-t border-white/10 bg-[#0d1117]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#111111] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="ml-3 rounded-md bg-black/60 px-3 py-1 text-[11px] tracking-wide text-white/40">
                  firmflow.ro
                </span>
              </div>
              {/* comutatorul — rândul lui propriu, nu înghesuit în bara de browser */}
              <div className="flex gap-1.5 overflow-x-auto border-b border-white/10 bg-[#0d1117] px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {TABURI.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiv(i)}
                    aria-pressed={activ === i}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold whitespace-nowrap transition-colors ${
                      activ === i
                        ? "bg-[#0066FF]/20 text-[#3399FF] ring-1 ring-[#0066FF]/50"
                        : "text-white/60 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    {t.eticheta}
                  </button>
                ))}
              </div>
              <div
                className="relative aspect-[1635/954] w-full overflow-hidden"
               
              >
                <AnimatePresence mode="wait" initial={false}>
                  {tab.video && tab.src ? (
                    <motion.video
                      key={tab.id}
                      ref={refClip}
                      src={tab.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 h-full w-full ${
                        tab.fit === "cover"
                          ? "object-cover object-top"
                          : "object-contain p-3"
                      }`}
                    />
                  ) : tab.src ? (
                    <motion.img
                      key={tab.id}
                      src={tab.src}
                      alt={tab.alt}
                      loading="lazy"
                      decoding="async"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 h-full w-full ${
                        tab.fit === "cover"
                          ? "object-cover object-top"
                          : "object-contain p-3"
                      }`}
                    />
                  ) : (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <PanouFunctie tab={tab} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* La hover apare doar invitația spre pagina produsului —
                    fără inele, fascicule sau alte efecte peste demo. */}
                <div className="pointer-events-none absolute inset-x-0 top-5 z-20 flex justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
                  <Link
                    href="/firmflow"
                    className="pointer-events-auto relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10 transition-all hover:ring-[#3399FF]/60"
                  >
                    <span className="relative z-20 inline-block py-0.5 text-xs font-bold text-white">
                      Vezi FirmFlow →
                    </span>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#3399FF]/0 via-[#3399FF]/90 to-[#3399FF]/0" />
                  </Link>
                </div>

                {/* legenda produsului, pe imagine — doar peste filmări;
                    panoul de prezentare își spune singur povestea */}
                {tab.src && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pt-10 pb-3">
                    <p className="text-[12.5px] font-medium text-white/85">
                      {tab.legenda}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        </motion.div>

        <p className="mx-auto mt-10 max-w-[680px] text-center text-[15px] leading-relaxed text-krevo-silver">
          Nu îți vând un dashboard frumos. Îți dau un sistem care gândește
          pentru tine — generează oferte, analizează performanța echipei și îți
          spune dimineața ce trebuie să faci azi.
        </p>
      </div>
    </section>
  );
}
