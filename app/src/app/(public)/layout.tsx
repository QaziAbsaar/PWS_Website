import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-5 focus:z-50 focus:rounded-b-lg focus:bg-white focus:px-4 focus:py-2.5"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
