/** Thin glowing line that softens the seam between two stacked sections. */
export function SectionDivider() {
  return (
    <div
      className="flex justify-center bg-[#000000] py-6"
      aria-hidden="true"
    >
      <span
        className="h-px w-20 shadow-[0_0_8px_rgba(0,102,255,0.55)]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #0066FF 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
