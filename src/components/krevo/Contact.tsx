"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, CheckCircle2, Mail, Phone } from "lucide-react";
import { FloatingPaths } from "./animations/FloatingPaths";
import { PearlButton } from "@/components/ui/PearlButton";

/* Trebuie să corespundă exact cu INTEREST_OPTIONS din /api/contact/route.ts */
const INTERESE = [
  { valoare: "FirmFlow", eticheta: "FirmFlow", ajutor: "Platforma completă pentru firmă" },
  { valoare: "Site web profesional", eticheta: "Site web", ajutor: "Prezentare, magazin, landing" },
  { valoare: "Automatizări AI", eticheta: "Automatizări AI", ajutor: "Oferte, documente, răspunsuri" },
  { valoare: "Altceva", eticheta: "Nu știu încă", ajutor: "Îți spun eu ce ți se potrivește" },
] as const;
const WHATSAPP_HREF = "https://wa.me/40774451822?text=Salut%21%20Am%20v%C4%83zut%20site-ul%20Krevo%20%C8%99i%20vreau%20s%C4%83%20programez%20discu%C8%9Bia%20de%2015%20minute%20despre%20FirmFlow%20pentru%20firma%20mea.";

const inputClass =
  "w-full rounded-xl border border-[#002B66] bg-[#050508] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-krevo-silver/40 focus:border-[#0066FF]";

const linkClass =
  "inline-flex items-center gap-2 text-[14px] text-krevo-silver transition-colors hover:text-white";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Invitația interactivă: titlul uriaș „Hai să lucrăm / împreună." cu
 * săgeata în cerc. La click, se transformă elegant în „Perfect — Hai să
 * vorbim" cu butonul de 15 minute pe WhatsApp. Formularul de sub el
 * rămâne mereu vizibil — teatrul nu blochează conversia.
 */
