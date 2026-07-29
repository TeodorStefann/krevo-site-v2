"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    title: "Ne spui cu ce se ocupă firma ta",
    description:
      "O discuție de 30 minute în care înțeleg exact cum lucrezi, câți angajați ai și ce probleme vrei să rezolvi.",
  },
  {
    title: "Construim platforma în 7-14 zile",
    description:
      "Tu ești implicat la fiecare pas. Testezi, dai feedback, modificăm până e exact cum trebuie.",
  },
  {
    title: "Echipa ta o folosește din prima zi",
    description:
      "Instalăm, instruim angajații în 30 minute și rămânem alături cu suport direct pe WhatsApp.",
  },
];

type Theme = "purple" | "gold";

function StepCard({
  step,
  index,
  theme,
}: {
  step: (typeof steps)[0];
  index: number;
  theme: Theme;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isGold = theme === "gold";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span
        className={`font-serif text-sm ${
          isGold ? "text-[#c9a84c]/70" : "text-krevo-gold/70"
        }`}
      >
        0{index + 1}
      </span>
      <h3 className="mt-4 font-serif text-2xl text-white">{step.title}</h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-krevo-silver">
        {step.description}
      </p>
    </motion.div>
  );
}

export function HowWeWork({ theme = "purple" }: { theme?: Theme }) {
  const isGold = theme === "gold";

  return (
    <section
      id="cum-functioneaza"
      className="relative bg-[#000000] px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <h2 className="text-center text-[36px] font-bold text-white">
            Cum{" "}
            {isGold ? (
              <span className="text-[#c9a84c]">funcționează</span>
            ) : (
              <span className="section-title-accent">funcționează</span>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-base text-krevo-silver">
            Trei pași simpli. Fără surprize, fără jargon — doar progres clar.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <StepCard
              key={step.title}
              step={step}
              index={i}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
