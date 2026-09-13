import Link from "next/link";
import { ButtonLink, TextLink } from "@/components/ui/links";

export default function HomePage() {
  return (
    <>
      {/* Hero — the one bold moment: full-bleed teal, animated arcs and
          gathering dots. One orchestrated load sequence, then quiet. */}
      <section className="bg-pws-teal text-white">
        <div className="shell grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="h-display hero-rise mb-8 text-5xl sm:text-6xl lg:text-7xl">
              Care becomes
              <br />
              <em className="font-semibold">stronger</em> when
              <br />
              we act together.
            </h1>
            <p
              className="hero-rise mb-10 max-w-lg text-lg leading-relaxed text-white/80"
              style={{ animationDelay: "0.15s" }}
            >
              We bring students together around practical care, social
              responsibility, and a shared belief: meaningful change begins
              with showing up.
            </p>
            <div
              className="hero-rise flex flex-wrap items-center gap-7"
              style={{ animationDelay: "0.3s" }}
            >
              <ButtonLink href="/get-involved#pathways" variant="light">
                Find your place
              </ButtonLink>
              <ButtonLink href="/about" variant="ghost">
                Meet the Society
              </ButtonLink>
            </div>
          </div>

          {/* Arcs reach out and draw in; dots gather like people joining. */}
          <div
            className="relative hidden aspect-square lg:block"
            role="img"
            aria-label="Animated illustration of arcs reaching out and people gathering around shared purpose"
          >
            <svg viewBox="0 0 480 480" aria-hidden="true" className="h-full w-full">
              {/* Reach arcs — draw in, staggered */}
              <path
                className="hero-draw"
                style={{ "--dash": "540", animationDelay: "0.2s" } as React.CSSProperties}
                d="M89 297c14 74 87 123 166 112 72-10 127-78 120-153"
                fill="none"
                stroke="#F2F4F2"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
              <path
                className="hero-draw"
                style={{ "--dash": "620", animationDelay: "0.5s" } as React.CSSProperties}
                d="M97 172c34-66 119-93 189-60 62 29 95 100 75 166"
                fill="none"
                stroke="#4F9856"
                strokeWidth="2.5"
              />
              <path
                className="hero-draw"
                style={{ "--dash": "420", animationDelay: "0.8s" } as React.CSSProperties}
                d="M125 242c40 38 86 42 133 10 38-26 70-19 104 15"
                fill="none"
                stroke="#F2F4F2"
                strokeOpacity="0.7"
                strokeWidth="2"
              />

              {/* Community dots — pop in, then drift gently.
                  Drift wraps pop: the two transforms can't share an element. */}
              <g className="hero-drift" style={{ animationDelay: "2s" }}>
                <circle className="hero-pop" style={{ animationDelay: "1.2s" }} cx="126" cy="242" r="10" fill="#4F9856" />
              </g>
              <g className="hero-drift" style={{ animationDelay: "3.1s" }}>
                <circle className="hero-pop" style={{ animationDelay: "1.35s" }} cx="258" cy="252" r="10" fill="#F2F4F2" />
              </g>
              <g className="hero-drift" style={{ animationDelay: "4.2s" }}>
                <circle className="hero-pop" style={{ animationDelay: "1.5s" }} cx="362" cy="267" r="10" fill="#4F9856" />
              </g>
              {/* Two more join the circle */}
              <g className="hero-drift" style={{ animationDelay: "5.3s" }}>
                <circle className="hero-pop" style={{ animationDelay: "1.65s" }} cx="205" cy="135" r="7" fill="#F2F4F2" fillOpacity="0.8" />
              </g>
              <g className="hero-drift" style={{ animationDelay: "6.1s" }}>
                <circle className="hero-pop" style={{ animationDelay: "1.8s" }} cx="318" cy="180" r="7" fill="#F2F4F2" fillOpacity="0.8" />
              </g>
            </svg>
            <p className="hero-rise absolute bottom-2 right-6 font-display text-2xl font-semibold leading-snug" style={{ animationDelay: "1.9s" }}>
              Small actions.
              <br />
              <em>Shared purpose.</em>
            </p>
          </div>
        </div>

        <div
          aria-label="Our focus areas"
          className="border-t border-white/10 py-5 text-center text-sm font-medium text-white/60"
        >
          Volunteerism &nbsp;·&nbsp; Social outreach &nbsp;·&nbsp; Empathy in
          action &nbsp;·&nbsp; Community partnership
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display text-3xl sm:text-4xl">
              A more compassionate campus starts with one decision:{" "}
              <em>to care.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-7 text-lg leading-relaxed text-charcoal/70">
              PAF-IAST Welfare Society is a student-led space for people who
              want to turn concern into useful action. We encourage
              volunteerism, raise awareness of social issues, and build
              partnerships that can widen the reach of good work.
            </p>
            <TextLink href="/programs">Explore our focus areas</TextLink>
          </div>
        </div>
      </section>

      {/* Focus areas — three commitments, set on rules */}
      <section className="section section-alt">
        <div className="shell">
          <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
            Good intentions deserve a clear direction.
          </h2>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rule-item lg:border-t-0 lg:pt-0">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Volunteer together
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                Create routes for students to contribute their time, skills,
                and energy where they can make a difference.
              </p>
            </div>
            <div className="rule-item lg:border-t-0 lg:pt-0">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Start useful conversations
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                Bring attention to education, health, poverty, human rights,
                and the social issues that call for collective care.
              </p>
            </div>
            <div className="rule-item lg:border-t-0 lg:pt-0">
              <h3 className="font-display text-2xl font-bold tracking-tight">
                Build stronger links
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                Work with campus partners, organisations, and communities to
                turn goodwill into sustained impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-charcoal py-24 text-white sm:py-32">
        <div className="shell max-w-3xl text-center">
          <p className="mb-7 font-display text-7xl leading-none text-pws-sage" aria-hidden="true">
            &ldquo;
          </p>
          <blockquote className="h-display text-3xl sm:text-4xl">
            Compassion is not only a feeling. It is a practice we
            build—<em>together.</em>
          </blockquote>
          <div className="mt-9 flex justify-center">
            <TextLink href="/about" onDark>
              Our purpose and people
            </TextLink>
          </div>
        </div>
      </section>

      {/* Pathways preview — a genuine three-way choice, list on rules */}
      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="h-display mb-6 max-w-md text-3xl sm:text-4xl">
              Bring what you have. Help where it matters.
            </h2>
            <p className="mb-9 max-w-md text-lg leading-relaxed text-charcoal/70">
              Whether you want to join the Society, give your time, or work
              alongside us, there is a straightforward way to begin.
            </p>
            <ButtonLink href="/get-involved#pathways">Choose your path</ButtonLink>
          </div>
          <div className="flex flex-col justify-center">
            <PathRow
              title="Become a member"
              href="/get-involved?interest=membership#application"
              body="Join the Society’s student community and help shape the work over the year."
            />
            <PathRow
              title="Volunteer for an activity"
              href="/get-involved?interest=volunteering#application"
              body="Offer time, skills, or support for a specific activity or ongoing initiative."
            />
            <PathRow
              title="Partner with the Society"
              href="/get-involved?interest=partnership#application"
              body="Explore an institutional collaboration, sponsorship, or community connection."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PathRow({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block border-t border-line py-7 last:border-b"
    >
      <strong className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-pws-green">
        {title}
      </strong>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{body}</p>
    </Link>
  );
}
