import Image from "next/image";

const WHATSAPP_HREF = "https://wa.me/40774451822";

export function Founder() {
  return (
    <section
      id="despre"
      className="relative overflow-hidden bg-[#000510] px-6 py-[120px]"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[2fr_3fr] md:gap-14">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/teodor.png"
            alt="Teodor Chiurtu"
            width={400}
            height={500}
            className="h-auto max-h-[400px] w-auto rounded-[12px] object-contain"
          />
        </div>

        <div>
          <p className="text-[20px] leading-relaxed text-white">
            Construiesc singur ce alte firme fac cu echipe de 10 oameni — pentru
            că AI-ul mi-a dat un avantaj pe care nu îl avea nimeni acum 2 ani.
          </p>

          <p className="mt-6 text-[16px] leading-relaxed text-krevo-silver">
            Accept maximum 5 firme noi pe lună. Când ai o problemă cu platforma
            — răspund eu personal.
          </p>

          <p className="mt-6 text-[15px] font-bold text-[#3399FF]">
            Răspund în maxim 2 ore pe WhatsApp.
          </p>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0066FF] px-8 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-[#0052CC] sm:w-auto"
          >
            Scrie-mi direct →
          </a>
        </div>
      </div>
    </section>
  );
}
