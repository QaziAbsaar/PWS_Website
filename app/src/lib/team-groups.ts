/** Team groups shown on the public About page, in display order. */
export const TEAM_GROUPS = [
  { value: "advisor", label: "Advisors" },
  { value: "executive-council", label: "Executive Council" },
  { value: "media", label: "Media Team" },
  { value: "finance", label: "Finance Team" },
  { value: "women-empowerment", label: "Women Empowerment Team" },
  { value: "operations", label: "Operations Team" },
  { value: "community-engagement", label: "Community Engagement Team" },
] as const;

export type TeamGroup = (typeof TEAM_GROUPS)[number]["value"];

export function teamGroupLabel(value: string): string {
  return TEAM_GROUPS.find((group) => group.value === value)?.label ?? value;
}
