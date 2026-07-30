"use client";

import { Clock, Eye, Smartphone } from "lucide-react";

const stats = [
  { icon: Clock, value: "30 sec", label: "Generare ofertă" },
  { icon: Eye, value: "100%", label: "Vizibilitate firmă" },
  { icon: Smartphone, value: "1 click", label: "Pontaj digital" },
];

export function AiPower() {
  return (
    <section
      id="puterea-ai"
      className="relative overflow-hidden bg-[#000510] px-6 py-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
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
                  {stat.value}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-krevo-silver">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
