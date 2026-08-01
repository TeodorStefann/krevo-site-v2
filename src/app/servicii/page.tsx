"use client";

import { Navbar } from "@/components/krevo/Navbar";
import { Services } from "@/components/krevo/Services";
import { Footer } from "@/components/krevo/Footer";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

export default function ServiciiPage() {
  return (
    <div className="relative min-h-screen text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/bg-servicii.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <NoiseOverlay />
        <Navbar />
        <main className="pt-24">
          <Services />
        </main>
        <Footer />
      </div>
    </div>
  );
}
