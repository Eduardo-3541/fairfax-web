"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeaderSharedProps } from "../headerTypes";
import LogoInline from "../icons/logoinline";
import LogoSplit from "../icons/logosplit";
import HamburgerMenu from "../HamburgerMenu";
import Button from "../Button";

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
          <div className="mr-auto hidden lg:block relative z-[80]">
            <Button href="/contact">Contact</Button>
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
            <LogoInline className="hidden h-8 w-auto [&_*]:fill-current transition-colors duration-300 lg:block" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="ml-auto">
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
