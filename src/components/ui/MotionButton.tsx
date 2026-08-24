"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Butonul principal al site-ului Krevo.
 *
 * Cercul albastru din stânga se dilată la hover până umple butonul, iar
 * săgeata avansează ușor. Un singur gest, citit instant ca „mergi înainte".
 *
 * Regula de folosire: ăsta e butonul standard, peste tot. Excepția e
 * PearlButton, rezervat unui singur moment — CTA-ul final al paginii.
 */

type Props = {
  label: string;
  /** Link intern (/servicii) sau extern (https://…). Lipsește → e <button>. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Deschide în tab nou — pentru WhatsApp, Cal.com etc. */
  extern?: boolean;
  /** secundar = contur, fără umplere albastră la repaus */
  varianta?: "principal" | "secundar";
  className?: string;
  ariaLabel?: string;
};

export function MotionButton({
  label,
  href,
  onClick,
  type = "button",
  disabled = false,
  extern = false,
  varianta = "principal",
  className = "",
  ariaLabel,
}: Props) {
  const cerc =
    varianta === "principal"
      ? "bg-[#0066FF]"
      : "bg-[#0066FF]/25 group-hover:bg-[#0066FF]";

  const continut = (
    <>
      {/* cercul care se dilată */}
      <span
        className={`block h-12 w-12 overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full ${cerc}`}
        aria-hidden="true"
      />
      {/* săgeata */}
      <span className="absolute top-1/2 left-4 -translate-y-1/2 translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
        <ArrowRight className="h-5 w-5 text-white" strokeWidth={2.2} />
      </span>
      {/* eticheta */}
      <span className="absolute top-1/2 left-1/2 ml-4 -translate-x-1/2 -translate-y-1/2 text-center text-[15px] font-semibold tracking-tight whitespace-nowrap text-white transition-colors duration-500">
        {label}
      </span>
    </>
  );

  const baza = `group relative inline-block h-auto min-w-[15rem] cursor-pointer rounded-full border border-[#0A2A5C] bg-[#05070C] p-1 text-left outline-none transition-shadow duration-500 hover:shadow-[0_0_36px_rgba(0,102,255,0.28)] focus-visible:ring-2 focus-visible:ring-[#3399FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
    disabled ? "pointer-events-none opacity-50" : ""
  } ${className}`;

  if (href && extern) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baza}
        aria-label={ariaLabel ?? label}
      >
        {continut}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baza} aria-label={ariaLabel ?? label}>
        {continut}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baza}
      aria-label={ariaLabel ?? label}
    >
      {continut}
    </button>
  );
}

export default MotionButton;
