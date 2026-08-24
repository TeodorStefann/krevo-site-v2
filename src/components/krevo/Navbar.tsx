"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ── Pastila plutitoare cu robotelul Krevo ──────────────────────────────
   Navigația de desktop: o pastilă de sticlă centrată, cu glow albastru pe
   tabul activ și un robotel care atârnă sub el și te urmărește cu ochii
   LED. Pe mobil rămâne meniul clasic. */

type ElementMeniu = {
  nume: string;
  url: string;
  /** Ancoră pe pagina principală (#despre), nu rută proprie. */
  ancora?: string;
};

const MENIU: ElementMeniu[] = [
  { nume: "Acasă", url: "/" },
  { nume: "FirmFlow", url: "/firmflow" },
  { nume: "Servicii", url: "/servicii" },
  { nume: "Despre", url: "/#despre", ancora: "despre" },
  { nume: "Contact", url: "/#contact", ancora: "contact" },
];

/**
 * Care element e activ — dedus DOAR din adresa curentă.
 *
 * Varianta veche ținea starea într-un `useState` schimbat la click, iar
 * pe paginile care nu se potriveau cu nimic (de pildă /ce-ti-trebuie)
 * rămânea aprins „Acasă” — cu robotel cu tot, sub un tab greșit.
 */
function elementActiv(cale: string, ancora: string): string | null {
  if (cale === "/") {
    const dupaAncora = MENIU.find((m) => m.ancora && m.ancora === ancora);
    return dupaAncora ? dupaAncora.nume : "Acasă";
  }
  if (cale.startsWith("/firmflow")) return "FirmFlow";
  if (cale.startsWith("/servicii")) return "Servicii";
  return null; // /ce-ti-trebuie, paginile legale — niciun tab aprins
}

