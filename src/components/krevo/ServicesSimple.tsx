"use client";

import {
  Building2,
  Bot,
  Globe,
  Layers,
  Clock,
  Headphones,
} from "lucide-react";

const categories = [
  {
    title: "Platforme SaaS",
    icon: Building2,
    items: ["FirmFlow", "Platforme custom", "Portal client"],
  },
  {
    title: "Automatizări AI",
    icon: Bot,
    items: ["Oferte AI", "Apeluri AI", "Analiză firmă", "Rapoarte automate"],
  },
  {
    title: "Prezențe Digitale",
    icon: Globe,
    items: ["Site-uri profesionale", "Landing pages", "Redesign"],
  },
];

const highlights = [
  { label: "10+ servicii disponibile", icon: Layers },
  { label: "Livrare în 7-14 zile", icon: Clock },
  { label: "Suport inclus", icon: Headphones },
];

export function ServicesSimple() {
  return (
    <section
      id="servicii-preview"
      className="relative bg-[#000000] px-6 py-[100px]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center md:mb-20">
          <h2 className="text-[42px] font-bold text-white">
            Ce <span className="section-title-accent">facem</span>
          </h2>
          <div
            className="mx-auto mt-5 h-px w-[60px] bg-[#6b21a8] shadow-[0_0_16px_4px_rgba(109,33,168,0.55)]"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-20 lg:gap-24">
          {categories.map(({ title, icon: Icon, items }, index) => (
            <div
              key={title}
              className="group relative text-center transition-[background-color,box-shadow] duration-300 md:text-left"
            >
              <span
                className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none text-[96px] leading-none font-bold text-[#6b21a8]/[0.04] md:left-0 md:translate-x-0"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(109,33,168,0.12) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative inline-flex items-center justify-center">
                <span
                  className="absolute h-16 w-16 rounded-full bg-[#6b21a8]/10"
                  aria-hidden="true"
                />
                <Icon
                  size={48}
                  strokeWidth={1.4}
                  className="relative text-[#a855f7] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="relative mt-5 text-[18px] font-bold text-white">
                {title}
              </h3>

              <ul className="relative mt-5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-[#6b21a8]/[0.08] py-3 first:pt-0"
                  >
                    <span className="flex items-start justify-center gap-2.5 text-[14px] text-krevo-silver md:justify-start">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a855f7]"
                        aria-hidden="true"
                      />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10 md:mt-20">
          {highlights.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[13px] text-krevo-silver"
            >
              <Icon
                size={16}
                strokeWidth={1.6}
                className="shrink-0 text-[#a855f7]"
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <a
            href="/servicii"
            className="rounded-full border border-[#6b21a8] bg-transparent px-6 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:border-[#7c3aed] hover:bg-[#6b21a8]/10"
          >
            Vezi toate serviciile →
          </a>
        </div>
      </div>
    </section>
  );
}
