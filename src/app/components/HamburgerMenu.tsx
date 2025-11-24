"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "./NavLink";
import type { NavItem } from "./headerTypes";
import Button from "./Button";
import { FaInstagram } from "react-icons/fa";
// Panel uses the header's existing logo; none duplicated here

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

  // Remove Contact from the list (it appears as a button at the bottom)
  const menuItems = items.filter(
    (i) => i.label.toLowerCase() !== "contact" && i.href.toLowerCase() !== "/contact"
  );

  // Reorder: place "Services" directly after "About" when both exist
  const reorderedItems = (() => {
    const aboutIndex = menuItems.findIndex((i) => i.label.toLowerCase() === "about");
    const servicesIndex = menuItems.findIndex((i) => i.label.toLowerCase() === "services");
    if (aboutIndex === -1 || servicesIndex === -1 || servicesIndex === aboutIndex + 1) return menuItems;
    const copy = menuItems.slice();
    const [services] = copy.splice(servicesIndex, 1);
    copy.splice(Math.min(aboutIndex + 1, copy.length), 0, services);
    return copy;
  })();

  return (
    <div className="relative z-50">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={toggle}
        className="group relative z-[60] flex h-6 w-12 sm:w-14 items-center justify-end pr-1 sm:pr-2"
      >
        <span
          className={`absolute right-0 block h-[2px] w-10 sm:w-12 bg-current rounded transition-all duration-300 ease-out origin-center ${
            open ? "translate-y-0 rotate-45 scale-x-90" : "-translate-y-[0.45rem] rotate-0 scale-x-100"
          }`}
        />
        <span
          className={`absolute right-0 block h-[2px] w-10 sm:w-12 bg-current rounded transition-all duration-300 ease-out origin-center ${
            open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
          }`}
        />
        <span
          className={`absolute right-0 block h-[2px] w-10 sm:w-12 bg-current rounded transition-all duration-300 ease-out origin-center ${
            open ? "translate-y-0 -rotate-45 scale-x-90" : "translate-y-[0.45rem] rotate-0 scale-x-100"
          }`}
        />
      </button>

      <div
        className={`fixed left-0 right-0 z-50 origin-top overflow-hidden transition-[max-height] ${
          open ? "max-h-screen" : "max-h-0"
        }`}
        style={{
          top: "var(--header-height, 0px)",
          maxHeight: open ? "calc(100vh - var(--header-height, 0px))" : "0px",
          willChange: "max-height",
          transitionTimingFunction: PANEL_EASING,
          transitionDuration: `${open ? PANEL_DURATION_OPEN_MS : PANEL_DURATION_CLOSE_MS}ms`,
          boxShadow: "none",
        }}
      >
        <div
          className="w-screen"
          style={{
            backgroundColor: panelBgColor ?? "var(--brand-dark)",
          }}
        >
          <div
            className="px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-16 text-center flex min-h-[calc(100vh-var(--header-height,0px))] flex-col items-center"
            style={{ color: panelTextColor ?? "var(--brand-light)" }}
          >
            <nav className="flex w-full flex-col items-center gap-0 text-2xl sm:text-4xl tracking-wide font-semibold">
              {reorderedItems.map(({ href, label }, index) => (
                <div key={`${href}-${label}-${index}`} className="w-full max-w-sm">
                  <NavLink
                    href={href}
                    className={`opacity-80 hover:opacity-90 ${index === 0 ? "mt-12" : ""} ${
                      animateItems ? "menu-item-fade" : "menu-item-hidden"
                    }`}
                    onClick={handleItemClick}
                    style={animateItems ? { animationDelay: `${index * 120}ms` } : undefined}
                  >
                    {label}
                  </NavLink>
                  {index < reorderedItems.length - 1 && (
                    <span className="my-4 sm:my-6 block h-px w-full bg-gradient-to-r from-transparent via-current/25 to-transparent" />
                  )}
                </div>
              ))}
            </nav>
            <div
              className={`mt-auto w-full pt-6 sm:pt-16 lg:hidden ${animateItems ? "menu-item-fade" : "menu-item-hidden"} pb-[calc(env(safe-area-inset-bottom)+0.5rem)]`}
              style={animateItems ? { animationDelay: `${reorderedItems.length * 120}ms` } : undefined}
            >
              <div className="mb-5 flex justify-center">
                <Link
                  href="https://www.instagram.com/fairfaxinteriors"
                  aria-label="Open Fairfax Interiors on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[var(--brand-light)] transition-opacity duration-200 hover:opacity-80"
                  title="Instagram"
                  onClick={handleItemClick}
                >
                  <FaInstagram className="h-8 w-8" />
                </Link>
              </div>
              <Button
                href="/contact"
                onClick={handleItemClick}
                className="flex w-full max-w-sm mx-auto justify-center px-6 py-2.5 text-lg tracking-[0.18em] sm:py-3 sm:text-xl"
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
