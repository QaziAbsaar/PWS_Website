/** Row shapes mirroring supabase/migrations/0001_init.sql. */

export type AdminRole = "admin" | "editor";

export interface AdminRow {
  id: string;
  role: AdminRole;
  created_at: string;
}

export type ContentStatus = "draft" | "published";

export interface EventRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string | null;
  location: string | null;
  status: ContentStatus;
  image_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImageRow {
  id: string;
  caption: string;
  alt_text: string;
  storage_path: string;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
}

export interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  photo_path: string | null;
  sort_order: number;
  created_at: string;
}

export type SubmissionKind = "enquiry" | "application";

export interface SubmissionRow {
  id: string;
  kind: SubmissionKind;
  payload: Record<string, unknown>;
  handled: boolean;
  created_at: string;
}

/** Uniform server-action result. */
export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };
