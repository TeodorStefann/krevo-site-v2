"use client";

import { useEffect } from "react";

/**
 * Every load starts at the top of the page.
 *
 * Browsers restore the previous scroll position on refresh, which on this site
 * meant landing mid-way through the hero — pyramid already assembled, laser
 * already firing. Switching restoration to "manual" hands that decision to us.
 *
 * A real anchor in the URL (krevo.ro/#contact) is still honoured.
 */
export function ScrollTop() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) return;

    const toTop = () => window.scrollTo(0, 0);

    toTop();
    // some browsers restore the offset after paint — override it once more
    const raf = requestAnimationFrame(toTop);
    window.addEventListener("load", toTop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", toTop);
    };
  }, []);

  return null;
}
