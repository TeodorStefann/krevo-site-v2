"use client";

import Link from "next/link";

/**
 * Butonul-monument. Se folosește O SINGURĂ DATĂ pe pagină, la CTA-ul final.
 *
 * Dacă apare de cinci ori nu mai e special — devine zgomot. Stilul stă în
 * globals.css (.pearl-button), ca să nu se dubleze eticheta <style> la
 * fiecare randare.
 */

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  extern?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function PearlButton({
  label,
  href,
  onClick,
  extern = false,
  className = "",
  type = "button",
  disabled = false,
}: Props) {
  const continut = (
    <span className="wrap">
      <span className="pearl-line">
        <span className="pearl-sclipici" aria-hidden="true">
          ✦
        </span>
        {label}
      </span>
    </span>
  );

  const clase = `pearl-button ${disabled ? "pearl-button--inactiv" : ""} ${className}`;

  if (href && extern) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clase}>
        {continut}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={clase}>
        {continut}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clase}
    >
      {continut}
    </button>
  );
}

export default PearlButton;
