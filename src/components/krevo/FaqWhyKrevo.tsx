"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/40774451822";

type FaqItem = {
  question: string;
  answer: string;
  whatsappLink?: boolean;
};

const faqs: FaqItem[] = [
  {
    question: "Cât durează implementarea?",
    answer:
      "De regulă între 7 și 14 zile de la semnarea contractului, în funcție de complexitatea firmei tale.",
  },
  {
    question: "Angajații mei vor ști să o folosească?",
    answer:
      "Da. Muncitorul vede 3 butoane mari pe telefon. Nu ai nevoie de training sau cursuri.",
  },
  {
    question: "Ce se întâmplă dacă am o problemă?",
    answer:
      "Mă contactezi direct pe WhatsApp și rezolv în aceeași zi. Nu există ticket de suport sau call center.",
  },
  {
    question: "Pot renunța oricând?",
    answer:
      "Contractul are o perioadă minimă de 3 luni. După aceea poți renunța cu 30 zile preaviz. Datele tale rămân ale tale indiferent.",
  },
  {
    question: "Funcționează pe telefon?",
    answer:
      "Da. Optimizat pentru orice telefon, chiar și mai vechi. Muncitorii nu au nevoie de smartphone nou.",
  },
  {
    question: "Cât costă?",
    answer:
      "Depinde de complexitatea firmei tale și de modulele de care ai nevoie. Hai să vorbim 15 minute și îți fac o ofertă personalizată.",
    whatsappLink: true,
  },
  {
    question: "Datele firmei mele sunt în siguranță?",
    answer:
      "Da. Servere europene, backup zilnic, acces doar pentru tine și echipa ta.",
  },
  {
    question: "Pot vedea un demo înainte să decid?",
    answer:
      "Da. 7 zile gratuit, fără card, fără risc. Vezi exact cum ar arăta platforma pentru firma ta.",
  },
];

const others = [
  "Suport prin email cu răspuns în 3-5 zile",
  "Call center care nu știe produsul",
  "Contracte pe 2 ani fără ieșire",
  "Prețuri ascunse la fiecare update",
  "Template generic pentru toți clienții",
];

const krevo = [
  "Răspuns pe WhatsApp în aceeași zi",
  "Vorbești direct cu fondatorul",
  "Contract flexibil minim 3 luni",
  "Toate update-urile incluse în mentenanță",
  "Platformă construită specific pentru firma ta",
];

/** Combined FAQ + WhyKrevo for the homepage. */
export function FaqWhyKrevo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#000510] px-6 py-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-[28px] font-bold text-white sm:text-[36px]">
          Întrebări și{" "}
          <span className="section-title-accent">răspunsuri</span>
        </h2>
        <div
          className="mx-auto mt-5 h-px w-[60px] bg-[#0052CC] shadow-[0_0_16px_4px_rgba(0,82,204,0.55)]"
          aria-hidden="true"
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl border border-[#002B66] bg-[#0a0a0a] transition-colors hover:border-[#3399FF]/50"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                >
                  <span className="text-[15px] font-semibold text-white md:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1.75}
                    className={`shrink-0 text-[#3399FF] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-[#002B66]/60 px-5 pt-3 pb-5 md:px-6 md:pb-6">
                      <p className="text-[14px] leading-[1.7] text-[#d0d0d0] md:text-[15px]">
                        {item.answer}
                      </p>
                      {item.whatsappLink ? (
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-[13px] text-[#25D366] transition-colors hover:text-[#4ae07a]"
                        >
                          Scrie-mi pe WhatsApp →
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        id="de-ce-krevo"
        className="relative z-10 mx-auto mt-14 max-w-6xl md:mt-16"
      >
        <h2 className="text-center font-serif text-[28px] font-bold text-white sm:text-[36px]">
          De ce <span className="section-title-accent">Krevo</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[16px] text-krevo-silver italic">
          Când ai o problemă vorbești direct cu omul care a construit platforma
          — nu cu un call center din altă țară.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-2xl border border-red-500/30 bg-[#0a0a0a] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15">
                <X size={20} strokeWidth={2.5} className="text-red-500" />
              </span>
              <h3 className="text-xl font-bold text-white">Alte firme</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {others.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X
                    size={18}
                    strokeWidth={2.25}
                    className="mt-0.5 shrink-0 text-red-500"
                  />
                  <span className="text-[15px] leading-[1.55] text-[#d0d0d0]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/35 bg-[#0a0a0a] p-6 shadow-[0_0_40px_rgba(16,185,129,0.08)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15">
                <Check
                  size={20}
                  strokeWidth={2.5}
                  className="text-emerald-400"
                />
              </span>
              <h3 className="text-xl font-bold text-white">Krevo</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {krevo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2.25}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />
                  <span className="text-[15px] leading-[1.55] text-[#d0d0d0]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#c9a227]/45 bg-gradient-to-b from-[#1a1408] to-[#0a0a0a] px-6 py-8 text-center shadow-[0_0_40px_rgba(201,162,39,0.12)] md:px-10 md:py-10">
          <p className="font-serif text-[17px] leading-[1.7] text-[#e8d5a3] italic md:text-[18px]">
            „Nu lucrez cu zeci de clienți deodată. Când semnăm, firma ta
            primește toată atenția mea — de la implementare până la suport
            zilnic.”
          </p>
          <footer className="mt-5 text-[14px] font-medium text-[#c9a227]">
            — Teodor Chiurtu, Fondator Krevo
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
