"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PortfolioCurtain } from "./animations/PortfolioCurtain";
import { FirmFlowProductCard } from "./FirmFlowProductCard";

const PLATFORM_LOGIN = "https://buildflow-eight-tan.vercel.app/login";

function FirmFlowBrand({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <span className="text-white">Firm</span>
      <span className="text-[#c9a84c]">Flow</span>
    </span>
  );
}

function GoldPower({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-[#c9a84c]">{children}</strong>;
}

function FadeInOnScroll({ children }: { children: ReactNode }) {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
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
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}

function DemoMedia({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-[#c9a84c] transition-transform duration-300 hover:scale-[1.02]"
      style={{ boxShadow: "0 25px 80px rgba(201,168,76,0.25)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full rounded-2xl"
      />
    </div>
  );
}

function DemoCopy({
  badge,
  title,
  description,
  checks,
  cta,
}: {
  badge: ReactNode;
  title: ReactNode;
  description: ReactNode;
  checks: ReactNode[];
  cta?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-3 py-1 text-[12px] font-semibold text-[#c9a84c]">
        {badge}
      </span>
      <h3 className="mt-4 text-[28px] leading-tight font-bold text-white md:text-[32px]">
        {title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-krevo-silver">
        {description}
      </p>
      <ul className="mt-6 space-y-2.5">
        {checks.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[14px] font-medium text-white"
          >
            <span className="text-[16px] font-bold leading-none text-[#c9a84c]" aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {cta ? (
        <a
          href={PLATFORM_LOGIN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-[#c9a84c] bg-transparent px-6 py-3 text-sm font-semibold text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0a0a0a]"
        >
          Încearcă <GoldPower>7 zile gratuit</GoldPower> →
        </a>
      ) : null}
    </div>
  );
}

function BadgeLabel({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <span className="text-[15px] font-bold text-[#c9a84c]" aria-hidden="true">
        ✓
      </span>
    </>
  );
}

function GoldSeparator() {
  return (
    <div
      className="mx-auto h-px w-full max-w-3xl"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #c9a84c 50%, transparent 100%)",
        boxShadow: "0 0 12px rgba(201,168,76,0.45)",
      }}
      aria-hidden="true"
    />
  );
}

export function Portfolio() {
  return (
    <section
      id="portofoliu"
      className="relative overflow-hidden bg-[#000000] px-6 py-[100px]"
    >
        <div className="relative z-10 mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl font-bold text-white italic md:text-[3.25rem]">
            Ce am{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #c084fc 0%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              construit
            </span>
          </h2>

          <PortfolioCurtain className="mt-20">
            <FirmFlowProductCard quizTheme="purple" />
          </PortfolioCurtain>

          <div className="mt-20 bg-[#000000] py-[80px]">
            <h2 className="text-center text-[32px] font-bold text-white md:text-[36px]">
              <FirmFlowBrand /> în acțiune
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-[16px] text-krevo-silver italic">
              Nu îți cerem să ne crezi pe cuvânt. Uite cum arată.
            </p>

            <div className="mt-16 flex flex-col gap-[100px]">
              {/* ROW 1 — media left */}
              <FadeInOnScroll>
                <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
                  <div className="w-full md:w-[55%]">
                    <DemoMedia
                      src="/gif-oferta.gif.gif"
                      alt="Generare ofertă tehnică în FirmFlow"
                    />
                  </div>
                  <div className="w-full md:w-[45%]">
                    <DemoCopy
                      badge={<BadgeLabel>Funcție reală</BadgeLabel>}
                      title={
                        <>
                          De la <GoldPower>4 ore</GoldPower> la{" "}
                          <GoldPower>30 de secunde</GoldPower>.
                        </>
                      }
                      description={
                        <>
                          Inginerul tău nu mai pierde jumătate din zi cu oferte
                          în Word. Completezi 5 câmpuri — <FirmFlowBrand />{" "}
                          generează oferta tehnică completă cu deviz, etape și
                          garanții. Gata de trimis.
                        </>
                      }
                      checks={[
                        <>
                          Deviz <GoldPower>automat</GoldPower> calculat
                        </>,
                        "Export PDF profesional",
                        "Salvat în istoricul firmei",
                      ]}
                      cta
                    />
                  </div>
                </div>
              </FadeInOnScroll>

              <GoldSeparator />

              {/* ROW 2 — media right */}
              <FadeInOnScroll>
                <div className="flex flex-col items-center gap-10 md:flex-row-reverse md:gap-12">
                  <div className="w-full md:w-[55%]">
                    <DemoMedia
                      src="/gif-dashboard.gif.gif"
                      alt="Dashboard live FirmFlow"
                    />
                  </div>
                  <div className="w-full md:w-[45%]">
                    <DemoCopy
                      badge={<BadgeLabel>Live în timp real</BadgeLabel>}
                      title="Tot ce mișcă în firmă — dintr-o privire."
                      description={
                        <>
                          Dimineața deschizi <FirmFlowBrand /> și știi{" "}
                          <GoldPower>instant</GoldPower>: câți oameni sunt
                          prezenți, ce proiecte sunt active, ce sarcini sunt
                          urgente și ce îți recomandă AI-ul pentru ziua de azi.
                          Fără apeluri. Fără WhatsApp. Fără haos.
                        </>
                      }
                      checks={[
                        "Statistici live actualizate",
                        "AI insight zilnic personalizat",
                        "Acțiuni rapide cu un click",
                      ]}
                    />
                  </div>
                </div>
              </FadeInOnScroll>

              <GoldSeparator />

              {/* ROW 3 — media left */}
              <FadeInOnScroll>
                <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
                  <div className="w-full md:w-[55%]">
                    <DemoMedia
                      src="/gif-muncitor.gif.gif"
                      alt="Interfață muncitor FirmFlow pe telefon"
                    />
                  </div>
                  <div className="w-full md:w-[45%]">
                    <DemoCopy
                      badge={
                        <BadgeLabel>
                          <GoldPower>Zero</GoldPower> training necesar
                        </BadgeLabel>
                      }
                      title={
                        <>
                          Angajatul tău învață în{" "}
                          <GoldPower>5 minute</GoldPower>.
                        </>
                      }
                      description="Muncitorul deschide telefonul și vede 3 butoane mari. Apasă AM VENIT, vede sarcinile lui, cere concediu. Atât. Nu contează dacă are 25 sau 60 de ani — toți se descurcă din prima zi."
                      checks={[
                        "Interfață simplă pe orice telefon",
                        <>
                          GPS verifică prezența{" "}
                          <GoldPower>automat</GoldPower>
                        </>,
                        <>
                          Notificări <GoldPower>instant</GoldPower> pentru
                          sarcini noi
                        </>,
                      ]}
                    />
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            {/* Roles — for every person in the company */}
            <div className="mt-[100px]">
              <h2 className="text-center text-[28px] font-bold text-white md:text-[32px]">
                Un sistem construit pentru fiecare om din firmă.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-[16px] text-krevo-silver italic">
                Nu toți angajații au aceleași nevoi. <FirmFlowBrand /> știe
                asta.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: "👔",
                    title: "Patron & Manager",
                    description: (
                      <>
                        Vede tot. Controlează tot. Dashboard complet cu AI
                        insights zilnice, analize firmă, rapoarte și acces la
                        toate modulele.
                      </>
                    ),
                  },
                  {
                    icon: "📐",
                    title: "Inginer & Maistru",
                    description: (
                      <>
                        Proiecte cu faze, materiale, pontaj GPS și sarcini
                        clare. Tot ce au nevoie pe teren — direct pe telefon.
                      </>
                    ),
                  },
                  {
                    icon: "📊",
                    title: "Economist & Agent",
                    description: (
                      <>
                        Oferte AI generate în{" "}
                        <GoldPower>30 de secunde</GoldPower>, clienți, rapoarte
                        financiare și devize. Fără Excel, fără pierdere de timp.
                      </>
                    ),
                  },
                  {
                    icon: "👷",
                    title: "Muncitor",
                    description: (
                      <>
                        Trei butoane mari. AM VENIT, sarcinile mele, concediu.
                        Simplu ca o aplicație de telefon — funcționează pe orice
                        dispozitiv.
                      </>
                    ),
                  },
                ].map((role) => (
                  <div
                    key={role.title}
                    className="rounded-xl border border-[#c9a84c] bg-[#111111] p-6 transition-[box-shadow] duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                  >
                    <div className="text-[28px] leading-none" aria-hidden="true">
                      {role.icon}
                    </div>
                    <h3 className="mt-3 text-[18px] font-bold text-[#c9a84c]">
                      {role.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-krevo-silver">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-3xl rounded-r-lg border-l-[4px] border-[#c9a84c] bg-[rgba(201,168,76,0.05)] px-5 py-4 text-center text-[17px] italic text-[#c9a84c]">
                ✦ Fiecare rol vede doar ce are nevoie. Nicio confuzie. Nicio
                informație în plus. Exact ce lipsea din platformele generice.
              </p>

              <p className="mx-auto mt-10 flex max-w-[600px] items-start gap-2 border-l-2 border-[#c9a84c] pl-3 text-left text-[12px] text-krevo-silver italic">
                <span className="shrink-0 not-italic" aria-hidden="true">
                  ℹ️
                </span>
                <span>
                  Datele prezentate în demo sunt fictive și au scop exclusiv
                  ilustrativ. Platforma ta va conține datele reale ale firmei
                  tale, personalizată complet după nevoile tale.
                </span>
              </p>
            </div>

            {/* Romania stats */}
            <div className="mt-[100px] bg-[#000000]">
              <p className="text-center text-[16px] text-white">
                Construit în România, pentru firme românești.
              </p>

              <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
                <div className="flex flex-1 flex-col items-center px-6 text-center">
                  <p className="text-[36px] font-bold leading-none text-[#c9a84c]">
                    1
                  </p>
                  <p className="mt-2 text-[13px] text-white">produs lansat</p>
                </div>

                <div
                  className="hidden h-12 w-px bg-[#c9a84c] sm:block"
                  aria-hidden="true"
                />

                <div className="flex flex-1 flex-col items-center px-6 text-center">
                  <p className="text-[36px] font-bold leading-none text-[#c9a84c]">
                    România
                  </p>
                  <p className="mt-2 text-[13px] text-white">Piața țintă</p>
                </div>

                <div
                  className="hidden h-12 w-px bg-[#c9a84c] sm:block"
                  aria-hidden="true"
                />

                <div className="flex flex-1 flex-col items-center px-6 text-center">
                  <p className="text-[36px] font-bold leading-none text-[#c9a84c]">
                    2026
                  </p>
                  <p className="mt-2 text-[13px] text-white">Anul lansării</p>
                </div>
              </div>

              <div
                className="mx-auto mt-10 h-px w-full max-w-md bg-[#c9a84c]/60"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>
  );
}
