import type { Metadata } from "next";
import { getAllPopups } from "@/lib/data/popup";
import { PopupEditor } from "@/components/admin/popup-editor";

export const metadata: Metadata = {
  title: "Popup & banner",
};

export default async function AdminPopupPage() {
  const posters = await getAllPopups();

  return (
    <div className="mx-auto w-full max-w-shell px-6 py-10 sm:px-8">
      <h1 className="h-display mb-2 text-3xl">Popup &amp; banner</h1>
      <p className="mb-10 max-w-xl text-base leading-relaxed text-charcoal/70">
        The active poster appears as a popup when someone visits the site, and
        its title shows in the banner at the top of every page. Dismissals last
        for the visitor’s browser session.
      </p>
      <PopupEditor posters={posters} />
    </div>
  );
}
