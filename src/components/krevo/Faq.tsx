"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { TitleReveal } from "./animations/TitleReveal";

/* FAQ pe categorii — pill-uri cu indicator glisant sus, carduri acordeon jos.
   Fiecare categorie tratează un tip de obiecție dinaintea contactului:
   startul, banii, echipa, datele. Ultima oprire înainte de formular. */

const CATEGORII = [
  { id: "start", eticheta: "Început" },
  { id: "pret", eticheta: "Preț & contract" },
  { id: "echipa", eticheta: "Echipă & telefon" },
  { id: "date", eticheta: "Date & siguranță" },
] as const;

type CategorieId = (typeof CATEGORII)[number]["id"];

const INTREBARI: Record<CategorieId, { q: string; a: string }[]> = {
  start: [
    {
      q: "Cât durează până îl folosim?",
      a: "Din prima zi. Începem cu o probă de 5 zile configurată împreună, pe datele firmei tale — proiectele, oamenii și devizele tale reale. Dacă decizi să rămâi, implementarea completă e gata în 1–2 săptămâni, cu instruirea echipei inclusă.",
    },
    {
      q: "Ce înseamnă proba de 5 zile?",
      a: "Un cont complet funcțional, pe firma ta, nu un demo cu date inventate. Îl folosești ca și cum ai fi client: pontaj, oferte, devize, tot. Fără card, fără obligații — la final decizi cu aplicația în mână, nu după o prezentare.",
    },
    {
      q: "Trebuie să-mi mut eu datele în aplicație?",
      a: "Nu. La configurare introducem împreună proiectele active, echipa și clienții — durează o singură întâlnire. Tu vii doar cu informațiile, de restul mă ocup eu.",
    },
    {
      q: "Cu ce e diferit de un Excel bine făcut?",
      a: "Excelul depinde de cine îl completează. FirmFlow adună singur pontajul, generează oferte și devize cu AI în câteva minute și îți arată în fiecare dimineață situația reală a firmei — fără să-l roage nimeni.",
    },
  ],
  pret: [
    {
      q: "Cât costă?",
      a: "N-ar fi corect să-ți dau o cifră aici, pentru că ar fi greșită. O firmă de patru oameni care vrea pontaj și oferte nu are ce plăti cât una de treizeci, cu depozit, facturare și mentenanță — iar unele firme au nevoie de ceva construit special pentru felul lor de a lucra, care nu seamănă cu nimic din listă. Structura e însă mereu aceeași: o implementare, plătită o singură dată, apoi un abonament lunar fix. Nimic nu apare pe factură fără să fi fost spus dinainte. Cifra exactă ți-o spun în discuția de 15 minute, după ce înțeleg cum lucrezi — iar dacă nu se justifică pentru firma ta, îți spun tot atunci.",
    },
    {
      q: "Ce înseamnă „preț de fondator”?",
      a: "Primele 3 firme care semnează primesc cel mai mic preț pe care îl voi avea vreodată — și rămân blocate la el pe viață, indiferent cât crește prețul de listă după. E recompensa pentru încrederea de la început.",
    },
    {
      q: "Există costuri ascunse?",
      a: "Nu. Abonamentul include tot: găzduirea, actualizările, generările cu AI și suportul. Singura extindere e la echipele mari: primii 10 utilizatori sunt incluși, apoi se adaugă un cost fix pe fiecare om în plus — pe care îl știi dinainte, de la prima discuție. Nimic nu apare pe factură fără să fi fost spus.",
    },
    {
      q: "Pot renunța oricând?",
      a: "Da. Abonamentul e lunar, fără contracte forțate pe termen lung. Dacă FirmFlow nu îți aduce mai mult decât costă, n-are sens să rămâi — și datele rămân oricum ale tale.",
    },
  ],
  echipa: [
    {
      q: "Muncitorii mei nu sunt tehnici. O să se descurce?",
      a: "Da. Pentru ei, FirmFlow înseamnă un singur buton de pontaj pe telefon. Accesul se trimite pe WhatsApp — fără email, fără parole complicate — iar instruirea durează 30 de minute.",
    },
    {
      q: "Funcționează pe telefon?",
      a: "Complet. Se instalează ca aplicație pe orice telefon, pontajul se face cu GPS direct de pe șantier, iar tu vezi situația firmei de oriunde ești.",
    },
    {
      q: "Câți oameni pot adăuga?",
      a: "Toată echipa — primii 10 utilizatori sunt incluși în abonament, apoi un cost fix pe fiecare om în plus. Fiecare rol vede exact ce trebuie: muncitorul își vede pontajul și sarcinile lui, șeful de șantier echipa lui, iar tu vezi tot.",
    },
    {
      q: "Cine ne ajută dacă ne blocăm?",
      a: "Eu, direct — nu un call-center. Suport în română, pe WhatsApp sau telefon, plus un canal de suport chiar în aplicație. La firmele fondator, răspund prioritar.",
    },
  ],
  date: [
    {
      q: "Datele firmei mele sunt în siguranță?",
      a: "Da. Fiecare firmă are datele complet separate, criptate, pe servere din Uniunea Europeană, cu copii de siguranță automate. Nicio altă firmă nu poate vedea nimic din ce e al tău.",
    },
    {
      q: "Vede altcineva cifrele mele?",
      a: "Nu. Prețurile, marjele și clienții tăi sunt vizibili doar pentru oamenii cărora le dai tu acces, pe roluri. Nici măcar echipa ta nu vede mai mult decât îi setezi.",
    },
    {
      q: "Ce se întâmplă cu datele mele dacă renunț?",
      a: "Datele rămân ale tale, punct. La finalul colaborării contul se îngheață — nu se șterge — și poți exporta oricând tot ce ai introdus: devize, oferte, pontaje, facturi.",
    },
  ],
};

