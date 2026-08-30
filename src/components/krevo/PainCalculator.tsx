"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TitleReveal } from "./animations/TitleReveal";
import { RezervaCall } from "./RezervaCall";
import {
  fundalSectiune,
  SUPRAFATA_CARD,
  TEXT_PESTE_IMAGINE,
} from "@/lib/krevo/fundal";

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

/** Curba noastră de „așezare” — pornește repede, frânează lung. */
const ASEZARE = [0.22, 1, 0.36, 1] as const;

/** Bifa desenată de mână: cutia se umple, semnul se trasează, unda se stinge.
    Checkbox-ul nativ rămâne dedesubt pentru tastatură și cititoare de ecran. */
function Bifa({ activ }: { activ: boolean }) {
  const fataMiscare = useReducedMotion();

  return (
    <span className="relative mt-[1px] grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[7px] peer-focus-visible:ring-2 peer-focus-visible:ring-[#3399FF] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black">
      {/* Unda care pleacă din bifă în momentul apăsării. */}
      <AnimatePresence>
        {activ && !fataMiscare && (
          <motion.span
            key="unda"
            aria-hidden="true"
            initial={{ scale: 0.75, opacity: 0.5 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-[7px] bg-[#0066FF]"
          />
        )}
      </AnimatePresence>

      <motion.span
        aria-hidden="true"
        animate={
          fataMiscare ? { scale: 1 } : { scale: activ ? [1, 0.82, 1.09, 1] : 1 }
        }
        transition={{ duration: 0.44, times: [0, 0.26, 0.62, 1], ease: ASEZARE }}
        className={`relative grid h-[22px] w-[22px] place-items-center rounded-[7px] border-2 transition-[background-color,border-color,box-shadow] duration-200 ${
          activ
            ? "border-[#0066FF] bg-[#0066FF] shadow-[0_0_14px_rgba(0,102,255,0.55)]"
            : "border-white/25 bg-white/[0.04]"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none">
          <motion.path
            d="M4.6 12.7 9.5 17.6 19.4 7.1"
            stroke="#ffffff"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: activ ? 1 : 0, opacity: activ ? 1 : 0 }}
            transition={
              fataMiscare
                ? { duration: 0 }
                : activ
                  ? {
                      pathLength: { duration: 0.3, delay: 0.07, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.05, delay: 0.07 },
                    }
                  : {
                      pathLength: { duration: 0.16, ease: "easeIn" },
                      opacity: { duration: 0.12 },
                    }
            }
          />
        </svg>
      </motion.span>
    </span>
  );
}

export function PainCalculator() {
  const [employees, setEmployees] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const fataMiscare = useReducedMotion();

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
        style={fundalSectiune("/bg-s-calculator.jpg")}
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
              <motion.div
                key={item.id}
                onMouseMove={urmaresteCursorul}
                animate={fataMiscare ? {} : { y: isChecked ? -2 : 0 }}
                transition={{ duration: 0.35, ease: ASEZARE }}
                className={`spotlight-card rounded-[12px] border p-4 transition-[border-color,background-color,box-shadow] duration-300 ${
                  isChecked
                    ? "border-[#0066FF]/70 bg-[#0b1220] shadow-[0_0_28px_rgba(0,102,255,0.20)]"
                    : "border-white/10 bg-[#111111] shadow-none"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(item.id)}
                    className="peer sr-only"
                  />
                  <Bifa activ={isChecked} />
                  <span
                    className={`text-[15px] leading-snug transition-colors duration-300 ${
                      isChecked ? "text-white" : "text-white/85"
                    }`}
                  >
                    {item.label}
                  </span>
                </label>

                <AnimatePresence initial={false}>
                  {isChecked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        height: { duration: 0.34, ease: ASEZARE },
                        opacity: { duration: 0.3, delay: 0.06 },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ x: -6 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.4, delay: 0.06, ease: ASEZARE }}
                        className="mt-2 pl-[34px] text-[13px] text-[#3399FF]"
                      >
                        {item.hint}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {hasResult && (
            <motion.div
              key="rezultat"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={
                fataMiscare
                  ? { duration: 0 }
                  : {
                      height: { duration: 0.62, ease: ASEZARE },
                      opacity: { duration: 0.3, ease: "easeOut" },
                    }
              }
              className="relative overflow-hidden"
            >
              <div className="relative mt-8 px-1 pb-2 text-center" aria-hidden="true">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-[26px] leading-tight font-bold text-[#3399FF] sm:text-[30px] md:text-[34px] ${TEXT_PESTE_IMAGINE}`}
                >
                  Firma ta pierde aproximativ{" "}
                  <AnimatedNumber value={monthlyLoss} /> RON pe lună
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.17,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`mt-2.5 text-[15px] font-semibold text-krevo-silver ${TEXT_PESTE_IMAGINE}`}
                >
                  <span className="text-[#ef4444]">
                    {yearlyLoss.toLocaleString("ro-RO")} RON pe an
                  </span>
                  {salaries >= 1 && (
                    <>
                      {" "}— cât {salaries.toLocaleString("ro-RO")}{" "}
                      {salaries === 1
                        ? "salariu mediu"
                        : salaries >= 20
                          ? "de salarii medii"
                          : "salarii medii"}
                    </>
                  )}
                </motion.p>

                {/* Defalcarea — omul vede exact de unde vine fiecare leu */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.29,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`mx-auto mt-5 max-w-md rounded-2xl border border-white/12 ${SUPRAFATA_CARD} px-5 py-4 text-left`}
                >
                  <AnimatePresence initial={false}>
                    {checkedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={
                          fataMiscare
                            ? { duration: 0 }
                            : { duration: 0.32, ease: ASEZARE }
                        }
                        className="overflow-hidden last:[&>div]:border-b-0"
                      >
                        <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-1.5">
                          <span className="text-[13px] text-krevo-silver">
                            {item.label}
                          </span>
                          <span className="shrink-0 text-[13.5px] font-bold text-white tabular-nums">
                            {item.monthlyCost(employeeCount).toLocaleString("ro-RO")}{" "}
                            RON
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
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
                    duration: 0.5,
                    delay: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-5 rounded-2xl border border-emerald-500/35 bg-[#04100B]/85 px-6 py-5 shadow-[0_0_40px_rgba(16,185,129,0.10)] backdrop-blur-[3px]"
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
