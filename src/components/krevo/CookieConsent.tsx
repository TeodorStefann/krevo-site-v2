"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "krevo-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept(value: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 320);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-[10000] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 transition-opacity duration-300 sm:bottom-6 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Consimțământ cookies"
    >
      <div className="rounded-2xl border border-[#002B66] bg-[#0a0a0a] px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        <p className="text-center text-[13px] leading-relaxed text-krevo-silver">
          Folosim cookies esențiale pentru funcționarea site-ului. Preferința
          ta este salvată local. Vezi{" "}
          <Link
            href="/confidentialitate"
            className="text-[#3399FF] underline-offset-2 hover:underline"
          >
            Politica de confidențialitate
          </Link>{" "}
          și{" "}
          <Link
            href="/cookie-policy"
            className="text-[#3399FF] underline-offset-2 hover:underline"
          >
            Politica de cookies
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => accept("all")}
            className="min-h-11 rounded-full bg-[#0066FF] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#3399FF]"
          >
            Am înțeles
          </button>
          <button
            type="button"
            onClick={() => accept("essential")}
            className="min-h-11 rounded-full border border-[#0066FF]/60 bg-transparent px-5 py-2.5 text-[13px] font-medium text-krevo-silver transition-colors hover:border-[#0066FF] hover:text-white"
          >
            Doar esențiale
          </button>
        </div>
      </div>
    </div>
  );
}
