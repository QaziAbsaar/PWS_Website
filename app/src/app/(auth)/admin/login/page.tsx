import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Portal login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-off-white p-6">
      <LoginForm />
    </div>
  );
}
