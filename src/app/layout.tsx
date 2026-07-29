import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ScrollProgressBar } from "@/components/krevo/ScrollProgressBar";
import { CookieConsent } from "@/components/krevo/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krevo.ro"),
  title: "Krevo — Construim fundația digitală a firmei tale",
  description:
    "Platforme SaaS cu AI integrat pentru firme din România. FirmFlow — tot ce mișcă în firma ta într-un singur loc.",
  icons: {
    icon: "/logooo.png",
    apple: "/logooo.png",
  },
  openGraph: {
    title: "Krevo — Construim fundația digitală a firmei tale",
    description:
      "Platforme SaaS cu AI integrat pentru firme din România. FirmFlow — tot ce mișcă în firma ta într-un singur loc.",
    url: "https://krevo.ro",
    siteName: "Krevo",
    images: [
      {
        url: "/logooo.png",
        width: 1200,
        height: 630,
        alt: "Krevo",
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
    images: ["/logooo.png"],
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ScrollProgressBar />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
