"use client";

import Link from "next/link";
import type { HeaderSharedProps } from "../headerTypes";
import Logo from "../icons/logo";
import NavLink from "../NavLink";

type InlineNavHeaderProps = Pick<HeaderSharedProps, "primaryNavItems" | "contactItem" | "isScrolled" | "scrollProgress">;

export default function InlineNavHeader({
  primaryNavItems,
  contactItem,
  isScrolled,
  scrollProgress,
}: InlineNavHeaderProps) {
  const paddingBase = 24; // px
  const paddingY = paddingBase - scrollProgress * 12;
  const logoScale = 1 - scrollProgress * 0.08;
  const navGap = 2 + scrollProgress * 0.75; // rem
  const navFontSize = 1.25 - scrollProgress * 0.15; // rem
  const navLetterSpacing = 0.22 - scrollProgress * 0.07; // em

  return (
    <header
      className={`relative z-[70] w-full border-b border-black/[.08] dark:border-white/[.145] transition-all duration-500 ease-out ${
        isScrolled ? "border-black/[.12]" : ""
      }`}
      style={{
        backgroundColor: "var(--brand-light)",
        color: "var(--brand-dark)",
      }}
    >
      <div
        className="w-full px-4 sm:px-6"
        style={{
          paddingTop: `${paddingY}px`,
          paddingBottom: `${paddingY}px`,
          transition: "padding 0.2s ease-out",
        }}
      >
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-3 text-[var(--brand-dark)]"
            style={{
              transform: `scale(${logoScale})`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <Logo className="h-8 w-auto [&_*]:fill-current" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
          <nav
            className="flex flex-1 flex-wrap items-center text-[var(--brand-dark)]"
            style={{
              gap: `${navGap}rem`,
              fontSize: `${navFontSize}rem`,
              fontWeight: 700,
              letterSpacing: `${navLetterSpacing}em`,
              transition: "gap 0.2s ease-out, font-size 0.2s ease-out, letter-spacing 0.2s ease-out",
            }}
          >
            {primaryNavItems.map(({ href, label }) => (
              <NavLink key={href} href={href} className="whitespace-nowrap px-1 pb-1 hover:opacity-90">
                {label}
              </NavLink>
            ))}
          </nav>
          {contactItem ? (
            <Link
              href={contactItem.href}
              className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-full border border-current px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[var(--brand-dark)] transition-colors hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)] sm:px-5 sm:py-2 sm:text-base"
            >
              {contactItem.label}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
