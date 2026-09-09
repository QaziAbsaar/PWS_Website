"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * Notification banner for the current drive — a scrolling ticker.
 * Pauses on hover, dismisses per browser session, sits above the header.
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

  // Ticker text: title plus an invitation, so the loop says something.
  const message = `${title} — be part of it`;

  return (
    <div className="bg-pws-green text-white">
      <div className="relative flex items-center py-2.5">
        {/* Fixed edges: pulsing live dot on the left, dismiss on the right. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-10 items-center bg-gradient-to-r from-pws-green to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-16 items-center justify-end bg-gradient-to-l from-pws-green via-pws-green/70 to-transparent" />

        <div className="shell relative flex items-center overflow-hidden">
          <span
            className="banner-pulse mr-3 h-2 w-2 shrink-0 rounded-full bg-white"
            aria-hidden="true"
          />
          <div
            className="banner-ticker flex shrink-0 items-center whitespace-nowrap text-sm font-medium"
            aria-label={title}
          >
            {[0, 1].map((copy) => (
              <span key={copy} aria-hidden={copy === 1} className="flex">
                {[0, 1, 2].map((repeat) => (
                  <span key={repeat} className="pr-12">
                    {linkUrl ? (
                      <a
                        href={linkUrl}
                        className="underline decoration-white/40 underline-offset-2 hover:decoration-white"
                      >
                        {message}
                      </a>
                    ) : (
                      message
                    )}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="relative z-20 mr-4 ml-auto rounded-full p-1 text-white/70 transition-colors hover:text-white focus:outline-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
