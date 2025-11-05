"use client";

import { useEffect } from "react";
import Button from "./components/Button";

export default function NotFoundPage() {
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <main
      className="min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--brand-light)", color: "var(--brand-dark)" }}
    >
      <section className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-28 text-center">
        <div className="mb-6 text-6xl">🧭</div>
        <h1 className="mb-4 text-3xl sm:text-4xl font-semibold tracking-wide uppercase">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg opacity-80">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-8">
          <Button href="/">RETURN HOME</Button>
        </div>
      </section>
    </main>
  );
}
