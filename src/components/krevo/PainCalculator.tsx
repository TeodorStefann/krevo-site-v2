"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HOURLY_COST_RON = 35;
const WEEKS_PER_MONTH = 4;
const AVERAGE_SALARY_RON = 3500;

const MAX_EMPLOYEES = 100;
const MAX_HOURS = 40;

const inputClass =
  "h-12 w-full rounded-xl border border-[#0066FF] bg-[#000000] px-4 text-[16px] text-white outline-none transition-colors placeholder:text-krevo-silver/40 focus:border-[#3399FF]";

/** Track is painted by the element background so Chrome and Firefox match. */
const sliderClass =
  "mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none " +
  "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0066FF] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,102,255,0.7)] " +
  "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#0066FF]";

function clampForSlider(value: number, max: number) {
  if (!Number.isFinite(value) || value < 1) return 1;
  return Math.min(Math.round(value), max);
}

function trackStyle(value: number, max: number) {
  const percent = ((value - 1) / (max - 1)) * 100;
  return {
    background: `linear-gradient(to right, #0066FF 0%, #0066FF ${percent}%, #1a2233 ${percent}%, #1a2233 100%)`,
  };
}

const stepLabelClass =
  "text-[12px] font-semibold tracking-widest text-[#0066FF] uppercase";

/** Deterministic so server and client markup match. */
const PARTICLES = [
  { left: 8, size: 3, delay: 0, duration: 4.2 },
  { left: 18, size: 2, delay: 0.6, duration: 5 },
  { left: 27, size: 4, delay: 1.2, duration: 4.6 },
  { left: 36, size: 2, delay: 0.3, duration: 5.4 },
  { left: 45, size: 3, delay: 1.8, duration: 4 },
  { left: 56, size: 2, delay: 0.9, duration: 5.2 },
  { left: 65, size: 4, delay: 2.1, duration: 4.4 },
  { left: 74, size: 3, delay: 1.5, duration: 4.8 },
  { left: 83, size: 2, delay: 0.45, duration: 5.6 },
  { left: 92, size: 3, delay: 2.4, duration: 4.1 },
];

/** Counts from the previous value to the next one, so slider drags stay smooth. */
function AnimatedNumber({
  value,
  duration = 700,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (value - from) * eased);
      setDisplay(current);
      fromRef.current = current;
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display.toLocaleString("ro-RO")}</>;
}

