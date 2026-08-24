"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Trasee curgătoare de lumină — fundal viu, discret, în albastrul Krevo.
 * Liniile curg la nesfârșit, cu opacități mici, ca un flux care se adună
 * spre conținutul secțiunii. Doar decor: pointer-events-none, aria-hidden.
 */

function Manunchi({ position }: { position: number }) {
  const cai = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {cai.map((cale) => (
          <motion.path
            key={cale.id}
            d={cale.d}
            stroke="currentColor"
            strokeWidth={cale.width}
            strokeOpacity={0.05 + cale.id * 0.01}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.5, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + (cale.id % 7) * 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function FloatingPaths({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden text-[#3399FF] ${
        className ?? ""
      }`}
      aria-hidden="true"
    >
      <Manunchi position={1} />
      <Manunchi position={-1} />
    </div>
  );
}
