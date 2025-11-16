"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";
import type { HTMLAttributes } from "react";
import { useState } from "react";
import InstagramCarousel from "./components/InstagramCarousel";
import FadeSection from "./components/FadeSection";

export default function Home() {

  type ShowcaseItem = {
    key: string;
    text: string;
    imageSrc: string;
    imageAlt: string;
    priority?: boolean;
  };

  // Showcase cards to display above Featured Projects
  const showcaseItems: ShowcaseItem[] = [
    {
      key: "interiors",
      text: "INTERIORS",
      imageSrc: "/images/projects.avif",
      imageAlt: "Curated Fairfax Interiors project montage",
      priority: true,
    },
    {
      key: "soft-furnishings",
      text: "SOFT FURNISHINGS",
      imageSrc: "/images/process.avif",
      imageAlt: "Fairfax Interiors design process moodboard",
    },
    {
      key: "upholstery",
      text: "UPHOLSTERY",
      imageSrc: "/images/main.avif",
      imageAlt: "Detail of bespoke Fairfax Interiors upholstery",
    },
  ];

  const featuredProjects: (ShowcaseItem & { location?: string })[] = [
    {
      key: "cotswolds-millhouse",
      text: "Cotswolds Millhouse",
      location: "Cotswolds, Gloucestershire",
      imageSrc: "/images/projects.avif",
      imageAlt: "",
    },
    {
      key: "old-vicarage",
      text: "Old Vicarage",
      location: "Cotswolds, Gloucestershire",
      imageSrc: "/images/process.avif",
      imageAlt: "",
    },
    {
      key: "cotswolds-cottage",
      text: "Cotswolds Cottage",
      location: "Cotswolds, Oxfordshire",
      imageSrc: "/images/main.avif",
      imageAlt: "",
    },
  ];

  type ShowcaseCardProps = HTMLAttributes<HTMLDivElement> & {
    item: ShowcaseItem;
    variant: "grid" | "featured";
    className?: string;
    imageWrapperClassName?: string;
  };

  const baseCardClasses =
    "group relative flex flex-col justify-between overflow-hidden bg-[var(--brand-dark)] transition duration-500 ease-out hover:bg-[color:color-mix(in_srgb,var(--brand-dark)_88%,white_12%)]";
  const variantCardClasses: Record<"grid" | "featured", string> = {
    // Force equal heights across variants to avoid visual mismatch
    grid: "min-h-[560px] p-10 sm:min-h-[560px] sm:p-10 lg:min-h-[560px] lg:p-12",
    featured: "min-h-[560px] p-10 sm:min-h-[560px] sm:p-10 lg:min-h-[560px] lg:p-12",
  };
  const variantTitleClasses: Record<"grid" | "featured", string> = {
    grid: "text-3xl sm:text-4xl lg:text-5xl",
    featured: "text-3xl sm:text-4xl",
  };
  const variantTitleSpacing: Record<"grid" | "featured", string> = {
    grid: "mt-7 sm:mt-9 lg:mt-12",
    featured: "mt-9",
  };
  const variantImageWrapperClasses: Record<"grid" | "featured", string> = {
    // Enforce true 2:3 (width:height) vertical aspect ratio
    grid: "relative w-full aspect-[2/3]",
    featured: "relative w-full aspect-[2/3]",
  };


  const ShowcaseCard = ({
    item,
    variant,
    className = "",
    imageWrapperClassName = "",
    ...divProps
  }: ShowcaseCardProps) => {
    const imageSizes =
      variant === "grid"
        ? "(min-width: 1024px) 45vw, (min-width: 640px) 48vw, 50vw"
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
        <div
          className={`relative z-10 ${variantImageWrapperClasses[variant]} ${imageWrapperClassName}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes={imageSizes}
              quality={90}
              priority={variant === "grid" && Boolean(item.priority)}
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-black/10 to-transparent transition duration-500 ease-out group-hover:from-black/55 group-hover:via-black/20" />
          </div>
        </div>
        <span
          className={`relative z-10 ${variantTitleSpacing[variant]} text-center ${
            variant === "featured" ? "font-normal" : "font-semibold"
          } tracking-[0.2em] text-[var(--brand-light)] ${variantTitleClasses[variant]}`}
        >
          <span className="inline-block transition-colors duration-500 group-hover:text-[var(--brand-tertiary)]">
            {item.text}
          </span>
          <span className="mt-4 block h-[3px] w-full origin-center scale-x-0 transform bg-[var(--brand-light)] transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:bg-[var(--brand-tertiary)]" />
        </span>
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 opacity-0 transition duration-500 ease-out group-hover:opacity-100 group-hover:from-white/20 group-hover:via-white/6" />
      </div>
    );
  };

  return (
    <main className="flex flex-1 flex-col">
      <FadeSection
        as="section"
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{ minHeight: "calc(100dvh - var(--header-height, 0px))" }}
        disableExitFade
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
      </FadeSection>
      <FadeSection as="section" className="relative overflow-hidden bg-[var(--brand-light)] px-4 sm:px-6 pt-20 sm:pt-24 pb-14 sm:pb-16" disableExitFade>
        <div className="pointer-events-none absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 sm:gap-8 text-center text-[var(--brand-dark)]">
          <h2 className="text-[clamp(2rem,7vw,4.2rem)] tracking-[0.18em] uppercase">
            Designing <em>timeless</em> living.
          </h2>
          <p className="text-base sm:text-[1.1rem] font-regular leading-relaxed opacity-80">
            For more than three decades, Fairfax Interiors has been creating beautiful, bespoke interiors across the UK.
            Whether transforming a grand country house or refining a modern city apartment, we combine design excellence,
            trusted craftsmanship, and a commitment to making every project an inspiring, stress-free experience.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-20">
            <Button
              href="/coming-soon"
              className="!w-[310px] !justify-center !px-0 !py-3 !text-[1.2rem] sm:!text-[1.55rem]"
            >
              LEARN MORE
            </Button>
          </div>
          <div className="mt-8 w-full">
            <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/30 to-transparent" />
          </div>
        </div>
      </FadeSection>
      
      {/* Duplicated section placed above current Featured Projects */}
      <FadeSection as="section" className="bg-[var(--brand-light)] px-4 sm:px-8 pb-20 md:px-16" disableExitFade>
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 text-[var(--brand-dark)]">
          <div className="grid gap-12 sm:gap-14 pb-8 pt-3 md:grid-cols-2 lg:grid-cols-3">
            {/* Explicit order: Interiors, Soft Furnishings, Upholstery */}
            <Link href="/under-construction" className="contents" key="interiors-dup">
              <ShowcaseCard
                item={{ key: "interiors-dup", text: "INTERIORS", imageSrc: "/images/projects.avif", imageAlt: "Curated Fairfax Interiors project montage", priority: true }}
                variant="featured"
              />
            </Link>
            <Link href="/under-construction" className="contents" key="soft-furnishings-dup">
              <ShowcaseCard
                item={{ key: "soft-furnishings-dup", text: "SOFT FURNISHINGS", imageSrc: "/images/process.avif", imageAlt: "Fairfax Interiors design process moodboard" }}
                variant="featured"
              />
            </Link>
            <Link href="/under-construction" className="contents" key="upholstery-dup">
              <ShowcaseCard
                item={{ key: "upholstery-dup", text: "UPHOLSTERY", imageSrc: "/images/main.avif", imageAlt: "Detail of bespoke Fairfax Interiors upholstery" }}
                variant="featured"
              />
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* Separator before Featured Projects section */}
      <div className="bg-[var(--brand-light)] px-4 sm:px-6 md:px-8">
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/25 to-transparent" />
      </div>

      <FadeSection as="section" className="bg-[var(--brand-light)] px-0 pb-16" disableExitFade>
        <FeaturedProjectsSplit items={featuredProjects} />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          <Button
            href="/under-construction"
            className="!w-[310px] !justify-center !px-0 !py-3 !text-[1.2rem] sm:!text-[1.55rem] !text-[var(--brand-dark)] hover:!text-[var(--brand-light)] hover:!bg-[var(--brand-dark)]"
          >
            VIEW PROJECTS
          </Button>
        </div>
      </FadeSection>

      {/* Separator before Contact CTA */}
      <div className="bg-[var(--brand-light)] px-6 md:px-16 -mt-2 sm:-mt-3 pt-2 sm:pt-3">
        <div className="mx-auto w-full max-w-5xl">
          <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/25 to-transparent" />
        </div>
        <div className="h-6 sm:h-8" />
      </div>

      {/* Contact CTA section */}
      <FadeSection as="section" className="bg-[var(--brand-light)] px-6 pb-24 md:px-16" disableExitFade>
        <div className="mx-auto w-full max-w-5xl text-center text-[var(--brand-dark)]">
          <div className="h-8 sm:h-10" />
          <h3 className="text-[clamp(1.4rem,3.2vw,2.4rem)] uppercase tracking-[0.28em]">
            READY TO START YOUR PROJECT?
          </h3>
          <p className="mt-4 text-base sm:text-lg opacity-80">
            Get in touch to discuss your ideas and begin the process.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-20">
            <Button href="/contact" className="!w-[310px] !justify-center !px-0 !py-3 !text-[1.2rem] sm:!text-[1.55rem]">
              CONTACT US
            </Button>
            <Button href="/under-construction" className="!w-[310px] !justify-center !px-0 !py-3 !text-[1.2rem] sm:!text-[1.55rem]">
              OUR SERVICES
            </Button>
          </div>
        </div>
      </FadeSection>
      <FadeSection as="section" className="bg-[var(--brand-light)] px-6 pb-20 md:px-16" disableExitFade>
        <div className="mx-auto w-full max-w-7xl">
          <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/25 to-transparent" />
        </div>
        <div className="h-6 sm:h-8" />
        <div className="mx-auto w-full max-w-7xl text-center text-[var(--brand-dark)]">
          <h3 className="text-[clamp(1.6rem,3.6vw,2.8rem)] uppercase tracking-[0.28em]">INSTAGRAM</h3>
          <p className="mt-4 text-base tracking-[0.18em] text-[var(--brand-dark)]/80">
            Follow <Link href="https://www.instagram.com/fairfaxinteriors" className="font-semibold">@fairfaxinteriors</Link> for the latest projects and inspiration.
          </p>
        </div>
        <div className="mx-auto mt-8 w-full max-w-7xl">
          <InstagramCarousel />
        </div>
      </FadeSection>
    </main>
  );
}

type FeaturedProjectsSplitProps = {
  items: Array<{
    key: string;
    text: string;
    imageSrc: string;
    imageAlt: string;
  }>;
};

function FeaturedProjectsSplit({ items }: FeaturedProjectsSplitProps) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const active = items[hoveredIndex] ?? items[0];

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8 text-center text-[var(--brand-dark)]">
          <h3 className="text-[clamp(1.6rem,3.6vw,2.8rem)] uppercase tracking-[0.28em]">FEATURED PROJECTS</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Active image */}
          <div className="relative h-[420px] sm:h-[520px] md:h-[640px] bg-[var(--brand-dark)]">
            {active && (
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={90}
                className="object-cover"
                priority
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <span className="text-white/95 tracking-[0.22em] text-xl sm:text-2xl uppercase">
                {active?.text}
              </span>
            </div>
          </div>

          {/* Right: List of projects */}
          <div className="bg-[var(--brand-dark)] text-[var(--brand-light)] px-6 sm:px-12 py-10 sm:py-14 flex items-center relative overflow-hidden">
            {/* subtle texture/light to add depth */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(1200px_500px_at_-10%_-10%,#fff,transparent_60%),radial-gradient(900px_400px_at_110%_110%,#fff,transparent_60%)]" />
            <h3 className="sr-only">Featured Projects</h3>
            <ul className="w-full relative z-10">
              {items.map((item, index) => (
                <li key={item.key} className="relative">
                  {/* separator background */}
                  {index > 0 && (
                    <span className="pointer-events-none absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-light)]/55 to-transparent" />
                  )}
                  <Link
                    href="/under-construction"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onFocus={() => setHoveredIndex(index)}
                    className={`group relative flex w-full items-center justify-center gap-8 py-9 sm:py-12 text-center transition-colors ${
                      hoveredIndex === index ? "text-[var(--brand-light)]" : "text-[var(--brand-light)]/80"
                    }`}
                    aria-current={hoveredIndex === index}
                  >
                    {/* Overlay temporarily removed per request */}
                    {(() => {
                      const len = (item.text ?? "").length;
                      const extra = Math.max(0, len - 14);
                      const baseSize = 1.35; // rem at <14
                      const smSize = 1.8;
                      const mdSize = 2.0;
                      const stepBase = 0.03; // rem reduction per char over 14
                      const stepSm = 0.035;
                      const stepMd = 0.04;
                      const minBase = 1.0;
                      const minSm = 1.4;
                      const minMd = 1.6;
                      const fsBase = Math.max(minBase, baseSize - extra * stepBase);
                      const fsSm = Math.max(minSm, smSize - extra * stepSm);
                      const fsMd = Math.max(minMd, mdSize - extra * stepMd);
                      return (
                          <span
                            className="uppercase font-normal text-center max-w-[85%] sm:max-w-none whitespace-normal sm:whitespace-nowrap tracking-[0.18em] sm:tracking-[0.20em]"
                            style={{ fontSize: `${fsBase}rem` }}
                          >
                          <span className="sm:hidden">{item.text}</span>
                          <span className="hidden sm:inline md:hidden" style={{ fontSize: `${fsSm}rem` }}>
                            {item.text}
                          </span>
                          <span className="hidden md:inline" style={{ fontSize: `${fsMd}rem` }}>
                            {item.text}
                          </span>
                        </span>
                      );
                    })()}
                    <span className="relative flex items-center gap-3 sm:gap-4">
                      <span className={`h-[3px] w-16 sm:w-20 md:w-24 origin-right transform transition-all duration-300 ${
                        hoveredIndex === index ? "bg-[var(--brand-tertiary)] scale-x-100" : "bg-[var(--brand-light)]/50 scale-x-75"
                      }`} />
                    </span>
                  </Link>
                  {/* bottom separator for last element to frame list */}
                  {index === items.length - 1 && (
                    <span className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-[var(--brand-light)]/45 to-transparent" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
