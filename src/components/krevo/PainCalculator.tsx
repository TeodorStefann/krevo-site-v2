"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Blended hourly cost used for the manual-work estimates. */
const HOURLY_COST_RON = 45;
const AVERAGE_SALARY_RON = 3500;
const MAX_EMPLOYEES = 100;

type PainItem = {
  id: string;
  label: string;
  hint: string;
  /** Monthly cost in RON; only some items scale with headcount. */
  monthlyCost: (employees: number) => number;
};

const PAIN_ITEMS: PainItem[] = [
  {
    id: "pontaj",
    label: "📋 Pontajul se face pe hârtie sau în Excel",
    hint: "Costă firma ~15 RON per angajat pe săptămână",
    monthlyCost: (employees) => employees * 15 * 4,
  },
  {
    id: "oferte",
    label: "📝 Ofertele se scriu manual în Word",
    hint: "~4 ore per ofertă × salariul inginerului",
    monthlyCost: () => 4 * HOURLY_COST_RON * 4,
  },
  {
    id: "coordonare",
    label: "📱 Coordonarea se face prin telefon și WhatsApp",
    hint: "~45 min pierdute zilnic per manager",
    monthlyCost: () => Math.floor(0.75 * HOURLY_COST_RON * 22),
  },
  {
    id: "vizibilitate",
    label: "🔍 Nu știu exact ce face fiecare angajat acum",
    hint: "~800 RON pierderi lunare din lipsă vizibilitate",
    monthlyCost: () => 800,
  },
  {
    id: "rapoarte",
    label: "📊 Rapoartele lunare îmi iau ore întregi",
    hint: "~6 ore lunar × costul tău pe oră",
    monthlyCost: () => 6 * HOURLY_COST_RON,
  },
];

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

/** Counts from the previous value to the next one, so ticking a box stays smooth. */
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
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const employeeCount = Number(employees);
  const hasEmployees =
    employees !== "" && Number.isFinite(employeeCount) && employeeCount > 0;
  const employeeSlider = clampForSlider(employeeCount, MAX_EMPLOYEES);

  const checkedItems = PAIN_ITEMS.filter((item) => checked[item.id]);
  const hasResult = hasEmployees && checkedItems.length > 0;

  const monthlyLoss = hasResult
    ? checkedItems.reduce(
        (total, item) => total + item.monthlyCost(employeeCount),
        0,
      )
    : 0;
  const yearlyLoss = monthlyLoss * 12;
  const salaries = Math.round(yearlyLoss / AVERAGE_SALARY_RON);

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-[120px]">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg-pain.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 1,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="text-center text-[28px] leading-tight font-bold text-white sm:text-[32px] md:text-[38px]">
          Recunoști ceva din lista{" "}
          <span className="section-title-accent">asta?</span>
        </h2>

        <p className="mt-4 text-center text-[14px] text-krevo-silver">
          Bifează ce se aplică firmei tale.
        </p>

        <div className="mt-10">
          <label
            htmlFor="pain-employees"
            className="mb-3 block text-[17px] font-semibold text-white"
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

        <div className="mt-8 flex flex-col gap-3">
          {PAIN_ITEMS.map((item) => {
            const isChecked = Boolean(checked[item.id]);
            return (
              <div
                key={item.id}
                className={`rounded-[12px] border bg-[#111111] p-4 transition-all duration-200 ${
                  isChecked
                    ? "border-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.18)]"
                    : "border-white/10"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.id)}
                    className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#0066FF] [color-scheme:dark]"
                  />
                  <span className="text-[15px] leading-snug text-white">
                    {item.label}
                  </span>
                </label>

                <AnimatePresence initial={false}>
                  {isChecked && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden pl-8 text-[13px] text-[#3399FF]"
                    >
                      <span className="mt-2 block">{item.hint}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
              <div className="relative text-center" aria-hidden="true">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[32px] leading-tight font-bold text-[#0066FF] sm:text-[40px] md:text-[48px]"
                >
                  Firma ta pierde aproximativ{" "}
                  <AnimatedNumber value={monthlyLoss} /> RON pe lună
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 text-[22px] leading-tight font-bold text-[#ef4444] md:text-[28px]"
                >
                  Adică {yearlyLoss.toLocaleString("ro-RO")} RON pe an
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 text-[20px] leading-snug font-bold text-white"
                >
                  Echivalentul a {salaries.toLocaleString("ro-RO")} salarii
                  medii.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-4 text-[14px] text-krevo-silver italic"
                >
                  Și asta e doar ce poți măsura.
                </motion.p>
              </div>

              <p className="sr-only" aria-live="polite">
                Firma ta pierde aproximativ{" "}
                {monthlyLoss.toLocaleString("ro-RO")} RON pe lună. Adică{" "}
                {yearlyLoss.toLocaleString("ro-RO")} RON pe an, echivalentul a{" "}
                {salaries.toLocaleString("ro-RO")} salarii medii. Și asta e doar
                ce poți măsura.
              </p>

              <div className="mt-10 rounded-2xl border border-[#0066FF] bg-[#0a0a0a]/60 px-6 py-6">
                <p className="text-center text-[16px] font-bold text-white">
                  FirmFlow elimină aceste costuri. Complet.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <a
            href="#puterea-ai"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#0066FF] px-10 py-4 text-[18px] font-bold text-white transition-colors hover:bg-[#0052CC] sm:w-auto"
          >
            Vezi cum →
          </a>
        </div>
      </div>
    </section>
  );
}
