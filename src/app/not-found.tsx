import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-krevo-body">
      <div className="text-center">
        <h1 className="font-serif text-[36px] font-bold text-white md:text-[42px]">
          404 — Pagina nu{" "}
          <span className="section-title-accent">există</span>
        </h1>
        <p className="mt-4 text-[16px] text-krevo-silver">
          Pagina pe care o cauți nu a fost găsită.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#6b21a8] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c3aed]"
        >
          Înapoi la homepage
        </Link>
      </div>
    </div>
  );
}
