import { Navbar } from "@/components/krevo/Navbar";
import { Services } from "@/components/krevo/Services";
import { CinematicFooter } from "@/components/krevo/CinematicFooter";
import { NoiseOverlay } from "@/components/krevo/NoiseOverlay";
import { fundalPagina } from "@/lib/krevo/fundal";

export default function ServiciiPage() {
  return (
    <div className="relative min-h-screen text-krevo-body selection:bg-krevo-gold/30 selection:text-krevo-white">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={fundalPagina("/bg-servicii.jpg")}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <NoiseOverlay />
        <Navbar />
        <main className="pt-24">
          <Services />
        </main>
        <CinematicFooter />
      </div>
    </div>
  );
}
