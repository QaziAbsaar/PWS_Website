import Link from "next/link";

const OFFICIAL = [
  {
    href: "https://paf-iast.edu.pk/welfaresociety/",
    label: "PAF-IAST Welfare Society ↗",
  },
  { href: "https://paf-iast.edu.pk/", label: "PAF-IAST website ↗" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Home">
            {/* eslint-disable-next-line @next/next/no-img-element -- static logo, same size every render */}
            <img
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="leading-none">
              <strong className="block font-display text-lg font-bold tracking-tight">
                Welfare
              </strong>
              <small className="mt-1 block text-[9px] uppercase tracking-widest text-white/50">
                PAF–IAST Society
              </small>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            A student-led society building a more caring, responsible, and
            connected community.
          </p>
        </div>

        <nav aria-label="Explore" className="text-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-eyebrow text-pws-sage">
            Explore
          </p>
          <ul className="space-y-2.5">
            <li><FooterLink href="/about">About us</FooterLink></li>
            <li><FooterLink href="/programs">Our work</FooterLink></li>
            <li><FooterLink href="/events">Events</FooterLink></li>
            <li><FooterLink href="/gallery">Stories</FooterLink></li>
            <li><FooterLink href="/news">News</FooterLink></li>
          </ul>
        </nav>

        <nav aria-label="Take action" className="text-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-eyebrow text-pws-sage">
            Take action
          </p>
          <ul className="space-y-2.5">
            <li>
              <FooterLink href="/get-involved?interest=membership#application">
                Become a member
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/get-involved?interest=volunteering#application">
                Volunteer
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/get-involved?interest=partnership#application">
                Partner with us
              </FooterLink>
            </li>
            <li><FooterLink href="/contact">Contact</FooterLink></li>
          </ul>
        </nav>

        <nav aria-label="Official channels" className="text-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-eyebrow text-pws-sage">
            Official channels
          </p>
          <ul className="space-y-2.5">
            {OFFICIAL.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap justify-between gap-3 py-6 text-xs text-white/50">
          <span>© {new Date().getFullYear()} PAF-IAST Welfare Society</span>
          <span>Designed for a culture of care.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/70 transition-colors hover:text-white">
      {children}
    </Link>
  );
}
