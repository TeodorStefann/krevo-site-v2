"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Counter } from "./Counter";

/* Numerele care conving — dimensionate să nu se calce niciodată între ele:
   cifra mare + sufixul mic pe aceeași linie de bază, eticheta dedesubt. */

type Stat = {
  target: number;
  sufix: string;
  eticheta: string;
};

type Theme = "blue" | "gold";

const STATS: Stat[] = [
  {
    target: 60,
    sufix: "sec",
    eticheta: "de la 3 poze de pe teren la un deviz complet, cu totaluri",
  },
  {
    target: 0,
    sufix: "hârtii",
    eticheta: "foi de pontaj sau devize scrise de mână. Niciodată din nou.",
  },
  {
    target: 100,
    sufix: "%",
    eticheta: "vizibilitate în timp real asupra firmei tale",
  },
  {
    target: 5,
    sufix: "zile",
    eticheta: "de probă, pe datele firmei tale — fără card",
  },
];

function StatCard({
  stat,
  active,
  index,
  theme,
}: {
  stat: Stat;
  active: boolean;
  index: number;
  theme: Theme;
}) {
  const isGold = theme === "gold";
  const gradient = isGold
    ? "bg-gradient-to-b from-[#e8d5a3] to-[#c9a84c]"
    : "bg-gradient-to-b from-[#3399FF] to-[#0066FF]";

  return (
    <div className="flex flex-col items-center px-2 py-6 text-center">
      <p className="flex items-baseline justify-center gap-1.5 whitespace-nowrap">
        <span
          className={`${gradient} bg-clip-text text-[54px] leading-none font-bold tracking-tight text-transparent tabular-nums md:text-[60px]`}
          style={{ WebkitBackgroundClip: "text" }}
        >
          {active ? <Counter key={`${index}-on`} value={stat.target} /> : 0}
        </span>
        <span
          className={`${gradient} bg-clip-text text-[20px] leading-none font-bold text-transparent md:text-[23px]`}
          style={{ WebkitBackgroundClip: "text" }}
        >
          {stat.sufix}
        </span>
      </p>
      <p className="mt-3.5 max-w-[220px] text-[13.5px] leading-snug text-krevo-silver">
        {stat.eticheta}
      </p>
    </div>
  );
}

export function NumbersSpeak({ theme = "blue" }: { theme?: Theme }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const isGold = theme === "gold";

  return (
    <section
      ref={ref}
      id="numere"
      className="relative overflow-hidden px-6 py-16 md:py-[92px]"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">
          Rezultatele
        </p>
        <h2 className="mb-10 text-center text-[28px] font-bold text-white md:mb-12 md:text-[34px]">
          Numere care{" "}
          {isGold ? (
            <span className="text-[#c9a84c]">vorbesc</span>
          ) : (
            <span className="section-title-accent">vorbesc</span>
          )}
        </h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.eticheta}
              stat={stat}
              active={inView}
              index={i}
              theme={theme}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