function InvitatieInteractiva() {
  const [hover, setHover] = useState(false);
  const [apasat, setApasat] = useState(false);
  const [succes, setSucces] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  function laClick() {
    if (apasat) return;
    setApasat(true);
    window.setTimeout(() => setSucces(true), 450);
  }

  return (
    <div className="relative flex flex-col items-center gap-10 py-6">
      {/* ── Starea „Perfect — Hai să vorbim" ─────────────────────────── */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-7 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: succes ? 1 : 0,
          transform: succes ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          pointerEvents: succes ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-xs font-medium tracking-[0.3em] text-krevo-silver uppercase transition-all duration-500"
            style={{
              transform: succes ? "translateY(0)" : "translateY(10px)",
              opacity: succes ? 1 : 0,
              transitionDelay: "100ms",
            }}
          >
            Perfect
          </span>
          <h3
            className="text-3xl font-light tracking-tight text-white transition-all duration-500 sm:text-4xl"
            style={{
              transform: succes ? "translateY(0)" : "translateY(10px)",
              opacity: succes ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            Hai să vorbim.
          </h3>
        </div>

        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          className="group relative flex cursor-pointer items-center gap-4 transition-all duration-500"
          style={{
            transform: succes
              ? hoverBtn
                ? "translateY(0) scale(1.02)"
                : "translateY(0) scale(1)"
              : "translateY(15px) scale(1)",
            opacity: succes ? 1 : 0,
            transitionDelay: "150ms",
          }}
        >
          <div
            className="h-px w-8 bg-white/20 transition-all duration-500 sm:w-12"
            style={{
              transform: hoverBtn ? "scaleX(0)" : "scaleX(1)",
              opacity: hoverBtn ? 0 : 0.6,
            }}
          />
          <div
            className="relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 transition-all duration-500 sm:px-8 sm:py-4"
            style={{
              borderColor: hoverBtn ? "#3399FF" : "rgba(255,255,255,0.2)",
              backgroundColor: hoverBtn ? "#0066FF" : "transparent",
              boxShadow: hoverBtn
                ? "0 0 30px rgba(0,102,255,0.35), 0 10px 40px rgba(0,102,255,0.2)"
                : "none",
            }}
          >
            <Calendar
              className="size-4 text-white transition-all duration-500 sm:size-5"
              strokeWidth={1.5}
            />
            <span className="text-sm font-medium tracking-wide text-white transition-all duration-500 sm:text-base">
              Programează 15 minute
            </span>
            <ArrowUpRight
              className="size-4 text-white transition-all duration-500 sm:size-5"
              strokeWidth={1.5}
              style={{
                transform: hoverBtn
                  ? "translate(3px, -3px) scale(1.1)"
                  : "translate(0, 0) scale(1)",
              }}
            />
          </div>
          <div
            className="h-px w-8 bg-white/20 transition-all duration-500 sm:w-12"
            style={{
              transform: hoverBtn ? "scaleX(0)" : "scaleX(1)",
              opacity: hoverBtn ? 0 : 0.6,
            }}
          />
        </a>

        <span
          className="text-xs tracking-widest text-krevo-silver/60 uppercase transition-all duration-500"
          style={{
            transform: succes ? "translateY(0)" : "translateY(10px)",
            opacity: succes ? 1 : 0,
            transitionDelay: "450ms",
          }}
        >
          Fără obligații — răspund personal
        </span>
      </div>

      {/* ── Disponibilitatea ─────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 transition-all duration-500"
        style={{
          opacity: apasat ? 0 : 1,
          transform: apasat ? "translateY(-20px)" : "translateY(0)",
          pointerEvents: apasat ? "none" : "auto",
        }}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-center text-[12px] font-medium tracking-widest text-krevo-silver uppercase sm:text-sm">
          Disponibil — 3 locuri de fondator · răspund în aceeași zi
        </span>
      </div>

      {/* ── Titlul uriaș, interactiv ─────────────────────────────────── */}
      <div
        className="group relative cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={laClick}
        style={{ pointerEvents: apasat ? "none" : "auto" }}
      >
        <div className="flex flex-col items-center gap-6">
          <h2
            className="relative text-center text-5xl font-light tracking-tight text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-6xl md:text-7xl"
            style={{
              opacity: apasat ? 0 : 1,
              transform: apasat ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
            }}
          >
            <span className="block overflow-hidden">
              <span
                className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: hover && !apasat ? "translateY(-8%)" : "translateY(0)",
                }}
              >
                Hai să lucrăm
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block transition-transform delay-75 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: hover && !apasat ? "translateY(-8%)" : "translateY(0)",
                }}
              >
                <span className="text-white/50">împreună.</span>
              </span>
            </span>
          </h2>

          <div className="relative mt-2 flex size-16 items-center justify-center sm:size-20">
            <div
              className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
              style={{
                borderColor: apasat
                  ? "#3399FF"
                  : hover
                    ? "#3399FF"
                    : "rgba(255,255,255,0.2)",
                backgroundColor: apasat ? "transparent" : hover ? "#0066FF" : "transparent",
                transform: apasat ? "scale(3)" : hover ? "scale(1.1)" : "scale(1)",
                opacity: apasat ? 0 : 1,
                transitionDuration: apasat ? "700ms" : "500ms",
              }}
            />
            <ArrowUpRight
              className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
              style={{
                transform: apasat
                  ? "translate(100px, -100px) scale(0.5)"
                  : hover
                    ? "translate(2px, -2px)"
                    : "translate(0, 0)",
                opacity: apasat ? 0 : 1,
                color: "#ffffff",
                transitionDuration: apasat ? "600ms" : "500ms",
              }}
            />
          </div>
        </div>

        {/* liniile laterale */}
        <div className="absolute top-1/2 -left-8 -translate-y-1/2 sm:-left-16">
          <div
            className="h-px w-8 bg-white/20 transition-all duration-500 sm:w-12"
            style={{
              transform: apasat
                ? "scaleX(0) translateX(-20px)"
                : hover
                  ? "scaleX(1.5)"
                  : "scaleX(1)",
              opacity: apasat ? 0 : hover ? 1 : 0.5,
            }}
          />
        </div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 sm:-right-16">
          <div
            className="h-px w-8 bg-white/20 transition-all duration-500 sm:w-12"
            style={{
              transform: apasat
                ? "scaleX(0) translateX(20px)"
                : hover
                  ? "scaleX(1.5)"
                  : "scaleX(1)",
              opacity: apasat ? 0 : hover ? 1 : 0.5,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>("FirmFlow");
  const [message, setMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!privacyAccepted) {
      setError(
        "Trebuie să fii de acord cu Politica de Confidențialitate pentru a trimite.",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: honeypot,
          name,
          email,
          phone,
          message,
          interest,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(
          data.error ||
            "Nu am putut trimite mesajul. Te rugăm să încerci din nou.",
        );
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setInterest("FirmFlow");
      setMessage("");
      setPrivacyAccepted(false);
    } catch {
      setError(
        "Nu am putut trimite mesajul. Verifică conexiunea și încearcă din nou.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      data-reveal
      className="relative overflow-hidden px-6 py-16 md:py-[80px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, #000 100%), url('/bg-s-contact.jpg') center / cover no-repeat #000",
        }}
        aria-hidden="true"
      />
      {/* Traseele curgătoare — fluxul care se adună spre decizie */}
      <FloatingPaths />
      <div className="relative z-10 mx-auto max-w-xl">
        {/* Invitația spectaculoasă */}
        <InvitatieInteractiva />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href="tel:+40774451822" className={linkClass}>
            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
            0774451822
          </a>
          <a href="mailto:teodor@krevo.ro" className={linkClass}>
            <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            teodor@krevo.ro
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>

        {success ? (
          <div className="mt-10 flex flex-col items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-10 text-center">
            <CheckCircle2
              size={48}
              className="text-emerald-400"
              aria-hidden="true"
            />
            <p className="mt-5 text-lg font-medium text-white">
              Mulțumim! Îți răspundem în maxim 24 ore.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            {/* honeypot anti-spam: invizibil pentru oameni */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {/* Ce te interesează — răspunsul dă direcție discuției */}
            <fieldset>
              <legend className="mb-2.5 block text-xs tracking-wide text-krevo-silver">
                Cu ce te pot ajuta?
              </legend>
              <div className="flex flex-wrap gap-2">
                {INTERESE.map((optiune) => {
                  const activ = interest === optiune.valoare;
                  return (
                    <button
                      key={optiune.valoare}
                      type="button"
                      onClick={() => setInterest(optiune.valoare)}
                      aria-pressed={activ}
                      title={optiune.ajutor}
                      className={`min-h-11 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                        activ
                          ? "border-[#0066FF] bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.35)]"
                          : "border-[#002B66] bg-[#050508] text-krevo-silver hover:border-[#0066FF]/60 hover:text-white"
                      }`}
                    >
                      {optiune.eticheta}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[12px] text-krevo-silver/60">
                {INTERESE.find((o) => o.valoare === interest)?.ajutor}
              </p>
            </fieldset>

            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
              >
                Nume
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Numele tău"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="email@firma.ro"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
              >
                Telefon{" "}
                <span className="text-krevo-silver/50">(opțional — sună mai repede decât scrie)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="07xx xxx xxx"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
              >
                Spune-mi pe scurt situația{" "}
                <span className="text-krevo-silver/50">(cu cât mai concret, cu atât răspund mai util)</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Câți angajați aveți, cum lucrați acum (Excel, hârtie, WhatsApp?) și ce vă mănâncă cel mai mult timp."
              />
            </div>

            <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[12px] leading-relaxed text-krevo-silver">
              <input
                type="checkbox"
                required
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#002B66] bg-[#050508] accent-[#0066FF]"
              />
              <span>
                Sunt de acord cu prelucrarea datelor mele conform{" "}
                <Link
                  href="/confidentialitate"
                  className="text-[#3399FF] underline-offset-2 hover:text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Politicii de Confidențialitate
                </Link>
              </span>
            </label>

            {error && (
              <p className="break-words text-sm text-red-300/90" role="alert">
                {error}
              </p>
            )}

            {/* Butonul-monument. Apare O SINGURĂ DATĂ pe tot site-ul —
                exact în momentul deciziei. */}
            <div className="pt-4">
              <PearlButton
                type="submit"
                disabled={loading || !privacyAccepted}
                label={loading ? "Se trimite..." : "Trimite mesajul"}
                className="w-full"
              />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
