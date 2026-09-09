import type { Metadata } from "next";
import { getPublishedNews } from "@/lib/data/news";
import { formatDate } from "@/lib/media";
import { PageHero } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "News",
  description: "News and announcements from PAF-IAST Welfare Society.",
};

export default async function NewsPage() {
  const posts = await getPublishedNews();

  return (
    <>
      <PageHero
        eyebrow="News"
        title={
          <>
            What the Society
            <br />
            <em>is doing now.</em>
          </>
        }
        lede="Announcements, activity reports, and updates from the Society’s work."
      />

      <section className="section">
        <div className="shell">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="h-display mb-5 text-3xl sm:text-4xl">
                Nothing to announce yet.
              </h2>
              <p className="text-lg leading-relaxed text-charcoal/70">
                When there is confirmed news to share — an activity report, a
                partnership, or an announcement — it will appear here first.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              {posts.map((post) => (
                <article key={post.id} className="rule-item mb-12 last:mb-0">
                  <p className="text-sm font-medium text-pws-green">
                    {formatDate(post.published_at)}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-4 text-lg leading-relaxed text-charcoal/70">
                      {post.excerpt}
                    </p>
                  )}
                  {post.body && (
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal/80">
                      {post.body.split(/\n{2,}/).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
