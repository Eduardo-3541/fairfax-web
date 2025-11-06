import Image from "next/image";
import Link from "next/link";
import FadeSection from "../../components/FadeSection";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECT_SLUGS, PROJECT_BY_SLUG, type ProjectFull } from "@/sanity/queries/projects";
import { urlFor } from "@/sanity/lib/image";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(ALL_PROJECT_SLUGS);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await client.fetch<ProjectFull | null>(PROJECT_BY_SLUG, { slug });
  if (!project) {
    return {
      title: "Project Not Found | Fairfax Interiors",
    };
  }
  return {
    title: `${project.title} | Fairfax Interiors`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await client.fetch<ProjectFull | null>(PROJECT_BY_SLUG, { slug });

  if (!project) {
    return (
      <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
        <FadeSection as="section" className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] uppercase tracking-[0.24em]">Project Unavailable</h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--brand-dark)]/80">
            The requested project does not exist yet. Explore other case studies or{" "}
            <Link className="underline underline-offset-4" href="/contact">
              get in touch
            </Link>{" "}
            to learn more about our portfolio.
          </p>
          <div className="mt-8">
            <Link
              className="inline-flex items-center justify-center rounded-full border border-[var(--brand-dark)] px-6 py-2 text-sm tracking-[0.24em] uppercase transition hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)]"
              href="/"
            >
              Return Home
            </Link>
          </div>
        </FadeSection>
      </main>
    );
  }

  return (
    <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <FadeSection
        as="section"
        className="relative flex min-h-[420px] w-full flex-col justify-end overflow-hidden bg-[var(--brand-dark)] text-[var(--brand-light)] sm:min-h-[520px] md:h-[70vh]"
        disableExitFade
      >
        {project.heroImage?.asset && (
          <Image
            src={urlFor(project.heroImage).width(2400).height(1350).fit('crop').url()}
            alt={project.heroImage.alt || project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
        )}
        <div className="relative z-10 flex h-full w-full items-end bg-gradient-to-t from-black/55 via-black/10 to-transparent px-4 pb-16 sm:px-6 md:px-12">
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/75 sm:text-sm">{project.location}</p>
            <h1 className="mt-4 text-[clamp(2.2rem,7vw,4.4rem)] uppercase tracking-[0.18em] sm:tracking-[0.22em]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base">{project.subtitle}</p>
          </div>
        </div>
      </FadeSection>

      <FadeSection as="section" className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-6 md:px-10 lg:px-0 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-lg font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]/90 sm:text-xl sm:tracking-[0.2em]">
              Project Narrative
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--brand-dark)]/85 sm:mt-5">{project.description}</p>
          </div>
          <div className="rounded-lg border border-[var(--brand-dark)]/15 bg-[var(--brand-tertiary)]/85 p-5 shadow-sm backdrop-blur sm:p-6">
            <h3 className="text-xs uppercase tracking-[0.22em] text-[var(--brand-dark)]/90 sm:text-sm sm:tracking-[0.24em]">
              Project Snapshot
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--brand-dark)]/90">
              <li>
                <span className="font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Location:</span>
                <br />
                {project.location}
              </li>
              <li>
                <span className="font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Status:</span>
                <br />
                Placeholder — update once complete.
              </li>
              <li>
                <span className="font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">Services:</span>
                <br />
                Concept development, procurement, styling (adjust per project).
              </li>
            </ul>
          </div>
        </div>
      </FadeSection>

      <FadeSection as="section" className="bg-[var(--brand-light)] px-5 py-14 sm:px-6 md:px-10 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6">
          {(project.gallery || []).map((image, index) => (
            <div
              key={`${project._id}-gallery-${index}`}
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[var(--brand-tertiary)] sm:aspect-[4/5]"
            >
              {image?.asset && (
                <Image
                  src={urlFor(image).width(1200).height(1600).fit('crop').url()}
                  alt={image.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
                  quality={85}
                />
              )}
            </div>
          ))}
        </div>
      </FadeSection>

      <FadeSection as="section" className="mx-auto w-full max-w-5xl px-5 pb-14 sm:px-6 md:px-10 md:pb-16 lg:px-0">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {(project.highlights || []).map((highlight, idx) => (
            <div key={`${project._id}-hl-${idx}`} className="rounded-lg border border-[var(--brand-dark)]/10 bg-white/70 p-6 shadow-sm">
              <h3 className="text-sm uppercase tracking-[0.24em] text-[var(--brand-dark)]">{highlight.heading}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--brand-dark)]/80">{highlight.copy}</p>
            </div>
          ))}
        </div>
      </FadeSection>

      <FadeSection as="section" className="bg-[var(--brand-tertiary)] px-5 py-14 text-[var(--brand-dark)] sm:px-6 md:px-10 md:py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-center">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.8rem)] uppercase tracking-[0.28em]">Discuss Your Project</h2>
          <p className="text-base leading-relaxed text-[var(--brand-dark)]/80">
            Ready to plan your own project? Share a brief with us and we&apos;ll guide you through bespoke design, sourcing,
            and implementation tailored to your home.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="rounded-full border border-[var(--brand-dark)] px-6 py-2 text-sm uppercase tracking-[0.24em] transition hover:bg-[var(--brand-light)] hover:text-[var(--brand-dark)] sm:w-auto"
            >
              Start A Conversation
            </Link>
            <Link
              href="/"
              className="rounded-full border border-[var(--brand-dark)] px-6 py-2 text-sm uppercase tracking-[0.24em] transition hover:bg-[var(--brand-dark)] hover:text-[var(--brand-light)] sm:w-auto"
            >
              Back To Portfolio
            </Link>
          </div>
        </div>
      </FadeSection>
    </main>
  );
}
