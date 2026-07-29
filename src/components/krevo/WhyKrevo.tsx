import { Check, X } from "lucide-react";

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

export function WhyKrevo() {
  return (
    <section
      id="de-ce-krevo"
      className="relative overflow-hidden bg-[#000000] px-6 py-[100px]"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-[36px] font-bold text-white">
          Nu ești un ticket de suport. Ești un{" "}
          <span className="section-title-accent">partener</span>.
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
