"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { springNatural } from "./motionConfig";

interface SlideRevealProps {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
  delay?: number;
}

export function SlideReveal({
  children,
  direction = "left",
  className = "",
  delay = 0,
}: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduceMotion(motionMq.matches);
      setIsMobile(mobileMq.matches);
    };
    sync();
    motionMq.addEventListener("change", sync);
    mobileMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      mobileMq.removeEventListener("change", sync);
    };
  }, []);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const offset = isMobile ? 24 : 80;
  const x = direction === "left" ? -offset : offset;
  const initial = isMobile
    ? { opacity: 0, y: 24 }
    : { opacity: 0, x };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : isMobile
            ? { opacity: 0, y: 24 }
            : { opacity: 0, x }
      }
      transition={{ ...springNatural, delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
