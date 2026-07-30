"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, Phone } from "lucide-react";

const INTEREST_VALUE = "Contact general";

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

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
          name,
          email,
          message,
          interest: INTEREST_VALUE,
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
      className="relative overflow-hidden bg-[#000000] px-6 py-20 md:py-[120px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(0,102,255,0.03) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-xl">
        <h2 className="text-center text-[32px] font-bold text-white">
          <span className="section-title-accent">Contactează-ne</span>
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href="tel:+40774451822" className={linkClass}>
            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
            0774451822
          </a>
          <a href="mailto:teodor@krevo.ro" className={linkClass}>
            <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            teodor@krevo.ro
          </a>
          <a
            href="https://wa.me/40774451822"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-[600px] text-center text-[15px] leading-relaxed text-krevo-silver italic">
          Hai să vorbim 15 minute despre firma ta. Fără obligații, fără pitch de
          vânzare — doar o conversație sinceră despre cum poți simplifica ce
          faci zilnic.
        </p>

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
          <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
            <input type="hidden" name="interest" value={INTEREST_VALUE} />

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
                htmlFor="contact-message"
                className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
              >
                Mesaj
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Ce construiești, ce ai nevoie, context scurt..."
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
                <a
                  href="/confidentialitate"
                  className="text-[#3399FF] underline-offset-2 hover:text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Politicii de Confidențialitate
                </a>
              </span>
            </label>

            {error && (
              <p className="break-words text-sm text-red-300/90" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !privacyAccepted}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-[#0066FF] px-6 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#0052CC] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="contact-submit-spinner" aria-hidden="true" />
                  Se trimite...
                </>
              ) : (
                "Trimite"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
