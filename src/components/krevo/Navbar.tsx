"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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

function PillNav() {
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
  /* Evidențiem ce e sub cursor; când mouse-ul pleacă, revine la pagina
     curentă. Un singur indicator care alunecă — nu două suprapuse. */
  const evidentiat = hover ?? activ;

  return (
    <motion.nav
      aria-label="Navigație principală"
      className="relative flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-black/40 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={() => setHover(null)}
    >
      {MENIU.map((item) => {
        const esteActiv = activ === item.nume;
        const esteEvidentiat = evidentiat === item.nume;
        return (
          <Link
            key={item.nume}
            href={item.url}
            aria-current={esteActiv ? "page" : undefined}
            onMouseEnter={() => setHover(item.nume)}
            className={`relative rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors duration-200 xl:px-[18px] ${
              esteActiv
                ? "text-white"
                : esteEvidentiat
                  ? "text-white"
                  : "text-white/60"
            }`}
          >
            {/* Indicatorul: UN singur element care alunecă de la un tab la
                altul. Framer face tranziția de poziție și lățime singur,
                prin layoutId — de aici senzația de mecanism precis. */}
            {esteEvidentiat && (
              <motion.span
                layoutId="krevo-indicator"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,102,255,0.32), rgba(0,102,255,0.16))",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.16), 0 0 22px rgba(0,102,255,0.28)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}

            {/* Firul de lumină de sub pagina curentă — rămâne pe loc chiar
                dacă plimbi cursorul peste celelalte, ca să nu pierzi
                niciodată reperul unde te afli. */}
            {esteActiv && (
              <motion.span
                layoutId="krevo-pagina-curenta"
                aria-hidden="true"
                className="absolute -bottom-[3px] left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#3399FF]"
                style={{ boxShadow: "0 0 10px rgba(51,153,255,0.9)" }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}

            <span className="relative z-10">{item.nume}</span>
          </Link>
        );
      })}
    </motion.nav>
  );
}

/* ── Bara propriu-zisă ──────────────────────────────────────────────── */

export function Navbar() {
  const cale = usePathname();
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

        {/* Meniul central — pe toate paginile, identic. */}
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <PillNav />
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
