import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact PAF-IAST Welfare Society.",
};

const DETAILS = [
  {
    label: "General email",
    body: (
      <>
        <a href="mailto:info@paf-iast.edu.pk" className="text-pws-green underline decoration-1 underline-offset-4">
          info@paf-iast.edu.pk
        </a>
        <br />
        Include “Welfare Society” in the subject line.
      </>
    ),
  },
  {
    label: "Phone",
    body: (
      <>
        <a href="tel:+92995111723278" className="text-pws-green underline decoration-1 underline-offset-4">
          0995 111 723 278
        </a>
        <br />
        PAF-IAST main contact
      </>
    ),
  },
  {
    label: "Campus",
    body: (
      <>
        Pak-Austria Fachhochschule: Institute of Applied Sciences and
        Technology
        <br />
        Khanpur Road, Mang, Haripur, Khyber Pakhtunkhwa
      </>
    ),
  },
  {
    label: "Official page",
    body: (
      <a
        href="https://paf-iast.edu.pk/welfaresociety/"
        target="_blank"
        rel="noopener"
        className="text-pws-green underline decoration-1 underline-offset-4"
      >
        Visit the Welfare Society page
      </a>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s start with
            <br />
            <em>a conversation.</em>
          </>
        }
        lede="For general questions, suggestions, or information that does not fit the membership, volunteer, or partnership route, write to us here."
      />

      <section className="section section-alt">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <div>
            {DETAILS.map((detail) => (
              <div key={detail.label} className="rule-item py-7 last:border-b">
                <p className="mb-2 text-sm font-semibold text-pws-sage">
                  {detail.label}
                </p>
                <p className="text-base leading-relaxed text-charcoal/80">
                  {detail.body}
                </p>
              </div>
            ))}
          </div>
          <Suspense>
            <EnquiryForm />
          </Suspense>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h-display mb-5 text-3xl sm:text-4xl">
              Looking to join, volunteer, or partner?
            </h2>
            <p className="mb-9 text-lg leading-relaxed text-charcoal/70">
              Use the dedicated Get Involved form instead. It starts you with
              the correct interest selected and gives the Society the context
              it needs to respond well.
            </p>
            <a
              href="/get-involved#pathways"
              className="inline-flex items-center rounded-full bg-pws-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pws-teal"
            >
              Go to Get Involved
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
