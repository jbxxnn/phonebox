import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="container px-4 max-w-7xl mx-auto py-12">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-2 border-b pb-8">
          <h1 className="text-3xl font-black tracking-tight uppercase">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your phone listings and reviews.</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
