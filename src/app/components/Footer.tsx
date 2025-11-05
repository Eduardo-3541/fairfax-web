import Link from "next/link";
import { SiInstagram, SiLinkedin } from "react-icons/si";
// Use explicit extension to avoid resolver edge cases on some build systems
import Logo from "./icons/logoinline.tsx";

const footerNav = [
  { href: "/", label: "Home" },
  { href: "/under-construction", label: "Interiors" },
  { href: "/under-construction", label: "About" },
  { href: "/under-construction", label: "Upholstery" },
  { href: "/under-construction", label: "Process" },
  { href: "/under-construction", label: "Soft Furnishings" },
  { href: "/under-construction", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-dark)] px-8 py-10 text-[var(--brand-light)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="sr-only">Fairfax Interiors</span>
            <Logo className="h-4 w-auto sm:h-5 text-[var(--brand-light)] [&_*]:fill-current" aria-hidden="true" />
          </div>
          <address className="not-italic text-sm leading-relaxed">
            The Chantry, Stratford Road<br />
            Wroxton<br />
            Oxfordshire<br />
            OX15 6QS
          </address>
          <div className="text-sm leading-relaxed">
            <p>
              Email:{" "}
              <a className="underline underline-offset-2" href="mailto:info@fairfaxinteriors.com">
                info@fairfaxinteriors.com
              </a>
            </p>
            <p>
              Telephone:{" "}
              <a className="underline underline-offset-2" href="tel:+4407974097364">
                07974 097364
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <nav className="grid grid-cols-3 justify-items-start gap-x-4 gap-y-3 sm:gap-x-8 sm:gap-y-4 md:grid-cols-2 md:gap-x-14 md:text-right sm:justify-items-start md:justify-items-end">
            {footerNav.map(({ href, label }) => (
              <Link key={`${href}-${label}`} className="transition hover:opacity-80" href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-4 md:self-end">
            <Link
              href="https://www.instagram.com/fairfaxinteriors"
              aria-label="Fairfax Interiors on Instagram"
              className="transition hover:opacity-70"
              target="_blank"
              rel="noreferrer"
            >
              <SiInstagram className="h-6 w-6 text-[var(--brand-light)]" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/fairfax-interiors-oxfordshire/"
              aria-label="Fairfax Interiors on LinkedIn"
              className="transition hover:opacity-70"
              target="_blank"
              rel="noreferrer"
            >
              <SiLinkedin className="h-6 w-6 text-[var(--brand-light)]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center gap-2 border-t border-white/10 pt-6 text-sm text-[var(--brand-light)]/80 md:flex-row md:items-center md:justify-between">
        <span className="uppercase tracking-[0.28em]">© {currentYear} Fairfax Interiors</span>
        <div className="flex items-center gap-4">
          <Link className="transition hover:opacity-80 normal-case tracking-normal" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="transition hover:opacity-80 normal-case tracking-normal" href="/terms-and-conditions">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
