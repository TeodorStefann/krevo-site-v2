"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/** Mic utilitar local — proiectul nu folosește structura shadcn. */
function cn(...cls: Array<string | undefined | false>) {
  return cls.filter(Boolean).join(" ");
}

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Auto-rotire (ms per pas) — se oprește la prima interacțiune. */
  autoPlayMs?: number;
  /** Textul indiciului de tragere — dispare la prima interacțiune. */
  dragHint?: string;
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  autoPlayMs,
  dragHint,
  label = "Carusel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;
  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);
  const [interacted, setInteracted] = React.useState(false);

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  /* Auto-rotirea: merge singură până atinge cineva caruselul. */
  React.useEffect(() => {
    if (!autoPlayMs || interacted) return;
    const id = window.setInterval(() => nudge(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, interacted, nudge]);

  const opreste = React.useCallback(() => setInteracted(true), []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    opreste();
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;
    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;
    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  return (
    <div
      className={cn("w-full", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              opreste();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              opreste();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-10 outline-none focus-visible:ring-2 focus-visible:ring-[#3399FF]/60 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} din ${count}`}
                className={cn(
                  "absolute top-0 left-1/2 aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-xl will-change-transform",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover select-none"
                />
              </div>
            ))}
          </div>

          {/* Indiciul de tragere — pulsează până la prima atingere. */}
          {dragHint && !interacted && (
            <div
              className="pointer-events-none absolute bottom-3 left-1/2 z-[150] -translate-x-1/2"
              aria-hidden="true"
            >
              <span className="animate-pulse rounded-full border border-white/15 bg-black/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase backdrop-blur-md">
                ← {dragHint} →
              </span>
            </div>
          )}
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Slide-ul anterior"
              onClick={() => {
                opreste();
                nudge(-1);
              }}
              className="absolute top-1/2 left-3 z-[200] -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Slide-ul următor"
              onClick={() => {
                opreste();
                nudge(1);
              }}
              className="absolute top-1/2 right-3 z-[200] -translate-y-1/2 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && active?.title && (
        <div
          key={selected}
          className="krevo-cap-fade mt-2 flex flex-col items-center px-6"
        >
          <p className="text-[15px] font-semibold tracking-tight text-white">
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-1 text-center text-[13px] text-krevo-silver">
              {active.subtitle}
            </p>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Mergi la slide-ul ${index + 1}`}
              aria-current={index === selected}
              onClick={() => {
                opreste();
                goTo(index);
              }}
              className={cn(
                "size-2 rounded-full bg-white transition-opacity",
                index === selected ? "opacity-100" : "opacity-30",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
