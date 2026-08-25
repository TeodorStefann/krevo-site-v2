"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TitleReveal } from "./animations/TitleReveal";
import { RezervaCall } from "./RezervaCall";
import { fundalSectiune, SUPRAFATA_CARD } from "@/lib/krevo/fundal";

/** Haloul care urmărește cursorul pe carduri. */
function urmaresteCursorul(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* Pașii reflectă exact procesul real de vânzare: discuție scurtă →
   probă însoțită de 5 zile pe datele lor → decizia cu cifrele în față. */
const steps = [
  {
    title: "Vorbim 15 minute",
    description:
      "Îmi spui cum lucrează firma ta — câți oameni, ce șantiere, unde pierzi timp. Fără jargon, fără obligații.",
  },
  {
    title: "Probă 5 zile, pe datele tale",
    description:
      "Configurăm FirmFlow împreună, cu proiectele și oamenii tăi reali. Îl folosești ca și cum ar fi al tău, iar eu sunt lângă tine tot timpul.",
  },
  {
    title: "Decizi cu cifrele în față",
    description:
      "În ziua 5 vezi alb pe negru ce ai câștigat — și decizi cu aplicația în mână, nu după o prezentare.",
  },
];

type Theme = "blue" | "gold";

/** Linia de lumină care curge de la un pas la următorul. */
function Conector({ activ }: { activ: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 md:w-10 md:py-0 lg:w-14">
      {/* vertical, pe mobil */}
      <div className="relative h-9 w-px overflow-hidden rounded-full bg-white/10 md:hidden">
        <div
          className={`absolute inset-x-0 top-0 rounded-full bg-[#3399FF] shadow-[0_0_8px_rgba(51,153,255,0.8)] transition-[height] duration-700 ease-out ${
            activ ? "h-full" : "h-0"
          }`}
        />
      </div>
      {/* orizontal, pe desktop */}
      <div className="relative hidden h-px w-full overflow-hidden rounded-full bg-white/10 md:block">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-[#3399FF] shadow-[0_0_8px_rgba(51,153,255,0.8)] transition-[width] duration-700 ease-out ${
            activ ? "w-full" : "w-0"
          }`}
        />
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  activat,
}: {
  step: (typeof steps)[0];
  index: number;
  activat: boolean;
}) {
  return (
    <div
      onMouseMove={urmaresteCursorul}
      className={`spotlight-card relative flex-1 rounded-2xl border p-7 ${SUPRAFATA_CARD} transition-[border-color,box-shadow] duration-500 ${
        activat
          ? "border-[#3399FF]/35 shadow-[0_0_30px_rgba(0,102,255,0.12)]"
          : "border-white/[0.09] shadow-none"
      }`}
    >
      {/* Se estompează conținutul, nu cardul: fundalul rămâne opac, deci textul
          rămâne lizibil peste imagine chiar și înainte să se aprindă pasul. */}
      <div
        className={`transition-opacity duration-500 ${activat ? "opacity-100" : "opacity-45"}`}
      >
      <motion.span
        animate={activat ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`block text-[42px] leading-none font-bold tabular-nums transition-colors duration-500 ${
          activat
            ? "text-[#3399FF] drop-shadow-[0_0_12px_rgba(51,153,255,0.45)]"
            : "text-[#3399FF]/25"
        }`}
        aria-hidden="true"
      >
        0{index + 1}
      </motion.span>
      <h3 className="mt-4 text-[21px] leading-snug font-bold text-white">
        {step.title}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-krevo-silver">
        {step.description}
      </p>
      </div>
    </div>
  );
}

export function HowWeWork({ theme = "blue" }: { theme?: Theme }) {
  const isGold = theme === "gold";
  const zonaRef = useRef<HTMLDivElement>(null);
  const inView = useInView(zonaRef, { once: true, amount: 0.35 });

  /* Secvența psihologică: 01 se aprinde → linia curge → 02 → linia → 03.
     pas: 1=card1, 2=linia1, 3=card2, 4=linia2, 5=card3 (+ butonul). */
  const [pas, setPas] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timere: number[] = [];
    for (let p = 1; p <= 5; p++) {
      timere.push(window.setTimeout(() => setPas(p), 250 + (p - 1) * 550));
    }
    return () => timere.forEach((t) => window.clearTimeout(t));
  }, [inView]);

  return (
    <section
      id="cum-functioneaza"
      data-reveal
      className="relative px-6 py-16 md:py-[92px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={fundalSectiune("/bg-s-howwework.jpg")}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div>
          <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">
            Procesul
          </p>
          <h2 className="text-center text-[30px] leading-tight font-bold text-white sm:text-[36px]">
            {isGold ? (
              <>
                Cum <span className="text-[#c9a84c]">funcționează</span>
              </>
            ) : (
              <TitleReveal text="Cum funcționează" accentLast />
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-base text-krevo-silver">
            Trei pași, zero risc. Nu semnezi nimic până nu vezi cifrele tale.
          </p>
        </div>

        <div
          ref={zonaRef}
          className="mt-10 flex flex-col md:flex-row md:items-stretch"
        >
          {steps.map((step, i) => (
            <Fragment key={step.title}>
              <StepCard step={step} index={i} activat={pas >= i * 2 + 1} />
              {i < steps.length - 1 && <Conector activ={pas >= i * 2 + 2} />}
            </Fragment>
          ))}
        </div>

        {/* butonul se aprinde abia după ce procesul s-a parcurs */}
        <div
          className={`mt-10 flex justify-center transition-opacity duration-700 ${
            pas >= 5 ? "opacity-100" : "opacity-40"
          }`}
        >
          <RezervaCall
            eticheta="Hai să vorbim 15 minute"
            context="După ce a văzut cum lucrăm"
            varianta="principal"
          />
        </div>
      </div>
    </section>
  );
}
