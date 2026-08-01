"use client";

import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { NoiseOverlay } from "./NoiseOverlay";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { PainCalculator } from "./PainCalculator";
import { AiPower } from "./AiPower";
import { Portfolio } from "./Portfolio";
import { Founder } from "./Founder";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { SectionDivider } from "./SectionDivider";

export function KrevoHome() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        className={`relative min-h-screen text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white ${loaded ? "" : "overflow-hidden"}`}
        style={{
          backgroundImage: "url('/bg-site.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <NoiseOverlay />
        <Navbar />
        <main>
          <Hero siteReady={loaded} />
          <div
            style={{
              backgroundImage: "url('/bg-sub-hero.png')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <TrustBar />
            <SectionDivider />
            <PainCalculator />
          </div>
          <SectionDivider />
          <AiPower />
          <SectionDivider />
          <Portfolio />
          <SectionDivider />
          <Founder />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
