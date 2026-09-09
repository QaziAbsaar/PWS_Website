import type { Metadata } from "next";
import { getAllNews } from "@/lib/data/news";
import { formatDate } from "@/lib/media";
import { NewNewsForm, NewsEditor } from "@/components/admin/news-editor";

export const metadata: Metadata = {
  title: "News",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const posts = await getAllNews();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">News</h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        Society announcements and reports. Published posts appear on the public
        News page.
      </p>

      <NewNewsForm />

      {posts.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-sm text-charcoal/60">
          No posts yet. Create the first one above.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <details key={post.id} className="rounded-2xl border border-line bg-white">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4">
                <strong className="text-sm">{post.title}</strong>
                <span className="text-xs text-charcoal/50">
                  {formatDate(post.published_at) || formatDate(post.created_at)}
                </span>
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
                    post.status === "published"
                      ? "bg-pws-sage/15 text-pws-green"
                      : "bg-charcoal/5 text-charcoal/60"
                  }`}
                >
                  {post.status}
                </span>
              </summary>
              <div className="border-t border-line p-6">
                <NewsEditor
                  id={post.id}
                  values={{
                    title: post.title,
                    status: post.status,
                    excerpt: post.excerpt,
                    body: post.body,
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
