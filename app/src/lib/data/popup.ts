import { createClient } from "@/lib/supabase/server";
import type { PopupPosterRow } from "@/types/database.types";

/** The active popup poster, or null when none is set. */
export async function getActivePopup(): Promise<PopupPosterRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("popup_posters")
    .select("*")
    .eq("active", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    // Table missing (migration 0002 not applied yet) — fine, no popup.
    console.error("getActivePopup:", error.message);
    return null;
  }
  return data ?? null;
}

/** All posters, admin view. */
export async function getAllPopups(): Promise<PopupPosterRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("popup_posters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPopups:", error.message);
    return [];
  }
  return data ?? [];
}
