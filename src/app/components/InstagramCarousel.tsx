"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type InstagramSlide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

const fallbackSlides: InstagramSlide[] = [
  {
    id: "ig-1",
    imageSrc: "/images/projects.avif",
    imageAlt: "Project montage",
    href: "https://www.instagram.com/fairfaxinteriors",
  },
  {
    id: "ig-2",
    imageSrc: "/images/process.avif",
    imageAlt: "Design process",
    href: "https://www.instagram.com/fairfaxinteriors",
  },
  {
    id: "ig-3",
    imageSrc: "/images/main.avif",
    imageAlt: "Statement interior",
    href: "https://www.instagram.com/fairfaxinteriors",
  },
  {
    id: "ig-4",
    imageSrc: "/images/projects.avif",
    imageAlt: "Project detail",
    href: "https://www.instagram.com/fairfaxinteriors",
  },
  {
    id: "ig-5",
    imageSrc: "/images/process.avif",
    imageAlt: "Material palette",
    href: "https://www.instagram.com/fairfaxinteriors",
  },
  {
    id: "ig-6",
    imageSrc: "/images/main.avif",
    imageAlt: "Layered textures",
    href: "https://www.instagram.com/fairfaxinteriors",
  },
];

export default function InstagramCarousel({ options }: { options?: EmblaOptionsType }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
    ...options,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [slides, setSlides] = useState<InstagramSlide[]>(fallbackSlides);
  const [loading, setLoading] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/instagram", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load Instagram feed");
        const json = (await res.json()) as { items?: InstagramSlide[] };
        if (!cancelled && json?.items && json.items.length) {
          setSlides(json.items);
        }
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-0 flex-[0_0_72%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_24%]">
              <Link href={slide.href} target="_blank" rel="noreferrer" aria-label="View on Instagram">
                <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--brand-tertiary)]">
                  <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.05]"
                    loading={loading ? "eager" : "lazy"}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="rounded-full border border-[var(--brand-dark)]/25 px-4 py-2 text-sm tracking-[0.18em] text-[var(--brand-dark)] transition-colors duration-200 enabled:hover:bg-[var(--brand-dark)] enabled:hover:text-[var(--brand-light)] disabled:opacity-40"
        >
          Prev
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={scrollNext}
          disabled={!canScrollNext} 
          className="rounded-full border border-[var(--brand-dark)]/25 px-4 py-2 text-sm tracking-[0.18em] text-[var(--brand-dark)] transition-colors duration-200 enabled:hover:bg-[var(--brand-dark)] enabled:hover:text-[var(--brand-light)] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

