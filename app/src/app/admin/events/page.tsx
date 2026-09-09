import type { Metadata } from "next";
import { getAllEvents } from "@/lib/data/events";
import { formatDate } from "@/lib/media";
import { NewEventForm, EventEditor } from "@/components/admin/event-editor";

export const metadata: Metadata = {
  title: "Events",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Events</h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Create and manage Society events. Published events appear on the public
        Events page.
      </p>

      <NewEventForm />

      {events.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-sm text-charcoal/60">
          No events yet. Create the first one above.
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <details key={event.id} className="rounded-2xl border border-line bg-white">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4">
                <strong className="text-sm">{event.title}</strong>
                <span className="text-xs text-charcoal/50">
                  {formatDate(event.date) || "No date"}
                  {event.location ? ` · ${event.location}` : ""}
                </span>
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                    event.status === "published"
                      ? "bg-pws-sage/15 text-pws-green"
                      : "bg-charcoal/5 text-charcoal/60"
                  }`}
                >
                  {event.status}
                </span>
              </summary>
              <div className="border-t border-line p-6">
                <EventEditor
                  id={event.id}
                  values={{
                    title: event.title,
                    date: event.date ?? "",
                    location: event.location ?? "",
                    image_path: event.image_path ?? "",
                    status: event.status,
                    description: event.description,
                  }}
                />
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
