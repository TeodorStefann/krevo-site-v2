"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, RotateCcw, Sparkles, Tag } from "lucide-react";
import { MotionButton } from "@/components/ui/MotionButton";
import { PearlButton } from "@/components/ui/PearlButton";
import { RezervaCall } from "./RezervaCall";
import {
  DOMENII,
  DURERI,
  SOLUTII,
  compuneIntro,
  type DomeniuId,
  type DurereId,
} from "@/lib/krevo/diagnostic";

const kicker =
  "text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase";

const usor = [0.22, 1, 0.36, 1] as const;

/* ── Un buton de alegere. Mare, evident, imposibil de ratat pe telefon ── */
function Alegere({
  eticheta,
  activ,
  onClick,
  index,
}: {
  eticheta: string;
  activ: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={activ}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: usor }}
      className={`group relative flex min-h-[64px] items-center gap-3.5 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
        activ
          ? "border-[#0066FF] bg-[#0066FF]/12 shadow-[0_0_34px_rgba(0,102,255,0.22)]"
          : "border-[#0F2647] bg-[#07090F] hover:border-[#0066FF]/55 hover:bg-[#0A0D16]"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
          activ
            ? "border-[#0066FF] bg-[#0066FF]"
            : "border-[#1B3A66] bg-transparent group-hover:border-[#3399FF]/70"
        }`}
        aria-hidden="true"
      >
        <Check
          className={`h-3.5 w-3.5 transition-opacity duration-200 ${
            activ ? "opacity-100 text-white" : "opacity-0"
          }`}
          strokeWidth={3}
        />
      </span>
      <span
        className={`text-[15px] leading-snug font-medium transition-colors duration-300 md:text-base ${
          activ ? "text-white" : "text-krevo-body group-hover:text-white"
        }`}
      >
        {eticheta}
      </span>
    </motion.button>
  );
}

