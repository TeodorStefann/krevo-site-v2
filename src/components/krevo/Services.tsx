"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import {
  Building2,
  Factory,
  Users,
  FileText,
  PhoneCall,
  LineChart,
  Mail,
  BarChart3,
  Globe,
  LayoutTemplate,
  RefreshCw,
} from "lucide-react";
import { SlideReveal } from "./animations/SlideReveal";

type ServiceCard = {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  href?: string;
};

type ServiceCategory = {
  id: string;
  title: string;
  cards: ServiceCard[];
};

const categories: ServiceCategory[] = [
  {
    id: "platforme-saas",
    title: "Platforme SaaS",
    cards: [
      {
        title: "FirmFlow",
        description:
          "Management complet pentru firma ta — proiecte, echipe, materiale și pontaj într-un singur loc.",
        icon: Building2,
        href: "/firmflow",
      },
      {
        title: "Platforme Custom",
        description:
          "SaaS pe industrie: medical, imobiliare, HoReCa, auto — construit pe procesele tale reale.",
        icon: Factory,
      },
      {
        title: "Portal Client",
        description:
          "Spațiu extern pentru clienți: status, documente, comunicare — fără fire de WhatsApp.",
        icon: Users,
      },
    ],
  },
  {
    id: "automatizari-ai",
    title: "Automatizări AI",
    cards: [
      {
        title: "Oferte AI",
        description:
          "Oferte tehnice generate rapid din datele proiectului, consistente și gata de trimis.",
        icon: FileText,
      },
      {
        title: "Apeluri AI",
        description:
          "Transcriere și analiză apeluri — puncte cheie, follow-up-uri, nimic pierdut.",
        icon: PhoneCall,
      },
      {
        title: "Analiză Firmă",
        description:
          "Vezi situația firmei tale în 10 secunde — recomandări concrete nu grafice complicate.",
        icon: LineChart,
      },
      {
        title: "Procesare Documente",
        description:
          "Documente procesate automat — fără muncă manuală de sortare și clasificare.",
        icon: Mail,
      },
      {
        title: "Rapoarte Automate",
        description:
          "Rapoarte generate și trimise automat — fără ore pierdute pe Excel.",
        icon: BarChart3,
      },
    ],
  },
  {
    id: "prezente-digitale",
    title: "Prezențe Digitale",
    cards: [
      {
        title: "Site-uri Profesionale",
        description:
          "Site-uri rapide, clare și premium — construite să convertească, nu doar să arate bine.",
        icon: Globe,
      },
      {
        title: "Landing Pages",
        description:
          "Pagini pe un singur obiectiv: lead, demo sau vânzare — mesaj clar, CTA puternic.",
        icon: LayoutTemplate,
      },
      {
        title: "Redesign & Optimizare",
        description:
          "Reîmprospătăm site-ul existent: structură, viteză, SEO și conversie.",
        icon: RefreshCw,
      },
    ],
  },
];

function Card({ card }: { card: ServiceCard }) {
  const Icon = card.icon;

  const inner = (
    <>
      <span className="mb-4 flex h-12 w-12 items-center justify-center text-[#3399FF] transition-colors group-hover:text-[#66B2FF]">
        <Icon size={32} strokeWidth={1.5} />
      </span>
      <h3 className="text-[15px] font-bold text-white">{card.title}</h3>
      <p className="mt-2 text-[12px] leading-snug text-krevo-silver">
        {card.description}
      </p>
    </>
  );

  const className =
    "group flex h-full flex-col rounded-[12px] border border-[#002B66] bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#0066FF] hover:shadow-[0_0_28px_rgba(0,102,255,0.28)]";

  if (card.href) {
    return (
      <Link href={card.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <article className={className}>{inner}</article>;
}

function CategoryHeading({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <h2 className="shrink-0 text-[20px] font-bold text-[#3399FF]">{title}</h2>
      <div
        className="h-px min-w-0 flex-1 bg-[#0066FF]/70"
        aria-hidden="true"
      />
    </div>
  );
}

export function Services() {
  return (
    <section
      id="servicii"
      className="relative overflow-hidden px-6 py-20 md:py-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-16 text-center md:mb-20">
          <h2 className="text-center text-[36px] font-bold text-white">
            Ce construim pentru{" "}
            <span className="section-title-accent">tine</span>
          </h2>
          <div
            className="mx-auto mt-5 h-px w-24 bg-[#0066FF]"
            aria-hidden="true"
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-[16px] text-krevo-silver italic">
            De la platforme SaaS cu AI integrat până la prezențe digitale premium
            — totul construit pe fundații solide.
          </p>
        </header>

        <div className="space-y-12">
          {categories.map((category, i) => (
            <SlideReveal
              key={category.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.06}
            >
              <div id={category.id} className="scroll-mt-28">
                <CategoryHeading title={category.title} />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.cards.map((card) => (
                    <Card key={card.title} card={card} />
                  ))}
                </div>
                {i < categories.length - 1 ? (
                  <div
                    className="mx-auto mt-12 h-px w-[60px] bg-[#0066FF]/20"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            </SlideReveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#0052CC] px-10 py-4 text-base font-bold text-white transition-colors hover:bg-[#0066FF] hover:shadow-[0_0_28px_rgba(0,102,255,0.4)]"
          >
            Solicită o ofertă personalizată
          </Link>
        </div>
      </div>
    </section>
  );
}
