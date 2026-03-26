import { PhoneForm } from "@/components/phone-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPhonePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin" 
          className="h-10 w-10 flex items-center justify-center rounded-xl border border-border/50 bg-card hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Create Listing</h2>
      </div>
      <PhoneForm />
    </div>
  );
}
