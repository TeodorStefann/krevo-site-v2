"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HOURLY_COST_RON = 35;
const WEEKS_PER_MONTH = 4;

const inputClass =
  "min-h-11 w-full rounded-xl border border-[#0066FF] bg-[#0a0a0a] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-krevo-silver/40 focus:border-[#3399FF]";

export function PainCalculator() {
  const [employees, setEmployees] = useState("");
  const [hours, setHours] = useState("");

  const employeeCount = Number(employees);
  const hoursLost = Number(hours);
  const hasResult =
    employees !== "" &&
    hours !== "" &&
    Number.isFinite(employeeCount) &&
    Number.isFinite(hoursLost) &&
    employeeCount > 0 &&
    hoursLost > 0;

  const monthlyLoss = hasResult
    ? employeeCount * hoursLost * HOURLY_COST_RON * WEEKS_PER_MONTH
    : 0;

  return (
    <section className="bg-[#000000] px-6 py-[120px]">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-[28px] leading-tight font-bold text-white sm:text-[32px] md:text-[36px]">
          Câți angajați ai? Câte ore pierzi cu ei{" "}
          <span className="section-title-accent">săptămânal?</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pain-employees"
              className="mb-1.5 block text-[13px] text-krevo-silver"
            >
              Număr angajați
            </label>
            <input
              id="pain-employees"
              type="number"
              inputMode="numeric"
              min={0}
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              placeholder="ex. 12"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="pain-hours"
              className="mb-1.5 block text-[13px] text-krevo-silver"
            >
              Ore pierdute pe săptămână
            </label>
            <input
              id="pain-hours"
              type="number"
              inputMode="numeric"
              min={0}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="ex. 5"
              className={inputClass}
            />
          </div>
        </div>

        <AnimatePresence>
          {hasResult && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 text-center"
              aria-live="polite"
            >
              <p className="text-[16px] text-krevo-silver">Firma ta pierde</p>
              <p className="mt-2 flex items-baseline justify-center gap-2">
                <span className="text-[48px] leading-none font-bold text-[#0066FF]">
                  {monthlyLoss.toLocaleString("ro-RO")}
                </span>
                <span className="text-[20px] font-semibold text-[#0066FF]">
                  RON
                </span>
              </p>
              <p className="mt-3 text-[16px] text-krevo-silver">
                pe lună din cauza haosului administrativ.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <a
            href="#puterea-ai"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0066FF] px-8 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#0052CC] sm:w-auto"
          >
            Vezi cum rezolvi asta →
          </a>
        </div>
      </div>
    </section>
  );
}
