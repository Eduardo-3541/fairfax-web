import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Fairfax Interiors",
  description: "Learn more about Fairfax Interiors.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-[var(--brand-light)] text-[var(--brand-dark)]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 py-16 sm:py-20">
          <h1 className="text-[clamp(2rem,7vw,4rem)] tracking-[0.14em] uppercase mb-6">About</h1>
                  <p>Fairfax Interiors is a Cotswolds-based interior design and soft-furnishings studio.</p>
                  <br></br>
                  <p>We are a small, friendly approachable team who keep our client;s needs at the heart of everything we do. We aim to prioritise our clients tastes and needs, whilst also providing invaluable ideas and interior solutions, that remain sympathetic to the building’s architecture. From historic homes to modern properties, we handle everything from new soft-furnishings, simple room refreshes to full refurbishments.</p>
                  <br></br>
                  <p>Fairfax Interiors previously served local clients for over 35 years as a soft-furnishings studio based in Brailles. In 2022, Fairfax Interiors went under new management, with Zoë Turquet, who has introduced a broader, design-led approach, whilst still offering a traditional soft-furnishings service. Led by Zoë, our work blends colour, fabrics, upholstery, furniture, antiques and art, to create timeless interiors with a lived-in, collected feel.</p>
              </div>
    </main>
  );
}
