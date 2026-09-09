"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/app/actions/admin";
import { inputClass } from "@/components/forms/enquiry-form";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (formData: FormData) => {
    setError(null);
    setPending(true);
    const result = await login(
      String(formData.get("email") ?? ""),
      String(formData.get("password") ?? ""),
    );
    setPending(false);
    if (result.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.message);
    }
  };

  return (
    <form
      action={onSubmit}
      className="w-full max-w-sm rounded-2xl border border-line bg-white p-8"
    >
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Welfare Society Portal
      </h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Sign in with your admin account.
      </p>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-xs font-bold tracking-wide text-charcoal/70 uppercase"
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass(false)}
          />
        </div>
        <div>
          <label
            htmlFor="login-password"
            className="mb-1.5 block text-xs font-bold tracking-wide text-charcoal/70 uppercase"
          >
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={inputClass(false)}
          />
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 w-full rounded-full bg-pws-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pws-teal disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
