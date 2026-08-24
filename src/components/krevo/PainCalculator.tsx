"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TitleReveal } from "./animations/TitleReveal";
import { RezervaCall } from "./RezervaCall";

/** Haloul care urmărește cursorul pe carduri. */
function urmaresteCursorul(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* Baze de cost — ancorate în datele INS, iunie 2026 (publicate 12 aug):
   salariul mediu brut 9.564 RON, net 5.734 RON.
   Cost angajator = brut + 2,25% CAM. Estimările sunt deliberat prudente. */

/** Hourly employer cost for a technical/office person (engineer, deviz). */
const HOURLY_COST_RON = 80;
/** Hourly employer cost for the owner or a site manager — deliberately
    modest; a patron's real opportunity cost is higher. */
const HOURLY_MANAGER_RON = 120;
/** Average NET salary — what "un salariu mediu" means in conversation. */
const AVERAGE_SALARY_RON = 5734;
/** Monthly employer cost of one average employee (gross + CAM). */
const EMPLOYEE_COST_RON = 9779;
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
    label: "Pontajul se face pe hârtie sau în Excel",
    hint: "~45 min/lună administrare per angajat, la 80 RON/oră",
    monthlyCost: (employees) => Math.round(employees * 0.75 * HOURLY_COST_RON),
  },
  {
    id: "oferte",
    label: "Ofertele se scriu manual în Word",
    hint: "6 oferte pe lună × 4 ore × 80 RON/oră",
    monthlyCost: () => Math.round(6 * 4 * HOURLY_COST_RON),
  },
  {
    id: "coordonare",
    label: "Coordonarea se face prin telefon și WhatsApp",
    hint: "~1 oră pierdută zilnic pe telefon × 21 zile × 120 RON/oră",
    monthlyCost: () => Math.round(1 * 21 * HOURLY_MANAGER_RON),
  },
  {
    id: "vizibilitate",
    label: "Nu știu exact ce face fiecare angajat acum",
    hint: "1,5% din costul salarial, pierdut din lipsă de vizibilitate",
    monthlyCost: (employees) => Math.round(employees * EMPLOYEE_COST_RON * 0.015),
  },
  {
    id: "rapoarte",
    label: "Rapoartele lunare îmi iau ore întregi",
    hint: "~6 ore lunar × 120 RON/oră",
    monthlyCost: () => Math.round(6 * HOURLY_MANAGER_RON),
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

  /* Numărul tastat se limitează la maximul slider-ului și în CALCUL,
     nu doar vizual — altfel „5000 de angajați" dădea pierderi SF. */
  const employeeCount = Math.min(Number(employees), MAX_EMPLOYEES);
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

  /* Cât din pierdere recuperează FirmFlow — estimare deliberat prudentă:
     automatizarea nu șterge 100% din timp, dar ~70% da. */
  const RECOVERY = 0.7;
  const monthlyRecovered = Math.round(monthlyLoss * RECOVERY);
  const yearlyRecovered = monthlyRecovered * 12;

  /* Orele de muncă eliberate lunar (doar bifele măsurate în ore). */
  const hoursByItem: Record<string, (e: number) => number> = {
    pontaj: (e) => e * 0.75,
    oferte: () => 24,
    coordonare: () => 21,
    rapoarte: () => 6,
  };
  const monthlyHours = Math.round(
    checkedItems.reduce(
      (total, item) => total + (hoursByItem[item.id]?.(employeeCount) ?? 0),
      0,
    ) * RECOVERY,
  );

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section
      id="calculator"
      data-reveal
      className="relative overflow-hidden px-6 py-16 md:py-[92px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, #000 100%), url('/bg-s-calculator.jpg') center / cover no-repeat #000",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">Problema</p>
        <h2 className="text-center text-[28px] leading-tight font-bold text-white sm:text-[32px] md:text-[38px]">
          <TitleReveal text="Recunoști ceva din lista asta?" accentLast />
        </h2>

        <p className="mt-4 text-center text-[14px] text-krevo-silver">
          Bifează ce se aplică firmei tale.
        </p>

        <div className="mt-8">
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

        <div className="mt-6 flex flex-col gap-3">
          {PAIN_ITEMS.map((item) => {
            const isChecked = Boolean(checked[item.id]);
            return (
              <div
                key={item.id}
                onMouseMove={urmaresteCursorul}
                className={`spotlight-card rounded-[12px] border bg-[#111111] p-4 transition-all duration-200 ${
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
              className="relative mt-8"
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
                  className="text-[26px] leading-tight font-bold text-[#3399FF] sm:text-[30px] md:text-[34px]"
                >
                  Firma ta pierde aproximativ{" "}
                  <AnimatedNumber value={monthlyLoss} /> RON pe lună
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-2.5 text-[15px] font-semibold text-krevo-silver"
                >
                  <span className="text-[#ef4444]">
                    {yearlyLoss.toLocaleString("ro-RO")} RON pe an
                  </span>{" "}
                  — cât {salaries.toLocaleString("ro-RO")} salarii medii
                </motion.p>

                {/* Defalcarea — omul vede exact de unde vine fiecare leu */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mx-auto mt-5 max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a]/70 px-5 py-4 text-left"
                >
                  {checkedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-1.5 last:border-0"
                    >
                      <span className="text-[13px] text-krevo-silver">
                        {item.label}
                      </span>
                      <span className="shrink-0 text-[13.5px] font-bold text-white tabular-nums">
                        {item.monthlyCost(employeeCount).toLocaleString("ro-RO")}{" "}
                        RON
                      </span>
                    </div>
                  ))}
                  <p className="mt-2.5 text-center text-[11.5px] text-krevo-silver/70">
                    Estimare prudentă, pe costuri salariale medii. Și e doar
                    ce se poate măsura.
                  </p>
                </motion.div>

                {/* Răspunsul — nu doar diagnosticul, ci și câștigul net */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 rounded-2xl border border-emerald-500/35 bg-emerald-500/[0.07] px-6 py-5 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
                >
                  <p className="text-[12px] font-semibold tracking-[0.18em] text-emerald-300/80 uppercase">
                    Cu FirmFlow
                  </p>
                  <p className="mt-2 text-[24px] leading-tight font-bold text-emerald-300 sm:text-[28px]">
                    ~<AnimatedNumber value={monthlyRecovered} /> RON înapoi, în
                    fiecare lună
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                    <span className="font-bold text-white">
                      {yearlyRecovered.toLocaleString("ro-RO")} RON pe an
                    </span>
                    {monthlyHours > 0 && (
                      <>
                        {" "}
                        și{" "}
                        <span className="font-bold text-white">
                          ~{monthlyHours.toLocaleString("ro-RO")} ore
                        </span>{" "}
                        eliberate lunar
                      </>
                    )}
                    . Abonamentul e o fracțiune din suma asta.
                  </p>
                </motion.div>

              </div>

              <p className="sr-only" aria-live="polite">
                Firma ta pierde aproximativ{" "}
                {monthlyLoss.toLocaleString("ro-RO")} RON pe lună, adică{" "}
                {yearlyLoss.toLocaleString("ro-RO")} RON pe an. Cu FirmFlow
                recuperezi aproximativ{" "}
                {monthlyRecovered.toLocaleString("ro-RO")} RON pe lună.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Momentul cel mai puternic din tot site-ul: omul tocmai a văzut
            cifra. Aici se apasă, nu peste trei secțiuni. */}
        {/* Un singur drum de ieșire. La momentul ăsta, orice a doua opțiune
            e o scuză de amânare. */}
        <div className="mt-9 flex justify-center">
          <RezervaCall
            eticheta="Rezervă 15 minute"
            context="A folosit calculatorul de pierderi"
            varianta="principal"
          />
        </div>

        <p className="mt-4 text-center text-[13px] text-krevo-silver/60">
          Online, fără deplasare. Îți spun dacă merită sau nu în firma ta.
        </p>
      </div>
    </section>
  );
}
