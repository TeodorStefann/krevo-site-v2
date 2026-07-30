"use client";

import { motion } from "framer-motion";

const MEANDER_PATH =
  "M0 12 H8 L8 4 H16 L16 20 H24 L24 4 H32 L32 20 H40 L40 4 H48 L48 12 H56 L56 4 H64 L64 20 H72 L72 4 H80 L80 20 H88 L88 4 H96 L96 12 H104 L104 4 H112 L112 20 H120 L120 4 H128 L128 20 H136 L136 4 H144 L144 12 H152 L152 4 H160 L160 20 H168 L168 4 H176 L176 20 H184 L184 4 H192 L192 12 H200 L200 4 H208 L208 20 H216 L216 4 H224 L224 20 H232 L232 4 H240 L240 12 H248 L248 4 H256 L256 20 H264 L264 4 H272 L272 20 H280 L280 4 H288 L288 12 H296 L296 4 H304 L304 20 H312 L312 4 H320 L320 20 H328 L328 4 H336 L336 12 H344 L344 4 H352 L352 20 H360 L360 4 H368 L368 20 H376 L376 4 H384 L384 12 H400";

export function HeroMeander() {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className="mx-auto mt-8 h-3 w-48 max-w-full"
      aria-hidden="true"
    >
      <motion.path
        d={MEANDER_PATH}
        fill="none"
        stroke="#0052CC"
        strokeWidth="1"
        strokeLinecap="square"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
