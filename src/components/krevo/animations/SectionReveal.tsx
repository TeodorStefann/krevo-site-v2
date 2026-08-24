"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Așază secțiunile în pagină cu o intrare lină, O SINGURĂ DATĂ.
 *
 * Opt-in: doar <section data-reveal> este animată.
 *
 * Odată ce o secțiune a intrat, rămâne așezată definitiv — scrollul
 * înainte și înapoi nu mai rejoacă nimic. Textul nu mai „sare".
 */
export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" },
    );

    for (const section of sections) {
      section.classList.add("reveal-section");

      // deja pe ecran la prima încărcare: apare instant, fără animație
      if (section.getBoundingClientRect().top < window.innerHeight) {
        section.classList.add("reveal-static");
      } else {
        observer.observe(section);
      }
    }

    return () => {
      observer.disconnect();
      for (const section of sections) {
        section.classList.remove(
          "reveal-section",
          "is-revealed",
          "reveal-static",
        );
      }
    };
  }, [pathname]);

  return null;
}
