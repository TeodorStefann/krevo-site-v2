"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-[2px] transition-[width] duration-150 ease-out"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #0066FF 0%, #3399FF 100%)",
      }}
      aria-hidden="true"
    />
  );
}
