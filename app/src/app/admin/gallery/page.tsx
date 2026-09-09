import type { Metadata } from "next";
import { getAllGallery } from "@/lib/data/gallery";
import { mediaUrl } from "@/lib/media";
import { NewGalleryForm, GalleryEditor } from "@/components/admin/gallery-editor";

export const metadata: Metadata = {
  title: "Gallery",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage() {
  const images = await getAllGallery();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Gallery</h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Society photographs with captions. Upload files to the{" "}
        <code className="rounded bg-off-white px-1.5 py-0.5 text-xs">media</code>{" "}
        bucket in the Supabase dashboard (Storage), then reference the path
        here. Published images appear on the public Stories page.
      </p>

      <NewGalleryForm />

      {images.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-sm text-charcoal/60">
          No images yet. Add the first one above.
        </p>
      ) : (
        <div className="space-y-4">
          {images.map((image) => (
            <details key={image.id} className="rounded-2xl border border-line bg-white">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4">
                {image.storage_path ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Supabase storage
                  <img
                    src={mediaUrl(image.storage_path) ?? ""}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover"
                    loading="lazy"
                  />
                ) : null}
                <strong className="text-sm">{image.caption || image.storage_path}</strong>
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                    image.status === "published"
                      ? "bg-pws-sage/15 text-pws-green"
                      : "bg-charcoal/5 text-charcoal/60"
                  }`}
                >
                  {image.status}
                </span>
              </summary>
              <div className="border-t border-line p-6">
                <GalleryEditor
                  id={image.id}
                  values={{
                    storage_path: image.storage_path,
                    caption: image.caption,
                    alt_text: image.alt_text,
                    sort_order: image.sort_order,
                    status: image.status,
                  }}
                />
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
