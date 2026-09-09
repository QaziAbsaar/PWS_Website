import type { Metadata } from "next";
import Link from "next/link";
import { getAllEvents } from "@/lib/data/events";
import { getAllNews } from "@/lib/data/news";
import { getAllGallery } from "@/lib/data/gallery";
import { getTeam, getSubmissions } from "@/lib/data/team";
import { formatDate } from "@/lib/media";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [events, news, gallery, team, submissions] = await Promise.all([
    getAllEvents(),
    getAllNews(),
    getAllGallery(),
    getTeam(),
    getSubmissions(),
  ]);

  const unhandled = submissions.filter((submission) => !submission.handled);

  const stats = [
    { label: "New submissions", value: unhandled.length, href: "/admin/submissions" },
    { label: "Events", value: events.length, href: "/admin/events" },
    { label: "News posts", value: news.length, href: "/admin/news" },
    { label: "Gallery images", value: gallery.length, href: "/admin/gallery" },
    { label: "Team members", value: team.length, href: "/admin/team" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Content and submissions at a glance.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-line bg-white p-6 no-underline transition-colors hover:border-pws-sage"
          >
            <p className="font-display text-4xl font-bold text-pws-green">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-charcoal/60 uppercase">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Recent submissions
          </h2>
          <Link
            href="/admin/submissions"
            className="text-sm font-semibold text-pws-green hover:text-pws-teal"
          >
            View all →
          </Link>
        </div>
        {submissions.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-6 text-sm text-charcoal/60">
            No submissions yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.slice(0, 5).map((submission) => (
              <li
                key={submission.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border border-line bg-white px-6 py-4"
              >
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                    submission.kind === "application"
                      ? "bg-pws-green/10 text-pws-green"
                      : "bg-pws-teal/10 text-pws-teal"
                  }`}
                >
                  {submission.kind}
                </span>
                <strong className="text-sm">
                  {String(submission.payload.name ?? "Unknown")}
                </strong>
                <span className="text-xs text-charcoal/50">
                  {String(submission.payload.email ?? "")}
                </span>
                <span className="ml-auto text-xs text-charcoal/50">
                  {formatDate(submission.created_at)}
                </span>
                {!submission.handled && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 uppercase">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
