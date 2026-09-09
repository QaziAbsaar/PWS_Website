import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROGRAMS } from "@/lib/data/programs";
import { Callout } from "@/components/public/sections";

type Params = { slug: string };

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((item) => item.slug === slug);
  if (!program) return { title: "Our work" };
  return { title: program.title, description: program.summary };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const program = PROGRAMS.find((item) => item.slug === slug);
  if (!program) notFound();

  return (
    <>
      <section className="bg-off-white">
        <div className="shell py-24 sm:py-32">
          <p className="eyebrow">Our work</p>
          <h1 className="h-display mb-7 max-w-3xl text-4xl sm:text-5xl">
            {program.title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-charcoal/70">
            {program.summary}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-charcoal/80">
            {program.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <aside>
            <h2 className="mb-6 font-display text-lg font-bold tracking-tight">
              What this looks like in practice
            </h2>
            <ul>
              {program.points.map((point) => (
                <li
                  key={point}
                  className="border-t border-line py-5 text-base leading-relaxed text-charcoal/70 last:border-b"
                >
                  {point}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <Callout
        title="Want to help with this?"
        body="Tell the Society which focus area interests you and how you would like to contribute."
        href="/get-involved?interest=volunteering#application"
        label="Get involved"
      />
    </>
  );
}
