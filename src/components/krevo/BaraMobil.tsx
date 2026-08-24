"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { linkProgramare } from "@/lib/krevo/programare";

/**
 * Bara fixă de pe telefon.
 *
 * Apare abia după ce omul a derulat dincolo de hero — altfel acoperă
 * primul lucru pe care îl vede — și dispare când ajunge aproape de
 * subsol, ca să nu stea peste butonul final.
 */
export function BaraMobil() {
  const [vizibila, setVizibila] = useState(false);

  useEffect(() => {
    function laDerulare() {
      const y = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const aproapeDeFinal = total > 0 && y / total > 0.86;
      setVizibila(y > 700 && !aproapeDeFinal);
    }

    laDerulare();
    window.addEventListener("scroll", laDerulare, { passive: true });
    window.addEventListener("resize", laDerulare);
    return () => {
      window.removeEventListener("scroll", laDerulare);
      window.removeEventListener("resize", laDerulare);
    };
  }, []);

  return (
    <AnimatePresence>
      {vizibila && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#0F2647] bg-[#05070C]/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center gap-2.5">
            <Link
              href="/ce-ti-trebuie"
              className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-[#0F2647] px-4 text-[14px] font-semibold text-krevo-body transition-colors hover:text-white"
            >
              Ce îți trebuie?
            </Link>
            <a
              href={linkProgramare("Din bara de pe telefon")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0066FF] px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#0052CC]"
            >
              <CalendarClock className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              15 minute
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BaraMobil;
