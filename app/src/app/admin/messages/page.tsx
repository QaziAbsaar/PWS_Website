import type { Metadata } from "next";
import { getSubmissions } from "@/lib/data/team";
import { SubmissionCard } from "@/components/admin/submission-card";

export const metadata: Metadata = {
  title: "Submissions",
  robots: { index: false, follow: false },
};

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Submissions
      </h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Enquiries and applications from the public site, newest first.
      </p>

      {submissions.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-sm text-charcoal/60">
          No submissions yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </ul>
      )}
    </div>
  );
}
