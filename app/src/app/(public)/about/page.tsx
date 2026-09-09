import type { Metadata } from "next";
import { getTeam } from "@/lib/data/team";
import { initials, mediaUrl } from "@/lib/media";
import { Callout, PageHero } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Learn about the purpose, values, and people of PAF-IAST Welfare Society.",
};

/** Static roster shown until team members are managed in the admin portal. */
const FALLBACK_TEAM = [
  { name: "Hassan Vaqas Quraishi", role: "President" },
  { name: "Mahnoor Rasheed", role: "Vice President" },
  { name: "Azka Noor", role: "General Secretary" },
  { name: "Qazi Absar", role: "Public Relations Secretary" },
  { name: "Hania", role: "Director, Event Management" },
  { name: "Attiq Shah", role: "Director, Media" },
  { name: "Inayat Ullah", role: "Director, Operations" },
  { name: "Abdur Rehman Nasir", role: "Finance Secretary" },
];

const VALUES = [
  {
    title: "Show up",
    body: "We create meaningful ways for students to contribute time, effort, skills, and care to the people and causes that need them.",
  },
  {
    title: "Pay attention",
    body: "We encourage thoughtful conversations on poverty, education, health, human rights, and other social issues that deserve more visibility.",
  },
  {
    title: "Take responsibility",
    body: "We give students opportunities to organise, collaborate, make decisions, and grow into responsible members of society.",
  },
];

export default async function AboutPage() {
  const team = await getTeam();
  const roster =
    team.length > 0
      ? team.map((member) => ({
          name: member.name,
          role: member.role,
          photo: mediaUrl(member.photo_path),
        }))
      : FALLBACK_TEAM.map((member) => ({ ...member, photo: null }));

  return (
    <>
      <PageHero
        eyebrow="About the Society"
        title={
          <>
            Rooted in empathy.
            <br />
            <em>Moved by purpose.</em>
          </>
        }
        lede="We are students who believe social responsibility is not an extra—it is part of how a strong campus community shows up for people."
      />

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display text-3xl sm:text-4xl">
              Making care a habit, <em>not a one-time gesture.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-charcoal/70">
              We bring students together to contribute to social good within
              and beyond the PAF-IAST community.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="shell">
          <h2 className="h-display mb-14 max-w-2xl text-3xl sm:text-4xl">
            Three commitments that shape the work.
          </h2>
          <div className="grid gap-10 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rule-item lg:border-t-0 lg:pt-0">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-pws-green text-white">
        <div className="shell">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-display text-3xl sm:text-4xl">
              The people guiding the work.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              The cabinet listing reflects the Society information published by
              PAF-IAST. Roles change by term and are reviewed when a new
              cabinet takes office.
            </p>
          </div>

          <div className="mb-10 flex items-center gap-5 border-t border-white/20 pt-10">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10 font-display text-lg font-bold">
              FH
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">Dr Fida Hussain</h3>
              <p className="text-sm text-white/70">
                Assistant Professor &amp; Advisor
                <br />
                Department of Chemical and Energy Engineering
              </p>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {roster.map((member) => (
              <div key={member.name} className="flex items-center gap-4">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Supabase storage, not optimized by next/image without remote loader config
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10 font-display text-lg font-bold"
                  >
                    {initials(member.name)}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-base font-bold">{member.name}</h3>
                  <p className="text-xs text-white/70">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Callout
        title="This is a shared effort."
        body="The Society becomes stronger when students with different perspectives and abilities choose to be part of it."
        href="/get-involved?interest=membership#application"
        label="Join the Society"
      />
    </>
  );
}