/* ── Un pas al diagnosticului ─────────────────────────────────────────── */
function Pas({
  numar,
  intrebare,
  children,
}: {
  numar: number;
  intrebare: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-[13px] font-bold text-[#3399FF]/70">
          0{numar}
        </span>
        <h2 className="font-serif text-[22px] font-bold text-white md:text-[26px]">
          {intrebare}
        </h2>
      </div>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function Diagnostic() {
  const [domeniu, setDomeniu] = useState<DomeniuId | null>(null);
  const [durere, setDurere] = useState<DurereId | null>(null);

  const refPas2 = useRef<HTMLDivElement>(null);
  const refRaspuns = useRef<HTMLDivElement>(null);

  /* Ducem omul la pasul următor, ca să nu creadă că nu s-a întâmplat nimic */
  useEffect(() => {
    if (domeniu && !durere) {
      refPas2.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [domeniu, durere]);

  useEffect(() => {
    if (domeniu && durere) {
      const t = setTimeout(
        () =>
          refRaspuns.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        220,
      );
      return () => clearTimeout(t);
    }
  }, [domeniu, durere]);

  const obiectDomeniu = DOMENII.find((d) => d.id === domeniu) ?? null;
  const obiectDurere = DURERI.find((d) => d.id === durere) ?? null;
  const solutie = durere ? SOLUTII[durere] : null;

  const contextProgramare =
    obiectDomeniu && obiectDurere
      ? `${obiectDomeniu.eticheta} — ${obiectDurere.eticheta}`
      : undefined;

  function reia() {
    setDomeniu(null);
    setDurere(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* ── Deschiderea ───────────────────────────────────────────────── */}
      <div className="pt-28 pb-4 text-center md:pt-32">
        <p className={kicker}>Diagnostic în 30 de secunde</p>
        <h1 className="mt-5 font-serif text-[34px] leading-[1.08] font-bold text-white md:text-[52px]">
          Nu știi de unde să începi?{" "}
          <span className="section-title-accent">Normal.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-krevo-body md:text-[17px]">
          Nimeni nu se trezește dimineața știind ce software îi trebuie. Știe
          doar ce îl enervează. Răspunde la două întrebări și îți spun exact ce
          ți se potrivește. Fără să vorbim cu cineva, fără să lași vreo adresă
          de email.
        </p>
      </div>

      {/* ── Pașii ─────────────────────────────────────────────────────── */}
      <div className="mt-12 space-y-12 md:mt-16">
        <Pas numar={1} intrebare="Cu ce se ocupă firma ta?">
          {DOMENII.map((d, i) => (
            <Alegere
              key={d.id}
              eticheta={d.eticheta}
              activ={domeniu === d.id}
              index={i}
              onClick={() => setDomeniu(d.id)}
            />
          ))}
        </Pas>

        <div ref={refPas2}>
          <AnimatePresence>
            {domeniu && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: usor }}
              >
                <Pas numar={2} intrebare="Ce te enervează cel mai tare?">
                  {DURERI.map((d, i) => (
                    <Alegere
                      key={d.id}
                      eticheta={d.eticheta}
                      activ={durere === d.id}
                      index={i}
                      onClick={() => setDurere(d.id)}
                    />
                  ))}
                </Pas>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Răspunsul, compus în fața lui ─────────────────────────────── */}
      <div ref={refRaspuns} className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {solutie && obiectDomeniu && obiectDurere && (
            <motion.section
              key={`${domeniu}-${durere}`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: usor }}
              className="mt-14 border-t border-[#0F2647] pt-12 md:mt-16"
              aria-live="polite"
            >
              <p className={kicker}>
                {compuneIntro(obiectDomeniu, obiectDurere)}
              </p>

              <h2 className="mt-4 font-serif text-[28px] leading-[1.14] font-bold text-white md:text-[40px]">
                {solutie.titlu}
              </h2>

              {/* oglinda — fraza în care se recunoaște */}
              <p className="mt-6 border-l-2 border-[#0066FF]/60 pl-5 text-[16px] leading-relaxed text-krevo-body italic md:text-[17px]">
                {solutie.oglinda}
              </p>

              {/* cele trei module */}
              <div className="mt-12 grid gap-3.5 md:grid-cols-3">
                {solutie.module.map((m, i) => (
                  <motion.div
                    key={m.nume}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 + i * 0.09, ease: usor }}
                    className="spotlight-card rounded-2xl border border-[#0F2647] bg-[#07090F] p-6"
                  >
                    <span className="font-serif text-[12px] font-bold text-[#3399FF]/60">
                      0{i + 1}
                    </span>
                    <h3 className="mt-2.5 text-[17px] font-bold text-white">
                      {m.nume}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-krevo-silver">
                      {m.descriere}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* exemplul pe domeniul lui */}
              <div className="mt-3.5 flex items-start gap-3.5 rounded-2xl border border-[#0066FF]/25 bg-[#0066FF]/[0.07] p-6">
                <Sparkles
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#3399FF]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="text-[15px] leading-relaxed text-krevo-body">
                  <span className="font-semibold text-white">
                    Concret, la tine:{" "}
                  </span>
                  {solutie.exemple[obiectDomeniu.id]}
                </p>
              </div>

              {/* câștig + preț */}
              <div className="mt-3.5 grid gap-3.5 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-6">
                  <div className="flex items-center gap-2.5">
                    <Clock
                      className="h-4 w-4 text-emerald-400"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-[11.5px] font-semibold tracking-[0.18em] text-emerald-400/80 uppercase">
                      Ce câștigi
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-[26px] font-bold text-emerald-300 md:text-[30px]">
                    {solutie.castig}
                  </p>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-krevo-silver">
                    {solutie.castigDetaliu}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#0F2647] bg-[#07090F] p-6">
                  <div className="flex items-center gap-2.5">
                    <Tag
                      className="h-4 w-4 text-[#3399FF]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-[11.5px] font-semibold tracking-[0.18em] text-[#3399FF]/70 uppercase">
                      Cât costă
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-[20px] leading-snug font-bold text-white md:text-[22px]">
                    {solutie.pret}
                  </p>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-krevo-silver">
                    {solutie.pretDetaliu}
                  </p>
                </div>
              </div>

              {/* dovada video — exact funcția discutată, nu un clip generic */}
              {solutie.clip && (
                <figure className="mt-3.5 overflow-hidden rounded-2xl border border-[#0F2647] bg-[#07090F]">
                  <video
                    key={solutie.clip}
                    src={solutie.clip}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="mx-auto block max-h-[62vh] w-full object-contain"
                  />
                  <figcaption className="border-t border-[#0F2647] px-6 py-4 text-[13px] text-krevo-silver">
                    Nu e o simulare — e chiar aplicația, filmată în timp real.
                  </figcaption>
                </figure>
              )}

              {/* închiderea */}
              <div className="mt-16 rounded-3xl border border-[#0F2647] bg-gradient-to-b from-[#080B12] to-[#05070C] px-6 py-14 text-center md:px-14">
                <h3 className="font-serif text-[24px] leading-tight font-bold text-white md:text-[32px]">
                  Un sfert de oră, și știi exact{" "}
                  <span className="section-title-accent">cât te costă</span>{" "}
                  și cât durează.
                </h3>
                <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-krevo-body">
                  Online, fără deplasare, fără prezentare de vânzări. Îmi spui
                  cum lucrezi acum, îți spun ce se poate automatiza și în cât
                  timp. Dacă nu-ți folosește, ți-o spun direct.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <RezervaCall
                    eticheta="Rezervă 15 minute"
                    context={contextProgramare}
                    varianta="principal"
                  />
                  <MotionButton
                    label="Vezi întâi FirmFlow"
                    href="/firmflow"
                    varianta="secundar"
                  />
                </div>

                <p className="mt-8 text-[13px] text-krevo-silver/60">
                  Discuția pleacă deja cu contextul tău:{" "}
                  <span className="text-krevo-silver">{contextProgramare}</span>
                </p>

                {/* Ieșirea pentru cine a ajuns până aici și tot nu se
                    regăsește. Fără ea, singura variantă rămasă era să
                    închidă pagina. */}
                <p className="mt-4 text-[13.5px] text-krevo-silver">
                  Nu seamănă cu situația ta?{" "}
                  <Link
                    href="/#contact"
                    className="font-semibold text-[#3399FF] underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Scrie-mi direct ce te doare
                  </Link>{" "}
                  — răspund eu, nu un formular.
                </p>
              </div>

              {/* reia */}
              <div className="mt-10 flex justify-center pb-4">
                <button
                  type="button"
                  onClick={reia}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#0F2647] px-5 py-2.5 text-[13.5px] text-krevo-silver transition-colors hover:border-[#0066FF]/50 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  Schimbă răspunsurile
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* ── Ieșirea pentru cine nu s-a regăsit în listă ──────────────── */}
      {!solutie && (
        <div className="mt-24 border-t border-[#0F2647] py-14 text-center">
          <p className="text-[15px] text-krevo-silver">
            Nu te regăsești în variantele de mai sus? Atunci hai să vorbim
            direct — 15 minute, online.
          </p>
          <div className="mt-7 flex justify-center">
            <PearlButton
              label="Hai să vorbim"
              href="/#contact"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Diagnostic;
