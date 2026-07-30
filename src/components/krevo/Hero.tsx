"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HeroPyramid } from "./HeroPyramid";

const HERO_TITLE = "Firmele mari au sisteme. Tu ai Excel.";

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
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-[42%] w-full md:h-[75%] md:w-[58%]"
        style={{
          backgroundImage: "url(/piramida-blue.png)",
          backgroundSize: "contain",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.75,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 100%)",
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
            {HERO_TITLE}
          </motion.h1>

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
            <Link
              href="/firmflow"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0066FF] px-10 py-[18px] text-[18px] font-bold text-white transition-colors hover:bg-[#0052CC] md:w-auto"
            >
              Vezi FirmFlow →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
