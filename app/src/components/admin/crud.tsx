"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ActionResult } from "@/types/database";
import { inputClass } from "@/components/forms/enquiry-form";

export interface FieldSpec {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export function CrudForm({
  title,
  fields,
  initialValues,
  submit,
  onDelete,
  onDone,
}: {
  title: string;
  fields: FieldSpec[];
  initialValues: Record<string, string | number>;
  submit: (values: Record<string, string | number>) => Promise<ActionResult>;
  onDelete?: () => Promise<ActionResult>;
  onDone?: () => void;
}) {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  const set = (name: string, value: string | number) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async () => {
    setMessage(null);
    setPending(true);
    const result = await submit(values);
    setPending(false);
    if (result.ok) {
      setSaved(true);
      onDone?.();
    } else {
      setMessage(result.message);
    }
  };

  const remove = async () => {
    if (!onDelete) return;
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setPending(true);
    const result = await onDelete();
    setPending(false);
    if (result.ok) onDone?.();
    else setMessage(result.message);
  };

  if (saved) {
    return (
      <div className="rounded-2xl border border-pws-sage/40 bg-white p-6" role="status">
        <p className="text-sm font-semibold text-pws-green">Saved.</p>
        <button
          type="button"
          onClick={() => setSaved(false)}
          className="mt-3 text-sm font-semibold text-pws-green hover:text-pws-teal"
        >
          Edit again →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
      className="rounded-2xl border border-line bg-white p-6"
    >
      <h2 className="mb-6 font-display text-lg font-bold tracking-tight">{title}</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={`field-${field.name}`}
              className="mb-1.5 block text-xs font-bold tracking-wide text-charcoal/70 uppercase"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={`field-${field.name}`}
                rows={4}
                placeholder={field.placeholder}
                value={String(values[field.name] ?? "")}
                onChange={(event) => set(field.name, event.target.value)}
                className={inputClass(false)}
              />
            ) : field.type === "select" ? (
              <select
                id={`field-${field.name}`}
                value={String(values[field.name] ?? "")}
                onChange={(event) => set(field.name, event.target.value)}
                className={inputClass(false)}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`field-${field.name}`}
                type={field.type === "number" ? "number" : field.type}
                placeholder={field.placeholder}
                value={String(values[field.name] ?? "")}
                onChange={(event) =>
                  set(
                    field.name,
                    field.type === "number"
                      ? Number(event.target.value)
                      : event.target.value,
                  )
                }
                className={inputClass(false)}
              />
            )}
          </div>
        ))}
      </div>

      {message && (
        <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {message}
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-pws-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pws-teal disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:border-red-300 disabled:opacity-60"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        )}
      </div>
    </form>
  );
}

/** Collapsible "create new" section. */
export function NewItemPanel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <section className="mb-8">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="rounded-full bg-pws-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pws-teal"
      >
        {open ? `Close ${label.toLowerCase()}` : `New ${label.toLowerCase()}`}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </section>
  );
}
