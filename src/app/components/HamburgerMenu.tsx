"use client";

import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import type { NavItem } from "./headerTypes";

type Props = {
  open?: boolean;
  onToggle?: (open: boolean) => void;
  items: NavItem[];
};

export default function HamburgerMenu({ open: controlledOpen, onToggle, items }: Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const [animateItems, setAnimateItems] = useState(false);
  const PANEL_EASING = "cubic-bezier(0.18, 0.96, 0.94, 0.5)";
  const PANEL_DURATION_OPEN_MS = 2000;
  const PANEL_DURATION_CLOSE_MS = 1000;

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
        className={`fixed left-0 right-0 top-0 z-40 origin-top overflow-hidden transition-[max-height] duration-1000 ${
          open ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          willChange: "max-height",
          transitionTimingFunction: PANEL_EASING,
          transitionDuration: `${open ? PANEL_DURATION_OPEN_MS : PANEL_DURATION_CLOSE_MS}ms`,
        }}
      >
        <div className="w-screen" style={{ backgroundColor: "var(--brand-dark)" }}>
          <div className="px-4 sm:px-6 pt-14 sm:pt-24 pb-10 sm:pb-16 text-center" style={{ color: "var(--brand-light)" }}>
            <nav className="flex flex-col items-center gap-2 sm:gap-3 text-xl sm:text-4xl tracking-wide font-semibold">
              {items.map(({ href, label }, index) => (
                <NavLink
                  key={href}
                  href={href}
                  className={`hover:opacity-90 ${animateItems ? "menu-item-fade" : "menu-item-hidden"}`}
                  style={animateItems ? { animationDelay: `${index * 120}ms` } : undefined}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
