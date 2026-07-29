"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function Counter({ value, duration = 1800, className }: CounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    setDisplay(0);
    let cancelled = false;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span className={className}>{display.toLocaleString("ro-RO")}</span>
  );
}
