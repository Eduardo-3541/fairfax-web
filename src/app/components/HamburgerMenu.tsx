"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import type { NavItem } from "./headerTypes";
import Button from "./Button";

type Props = {
  open?: boolean;
  onToggle?: (open: boolean) => void;
  items: NavItem[];
  panelBgColor?: string;
  panelTextColor?: string;
};

export default function HamburgerMenu({ open: controlledOpen, onToggle, items, panelBgColor, panelTextColor }: Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const [animateItems, setAnimateItems] = useState(false);
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const PANEL_EASING = "cubic-bezier(0.33, 1, 0.68, 1)"; // easeOut
  const PANEL_DURATION_OPEN_MS = 480;
  const PANEL_DURATION_CLOSE_MS = 300;

  useEffect(() => {
    if (open) {
      setAnimateItems(false);
      requestAnimationFrame(() => setAnimateItems(true));
    } else {
      setAnimateItems(false);
    }
  }, [open]);
  const toggle = () => {
    const next = !open;
    if (onToggle) onToggle(next);
    else setUncontrolledOpen(next);
  };

  const handleItemClick = () => {
    if (onToggle) onToggle(false);
    else setUncontrolledOpen(false);
  };

  useEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }
    previousPathRef.current = pathname;
    if (!open) {
      return;
    }
    if (onToggle) onToggle(false);
    else setUncontrolledOpen(false);
  }, [pathname, open, onToggle]);

  return (
    <div className="relative z-50">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={toggle}
        className="group relative z-[60] flex h-10 w-12 sm:w-14 items-center justify-end pr-1 sm:pr-2"
      >
        <span className="absolute right-0 block h-[2px] w-10 sm:w-12 bg-current transition-transform duration-300 -translate-y-[0.45rem]" />
        <span className="absolute right-0 block h-[2px] w-10 sm:w-12 bg-current transition-opacity duration-300" />
        <span className="absolute right-0 block h-[2px] w-10 sm:w-12 bg-current transition-transform duration-300 translate-y-[0.45rem]" />
      </button>

      <div
        className={`fixed left-0 right-0 top-0 z-40 origin-top overflow-hidden transition-[max-height] ${
          open ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          willChange: "max-height",
          transitionTimingFunction: PANEL_EASING,
          transitionDuration: `${open ? PANEL_DURATION_OPEN_MS : PANEL_DURATION_CLOSE_MS}ms`,
          boxShadow: open ? "0 22px 38px rgba(0, 0, 0, 0.28)" : "none",
        }}
      >
        <div
          className="w-screen"
          style={{
            backgroundColor: panelBgColor ?? "var(--brand-dark)",
          }}
        >
          <div
            className="px-4 sm:px-6 pt-14 sm:pt-24 pb-10 sm:pb-16 text-center flex min-h-screen flex-col items-center"
            style={{ color: panelTextColor ?? "var(--brand-light)" }}
          >
            <nav className="flex w-full flex-col items-center gap-8 sm:gap-10 text-3xl sm:text-4xl tracking-wide font-semibold">
              {items.map(({ href, label }, index) => (
                <NavLink
                  key={`${href}-${label}-${index}`}
                  href={href}
                  className={`opacity-80 hover:opacity-90 ${index === 0 ? "mt-16" : ""} ${
                    animateItems ? "menu-item-fade" : "menu-item-hidden"
                  }`}
                  onClick={handleItemClick}
                  style={animateItems ? { animationDelay: `${index * 120}ms` } : undefined}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div
              className={`mt-auto w-full pt-12 sm:pt-16 lg:hidden ${animateItems ? "menu-item-fade" : "menu-item-hidden"}`}
              style={animateItems ? { animationDelay: `${items.length * 120}ms` } : undefined}
            >
              <Button
                href="/contact"
                onClick={handleItemClick}
                className="flex w-full max-w-sm mx-auto justify-center px-6 py-3 text-lg tracking-[0.2em] sm:text-xl"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
