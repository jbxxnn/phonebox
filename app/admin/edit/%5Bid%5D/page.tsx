import { createClient } from "@/lib/supabase/server";
import { PhoneForm } from "@/components/phone-form";
import { notFound } from "next/navigation";
import { ChevronLeft as ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function EditPhonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: phone } = await supabase
    .from("phones")
    .select("*")
    .eq("id", id)
    .single();

  if (!phone) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin" 
          className="h-10 w-10 flex items-center justify-center rounded-xl border border-border/50 bg-card hover:bg-muted transition-colors"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Edit Listing: {phone.name}</h2>
      </div>
      <PhoneForm phone={phone} />
    </div>
  );
}
