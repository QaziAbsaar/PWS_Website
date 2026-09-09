import type { Metadata } from "next";
import { getPublishedEvents } from "@/lib/data/events";
import { formatDate, mediaUrl } from "@/lib/media";
import { Callout, PageHero } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Events",
  description: "Events and volunteer opportunities at PAF-IAST Welfare Society.",
};

const EVENT_TYPES = [
  {
    title: "Community drives",
    body: "Focused collection or support activities built around a verified need.",
  },
  {
    title: "Awareness sessions",
    body: "Thoughtful conversations that help students understand a social issue and the ways they can respond.",
  },
  {
    title: "Collaborative initiatives",
    body: "Projects delivered alongside campus departments, partners, or community organisations.",
  },
];

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <>
      <PageHero
        dark
        eyebrow="Events & opportunities"
        title={
          <>
            Make time for
            <br />
            <em>what matters.</em>
          </>
        }
        lede="Events are where the Society’s values move from conversation to action—through volunteer work, awareness, fundraising, and collaboration."
      />

      {/* Confirmed events from the admin portal, or the honest empty state */}
      <section className="section">
        <div className="shell">
          <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
            Confirmed activities.
          </h2>
          {events.length === 0 ? (
            <div className="grid gap-10 lg:grid-cols-2">
              <h3 className="h-display text-2xl">
                Something useful is taking shape.
              </h3>
              <p className="self-center text-lg leading-relaxed text-charcoal/70">
                New activities are shared once details, responsibilities, and
                participation arrangements are confirmed. We only publish
                confirmed activity details.
              </p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              {events.map((event) => {
                const image = mediaUrl(event.image_path);
                return (
                  <article key={event.id} className="rule-item">
                    {image && (
                      // eslint-disable-next-line @next/next/no-img-element -- Supabase storage
                      <img
                        src={image}
                        alt={event.title}
                        className="mb-6 aspect-video w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-pws-green">
                      {formatDate(event.date)}
                      {event.location ? ` · ${event.location}` : ""}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                      {event.description}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
            Different formats. One shared purpose.
          </h2>
          <div className="grid gap-10 lg:grid-cols-3">
            {EVENT_TYPES.map((type) => (
              <div key={type.title} className="rule-item lg:border-t-0 lg:pt-0">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {type.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                  {type.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Callout
        title="Have time, energy, or a useful skill?"
        body="Let the Society know what kind of volunteering interests you. We will keep your interest on record, even before a particular activity is announced."
        href="/get-involved?interest=volunteering#application"
        label="Volunteer with us"
      />
    </>
  );
}
