import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedNews } from "@/lib/data/news";
import { formatDate } from "@/lib/media";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPublishedNews()).find((item) => item.slug === slug);
  if (!post) return { title: "News" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = (await getPublishedNews()).find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <section className="bg-off-white">
        <div className="shell py-24 sm:py-32">
          <p className="eyebrow">News</p>
          <h1 className="h-display mb-7 max-w-3xl text-4xl sm:text-5xl">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="text-sm font-medium text-charcoal/60">
              {formatDate(post.published_at)}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="shell max-w-3xl">
          {post.excerpt && (
            <p className="mb-8 text-xl leading-relaxed text-charcoal/80">
              {post.excerpt}
            </p>
          )}
          {post.body ? (
            <div className="space-y-5 text-lg leading-relaxed text-charcoal/80">
              {post.body.split(/\n{2,}/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            !post.excerpt && (
              <p className="text-lg text-charcoal/70">
                Full details will follow shortly.
              </p>
            )
          )}
        </div>
      </section>
    </article>
  );
}
