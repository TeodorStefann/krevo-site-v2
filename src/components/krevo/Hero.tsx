"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroPyramid } from "./HeroPyramid";
import { springBounce, springNatural } from "./animations/motionConfig";

export function Hero({ siteReady = false }: { siteReady?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pyramidRef = useRef<HTMLDivElement>(null);
  const [enableHeavyFx, setEnableHeavyFx] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setEnableHeavyFx(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Entrance choreography plays once the loading screen lifts (siteReady),
  // so the sequence is actually seen. Reduced-motion users get the final
  // state immediately.
  const revealed = reduceMotion || siteReady;
  const slideX = isMobile ? -40 : -90;

  const hiddenLeft = { opacity: 0, x: slideX };
  const hiddenUp = (y: number) => ({ opacity: 0, y });
  const shown = { opacity: 1, x: 0, y: 0 };
  const instant = { duration: 0 };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100vh] items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div
        ref={pyramidRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: 0.85 }}
        aria-hidden="true"
      >
        <Image
          src="/hero-2-pyramid.webp"
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
            initial={reduceMotion ? false : hiddenLeft}
            animate={revealed ? shown : hiddenLeft}
            transition={
              reduceMotion ? instant : { ...springNatural, delay: 0.15 }
            }
            style={{ willChange: "transform, opacity" }}
            className="mb-4 text-[14px] font-semibold tracking-widest text-[#0066FF] uppercase"
          >
            Krevo
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : hiddenLeft}
            animate={revealed ? shown : hiddenLeft}
            transition={
              reduceMotion ? instant : { ...springBounce, delay: 0.3 }
            }
            style={{ willChange: "transform, opacity" }}
            className="text-[32px] leading-tight font-bold text-white md:text-[48px]"
          >
            Firmele mari au sisteme. Tu ai{" "}
            <motion.span
              className="inline-block text-[#0066FF]"
              initial={reduceMotion ? false : { scale: 1 }}
              animate={
                revealed && !reduceMotion
                  ? {
                      scale: [1, 1.14, 1],
                      textShadow: [
                        "0 0 0px rgba(0,102,255,0)",
                        "0 0 22px rgba(51,153,255,0.75)",
                        "0 0 10px rgba(0,102,255,0.25)",
                      ],
                    }
                  : {}
              }
              transition={{ delay: 1.05, duration: 0.7, ease: "easeOut" }}
            >
              Excel.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : hiddenUp(24)}
            animate={revealed ? shown : hiddenUp(24)}
            transition={
              reduceMotion
                ? instant
                : { duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ willChange: "transform, opacity" }}
            className="mt-4 text-[20px] font-bold text-white md:text-[24px]"
          >
            Până acum.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : hiddenUp(20)}
            animate={revealed ? shown : hiddenUp(20)}
            transition={
              reduceMotion ? instant : { ...springBounce, delay: 1.8 }
            }
            style={{ willChange: "transform, opacity" }}
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
