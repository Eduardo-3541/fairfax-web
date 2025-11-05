"use client";

import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
    rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseClasses =
  "inline-flex items-center rounded-full border border-current px-5 py-2 text-base sm:text-lg font-semibold uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)]";

export default function Button(props: ButtonProps) {
  const { className, children, ...rest } = props as ButtonProps & { className?: string };
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLinkProps, "children" | "className"> & { href: string };
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButtonProps, "children" | "className">;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
    </button>
  );
}


