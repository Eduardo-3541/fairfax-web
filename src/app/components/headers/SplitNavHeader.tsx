"use client";

import Link from "next/link";
import Logo from "../icons/logo";
import NavLink from "../NavLink";

const NAV_ITEMS = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#portfolio", label: "PORTFOLIO" },
  { href: "#shop", label: "SHOP" },
  { href: "#contact", label: "CONTACT" },
];

const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => item.href !== "#contact");
const CONTACT_ITEM = NAV_ITEMS.find((item) => item.href === "#contact");

const LEFT_NAV_ITEMS = PRIMARY_NAV_ITEMS.slice(0, Math.ceil(PRIMARY_NAV_ITEMS.length / 2));
const RIGHT_NAV_ITEMS = PRIMARY_NAV_ITEMS.slice(Math.ceil(PRIMARY_NAV_ITEMS.length / 2));

export default function SplitNavHeader() {
  return (
    <header
      className="relative z-[70] w-full border-b border-black/[.08] dark:border-white/[.145]"
      style={{ backgroundColor: "var(--brand-light)", color: "var(--brand-dark)" }}
    >
      <div className="w-full px-4 py-4 sm:px-6">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
          <div />
          <div className="flex flex-nowrap items-center gap-4 sm:gap-8">
            <nav className="flex items-center justify-end gap-4 text-base font-semibold tracking-wide text-[var(--brand-dark)] sm:gap-6 sm:text-lg">
              {LEFT_NAV_ITEMS.map(({ href, label }) => (
                <NavLink key={href} href={href} className="whitespace-nowrap px-1 pb-1 hover:opacity-90">
                  {label}
                </NavLink>
              ))}
            </nav>
            <Link href="/" aria-label="Home" className="flex items-center gap-2 text-[var(--brand-dark)]">
              <Logo className="h-8 w-auto [&_*]:fill-current" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
            <nav className="flex items-center justify-start gap-4 text-base font-semibold tracking-wide text-[var(--brand-dark)] sm:gap-6 sm:text-lg">
              {RIGHT_NAV_ITEMS.map(({ href, label }) => (
                <NavLink key={href} href={href} className="whitespace-nowrap px-1 pb-1 hover:opacity-90">
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          {CONTACT_ITEM ? (
            <Link
              href={CONTACT_ITEM.href}
              className="justify-self-end inline-flex items-center justify-center whitespace-nowrap rounded-full border border-current px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[var(--brand-dark)] transition-colors hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)] sm:px-5 sm:py-2 sm:text-base"
            >
              {CONTACT_ITEM.label}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
