"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { submitEnquiry } from "@/app/actions/public";
import { enquirySchema, type EnquiryInput } from "@/lib/validation/schemas";

export function EnquiryForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setServerMessage(null);
    const result = await submitEnquiry(values);
    if (result.ok) {
      setSucceeded(true);
    } else {
      setServerMessage(result.message);
    }
  };

  if (succeeded) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8" role="status">
        <h3 className="font-display text-xl font-bold">Thank you.</h3>
        <p className="mt-2 text-base leading-relaxed text-charcoal/70">
          Your enquiry has been received. The Society will respond via the
          email you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-line bg-white p-8"
      noValidate
    >
      <h2 className="font-display text-2xl font-bold tracking-tight">
        Send a general enquiry
      </h2>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Your message goes to the Society directly — no email app needed.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            id="contact-name"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </Field>
        <Field label="Email address" error={errors.email?.message}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>
        <Field label="Subject" error={errors.subject?.message} full>
          <input
            id="contact-subject"
            className={inputClass(!!errors.subject)}
            {...register("subject")}
          />
        </Field>
        <Field label="Message" error={errors.message?.message} full>
          <textarea
            id="contact-message"
            rows={5}
            className={inputClass(!!errors.message)}
            {...register("message")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {serverMessage && (
        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 rounded-full bg-pws-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pws-teal disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

export function inputClass(hasError: boolean): string {
  return `w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-charcoal/40 focus:border-pws-green ${
    hasError ? "border-red-400" : "border-line"
  }`;
}

export function Field({
  label,
  error,
  full = false,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-sm font-semibold text-charcoal/80">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
