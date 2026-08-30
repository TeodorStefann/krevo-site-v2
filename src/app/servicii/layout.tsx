import type { Metadata } from "next";
import { DateStructurate } from "@/components/krevo/DateStructurate";

/**
 * Pagina e „use client", deci nu poate exporta ea însăși `metadata`.
 * Le punem aici, în layout — altfel Google afișa pentru /servicii exact
 * titlul și descrierea de pe prima pagină, iar cele două rezultate arătau
 * identic și îți furau clicuri unul altuia.
 */
export const metadata: Metadata = {
  title: "Servicii — ce construiesc, concret",
  description:
    "Platforme SaaS cu AI, automatizări și prezențe digitale pentru firme din România. Fiecare sistem e construit pe procesele firmei tale, nu pe un șablon.",
  alternates: { canonical: "/servicii" },
  openGraph: {
    title: "Servicii — ce construiesc, concret | Krevo",
    description:
      "Platforme SaaS cu AI, automatizări și prezențe digitale pentru firme din România.",
    url: "https://krevo.ro/servicii",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicii — ce construiesc, concret | Krevo",
    description:
      "Platforme SaaS cu AI, automatizări și prezențe digitale pentru firme din România.",
    images: ["/og-image.jpg"],
  },
};

export default function ServiciiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DateStructurate firimituri={[{ nume: "Servicii", cale: "/servicii" }]} />
      {children}
    </>
  );
}
