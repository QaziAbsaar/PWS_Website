"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Visitor popup showing the current drive's poster.
 * Shown once per browser session; dismiss with X, Escape, or backdrop.
 */
export function PosterPopup({
  imageUrl,
  title,
  linkUrl,
}: {
  imageUrl: string;
  title: string;
  linkUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("pws-popup-dismissed") === "1";
    } catch {
      // Storage blocked (private mode) — show the popup anyway.
    }
    if (!dismissed) setOpen(true);
  }, []);

  // Focus the close button on open; trap Escape.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("pws-popup-dismissed", "1");
    } catch {
      // Ignore storage failures.
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Current drive announcement"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 p-4"
      onClick={dismiss}
    >
      <div
        className="modal-in relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-charcoal transition-colors hover:bg-white hover:text-pws-green focus:outline-pws-green"
        >
          <X className="h-4 w-4" />
        </button>

        {linkUrl ? (
          <a href={linkUrl} onClick={dismiss} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element -- Supabase storage */}
            <img
              src={imageUrl}
              alt={title || "Current drive poster"}
              className="max-h-[85vh] w-full object-contain"
            />
          </a>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element -- Supabase storage */
          <img
            src={imageUrl}
            alt={title || "Current drive poster"}
            className="max-h-[85vh] w-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
