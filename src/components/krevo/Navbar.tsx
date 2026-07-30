"use client";

import { useEffect, useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Building2,
  Factory,
  Users,
  FileText,
  PhoneCall,
  LineChart,
  Mail,
  Globe,
  LayoutTemplate,
  ChevronDown,
} from "lucide-react";

type IconType = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const productHref = "https://firmflow-eight-tan.vercel.app/login";

const saasLinks: { label: string; href: string; icon: IconType }[] = [
  { label: "FirmFlow", href: "/firmflow", icon: Building2 },
  { label: "Platforme Custom", href: "/servicii", icon: Factory },
  { label: "Portal Client", href: "/servicii", icon: Users },
];

const aiLinks: { label: string; href: string; icon: IconType }[] = [
  { label: "Oferte AI", href: "/servicii", icon: FileText },
  { label: "Apeluri AI", href: "/servicii", icon: PhoneCall },
  { label: "Analiză Firmă", href: "/servicii", icon: LineChart },
  { label: "Procesare Documente", href: "/servicii", icon: Mail },
];

const digitalLinks: { label: string; href: string; icon: IconType }[] = [
  { label: "Site-uri Profesionale", href: "/servicii", icon: Globe },
  { label: "Landing Pages", href: "/servicii", icon: LayoutTemplate },
];

const dropdownPanel =
  "pointer-events-none absolute top-full left-0 z-50 pt-4 opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100";

const dropdownCard =
  "rounded-2xl border border-[#002B66] bg-[#0a0a0a] p-6 shadow-[0_20px_60px_rgba(0,82,204,0.3)]";


