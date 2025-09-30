"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./icons/logo";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisualOpen, setMenuVisualOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const MENU_ANIMATION_MS = 1000; // keep in sync with HamburgerMenu transition duration
  const CLOSE_COLOR_RESET_MS = 300; // shorter delay keeps close animation visible above header

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

  const headerBg = menuVisualOpen ? "var(--brand-dark)" : "var(--brand-light)";
  const headerColor = menuVisualOpen ? "var(--brand-light)" : "var(--brand-dark)";
  const logoTextClass = menuVisualOpen ? "text-[var(--brand-light)]" : "text-[var(--brand-dark)]";
  return (
    <header className="relative z-[70] w-full border-b border-black/[.08] dark:border-white/[.145] transition-colors duration-300" style={{ backgroundColor: headerBg, color: headerColor }}>
      <div className="w-full px-4 sm:px-6">
        <div className="relative flex h-20 items-center">
          <Link
            href="/"
            aria-label="Home"
            className={`absolute left-1/2 -translate-x-1/2 z-[80] flex items-center gap-2 ${logoTextClass}`}
          >
            <Logo className="h-8 w-auto [&_*]:fill-current transition-colors duration-300" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="ml-auto">
            <HamburgerMenu open={menuOpen} onToggle={handleToggle} />
          </div>
        </div>
      </div>
    </header>
  );
}
