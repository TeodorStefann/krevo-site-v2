"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Limbajul de mișcare al site-ului, moștenit din hero: titlurile se
 * dezvăluie cuvânt cu cuvânt, fiecare urcând din propria mască invizibilă.
 * Se declanșează o singură dată, când titlul intră în ecran.
 */
export function TitleReveal({
  text,
  accentLast = false,
  base = 0.05,
  step = 0.05,
}: {
  text: string;
  /** Ultimul cuvânt primește gradientul de accent al site-ului. */
  accentLast?: boolean;
  base?: number;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <span>
        {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span
              className={
                accentLast && i === words.length - 1
                  ? "section-title-accent"
                  : undefined
              }
            >
              {w}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className={`inline-block ${
                accentLast && i === words.length - 1
                  ? "section-title-accent"
                  : ""
              }`}
              initial={{ y: "115%" }}
              animate={inView ? { y: 0 } : { y: "115%" }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: base + i * step,
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
