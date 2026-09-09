import { createClient } from "@/lib/supabase/server";
import type { GalleryImageRow } from "@/types/database";

export async function getPublishedGallery(): Promise<GalleryImageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("status", "published")
    .order("sort_order");

  if (error) {
    console.error("getPublishedGallery:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllGallery(): Promise<GalleryImageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("getAllGallery:", error.message);
    return [];
  }
  return data ?? [];
}
