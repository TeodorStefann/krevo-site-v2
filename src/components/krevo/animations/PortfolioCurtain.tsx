"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { springNatural } from "./motionConfig";

interface PortfolioCurtainProps {
  children: ReactNode;
  className?: string;
}

export function PortfolioCurtain({ children, className = "" }: PortfolioCurtainProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-[#0a0a0a]"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ ...springNatural, delay: 0.1 }}
        style={{ transformOrigin: "right center", willChange: "transform" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/2 bg-[#0a0a0a]"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ ...springNatural, delay: 0.1 }}
        style={{ transformOrigin: "left center", willChange: "transform" }}
      />
    </div>
  );
}
