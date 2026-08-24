"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import { MotionButton } from "@/components/ui/MotionButton";
import {
  EMAIL_HREF,
  LINKEDIN_HREF,
  TELEFON_HREF,
  WHATSAPP_HREF,
} from "@/lib/krevo/linkuri";


/**
 * Secțiunea de încredere. Portretul nu mai stă într-o ramă — e topit
 * direct în fundalul negru al secțiunii printr-o mască radială, cu o
 * aură albastră discretă în spate. Arată ca parte din design, nu ca o
 * poză decupată și lipită.
 */
export function Founder() {
  return (
    <section
      id="despre"
      data-reveal
      className="relative overflow-hidden px-6 py-16 md:py-[80px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, #000 100%), url('/bg-s-founder.jpg') center / cover no-repeat #000",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
        {/* ── Portret topit în fundal ─────────────────────────────────── */}
        <motion.div
          className="group relative mx-auto w-full max-w-[400px]"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* aura din spate — respiră ușor la hover */}
          <div
            className="pointer-events-none absolute -inset-12 z-0 opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(55% 50% at 50% 42%, rgba(0,102,255,0.22), transparent 72%)",
            }}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/founder-teo.jpg"
            alt="Teodor Chiurtu, fondator Krevo"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              /* până există portretul nou, cade elegant pe cel vechi */
              const img = e.currentTarget;
              if (!img.src.endsWith("/teodor.png")) img.src = "/teodor.png";
            }}
            className="relative z-10 w-full transition-transform duration-700 ease-out select-none group-hover:scale-[1.02]"
            style={{
              /* Razele țin fade-ul PE marginile pozei (nu în afara lor):
                 laturile ajung la ~91% din rază, deci se topesc vizibil. */
              WebkitMaskImage:
                "radial-gradient(55% 52% at 50% 42%, #000 58%, rgba(0,0,0,0.8) 78%, transparent 99%)",
              maskImage:
                "radial-gradient(55% 52% at 50% 42%, #000 58%, rgba(0,0,0,0.8) 78%, transparent 99%)",
            }}
          />
          {/* semnătura — sub portret, ca o legendă de editorial */}
          <div className="relative z-10 -mt-6 flex flex-col items-center text-center">
            <span
              className="mb-3 h-px w-10 bg-gradient-to-r from-transparent via-[#3399FF]/80 to-transparent"
              aria-hidden="true"
            />
            <p className="text-[16.5px] font-bold text-white">Teodor Chiurtu</p>
            <p className="mt-0.5 text-[12.5px] tracking-[0.14em] text-krevo-silver uppercase">
              Fondator Krevo
            </p>
          </div>
        </motion.div>

        {/* ── Copy ────────────────────────────────────────────────────── */}
        <div className="text-center md:text-left">
          <p className="mb-4 text-[13px] font-semibold tracking-[0.18em] text-[#3399FF] uppercase">
            Cine construiește asta?
          </p>

          <h2 className="text-[26px] leading-snug font-bold text-white md:text-[32px]">
            Un singur om.{" "}
            <span className="section-title-accent">
              Cu puterea unei echipe întregi.
            </span>
          </h2>

          <p className="mt-5 text-[16px] leading-relaxed text-krevo-silver">
            Eu sunt Teodor — omul care a construit FirmFlow și site-ul pe care
            ești acum, cap-coadă. Nu sunt o corporație: ce altora le ia echipe
            întregi și luni de zile, eu livrez în săptămâni, și îți răspund
            personal la telefon.
          </p>

          <ul className="mt-5 space-y-2">
            {[
              "Construiesc tot: platformă, site, AI — fără subcontractori",
              "Răspund eu, nu un call-center",
              "România — același fus orar, aceeași limbă, același răspuns azi",
            ].map((fapt) => (
              <li
                key={fapt}
                className="flex items-start justify-center gap-2.5 text-[14px] text-white/85 md:justify-start"
              >
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3399FF]"
                  aria-hidden="true"
                />
                {fapt}
              </li>
            ))}
          </ul>

          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 px-4 py-2 text-[14px] font-semibold text-[#3399FF]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3399FF] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3399FF]" />
            </span>
            Lucrez singur ca fiecare firmă să primească un sistem făcut pe felul ei — nu un șablon.
          </p>

          {/* Căile de contact, ca iconițe. Adresa scrisă cu litere mici
              lângă buton arăta a semnătură de email, nu a invitație. */}
          <div className="mt-7 flex items-center justify-center gap-2.5 md:justify-start">
            <Contact
              href={WHATSAPP_HREF}
              eticheta="Scrie-mi pe WhatsApp"
              extern
            >
              <IconWhatsApp />
            </Contact>
            <Contact href={EMAIL_HREF} eticheta="Trimite-mi un email">
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </Contact>
            <Contact href={TELEFON_HREF} eticheta="Sună-mă">
              <Phone className="h-[18px] w-[18px]" strokeWidth={1.9} />
            </Contact>
            {LINKEDIN_HREF && (
              <Contact href={LINKEDIN_HREF} eticheta="LinkedIn" extern>
                <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.9} />
              </Contact>
            )}
          </div>

          <div className="mt-5 flex justify-center md:justify-start">
            <MotionButton
              label="Scrie-mi direct"
              href={WHATSAPP_HREF}
              extern
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Iconița de WhatsApp — lucide nu are una, o desenăm noi. */
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Un cerc de contact. Suprafață de atingere de 44px, cum cere mobilul. */
function Contact({
  href,
  eticheta,
  extern = false,
  children,
}: {
  href: string;
  eticheta: string;
  extern?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={eticheta}
      title={eticheta}
      {...(extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0F2647] bg-[#07090F] text-krevo-silver transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0066FF] hover:text-white hover:shadow-[0_0_24px_rgba(0,102,255,0.3)]"
    >
      {children}
    </a>
  );
}
