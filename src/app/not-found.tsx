import { MotionButton } from "@/components/ui/MotionButton";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#000000] px-6 text-krevo-body">
      <div className="text-center">
        <h1 className="font-serif text-[36px] font-bold text-white md:text-[42px]">
          404 — Pagina nu{" "}
          <span className="section-title-accent">există</span>
        </h1>
        <p className="mt-4 text-[16px] text-krevo-silver">
          Pagina pe care o cauți nu a fost găsită.
        </p>
        <div className="mt-8 flex justify-center">
          <MotionButton label="Înapoi la homepage" href="/" />
        </div>
      </div>
    </div>
  );
}
