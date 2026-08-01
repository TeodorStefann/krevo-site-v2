const subHeroBg = {
  backgroundImage: "url('/bg-sub-hero.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
} as const;

export function TrustBar() {
  return (
    <section className="px-6 py-6" style={subHeroBg}>
      <p className="text-center text-[13px] text-[#888888]">
        Prima platformă de acest gen din România.
      </p>
    </section>
  );
}
