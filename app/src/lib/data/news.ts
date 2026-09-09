import { createClient } from "@/lib/supabase/server";
import type { NewsRow } from "@/types/database.types";

export async function getPublishedNews(): Promise<NewsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("getPublishedNews:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllNews(): Promise<NewsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllNews:", error.message);
    return [];
  }
  return data ?? [];
}
