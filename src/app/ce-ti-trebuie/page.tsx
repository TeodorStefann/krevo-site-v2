import type { Metadata } from "next";
import { Navbar } from "@/components/krevo/Navbar";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";
import { CinematicFooter } from "@/components/krevo/CinematicFooter";
import { Diagnostic } from "@/components/krevo/Diagnostic";

export const metadata: Metadata = {
  title: "Ce îți trebuie, de fapt — Krevo",
  description:
    "Două întrebări și îți spun exact ce sistem i se potrivește firmei tale: ce module, câte ore recuperezi pe lună și cât costă. Fără vânzări, fără date de contact.",
  alternates: { canonical: "/ce-ti-trebuie" },
  openGraph: {
    title: "Ce îți trebuie, de fapt — Krevo",
    description:
      "Nu știi de unde să începi? Normal. Răspunde la două întrebări și îți spun ce ți se potrivește.",
    url: "https://krevo.ro/ce-ti-trebuie",
    siteName: "Krevo",
    locale: "ro_RO",
    type: "website",
  },
};

export default function CeItiTrebuiePage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-krevo-body selection:bg-[#0066FF]/30 selection:text-white">
      {/* Fundalul. Fix, deci nu se mișcă la derulare — pagina alunecă
          peste el. Estompat spre centru și spre jos, ca textul să rămână
          lizibil peste orice imagine. Dacă fișierul lipsește, rămâne
          degradeul de dedesubt și pagina arată în continuare bine. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,102,255,0.16) 0%, transparent 65%), #000",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.8]"
        style={{
          backgroundImage: "url('/fundal-diagnostic.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, transparent 85%)",
        }}
      />
      <div className="relative z-10">
      <NoiseOverlay />
      <Navbar />
      <main className="pb-[100px]">
        <Diagnostic />
      </main>
      <CinematicFooter />
      </div>
    </div>
  );
}
