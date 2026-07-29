"use client";

import { Bot, Phone, LineChart } from "lucide-react";
import { SlideReveal } from "./animations/SlideReveal";

const comparisons = [
  {
    without: "Ofertă tehnică — 4 ore manual",
    with: "30 secunde AI",
  },
  {
    without: "Apel pierdut — niciodată recuperat",
    with: "Alertă instant + rezumat automat",
  },
  {
    without: "Raport săptămânal — vineri seara manual",
    with: "Generat automat și trimis pe email",
  },
  {
    without: "Știi ce face echipa — 10 apeluri dimineața",
    with: "Dashboard live în timp real",
  },
  {
    without: "Analiza firmei — niciodată sau rar",
    with: "Un click oricând cu recomandări concrete",
  },
];

const examples = [
  {
    title: "Oferte Tehnice AI",
    icon: Bot,
    description:
      "Generează oferte complete din datele proiectului — cantități, prețuri, termene — gata de trimis.",
    sampleLabel: "Snippet ofertă generată",
    sample: `OFERTĂ TEHNICĂ #OP-2847
Proiect: Reabilitare structură — etaj 2
Materiale: listă completă generată
Manoperă: estimare pe etape
Termen: 14 zile lucrătoare
— Generat de Krevo AI în 28s`,
  },
  {
    title: "Apeluri Transcrise",
    icon: Phone,
    description:
      "Fiecare apel important e transcris, rezumat și etichetat — fără să notezi nimic manual.",
    sampleLabel: "Rezumat apel",
    sample: `APEL — Client Popescu · 04:12
• Solicită ofertă pentru gard perimetral
• Scope: perimetru + poartă acces
• Follow-up: joi 10:00
• Sentiment: interesat, urgent
— Alertă trimisă pe dashboard`,
  },
  {
    title: "Analiză Firmă",
    icon: LineChart,
    description:
      "Un click și vezi unde pierzi timp și bani — cu recomandări concrete, nu grafice goale.",
    sampleLabel: "Insight AI",
    sample: `INSIGHT · Săptămâna 12
⚠ 34% din oferte întârzie >48h
→ Automatizează draft-ul AI
↑ Marjă +2.1% pe proiectele tip B
→ Standardizează pachetul manoperă
— Actualizat acum 3 min`,
  },
];

export function AiPower() {
  return (
    <section
      id="puterea-ai"
      className="relative overflow-hidden bg-[#05000f] px-6 py-16 md:py-[100px]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
          <h2 className="text-center text-[26px] leading-tight font-bold text-white sm:text-[32px] md:text-[36px]">
            De la 4 ore de muncă la{" "}
            <span className="section-title-accent">30 de secunde</span>. Asta e
            puterea Krevo.
          </h2>
          <p className="mt-5 text-base text-[#a855f7] italic md:text-lg">
            Nu e magie. E tehnologie construită să lucreze pentru tine.
          </p>
        </header>

        <SlideReveal direction="left">
          <div className="overflow-hidden rounded-2xl border border-[#2d1b69]">
            <div className="hidden border-b border-[#2d1b69] sm:grid sm:grid-cols-2">
              <div className="bg-[#1a0000] px-4 py-3 text-center sm:px-6 sm:py-4">
                <p className="text-sm font-bold tracking-wide text-red-300/90 uppercase sm:text-base">
                  Fără Krevo AI
                </p>
              </div>
              <div className="bg-[#0d0020] px-4 py-3 text-center sm:px-6 sm:py-4">
                <p className="text-sm font-bold tracking-wide text-[#a855f7] uppercase sm:text-base">
                  Cu Krevo AI
                </p>
              </div>
            </div>

            {comparisons.map((row, i) => (
              <div
                key={row.without}
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  i < comparisons.length - 1 ? "border-b border-[#2d1b69]/60" : ""
                }`}
              >
                <div className="bg-[#1a0000]/80 px-4 py-3 text-[13px] leading-snug text-red-200/75 sm:px-6 sm:py-4 sm:text-sm">
                  <span className="mb-1 block text-[10px] font-semibold tracking-wide text-red-300/70 uppercase sm:hidden">
                    Fără Krevo AI
                  </span>
                  {row.without}
                </div>
                <div className="bg-[#0d0020]/90 px-4 py-3 text-[13px] leading-snug text-[#c4b5fd] sm:px-6 sm:py-4 sm:text-sm">
                  <span className="mb-1 block text-[10px] font-semibold tracking-wide text-[#a855f7]/80 uppercase sm:hidden">
                    Cu Krevo AI
                  </span>
                  {row.with}
                </div>
              </div>
            ))}
          </div>
        </SlideReveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-[#2d1b69] px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#a855f7]">
            Claude
          </span>
          <span className="rounded-full border border-[#2d1b69] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/70">
            Next.js
          </span>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {examples.map((ex, i) => {
            const Icon = ex.icon;
            return (
              <SlideReveal
                key={ex.title}
                direction={i === 1 ? "right" : "left"}
                delay={i * 0.08}
              >
                <article className="flex h-full flex-col rounded-2xl border border-[#2d1b69] bg-[#0a0a0a] p-6 transition-colors hover:border-[#7c3aed]">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center text-[#a855f7]">
                    <Icon size={32} strokeWidth={1.5} />
                  </span>
                  <h3 className="text-[16px] font-bold text-white">{ex.title}</h3>
                  <p className="mt-2 text-[13px] leading-snug text-krevo-silver">
                    {ex.description}
                  </p>
                  <div className="mt-5 flex-1 rounded-xl border border-[#7c3aed]/25 bg-[#050508] p-4">
                    <p className="mb-2 text-[10px] tracking-[0.15em] text-[#a855f7]/70 uppercase">
                      {ex.sampleLabel}
                    </p>
                    <pre className="overflow-x-auto font-sans text-[11px] leading-relaxed whitespace-pre-wrap text-[#c4b5fd]/90">
                      {ex.sample}
                    </pre>
                  </div>
                </article>
              </SlideReveal>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center md:mt-16">
          <a
            href="https://firmflow-eight-tan.vercel.app/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xl items-center justify-center rounded-full bg-[#6b21a8] px-5 py-3.5 text-center text-[13px] leading-snug font-bold text-white transition-colors hover:bg-[#7c3aed] hover:shadow-[0_0_28px_rgba(124,58,237,0.4)] sm:px-10 sm:text-base"
          >
            Vrei să vezi AI-ul la lucru în firma ta? Încearcă 7 zile gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
