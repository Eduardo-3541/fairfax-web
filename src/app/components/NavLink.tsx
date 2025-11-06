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
      className={`relative inline-flex items-center justify-center px-6 font-semibold uppercase tracking-[0.18em] transition-opacity duration-200 hover:opacity-85
      before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:-translate-x-full before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 before:ease-out hover:before:w-12
      after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:translate-x-full after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-out hover:after:w-12
      ${className ?? ""}`}
      style={style}
      {...rest}
    >
      {children}
    </Link>
  );
}
