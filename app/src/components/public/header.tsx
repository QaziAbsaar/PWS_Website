"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Our work" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Stories" },
  { href: "/news", label: "News" },
  { href: "/get-involved", label: "Get involved" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-sm" : "border-transparent"
      }`}
    >
      <div className="flex min-h-20 items-center gap-8 px-6 sm:px-10">
        <Link
          href="/"
          aria-label="PAF-IAST Welfare Society home"
          className="flex items-center gap-3 no-underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static logo, same size every render */}
          <img
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
          <span className="leading-none">
            <strong className="block font-display text-lg font-bold tracking-tight text-charcoal">
              Welfare
            </strong>
            <small className="mt-1 block text-[9px] uppercase tracking-widest text-charcoal/60">
              PAF–IAST Society
            </small>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-6 lg:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-[13px] font-semibold whitespace-nowrap transition-colors ${
                isActive(item.href)
                  ? "text-pws-green"
                  : "text-charcoal/80 hover:text-pws-green"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className={`ml-auto hidden rounded-full px-5 py-2.5 text-[13px] font-bold whitespace-nowrap transition-colors lg:inline-flex ${
            pathname === "/contact"
              ? "bg-pws-teal text-white"
              : "bg-charcoal text-white hover:bg-pws-green"
          }`}
        >
          Contact
        </Link>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-line text-charcoal lg:hidden"
          aria-expanded={open}
          aria-controls="site-nav-mobile"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="site-nav-mobile"
          aria-label="Mobile navigation"
          className="border-t border-line bg-white lg:hidden"
        >
          <div className="shell flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-line/60 py-3 text-sm font-semibold last:border-0 ${
                  isActive(item.href) ? "text-pws-green" : "text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 rounded-full bg-pws-green px-5 py-3 text-center text-sm font-bold text-white"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
