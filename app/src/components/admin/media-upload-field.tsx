"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/media";
import { inputClass } from "@/components/forms/enquiry-form";

/**
 * Storage path field with direct upload to the "media" bucket.
 * Uploads run through the browser client, so RLS (admin-only writes)
 * applies. Path stays editable for existing files.
 */
export function MediaUploadField({
  id,
  value,
  onChange,
  onError,
}: {
  id: string;
  value: string;
  onChange: (path: string) => void;
  onError?: (message: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const upload = async (file: File) => {
    setDone(null);
    // Prefix with timestamp so re-uploading the same file never collides.
    const ext = file.name.includes(".") ? file.name.split(".").pop() : "";
    const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "file";
    const path = `${Date.now()}-${base}${ext ? `.${ext.toLowerCase()}` : ""}`;

    setUploading(true);
    const supabase = createClient();
    const { error } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    setUploading(false);

    if (error) {
      console.error("upload:", error.message);
      onError?.(`Upload failed: ${error.message}`);
      return;
    }
    onChange(path);
    setDone(path);
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          id={id}
          placeholder="drive-poster.png"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass(false)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="shrink-0 rounded-lg border border-line px-4 text-sm font-semibold text-pws-green transition-colors hover:border-pws-sage disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }}
      />
      <p className="mt-1.5 text-xs text-charcoal/50">
        Upload an image — it goes to the “media” bucket in Supabase Storage.
        The path fills in automatically.
      </p>
      {done && (
        <p className="mt-1 text-xs font-semibold text-pws-green">
          Uploaded as {done}
        </p>
      )}
    </div>
  );
}
