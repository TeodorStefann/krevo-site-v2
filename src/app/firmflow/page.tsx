"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/krevo/Navbar";
import { HowWeWork } from "@/components/krevo/HowWeWork";
import { NumbersSpeak } from "@/components/krevo/NumbersSpeak";
import { CinematicFooter } from "@/components/krevo/CinematicFooter";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";
import { TitleReveal } from "@/components/krevo/animations/TitleReveal";
import { MotionButton } from "@/components/ui/MotionButton";
import { RezervaCall } from "@/components/krevo/RezervaCall";
import { useClipEconom } from "@/lib/krevo/clipEconom";

const GOLD = "#3399FF";
const APP_URL = "https://firmflow.ro";

/* ————————————————————————————————————————————————————————————————
   Reveal simplu, o singură dată — aceeași mișcare calmă ca pe homepage.
   ———————————————————————————————————————————————————————————————— */
function FadeInOnScroll({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-[opacity,transform] duration-[650ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(26px)",
        transitionDelay: visible ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  );
}

/* ————————————————————————————————————————————————————————————————
   Rama de browser — produsul viu, la fel ca în panoul de pe homepage.
   ———————————————————————————————————————————————————————————————— */
function DemoVideo({
  src,
  alt,
  legenda,
}: {
  src: string;
  alt: string;
  legenda?: string;
}) {
  const refClip = useClipEconom();
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] transition-all duration-300 hover:border-[#3399FF]/40"
      style={{ boxShadow: "0 25px 80px rgba(0,102,255,0.14)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#111111] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="ml-3 rounded-md bg-black/60 px-3 py-0.5 text-[10.5px] tracking-wide text-white/40">
          firmflow.ro
        </span>
      </div>
      <div className="relative">
        <video
          ref={refClip}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
          className="block h-auto w-full"
        />
        {legenda && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pt-8 pb-2.5">
            <p className="text-[12px] font-medium text-white/85">{legenda}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————————
   Funcțiile, în ordinea în care conving: întâi cele pe care nu le are
   nimeni, apoi controlul zilnic.
   ———————————————————————————————————————————————————————————————— */
/* REGULA: `src` se pune DOAR când clipul chiar există în /public/clipuri.
   Un rând fără clip primește panoul de prezentare (aceeași ramă de browser),
   nu un player negru gol. Când filmezi un clip: pui fișierul și adaugi
   `src` + `legenda` la rândul lui. */
const DEMO_ROWS: Array<{
  src?: string;
  alt: string;
  legenda?: string;
  badge: string;
  title: string;
  description: string;
  checks: readonly string[];
}> = [
  {
    src: "/clipuri/oferta-ai.mp4",
    alt: "Ofertă tehnică generată cu AI în FirmFlow",
    legenda: "Ofertă tehnică completă, cu deviz estimativ și etape.",
    badge: "Generată cu AI",
    title: "De la o zi de lucru, la o cafea.",
    description:
      "Completezi datele lucrării și ale clientului — FirmFlow scrie oferta tehnică întreagă: obiectul lucrării, specificații, etape de execuție, deviz estimativ, condiții și garanții. O verifici, o exporți în PDF, o trimiți.",
    checks: [
      "Deviz estimativ calculat automat",
      "Export PDF cu identitatea firmei tale",
      "Salvată în istoricul firmei, cu tot cu PDF",
    ],
  },
  {
    src: "/clipuri/factura.mp4",
    alt: "Factură emisă direct din deviz în FirmFlow",
    legenda: "Un click — factura preia liniile devizului.",
    badge: "Zero muncă dublă",
    title: "Factura se face singură, din deviz.",
    description:
      "Nu mai copiezi linii dintr-un document în altul. Alegi devizul, FirmFlow preia pozițiile, cantitățile și prețurile, iar factura iese numerotată automat, cu datele firmei, gata de trimis.",
    checks: [
      "Liniile preluate automat din deviz",
      "Numerotare automată, după regimul tău",
      "PDF + XML e-Factura, gata de trimis la ANAF",
    ],
  },
  {
    src: "/clipuri/dashboard.mp4",
    alt: "Dashboardul patronului în FirmFlow",
    legenda: "Situația firmei, în fiecare dimineață.",
    badge: "Live, în timp real",
    title: "Tot ce mișcă în firmă — dintr-o privire.",
    description:
      "Dimineața deschizi FirmFlow și știi instant: câți oameni sunt prezenți, ce proiecte sunt active, ce e urgent și unde pierzi bani. Fără apeluri, fără grupuri de WhatsApp, fără haos.",
    checks: [
      "Prezența și proiectele, live",
      "Alertele urgente, sus, unde le vezi",
      "Acțiuni rapide dintr-un singur click",
    ],
  },
  {
    src: "/clipuri/pontaj-muncitor.mp4",
    alt: "Pontajul muncitorului în FirmFlow — un singur buton",
    legenda: "Ce vede muncitorul: un buton. Apasă, GPS-ul confirmă, gata.",
    badge: "Cu dovadă GPS",
    title: "Știi cine e pe teren. Cu dovadă.",
    description:
      "Muncitorul are un singur buton pe telefon: AM VENIT. GPS-ul confirmă că e la locație, iar tu vezi în timp real cine e prezent, cine lipsește și cum arată ultimele 7 zile — om cu om. Foaia de prezență se exportă cu un click.",
    checks: [
      "Verificare GPS la fiecare pontare",
      "Istoric pe 7 zile, pentru fiecare om",
      "Foaie colectivă de prezență, exportabilă",
    ],
  },
];

/* Rândurile fără filmare încă: aceeași ramă de browser, dar cu funcția
   prezentată — nu un player negru gol. */
function DemoPanou({ mesaj }: { mesaj: string }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] transition-all duration-300 hover:border-[#3399FF]/40"
      style={{ boxShadow: "0 25px 80px rgba(0,102,255,0.14)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#111111] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
        <span className="ml-3 rounded-md bg-black/60 px-3 py-0.5 text-[10.5px] tracking-wide text-white/40">
          firmflow.ro
        </span>
      </div>
      <div
        className="relative flex min-h-[280px] items-center justify-center px-6 py-14 md:min-h-[340px]"
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
        <div className="relative max-w-lg text-center">
          <p className="text-[24px] leading-snug font-bold text-white md:text-[30px]">
            {mesaj}
          </p>
          <p className="mt-4 text-[13px] text-white/45">
            Filmarea din aplicație vine în curând — până atunci vezi funcția
            live, în proba gratuită de 5 zile.
          </p>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_FAQS = [
  {
    question: "Cât durează până îl folosim?",
    answer:
      "Din prima zi. Începem cu o probă de 5 zile configurată împreună, pe datele firmei tale — iar instruirea echipei durează 30 de minute.",
  },
  {
    question: "Funcționează pe orice telefon?",
    answer:
      "Da, inclusiv pe telefoane mai vechi. Se instalează ca aplicație, iar pentru muncitori accesul se trimite direct pe WhatsApp.",
  },
  {
    question: "Ce se întâmplă cu datele dacă renunț?",
    answer:
      "Datele rămân ale tale, punct. Contul rămâne dezactivat 90 de zile — nu se șterge — și poți exporta oricând tot ce ai introdus.",
  },
] as const;

export default function FirmFlowPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen text-krevo-body selection:bg-[#3399FF]/30 selection:text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 76% at 50% 46%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 44%, rgba(0,0,0,0.10) 80%, rgba(0,0,0,0) 100%), linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.70) 100%), url('/bg-firmflow-page.jpg') center / cover no-repeat #000",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <NoiseOverlay />
        <Navbar />
        <main className="pt-24">
          {/* ── Hero: promisiunea + produsul viu, imediat ──────────────── */}
          <section className="relative px-6 pt-16 pb-10 md:pt-24">
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(760px 420px at 50% 0%, rgba(0,102,255,0.10), transparent 65%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <p className="mb-4 text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">
                Produsul Krevo
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Image
                  src="/firmflow-logo.png"
                  alt="FirmFlow logo"
                  width={64}
                  height={64}
                  className="h-14 w-auto object-contain md:h-16"
                  priority
                />
                <h1 className="font-serif text-5xl font-bold md:text-6xl">
                  <span className="text-white">Firm</span>
                  <span style={{ color: GOLD }}>Flow</span>
                </h1>
              </div>
              <h2 className="mx-auto mt-6 max-w-2xl text-[24px] leading-tight font-bold text-white md:text-[32px]">
                <TitleReveal
                  text="Sistemul de operare al firmei tale."
                  accentLast
                />
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-krevo-silver">
                Pontaj cu GPS, deviz din poze, oferte și facturi generate cu AI
                — totul într-un singur loc, pe telefon și pe laptop. Pentru
                firme de construcții, instalații și inginerie care au depășit
                Excel-ul, dar nu au buget de SAP.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MotionButton label="Intră în FirmFlow" href={APP_URL} extern />
                <RezervaCall context="De pe pagina FirmFlow" />
              </div>
              <p className="mt-6 text-[12.5px] text-krevo-silver/80">
                Probă de 5 zile pe datele firmei tale · Fără card
              </p>
              {/* Ușa de mijloc: cine nu e pregătit să vorbească sau să intre
                  în aplicație primește întâi cifra care doare — calculatorul
                  de pierdere de pe firmflow.ro. */}
              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
                <a
                  href="https://firmflow.ro/cat-costa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#3399FF] transition-colors hover:text-white"
                >
                  Calculează cât pierde firma ta fără sistem
                  <span aria-hidden="true">→</span>
                </a>
                {/* Prezentarea oficială — pentru cine vrea să o citească în
                    liniște sau să o arate asociatului. */}
                <a
                  href="/FirmFlow-Prezentare.pdf"
                  download
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#3399FF] transition-colors hover:text-white"
                >
                  Descarcă prezentarea (PDF)
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            {/* Dovada, imediat sub promisiune: funcția unică, în mișcare */}
            <FadeInOnScroll delay={0.1}>
              <div className="relative z-10 mx-auto mt-12 max-w-6xl">
                <div className="mb-4 flex flex-col items-center gap-2 text-center">
                  <span className="inline-flex items-center rounded-full border border-[#3399FF]/40 bg-[#3399FF]/10 px-3 py-1 text-[12px] font-semibold text-[#3399FF]">
                    Unic pe piață
                  </span>
                  <p className="text-[20px] font-bold text-white md:text-[24px]">
                    Trimiți 3 poze de pe teren. Primești devizul complet.
                  </p>
                </div>
                <DemoVideo
                  src="/clipuri/deviz-poze.mp4"
                  alt="Deviz generat cu AI din fotografii de șantier, în FirmFlow"
                  legenda="Din 3 poze — deviz complet, cu totaluri cu TVA, în sub un minut. Filmare reală din aplicație."
                />
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                  {[
                    "Cantități estimate direct din imagini",
                    "Totaluri cu TVA gata calculate",
                    "Editezi orice linie înainte de trimitere",
                  ].map((c) => (
                    <p
                      key={c}
                      className="flex items-center gap-2 text-[13.5px] font-medium text-white/85"
                    >
                      <span
                        className="font-bold text-[#3399FF]"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </section>

          {/* ── Funcțiile, una câte una ─────────────────────────────────── */}
          <section className="px-6 py-20 md:py-[110px]">
            <div className="mx-auto max-w-7xl">
              <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">
                Funcțiile
              </p>
              <h2 className="text-center text-[28px] leading-tight font-bold text-white sm:text-[34px]">
                <TitleReveal text="Vezi platforma în acțiune." accentLast />
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center text-[14.5px] text-krevo-silver">
                Toate filmările de mai jos sunt din aplicația reală — nu
                machete, nu montaje de prezentare.
              </p>

              <div className="mt-16 flex flex-col gap-20 md:gap-[110px]">
                {DEMO_ROWS.map((row) => (
                  <FadeInOnScroll key={row.title} delay={0.05}>
                    <div className="mx-auto max-w-5xl">
                      {/* textul sus, clipul mare dedesubt — scrisul din
                          aplicație rămâne la dimensiune aproape naturală */}
                      <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-2xl">
                          <span className="inline-flex items-center rounded-full border border-[#3399FF]/40 bg-[#3399FF]/10 px-3 py-1 text-[12px] font-semibold text-[#3399FF]">
                            {row.badge}
                          </span>
                          <h3 className="mt-3 text-[24px] leading-tight font-bold text-white md:text-[29px]">
                            {row.title}
                          </h3>
                          <p className="mt-3 text-[14.5px] leading-relaxed text-krevo-silver">
                            {row.description}
                          </p>
                        </div>
                        <ul className="shrink-0 space-y-2">
                          {row.checks.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-[13.5px] font-medium text-white"
                            >
                              <span
                                className="text-[15px] leading-none font-bold text-[#3399FF]"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {row.src ? (
                        <DemoVideo
                          src={row.src}
                          alt={row.alt}
                          legenda={row.legenda}
                        />
                      ) : (
                        <DemoPanou mesaj={row.legenda ?? row.title} />
                      )}
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>

              {/* Linia de garanții */}
              <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0">
                <p className="px-4 text-[13px] text-white">
                  Probă de 5 zile, pe datele tale
                </p>
                <span
                  className="hidden h-4 w-px bg-[#3399FF]/50 sm:block"
                  aria-hidden="true"
                />
                <p className="px-4 text-[13px] text-white">Fără card de credit</p>
                <span
                  className="hidden h-4 w-px bg-[#3399FF]/50 sm:block"
                  aria-hidden="true"
                />
                <p className="px-4 text-[13px] text-white">
                  Suport direct pe WhatsApp
                </p>
              </div>

              {/* Mini FAQ */}
              <div className="mx-auto mt-14 max-w-2xl space-y-3">
                {PRODUCT_FAQS.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={item.question}
                      className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                        isOpen
                          ? "border-[#3399FF]/35 bg-white/[0.045]"
                          : "border-white/10 bg-white/[0.025] hover:border-white/20"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq((current) =>
                            current === index ? null : index,
                          )
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-[14.5px] font-semibold text-white">
                          {item.question}
                        </span>
                        <Plus
                          size={18}
                          className={`shrink-0 text-[#3399FF] transition-transform duration-300 ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="px-5 pt-0 pb-4 text-[14px] leading-relaxed text-krevo-silver">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <HowWeWork theme="blue" />
          <NumbersSpeak theme="blue" />

          {/* ── Invitația finală ────────────────────────────────────────── */}
          <section className="px-6 pt-4 pb-20 md:pt-6 md:pb-[110px]">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-[30px] leading-tight font-bold text-white sm:text-[40px]">
                <TitleReveal text="Hai să-l vezi mergând în firma ta." accentLast />
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-krevo-silver">
                O discuție de 15 minute, apoi 5 zile de probă cu proiectele,
                oamenii și devizele tale reale. Decizi cu aplicația în mână.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <RezervaCall
                  context="Finalul paginii FirmFlow"
                  varianta="principal"
                />
                <MotionButton
                  label="Scrie-mi un mesaj"
                  href="/#contact"
                  varianta="secundar"
                />
              </div>
              <p className="mt-6 text-[12.5px] text-krevo-silver/70">
                Online, fără deplasare. Îți spun dacă merită sau nu în firma ta.
              </p>
            </div>
          </section>

          {/* Legal compliance strip */}
          <section className="border-t border-[#3399FF]/20 px-6 py-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[12px] leading-relaxed text-krevo-silver italic">
                Datele prezentate sunt fictive și au scop exclusiv demonstrativ.{" "}
                <Link
                  href="/termeni"
                  className="text-[#3399FF] underline-offset-2 transition-colors hover:text-white hover:underline"
                >
                  Termeni și condiții
                </Link>
                {" · "}
                <Link
                  href="/confidentialitate"
                  className="text-[#3399FF] underline-offset-2 transition-colors hover:text-white hover:underline"
                >
                  Politică de confidențialitate
                </Link>
              </p>
              <div className="mt-4 flex flex-col items-center justify-center gap-2 text-[11px] text-krevo-silver sm:flex-row sm:gap-4">
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#3399FF]"
                >
                  SAL — Soluționarea alternativă a litigiilor (ANPC)
                </a>
                {/* Platforma ODR a UE a fost desființată în iulie 2025 —
                    linkul spre ea era mort, rămâne doar SAL/ANPC. */}
              </div>
            </div>
          </section>
        </main>
        <CinematicFooter />
      </div>
    </div>
  );
}
