"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { springBounce, springNatural } from "./animations/motionConfig";
import { MotionButton } from "@/components/ui/MotionButton";
import { RezervaCall } from "./RezervaCall";
import Link from "next/link";

/* ── Tuning ─────────────────────────────────────────────────────────────
   SCROLL_VH   total height of the pinned intro (100 = no extra scroll)
   ARM_AT      progress (0-1) where the approach lands: bounce + laser

   Regia: mesajul e pe ecran DIN PRIMA FRAME. Cinematicul (apropierea,
   aterizarea, laserul) se joacă în jurul lui, pe măsură ce vizitatorul
   derulează — niciodată înaintea lui. Fără typewriter, fără scroll lock.
   ──────────────────────────────────────────────────────────────────── */
const SCROLL_VH = 185;
const ARM_AT = 0.72;
/* Beat 1: the landing bounce. */
const SETTLE_MS = 1100;
/* Beat 2: the beam rises right after the landing settles — no dead air. */
const LASER_DELAY_MS = SETTLE_MS + 500;
const LASER_GROW_MS = 1800;

/* Intrinsic size of hero-1-stars.png / hero-2-pyramid.png */
const IMG_W = 1672;
const IMG_H = 941;
const TIP_NX = 0.737;
const TIP_NY = 0.465;
const BASE_NX = 0.737;
const BASE_NY = 0.9;

/** Masked word-reveal: each word rises out of its own invisible slot,
    in a tight cascade. Premium, not typewriter. */
