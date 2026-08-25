import { FURNIZOR } from "@/lib/krevo/furnizor";

/**
 * Datele structurate — ce citește Google despre site, dincolo de text.
 *
 * Fără ele, în rezultatul de căutare apare „krevo.ro › ce-ti-trebuie”:
 * adresa brută și calea din URL. Cu ele, Google poate scrie „Krevo” ca
 * nume de site și o firimitură citibilă în loc de calea tehnică. Tot de
 * aici își ia și logoul pentru panoul de cunoștințe.
 *
 * Nu e o promisiune — Google alege singur ce afișează. Dar fără datele
 * astea nici nu are de unde să aleagă.
 */

const SITE = "https://krevo.ro";

type Firimitura = { nume: string; cale: string };

export function DateStructurate({
  firimituri,
}: {
  /** Doar pe subpagini. Acasă nu are firimituri. */
  firimituri?: Firimitura[];
}) {
  const organizatie = {
    "@type": "Organization",
    "@id": `${SITE}/#organizatie`,
    name: "Krevo",
    legalName: FURNIZOR.denumire,
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/krevo-logo.png`,
      width: 500,
      height: 500,
    },
    image: `${SITE}/og-image.png`,
    email: FURNIZOR.email,
    telephone: FURNIZOR.telefon,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Craiova",
      addressRegion: "Dolj",
      addressCountry: "RO",
    },
    founder: {
      "@type": "Person",
      name: "Teodor Chiurtu",
      jobTitle: "Fondator",
    },
    areaServed: { "@type": "Country", name: "România" },
    description:
      "Sisteme software pentru firme care lucrează pe teren — construcții, instalații, inginerie. Construite pe procesele firmei, nu pe șabloane.",
    sameAs: ["https://www.linkedin.com/in/teodor-chiurtu-a04b07317/"],
  };

  const siteWeb = {
    "@type": "WebSite",
    "@id": `${SITE}/#site`,
    url: SITE,
    name: "Krevo",
    inLanguage: "ro-RO",
    publisher: { "@id": `${SITE}/#organizatie` },
  };

  const produs = {
    "@type": "SoftwareApplication",
    "@id": `${SITE}/firmflow#produs`,
    name: "FirmFlow",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    inLanguage: "ro-RO",
    url: `${SITE}/firmflow`,
    publisher: { "@id": `${SITE}/#organizatie` },
    description:
      "Sistemul de operare pentru firme de teren: pontaj cu verificare de locație, proiecte, devize din fotografii, oferte și facturi cu AI.",
  };

  const grafic: Record<string, unknown>[] = [organizatie, siteWeb, produs];

  if (firimituri?.length) {
    grafic.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Krevo",
          item: SITE,
        },
        ...firimituri.map((f, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: f.nume,
          item: `${SITE}${f.cale}`,
        })),
      ],
    });
  }

  return (
    <script
      type="application/ld+json"
      /* Conținutul e construit de noi, din constante — nu vine de la
         niciun utilizator, deci nu are ce injecta nimeni aici. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": grafic }),
      }}
    />
  );
}
