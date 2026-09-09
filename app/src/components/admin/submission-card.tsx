"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setSubmissionHandled } from "@/app/actions/admin";
import type { SubmissionRow } from "@/types/database.types";
import { formatDate } from "@/lib/media";

const FIELD_ORDER = [
  "interest",
  "name",
  "email",
  "phone",
  "connection",
  "subject",
  "message",
];

const FIELD_LABELS: Record<string, string> = {
  interest: "Interest",
  name: "Name",
  email: "Email",
  phone: "Phone",
  connection: "Connection",
  subject: "Subject",
  message: "Message",
};

export function SubmissionCard({ submission }: { submission: SubmissionRow }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleHandled = async () => {
    setPending(true);
    await setSubmissionHandled(submission.id, !submission.handled);
    setPending(false);
    router.refresh();
  };

  return (
    <li className="rounded-2xl border border-line bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4 text-left"
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
        {submission.handled ? (
          <span className="rounded-full bg-pws-sage/15 px-3 py-1 text-[10px] font-bold text-pws-green uppercase">
            Handled
          </span>
        ) : (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 uppercase">
            New
          </span>
        )}
      </button>

      {open && (
        <div className="border-t border-line px-6 py-5">
          <dl className="space-y-3">
            {FIELD_ORDER.filter((key) => submission.payload[key] != null).map(
              (key) => (
                <div key={key} className="grid gap-1 sm:grid-cols-[140px_1fr]">
                  <dt className="text-xs font-bold tracking-wide text-charcoal/50 uppercase">
                    {FIELD_LABELS[key]}
                  </dt>
                  <dd className="text-sm whitespace-pre-wrap text-charcoal/80">
                    {String(submission.payload[key])}
                  </dd>
                </div>
              ),
            )}
          </dl>

          <button
            type="button"
            onClick={toggleHandled}
            disabled={pending}
            className={`mt-6 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors disabled:opacity-60 ${
              submission.handled
                ? "border border-line text-charcoal hover:border-pws-sage"
                : "bg-pws-green text-white hover:bg-pws-teal"
            }`}
          >
            {pending
              ? "Saving…"
              : submission.handled
                ? "Mark as new"
                : "Mark handled"}
          </button>
        </div>
      )}
    </li>
  );
}
