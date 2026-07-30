"use client";

import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { NoiseOverlay } from "./NoiseOverlay";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ServicesSimple } from "./ServicesSimple";
import { AiPower } from "./AiPower";
import { Portfolio } from "./Portfolio";
import { About } from "./About";
import { FAQ } from "./FAQ";
import { WhyKrevo } from "./WhyKrevo";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export function KrevoHome() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        className={`relative min-h-screen bg-[#0a0a0a] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white ${loaded ? "" : "overflow-hidden"}`}
      >
        <NoiseOverlay />
        <Navbar />
        <main>
          <Hero siteReady={loaded} />
          <ServicesSimple />
          <AiPower />
          <Portfolio />
          <About />
          <FAQ />
          <WhyKrevo />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
