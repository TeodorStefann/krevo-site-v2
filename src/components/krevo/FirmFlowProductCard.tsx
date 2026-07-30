"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Download, X } from "lucide-react";
import { springNatural } from "./animations/motionConfig";

const PDF_HREF = "/ghid-firmflow.pdf.pdf";

type Question = {
  id: string;
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: "coord",
    text: "Câte ore pierzi zilnic coordonând echipa prin telefon?",
    options: ["sub 1h", "1-3h", "peste 3h"],
  },
  {
    id: "offers",
    text: "Ofertele tehnice le faci manual în Word?",
    options: ["Da", "Nu"],
  },
  {
    id: "presence",
    text: "Știi în timp real cine e prezent la muncă?",
    options: ["Da", "Nu"],
  },
  {
    id: "reports",
    text: "Faci rapoarte manuale la final de săptămână?",
    options: ["Da", "Nu"],
  },
  {
    id: "whatsapp",
    text: "Coordonezi proiecte prin WhatsApp?",
    options: ["Da", "Nu"],
  },
];

function isProblemAnswer(questionId: string, answer: string) {
  if (questionId === "coord") return answer === "1-3h" || answer === "peste 3h";
  if (questionId === "presence") return answer === "Nu";
  return answer === "Da";
}

function estimateMonthlyHours(answers: Record<string, string>) {
  let hours = 0;
  const coord = answers.coord;
  if (coord === "sub 1h") hours += 15;
  else if (coord === "1-3h") hours += 40;
  else if (coord === "peste 3h") hours += 80;

  if (answers.offers === "Da") hours += 20;
  if (answers.presence === "Nu") hours += 15;
  if (answers.reports === "Da") hours += 12;
  if (answers.whatsapp === "Da") hours += 25;

  return hours;
}

