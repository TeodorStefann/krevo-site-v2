import Image from "next/image";

const links = [
  { label: "FirmFlow", href: "/firmflow" },
  { label: "Servicii", href: "/servicii" },
  { label: "Termeni", href: "/termeni" },
  { label: "Confidențialitate", href: "/confidentialitate" },
];

const linkClass =
  "text-[13px] text-krevo-silver transition-colors duration-200 hover:text-[#3399FF]";

const legalLinkClass =
  "transition-colors duration-200 hover:text-[#3399FF]";

function Separator() {
  return (
    <span className="text-krevo-silver/40" aria-hidden="true">
      ·
    </span>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#002B66] bg-[#000000] px-6 py-[60px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-2.5">
          <Image
            src="/krevo-logo.png"
            alt=""
            width={96}
            height={28}
            className="h-7 w-auto object-contain"
            aria-hidden="true"
          />
          <span className="text-[16px] text-white">Krevo</span>
        </div>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {links.map((item, i) => (
            <span key={item.label} className="flex items-center gap-x-3">
              {i > 0 && <Separator />}
              <a href={item.href} className={linkClass}>
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        <p className="mt-6 text-center text-[11px] text-krevo-silver">
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className={legalLinkClass}
          >
            ANPC
          </a>
          {" · "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className={legalLinkClass}
          >
            Platforma SOL
          </a>
        </p>

        <p className="mt-2 text-center text-[11px] text-krevo-silver">
          © 2026 Krevo · Persoană fizică autorizată · teodor@krevo.ro
        </p>
      </div>
    </footer>
  );
}
