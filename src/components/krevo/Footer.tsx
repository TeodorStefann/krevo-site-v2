import Image from "next/image";

const links = [
  { label: "FirmFlow", href: "/firmflow" },
  { label: "Servicii", href: "/servicii" },
  { label: "Termeni", href: "/termeni" },
  { label: "Confidențialitate", href: "/confidentialitate" },
  { label: "Cookies", href: "/cookie-policy" },
];

const linkClass =
  "text-[13px] text-krevo-silver transition-colors duration-200 hover:text-[#3399FF]";

const legalLinkClass =
  "transition-colors duration-200 hover:text-[#3399FF]";

const socialClass =
  "flex h-9 w-9 items-center justify-center rounded-full text-krevo-silver transition-colors duration-200 hover:text-[#3399FF]";

function Separator() {
  return (
    <span className="text-krevo-silver/40" aria-hidden="true">
      ·
    </span>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
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

        <div className="mt-4 flex items-center justify-center gap-2">
          <a
            href="https://linkedin.com/in/teodor-chiurtu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={socialClass}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://wa.me/40774451822"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={socialClass}
          >
            <WhatsAppIcon />
          </a>
        </div>

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
          © 2026 Krevo · Persoană fizică autorizată · teodor@krevo.ro ·
          0774451822
        </p>
      </div>
    </footer>
  );
}
