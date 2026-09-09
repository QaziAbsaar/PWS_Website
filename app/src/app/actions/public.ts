"use server";

import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { applicationSchema, enquirySchema } from "@/lib/validations/schemas";
import type { ActionResult } from "@/types/database.types";

function zodToFieldErrors(error: { issues: { path: (string | number)[]; message: string }[] }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

/** Derive a limiter key: email when provided, else the parsed input itself. */
function limiterKey(parsed: { email: string }): string {
  return `form:${parsed.email.toLowerCase()}`;
}

export async function submitEnquiry(
  input: unknown,
): Promise<ActionResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: zodToFieldErrors(parsed.error),
    };
  }

  // Honeypot tripped: pretend success, store nothing.
  if (parsed.data.company) return { ok: true };

  const { allowed, retryAfterSeconds } = rateLimit(limiterKey(parsed.data));
  if (!allowed) {
    return {
      ok: false,
      message: `Too many messages sent. Please wait ${retryAfterSeconds} seconds and try again.`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("submissions").insert({
    kind: "enquiry",
    payload: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
  });

  if (error) {
    console.error("submitEnquiry:", error.message);
    return {
      ok: false,
      message: "Something went wrong on our side. Please try again shortly.",
    };
  }
  return { ok: true };
}

export async function submitApplication(
  input: unknown,
): Promise<ActionResult> {
  const parsed = applicationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: zodToFieldErrors(parsed.error),
    };
  }

  if (parsed.data.company) return { ok: true };

  const { allowed, retryAfterSeconds } = rateLimit(limiterKey(parsed.data));
  if (!allowed) {
    return {
      ok: false,
      message: `Too many applications sent. Please wait ${retryAfterSeconds} seconds and try again.`,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("submissions").insert({
    kind: "application",
    payload: {
      interest: parsed.data.interest,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || "",
      connection: parsed.data.connection,
      message: parsed.data.message,
    },
  });

  if (error) {
    console.error("submitApplication:", error.message);
    return {
      ok: false,
      message: "Something went wrong on our side. Please try again shortly.",
    };
  }
  return { ok: true };
}
