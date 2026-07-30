"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Phone } from "lucide-react";
import { HeroMeander } from "./HeroMeander";
import { HeroPyramid } from "./HeroPyramid";

const HeroParticleNetwork = dynamic(
  () =>
    import("./HeroParticleNetwork").then((m) => ({
      default: m.HeroParticleNetwork,
    })),
  { ssr: false },
);

const HERO_SLOGAN = "Construim fundația digitală a firmei tale.";
const PLATFORM_LOGIN = "https://firmflow-eight-tan.vercel.app/login";
const LINKEDIN_URL = "https://www.linkedin.com/in/teodor-chiurtu";

function MobileHero() {
  return (
    <section
      className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-black px-5 pt-20 pb-8 md:hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, rgba(109, 33, 168, 0.28) 0%, #000000 65%)",
      }}
    >
      {/* Decorative pyramid — bottom, 25% opacity */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[55%] w-full"
        style={{
          backgroundImage: "url(/piramida1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          opacity: 0.25,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, transparent 35%, transparent 55%, #000000 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <h1
          className="font-serif text-[72px] leading-[0.9] font-black tracking-tight text-[#c9a84c]"
          style={{
            textShadow:
              "1px 1px 0 #a88b3a, 2px 2px 0 #8a7030, 3px 3px 0 #6b5520, 4px 4px 0 #4a3a10, 5px 5px 14px rgba(0,0,0,0.55)",
          }}
        >
          KREVO
        </h1>

        <p className="mt-5 max-w-[18rem] font-serif text-[18px] leading-snug text-[#c9a84c] italic">
          {HERO_SLOGAN}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <a
            href={PLATFORM_LOGIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#c9a84c] px-6 py-3.5 text-[15px] font-bold text-[#0a0a0a] transition-colors hover:bg-[#d4b85c]"
          >
            Încearcă FirmFlow — 7 zile gratuit
          </a>
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-full border border-[#c9a84c] bg-transparent px-6 py-3.5 text-[15px] font-semibold text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/10"
          >
            Hai să construim împreună →
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-10">
          <a
            href="https://wa.me/40774451822"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-[#25D366]"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[12px] text-krevo-silver">WhatsApp</span>
          </a>

          <a
            href="mailto:teodor@krevo.ro"
            className="flex flex-col items-center gap-1.5"
          >
            <Mail size={28} strokeWidth={1.5} className="text-[#a855f7]" />
            <span className="text-[12px] text-krevo-silver">Email</span>
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5"
          >
            <Linkedin size={28} strokeWidth={1.5} className="text-[#5B9BD5]" />
            <span className="text-[12px] text-krevo-silver">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function DesktopHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [typedSlogan, setTypedSlogan] = useState("");
  const [showTypingCursor, setShowTypingCursor] = useState(true);
  const [enableHeavyFx, setEnableHeavyFx] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setEnableHeavyFx(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setTypedSlogan(HERO_SLOGAN.slice(0, index));
      if (index >= HERO_SLOGAN.length) {
        window.clearInterval(id);
        setShowTypingCursor(false);
      }
    }, 50);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div ref={trackRef} className="relative hidden h-[300vh] md:block">
      <section
        ref={sectionRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#0a0a0a] px-6 pt-24 pb-16"
        style={{
          backgroundImage: "url(/piramida1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "linear-gradient(90deg, #000000 0%, transparent 100%)",
            opacity: 0.7,
          }}
          aria-hidden="true"
        />

        {enableHeavyFx ? (
          <HeroPyramid trackRef={trackRef} sectionRef={sectionRef} />
        ) : null}
        {enableHeavyFx ? <HeroParticleNetwork /> : null}

        <div
          className="pointer-events-none absolute bottom-0 left-0 z-[8] h-[200px] w-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #000000 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-[120px] leading-[0.9] font-black tracking-tight"
            >
              <span className="krevo-gradient-text" data-text="KREVO">
                KREVO
              </span>
            </motion.h1>

            <HeroMeander />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 font-serif text-[28px] text-[#a855f7] italic"
              aria-label={HERO_SLOGAN}
            >
              {typedSlogan}
              {showTypingCursor && (
                <span className="hero-typing-cursor" aria-hidden="true">
                  |
                </span>
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap items-stretch justify-center gap-6"
            >
              <a
                href={PLATFORM_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center rounded-full bg-[#6b21a8] px-10 py-[18px] text-center transition-colors hover:bg-[#7c3aed]"
              >
                <span className="text-[18px] font-bold text-white">
                  Încearcă FirmFlow — 7 zile gratuit
                </span>
                <span className="mt-1 text-[13px] text-krevo-silver">
                  Cel mai avansat produs al nostru
                </span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-[#7c3aed] bg-transparent px-10 py-[18px] text-[18px] font-semibold text-[#7c3aed] transition-colors hover:bg-[#7c3aed]/10"
              >
                Hai să construim împreună →
              </a>
            </motion.div>

            <motion.a
              href="tel:+40774451822"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 inline-flex items-center gap-2.5 text-[16px] text-white transition-opacity hover:opacity-80"
            >
              <Phone
                size={20}
                strokeWidth={1.75}
                className="text-[#a855f7]"
                aria-hidden="true"
              />
              0774451822
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 flex items-center justify-center gap-10"
            >
              <a
                href="https://wa.me/40774451822"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 fill-[#25D366] transition-[filter] group-hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.7)]"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-[13px] text-krevo-silver transition-colors group-hover:text-[#25D366]">
                  WhatsApp
                </span>
              </a>

              <a
                href="mailto:teodor@krevo.ro"
                className="group flex flex-col items-center gap-1.5"
              >
                <Mail
                  size={32}
                  strokeWidth={1.5}
                  className="text-[#a855f7] transition-[filter] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                />
                <span className="text-[13px] text-krevo-silver transition-colors group-hover:text-[#a855f7]">
                  Email
                </span>
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5"
              >
                <Linkedin
                  size={32}
                  strokeWidth={1.5}
                  className="text-[#5B9BD5] transition-[filter] group-hover:drop-shadow-[0_0_8px_rgba(91,155,213,0.7)]"
                />
                <span className="text-[13px] text-krevo-silver transition-colors group-hover:text-[#5B9BD5]">
                  LinkedIn
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
}
