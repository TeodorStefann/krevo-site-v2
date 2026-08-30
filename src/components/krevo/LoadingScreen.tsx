"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Cortina de deschidere. Rulează o singură dată pe sesiune.
 *
 * Coregrafia, în ordine:
 *   1. Semnul K se materializează — vine din ceață, se strânge și intră
 *      în focus, ca un plan care se limpezește pe planșetă.
 *   2. În momentul în care „aterizează”, un inel de energie pleacă din el
 *      și se stinge — impactul care confirmă că s-a așezat.
 *   3. Literele numelui urcă din întuneric, una câte una.
 *   4. Sub ele se toarnă linia de fundație, din centru spre margini.
 *   5. Promisiunea apare la final, discret.
 *   6. Tot ansamblul se ridică și lasă site-ul dedesubt.
 *
 * Singurul fișier extern e logo-ul, care oricum e în cache din navbar.
 * Restul e tipografia site-ului — se afișează instant.
 */

/* Numele rămâne alb, dintr-o bucată. Accentul albastru de pe ultimul
   cuvânt e un procedeu pentru TITLURI, nu pentru o siglă — un nume de
   brand se scrie într-o singură culoare. Albastrul vine oricum din semn,
   din aură și din linia de fundație. */
const LITERE = ["K", "R", "E", "V", "O"];
const usor = [0.22, 1, 0.36, 1] as const;

/* Reperele coregrafiei, în secunde. Le muți de aici, dintr-un loc. */
const T = {
  logo: 0.05,
  impact: 0.62,
  litere: 0.78,
  fundatie: 1.15,
  promisiune: 1.6,
  iesire: 2450, // ms
  cortina: 560, // ms după ieșire
};

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [iese, setIese] = useState(false);
  const faraMiscare = useReducedMotion();

  /* Cine a cerut mai puțină mișcare vede semnul și numele, scurt. */
  const durata = faraMiscare ? 750 : T.iesire;

  useEffect(() => {
    const t1 = setTimeout(() => setIese(true), durata);
    const t2 = setTimeout(onComplete, durata + T.cortina);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete, durata]);

  const d = (secunde: number) => (faraMiscare ? 0.05 : secunde);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#000000]"
      animate={iese ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.55, ease: usor }}
      role="status"
      aria-label="Se încarcă Krevo"
    >
      {/* Aura care respiră în spate */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.22) 0%, rgba(0,102,255,0.07) 40%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: iese ? 0 : 1, scale: iese ? 1.15 : 1 }}
        transition={{ duration: 1.6, ease: usor }}
      />

      {/* Caroiajul de plan de arhitectură, abia perceptibil */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(51,153,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(51,153,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 58% 48% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 58% 48% at 50% 50%, black 0%, transparent 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: usor }}
      />

      <motion.div
        className="relative flex flex-col items-center"
        animate={iese ? { y: -22, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: usor }}
      >
        {/* ── 1. Semnul K, materializându-se ─────────────────────────── */}
        <div className="relative flex items-center justify-center">
          {/* inelul de impact */}
          {!faraMiscare && (
            <motion.span
              aria-hidden="true"
              className="absolute rounded-full border border-[#3399FF]"
              style={{ height: 120, width: 120 }}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: [0, 0.55, 0], scale: [0.55, 2.1, 2.6] }}
              transition={{ duration: 1.1, delay: T.impact, ease: usor }}
            />
          )}

          <motion.div
            initial={{
              opacity: 0,
              scale: faraMiscare ? 1 : 1.35,
              filter: faraMiscare ? "blur(0px)" : "blur(16px)",
            }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: d(0.95), delay: d(T.logo), ease: usor }}
            style={{
              filter: "drop-shadow(0 0 26px rgba(0,102,255,0.55))",
            }}
          >
            <Image
              src="/krevo-logo.png"
              alt=""
              width={110}
              height={110}
              priority
              className="h-[86px] w-[86px] object-contain md:h-[110px] md:w-[110px]"
            />
          </motion.div>
        </div>

        {/* ── 2. Numele ──────────────────────────────────────────────── */}
        {/* Alb care se topește spre albastrul brandului la baza literelor —
            leagă numele de glow-ul logo-ului, fără să se bată cu el. */}
        <h1 className="mt-6 flex overflow-hidden font-serif text-[38px] leading-none font-bold tracking-[0.22em] text-white md:mt-7 md:text-[52px]">
          {LITERE.map((litera, i) => (
            <motion.span
              key={litera + i}
              className="inline-block bg-gradient-to-b from-white from-[30%] to-[#8FC1FF] bg-clip-text text-transparent"
              initial={faraMiscare ? { opacity: 0 } : { y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: d(0.66),
                delay: d(T.litere + i * 0.075),
                ease: usor,
              }}
            >
              {litera}
            </motion.span>
          ))}
        </h1>

        {/* ── 3. Fundația ────────────────────────────────────────────── */}
        <div className="relative mt-6 h-px w-[220px] md:w-[280px]">
          <div className="absolute inset-0 bg-white/[0.06]" />
          <motion.div
            className="absolute top-0 left-1/2 h-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent, #0066FF 16%, #66b3ff 50%, #0066FF 84%, transparent)",
              boxShadow: "0 0 16px rgba(0,102,255,0.7)",
            }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: d(0.95),
              delay: d(T.fundatie),
              ease: usor,
            }}
          />
        </div>

        {/* ── 4. Promisiunea ─────────────────────────────────────────── */}
        <motion.p
          className="mt-5 text-center text-[11px] font-semibold tracking-[0.22em] text-white/45 uppercase md:text-[12px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.65), delay: d(T.promisiune), ease: usor }}
        >
          Fundația digitală a firmei tale
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
