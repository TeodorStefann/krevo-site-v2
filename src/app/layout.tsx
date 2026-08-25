import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ScrollProgressBar } from "@/components/krevo/ScrollProgressBar";
import { SectionReveal } from "@/components/krevo/animations/SectionReveal";
import { ScrollTop } from "@/components/krevo/ScrollTop";
import { BaraMobil } from "@/components/krevo/BaraMobil";
import { DateStructurate } from "@/components/krevo/DateStructurate";
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
  title: {
    default: "Krevo — Construim fundația digitală a firmei tale",
    /* Subpaginile își pun numele lor, iar „| Krevo" se adaugă singur —
       așa Google are de unde lua numele site-ului, nu doar adresa. */
    template: "%s | Krevo",
  },
  applicationName: "Krevo",
  authors: [{ name: "Teodor Chiurtu", url: "https://krevo.ro" }],
  creator: "Teodor Chiurtu",
  publisher: "Krevo",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  description:
    "Platforme SaaS cu AI integrat pentru firme din România. FirmFlow — tot ce mișcă în firma ta într-un singur loc.",
  /* Iconițele vin din `app/icon.png` și `app/apple-icon.png` — Next le
     leagă singur. Înainte arătau spre `/krevo-logo.png`: 500×500, 204 KB,
     cu fundal transparent și mult detaliu fin. La 16 pixeli, cât are în
     rezultatul Google, se făcea o pată — de-aia apărea globul generic. */
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
      <head>
        <DateStructurate />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ScrollTop />
        <BaraMobil />
        <ScrollProgressBar />
        <SectionReveal />
        {children}
      </body>
    </html>
  );
}
