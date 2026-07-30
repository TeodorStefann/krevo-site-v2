"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades every top-level <section> in as it enters the viewport.
 * Sections already on screen at mount are revealed without animation so the
 * first paint never flickers.
 */
export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section"),
    ).filter((el) => !el.parentElement?.closest("section"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    for (const section of sections) {
      section.classList.add("reveal-section");

      if (section.getBoundingClientRect().top < window.innerHeight) {
        section.classList.add("is-revealed");
        continue;
      }

      observer.observe(section);
    }

    return () => {
      observer.disconnect();
      for (const section of sections) {
        section.classList.remove("reveal-section", "is-revealed");
      }
    };
  }, [pathname]);

  return null;
}
