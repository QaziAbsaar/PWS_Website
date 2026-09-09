import type { Metadata } from "next";
import { Callout, PageHero } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "The focus areas of PAF-IAST Welfare Society: volunteering, awareness, giving, student support, partnerships, and leadership.",
};

const WORK = [
  {
    title: "Volunteer & outreach",
    body: "Bring student volunteers into initiatives that serve people and communities with dignity, consistency, and care.",
  },
  {
    title: "Awareness & advocacy",
    body: "Use campaigns, conversations, and collaborations to make important social issues easier to understand and act on.",
  },
  {
    title: "Giving initiatives",
    body: "Support charitable events, donation drives, and fundraising activities around credible, relevant causes.",
  },
  {
    title: "Student support",
    body: "Help students find information and appropriate routes to academic, financial, and wellbeing support within the institute.",
  },
  {
    title: "Community partners",
    body: "Connect with organisations and university departments whose experience can make welfare efforts more useful and sustainable.",
  },
  {
    title: "Student leadership",
    body: "Create meaningful chances for students to organise, lead, make decisions, and learn through responsible service.",
  },
];

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
            {WORK.map((item) => (
              <div key={item.title} className="rule-item">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                  {item.body}
                </p>
              </div>
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