export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [produseOpen, setProduseOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobile = () => {
    setMenuOpen(false);
    setProduseOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-[100] border-b border-transparent bg-transparent backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="relative z-[101] flex shrink-0 items-center transition-opacity hover:opacity-80"
            onClick={closeMobile}
          >
            <Image
              src="/krevo-logo.png"
              alt="Krevo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — left, next to logo */}
          <nav className="hidden items-center lg:flex">
            {/* Produse */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-[14px] text-white transition-colors duration-200 hover:text-[#3399FF]"
              >
                Produse
                <ChevronDown
                  size={14}
                  className="opacity-60 transition-transform duration-200 group-hover:rotate-180"
                />
              </button>
              <div className={`${dropdownPanel} w-[400px]`}>
                <div className={dropdownCard}>
                  <Link
                    href="/firmflow"
                    className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-[#0052CC]/15"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#0066FF]/50 bg-[#0a0a0a]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/firmflow-logo.png"
                        alt="FirmFlow"
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-10 object-contain"
                      />
                    </span>
                    <div className="min-w-0 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          FirmFlow
                        </span>
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-emerald-400">
                          Disponibil acum
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] leading-snug text-krevo-silver">
                        Management pentru firme de construcții — proiecte, echipe,
                        materiale și pontaj.
                      </p>
                    </div>
                  </Link>
                  <div className="my-4 h-px bg-[#002B66]" aria-hidden="true" />
                  <p className="px-3 text-[13px] text-krevo-silver/50">
                    Mai multe în curând
                  </p>
                </div>
              </div>
            </div>

            <span className="mx-4 select-none text-[#3399FF]/50" aria-hidden="true">
              ·
            </span>

            <Link
              href="/firmflow"
              className="text-[14px] text-white transition-colors duration-200 hover:text-[#3399FF]"
            >
              FirmFlow
            </Link>

            <span className="mx-4 select-none text-[#3399FF]/50" aria-hidden="true">
              ·
            </span>

            {/* Servicii */}
            <div className="group relative">
              <Link
                href="/servicii"
                className="flex items-center gap-1 text-[14px] text-white transition-colors duration-200 hover:text-[#3399FF]"
              >
                Servicii
                <ChevronDown
                  size={14}
                  className="opacity-60 transition-transform duration-200 group-hover:rotate-180"
                />
              </Link>
              <div className={`${dropdownPanel} w-[500px]`}>
                <div className={`${dropdownCard} grid grid-cols-3 gap-6`}>
                  <DropdownColumn title="Platforme SaaS" links={saasLinks} />
                  <DropdownColumn title="Automatizări AI" links={aiLinks} />
                  <DropdownColumn
                    title="Prezențe Digitale"
                    links={digitalLinks}
                  />
                </div>
              </div>
            </div>

            <span className="mx-4 select-none text-[#3399FF]/50" aria-hidden="true">
              ·
            </span>

            <Link
              href="/#despre"
              className="text-[14px] text-white transition-colors duration-200 hover:text-[#3399FF]"
            >
              Despre
            </Link>

            <span className="mx-4 select-none text-[#3399FF]/50" aria-hidden="true">
              ·
            </span>

            <Link
              href="/#contact"
              className="text-[14px] text-white transition-colors duration-200 hover:text-[#3399FF]"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={productHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-krevo-silver/40 bg-transparent px-4 py-2 text-[13px] text-krevo-silver transition-colors duration-200 hover:border-white hover:text-white"
          >
            Demo live →
          </a>
          <Link
            href="/#contact"
            className="rounded-full bg-[#0052CC] px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF]"
          >
            Hai să vorbim
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[101] flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[#0066FF]/50 bg-[#0a0a0a]/80 text-[#3399FF] lg:hidden"
          aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Menu size={28} strokeWidth={2} />
        </button>
      </div>

      {/* Mobile menu — backdrop */}
      <div
        className={`fixed inset-0 z-[11000] h-[100dvh] bg-black/50 backdrop-blur-md transition-opacity duration-300 ease-out lg:hidden ${
          menuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        onClick={closeMobile}
      />

      {/* Mobile menu — panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[11001] flex h-[100dvh] w-full max-w-md flex-col overflow-y-auto bg-[#0a0a0a]/95 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-end px-6 pt-6 pb-2">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center text-white transition-colors hover:text-[#3399FF]"
            aria-label="Închide meniul"
            onClick={closeMobile}
          >
            <X size={32} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-8 pb-20">
          <Link
            href="/servicii"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Servicii
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="flex w-full flex-col items-center">
            <button
              type="button"
              onClick={() => setProduseOpen((o) => !o)}
              className="group relative flex min-h-[56px] items-center justify-center gap-2 px-4 text-[28px] font-bold text-white"
              aria-expanded={produseOpen}
            >
              Produse
              <ChevronDown
                size={22}
                className={`text-[#3399FF] transition-transform duration-200 ${
                  produseOpen ? "rotate-180" : ""
                }`}
              />
              <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
            </button>
            {produseOpen ? (
              <Link
                href="/firmflow"
                onClick={closeMobile}
                className="group relative mt-1 flex min-h-[48px] items-center justify-center gap-2 px-4 text-[20px] font-semibold text-[#99C2FF]"
              >
                FirmFlow
                <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : null}
          </div>

          <Link
            href="/#despre"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Despre
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="/#contact"
            onClick={closeMobile}
            className="group relative flex min-h-[56px] items-center justify-center px-4 text-[28px] font-bold text-white"
          >
            Contact
            <span className="absolute bottom-2 left-1/2 h-px w-0 -translate-x-1/2 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        <div className="flex flex-col gap-3 px-8 pb-10">
          <a
            href={productHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="flex min-h-12 items-center justify-center rounded-full border border-krevo-silver/40 px-6 py-3 text-[15px] text-krevo-silver transition-colors duration-200 hover:border-white hover:text-white"
          >
            Demo live →
          </a>
          <Link
            href="/#contact"
            onClick={closeMobile}
            className="flex min-h-12 items-center justify-center rounded-full bg-[#0052CC] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF]"
          >
            Hai să vorbim
          </Link>
        </div>
      </div>
    </header>
  );
}

function DropdownColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; icon: IconType }[];
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-wide text-[#3399FF] uppercase">
        {title}
      </p>
      <ul className="space-y-1">
        {links.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] text-krevo-silver transition-colors hover:bg-[#0052CC]/15 hover:text-white"
            >
              <Icon size={16} strokeWidth={1.5} className="shrink-0 text-[#3399FF]" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
