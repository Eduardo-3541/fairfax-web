"use client";

import Link, { LinkProps } from "next/link";
import type { CSSProperties, PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
}> & LinkProps;

export default function NavLink({ href, children, className, style, ...rest }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center px-6 font-semibold uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-85 ${
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
