import type { Metadata } from "next";
import { getPublishedGallery } from "@/lib/data/gallery";
import { mediaUrl } from "@/lib/media";
import { PageHero } from "@/components/public/sections";

export const metadata: Metadata = {
  title: "Stories",
  description: "Stories and moments from PAF-IAST Welfare Society.",
};

const PLACEHOLDER_TILES = [
  { title: "Showing up", body: "People making time to be useful." },
  { title: "Listening", body: "Start with what people need." },
  { title: "Learning", body: "Make social issues easier to understand." },
  { title: "Giving", body: "Every contribution counts." },
  { title: "Working side by side", body: "Partnership brings perspective." },
  { title: "Moving forward", body: "One thoughtful step at a time." },
];

export default async function GalleryPage() {
  const images = await getPublishedGallery();

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title={
          <>
            The moments behind
            <br />
            <em>the intention.</em>
          </>
        }
        lede="A visual archive of people, effort, and the small gestures that make a shared purpose visible."
      />

      <section className="section">
        <div className="shell">
          {images.length === 0 ? (
            <>
              <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
                What our stories hold.
              </h2>
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {PLACEHOLDER_TILES.map((tile) => (
                  <div key={tile.title} className="rule-item">
                    <h2 className="font-display text-2xl font-bold tracking-tight">
                      {tile.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                      {tile.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-12 max-w-2xl text-base leading-relaxed text-charcoal/60">
                This page is designed for genuine Society photography and
                event captions. No stock imagery or invented event images are
                used, so every future image can represent a real moment with
                the appropriate permission and credit.
              </p>
            </>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <figure key={image.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- Supabase storage */}
                  <img
                    src={mediaUrl(image.storage_path) ?? ""}
                    alt={image.alt_text || image.caption || "PAF-IAST Welfare Society activity"}
                    className="aspect-square w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                  {image.caption && (
                    <figcaption className="mt-3 text-sm text-charcoal/60">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="h-display mb-5 text-3xl text-pws-green sm:text-4xl">
              Have photographs from a Society activity?
            </h2>
            <p className="mb-9 text-lg leading-relaxed text-charcoal/70">
              Share them with the media team together with the event name,
              date, and any photo-consent requirements before publishing.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full bg-pws-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pws-teal"
            >
              Contact the Society
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
