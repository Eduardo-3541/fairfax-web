"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import InlineNavHeader from "./headers/InlineNavHeader";
import OverlayMenuHeader from "./headers/OverlayMenuHeader";
import SplitNavHeader from "./headers/SplitNavHeader";
import type { HeaderSharedProps, NavItem } from "./headerTypes";

type HeaderVariantsMap = {
  inline: ComponentType<HeaderSharedProps>;
  overlay: ComponentType<HeaderSharedProps>;
  split: ComponentType<HeaderSharedProps>;
};

const HEADER_VARIANTS: HeaderVariantsMap = {
  inline: InlineNavHeader,
  overlay: OverlayMenuHeader,
  split: SplitNavHeader,
};

type HeaderVariantKey = keyof HeaderVariantsMap;

const ACTIVE_HEADER_VARIANT = (process.env.NEXT_PUBLIC_HEADER_VARIANT as HeaderVariantKey | undefined) ?? "overlay";

const HeaderComponent = HEADER_VARIANTS[ACTIVE_HEADER_VARIANT] ?? HEADER_VARIANTS.inline;

const NAV_ITEMS: NavItem[] = [
  { href: "about", label: "ABOUT" },
  { href: "coming-soon", label: "PROJECTS" },
  { href: "coming-soon", label: "UPHOLSTERY" },
  { href: "coming-soon", label: "SOFT FURNISHINGS" },
  { href: "coming-soon", label: "SERVICES" },
];

export default function Header() {  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialHeaderHeightRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) {
      return;
    }

    const updateHeight = () => {
      const height = element.offsetHeight;
      setHeaderHeight(height);
      if (initialHeaderHeightRef.current === null || height > initialHeaderHeightRef.current) {
        initialHeaderHeightRef.current = height;
      }
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => updateHeight());
      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
        document.documentElement.style.removeProperty("--header-height");
      };
    }

    return () => {
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const handleScroll = () => {
      const currentY = window.scrollY;
      const baseDistance = initialHeaderHeightRef.current ?? headerHeight ?? 160;
      const distance = baseDistance > 0 ? baseDistance : 160;
      const progress = clamp(currentY / distance, 0, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  const sharedNavProps = useMemo<Omit<HeaderSharedProps, "isScrolled" | "scrollProgress">>(() => {
    const contactItem = NAV_ITEMS.find((item) => item.href === "coming-soon");
    const primaryNavItems = contactItem
      ? NAV_ITEMS.filter((item) => item.href !== contactItem.href)
      : NAV_ITEMS;
    const midpoint = Math.ceil(primaryNavItems.length / 2);

    return {
      navItems: NAV_ITEMS,
      primaryNavItems,
      leftNavItems: primaryNavItems.slice(0, midpoint),
      rightNavItems: primaryNavItems.slice(midpoint),
      contactItem,
    };
  }, []);

  const isScrolled = scrollProgress > 0.01;
  const blurAmount = 6 * scrollProgress;
  const shadowOpacity = 0.65 * scrollProgress;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-x-0 top-0 z-50 w-full transition-[box-shadow,backdrop-filter] duration-300 ease-out"
      style={{
        backdropFilter: blurAmount <= 0 ? "none" : `blur(${blurAmount}px)`,
        boxShadow:
          shadowOpacity <= 0
            ? "none"
            : `0 10px 40px -20px rgba(0, 0, 0, ${shadowOpacity.toFixed(3)})`,
        backgroundColor: "var(--brand-light)",
      }}
    >
      <HeaderComponent
        {...sharedNavProps}
        isScrolled={isScrolled}
        scrollProgress={scrollProgress}
      />
    </div>
  );
}
