"use client";

import { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
// Keep paths lowercase for case-sensitive deployments
import LogoInline from "./icons/logoinline";
import LogoSplit from "./icons/logosplit";
import HamburgerMenu from "./HamburgerMenu";
import Button from "./Button";

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [shrinkProgress, setShrinkProgress] = useState(0); // 0 (expanded) -> 1 (collapsed)
  // Header height should be consistent across viewports
  const [menuOpen, setMenuOpen] = useState(false);
  // Hold the dark header state slightly after menu closes for a seamless blend
  const [headerDark, setHeaderDark] = useState(false);

  // Keep body padding in sync with header height
  useEffect(() => {
    const updateVar = () => {
      const el = headerRef.current;
      if (!el) return;
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-height", `${Math.round(h)}px`);
    };
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);

  // Also update the CSS variable when the header shrinks/expands on scroll or menu state changes
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const h = el.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-height", `${Math.round(h)}px`);
  }, [shrinkProgress, menuOpen]);

  // Shrink header and logo smoothly on scroll
  useEffect(() => {
    const MAX_SCROLL = 120; // px of scroll to fully collapse
    const onScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const p = Math.min(1, y / MAX_SCROLL);
      setShrinkProgress(p);
    };
    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Removed breakpoint tracking: header height remains the same across viewports

  // Derived sizes for smooth animation
  // Keep padding consistent with desktop across all viewports
  const EXPANDED_PAD_Y = 26; // px
  const COLLAPSED_PAD_Y = 16; // px
  // Lock header at expanded size when menu is open
  const effectiveProgress = menuOpen ? 0 : shrinkProgress;
  const padY = COLLAPSED_PAD_Y + (EXPANDED_PAD_Y - COLLAPSED_PAD_Y) * (1 - effectiveProgress);

  // Use different sizes for inline vs split logos (split is much larger)
  const EXPANDED_LOGO_H_INLINE = 30; // px
  const COLLAPSED_LOGO_H_INLINE = 24; // px
  const EXPANDED_LOGO_H_SPLIT = 44; // px (reduced for mobile)
  const COLLAPSED_LOGO_H_SPLIT = 32; // px (reduced for mobile)
  // Keep inline logo at max layout size and scale visually to avoid pushing navs
  const inlineScale =
    1 -
    effectiveProgress *
      (1 - COLLAPSED_LOGO_H_INLINE / Math.max(1, EXPANDED_LOGO_H_INLINE));
  const logoHSplit =
    COLLAPSED_LOGO_H_SPLIT + (EXPANDED_LOGO_H_SPLIT - COLLAPSED_LOGO_H_SPLIT) * (1 - effectiveProgress);
  // Render split logo at its own height to avoid layout shift while scrolling
  const splitScale = 1;

  const leftNav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const rightNav = [
    { href: "/coming-soon", label: "Projects" },
    { href: "/coming-soon", label: "Shop" },
  ];

  const allNavForMobile = [...leftNav, ...rightNav, { href: "/contact", label: "Contact" }];

  // Match the dropdown's animation: header color blends over the same duration
  const PANEL_EASING = "cubic-bezier(0.33, 1, 0.68, 1)";
  const PANEL_DURATION_OPEN_MS = 480;
  const PANEL_DURATION_CLOSE_MS = 300;
  const headerTransitionMs = menuOpen ? PANEL_DURATION_OPEN_MS : PANEL_DURATION_CLOSE_MS;

  // Delay the fade back to light after closing
  useEffect(() => {
    if (menuOpen) {
      setHeaderDark(true);
      return;
    }
    const HOLD_MS = 140; // slight delay to let panel retract first
    const t = window.setTimeout(() => setHeaderDark(false), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [menuOpen]);

  const headerBg = headerDark ? "var(--brand-dark)" : "var(--brand-light)";
  const headerFg = headerDark ? "var(--brand-light)" : "var(--brand-dark)";

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 backdrop-blur`}
      style={{
        backgroundColor: headerBg,
        color: headerFg,
        transitionProperty: "background-color, color",
        transitionTimingFunction: PANEL_EASING,
        transitionDuration: `${headerTransitionMs}ms`,
      }}
    >
      <div
        className="relative mx-auto w-full max-w-6xl grid grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8"
        style={{ paddingTop: `${padY}px`, paddingBottom: `${padY}px`, transition: "padding 140ms ease-out" }}
      >
        {/* Left: mobile hamburger or left nav */}
        <div className="flex items-center justify-start">
          <div className="md:hidden">
            <HamburgerMenu items={allNavForMobile} open={menuOpen} onToggle={setMenuOpen} />
          </div>
          <nav className="hidden md:flex items-center justify-end gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {leftNav.map(({ href, label }) => (
              <NavLink key={`${href}-${label}`} href={href} compact>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Center: perfectly centered logo */}
        <div className="flex justify-center px-3 sm:px-4 md:px-6 lg:px-8">
          <Link href="/" aria-label="Go to home" className="inline-block">
            <span className="sr-only">Fairfax Interiors</span>
            <LogoInline
              className="w-auto text-current [&_*]:fill-current hidden xl:block"
              style={{
                height: `${EXPANDED_LOGO_H_INLINE}px`,
                transform: `scale(${inlineScale})`,
                transformOrigin: "center center",
                transition: "transform 140ms ease-out",
              }}
              aria-hidden="true"
            />
            <div className="block xl:hidden px-6 sm:px-8 md:px-10 lg:px-12">
              <LogoSplit
                className="w-auto text-current [&_*]:fill-current block"
                style={{
                  height: `${logoHSplit}px`,
                  transform: `scale(${splitScale})`,
                  transformOrigin: "center center",
                  transition: "height 140ms ease-out",
                }}
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>

        {/* Right: nav; mobile spacer keeps logo centered */}
        <div className="flex items-center justify-end">
          <nav className="hidden md:flex items-center gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            {rightNav.map(({ href, label }) => (
              <NavLink key={`${href}-${label}`} href={href} compact>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="md:hidden w-10 sm:w-12" aria-hidden="true" />
        </div>
      </div>
      {/* Desktop Contact button pinned to the right */}
      <div className="hidden md:block absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50">
        <Button href="/contact" className="!py-1.5 !px-5 !text-sm sm:!text-base tracking-[0.18em]">
          Contact
        </Button>
      </div>
  </header>
);
}
