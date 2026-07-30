"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import { Navbar } from "@/components/krevo/Navbar";
import { HowWeWork } from "@/components/krevo/HowWeWork";
import { NumbersSpeak } from "@/components/krevo/NumbersSpeak";
import { Footer } from "@/components/krevo/Footer";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";
import { FirmFlowProductCard } from "@/components/krevo/FirmFlowProductCard";

const GOLD = "#c9a84c";

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
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-[opacity,transform] duration-[600ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: visible ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  );
}

const PRODUCT_FAQS = [
  {
    question: "Cât durează configurarea?",
    answer: "30 de minute. Ne ocupăm noi de tot.",
  },
  {
    question: "Funcționează pe orice telefon?",
    answer: "Da. Inclusiv pe telefoane mai vechi.",
  },
  {
    question: "Ce se întâmplă cu datele dacă renunț?",
    answer: "Datele rămân ale tale. Le poți exporta oricând.",
  },
] as const;

function DemoGif({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-[#c9a84c] transition-transform duration-300 hover:scale-[1.02]"
      style={{ boxShadow: "0 25px 80px rgba(201,168,76,0.2)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-2xl"
      />
    </div>
  );
}

function DemoText({
  badge,
  title,
  description,
  checks,
}: {
  badge: string;
  title: string;
  description: string;
  checks: string[];
}) {
  return (
    <div className="flex flex-col justify-center">
      <span className="inline-flex w-fit items-center rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-3 py-1 text-[12px] font-semibold text-[#c9a84c]">
        {badge}
      </span>
      <h3 className="mt-4 text-[28px] leading-tight font-bold text-white md:text-[32px]">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-krevo-silver">
        {description}
      </p>
      <ul className="mt-6 space-y-2.5">
        {checks.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[14px] font-medium text-white"
          >
            <span
              className="text-[16px] font-bold leading-none text-[#c9a84c]"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FirmFlowPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-krevo-body selection:bg-[#c9a84c]/30 selection:text-white">
      <NoiseOverlay />
      <Navbar />
      <main className="pt-24">
        <section className="px-6 py-20 md:py-[120px]">
          <div className="mx-auto max-w-6xl text-center">
            <p
              className="text-xs font-medium tracking-[0.3em] uppercase"
              style={{ color: GOLD }}
            >
              Produs
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Image
                src="/firmflow-logo.png"
                alt="FirmFlow"
                width={80}
                height={80}
                className="h-20 w-auto object-contain"
                priority
              />
              <h1 className="font-serif text-5xl font-bold md:text-6xl">
                <span className="text-white">Firm</span>
                <span style={{ color: GOLD }}>Flow</span>
              </h1>
            </div>
            <p className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2 text-[13px] text-krevo-silver italic md:items-center">
              <Info
                size={16}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 md:mt-0"
                style={{ color: GOLD }}
                aria-hidden="true"
              />
              <span>
                Datele prezentate sunt fictive și au scop demonstrativ.
                Platforma ta va fi personalizată complet după nevoile firmei
                tale.
              </span>
            </p>
          </div>
        </section>

        <section className="px-6 pb-8 md:pb-12">
          <div className="mx-auto max-w-6xl">
            <FirmFlowProductCard
              navigateOnClick={false}
              accessHref="https://firmflow-eight-tan.vercel.app/login"
              quizTheme="gold"
            />
          </div>
        </section>

        <section className="bg-[#0a0a0a] px-6 py-20 md:py-[120px]">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-[28px] font-bold text-white">
              Vezi platforma în{" "}
              <span style={{ color: GOLD }}>acțiune</span>
            </h2>
            <div
              className="mx-auto mt-3 h-px w-[60px]"
              style={{ background: GOLD }}
              aria-hidden="true"
            />

            <div className="mt-16 flex flex-col gap-20 md:gap-[100px]">
              {/* ROW 1 — media left */}
              <FadeInOnScroll delay={0}>
                <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
                  <div className="w-full md:w-[55%]">
                    <DemoGif
                      src="/gif-oferta.gif"
                      alt="Generare ofertă tehnică în FirmFlow"
                    />
                  </div>
                  <div className="w-full md:w-[45%]">
                    <DemoText
                      badge="Funcție reală ✓"
                      title="De la 4 ore la 30 de secunde."
                      description="Inginerul tău nu mai pierde jumătate din zi cu oferte în Word. Completezi 5 câmpuri — FirmFlow generează oferta tehnică completă cu deviz, etape și garanții. Gata de trimis."
                      checks={[
                        "Deviz automat calculat",
                        "Export PDF profesional",
                        "Salvat în istoricul firmei",
                      ]}
                    />
                  </div>
                </div>
              </FadeInOnScroll>

              {/* ROW 2 — media right */}
              <FadeInOnScroll delay={0.1}>
                <div className="flex flex-col items-center gap-10 md:flex-row-reverse md:gap-12">
                  <div className="w-full md:w-[55%]">
                    <DemoGif
                      src="/gif-dashboard.gif"
                      alt="Dashboard live FirmFlow"
                    />
                  </div>
                  <div className="w-full md:w-[45%]">
                    <DemoText
                      badge="Live în timp real ✓"
                      title="Tot ce mișcă în firmă — dintr-o privire."
                      description="Dimineața deschizi FirmFlow și știi instant: câți oameni sunt prezenți, ce proiecte sunt active, ce sarcini sunt urgente și ce îți recomandă AI-ul pentru ziua de azi. Fără apeluri. Fără WhatsApp. Fără haos."
                      checks={[
                        "Statistici live actualizate",
                        "AI insight zilnic personalizat",
                        "Acțiuni rapide cu un click",
                      ]}
                    />
                  </div>
                </div>
              </FadeInOnScroll>

              {/* ROW 3 — media left */}
              <FadeInOnScroll delay={0.2}>
                <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
                  <div className="w-full md:w-[55%]">
                    <DemoGif
                      src="/gif-muncitor.gif"
                      alt="Interfață muncitor FirmFlow pe telefon"
                    />
                  </div>
                  <div className="w-full md:w-[45%]">
                    <DemoText
                      badge="Zero training necesar ✓"
                      title="Angajatul tău învață în 5 minute."
                      description="Muncitorul deschide telefonul și vede 3 butoane mari. Apasă AM VENIT, vede sarcinile lui, cere concediu. Atât. Nu contează dacă are 25 sau 60 de ani — toți se descurcă din prima zi."
                      checks={[
                        "Interfață simplă pe orice telefon",
                        "GPS verifică prezența automat",
                        "Notificări instant pentru sarcini noi",
                      ]}
                    />
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            {/* Guarantee bar */}
            <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-0">
              <p className="flex items-center gap-2 px-4 text-[13px] text-white">
                <span className="text-[#c9a84c]" aria-hidden="true">
                  🔒
                </span>
                Fără card de credit
              </p>
              <span
                className="hidden h-4 w-px bg-[#c9a84c]/50 sm:block"
                aria-hidden="true"
              />
              <p className="flex items-center gap-2 px-4 text-[13px] text-white">
                <span className="text-[#c9a84c]" aria-hidden="true">
                  ✓
                </span>
                7 zile complet gratuit
              </p>
              <span
                className="hidden h-4 w-px bg-[#c9a84c]/50 sm:block"
                aria-hidden="true"
              />
              <p className="flex items-center gap-2 px-4 text-[13px] text-white">
                <span className="text-[#c9a84c]" aria-hidden="true">
                  📞
                </span>
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
                    className="overflow-hidden rounded-xl border border-[#c9a84c]/35 bg-[#111111]"
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
                      <span className="text-[14px] font-semibold text-white">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#c9a84c] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
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
                        <p className="border-t border-[#c9a84c]/20 px-5 pb-4 pt-3 text-[14px] leading-relaxed text-krevo-silver">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Testimonial placeholder */}
            <div className="relative mx-auto mt-14 max-w-xl rounded-2xl border border-dashed border-[#c9a84c]/60 bg-[#111111]/80 px-8 py-10 text-center">
              <span
                className="pointer-events-none absolute top-4 left-6 font-serif text-6xl leading-none text-[#c9a84c]/80"
                aria-hidden="true"
              >
                „
              </span>
              <span
                className="pointer-events-none absolute right-6 bottom-4 font-serif text-6xl leading-none text-[#c9a84c]/80"
                aria-hidden="true"
              >
                ”
              </span>
              <p className="relative z-10 mt-2 text-[15px] text-[#888888] italic">
                Primul testimonial vine curând.
              </p>
            </div>

            <div className="mt-16 flex justify-center">
              <a
                href="https://firmflow-eight-tan.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-[400px] items-center justify-center rounded-full bg-[#c9a84c] px-8 py-4 text-center text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#d4b85c] sm:text-base"
              >
                Încearcă FirmFlow — 7 zile gratuit →
              </a>
            </div>
          </div>
        </section>

        <HowWeWork theme="gold" />
        <NumbersSpeak theme="gold" />

        {/* Legal compliance strip */}
        <section className="border-t border-[#c9a84c]/20 bg-[#0a0a0a] px-6 py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[12px] leading-relaxed text-krevo-silver italic">
              Datele prezentate sunt fictive și au scop exclusiv demonstrativ.{" "}
              <Link
                href="/termeni"
                className="text-[#c9a84c] underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                Termeni și condiții
              </Link>
              {" · "}
              <Link
                href="/confidentialitate"
                className="text-[#c9a84c] underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                Politică de confidențialitate
              </Link>
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-2 text-[11px] text-krevo-silver sm:flex-row sm:gap-4">
              <a
                href="https://anpc.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#c9a84c]"
              >
                Soluționarea online a litigiilor — ANPC
              </a>
              <span className="hidden text-[#c9a84c]/40 sm:inline" aria-hidden="true">
                ·
              </span>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#c9a84c]"
              >
                Platforma ODR UE
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
