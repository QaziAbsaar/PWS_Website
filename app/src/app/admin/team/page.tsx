import type { Metadata } from "next";
import { getTeam } from "@/lib/data/team";
import { NewTeamForm, TeamEditor } from "@/components/admin/team-editor";
import { teamGroupLabel } from "@/lib/team-groups";

export const metadata: Metadata = {
  title: "Team",
  robots: { index: false, follow: false },
};

export default async function AdminTeamPage() {
  const team = await getTeam();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight">Team</h1>
      <p className="mt-2 mb-8 text-sm text-charcoal/60">
        The cabinet roster shown on the public About page. When this list is
        empty, the About page falls back to the last published cabinet.
      </p>

      <NewTeamForm />

      {team.length === 0 ? (
        <p className="rounded-2xl border border-line bg-white p-6 text-sm text-charcoal/60">
          No team members yet. Add the current cabinet above.
        </p>
      ) : (
        <div className="space-y-4">
          {team.map((member) => (
            <details key={member.id} className="rounded-2xl border border-line bg-white">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4">
                <strong className="text-sm">{member.name}</strong>
                <span className="text-xs text-charcoal/50">{member.role}</span>
                <span className="rounded-full bg-off-white px-2.5 py-1 text-xs text-charcoal/60">
                  {teamGroupLabel(member.team_group)}
                </span>
                <span className="ml-auto text-xs text-charcoal/40">
                  #{member.sort_order}
                </span>
              </summary>
              <div className="border-t border-line p-6">
                <TeamEditor
                  id={member.id}
                  values={{
                    name: member.name,
                    role: member.role,
                    team_group: member.team_group,
                    photo_path: member.photo_path ?? "",
                    sort_order: member.sort_order,
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
