"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, Linkedin } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/teodor-chiurtu";

const INTEREST_OPTIONS = [
  "FirmFlow",
  "Site web profesional",
  "Automatizări AI",
  "Altceva",
] as const;

const cards = [
  {
    title: "WhatsApp",
    href: "https://wa.me/40774451822",
    label: "0774 451 822",
    external: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 fill-[#25D366]"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    title: "Email",
    href: "mailto:teodor@krevo.ro",
    label: "teodor@krevo.ro",
    external: false,
    icon: <Mail size={32} strokeWidth={1.5} className="text-[#a855f7]" />,
  },
  {
    title: "LinkedIn",
    href: LINKEDIN_URL,
    label: "Teodor Chiurtu",
    external: true,
    icon: <Linkedin size={32} strokeWidth={1.5} className="text-[#5B9BD5]" />,
  },
];

const inputClass =
  "w-full rounded-xl border border-[#2d1b69] bg-[#050508] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-krevo-silver/40 focus:border-[#a855f7]";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
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
          phone,
          interest,
          message,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        details?: string;
        hint?: string;
      };

      if (!res.ok) {
        const debugParts = [
          data.error || `HTTP ${res.status}`,
          data.code ? `code=${data.code}` : null,
          data.details ? `details=${data.details}` : null,
          data.hint ? `hint=${data.hint}` : null,
        ].filter(Boolean);

        const debugMessage = debugParts.join(" | ");
        console.error("[contact form] Submit failed:", data);
        // Temporary: show real error in UI for debugging
        setError(debugMessage);
        return;
      }

      // Clear fields only after confirmed success (with success message)
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setMessage("");
      setPrivacyAccepted(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[contact form] Submit exception:", err);
      // Keep all field values on error — temporary: show real error in UI
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#000000] px-6 py-16 md:py-[100px]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-[36px] font-bold text-white">
          Să construim ceva{" "}
          <span className="section-title-accent">împreună</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[16px] text-krevo-silver italic">
          Spune-ne despre firma ta și îți răspundem în maxim 24 ore.
        </p>

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="grid grid-cols-1 gap-5">
              {cards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  {...(card.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-4 rounded-[12px] border border-[#2d1b69] bg-[#0a0a0a] p-5 transition-colors hover:border-[#a855f7]"
                >
                  <div className="shrink-0">{card.icon}</div>
                  <div>
                    <p className="text-base font-bold text-white">{card.title}</p>
                    <p className="mt-1 text-sm text-krevo-silver">{card.label}</p>
                  </div>
                </a>
              ))}
            </div>

            <div
              className="mt-10 h-px w-full max-w-md bg-[#7c3aed]/25"
              aria-hidden="true"
            />

            <p className="mt-6 text-sm text-krevo-silver">
              Disponibil pentru proiecte noi — Craiova, România
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d1b69] bg-[#0a0a0a] p-6 md:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[12px] font-medium text-emerald-300">
              <span
                className="relative flex h-2 w-2"
                aria-hidden="true"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Disponibil pentru proiecte noi
            </div>
            {success ? (
              <div className="flex flex-col items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-10 text-center">
                <CheckCircle2
                  size={48}
                  className="text-emerald-400"
                  aria-hidden="true"
                />
                <p className="mt-5 text-lg font-medium text-white">
                  Mulțumim! Îți răspundem în maxim 24 ore.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setError(null);
                  }}
                  className="mt-6 rounded-full border border-emerald-400/40 bg-transparent px-5 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:border-emerald-300 hover:text-white"
                >
                  Trimite alt mesaj
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
                  >
                    Nume complet *
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
                    Email *
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
                    Telefon
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="Opțional"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-interest"
                    className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
                  >
                    Ce te interesează *
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    required
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Selectează o opțiune
                    </option>
                    {INTEREST_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs tracking-wide text-krevo-silver"
                  >
                    Spune-ne despre firma ta *
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

                <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-krevo-silver">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#2d1b69] bg-[#050508] accent-[#a855f7]"
                  />
                  <span>
                    Sunt de acord cu prelucrarea datelor mele conform{" "}
                    <a
                      href="/confidentialitate"
                      className="text-[#a855f7] underline-offset-2 hover:text-white hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Politicii de Confidențialitate
                    </a>
                  </span>
                </label>

                {error && (
                  <p
                    className="break-words text-sm text-red-300/90"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !privacyAccepted}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#6b21a8] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span
                        className="contact-submit-spinner"
                        aria-hidden="true"
                      />
                      Se trimite...
                    </>
                  ) : (
                    "Trimite mesajul"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
