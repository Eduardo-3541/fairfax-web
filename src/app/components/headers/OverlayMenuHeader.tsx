"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeaderSharedProps } from "../headerTypes";
import LogoInline from "../icons/logoinline";
import LogoSplit from "../icons/logosplit";
import HamburgerMenu from "../HamburgerMenu";
import Button from "../Button";
import { FaInstagram } from "react-icons/fa";
import NavLink from "../NavLink";

const CLOSE_COLOR_RESET_MS = 300;
const MENU_ANIMATION_MS = 480; // keep in sync with HamburgerMenu

type OverlayMenuHeaderProps = Pick<HeaderSharedProps, "navItems" | "isScrolled" | "scrollProgress">;

export default function OverlayMenuHeader({ navItems, isScrolled, scrollProgress }: OverlayMenuHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisualOpen, setMenuVisualOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = useCallback((next: boolean) => {
    setMenuOpen(next);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (next) {
      setMenuVisualOpen(true);
    } else {
      setMenuVisualOpen(true);
      closeTimeoutRef.current = setTimeout(() => {
        setMenuVisualOpen(false);
        closeTimeoutRef.current = null;
      }, Math.min(CLOSE_COLOR_RESET_MS, MENU_ANIMATION_MS));
    }
  }, []);

  useEffect(() => () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  }, []);

  const headerBg = "var(--brand-light)";
  const headerColor = "var(--brand-dark)";
  const logoTextClass = "text-[var(--brand-dark)]";
  const headerHeight = 80 - (menuOpen ? 0 : scrollProgress) * 12; // px
  const logoScale = menuOpen ? 1.1 : 1 - scrollProgress * 0.06;

  // Prepare split navigation for desktop: split the nav items around the logo
  const primaryNavItems = navItems;
  const midpoint = Math.ceil(primaryNavItems.length / 2);
  const leftNavItems = primaryNavItems.slice(0, midpoint);
  const rightNavItems = primaryNavItems.slice(midpoint);
  // Scale nav items from their center to avoid positional skew
  const itemScale = 1 - scrollProgress * 0.12;

  return (
    <header
      className={`relative z-[70] w-full border-b border-black/[.08] dark:border-white/[.145] transition-all duration-500 ease-out ${
        isScrolled ? "border-black/[.12]" : ""
      }`}
      style={{ backgroundColor: headerBg, color: headerColor }}
    >
      <div className="w-full px-4 sm:px-6 transition-all duration-500 ease-out">
        <div
          className="relative flex items-center transition-all duration-500 ease-out"
          style={{ height: `${headerHeight}px` }}
        >
          {/* Mobile: show Instagram in header */}
          <div className="mr-auto lg:hidden relative z-[80]">
            <Link
              href="https://www.instagram.com/fairfaxinteriors"
              aria-label="Open Fairfax Interiors on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[var(--brand-dark)] transition-opacity duration-200 hover:opacity-80"
              title="Instagram"
            >
              <FaInstagram className="h-10 w-10" />
            </Link>
          </div>
          {/* Desktop: split nav either side of logo; hide the previous left cluster */}
          <div className="hidden lg:block absolute inset-x-0">
            <div className="grid w-full grid-cols-[1fr_minmax(360px,auto)_1fr] items-center gap-6 px-6">
              <nav
                className="flex w-full items-center justify-between text-[var(--brand-dark)] pr-4"
                style={{
                  fontSize: `1.05rem`,
                  fontWeight: 700,
                  letterSpacing: `0.18em`,
                }}
              >
                {leftNavItems.map(({ href, label }, index) => (
                  <NavLink
                    key={`${href}-${label}-left-${index}`}
                    href={href}
                    className="whitespace-nowrap px-1 pb-1 hover:opacity-90"
                    style={{ transform: `scale(${itemScale})`, transformOrigin: "50% 50%" }}
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div />
              <nav
                className="flex w-full items-center justify-between text-[var(--brand-dark)] pl-4"
                style={{
                  fontSize: `1.05rem`,
                  fontWeight: 700,
                  letterSpacing: `0.18em`,
                }}
              >
                {rightNavItems.map(({ href, label }, index) => (
                  <NavLink
                    key={`${href}-${label}-right-${index}`}
                    href={href}
                    className="whitespace-nowrap px-1 pb-1 hover:opacity-90"
                    style={{ transform: `scale(${itemScale})`, transformOrigin: "50% 50%" }}
                  >
                    {label}
                  </NavLink>
                ))}
                {/* Desktop: Contact as a regular nav item */}
                <NavLink href="/contact" className="whitespace-nowrap px-1 pb-1 hover:opacity-90" style={{ transform: `scale(${itemScale})`, transformOrigin: "50% 50%" }}>
                  CONTACT
                </NavLink>
              </nav>
            </div>
          </div>
          <Link
            href="/"
            aria-label="Home"
            className={`absolute left-1/2 z-[80] flex items-center gap-2 ${logoTextClass}`}
            style={{
              transform: `translateX(-50%) scale(${logoScale})`,
              transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <LogoSplit className="h-12 w-auto [&_*]:fill-current transition-colors duration-300 lg:hidden" aria-hidden="true" />
            {/* Make the desktop logo smaller to fit nav on both sides */}
            <LogoInline className="hidden h-5 w-auto [&_*]:fill-current transition-colors duration-300 lg:block" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
          {/* Desktop: contact included in right nav above */}
          <div className="ml-auto lg:hidden">
            <HamburgerMenu
              open={menuOpen}
              onToggle={handleToggle}
              items={navItems}
              panelBgColor={"var(--brand-light)"}
              panelTextColor={"var(--brand-dark)"}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