function TimeLossQuizModal({
  open,
  onClose,
  theme = "gold",
}: {
  open: boolean;
  onClose: () => void;
  theme?: "gold" | "blue";
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const gold = theme === "gold";

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setAnswers({});
    setDone(false);
    setEmail("");
    setSubmitting(false);
    setSubmitted(false);
    setSkipped(false);
    setSubmitError(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function selectOption(option: string) {
    const q = questions[step];
    if (!q) return;
    const nextAnswers = { ...answers, [q.id]: option };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 180);
    } else {
      setTimeout(() => setDone(true), 180);
    }
  }

  const problemCount = questions.filter((q) =>
    answers[q.id] ? isProblemAnswer(q.id, answers[q.id]) : false,
  ).length;
  const monthlyHours = estimateMonthlyHours(answers);
  const showLoss = done && problemCount >= 3;

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    const answersSummary = questions
      .map((q) => `${q.text} → ${answers[q.id] ?? "-"}`)
      .join("; ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Quiz Lead",
          email: trimmed,
          interest: "FirmFlow",
          message: `Scor quiz: ${problemCount}/5. Răspunsuri: ${answersSummary}`,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(data.error || "Nu am putut trimite. Încearcă din nou.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Nu am putut trimite. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  if (!done && (step >= questions.length || !questions[step])) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-4 backdrop-blur-md sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="time-loss-quiz-title"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={
            gold
              ? "relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#c9a84c]/40 bg-gradient-to-b from-[#0f0d00] to-[#050508] p-6 shadow-[0_0_60px_rgba(201,168,76,0.2)] md:p-8"
              : "relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#0066FF]/40 bg-gradient-to-b from-[#000D20] to-[#050508] p-6 shadow-[0_0_60px_rgba(0,102,255,0.25)] md:p-8"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center text-krevo-silver transition-colors hover:text-white"
            aria-label="Închide"
          >
            <X size={20} />
          </button>

          <p
            className={
              gold
                ? "text-xs tracking-[0.2em] text-[#c9a84c] uppercase"
                : "text-xs tracking-[0.2em] text-[#3399FF] uppercase"
            }
          >
            Diagnostic rapid
          </p>
          <h3
            id="time-loss-quiz-title"
            className="mt-2 font-serif text-2xl font-bold text-white"
          >
            Cât timp pierzi zilnic?
          </h3>

          {!done ? (
            <div className="mt-6">
              <p className="mb-5 text-sm text-krevo-silver md:text-base">
                {questions[step].text}
              </p>
              <div className="flex flex-col gap-2">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => selectOption(opt)}
                    className={
                      gold
                        ? "rounded-xl border border-[#c9a84c]/30 bg-[#0a0a0a] px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:border-[#c9a84c] hover:bg-[#c9a84c]/10"
                        : "rounded-xl border border-[#002B66] bg-[#0a0a0a] px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:border-[#0066FF] hover:bg-[#0052CC]/20"
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              {showLoss ? (
                <p
                  className={
                    gold
                      ? "text-base leading-relaxed text-[#e8d5a3] md:text-lg"
                      : "text-base leading-relaxed text-[#99C2FF] md:text-lg"
                  }
                >
                  Pierzi aproximativ{" "}
                  <span
                    className={
                      gold
                        ? "font-bold text-[#c9a84c]"
                        : "font-bold text-[#3399FF]"
                    }
                  >
                    {monthlyHours} ore
                  </span>{" "}
                  pe lună din cauza proceselor manuale. FirmFlow le rezolvă pe
                  toate.
                </p>
              ) : (
                <p className="text-base leading-relaxed text-krevo-silver md:text-lg">
                  Pare că ai deja o parte din procese sub control. FirmFlow te
                  poate ajuta să le unifici și să scalezi fără haos.
                </p>
              )}

              {submitted ? (
                <div className="mt-8 flex flex-col items-center rounded-xl border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-4 py-6 text-center">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9a84c] text-lg font-bold text-[#0a0a0a]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <p className="mt-3 text-sm font-medium text-[#c9a84c]">
                    Te contactăm în maxim 24 ore!
                  </p>
                </div>
              ) : skipped ? (
                <a
                  href="https://wa.me/40774451822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-[#25D366] bg-transparent px-6 py-3.5 text-sm font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                >
                  Hai să vorbim pe WhatsApp →
                </a>
              ) : (
                <form onSubmit={handleEmailSubmit} className="mt-8 space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Emailul tău pentru demo gratuit"
                    className={
                      gold
                        ? "w-full rounded-xl border border-[#c9a84c]/30 bg-[#050508] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-krevo-silver/40 focus:border-[#c9a84c]"
                        : "w-full rounded-xl border border-[#002B66] bg-[#050508] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-krevo-silver/40 focus:border-[#c9a84c]"
                    }
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#c9a84c] px-6 py-3.5 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#d4b85c] disabled:opacity-60"
                  >
                    {submitting
                      ? "Se trimite..."
                      : "Vreau să văd FirmFlow pentru firma mea →"}
                  </button>
                  {submitError ? (
                    <p className="text-center text-xs text-red-400">
                      {submitError}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setSkipped(true)}
                    className="w-full text-center text-xs text-krevo-silver/70 transition-colors hover:text-white"
                  >
                    Prefer fără email
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setDone(false);
                  setEmail("");
                  setSubmitted(false);
                  setSkipped(false);
                  setSubmitError(null);
                }}
                className="mt-3 w-full text-center text-xs text-krevo-silver/70 transition-colors hover:text-white"
              >
                Refă chestionarul
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function FirmFlowProductCard({
  navigateOnClick = true,
  accessHref = "/firmflow",
  quizTheme = "gold",
  animate = true,
}: {
  navigateOnClick?: boolean;
  accessHref?: string;
  quizTheme?: "gold" | "blue";
  animate?: boolean;
}) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });
  const [quizOpen, setQuizOpen] = useState(false);

  const show = !animate || inView;

  return (
    <>
      <div ref={cardRef} className="relative">
        <motion.article
          initial={animate ? { opacity: 0, y: 36 } : false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ ...springNatural, delay: 0.2 }}
          role={navigateOnClick ? "link" : undefined}
          tabIndex={navigateOnClick ? 0 : undefined}
          onClick={
            navigateOnClick
              ? (e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest("a, button")) return;
                  router.push("/firmflow");
                }
              : undefined
          }
          onKeyDown={
            navigateOnClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push("/firmflow");
                  }
                }
              : undefined
          }
          className={`firmflow-moon-card group relative w-full overflow-hidden rounded-[2rem] border border-[#c9a84c]/30 p-[4px] shadow-none transition-[box-shadow] duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] ${
            navigateOnClick ? "cursor-pointer" : ""
          }`}
        >
          <div className="relative overflow-hidden rounded-[calc(2rem-5px)] border border-[#c9a84c]/80 bg-gradient-to-br from-[#0a0a0a] to-[#0f0d00] p-5 sm:p-8 md:p-10">
            <div
              className="firmflow-float-card pointer-events-none absolute top-16 right-6 z-20 hidden rounded-xl border border-[#c9a84c] px-4 py-3 text-[13px] text-[#c9a84c] backdrop-blur-sm lg:block"
              style={{
                background: "rgba(0,0,0,0.6)",
                animationDelay: "0s",
              }}
              aria-hidden="true"
            >
              <p className="font-semibold leading-tight">⚡ 30 sec</p>
              <p className="mt-0.5 leading-tight">Generare ofertă AI</p>
            </div>
            <div
              className="firmflow-float-card pointer-events-none absolute top-[42%] right-8 z-20 hidden rounded-xl border border-[#c9a84c] px-4 py-3 text-[13px] text-[#c9a84c] backdrop-blur-sm lg:block"
              style={{
                background: "rgba(0,0,0,0.6)",
                animationDelay: "1s",
              }}
              aria-hidden="true"
            >
              <p className="font-semibold leading-tight">👥 7 roluri</p>
              <p className="mt-0.5 leading-tight">Interfețe personalizate</p>
            </div>
            <div
              className="firmflow-float-card pointer-events-none absolute right-6 bottom-16 z-20 hidden rounded-xl border border-[#c9a84c] px-4 py-3 text-[13px] text-[#c9a84c] backdrop-blur-sm lg:block"
              style={{
                background: "rgba(0,0,0,0.6)",
                animationDelay: "2s",
              }}
              aria-hidden="true"
            >
              <p className="font-semibold leading-tight">📍 GPS</p>
              <p className="mt-0.5 leading-tight">Pontaj verificat automat</p>
            </div>
            <div
              className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[#c9a84c]/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[#c9a84c]/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 left-[-5%] h-56 w-56 rounded-full bg-[#c9a84c]/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl">
              <span className="mb-4 inline-block rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-semibold tracking-[0.12em] text-[#0a0a0a] uppercase">
                Produs principal · Disponibil acum
              </span>
              <h3 className="mt-4 flex flex-wrap items-center font-serif text-3xl font-bold sm:text-4xl md:text-6xl lg:text-7xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/firmflow-logo.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="mr-2 h-12 w-auto object-contain sm:mr-4 sm:h-16 md:h-24"
                  aria-hidden="true"
                />
                <span className="leading-none text-white">Firm</span>
                <span className="leading-none text-[#c9a84c]">Flow</span>
              </h3>
              <p className="mt-4 font-serif text-lg text-[#e8d5a3] italic sm:mt-5 sm:text-xl md:text-2xl">
                Tot ce mișcă în firma ta — într-un singur loc
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-krevo-silver sm:mt-6 sm:text-base md:text-lg">
                Platforma care adună proiecte, echipe, materiale și pontaj
                într-un flux clar — fără Excel, fără haos.
              </p>

              <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
                {[
                  { value: "30 sec", label: "ofertă AI" },
                  { value: "0", label: "foi pontaj" },
                  { value: "100%", label: "vizibilitate" },
                  { value: "7 zile", label: "până live" },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 px-3 py-1.5 text-[12px] text-[#e8d5a3]"
                  >
                    <span className="font-bold text-[#c9a84c]">
                      {badge.value}
                    </span>
                    <span className="text-krevo-silver">{badge.label}</span>
                  </span>
                ))}
              </div>

              <div
                className="mt-8 h-px w-full max-w-2xl bg-[#c9a84c]/50"
                aria-hidden="true"
              />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={accessHref}
                  {...(accessHref.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#c9a84c] px-7 py-3.5 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-[#d4b85c] sm:w-auto"
                >
                  Accesează platforma
                </a>
                <a
                  href={PDF_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#c9a84c] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/10 sm:w-auto"
                >
                  <Download size={16} strokeWidth={2} aria-hidden="true" />
                  Descarcă Ghidul PDF
                </a>
              </div>

              <button
                type="button"
                onClick={() => setQuizOpen(true)}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#c9a84c]/50 bg-transparent px-7 py-3.5 text-sm font-semibold text-[#e8d5a3] transition-colors hover:border-[#c9a84c] hover:text-[#c9a84c] sm:w-auto"
              >
                Cât timp pierzi zilnic? →
              </button>

              <p className="mt-6 flex max-w-2xl items-start justify-center gap-2 text-center text-[12px] text-krevo-silver italic">
                <span className="shrink-0 not-italic" aria-hidden="true">
                  ℹ️
                </span>
                <span>
                  Datele prezentate sunt fictive și au scop demonstrativ.
                  Platforma ta va fi personalizată complet după nevoile firmei
                  tale.
                </span>
              </p>
            </div>
          </div>
        </motion.article>
      </div>

      <TimeLossQuizModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        theme={quizTheme}
      />
    </>
  );
}
