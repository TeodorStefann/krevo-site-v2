"use client";

import { useState } from "react";
import Image from "next/image";
import { Code2, Brain, Rocket } from "lucide-react";
import { SlideReveal } from "./animations/SlideReveal";

const values = [
  { icon: Code2, label: "Platforme SaaS complete" },
  { icon: Brain, label: "AI integrat nativ" },
  { icon: Rocket, label: "De la design la deploy" },
];

const stats = [
  "1 produs lansat",
  "Disponibil remote pentru orice firmă din România",
  "Disponibil pentru colaborări",
];

export function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="despre"
      className="relative overflow-hidden bg-[#05000f] px-6 py-[100px]"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <SlideReveal direction="left">
          <div className="flex justify-center md:justify-center">
            {!imgError ? (
              <Image
                src="/teodor.png"
                alt="Teodor Chiurtu"
                width={320}
                height={320}
                className="about-photo-glow block h-auto w-[320px] max-w-full bg-transparent"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-[320px] w-[320px] max-w-full items-center justify-center bg-transparent font-serif text-6xl text-[#a855f7]">
                TC
              </div>
            )}
          </div>
        </SlideReveal>

        <SlideReveal direction="right" delay={0.08}>
          <div className="text-left">
            <h2 className="font-serif text-[32px] font-bold text-white">
              Hai să ne{" "}
              <span className="section-title-accent">cunoaștem</span>
            </h2>
            <div
              className="mt-3 h-[2px] w-[60px] bg-[#a855f7]"
              aria-hidden="true"
            />

            <p className="mt-5 text-[16px] text-[#a855f7] italic">
              Teodor Chiurtu — Founder, Krevo
            </p>

            <p className="mt-6 text-[15px] leading-[1.7] text-[#d0d0d0]">
              Nu vin cu soluții gata făcute. Vin să înțeleg cum funcționează
              firma ta, unde pierzi timp și energie, și ce ar trebui să se
              întâmple automat în loc să consume oameni. Platforma pe care o
              construim împreună va fi exact ce are nevoie afacerea ta — nu mai
              mult, nu mai puțin. Fundații solide, rezultate reale.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {values.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#a855f7]"
                  />
                  <span className="text-[14px] text-white">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-[#7c3aed]/35 bg-transparent px-3.5 py-2 text-[13px] text-[#d0d0d0]"
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6b21a8] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c3aed]"
            >
              Hai să construim împreună
            </a>
          </div>
        </SlideReveal>
      </div>
    </section>
  );
}
