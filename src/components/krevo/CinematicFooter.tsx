"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, Linkedin } from "lucide-react";
import { LINKEDIN_HREF, WHATSAPP_HREF } from "@/lib/krevo/linkuri";

/**
 * Footerul-cortină: stă FIX în spatele paginii, iar pagina se ridică la
 * scroll și îl dezvăluie — clip-path-ul de pe wrapper taie tot ce iese din
 * dreptunghiul lui, deci footerul fix devine vizibil doar la final.
 * Reconstruit nativ pe framer-motion — zero dependențe noi.
 */


/* Butoane magnetice — atrase de cursor, se întorc elastic la loc. */
function Magnetic({
  as = "a",
  className,
  children,
  ...props
}: {
  as?: "a" | "button";
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);

  function misca(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transition = "transform 0.15s ease-out";
    el.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  }

  function pleaca() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate(0px, 0px) scale(1)";
  }

  const Comp = as as React.ElementType;
  return (
    <Comp
      ref={ref}
      onMouseMove={misca}
      onMouseLeave={pleaca}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

function BandaMarquee() {
  return (
    <div className="flex items-center space-x-10 px-5">
      <span>Pontaj cu GPS</span>
      <span className="text-[#3399FF]/60">✦</span>
      <span>Devize din poze</span>
      <span className="text-[#3399FF]/60">✦</span>
      <span>Oferte AI în câteva minute</span>
      <span className="text-[#3399FF]/60">✦</span>
      <span>Facturi + e-Factura</span>
      <span className="text-[#3399FF]/60">✦</span>
      <span>Totul într-un singur loc</span>
      <span className="text-[#3399FF]/60">✦</span>
    </div>
  );
}

const LINKURI_SECUNDARE = [
  { label: "FirmFlow", href: "/firmflow" },
  { label: "Servicii", href: "/servicii" },
  { label: "teodor@krevo.ro", href: "mailto:teodor@krevo.ro" },
  { label: "Termeni", href: "/termeni" },
  { label: "Confidențialitate", href: "/confidentialitate" },
  { label: "Cookies", href: "/cookie-policy" },
];

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  const giantY = useTransform(scrollYProgress, [0, 1], ["12vh", "0vh"]);
  const giantScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const giantOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 1], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 1], [0, 1]);

  const susDeTot = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-md:h-auto md:h-screen"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Pe mobil, cortina devine footer normal — fixed + h-screen sare pe
          telefoane (bara de adresă schimbă înălțimea ecranului la scroll). */}
      <footer className="flex w-full flex-col justify-between overflow-hidden bg-black text-white max-md:relative max-md:min-h-[80vh] max-md:pt-24 md:fixed md:bottom-0 md:left-0 md:h-screen">
        {/* Aurora + grilă — atmosfera */}
        <div
          className="krevo-footer-aurora krevo-breathe pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]"
          aria-hidden="true"
        />
        <div
          className="krevo-footer-grid pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        />

        {/* KREVO uriaș, cu parallax la dezvăluire */}
        <motion.div
          className="krevo-giant-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 whitespace-nowrap select-none"
          style={{ x: "-50%", y: giantY, scale: giantScale, opacity: giantOpacity }}
          aria-hidden="true"
        >
          KREVO
        </motion.div>

        {/* Banda diagonală cu ce face FirmFlow */}
        <div className="absolute top-12 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-black/60 py-3.5 shadow-2xl backdrop-blur-md">
          <div className="krevo-marquee flex w-max text-xs font-bold tracking-[0.3em] text-white/45 uppercase md:text-sm">
            <BandaMarquee />
            <BandaMarquee />
          </div>
        </div>

        {/* Centrul: întrebarea + acțiunile */}
        <motion.div
          className="relative z-10 mx-auto mt-24 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <h2 className="krevo-metal-text mb-10 text-center text-[40px] leading-none font-bold tracking-tighter md:text-7xl">
            Pregătit să treci de la Excel?
          </h2>

          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <Magnetic
                as="a"
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="krevo-glass-pill flex items-center gap-3 rounded-full px-9 py-4.5 text-sm font-bold text-white md:px-10 md:py-5 md:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-white/60" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Scrie-mi pe WhatsApp
              </Magnetic>

              <Magnetic
                as="a"
                href="tel:+40774451822"
                className="krevo-glass-pill flex items-center gap-3 rounded-full px-9 py-4.5 text-sm font-bold text-white md:px-10 md:py-5 md:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Sună-mă: 0774 451 822
              </Magnetic>

              {LINKEDIN_HREF && (
                <Magnetic
                  as="a"
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="krevo-glass-pill flex items-center gap-3 rounded-full px-9 py-4.5 text-sm font-bold text-white md:px-10 md:py-5 md:text-base"
                >
                  <Linkedin className="h-5 w-5 text-white/60" strokeWidth={1.75} aria-hidden="true" />
                  Vezi-mă pe LinkedIn
                </Magnetic>
              )}
            </div>

            <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-4">
              {LINKURI_SECUNDARE.map((l) => (
                <Magnetic
                  key={l.label}
                  as="a"
                  href={l.href}
                  className="krevo-glass-pill rounded-full px-5 py-2.5 text-xs font-medium text-white/60 md:px-6 md:py-3 md:text-sm"
                >
                  {l.label}
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bara de jos */}
        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-5 px-6 pb-7 md:flex-row md:px-12">
          <div className="order-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase md:order-1 md:text-xs">
            © 2026 Krevo{" · "}
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#3399FF]"
            >
              ANPC
            </a>
            {" · "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#3399FF]"
            >
              SOL
            </a>
          </div>

          <div className="krevo-glass-pill order-1 flex cursor-default items-center gap-2.5 rounded-full px-6 py-3 md:order-2">
            <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase md:text-xs">
              Construit{" "}
              <span className="text-[#3399FF]/80">pentru firma ta</span>
            </span>
          </div>

          <Magnetic
            as="button"
            onClick={susDeTot}
            aria-label="Înapoi sus"
            className="krevo-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-white/60 hover:text-white"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={2} />
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
