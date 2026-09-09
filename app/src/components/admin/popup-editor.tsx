"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ActionResult, PopupPosterRow } from "@/types/database.types";
import { deletePopup, savePopup } from "@/app/actions/admin";
import { inputClass } from "@/components/forms/enquiry-form";
import { NewItemPanel } from "@/components/admin/crud";
import { MediaUploadField } from "@/components/admin/media-upload-field";

const ACTIVE_OPTIONS = [
  { value: "no", label: "Inactive" },
  { value: "yes", label: "Active (shown to visitors)" },
];

function PosterForm({ poster }: { poster?: PopupPosterRow }) {
  const router = useRouter();
  const [values, setValues] = useState({
    title: poster?.title ?? "",
    storage_path: poster?.storage_path ?? "",
    link_url: poster?.link_url ?? "",
    active: poster?.active ? "yes" : "no",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const set = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const submit = async (): Promise<ActionResult> => {
    const result = await savePopup({
      id: poster?.id,
      title: values.title,
      storage_path: values.storage_path,
      link_url: values.link_url,
      active: values.active === "yes",
    });
    if (result.ok) router.refresh();
    return result;
  };

  const remove = async (): Promise<ActionResult> => {
    if (!poster) return { ok: true };
    if (!confirm("Delete this poster?")) return { ok: true };
    const result = await deletePopup(poster.id);
    if (result.ok) router.refresh();
    return result;
  };

  const onSubmit = async () => {
    setMessage(null);
    setPending(true);
    const result = await submit();
    setPending(false);
    if (!result.ok) setMessage(result.message);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
      className="rounded-2xl border border-line bg-white p-6"
    >
      <h2 className="mb-6 font-display text-lg font-bold tracking-tight">
        {poster ? "Edit poster" : "New poster"}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={`popup-title-${poster?.id ?? "new"}`}
            className="mb-1.5 block text-sm font-semibold text-charcoal/80"
          >
            Banner title
          </label>
          <input
            id={`popup-title-${poster?.id ?? "new"}`}
            placeholder="For example: Winter blanket drive — donate by 30 November"
            value={values.title}
            onChange={(event) => set("title", event.target.value)}
            className={inputClass(false)}
          />
          <p className="mt-1.5 text-xs text-charcoal/50">
            Shown in the slim banner at the top of the site.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`popup-path-${poster?.id ?? "new"}`}
            className="mb-1.5 block text-sm font-semibold text-charcoal/80"
          >
            Poster image
          </label>
          <MediaUploadField
            id={`popup-path-${poster?.id ?? "new"}`}
            value={values.storage_path}
            onChange={(path) => set("storage_path", path)}
            onError={setMessage}
          />
        </div>

        <div>
          <label
            htmlFor={`popup-link-${poster?.id ?? "new"}`}
            className="mb-1.5 block text-sm font-semibold text-charcoal/80"
          >
            Link (optional)
          </label>
          <input
            id={`popup-link-${poster?.id ?? "new"}`}
            placeholder="/get-involved"
            value={values.link_url}
            onChange={(event) => set("link_url", event.target.value)}
            className={inputClass(false)}
          />
        </div>

        <div>
          <label
            htmlFor={`popup-active-${poster?.id ?? "new"}`}
            className="mb-1.5 block text-sm font-semibold text-charcoal/80"
          >
            Status
          </label>
          <select
            id={`popup-active-${poster?.id ?? "new"}`}
            value={values.active}
            onChange={(event) => set("active", event.target.value)}
            className={inputClass(false)}
          >
            {ACTIVE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
        {poster && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Delete this poster?")) void remove();
            }}
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

export function PopupEditor({ posters }: { posters: PopupPosterRow[] }) {
  return (
    <>
      <NewItemPanel label="Poster">
        <PosterForm />
      </NewItemPanel>

      {posters.length === 0 ? (
        <p className="text-base text-charcoal/70">
          No posters yet. Create one, upload the image to the “media” bucket,
          and set it active to show it to visitors.
        </p>
      ) : (
        <div className="space-y-6">
          {posters.map((poster) => (
            <PosterForm key={poster.id} poster={poster} />
          ))}
        </div>
      )}
    </>
  );
}
