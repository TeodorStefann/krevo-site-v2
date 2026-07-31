"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HeroPyramid } from "./HeroPyramid";
import { Counter } from "./Counter";

const PLATFORM_LOGIN_HREF =
  "https://buildflow-ks53-2205sm2tm-teodorstefanns-projects.vercel.app/login";

const HERO_STATS = [
  { value: 30, suffix: "+", label: "module" },
  { value: 7, suffix: "", label: "roluri unice" },
  { value: 1, suffix: "", label: "fondator dedicat" },
];

export function Hero({ siteReady = false }: { siteReady?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pyramidRef = useRef<HTMLDivElement>(null);
  const [enableHeavyFx, setEnableHeavyFx] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setEnableHeavyFx(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100vh] items-center overflow-hidden bg-black px-6 pt-24 pb-16"
    >
      <div
        ref={pyramidRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: 0.85 }}
        aria-hidden="true"
      >
        <Image
          src="/piramida-blue.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {enableHeavyFx ? (
        <HeroPyramid
          sectionRef={sectionRef}
          pyramidRef={pyramidRef}
          siteReady={siteReady}
        />
      ) : null}

      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[8] h-[160px] w-full"
        style={{
          background: "linear-gradient(180deg, transparent 0%, #000000 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 text-[14px] font-semibold tracking-widest text-[#0066FF] uppercase"
          >
            Krevo
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[32px] leading-tight font-bold text-white md:text-[48px]"
          >
            Firmele mari au sisteme. Tu ai{" "}
            <span className="text-[#0066FF]">Excel.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-[20px] font-bold text-white md:text-[24px]"
          >
            Până acum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8"
          >
            <a
              href={PLATFORM_LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0066FF] px-10 py-[18px] text-[18px] font-bold text-white transition-colors hover:bg-[#0052CC] md:w-auto"
            >
              Vezi FirmFlow →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 md:justify-start"
          >
            {HERO_STATS.map((stat) => (
              <p key={stat.label} className="text-[13px] text-white">
                <span className="font-bold text-[#0066FF]">
                  {siteReady ? (
                    <Counter value={stat.value} duration={1500} />
                  ) : (
                    0
                  )}
                  {stat.suffix}
                </span>{" "}
                {stat.label}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
