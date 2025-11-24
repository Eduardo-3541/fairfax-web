"use client";

import Link, { LinkProps } from "next/link";
import type { CSSProperties, PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  compact?: boolean; // use tighter padding/weight for dense header layouts
}> & LinkProps;

export default function NavLink({ href, children, className, style, compact = false, ...rest }: NavLinkProps) {
  const basePadding = compact ? "px-0" : "px-6";
  const baseWeight = compact ? "font-normal" : "font-semibold";
  const baseTracking = compact ? "tracking-[0.12em]" : "tracking-[0.18em]";
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center ${basePadding} ${baseWeight} uppercase ${baseTracking} transition-opacity duration-200 hover:opacity-85 ${
        className ?? ""
      }`}
      style={style}
      {...rest}
    >
      <span className="relative inline-block">
        {children}
        <span
          className="pointer-events-none absolute left-0 right-0 bottom-0 mx-auto h-[2px] w-full scale-x-0 origin-center bg-current transition-transform ease-out group-hover:scale-x-100"
          style={{ transitionDuration: "345ms" }}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
