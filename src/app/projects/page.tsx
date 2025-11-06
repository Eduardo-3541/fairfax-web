import Image from "next/image";
import Link from "next/link";
import FadeSection from "../components/FadeSection";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS, type ProjectCard } from "@/sanity/queries/projects";
import { urlFor } from "@/sanity/lib/image";

export const metadata = {
  title: "Projects | Fairfax Interiors",
  description: "Explore our portfolio of residential interiors across the UK.",
};

export default async function ProjectsIndexPage() {
  const projects = await client.fetch<ProjectCard[]>(ALL_PROJECTS);

  return (
    <main className="bg-[var(--brand-light)] text-[var(--brand-dark)]">
      <FadeSection as="section" className="px-5 pb-8 pt-12 sm:px-6 md:px-10 lg:px-0">
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="text-[clamp(2rem,6vw,3.2rem)] uppercase tracking-[0.22em]">Projects</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--brand-dark)]/80">
            A selection of recent and ongoing work. Click any project to view the full story, gallery, and details.
          </p>
        </div>
      </FadeSection>

      <FadeSection as="section" className="px-5 pb-16 sm:px-6 md:px-10 lg:px-0">
        <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className="group relative block overflow-hidden rounded-lg border border-[var(--brand-dark)]/10 bg-white/70 shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[3/4] w-full bg-[var(--brand-tertiary)]">
                {project.heroImage?.asset && (
                  <Image
                    src={urlFor(project.heroImage).width(1200).height(1600).fit('crop').url()}
                    alt={project.heroImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
                    quality={85}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-[var(--brand-light)]">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/80">{project.location}</p>
                  <h2 className="mt-2 text-[clamp(1.1rem,2.4vw,1.6rem)] uppercase tracking-[0.18em]">{project.title}</h2>
                  <p className="mt-1 line-clamp-2 text-xs text-white/80">{project.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </FadeSection>
    </main>
  );
}
