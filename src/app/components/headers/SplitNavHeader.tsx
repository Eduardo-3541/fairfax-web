"use client";

import Link from "next/link";
import type { HeaderSharedProps } from "../headerTypes";
import Logo from "../icons/logo";
import NavLink from "../NavLink";

type SplitNavHeaderProps = Pick<HeaderSharedProps, "leftNavItems" | "rightNavItems" | "contactItem" | "isScrolled" | "scrollProgress">;

export default function SplitNavHeader({
  leftNavItems,
  rightNavItems,
  contactItem,
  isScrolled,
  scrollProgress,
}: SplitNavHeaderProps) {
  const paddingBase = 24; // px
  const paddingY = paddingBase - scrollProgress * 12;
  const logoScale = 1 - scrollProgress * 0.08;
  const navGap = 2.1 + scrollProgress * 0.85; // rem
  const navFontSize = 1.3 - scrollProgress * 0.18; // rem
  const navOffset = 0.25 * scrollProgress; // rem
  const clusterGap = 3.6 + scrollProgress * 0.65; // rem
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
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
          <div />
          <div
            className="flex flex-nowrap items-center"
            style={{
              gap: `${clusterGap}rem`,
              transition: "gap 0.2s ease-out",
            }}
          >
            <nav
              className="flex items-center justify-end text-[var(--brand-dark)]"
              style={{
                gap: `${navGap}rem`,
                fontSize: `${navFontSize}rem`,
                fontWeight: 700,
                letterSpacing: `${navLetterSpacing}em`,
                transform: `translateX(${-navOffset}rem)`,
                transition:
                  "gap 0.2s ease-out, transform 0.2s ease-out, font-size 0.2s ease-out, letter-spacing 0.2s ease-out",
              }}
            >
              {leftNavItems.map(({ href, label }) => (
                <NavLink key={href} href={href} className="whitespace-nowrap px-1 pb-1 hover:opacity-90">
                  {label}
                </NavLink>
              ))}
            </nav>
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
              className="flex items-center justify-start text-[var(--brand-dark)]"
              style={{
                gap: `${navGap}rem`,
                fontSize: `${navFontSize}rem`,
                fontWeight: 700,
                letterSpacing: `${navLetterSpacing}em`,
                transform: `translateX(${navOffset}rem)`,
                transition:
                  "gap 0.2s ease-out, transform 0.2s ease-out, font-size 0.2s ease-out, letter-spacing 0.2s ease-out",
              }}
            >
              {rightNavItems.map(({ href, label }) => (
                <NavLink key={href} href={href} className="whitespace-nowrap px-1 pb-1 hover:opacity-90">
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          {contactItem ? (
            <Link
              href={contactItem.href}
              className="justify-self-end inline-flex items-center justify-center whitespace-nowrap rounded-full border border-current px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[var(--brand-dark)] transition-colors hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)] sm:px-5 sm:py-2 sm:text-base"
            >
              {contactItem.label}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
