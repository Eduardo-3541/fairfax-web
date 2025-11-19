import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Fairfax Interiors",
  description: "Learn more about Fairfax Interiors.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-[var(--brand-light)] text-[var(--brand-dark)]">
      {/* Intro */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-16 sm:py-20">
          <h1 className="text-[clamp(2rem,7vw,4rem)] tracking-[0.14em] uppercase mb-6">About</h1>
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2">
            {/* Image (left) */}
            <div className="lg:order-1">
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-md border border-[var(--brand-dark)]/20 bg-white/40">
                <Image
                  src="/images/placeholder-coming-soon.svg"
                  alt="Image coming soon"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            </div>
            {/* Copy */}
            <div className="lg:order-2">
              <div className="prose prose-lg max-w-none">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="px-4 sm:px-6 md:px-8">
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/25 to-transparent" />
      </div>

      {/* Our Philosophy */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-14 sm:py-16">
          <h2 className="text-[clamp(1.6rem,5vw,2.6rem)] tracking-[0.12em] uppercase mb-4">Our Philosophy</h2>
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2">
            {/* Copy */}
            <div className="lg:order-1">
              <div className="prose prose-lg max-w-none">
                <p>
                  Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
                </p>
                <p>
                  Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat.
                </p>
              </div>
            </div>
            {/* Image (right) */}
            <div className="lg:order-2">
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-md border border-[var(--brand-dark)]/20 bg-white/40">
                <Image
                  src="/images/placeholder-coming-soon.svg"
                  alt="Image coming soon"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="px-4 sm:px-6 md:px-8">
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/25 to-transparent" />
      </div>

      

      {/* Separator */}
      <div className="px-4 sm:px-6 md:px-8">
        <span className="block h-px w-full bg-gradient-to-r from-transparent via-[var(--brand-dark)]/25 to-transparent" />
      </div>

      {/* Craft & Process */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-14 sm:py-16">
          <h2 className="text-[clamp(1.6rem,5vw,2.6rem)] tracking-[0.12em] uppercase mb-4">Craft & Process</h2>
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2">
            {/* Image (left again to alternate) */}
            <div className="lg:order-1">
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-md border border-[var(--brand-dark)]/20 bg-white/40">
                <Image
                  src="/images/placeholder-coming-soon.svg"
                  alt="Image coming soon"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            </div>
            {/* Copy */}
            <div className="lg:order-2">
              <div className="prose prose-lg max-w-none">
                <p>
                  Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Donec sollicitudin molestie malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
                </p>
                <p>
                  Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
