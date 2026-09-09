import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/nav";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // The real gate: middleware checks session, this checks role.
  const { data } = await supabase
    .from("admins")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!data) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-off-white">
      <AdminNav email={user.email ?? ""} />
      <main className="mx-auto w-full max-w-shell px-6 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
