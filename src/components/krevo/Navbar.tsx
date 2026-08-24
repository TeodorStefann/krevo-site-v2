"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

/* ── Pastila plutitoare cu robotelul Krevo ──────────────────────────────
   Navigația de desktop: o pastilă de sticlă centrată, cu glow albastru pe
   tabul activ și un robotel care atârnă sub el și te urmărește cu ochii
   LED. Pe mobil rămâne meniul clasic. */

const PILL_ITEMS = [
  { name: "Acasă", url: "/" },
  { name: "FirmFlow", url: "/firmflow" },
  { name: "Servicii", url: "/servicii" },
  { name: "Despre", url: "/#despre" },
  { name: "Contact", url: "/#contact" },
];

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

function PillNav() {
  const pathname = usePathname();
  const [activ, setActiv] = useState("Acasă");
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    if (pathname === "/firmflow") setActiv("FirmFlow");
    else if (pathname === "/servicii") setActiv("Servicii");
    else if (pathname === "/")
      setActiv((a) => (a === "Despre" || a === "Contact" ? a : "Acasă"));
  }, [pathname]);

  return (
    <motion.div
      className="relative flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1.5 shadow-lg backdrop-blur-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {PILL_ITEMS.map((item) => {
        const esteActiv = activ === item.name;
        const esteHover = hover === item.name;
        return (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => setActiv(item.name)}
            onMouseEnter={() => setHover(item.name)}
            onMouseLeave={() => setHover(null)}
            className={`relative cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all duration-300 xl:px-5 ${
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

            <span className="relative z-10">{item.name}</span>

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

            {esteActiv && <RobotelKrevo vesel={hover !== null} />}
          </Link>
        );
      })}
    </motion.div>
  );
}

/* ── Navbar-ul propriu-zis ──────────────────────────────────────────── */

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [produseOpen, setProduseOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Transparent peste hero, sticlă blurată imediat ce pagina se mișcă. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setMenuOpen(false);
    setProduseOpen(false);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[100] border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/[0.07] bg-black/25 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
        <Link
          href="/"
          className="relative z-[101] flex shrink-0 items-center transition-opacity hover:opacity-80"
          onClick={closeMobile}
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

        {/* Pastila cu robotelul — centrul navbar-ului, doar pe desktop */}
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <PillNav />
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/ce-ti-trebuie"
            className="text-[13px] font-semibold text-white/70 transition-colors duration-200 hover:text-[#3399FF]"
          >
            Ce îți trebuie?
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
          className="relative z-[101] flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#0066FF]/50 bg-[#0a0a0a]/80 text-[#3399FF] lg:hidden"
          aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Menu size={28} strokeWidth={2} />
        </button>
      </div>

      {/* Mobil — backdrop */}
      <div
        className={`fixed inset-0 z-[11000] h-[100dvh] bg-black/50 backdrop-blur-md transition-opacity duration-300 ease-out lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        onClick={closeMobile}
      />

      {/* Mobil — panoul */}
      <div
        className={`fixed inset-y-0 right-0 z-[11001] flex h-[100dvh] w-full max-w-md flex-col overflow-y-auto bg-[#0a0a0a]/95 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-end px-6 pt-6 pb-2">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center text-white transition-colors hover:text-[#3399FF]"
            aria-label="Închide meniul"
            onClick={closeMobile}
          >
            <X size={32} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-8 pb-20">
          <Link
            href="/servicii"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Servicii
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/ce-ti-trebuie"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Ce îți trebuie?
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="flex w-full flex-col items-center">
            <button
              type="button"
              onClick={() => setProduseOpen((o) => !o)}
              className="group relative flex min-h-[56px] items-center justify-center gap-2 px-4 text-[28px] font-bold text-white"
              aria-expanded={produseOpen}
            >
              Produse
              <ChevronDown
                size={22}
                className={`text-[#3399FF] transition-transform duration-200 ${
                  produseOpen ? "rotate-180" : ""
                }`}
              />
              <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
            </button>
            {produseOpen ? (
              <Link
                href="/firmflow"
                onClick={closeMobile}
                className="group relative mt-1 flex min-h-[48px] items-center justify-center gap-2 px-4 text-[20px] font-semibold text-[#99C2FF]"
              >
                FirmFlow
                <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : null}
          </div>

          <Link
            href="/#despre"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Despre
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/#contact"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Contact
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        <div className="flex flex-col gap-3 px-8 pb-10">
          <Link
            href="/#contact"
            onClick={closeMobile}
            className="flex min-h-12 items-center justify-center rounded-full bg-[#0052CC] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF]"
          >
            Hai să vorbim
          </Link>
        </div>
      </div>
    </header>
  );
}
