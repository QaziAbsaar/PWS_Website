"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types/database.types";
import { slugify } from "@/lib/media";

export async function login(
  email: string,
  password: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, message: "Invalid email or password." };
  }

  // Defense in depth: middleware only checks session, layout checks role.
  const { data } = await supabase
    .from("admins")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (!data) {
    await supabase.auth.signOut();
    return {
      ok: false,
      message: "This account does not have portal access.",
    };
  }
  return { ok: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export interface EventInput {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: "draft" | "published";
  image_path: string;
}

export async function saveEvent(input: EventInput): Promise<ActionResult> {
  if (!input.title.trim()) {
    return { ok: false, message: "Title is required." };
  }
  const supabase = await createClient();
  const values = {
    title: input.title.trim(),
    slug: slugify(input.title),
    description: input.description,
    date: input.date || null,
    location: input.location || null,
    status: input.status,
    image_path: input.image_path || null,
  };

  const { error } = input.id
    ? await supabase.from("events").update(values).eq("id", input.id)
    : await supabase.from("events").insert(values);

  if (error) {
    console.error("saveEvent:", error.message);
    return { ok: false, message: "Could not save the event." };
  }
  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { ok: true };
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) {
    return { ok: false, message: "Could not delete the event." };
  }
  revalidatePath("/admin/events");
  revalidatePath("/events");
  return { ok: true };
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export interface NewsInput {
  id?: string;
  title: string;
  excerpt: string;
  body: string;
  status: "draft" | "published";
}

export async function saveNews(input: NewsInput): Promise<ActionResult> {
  if (!input.title.trim()) {
    return { ok: false, message: "Title is required." };
  }
  const supabase = await createClient();
  const values = {
    title: input.title.trim(),
    slug: slugify(input.title),
    excerpt: input.excerpt,
    body: input.body,
    status: input.status,
    published_at:
      input.status === "published" ? new Date().toISOString() : null,
  };

  const { error } = input.id
    ? await supabase.from("news").update(values).eq("id", input.id)
    : await supabase.from("news").insert(values);

  if (error) {
    console.error("saveNews:", error.message);
    return { ok: false, message: "Could not save the post." };
  }
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { ok: true };
}

export async function deleteNews(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) {
    return { ok: false, message: "Could not delete the post." };
  }
  revalidatePath("/admin/news");
  revalidatePath("/news");
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export interface GalleryInput {
  id?: string;
  caption: string;
  alt_text: string;
  storage_path: string;
  sort_order: number;
  status: "draft" | "published";
}

export async function saveGalleryImage(
  input: GalleryInput,
): Promise<ActionResult> {
  if (!input.storage_path.trim()) {
    return { ok: false, message: "A storage path or URL is required." };
  }
  const supabase = await createClient();
  const values = {
    caption: input.caption,
    alt_text: input.alt_text,
    storage_path: input.storage_path.trim(),
    sort_order: Number.isFinite(input.sort_order) ? input.sort_order : 0,
    status: input.status,
  };

  const { error } = input.id
    ? await supabase.from("gallery_images").update(values).eq("id", input.id)
    : await supabase.from("gallery_images").insert(values);

  if (error) {
    console.error("saveGalleryImage:", error.message);
    return { ok: false, message: "Could not save the image." };
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { ok: true };
}

export async function deleteGalleryImage(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) {
    return { ok: false, message: "Could not delete the image." };
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export interface TeamInput {
  id?: string;
  name: string;
  role: string;
  team_group: string;
  photo_path: string;
  sort_order: number;
}

export async function saveTeamMember(input: TeamInput): Promise<ActionResult> {
  if (!input.name.trim() || !input.role.trim()) {
    return { ok: false, message: "Name and role are required." };
  }
  const supabase = await createClient();
  const values = {
    name: input.name.trim(),
    role: input.role.trim(),
    team_group: input.team_group || "executive-council",
    photo_path: input.photo_path || null,
    sort_order: Number.isFinite(input.sort_order) ? input.sort_order : 0,
  };

  const { error } = input.id
    ? await supabase.from("team_members").update(values).eq("id", input.id)
    : await supabase.from("team_members").insert(values);

  if (error) {
    console.error("saveTeamMember:", error.message);
    return { ok: false, message: "Could not save the team member." };
  }
  revalidatePath("/admin/team");
  revalidatePath("/about");
  return { ok: true };
}

export async function deleteTeamMember(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) {
    return { ok: false, message: "Could not delete the team member." };
  }
  revalidatePath("/admin/team");
  revalidatePath("/about");
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Popup posters
// ---------------------------------------------------------------------------

export interface PopupInput {
  id?: string;
  title: string;
  storage_path: string;
  link_url: string;
  active: boolean;
}

export async function savePopup(input: PopupInput): Promise<ActionResult> {
  if (!input.storage_path.trim()) {
    return { ok: false, message: "A storage path or URL is required." };
  }
  const supabase = await createClient();
  const values = {
    title: input.title.trim(),
    storage_path: input.storage_path.trim(),
    link_url: input.link_url.trim() || null,
    active: input.active,
  };

  if (values.active) {
    // Only one active poster at a time — activating this one deactivates all.
    const { error: clearError } = await supabase
      .from("popup_posters")
      .update({ active: false })
      .eq("active", true);
    if (clearError) {
      console.error("savePopup (clear):", clearError.message);
      return { ok: false, message: "Could not clear the active poster." };
    }
  }

  const { error } = input.id
    ? await supabase.from("popup_posters").update(values).eq("id", input.id)
    : await supabase.from("popup_posters").insert(values);

  if (error) {
    console.error("savePopup:", error.message);
    return { ok: false, message: "Could not save the poster." };
  }
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deletePopup(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("popup_posters").delete().eq("id", id);
  if (error) {
    return { ok: false, message: "Could not delete the poster." };
  }
  revalidatePath("/", "layout");
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Submissions
// ---------------------------------------------------------------------------

export async function setSubmissionHandled(
  id: string,
  handled: boolean,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("submissions")
    .update({ handled })
    .eq("id", id);
  if (error) {
    return { ok: false, message: "Could not update the submission." };
  }
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return { ok: true };
}
