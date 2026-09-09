"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * Slim notification banner for the current drive.
 * Dismissed per browser session; sits above the site header.
 */
export function NotificationBanner({
  title,
  linkUrl,
}: {
  title: string;
  linkUrl: string | null;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("pws-banner-dismissed") === "1") {
        setOpen(false);
      }
    } catch {
      // Storage blocked — keep the banner.
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem("pws-banner-dismissed", "1");
    } catch {
      // Ignore storage failures.
    }
  };

  if (!open) return null;

  return (
    <div className="bg-pws-green text-white">
      <div className="shell flex items-center justify-center gap-3 py-2.5 text-center text-sm">
        <p>
          {linkUrl ? (
            <a
              href={linkUrl}
              className="underline decoration-white/40 underline-offset-2 hover:decoration-white"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="rounded-full p-1 text-white/70 transition-colors hover:text-white focus:outline-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
