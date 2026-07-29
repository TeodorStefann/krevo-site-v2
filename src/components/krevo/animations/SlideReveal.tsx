"use client";

import { useRef, type ReactNode } from "react";
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
  const x = direction === "left" ? -80 : 80;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ ...springNatural, delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
