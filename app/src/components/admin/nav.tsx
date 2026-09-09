"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { logout } from "@/app/actions/admin";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/team", label: "Team" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex w-full max-w-shell flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4 sm:px-8">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-sm font-bold text-charcoal no-underline"
        >
          <LayoutDashboard className="h-4 w-4 text-pws-green" />
          PWS Portal
        </Link>

        <nav
          aria-label="Admin navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-pws-green"
                  : "text-charcoal/70 hover:text-pws-green"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden text-xs text-charcoal/50 sm:inline">{email}</span>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-red-300 hover:text-red-600"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
