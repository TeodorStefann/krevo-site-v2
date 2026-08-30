import type { Metadata } from "next";
import { DateStructurate } from "@/components/krevo/DateStructurate";

export const metadata: Metadata = {
  title: "FirmFlow — sistemul pentru firme de teren",
  description:
    "Pontaj cu verificare de locație, devize din fotografii, oferte și facturi cu AI. Tot ce mișcă în firma ta, într-un singur loc. Probă 5 zile, fără card.",
  alternates: { canonical: "/firmflow" },
  openGraph: {
    title: "FirmFlow — sistemul pentru firme de teren | Krevo",
    description:
      "Pontaj cu verificare de locație, devize din fotografii, oferte și facturi cu AI. Probă 5 zile, fără card.",
    url: "https://krevo.ro/firmflow",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirmFlow — sistemul pentru firme de teren | Krevo",
    description:
      "Pontaj cu verificare de locație, devize din fotografii, oferte și facturi cu AI. Probă 5 zile, fără card.",
    images: ["/og-image.jpg"],
  },
};

export default function FirmFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DateStructurate firimituri={[{ nume: "FirmFlow", cale: "/firmflow" }]} />
      {children}
    </>
  );
}
