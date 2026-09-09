"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitApplication } from "@/app/actions/public";
import {
  applicationSchema,
  type ApplicationInput,
} from "@/lib/validations/schemas";
import { Field, inputClass } from "./enquiry-form";

const CONNECTIONS = [
  "Current student",
  "Faculty or staff member",
  "Alumni",
  "External organisation / partner",
  "Community member",
] as const;

export function ApplicationForm() {
  const params = useSearchParams();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const fromQuery = params.get("interest");
  const defaultInterest = (
    ["membership", "volunteering", "partnership"] as const
  ).includes(fromQuery as ApplicationInput["interest"])
    ? (fromQuery as ApplicationInput["interest"])
    : "membership";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      interest: defaultInterest,
      name: "",
      email: "",
      phone: "",
      connection: "Current student",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ApplicationInput) => {
    setServerMessage(null);
    const result = await submitApplication(values);
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
          Your application has been received. The Society will review it and
          respond to the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="application-form"
      className="rounded-2xl border border-line bg-white p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="I am interested in" error={errors.interest?.message} full>
          <select
            id="interest"
            className={inputClass(!!errors.interest)}
            {...register("interest")}
          >
            <option value="membership">Membership</option>
            <option value="volunteering">Volunteering</option>
            <option value="partnership">Partnership / sponsorship</option>
          </select>
        </Field>

        <Field label="Full name" error={errors.name?.message}>
          <input
            id="full-name"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </Field>

        <Field label="Email address" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label="Phone number (optional)" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field label="Your connection to PAF-IAST" error={errors.connection?.message}>
          <select
            id="connection"
            className={inputClass(!!errors.connection)}
            {...register("connection")}
          >
            {CONNECTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="A few words about your interest"
          error={errors.message?.message}
          full
        >
          <textarea
            id="message"
            rows={5}
            placeholder="For example: what you would like to contribute, any relevant experience, or the kind of activity that interests you."
            className={inputClass(!!errors.message)}
            {...register("message")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="app-company">Company</label>
        <input id="app-company" tabIndex={-1} autoComplete="off" {...register("company")} />
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
        {isSubmitting ? "Sending…" : "Submit application"}
      </button>

      <p className="mt-5 text-sm leading-relaxed text-charcoal/50">
        Your details are stored securely and used only to respond to your
        application.
      </p>
    </form>
  );
}
