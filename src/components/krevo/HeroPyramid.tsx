"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type HeroPyramidProps = {
  trackRef: RefObject<HTMLDivElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
};

/** Pyramid tip as fraction of the hero container (desktop). */
const TIP_NX = 0.74;
const TIP_NY = 0.43;

const LASER_DELAY_MS = 1500;
const LASER_GROW_MS = 1200;
const EXPLOSION_MS = 600;
const LIGHTNING_MS = 500;
const LIGHTNING_INTERVAL_MS = 2000;
const RAY_COUNT = 16;
const BURST_PARTICLES = 24;
const LIGHTNING_COUNT = 7;

type BurstParticle = {
  angle: number;
  dist: number;
  size: number;
  color: string;
};

type LightningBolt = {
  angle: number;
  length: number;
  color: string;
  seed: number;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Organic wavy beam path from tip (bottom) toward topY, gently shifting ±2–3px. */
function buildLivingBeamPath(
  tipX: number,
  tipY: number,
  topY: number,
  timeSec: number,
): string {
  const length = tipY - topY;
  if (length < 1) return `M ${tipX} ${tipY}`;

  const segments = Math.max(12, Math.ceil(length / 6));
  let d = `M ${tipX.toFixed(2)} ${tipY.toFixed(2)}`;

  for (let i = 1; i <= segments; i++) {
    const u = i / segments;
    const y = tipY - u * length;
    const wave =
      Math.sin(u * Math.PI * 2.8 + timeSec * 2.1) * 2.4 +
      Math.sin(u * Math.PI * 1.1 + timeSec * 1.35) * 0.9;
    const x = tipX + wave;
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return d;
}

/** Short zigzag path along an angle, length in px. */
function zigzagPath(angle: number, length: number, seed: number): string {
  const segments = 4;
  const mid = length / segments;
  let d = `M 0 0`;
  for (let i = 1; i <= segments; i++) {
    const along = i * mid;
    const zig =
      (i % 2 === 0 ? 1 : -1) *
      (2.5 + ((seed * i * 3) % 5)) *
      (1 - i / (segments + 1));
    const px = Math.cos(angle) * along - Math.sin(angle) * zig;
    const py = Math.sin(angle) * along + Math.cos(angle) * zig;
    d += ` L ${px.toFixed(2)} ${py.toFixed(2)}`;
  }
  return d;
}

/**
 * Auto-play laser: after delay, grows from pyramid tip to top of screen,
 * burst on arrival, then subtle repeating lightning. Stays extended permanently.
 * Hidden on mobile.
 */
export function HeroPyramid({ sectionRef }: HeroPyramidProps) {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [geom, setGeom] = useState({
    w: 0,
    h: 0,
    tipXpx: 0,
    tipYpx: 0,
  });
  const [explosionT, setExplosionT] = useState(0);
  const [explosionDone, setExplosionDone] = useState(false);
  const [lightningT, setLightningT] = useState(0);
  const [lightningCycle, setLightningCycle] = useState(0);

  const explosionRafRef = useRef(0);
  const lightningRafRef = useRef(0);
  const growRafRef = useRef(0);
  const lightningIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const explosionStarted = useRef(false);
  const explosionStartMs = useRef(0);

  const rays = useMemo(
    () =>
      Array.from({ length: RAY_COUNT }, (_, i) => {
        const angle = (i / RAY_COUNT) * Math.PI * 2 + 0.2;
        const length = 40 + ((i * 17) % 41);
        return { angle, length, color: i % 2 === 0 ? "#a855f7" : "#ffffff" };
      }),
    [],
  );

  const burstParticles = useMemo<BurstParticle[]>(
    () =>
      Array.from({ length: BURST_PARTICLES }, (_, i) => ({
        angle: (i / BURST_PARTICLES) * Math.PI * 2 + (i % 5) * 0.07,
        dist: 28 + ((i * 13) % 55),
        size: 1.2 + (i % 4) * 0.55,
        color: i % 3 === 0 ? "#ffffff" : "#a855f7",
      })),
    [],
  );

  const lightnings = useMemo<LightningBolt[]>(
    () =>
      Array.from({ length: LIGHTNING_COUNT }, (_, i) => ({
        angle:
          (i / LIGHTNING_COUNT) * Math.PI * 2 +
          lightningCycle * 0.35 +
          i * 0.11,
        length: 20 + ((i * 11 + lightningCycle * 7) % 21),
        color: i % 2 === 0 ? "#a855f7" : "#ffffff",
        seed: i * 4.2 + lightningCycle * 1.7,
      })),
    [lightningCycle],
  );

  const [animT, setAnimT] = useState(0);
  const animRafRef = useRef(0);

  const playLightning = () => {
    const start = performance.now();
    setLightningCycle((c) => c + 1);
    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / LIGHTNING_MS);
      setLightningT(easeOutCubic(raw));
      if (raw < 1) {
        lightningRafRef.current = requestAnimationFrame(tick);
      } else {
        setLightningT(0);
      }
    };
    cancelAnimationFrame(lightningRafRef.current);
    lightningRafRef.current = requestAnimationFrame(tick);
  };

  const startLightningLoop = () => {
    if (lightningIntervalRef.current) return;
    playLightning();
    lightningIntervalRef.current = setInterval(
      playLightning,
      LIGHTNING_INTERVAL_MS,
    );
  };

  const stopLightningLoop = () => {
    if (lightningIntervalRef.current) {
      clearInterval(lightningIntervalRef.current);
      lightningIntervalRef.current = null;
    }
    cancelAnimationFrame(lightningRafRef.current);
    setLightningT(0);
  };

  const startExplosion = () => {
    if (explosionStarted.current) return;
    explosionStarted.current = true;
    explosionStartMs.current = performance.now();
    setExplosionDone(false);

    const tick = (now: number) => {
      const raw = Math.min(
        1,
        (now - explosionStartMs.current) / EXPLOSION_MS,
      );
      setExplosionT(easeOutCubic(raw));
      if (raw < 1) {
        explosionRafRef.current = requestAnimationFrame(tick);
      } else {
        setExplosionDone(true);
        setExplosionT(1);
      }
    };
    explosionRafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      setAnimT((now - start) / 1000);
      animRafRef.current = requestAnimationFrame(tick);
    };
    animRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRafRef.current);
  }, []);

  // Geometry + mobile detection (no scroll)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerWidth = rect.width || el.clientWidth;
      const containerHeight = rect.height || el.clientHeight;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      setGeom({
        w: containerWidth,
        h: containerHeight,
        tipXpx: TIP_NX * containerWidth,
        tipYpx: TIP_NY * containerHeight,
      });
    };

    window.addEventListener("resize", compute, { passive: true });
    const resizeObserver = new ResizeObserver(() => compute());
    resizeObserver.observe(section);
    compute();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [sectionRef]);

  // Auto-play: delay → grow ease-out → stay permanently
  useEffect(() => {
    if (isMobile) {
      setProgress(0);
      stopLightningLoop();
      return;
    }

    let cancelled = false;

    const delayTimer = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const raw = Math.min(1, (now - start) / LASER_GROW_MS);
        const p = easeOutCubic(raw);
        setProgress(p);
        if (raw < 1) {
          growRafRef.current = requestAnimationFrame(tick);
        } else {
          setProgress(1);
          startExplosion();
          startLightningLoop();
        }
      };
      growRafRef.current = requestAnimationFrame(tick);
    }, LASER_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(growRafRef.current);
      cancelAnimationFrame(explosionRafRef.current);
      stopLightningLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run when mobile breakpoint flips
  }, [isMobile]);

  const { tipXpx, tipYpx, w, h } = geom;
  const laserLength = progress * tipYpx;
  const topY = tipYpx - laserLength;
  const visible = laserLength > 1;
  const fullyExtended = progress >= 0.98;
  const burstActive = explosionStarted.current && !explosionDone;
  const burstOpacity = burstActive
    ? explosionT < 0.35
      ? explosionT / 0.35
      : 1 - (explosionT - 0.35) / 0.65
    : 0;
  const lightningOpacity =
    lightningT <= 0
      ? 0
      : lightningT < 0.3
        ? lightningT / 0.3
        : 1 - (lightningT - 0.3) / 0.7;

  const beamPath = visible
    ? buildLivingBeamPath(tipXpx, tipYpx, topY, animT)
    : "";
  // Subtle breath when fully extended — 80% ↔ 100% every 2s
  const breath = fullyExtended
    ? 0.8 + 0.2 * (0.5 + 0.5 * Math.sin(animT * Math.PI))
    : 1;

  if (isMobile || !geom.w) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] hidden h-full w-full overflow-visible md:block"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <defs>
        <linearGradient
          id="laser-core-grad"
          gradientUnits="userSpaceOnUse"
          x1={tipXpx}
          y1={tipYpx}
          x2={tipXpx}
          y2={topY}
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient
          id="laser-mid-grad"
          gradientUnits="userSpaceOnUse"
          x1={tipXpx}
          y1={tipYpx}
          x2={tipXpx}
          y2={topY}
        >
          <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient
          id="laser-glow-grad"
          gradientUnits="userSpaceOnUse"
          x1={tipXpx}
          y1={tipYpx}
          x2={tipXpx}
          y2={topY}
        >
          <stop offset="0%" stopColor="#6b21a8" stopOpacity="1" />
          <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.35" />
        </linearGradient>

        <filter
          id="laser-medium-blur"
          filterUnits="userSpaceOnUse"
          x={tipXpx - 40}
          y={Math.min(topY, tipYpx) - 40}
          width={80}
          height={Math.max(laserLength, 1) + 80}
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="burst-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {visible && (
        <g opacity={breath}>
          {/* Wide atmospheric glow — 20px */}
          <path
            d={beamPath}
            stroke="url(#laser-glow-grad)"
            strokeWidth={20}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={0.15}
          />
          {/* Medium beam — 4px + blur */}
          <path
            d={beamPath}
            stroke="url(#laser-mid-grad)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={0.6}
            filter="url(#laser-medium-blur)"
          />
          {/* Ultra-thin core — 1px */}
          <path
            d={beamPath}
            stroke="url(#laser-core-grad)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={0.9}
          />
        </g>
      )}

      {/* Initial explosion at screen top */}
      {burstActive && burstOpacity > 0.01 && (
        <g
          filter="url(#burst-glow)"
          opacity={Math.max(0, Math.min(1, burstOpacity))}
          transform={`translate(${tipXpx}, ${Math.max(topY, 0)})`}
        >
          <circle
            cx={0}
            cy={0}
            r={60 * explosionT}
            fill="#ffffff"
            opacity={0.55 * (1 - explosionT)}
          />
          <circle
            cx={0}
            cy={0}
            r={36 * explosionT}
            fill="#a855f7"
            opacity={0.45 * (1 - explosionT * 0.85)}
          />

          {rays.map((ray, i) => {
            const len = ray.length * explosionT;
            return (
              <line
                key={`ray-${i}`}
                x1={0}
                y1={0}
                x2={Math.cos(ray.angle) * len}
                y2={Math.sin(ray.angle) * len}
                stroke={ray.color}
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.85 * (1 - explosionT * 0.7)}
              />
            );
          })}

          {burstParticles.map((pt, i) => {
            const d = pt.dist * explosionT;
            return (
              <circle
                key={`pt-${i}`}
                cx={Math.cos(pt.angle) * d}
                cy={Math.sin(pt.angle) * d}
                r={pt.size * (1 - explosionT * 0.4)}
                fill={pt.color}
                opacity={0.9 * (1 - explosionT)}
              />
            );
          })}
        </g>
      )}

      {/* Repeating subtle lightning while laser stays at top */}
      {fullyExtended && lightningOpacity > 0.01 && (
        <g
          filter="url(#burst-glow)"
          opacity={Math.max(0, Math.min(1, lightningOpacity * 0.75))}
          transform={`translate(${tipXpx}, ${Math.max(topY, 0)})`}
        >
          {lightnings.map((bolt, i) => (
            <path
              key={`bolt-${lightningCycle}-${i}`}
              d={zigzagPath(
                bolt.angle,
                bolt.length * (0.55 + 0.45 * lightningT),
                bolt.seed,
              )}
              stroke={bolt.color}
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.7 * (1 - lightningT * 0.55)}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
