"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { HeroCinematic } from "./HeroCinematic";
import { PainCalculator } from "./PainCalculator";
import { Portfolio } from "./Portfolio";
import { HowWeWork } from "./HowWeWork";
import { CeFac } from "./CeFac";
import { Founder } from "./Founder";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { CinematicFooter } from "./CinematicFooter";

// Flip to false to instantly revert to the previous hero.
const USE_CINEMATIC_HERO = true;
/* Intro-ul de brand rulează O DATĂ pe sesiune — la revenire intri direct. */
const INTRO_KEY = "krevo-intro-seen";

export function KrevoHome() {
  const [loaded, setLoaded] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY)) setLoaded(true);
    } catch {
      // sessionStorage indisponibil — rulăm intro-ul, nu blocăm nimic
    }
    setIntroChecked(true);
  }, []);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // ignorăm — cel mult intro-ul mai rulează o dată
    }
    setLoaded(true);
  };

  return (
    <>
      {introChecked && !loaded && <LoadingScreen onComplete={finishIntro} />}
      <div
        className={`relative min-h-screen bg-[#000000] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white ${loaded ? "" : "overflow-hidden"}`}
      >
        <Navbar />
        <main>
          {USE_CINEMATIC_HERO ? (
            <HeroCinematic siteReady={loaded} />
          ) : (
            <Hero siteReady={loaded} />
          )}
          <div className="relative">
            <PainCalculator />
            <Portfolio />
            <HowWeWork />
            <CeFac />
            <Founder />
            <Faq />
            <Contact />
          </div>
        </main>
        <CinematicFooter />
      </div>
    </>
  );
}
