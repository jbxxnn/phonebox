"use client";

import { Smartphone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container px-4 max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-highlight" />
          <span className="font-extrabold tracking-tighter uppercase">
            Phone<span className="text-highlight">Resell</span>
          </span>
        </div>
        <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-left">
          &copy; {year ?? "2026"} PhoneResell. Reviewed by experts.
        </p>
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Link href="/phones" className="transition-colors hover:text-highlight">
            All Listings
          </Link>
          <Link href="/admin" className="transition-colors hover:text-highlight">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
