import { createClient } from "@/lib/supabase/server";
import type { SubmissionRow, TeamMemberRow } from "@/types/database.types";

export async function getTeam(): Promise<TeamMemberRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("getTeam:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getSubmissions(): Promise<SubmissionRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getSubmissions:", error.message);
    return [];
  }
  return data ?? [];
}