function WordReveal({
  text,
  start,
  base,
  step = 0.14,
}: {
  text: string;
  start: boolean;
  base: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              animate={start ? { y: 0 } : { y: "115%" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: base + i * step,
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  tw: number;
  ph: number;
  depth: number;
};
type Dust = { x: number; y: number; r: number; sp: number; a: number };

export function HeroCinematic({ siteReady = false }: { siteReady?: boolean }) {
  const outerRef = useRef<HTMLElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const dustRef = useRef<Dust[]>([]);
  const progressRef = useRef(0);
  const armedRef = useRef(false);
  const armedAtRef = useRef(0);

  /* "simple" = phone or reduced motion: just the pyramid, no scroll cinema,
     no canvas, no laser. SSR-safe default so there is no hydration mismatch. */
  const [simple, setSimple] = useState(true);
  const [armed, setArmed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setSimple(mq.matches || !!reduceMotion);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduceMotion]);

  /* The section changes height when the mode settles — nudge Motion to
     re-measure, otherwise scroll progress is computed from the old height. */
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new Event("resize")),
    );
    return () => cancelAnimationFrame(id);
  }, [simple]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const pyramidScale = useTransform(scrollYProgress, [0, ARM_AT], [0.58, 1]);
  const pyramidX = useTransform(scrollYProgress, [0, ARM_AT], ["-22%", "0%"]);
  const pyramidOpacity = useTransform(
    scrollYProgress,
    [0, ARM_AT * 0.6, ARM_AT],
    [0.62, 0.85, 1],
  );
  const skyScale = useTransform(scrollYProgress, [0, ARM_AT], [1.12, 1]);
  const skyX = useTransform(scrollYProgress, [0, ARM_AT], ["-4%", "0%"]);
  const vignette = useTransform(scrollYProgress, [0, ARM_AT], [0.55, 0.85]);
  const scrollHint = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    /* Hard guard: whatever the measured progress claims, the sequence may only
       fire once the page has genuinely been scrolled down. */
    const scrolled = typeof window !== "undefined" && window.scrollY > 120;
    /* One-way: the reveal plays once and the hero then stays in its final
       state. Scrolling back up must never rewind the beam. */
    if (!simple && scrolled && v >= ARM_AT && !armedRef.current) {
      armedRef.current = true;
      armedAtRef.current = performance.now();
      setArmed(true);
    }
  });

  useEffect(() => {
    if (simple) return;
    const bg = bgCanvasRef.current;
    const fx = fxCanvasRef.current;
    if (!bg || !fx) return;
    const bctx = bg.getContext("2d");
    const fctx = fx.getContext("2d");
    if (!bctx || !fctx) return;

    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 150 }, () => {
        const depth = Math.random();
        return {
          x: Math.random(),
          y: Math.random() * 0.82,
          r: 0.4 + Math.random() * (1.3 - depth * 0.7),
          base: 0.3 + Math.random() * 0.6,
          tw: 0.5 + Math.random() * 2.2,
          ph: Math.random() * Math.PI * 2,
          depth,
        };
      });
      dustRef.current = Array.from({ length: 34 }, () => ({
        x: Math.random(),
        y: 0.55 + Math.random() * 0.45,
        r: 0.6 + Math.random() * 1.8,
        sp: 0.5 + Math.random() * 1.5,
        a: 0.08 + Math.random() * 0.28,
      }));
    }

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = bg.clientWidth;
      h = bg.clientHeight;
      for (const c of [bg, fx]) {
        c.width = Math.floor(w * dpr);
        c.height = Math.floor(h * dpr);
      }
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const apex = () => {
      const s = Math.max(w / IMG_W, h / IMG_H);
      const dw = IMG_W * s;
      const dh = IMG_H * s;
      return { x: (w - dw) / 2 + TIP_NX * dw, y: h - dh + TIP_NY * dh };
    };

    /* A refined beam: no white-hot core, no hard bloom. Three very soft
       overlapping columns + a slow breath. Reads as light, not a spotlight. */
    const buildLaser = (
      ctx: CanvasRenderingContext2D,
      x: number,
      yBase: number,
      yTop: number,
      breath: number,
    ) => {
      const len = yBase - yTop;
      if (len < 2) return;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      // 1) wide atmospheric haze — barely there, blurred so the column has
      //    no straight edges and melts into the sky
      ctx.filter = "blur(14px)";
      const haze = ctx.createLinearGradient(x, yBase, x, yTop);
      haze.addColorStop(0, `rgba(40,110,220,${0.1 * breath})`);
      haze.addColorStop(0.35, `rgba(55,130,235,${0.07 * breath})`);
      haze.addColorStop(1, "rgba(80,160,255,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(x - 40, yTop, 80, len);
      ctx.filter = "none";

      // 2) mid glow — softly feathered as well
      ctx.filter = "blur(4px)";
      const mid = ctx.createLinearGradient(x, yBase, x, yTop);
      mid.addColorStop(0, `rgba(90,165,255,${0.2 * breath})`);
      mid.addColorStop(0.45, `rgba(110,180,255,${0.12 * breath})`);
      mid.addColorStop(1, "rgba(130,195,255,0)");
      ctx.fillStyle = mid;
      ctx.fillRect(x - 9, yTop, 18, len);
      ctx.filter = "none";

      // 3) slender core — soft blue-white, never pure white
      const core = ctx.createLinearGradient(x, yBase, x, yTop);
      core.addColorStop(0, `rgba(205,228,255,${0.5 * breath})`);
      core.addColorStop(0.5, `rgba(175,210,255,${0.3 * breath})`);
      core.addColorStop(1, "rgba(160,200,255,0)");
      ctx.strokeStyle = core;
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(110,175,255,${0.5 * breath})`;
      ctx.beginPath();
      ctx.moveTo(x, yBase);
      ctx.lineTo(x, yTop);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4) a small, gentle halo where it leaves the apex
      const r = 26;
      const halo = ctx.createRadialGradient(x, yBase, 0, x, yBase, r);
      halo.addColorStop(0, `rgba(180,215,255,${0.3 * breath})`);
      halo.addColorStop(0.5, `rgba(110,175,255,${0.12 * breath})`);
      halo.addColorStop(1, "rgba(90,160,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, yBase, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const t0 = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      // once revealed the scene is locked to its final framing
      const p = armedRef.current ? ARM_AT : progressRef.current;

      bctx.clearRect(0, 0, w, h);
      for (const s of starsRef.current) {
        const par = 0.08 + s.depth * 0.5;
        let X = s.x * w - (p * 70 + t * 2.5) * par;
        X = ((X % w) + w) % w;
        const a = Math.max(0, s.base * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)));
        bctx.beginPath();
        bctx.arc(X, s.y * h, s.r, 0, Math.PI * 2);
        bctx.fillStyle = `rgba(200,225,255,${a})`;
        bctx.shadowBlur = s.r * 3;
        bctx.shadowColor = `rgba(80,150,255,${a * 0.6})`;
        bctx.fill();
      }
      bctx.shadowBlur = 0;

      fctx.clearRect(0, 0, w, h);

      for (const d of dustRef.current) {
        let X = d.x * w - (p * 260 + t * 9) * d.sp;
        X = ((X % (w * 1.2)) + w * 1.2) % (w * 1.2);
        fctx.beginPath();
        fctx.arc(X, d.y * h + Math.sin(t * 0.5 + d.x * 9) * 5, d.r, 0, Math.PI * 2);
        fctx.fillStyle = `rgba(150,195,255,${d.a * (0.3 + p * 0.7)})`;
        fctx.fill();
      }

      if (armedRef.current) {
        const since = now - armedAtRef.current;

        /* Beat 1 — a soft shockwave at the base the moment it lands. */
        if (since < 900) {
          const a = apex();
          const k = since / 900;
          const rr = 40 + k * 190;
          fctx.save();
          fctx.globalCompositeOperation = "lighter";
          fctx.strokeStyle = `rgba(120,180,255,${0.22 * (1 - k)})`;
          fctx.lineWidth = 2 * (1 - k) + 0.4;
          fctx.beginPath();
          fctx.ellipse(a.x, a.y + (h - a.y) * 0.72, rr, rr * 0.18, 0, 0, Math.PI * 2);
          fctx.stroke();
          fctx.restore();
        }

        /* Beat 2 — the beam waits its dramatic pause, then rises slowly. */
        if (since > LASER_DELAY_MS) {
          const a = apex();
          const gr = Math.min(1, (since - LASER_DELAY_MS) / LASER_GROW_MS);
          const ease = 1 - Math.pow(1 - gr, 3);
          const breath = 0.86 + 0.14 * Math.sin(t * 1.6);
          buildLaser(fctx, a.x, a.y, a.y * (1 - ease), breath);
        }
      }

      if (ruleaza) raf = requestAnimationFrame(draw);
    };

    /* Bucla desenează 150 de stele + 34 de particule la fiecare frame —
       nu are ce căuta pornită când hero-ul e demult ieșit din ecran.
       O oprim/pornim după vizibilitate. */
    let ruleaza = false;
    const porneste = () => {
      if (ruleaza) return;
      ruleaza = true;
      raf = requestAnimationFrame(draw);
    };
    const opreste = () => {
      ruleaza = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? porneste() : opreste()),
      { threshold: 0 }
    );
    io.observe(bg);
    porneste();

    return () => {
      io.disconnect();
      opreste();
      window.removeEventListener("resize", resize);
    };
  }, [simple]);

  /* The copy shows the moment the site is ready — it never waits for scroll. */
  const revealed = simple || siteReady;
  const hx = simple ? -36 : -80;
  const nowT = { duration: 0 };
  const staticText = simple && !!reduceMotion;

  const Copy = (
    <div className="relative z-10 mx-auto w-full max-w-7xl">
      <div className="max-w-2xl text-center md:text-left">
        <motion.p
          initial={staticText ? false : { opacity: 0, x: hx }}
          animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: hx }}
          transition={staticText ? nowT : { ...springNatural, delay: 0.1 }}
          className="mb-3 text-[14px] font-semibold tracking-widest text-[#3399FF] uppercase"
        >
          Krevo
        </motion.p>


        <h1
          className="text-[32px] leading-tight font-bold tracking-[-0.02em] text-white md:text-[50px]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
        >
          {staticText ? (
            <>
              Firmele mari au sisteme.{" "}
              <br className="hidden md:block" />
              Tu ai <span className="text-[#3399FF]">Excel.</span>
            </>
          ) : (
            <>
              <WordReveal
                text="Firmele mari au sisteme."
                start={revealed}
                base={0.2}
              />{" "}
              <br className="hidden md:block" />
              <WordReveal text="Tu ai" start={revealed} base={0.95} />{" "}
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="hero-accent-sheen inline-block"
                  initial={{ y: "115%", backgroundPosition: "120% 0" }}
                  animate={
                    revealed
                      ? { y: 0, backgroundPosition: "-60% 0" }
                      : { y: "115%", backgroundPosition: "120% 0" }
                  }
                  transition={{
                    y: {
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 1.3,
                    },
                    backgroundPosition: {
                      duration: 1.1,
                      ease: "easeOut",
                      delay: 2.3,
                    },
                  }}
                >
                  Excel.
                </motion.span>
              </span>
            </>
          )}
        </h1>

        <p
          className="mt-4 text-[20px] font-bold text-white md:text-[24px]"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.85)" }}
        >
          {staticText ? (
            "Până acum."
          ) : (
            <WordReveal text="Până acum." start={revealed} base={1.75} />
          )}
        </p>

        <motion.p
          initial={staticText ? false : { opacity: 0, y: 18 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={
            staticText
              ? nowT
              : { duration: 0.6, delay: 2.15, ease: [0.22, 1, 0.36, 1] }
          }
          className="mx-auto mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-white/75 md:mx-0 md:text-[17px]"
          style={{ textShadow: "0 1px 14px rgba(0,0,0,0.8)" }}
        >
          FirmFlow — platforma pentru firmele care lucrează pe teren:
          construcții, instalații, inginerie. Pontaj cu GPS, devize din poze,
          oferte cu AI.
        </motion.p>

        <motion.div
          initial={staticText ? false : { opacity: 0, y: 18 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={staticText ? nowT : { ...springBounce, delay: 2.4 }}
          className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-center"
        >
          <MotionButton label="Vezi FirmFlow" href="/firmflow" />
          <RezervaCall context="Din hero — încă nu mi-am ales domeniul" />
        </motion.div>

        {/* Ieșirea pentru cine nu știe încă ce vrea. Text, nu al treilea
            buton — trei butoane înseamnă zero decizii. */}
        <motion.div
          initial={staticText ? false : { opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={
            staticText ? nowT : { duration: 0.6, delay: 2.7, ease: [0.22, 1, 0.36, 1] }
          }
          className="mt-6 flex justify-center md:justify-start"
        >
          <Link
            href="/ce-ti-trebuie"
            className="group inline-flex items-center gap-2 text-[14.5px] text-white/55 transition-colors hover:text-[#3399FF]"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          >
            Nu știi de unde să începi?
            <span className="font-semibold text-[#3399FF] underline decoration-[#3399FF]/40 underline-offset-4 transition-colors group-hover:decoration-[#3399FF]">
              Află în 30 de secunde
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>

      </div>
    </div>
  );

  /* ── One stable <section> for both modes ───────────────────────────────
     The element useScroll measures must NEVER be swapped out. Rendering a
     different <section> per mode left Motion holding a stale measurement,
     which made the sequence arm itself while the page was still at the top.
     ──────────────────────────────────────────────────────────────────── */
  return (
    <section
      ref={outerRef}
      className="relative"
      style={{ height: simple ? "100vh" : `${SCROLL_VH}vh` }}
    >
      {simple ? (
        <div className="relative flex h-screen w-full items-center overflow-hidden px-6 pt-24 pb-16">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            {/* piramida-blue.png nu a existat niciodată în /public — pe
                telefon primul ecran era negru gol. Folosim aceeași piramidă
                ca pe desktop, în WebP (77 KB în loc de 1,9 MB). */}
            <Image
              src="/hero-2-pyramid.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
              style={{ opacity: 0.85 }}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.32) 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 z-[2] h-[140px] w-full"
            style={{ background: "linear-gradient(180deg, transparent 0%, #000 100%)" }}
            aria-hidden="true"
          />
          {Copy}
        </div>
      ) : (
      <div
        className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-black px-6 pt-24 pb-16"
        style={{ opacity: siteReady ? 1 : 0, transition: "opacity 0.6s ease-out" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            scale: armed ? 1 : skyScale,
            x: armed ? "0%" : skyX,
            transformOrigin: "50% 60%",
          }}
          aria-hidden="true"
        >
          {/* Landing bounce, far plane — smallest amplitude. */}
          <motion.div
            className="absolute inset-0"
            animate={armed ? { y: [0, 7, -3, 1, 0] } : { y: 0 }}
            transition={{
              duration: SETTLE_MS / 1000,
              times: [0, 0.32, 0.58, 0.8, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/hero-1-stars.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </motion.div>
        </motion.div>

        <canvas
          ref={bgCanvasRef}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            scale: armed ? 1 : pyramidScale,
            x: armed ? "0%" : pyramidX,
            opacity: armed ? 1 : pyramidOpacity,
            transformOrigin: `${BASE_NX * 100}% ${BASE_NY * 100}%`,
          }}
          aria-hidden="true"
        >
          {/* Landing bounce, subject plane — the one you actually feel. */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: `${BASE_NX * 100}% ${BASE_NY * 100}%` }}
            animate={
              armed
                ? { y: [0, 22, -9, 3, 0], scale: [1, 1.025, 0.996, 1.003, 1] }
                : { y: 0, scale: 1 }
            }
            transition={{
              duration: SETTLE_MS / 1000,
              times: [0, 0.32, 0.58, 0.8, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/hero-2-pyramid.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            opacity: armed ? 0.85 : vignette,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0) 72%)",
          }}
          aria-hidden="true"
        />

        <canvas
          ref={fxCanvasRef}
          className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 z-[5] h-[160px] w-full"
          style={{ background: "linear-gradient(180deg, transparent 0%, #000 100%)" }}
          aria-hidden="true"
        />

        {Copy}

        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase"
          style={{ opacity: scrollHint }}
          aria-hidden="true"
        >
          Scroll ↓
        </motion.div>
      </div>
      )}
    </section>
  );
}
