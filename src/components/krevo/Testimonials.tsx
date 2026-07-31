export function Testimonials() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-[120px]">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="text-center text-[28px] font-bold text-white sm:text-[32px]">
          Ce spun <span className="section-title-accent">clienții</span>
        </h2>

        <figure className="relative mx-auto mt-12 max-w-[600px] rounded-2xl border border-dashed border-[#0066FF] px-10 py-12 text-center">
          <span
            className="pointer-events-none absolute top-3 left-5 font-serif text-6xl leading-none text-[#0066FF]"
            aria-hidden="true"
          >
            „
          </span>
          <span
            className="pointer-events-none absolute right-5 bottom-3 font-serif text-6xl leading-none text-[#0066FF]"
            aria-hidden="true"
          >
            ”
          </span>

          <blockquote className="relative z-10 text-[15px] leading-relaxed text-krevo-silver italic">
            Primul testimonial vine în curând. Până atunci — încearcă platforma
            și convinge-te singur.
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
