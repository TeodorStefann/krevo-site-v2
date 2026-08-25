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
import { TitleReveal } from "./animations/TitleReveal";
import { MotionButton } from "@/components/ui/MotionButton";
import { RezervaCall } from "./RezervaCall";
import { SUPRAFATA_CARD } from "@/lib/krevo/fundal";

/** Haloul care urmărește cursorul pe card — același limbaj ca pe homepage. */
function urmaresteCursorul(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

type ServiceCard = {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  href?: string;
  badge?: string;
};

type ServiceCategory = {
  id: string;
  numar: string;
  title: string;
  tagline: string;
  cards: ServiceCard[];
};

const categories: ServiceCategory[] = [
  {
    id: "platforme-saas",
    numar: "01",
    title: "Platforme SaaS",
    tagline:
      "Sisteme pe care firma ta le folosește în fiecare zi — construite pe procesele tale, nu pe șabloane.",
    cards: [
      {
        title: "FirmFlow",
        description:
          "Sistemul de operare pentru firme de teren: pontaj cu GPS, deviz din poze, oferte și facturi cu AI — totul într-un singur loc.",
        icon: Building2,
        href: "/firmflow",
        badge: "Produs propriu",
      },
      {
        title: "Platforme Custom",
        description:
          "SaaS pe industria ta: medical, imobiliare, HoReCa, auto — pornim de la cum lucrezi tu acum, nu invers.",
        icon: Factory,
      },
      {
        title: "Portal Client",
        description:
          "Spațiu dedicat clienților tăi: status lucrări, documente, comunicare — fără fire pierdute de WhatsApp.",
        icon: Users,
      },
    ],
  },
  {
    id: "automatizari-ai",
    numar: "02",
    title: "Automatizări AI",
    tagline:
      "Munca repetitivă o face AI-ul. Oamenii tăi rămân pe ce aduce bani.",
    cards: [
      {
        title: "Oferte AI",
        description:
          "Oferte tehnice complete generate din datele proiectului — consistente, profesionale, gata de trimis.",
        icon: FileText,
      },
      {
        title: "Apeluri AI",
        description:
          "Transcriere și analiză pentru apelurile firmei — puncte cheie, follow-up-uri, nimic pierdut.",
        icon: PhoneCall,
      },
      {
        title: "Analiză Firmă",
        description:
          "Situația firmei în 10 secunde — recomandări concrete, nu grafice complicate.",
        icon: LineChart,
      },
      {
        title: "Procesare Documente",
        description:
          "Facturi, contracte, bonuri — sortate și extrase automat, fără muncă manuală.",
        icon: Mail,
      },
      {
        title: "Rapoarte Automate",
        description:
          "Rapoartele se generează și se trimit singure — fără ore pierdute pe Excel.",
        icon: BarChart3,
      },
    ],
  },
  {
    id: "prezente-digitale",
    numar: "03",
    title: "Prezențe Digitale",
    tagline:
      "Vitrina care aduce clienți — rapidă, clară și construită să convertească.",
    cards: [
      {
        title: "Site-uri Profesionale",
        description:
          "Site-uri premium, rapide și clare — construite să convertească, nu doar să arate bine.",
        icon: Globe,
      },
      {
        title: "Landing Pages",
        description:
          "Pagini cu un singur obiectiv: lead, demo sau vânzare — mesaj clar, CTA puternic.",
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
  const href = card.href ?? "/#contact";
  const showDetailsHint = !card.href;

  return (
    <Link
      href={href}
      onMouseMove={urmaresteCursorul}
      className={`spotlight-card group flex h-full flex-col rounded-2xl border border-white/12 ${SUPRAFATA_CARD} p-6 transition-all duration-300 hover:border-[#3399FF]/45 hover:shadow-[0_0_34px_rgba(0,102,255,0.16)]`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#0066FF]/25 bg-[#0066FF]/10 text-[#3399FF] transition-colors group-hover:text-[#66B2FF]">
          <Icon size={22} strokeWidth={1.8} />
        </span>
        {card.badge && (
          <span className="rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.1em] text-[#3399FF] uppercase">
            {card.badge}
          </span>
        )}
      </div>
      <h3 className="text-[16.5px] font-bold text-white">{card.title}</h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-krevo-silver">
        {card.description}
      </p>
      <span
        className={`mt-4 text-[13px] font-semibold text-[#3399FF] transition-all duration-300 ${
          showDetailsHint
            ? "opacity-0 group-hover:opacity-100"
            : "opacity-90 group-hover:opacity-100"
        }`}
      >
        {card.href ? "Vezi produsul →" : "Solicită detalii →"}
      </span>
    </Link>
  );
}

function CategoryHeading({
  numar,
  title,
  tagline,
}: {
  numar: string;
  title: string;
  tagline: string;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-bold tracking-[0.2em] text-[#3399FF]/50 tabular-nums">
          {numar}
        </span>
        <h2 className="shrink-0 text-[22px] font-bold text-white">{title}</h2>
        <div
          className="h-px min-w-0 flex-1 bg-gradient-to-r from-[#0066FF]/60 to-transparent"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 pl-[42px] text-[14px] text-krevo-silver">{tagline}</p>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="servicii"
      className="relative overflow-hidden px-6 py-20 md:py-[110px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(760px 420px at 50% 0%, rgba(0,102,255,0.07), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-14 text-center md:mb-16">
          <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">
            Serviciile
          </p>
          <h1 className="text-center text-[32px] leading-tight font-bold text-white md:text-[42px]">
            <TitleReveal text="Ce construim pentru tine." accentLast />
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[15.5px] leading-relaxed text-krevo-silver">
            De la platforme SaaS cu AI integrat până la prezențe digitale
            premium — totul făcut de un singur om, cap-coadă, pe fundații
            solide.
          </p>
        </header>

        <div className="space-y-16 md:space-y-20">
          {categories.map((category, i) => (
            <SlideReveal
              key={category.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.06}
            >
              <div id={category.id} className="scroll-mt-28">
                <CategoryHeading
                  numar={category.numar}
                  title={category.title}
                  tagline={category.tagline}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.cards.map((card) => (
                    <Card key={card.title} card={card} />
                  ))}
                </div>
              </div>
            </SlideReveal>
          ))}
        </div>

        {/* Invitația — nu doar un buton aruncat, o propunere clară */}
        <div className={`mx-auto mt-16 max-w-2xl rounded-[24px] border border-white/12 ${SUPRAFATA_CARD} p-8 text-center md:mt-20 md:p-10`}>
          <h2 className="text-[24px] leading-tight font-bold text-white md:text-[28px]">
            Nu știi de unde să începi?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-krevo-silver">
            Zi-mi în două fraze ce te doare în firmă — îți spun sincer ce are
            sens să construim și ce nu. 15 minute, fără obligații.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RezervaCall context="De pe pagina Servicii" varianta="principal" />
            <MotionButton
              label="Vreau ceva pe măsură"
              href="/ce-ti-trebuie"
              varianta="secundar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
