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
      <NoiseOverlay />
      <Navbar />
      <main className="pb-[100px]">
        <Diagnostic />
      </main>
      <CinematicFooter />
    </div>
  );
}
