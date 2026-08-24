"use client";

import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [brandVisible, setBrandVisible] = useState(false);
  const [lineExpanded, setLineExpanded] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Phase 1 — brand fade-in (0 → 0.5s)
    const brandTimer = setTimeout(() => setBrandVisible(true), 20);
    // Phase 2 — line grows (0.5 → 1.1s)
    const lineTimer = setTimeout(() => setLineExpanded(true), 500);
    // Phase 3 — tagline fade-in (1.1 → 1.5s)
    const taglineTimer = setTimeout(() => setTaglineVisible(true), 1100);
    // Phase 4 — hold (1.5 → 1.6s)
    // Phase 5 — fade-out (1.6 → 1.9s)
    const fadeTimer = setTimeout(() => setFadingOut(true), 1600);
    const doneTimer = setTimeout(() => onComplete(), 1900);

    return () => {
      clearTimeout(brandTimer);
      clearTimeout(lineTimer);
      clearTimeout(taglineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000]"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex items-center gap-3"
          style={{
            opacity: brandVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/krevo-logo.png"
            alt="Krevo"
            style={{ height: 44, width: "auto", display: "block" }}
          />
          <span className="font-serif text-[32px] font-bold text-[#3399FF]">
            KREVO
          </span>
        </div>

        <div className="mt-4 flex w-[180px] justify-start">
          <div
            style={{
              width: lineExpanded ? 180 : 0,
              height: 1,
              backgroundColor: "#0066FF",
              transition: "width 0.6s ease",
            }}
          />
        </div>

        <p
          className="mt-4 text-center text-[12px] tracking-wide text-[#a0a0a0]"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          Construim fundația digitală a firmei tale.
        </p>
      </div>
    </div>
  );
}
