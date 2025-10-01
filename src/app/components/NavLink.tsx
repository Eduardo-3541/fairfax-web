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
      className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full ${className ?? ''}`}
      style={style}
      {...rest}
    >
      {children}
    </Link>
  );
}

