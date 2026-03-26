import Link from "next/link";
import { AuthButton } from "./auth-button";
import { MobileNav } from "./mobile-nav";
import { Smartphone } from "lucide-react";
import { Suspense } from "react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 group">
            <Smartphone className="h-6 w-6 text-highlight group-hover:text-accent transition-colors" />
            <span className="font-extrabold text-xl tracking-tighter uppercase">
              Phone<span className="text-highlight">Resell</span>
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-xs font-bold uppercase tracking-wider hidden md:flex">
            <Link
              href="/phones"
              className="transition-colors hover:text-highlight"
            >
              All Phones
            </Link>
            <Link
              href="/admin"
              className="transition-colors hover:text-highlight"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4 items-center">
            <Suspense fallback={<div className="h-8 w-20 animate-pulse bg-muted rounded" />}>
              <AuthButton />
            </Suspense>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