export function Faq() {
  const [categorie, setCategorie] = useState<CategorieId>("start");
  const [deschisa, setDeschisa] = useState<number | null>(0);

  return (
    <section
      id="intrebari"
      data-reveal
      className="relative overflow-hidden px-6 py-16 md:py-[92px]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(700px 420px at 50% 30%, rgba(0,102,255,0.05), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="mb-3 text-center text-[11.5px] font-semibold tracking-[0.24em] text-[#3399FF]/70 uppercase">
          Întrebări
        </p>
        <h2 className="text-center text-[28px] leading-tight font-bold text-white sm:text-[34px]">
          <TitleReveal text="Probabil te întrebi și tu asta." accentLast />
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-[14.5px] text-krevo-silver">
          Răspunsurile pe care le dau la fiecare discuție de 15 minute — ca să
          nu pierzi timp nici tu, nici eu.
        </p>

        {/* Pill-urile de categorie — indicatorul albastru glisează între ele */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORII.map((c) => {
            const activa = categorie === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategorie(c.id);
                  setDeschisa(0);
                }}
                aria-pressed={activa}
                className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                  activa
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {activa && (
                  <motion.span
                    layoutId="faq-pill-activ"
                    className="absolute inset-0 rounded-full bg-[#0066FF]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                {!activa && (
                  <span
                    className="absolute inset-0 rounded-full border border-white/10"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{c.eticheta}</span>
              </button>
            );
          })}
        </div>

        {/* Cardurile acordeon — lista se schimbă cu fade la schimbarea categoriei */}
        <div className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={categorie}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {INTREBARI[categorie].map((item, i) => {
                const eDeschisa = deschisa === i;
                return (
                  <div
                    key={item.q}
                    className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                      eDeschisa
                        ? "border-[#3399FF]/35 bg-white/[0.045] shadow-[0_0_34px_rgba(0,102,255,0.10)]"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setDeschisa(eDeschisa ? null : i)}
                      aria-expanded={eDeschisa}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span
                        className={`text-[15.5px] font-semibold transition-colors ${
                          eDeschisa ? "text-white" : "text-white/85"
                        }`}
                      >
                        {item.q}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-[#3399FF] transition-transform duration-300 ${
                          eDeschisa ? "rotate-45" : ""
                        }`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {eDeschisa && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pr-10 text-[14.5px] leading-relaxed text-krevo-silver">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
