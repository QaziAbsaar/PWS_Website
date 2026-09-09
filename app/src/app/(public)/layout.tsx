import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { NotificationBanner } from "@/components/public/notification-banner";
import { PosterPopup } from "@/components/public/poster-popup";
import { getActivePopup } from "@/lib/data/popup";
import { mediaUrl } from "@/lib/media";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const popup = await getActivePopup();
  const imageUrl = mediaUrl(popup?.storage_path);
  const bannerTitle = popup?.title?.trim();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-5 focus:z-50 focus:rounded-b-lg focus:bg-white focus:px-4 focus:py-2.5"
      >
        Skip to content
      </a>
      {bannerTitle && (
        <NotificationBanner title={bannerTitle} linkUrl={popup?.link_url ?? null} />
      )}
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      {popup && imageUrl && (
        <PosterPopup
          imageUrl={imageUrl}
          title={popup.title}
          linkUrl={popup.link_url}
        />
      )}
    </>
  );
}
