import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/forms/application-form";
import { PageHero } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Join, volunteer with, or partner with the PAF-IAST Welfare Society.",
};

const PATHWAYS = [
  {
    title: "Become a member",
    body: "Join the Society’s student community, take part in its activities, and help shape the work over the year.",
    href: "?interest=membership#application",
    action: "Start membership",
  },
  {
    title: "Volunteer",
    body: "Offer time, skills, or support for a specific activity, campaign, drive, or ongoing initiative.",
    href: "?interest=volunteering#application",
    action: "Volunteer with us",
  },
  {
    title: "Partner with us",
    body: "Explore an idea, an institutional collaboration, a sponsorship, or a community connection with the Society.",
    href: "?interest=partnership#application",
    action: "Discuss a partnership",
  },
];

const FAQ = [
  {
    question: "Do I need to be a member to volunteer?",
    answer:
      "Not necessarily. Use the volunteer route to register your interest in a particular activity or the kinds of work you would like to support.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "Your application goes to the Society’s team, who will reply with next steps or request more information.",
  },
  {
    question: "Can an organisation propose a collaboration?",
    answer:
      "Yes. Select “Partnership / sponsorship” and briefly describe the idea, organisation, and the kind of collaboration you have in mind.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        dark
        eyebrow="Get involved"
        title={
          <>
            Care needs people
            <br />
            who are ready to <em>act.</em>
          </>
        }
        lede="Choose the way you would like to contribute. Every route below leads to the same clear starting point, with your interest already selected."
      />

      <section className="section section-alt" id="pathways">
        <div className="shell">
          <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
            Three ways to make a difference.
          </h2>
          <div className="grid gap-10 lg:grid-cols-3">
            {PATHWAYS.map((pathway) => (
              <div key={pathway.title} className="rule-item lg:border-t-0 lg:pt-0">
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {pathway.title}
                </h2>
                <p className="mb-6 mt-4 text-base leading-relaxed text-charcoal/70">
                  {pathway.body}
                </p>
                <a
                  href={pathway.href}
                  className="inline-flex items-center rounded-full bg-pws-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pws-teal"
                >
                  {pathway.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="application">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="h-display mb-6 text-3xl sm:text-4xl">
              Tell us how you would like to help.
            </h2>
            <p className="text-lg leading-relaxed text-charcoal/70">
              Your chosen path is selected in the form. Complete the details
              and the Society will receive your application directly.
            </p>
            <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-charcoal/50">
              Your details are stored securely and used only to respond to
              your application.
            </p>
          </div>
          <Suspense>
            <ApplicationForm />
          </Suspense>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display mb-6 text-3xl sm:text-4xl">
              Questions before you begin?
            </h2>
            <p className="text-lg leading-relaxed text-charcoal/70">
              These answers make the route clearer. For anything else, send a
              general enquiry.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block font-semibold text-pws-green underline decoration-1 underline-offset-4 hover:text-pws-teal"
            >
              Contact the Society
            </a>
          </div>
          <div className="flex flex-col justify-center">
            {FAQ.map((item) => (
              <details key={item.question} className="group border-t border-line py-6 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-pws-green transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
