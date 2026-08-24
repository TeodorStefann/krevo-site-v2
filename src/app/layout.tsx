import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ScrollProgressBar } from "@/components/krevo/ScrollProgressBar";
import { CookieConsent } from "@/components/krevo/CookieConsent";
import { SectionReveal } from "@/components/krevo/animations/SectionReveal";
import { ScrollTop } from "@/components/krevo/ScrollTop";
import { BaraMobil } from "@/components/krevo/BaraMobil";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

/* Display font — titlurile. Geometric, tech, cu personalitate.
   Corpul rămâne pe Inter. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krevo.ro"),
  title: "Krevo — Construim fundația digitală a firmei tale",
  description:
    "Platforme SaaS cu AI integrat pentru firme din România. FirmFlow — tot ce mișcă în firma ta într-un singur loc.",
  icons: {
    icon: "/krevo-logo.png",
    apple: "/krevo-logo.png",
  },
  openGraph: {
    title: "Krevo — Construim fundația digitală a firmei tale",
    description:
      "Platforme SaaS cu AI integrat pentru firme din România. FirmFlow — tot ce mișcă în firma ta într-un singur loc.",
    url: "https://krevo.ro",
    siteName: "Krevo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Krevo — Firmele mari au sisteme. Tu ai Excel. Până acum.",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krevo — Construim fundația digitală a firmei tale",
    description:
      "Platforme SaaS cu AI integrat pentru firme din România. FirmFlow — tot ce mișcă în firma ta într-un singur loc.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ScrollTop />
        <BaraMobil />
        <ScrollProgressBar />
        <CookieConsent />
        <SectionReveal />
        {children}
      </body>
    </html>
  );
}
