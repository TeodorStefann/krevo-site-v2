"use client";

import { useCallback, useRef } from "react";

/**
 * Clip „econom": pornește doar cât e pe ecran, se oprește când iese.
 * Cine are „reduce motion" activat în sistem primește clipul oprit,
 * cu butoane de redare — îl pornește el, dacă vrea.
 *
 * Se folosește ca ref pe <video>, în locul lui autoPlay:
 *   const refClip = useClipEconom();
 *   <video ref={refClip} muted loop playsInline ... />
 */
export function useClipEconom() {
  const observator = useRef<IntersectionObserver | null>(null);

  return useCallback((el: HTMLVideoElement | null) => {
    observator.current?.disconnect();
    observator.current = null;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      el.controls = true;
      return;
    }

    const obs = new IntersectionObserver(
      ([intrare]) => {
        if (intrare.isIntersecting) {
          void el.play().catch(() => {
            /* browserul poate refuza autoplay — nu e o eroare */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    observator.current = obs;
  }, []);
}
