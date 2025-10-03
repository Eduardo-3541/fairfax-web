"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import Logo from "./components/icons/logo";

export default function Home() {
  const revealSectionRef = useRef<HTMLElement | null>(null);
  const gridSectionRef = useRef<HTMLDivElement | null>(null);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [gridVisible, setGridVisible] = useState(false);
  const lastScrollYRef = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollDirectionRef = useRef<"down" | "up">("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const previousY = lastScrollYRef.current;

      if (currentY > previousY + 0.5) {
        scrollDirectionRef.current = "down";
      } else if (currentY < previousY - 0.5) {
        scrollDirectionRef.current = "up";
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setSectionProgress(1);
      return;
    }

    const sectionEl = revealSectionRef.current;
    if (!sectionEl) {
      return;
    }

    const thresholds = Array.from({ length: 21 }, (_, index) => index / 20);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target !== sectionEl) {
          return;
        }

        const direction = scrollDirectionRef.current;
        if (direction === "up") {
          return;
        }

        const ratio = Math.min(1, Math.max(0, entry.intersectionRatio));
        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
        const isBelowViewport = entry.boundingClientRect.top >= viewportHeight;

        setSectionProgress((previous) => {
          if (isBelowViewport) {
            return 0;
          }

          if (!entry.isIntersecting) {
            return previous;
          }

          return Math.max(previous, ratio);
        });
      });
    }, {
      threshold: thresholds,
    });

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const gridEl = gridSectionRef.current;
    if (!gridEl) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target !== gridEl) {
          return;
        }

        if (scrollDirectionRef.current === "up") {
          return;
        }

        const { intersectionRatio, isIntersecting, boundingClientRect, rootBounds } = entry;
        const viewportHeight = rootBounds?.height ?? window.innerHeight;
        const isBelowViewport = boundingClientRect.top >= viewportHeight;

        setGridVisible((previous) => {
          if (isBelowViewport) {
            return false;
          }

          if (!isIntersecting) {
            return previous;
          }

          return intersectionRatio > 0.12 ? true : previous;
        });
      });
    }, {
      threshold: [0, 0.12, 0.25, 0.5, 0.75, 1],
    });

    observer.observe(gridEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const easedProgress = Math.pow(sectionProgress, 1.2);

  const titleRevealStyles = {
    opacity: easedProgress,
    transform: `translateY(${(1 - easedProgress) * 28}px)`,
    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease-out",
  } satisfies CSSProperties;

  const heroTitleWords = ["Designing", "timeless", "living."] as const;

  const getTitleWordStyles = (wordIndex: number): CSSProperties => {
    const delayPerWord = 0.18;
    const compensatedProgress = easedProgress - wordIndex * delayPerWord;
    const normalized = Math.min(
      1,
      Math.max(0, compensatedProgress / Math.max(0.0001, 1 - wordIndex * delayPerWord))
    );
    const easedPhase = Math.pow(normalized, 1.22);

    return {
      opacity: easedPhase,
      transform: `translateY(${(1 - easedPhase) * 48}px) rotate(${(1 - easedPhase) * -3}deg)`,
      transition:
        "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.58s ease-out",
      transitionDelay: `${wordIndex * 0.08}s`,
      display: "inline-block",
      willChange: "transform, opacity",
      color: "var(--brand-dark)",
    } satisfies CSSProperties;
  };

  const paragraphRevealStyles = {
    opacity: Math.pow(sectionProgress, 1.4),
    transform: `translateY(${(1 - easedProgress) * 60}px) translateX(${(1 - easedProgress) * 20}px)`,
    filter: `blur(${(1 - easedProgress) * 8}px)`,
    transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease-out, filter 0.6s ease-out",
    transformOrigin: "left center",
    transitionDelay: "0.12s",
  } satisfies CSSProperties;

  const accentOverlayStyles = {
    background:
      "radial-gradient(135% 135% at 50% 12%, rgba(71, 54, 33, 0.28) 0%, rgba(71, 54, 33, 0.12) 45%, rgba(71, 54, 33, 0) 100%)",
    opacity: Math.max(0, (1 - easedProgress) * 0.45),
    transform: `translateY(${(1 - easedProgress) * 120}px) scale(${0.88 + easedProgress * 0.28})`,
    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease-out",
  } satisfies CSSProperties;

  type ShowcaseItem = {
    key: string;
    text: string;
    imageSrc: string;
    imageAlt: string;
    priority?: boolean;
  };

  const gridItems: ShowcaseItem[] = [
    {
      key: "projects",
      text: "PROJECTS",
      imageSrc: "/images/projects.avif",
      imageAlt: "Curated Fairfax Interiors project montage",
      priority: true,
    },
    {
      key: "process",
      text: "PROCESS",
      imageSrc: "/images/process.avif",
      imageAlt: "Fairfax Interiors design process moodboard",
    },
  ];

  const featuredProjects: ShowcaseItem[] = [
    {
      key: "chelsea-penthouse",
      text: "PROJECT 1",
      imageSrc: "/images/projects.avif",
      imageAlt: "Luxurious living room bathed in natural light",
    },
    {
      key: "cotswolds-retreat",
      text: "PROJECT 2",
      imageSrc: "/images/process.avif",
      imageAlt: "Warm neutral-toned interior with layered textures",
    },
    {
      key: "kensington-residence",
      text: "PROJECT 3",
      imageSrc: "/images/main.avif",
      imageAlt: "Elegant open-plan interior with statement staircase",
    },
  ];


  type ShowcaseCardProps = HTMLAttributes<HTMLDivElement> & {
    item: ShowcaseItem;
    variant: "grid" | "featured";
    className?: string;
  };

  const baseCardClasses =
    "group relative flex w-full flex-col justify-between overflow-hidden bg-[var(--brand-tertiary)] transition duration-500 ease-out hover:bg-[#d9dcc6]";
  const variantCardClasses: Record<"grid" | "featured", string> = {
    grid: "min-h-[1020px] p-12",
    featured: "min-h-[420px] p-8 sm:min-h-[480px] sm:p-9 lg:min-h-[520px] lg:p-10",
  };
  const variantTitleClasses: Record<"grid" | "featured", string> = {
    grid: "text-4xl",
    featured: "text-2xl sm:text-3xl",
  };
  const variantTitleSpacing: Record<"grid" | "featured", string> = {
    grid: "mt-10",
    featured: "mt-8",
  };

  const ShowcaseCard = ({ item, variant, className = "", ...divProps }: ShowcaseCardProps) => {
    const imageSizes =
      variant === "grid"
        ? "(min-width: 768px) 45vw, 95vw"
        : "(min-width: 1280px) 28vw, (min-width: 768px) 55vw, 92vw";

    return (
      <div
        {...divProps}
        className={`${baseCardClasses} ${variantCardClasses[variant]} ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-500 ease-out group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div className="relative z-10 flex-1">
          <div className="absolute inset-[2.5%] overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes={imageSizes}
              quality={90}
              priority={variant === "grid" && Boolean(item.priority)}
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-black/10 to-transparent transition duration-500 ease-out group-hover:from-black/55 group-hover:via-black/20" />
          </div>
        </div>
        <span
          className={`relative z-10 ${variantTitleSpacing[variant]} text-center font-semibold tracking-[0.2em] text-[var(--brand-dark)] ${variantTitleClasses[variant]}`}
        >
          <span className="inline-block transition-colors duration-500 group-hover:text-[var(--brand-dark)]">
            {item.text}
          </span>
          <span className="mt-4 block h-[3px] w-full origin-center scale-x-0 transform bg-[var(--brand-dark)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </span>
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 opacity-0 transition duration-500 ease-out group-hover:opacity-100 group-hover:from-white/20 group-hover:via-white/6" />
      </div>
    );
  };

  return (
    <main className="flex flex-1 flex-col">
      <section
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{ minHeight: "calc(100dvh - var(--header-height, 0px))" }}
      >
        <Image
          src="/images/main.avif"
          alt="Fairfax Interiors main visual"
          fill
          priority
          className="object-cover object-[90%_40%]"
          sizes="100vw"
          quality={90}
        />
      </section>
      <section
        ref={revealSectionRef}
        className="relative overflow-hidden bg-[var(--brand-light)] px-6 py-24"
      >
        <div className="pointer-events-none absolute inset-0 z-0" style={accentOverlayStyles} />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center text-[var(--brand-dark)]">
          <h2
            className="text-[clamp(2.2rem,5vw,4.2rem)] tracking-[0.18em]"
            style={titleRevealStyles}
          >
            {heroTitleWords.map((word, index) => (
              <span
                key={word}
                style={getTitleWordStyles(index)}
                className={`block md:inline ${index < heroTitleWords.length - 1 ? "md:mr-4" : ""}`}
              >
                {word}
              </span>
            ))}
          </h2>
          <p
            className="text-[1.28rem] font-light leading-relaxed"
            style={paragraphRevealStyles}
          >
            Fairfax Interiors is an interior design consultancy, managing projects of all sizes, from elegant manor
            houses and barn conversions to contemporary flats and apartments. Our team has been serving clients
            throughout the UK for over 35 years and maintains long-standing relationships with prestigious suppliers
            and designers. Whatever your requirements, we draw on deep experience to deliver a pleasurable, stress-free
            journey.
          </p>
        </div>
      </section>
      <section className="bg-[var(--brand-light)] px-16 pb-24">
        <div
          ref={gridSectionRef}
          className={`grid gap-24 md:grid-cols-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${gridVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-24 opacity-0 blur-md"}`}
        >
          {gridItems.map((item) => (
            <ShowcaseCard key={`grid-${item.key}`} item={item} variant="grid" />
          ))}
        </div>
      </section>
      <section className="bg-[var(--brand-light)] px-6 pb-28 md:px-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <div className="text-center text-[var(--brand-dark)]">
            <h3 className="text-[clamp(1.8rem,4vw,3rem)] uppercase tracking-[0.28em]">
              FEATURED PROJECTS
            </h3>
          </div>
          <div className="grid gap-10 pb-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((item) => (
              <ShowcaseCard key={`featured-${item.key}`} item={item} variant="featured" />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--brand-light)] px-6 pb-20 md:px-16">
        <div className="mx-auto w-full max-w-7xl text-center text-[var(--brand-dark)]">
          <h3 className="text-[clamp(1.6rem,3.6vw,2.8rem)] uppercase tracking-[0.28em]">
            INSTAGRAM
          </h3>
          <p className="mt-4 text-base tracking-[0.18em] text-[var(--brand-dark)]/70">
            Follow <span className="font-semibold">@fairfaxinteriors</span> for the latest projects and inspiration.
          </p>
        </div>
      </section>
      <footer className="bg-[var(--brand-dark)] px-8 py-10 text-[var(--brand-light)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <span className="sr-only">Fairfax Interiors</span>
              <Logo className="h-5 w-auto text-[var(--brand-light)] [&_*]:fill-current" aria-hidden="true" />
            </div>
            <address className="not-italic text-sm leading-relaxed">
              The Chantry, Stratford Road<br/>
              Wroxton<br/>
              Oxfordshire<br/>
              OX15 6QS
            </address>
            <div className="text-sm leading-relaxed">
              <p>Email: <a className="underline underline-offset-2" href="mailto:info@fairfaxinteriors.com">info@fairfaxinteriors.com</a></p>
              <p>Telephone: <a className="underline underline-offset-2" href="tel:+4407974097364">07974 097364</a></p>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm md:text-right">
            <nav className="flex flex-col gap-2 md:items-end">
              <Link className="transition hover:opacity-80" href="/">Home</Link>
              <Link className="transition hover:opacity-80" href="/projects">About</Link>
              <Link className="transition hover:opacity-80" href="/projects">Projects</Link>
              <Link className="transition hover:opacity-80" href="/process">Process</Link>
              <Link className="transition hover:opacity-80" href="/shop">Shop</Link>
              <Link className="transition hover:opacity-80" href="/contact">Contact</Link>
            </nav>
            <div className="mt-4 flex items-center gap-4 md:self-end">
              <Link
                href="https://www.instagram.com/fairfaxinteriors"
                aria-label="Fairfax Interiors on Instagram"
                className="transition hover:opacity-70"
                target="_blank"
                rel="noreferrer"
              >
                <SiInstagram className="h-6 w-6 text-[var(--brand-light)]" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/fairfax-interiors-oxfordshire/"
                aria-label="Fairfax Interiors on LinkedIn"
                className="transition hover:opacity-70"
                target="_blank"
                rel="noreferrer"
              >
                <SiLinkedin className="h-6 w-6 text-[var(--brand-light)]" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center gap-2 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.32em] text-[var(--brand-light)]/80 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Fairfax Interiors</span>
        </div>
      </footer>
    </main>
  );
}