/** Robotelul Krevo — mascota care stă sub tabul activ. */
function RobotelKrevo({ vesel }: { vesel: boolean }) {
  return (
    <motion.div
      layoutId="krevo-robotel"
      className="pointer-events-none absolute top-full left-1/2 z-20 -translate-x-1/2"
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative h-14 w-12">
        {/* vârful care arată spre tab */}
        <motion.div
          className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2"
          animate={
            vesel
              ? { y: [0, -3, 0], transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } }
              : { y: [0, 2, 0], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }
          }
        >
          <div className="h-full w-full rotate-45 bg-white" />
        </motion.div>

        {/* capul robotelului */}
        <motion.div
          className="absolute top-[9px] left-1/2 h-9 w-10 -translate-x-1/2 rounded-[10px] bg-gradient-to-b from-white to-[#cfe0ff] shadow-[0_6px_18px_rgba(0,102,255,0.4)]"
          animate={
            vesel
              ? {
                  scale: [1, 1.08, 1],
                  rotate: [0, -4, 4, 0],
                  transition: { duration: 0.5, ease: "easeInOut" },
                }
              : {
                  y: [0, -3, 0],
                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          {/* antena */}
          <div className="absolute -top-2 left-1/2 h-2 w-[2px] -translate-x-1/2 bg-white" />
          <span className="absolute -top-[13px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-pulse rounded-full bg-[#3399FF] shadow-[0_0_6px_#3399FF]" />

          {/* ochii LED */}
          <motion.div
            className="absolute h-2 w-2 rounded-[3px] bg-[#0066FF] shadow-[0_0_6px_rgba(51,153,255,0.9)]"
            style={{ left: "22%", top: "34%" }}
            animate={
              vesel
                ? { scaleY: [1, 0.15, 1], transition: { duration: 0.25, times: [0, 0.5, 1] } }
                : {}
            }
          />
          <motion.div
            className="absolute h-2 w-2 rounded-[3px] bg-[#0066FF] shadow-[0_0_6px_rgba(51,153,255,0.9)]"
            style={{ right: "22%", top: "34%" }}
            animate={
              vesel
                ? { scaleY: [1, 0.15, 1], transition: { duration: 0.25, times: [0, 0.5, 1] } }
                : {}
            }
          />

          {/* gura-LED — zâmbește când treci peste meniu */}
          <motion.div
            className="absolute left-1/2 h-[3px] w-4 -translate-x-1/2 rounded-full bg-[#0066FF]/80"
            style={{ top: "66%" }}
            animate={vesel ? { scaleX: 1.35, scaleY: 1.6 } : { scaleX: 1, scaleY: 1 }}
          />

          {/* scântei la hover */}
          <AnimatePresence>
            {vesel && (
              <>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute -top-1 -right-2 text-[10px] text-[#3399FF]"
                >
                  ✦
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -top-2 -left-2 text-[9px] text-[#3399FF]"
                >
                  ✦
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function PillNav({ cuRobotel }: { cuRobotel: boolean }) {
  const cale = usePathname();
  const [ancora, setAncora] = useState("");
  const [hover, setHover] = useState<string | null>(null);

  /* Urmărim și ancora, ca „Despre” și „Contact” să se aprindă corect. */
  useEffect(() => {
    const citeste = () => setAncora(window.location.hash.replace("#", ""));
    citeste();
    window.addEventListener("hashchange", citeste);
    return () => window.removeEventListener("hashchange", citeste);
  }, [cale]);

  const activ = elementActiv(cale, ancora);

  return (
    <motion.div
      className="relative flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 shadow-lg backdrop-blur-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {MENIU.map((item) => {
        const esteActiv = activ === item.nume;
        const esteHover = hover === item.nume;
        return (
          <Link
            key={item.nume}
            href={item.url}
            aria-current={esteActiv ? "page" : undefined}
            onMouseEnter={() => setHover(item.nume)}
            onMouseLeave={() => setHover(null)}
            className={`relative cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors duration-300 xl:px-5 ${
              esteActiv ? "text-white" : "text-white/65 hover:text-white"
            }`}
          >
            {esteActiv && (
              <motion.div
                className="absolute inset-0 -z-10 overflow-hidden rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-full bg-[#0066FF]/25 blur-md" />
                <div className="absolute inset-[-4px] rounded-full bg-[#0066FF]/20 blur-xl" />
                <div className="absolute inset-[-8px] rounded-full bg-[#0066FF]/10 blur-2xl" />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3399FF]/25 to-transparent"
                  style={{ animation: "krevo-shine 3s ease-in-out infinite" }}
                />
              </motion.div>
            )}

            <span className="relative z-10">{item.nume}</span>

            <AnimatePresence>
              {esteHover && !esteActiv && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                />
              )}
            </AnimatePresence>

            {esteActiv && cuRobotel && <RobotelKrevo vesel={hover !== null} />}
          </Link>
        );
      })}
    </motion.div>
  );
}

/* ── Bara propriu-zisă ──────────────────────────────────────────────── */

export function Navbar() {
  const cale = usePathname();
  const esteAcasa = cale === "/";
  const esteDiagnostic = cale.startsWith("/ce-ti-trebuie");
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [derulat, setDerulat] = useState(false);

  /* Meniul de pe telefon blochează derularea paginii de dedesubt. */
  useEffect(() => {
    document.body.style.overflow = meniuDeschis ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [meniuDeschis]);

  /* Se închide singur la schimbarea paginii — altfel rămânea deschis
     peste conținutul nou după ce apăsai un link. */
  useEffect(() => {
    setMeniuDeschis(false);
  }, [cale]);

  /* Escape îl închide, ca orice panou care acoperă ecranul. */
  useEffect(() => {
    if (!meniuDeschis) return;
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMeniuDeschis(false);
    };
    window.addEventListener("keydown", laTasta);
    return () => window.removeEventListener("keydown", laTasta);
  }, [meniuDeschis]);

  /* Transparentă peste hero, sticlă fermă imediat ce pagina se mișcă. */
  useEffect(() => {
    const laDerulare = () => setDerulat(window.scrollY > 24);
    laDerulare();
    window.addEventListener("scroll", laDerulare, { passive: true });
    return () => window.removeEventListener("scroll", laDerulare);
  }, []);

  const inchide = () => setMeniuDeschis(false);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[100] border-b transition-colors duration-300 ${
        derulat
          ? "border-white/[0.09] bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
        <Link
          href="/"
          aria-label="Krevo — pagina principală"
          className="relative z-[101] flex shrink-0 items-center transition-opacity hover:opacity-80"
          onClick={inchide}
        >
          <Image
            src="/krevo-logo.png"
            alt="Krevo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Meniul central apare pe toate paginile. Robotelul rămâne doar
            acasă: pe paginile cu text atârnă sub bară și aterizează peste
            rânduri, iar acasă are hero-ul dedesubt, unde e la locul lui. */}
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <PillNav cuRobotel={esteAcasa} />
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/ce-ti-trebuie"
            aria-current={esteDiagnostic ? "page" : undefined}
            className={`group relative text-[13px] font-semibold transition-colors duration-200 ${
              esteDiagnostic ? "text-white" : "text-white/75 hover:text-white"
            }`}
          >
            Ce îți trebuie?
            <span
              className={`absolute -bottom-1 left-0 h-px bg-[#3399FF] transition-all duration-300 ${
                esteDiagnostic ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-[#0052CC] px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF]"
          >
            Hai să vorbim
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[101] flex h-11 w-11 items-center justify-center rounded-lg border border-[#0066FF]/50 bg-[#0a0a0a]/80 text-[#3399FF] transition-colors hover:border-[#0066FF] hover:text-white lg:hidden"
          aria-label={meniuDeschis ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={meniuDeschis}
          onClick={() => setMeniuDeschis((o) => !o)}
        >
          {meniuDeschis ? (
            <X size={26} strokeWidth={2} />
          ) : (
            <Menu size={26} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* ── Telefon: fundalul ────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[11000] h-[100dvh] bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-out lg:hidden ${
          meniuDeschis ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={inchide}
      />

      {/* ── Telefon: panoul ──────────────────────────────────────────── */}
      <div
        id="meniu-mobil"
        className={`fixed inset-y-0 right-0 z-[11001] flex h-[100dvh] w-full max-w-md flex-col overflow-y-auto bg-[#05070C]/97 shadow-[-20px_0_60px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out lg:hidden ${
          meniuDeschis ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        inert={!meniuDeschis}
      >
        <div className="flex items-center justify-end px-6 pt-6 pb-2">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center text-white transition-colors hover:text-[#3399FF]"
            aria-label="Închide meniul"
            onClick={inchide}
          >
            <X size={30} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-8 pb-16">
          {[
            ...MENIU.slice(0, 3),
            { nume: "Ce îți trebuie?", url: "/ce-ti-trebuie" },
            ...MENIU.slice(3),
          ].map((item) => {
            const activ =
              item.url === cale ||
              (item.url === "/ce-ti-trebuie" && esteDiagnostic);
            return (
              <Link
                key={item.nume}
                href={item.url}
                onClick={inchide}
                aria-current={activ ? "page" : undefined}
                className={`group relative flex min-h-[58px] items-center justify-center px-4 text-[26px] font-bold transition-colors ${
                  activ ? "text-[#3399FF]" : "text-white hover:text-[#99C2FF]"
                }`}
              >
                {item.nume}
                <span
                  className={`absolute bottom-2 left-1/2 h-px -translate-x-1/2 bg-[#0066FF] transition-all duration-300 ${
                    activ ? "w-2/3" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-3 px-8 pb-10">
          <Link
            href="/#contact"
            onClick={inchide}
            className="flex min-h-12 items-center justify-center rounded-full bg-[#0052CC] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF]"
          >
            Hai să vorbim
          </Link>
        </div>
      </div>
    </header>
  );
}