export function PainCalculator() {
  const [employees, setEmployees] = useState("");
  const [hours, setHours] = useState("");
  const reduceMotion = useReducedMotion();

  const employeeCount = Number(employees);
  const hoursLost = Number(hours);
  const hasResult =
    employees !== "" &&
    hours !== "" &&
    Number.isFinite(employeeCount) &&
    Number.isFinite(hoursLost) &&
    employeeCount > 0 &&
    hoursLost > 0;

  const employeeSlider = clampForSlider(employeeCount, MAX_EMPLOYEES);
  const hoursSlider = clampForSlider(hoursLost, MAX_HOURS);

  const monthlyLoss = hasResult
    ? employeeCount * hoursLost * HOURLY_COST_RON * WEEKS_PER_MONTH
    : 0;
  const yearlyLoss = monthlyLoss * 12;
  const salaries = Math.round(yearlyLoss / AVERAGE_SALARY_RON);

  const reset = () => {
    setEmployees("");
    setHours("");
  };

  return (
    <section className="relative overflow-hidden bg-[#000000] px-6 py-20 md:py-[120px]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(239,68,68,0.03) 0%, transparent 45%, rgba(0,102,255,0.03) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="text-center text-[30px] leading-tight font-bold text-white sm:text-[36px] md:text-[42px]">
          Știi câți bani <span className="section-title-accent">pierzi</span> în
          fiecare zi?
        </h2>

        <p className="mx-auto mt-6 max-w-[650px] text-center text-[16px] leading-relaxed text-krevo-silver italic">
          Fiecare angajat care sună în loc să raporteze în aplicație, fiecare
          ofertă scrisă manual în Word, fiecare foaie de pontaj pierdută — te
          costă bani reali. Nu ești tu de vină. Dar ești tu cel care poate opri
          asta.
        </p>

        <div className="mt-12 rounded-2xl border border-[#0066FF] bg-[#0a0a0a] p-6 shadow-[0_0_40px_rgba(0,102,255,0.15)] md:p-10">
          <div>
            <p className={stepLabelClass}>Pasul 1</p>
            <label
              htmlFor="pain-employees"
              className="mt-2 mb-3 block text-[17px] font-semibold text-white"
            >
              Câți angajați ai?
            </label>
            <input
              id="pain-employees"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_EMPLOYEES}
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              placeholder="ex. 12"
              className={inputClass}
            />
            <input
              type="range"
              min={1}
              max={MAX_EMPLOYEES}
              value={employeeSlider}
              onChange={(e) => setEmployees(e.target.value)}
              aria-label="Câți angajați ai"
              className={sliderClass}
              style={trackStyle(employeeSlider, MAX_EMPLOYEES)}
            />
          </div>

          <div className="mt-8">
            <p className={stepLabelClass}>Pasul 2</p>
            <label
              htmlFor="pain-hours"
              className="mt-2 mb-3 block text-[17px] font-semibold text-white"
            >
              Câte ore pe săptămână pierzi pe coordonare, pontaj, oferte
              manuale?
            </label>
            <input
              id="pain-hours"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_HOURS}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="ex. 5"
              className={inputClass}
            />
            <input
              type="range"
              min={1}
              max={MAX_HOURS}
              value={hoursSlider}
              onChange={(e) => setHours(e.target.value)}
              aria-label="Câte ore pe săptămână pierzi pe coordonare, pontaj, oferte manuale"
              className={sliderClass}
              style={trackStyle(hoursSlider, MAX_HOURS)}
            />
          </div>
        </div>

        <AnimatePresence>
          {hasResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mt-12"
            >
              {!reduceMotion && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 top-0 overflow-hidden"
                  aria-hidden="true"
                >
                  {PARTICLES.map((p) => (
                    <motion.span
                      key={p.left}
                      className="absolute bottom-0 rounded-full bg-[#0066FF]"
                      style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size,
                      }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 0.7, 0], y: -180 }}
                      transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10 text-center" aria-hidden="true">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[36px] leading-none font-bold text-[#0066FF] sm:text-[44px] md:text-[52px]"
                >
                  Pierzi <AnimatedNumber value={monthlyLoss} /> RON pe lună
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 text-[26px] leading-tight font-bold text-[#ef4444] sm:text-[32px] md:text-[36px]"
                >
                  Asta înseamnă {yearlyLoss.toLocaleString("ro-RO")} RON pe an
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 text-[20px] leading-snug font-bold text-white md:text-[24px]"
                >
                  Echivalentul a {salaries.toLocaleString("ro-RO")} salarii
                  medii aruncate.
                </motion.p>
              </div>

              <p className="sr-only" aria-live="polite">
                Pierzi {monthlyLoss.toLocaleString("ro-RO")} RON pe lună. Asta
                înseamnă {yearlyLoss.toLocaleString("ro-RO")} RON pe an,
                echivalentul a {salaries.toLocaleString("ro-RO")} salarii medii
                aruncate.
              </p>

              <div className="mt-10 rounded-2xl border border-[#0066FF] bg-[#0a0a0a]/60 px-6 py-6">
                <p className="text-center text-[18px] font-bold text-white">
                  Cu FirmFlow aceste pierderi scad la zero. Literalmente.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#puterea-ai"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0066FF] px-10 py-4 text-[18px] font-bold text-white transition-colors hover:bg-[#0052CC] sm:w-auto"
          >
            Vezi cum →
          </a>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#0066FF] px-6 py-2.5 text-[14px] text-[#3399FF] transition-colors hover:bg-[#0066FF]/10 sm:w-auto"
          >
            Calculează din nou ↺
          </button>
        </div>
      </div>
    </section>
  );
}
