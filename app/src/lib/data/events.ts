import { createClient } from "@/lib/supabase/server";
import type { EventRow } from "@/types/database.types";

export async function getPublishedEvents(): Promise<EventRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("getPublishedEvents:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllEvents(): Promise<EventRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("getAllEvents:", error.message);
    return [];
  }
  return data ?? [];
}
