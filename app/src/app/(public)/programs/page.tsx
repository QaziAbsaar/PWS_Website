import type { Metadata } from "next";
import Link from "next/link";
import { Callout, PageHero } from "@/components/public/sections";
import { PROGRAMS } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "The focus areas of PAF-IAST Welfare Society: volunteering, awareness, giving, student support, partnerships, and leadership.",
};

const PRINCIPLES = [
  "Keep volunteers focused on a clear, useful task.",
  "Choose collaborations that respect people’s dignity and agency.",
  "Share information carefully and protect privacy.",
  "Learn from each activity before planning the next one.",
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Where concern becomes
            <br />
            <em>constructive action.</em>
          </>
        }
        lede="Our work is organised around the practical ways students can support people, learn from social issues, and build a more responsive community."
      />

      <section className="section">
        <div className="shell">
          <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
            A broad purpose. Thoughtful ways to contribute.
          </h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="rule-item group no-underline"
              >
                <h2 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-pws-green">
                  {program.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                  {program.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display mb-6 text-3xl sm:text-4xl">
              Work with care,
              <br />
              <em>not assumptions.</em>
            </h2>
            <p className="text-lg leading-relaxed text-charcoal/70">
              The Society’s role is to listen, coordinate, and contribute
              responsibly. We aim to work alongside people and
              organisations—not speak for them.
            </p>
          </div>
          <ul className="flex flex-col justify-center">
            {PRINCIPLES.map((item) => (
              <li key={item} className="rule-item py-5 last:border-b">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Callout
        title="Have an idea worth exploring?"
        body="Tell us about a welfare initiative, collaboration, or student need that could benefit from a thoughtful conversation."
        href="/get-involved?interest=partnership#application"
        label="Start a conversation"
      />
    </>
  );
}
