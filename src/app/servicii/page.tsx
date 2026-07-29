"use client";

import { Navbar } from "@/components/krevo/Navbar";
import { Services } from "@/components/krevo/Services";
import { Footer } from "@/components/krevo/Footer";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";

export default function ServiciiPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <NoiseOverlay />
      <Navbar />
      <main className="pt-24">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
