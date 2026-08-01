"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Clock, Eye, Smartphone } from "lucide-react";
import { Counter } from "./Counter";

const stats = [
  { icon: Clock, count: 30, suffix: " sec", label: "Generare ofertă" },
  { icon: Eye, count: 100, suffix: "%", label: "Vizibilitate firmă" },
  { icon: Smartphone, count: 1, suffix: " click", label: "Pontaj digital" },
];

export function AiPower() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      id="puterea-ai"
      className="relative px-6 py-20 md:py-[120px]"
    >
      <div className="relative mx-auto max-w-5xl">
        <h2 className="text-center text-[30px] leading-tight font-bold text-white sm:text-[36px] md:text-[42px]">
          De la 4 ore la 30 de{" "}
          <span className="section-title-accent">secunde</span>
        </h2>

        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <Icon size={32} strokeWidth={1.5} className="text-[#0066FF]" />
                <p className="mt-4 text-[28px] leading-none font-bold text-white">
                  {inView ? <Counter value={stat.count} /> : 0}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-krevo-silver">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-[700px] text-center text-[15px] leading-relaxed text-krevo-silver italic">
          Nu îți vindem un dashboard frumos. Îți dăm un sistem care gândește
          pentru tine — generează oferte, analizează performanța echipei și îți
          spune dimineața ce trebuie să faci azi.
        </p>

        <p className="mt-5 text-center text-[14px] text-krevo-silver italic">
          Tehnologie care nu exista acum 2 ani.
        </p>
      </div>
    </section>
  );
}
