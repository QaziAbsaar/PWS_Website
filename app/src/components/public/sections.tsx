/** Page-level hero and shared section primitives. */

export function PageHero({
  eyebrow,
  title,
  lede,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-pws-teal text-white" : "bg-off-white"}>
      <div className="shell py-24 sm:py-32">
        <p className={`eyebrow ${dark ? "on-dark" : ""}`}>{eyebrow}</p>
        <h1 className="h-display mb-7 max-w-3xl text-5xl sm:text-6xl">{title}</h1>
        <p
          className={`max-w-xl text-lg leading-relaxed ${
            dark ? "text-white/80" : "text-charcoal/70"
          }`}
        >
          {lede}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  narrow = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  narrow?: boolean;
}) {
  return (
    <div className={`mb-14 ${narrow ? "max-w-2xl" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
      {lede && (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
          {lede}
        </p>
      )}
    </div>
  );
}

export function Callout({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="section">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h-display mb-5 text-3xl text-pws-green sm:text-4xl">
            {title}
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-charcoal/70">{body}</p>
          <a
            href={href}
            className="inline-flex items-center rounded-full bg-pws-green px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pws-teal"
          >
            {label}
          </a>
        </div>
      </div>
    </section>
  );
}
