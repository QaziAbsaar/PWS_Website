import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedEvents } from "@/lib/data/events";
import { formatDate, mediaUrl } from "@/lib/media";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = (await getPublishedEvents()).find((item) => item.id === id);
  if (!event) return { title: "Event" };
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const event = (await getPublishedEvents()).find((item) => item.id === id);
  if (!event) notFound();

  const image = mediaUrl(event.image_path);

  return (
    <>
      <section className="bg-off-white">
        <div className="shell py-24 sm:py-32">
          <p className="eyebrow">Event</p>
          <h1 className="h-display mb-7 max-w-3xl text-4xl sm:text-5xl">
            {event.title}
          </h1>
          <p className="text-sm font-medium text-pws-green">
            {formatDate(event.date)}
            {event.location ? ` · ${event.location}` : ""}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell max-w-3xl">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element -- Supabase storage
            <img
              src={image}
              alt={event.title}
              className="mb-10 aspect-video w-full rounded-lg object-cover"
            />
          )}
          <p className="text-xl leading-relaxed text-charcoal/80">
            {event.description}
          </p>

          <p className="mt-14 border-t border-line pt-8 text-base text-charcoal/70">
            Want to take part?{" "}
            <Link
              href="/get-involved?interest=volunteering#application"
              className="font-semibold text-pws-green underline underline-offset-2 hover:text-pws-teal"
            >
              Tell the Society you are interested
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
