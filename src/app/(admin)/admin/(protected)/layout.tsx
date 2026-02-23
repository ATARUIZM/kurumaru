import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminHeader from "./AdminHeader";

export const metadata = {
  title: "管理画面",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col pl-64">
        <AdminHeader userName={session.user.name || session.user.email || ""} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
