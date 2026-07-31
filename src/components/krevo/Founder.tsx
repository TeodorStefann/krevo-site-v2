import Image from "next/image";

const WHATSAPP_HREF = "https://wa.me/40774451822";

export function Founder() {
  return (
    <section
      id="despre"
      className="relative overflow-hidden bg-[#000510] px-6 py-20 md:py-[120px]"
    >
      {/* Spotlight tracks the photo: centred near the top when stacked, left column on desktop. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 28%, rgba(0,102,255,0.05) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        style={{
          background:
            "radial-gradient(circle at 25% 50%, rgba(0,102,255,0.05) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/teodor.png"
            alt="Teodor Chiurtu"
            width={339}
            height={737}
            className="h-auto max-h-[800px] w-auto rounded-[12px] object-contain"
          />
        </div>

        <div>
          <p className="mb-4 text-[14px] font-semibold tracking-widest text-[#0066FF] uppercase">
            Cine construiește asta?
          </p>

          <p className="text-[24px] font-bold text-white">Teodor Chiurtu</p>
          <p className="mt-1 text-[14px] text-[#0066FF]">Fondator Krevo</p>

          <p className="mt-5 text-[15px] leading-relaxed text-krevo-silver">
            Luni de research și testare. Construit cu tehnologii de care
            majoritatea nici n-au auzit.
          </p>

          <p className="mt-6 text-[20px] leading-relaxed text-white">
            Ce altora le ia echipe întregi — eu livrez în săptămâni.
          </p>

          <p className="mt-6 text-[16px] leading-relaxed text-krevo-silver">
            Accept maximum 5 firme noi pe lună. Când ai o problemă cu platforma
            — răspund eu personal.
          </p>

          <p className="mt-6 text-[15px] font-bold text-[#3399FF]">
            Fiecare client primește linia mea directă. Răspund personal — nu un
            bot.
          </p>

          <p className="mt-6 text-[16px] leading-snug font-bold text-white">
            Singura platformă construită de un om care răspunde personal la
            telefon.
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-krevo-silver italic">
            Construită de cineva care înțelege că n-ai timp de manuale și
            training-uri — nu de o corporație care nu ți-a vizitat niciodată
            firma.
          </p>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0066FF] px-8 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#0052CC] sm:w-auto"
          >
            Scrie-mi direct →
          </a>

          <p className="mt-4 text-[13px] text-krevo-silver">
            Sau scrie-mi un email:{" "}
            <a
              href="mailto:teodor@krevo.ro"
              className="underline-offset-2 transition-colors hover:text-[#3399FF] hover:underline"
            >
              teodor@krevo.ro
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
