"use client";

import { PortfolioCurtain } from "./animations/PortfolioCurtain";

const PLATFORM_LOGIN_HREF = "https://buildflow-eight-tan.vercel.app/login";

const CARD_PILLS = [
  "🔒 Date securizate",
  "📱 Funcționează pe telefon",
  "🤖 AI integrat nativ",
];

export function Portfolio() {
  return (
    <section
      id="portofoliu"
      className="relative overflow-hidden bg-[#000000] px-6 py-20 md:py-[120px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,102,255,0.02) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-[28px] font-bold text-white italic sm:text-4xl md:text-[3.25rem]">
          Ce am <span className="section-title-accent">construit</span>
        </h2>

        <PortfolioCurtain className="mt-12 md:mt-14">
          <article className="mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] border border-[#0066FF] bg-[#0a0a0a] p-8 text-center transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,102,255,0.3)] md:p-12">
            <span className="rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#3399FF] uppercase">
              Lansat 2026
            </span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/firmflow-logo.png"
              alt=""
              loading="lazy"
              decoding="async"
              className="mt-6 h-[60px] w-auto object-contain"
              aria-hidden="true"
            />

            <h3 className="mt-5 font-serif text-[36px] leading-none font-bold md:text-[48px]">
              <span className="text-white">Firm</span>
              <span className="text-[#0066FF]">Flow</span>
            </h3>

            <p className="mt-5 text-[15px] leading-relaxed text-white">
              FirmFlow este sistemul de operare al firmei tale. Pontaj cu GPS,
              proiecte cu faze, sarcini cu confirmare, oferte generate cu AI în
              30 de secunde — totul într-un singur loc.
            </p>

            <p className="mt-4 text-[14px] leading-relaxed text-krevo-silver italic">
              Construit specific pentru firme din România cu 5-50 de angajați
              care vor mai mult decât Excel.
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {CARD_PILLS.map((pill) => (
                <li
                  key={pill}
                  className="rounded-full border border-[#0066FF] px-3 py-1 text-[12px] text-krevo-silver"
                >
                  {pill}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-center text-[12px] leading-relaxed text-krevo-silver italic">
              Construit cu tehnologia folosită de Google și Anthropic.
            </p>

            <a
              href={PLATFORM_LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0066FF] px-10 py-4 text-[18px] font-bold text-white transition-colors hover:bg-[#0052CC] sm:w-auto"
            >
              Vezi platforma →
            </a>
          </article>
        </PortfolioCurtain>

        <figure className="mx-auto mt-12 max-w-[800px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gif-oferta.gif"
            alt="Generare ofertă tehnică în FirmFlow"
            loading="lazy"
            decoding="async"
            className="w-full rounded-[16px] border border-[#0066FF]"
          />
          <figcaption className="mt-4 text-center text-[14px] text-krevo-silver italic">
            Ofertă tehnică completă — generată cu AI în 30 de secunde.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
