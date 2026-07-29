"use client";

import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/teodor-chiurtu";

const linkClass =
  "text-[13px] text-krevo-silver transition-colors duration-200 hover:text-[#a855f7]";

const socialClass =
  "text-[#a855f7] transition-colors duration-200 hover:text-[#c084fc]";

const products = [
  { label: "FirmFlow", href: "/#portofoliu" },
  { label: "Servicii SaaS", href: "/servicii" },
  { label: "Automatizări AI", href: "/servicii" },
  { label: "Site-uri profesionale", href: "/servicii" },
];

const company = [
  { label: "Despre Krevo", href: "/#despre" },
  { label: "Contact", href: "/#contact" },
  { label: "Termeni și condiții", href: "/termeni" },
  { label: "Politică confidențialitate", href: "/confidentialitate" },
  { label: "Politică cookies", href: "/cookie-policy" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[#2d1b69] bg-[#000000] px-6 py-[60px]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Logo column */}
          <div>
            <Image
              src="/logoo.png"
              alt="Krevo"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-krevo-silver">
              Construim fundația digitală a firmei tale.
            </p>
            <p className="mt-3 max-w-[240px] text-[11px] leading-relaxed text-krevo-silver/80">
              Fiecare implementare este unică și personalizată — nu vindem
              template-uri.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://wa.me/40774451822"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="mailto:teodor@krevo.ro"
                className={socialClass}
                aria-label="Email"
              >
                <Mail size={20} strokeWidth={1.5} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Produse */}
          <div>
            <p className="text-[14px] font-bold text-white">Produse</p>
            <ul className="mt-4 space-y-2.5">
              {products.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Companie */}
          <div>
            <p className="text-[14px] font-bold text-white">Companie</p>
            <ul className="mt-4 space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[14px] font-bold text-white">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[13px] text-krevo-silver">
              <li>
                <a
                  href="mailto:teodor@krevo.ro"
                  className="transition-colors duration-200 hover:text-[#a855f7]"
                >
                  teodor@krevo.ro
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/40774451822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-[#a855f7]"
                >
                  0774451822
                </a>
              </li>
              <li>Craiova, România</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 h-px w-full bg-[#6b21a8]/20"
          aria-hidden="true"
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-krevo-silver">
            © 2026 Krevo. Toate drepturile rezervate.
          </p>
          <p className="text-[12px] text-krevo-silver">
            Construit cu Next.js · Alimentat de Claude AI · Made in România
          </p>
        </div>

        <p className="mt-5 text-center text-[11px] text-krevo-silver">
          Soluționarea alternativă a litigiilor:{" "}
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#a855f7]"
          >
            ANPC
          </a>
          {" · "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#a855f7]"
          >
            Platforma SOL
          </a>
        </p>

        <p className="mt-2 text-center text-[11px] text-krevo-silver">
          Krevo · Craiova, România · teodor@krevo.ro · Persoană fizică
          autorizată
        </p>
      </div>
    </footer>
  );
}
