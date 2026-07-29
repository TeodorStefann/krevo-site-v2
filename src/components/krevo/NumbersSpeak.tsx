"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Counter } from "./Counter";

type Stat = {
  target: number;
  suffix: string;
  label: string;
};

type Theme = "purple" | "gold";

const stats: Stat[] = [
  {
    target: 30,
    suffix: " sec",
    label: "pentru o ofertă tehnică completă cu AI",
  },
  {
    target: 0,
    suffix: "",
    label: "foi de pontaj. Zero. Niciodată din nou.",
  },
  {
    target: 100,
    suffix: "%",
    label: "vizibilitate în timp real asupra firmei tale",
  },
  {
    target: 7,
    suffix: " zile",
    label: "și platforma ta e live și funcțională",
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

  return (
    <div className="flex flex-col items-center px-4 py-6 text-center">
      <p
        className={
          isGold
            ? "bg-gradient-to-b from-[#e8d5a3] to-[#c9a84c] bg-clip-text text-[72px] leading-none font-bold text-transparent"
            : "bg-gradient-to-b from-[#a855f7] to-[#7c3aed] bg-clip-text text-[72px] leading-none font-bold text-transparent"
        }
        style={{ WebkitBackgroundClip: "text" }}
      >
        {active ? (
          <>
            <Counter key={`${index}-on`} value={stat.target} />
            {stat.suffix}
          </>
        ) : (
          <>0{stat.suffix}</>
        )}
      </p>
      <p className="mt-4 max-w-xs text-[14px] leading-snug text-krevo-silver">
        {stat.label}
      </p>
    </div>
  );
}

export function NumbersSpeak({ theme = "purple" }: { theme?: Theme }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const isGold = theme === "gold";

  return (
    <section
      ref={ref}
      id="numere"
      className={`relative overflow-hidden px-6 py-20 md:py-24 ${
        isGold ? "bg-[#0a0a0a]" : "bg-[#05000f]"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="mb-14 text-center text-[32px] font-bold text-white md:mb-16 md:text-[36px]">
          Numere care{" "}
          {isGold ? (
            <span className="text-[#c9a84c]">vorbesc</span>
          ) : (
            <span className="section-title-accent">vorbesc</span>
          )}
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              active={inView}
              index={i}
              theme={theme}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center md:mt-16">
          <Link
            href="/#contact"
            className={
              isGold
                ? "inline-flex max-w-xl items-center justify-center rounded-full bg-[#c9a84c] px-8 py-4 text-center text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#d4b85c] hover:shadow-[0_0_28px_rgba(201,168,76,0.4)] sm:px-10 sm:text-base"
                : "inline-flex max-w-xl items-center justify-center rounded-full bg-[#6b21a8] px-8 py-4 text-center text-sm font-bold text-white transition-colors hover:bg-[#7c3aed] hover:shadow-[0_0_28px_rgba(124,58,237,0.4)] sm:px-10 sm:text-base"
            }
          >
            Vrei și tu aceste rezultate? Hai să vorbim
          </Link>
        </div>
      </div>
    </section>
  );
}
