import { createClient } from "@/lib/supabase/server";
import { PhoneCard } from "@/components/phone-card";
import { Button } from "@/components/ui/button";
import { Smartphone, ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredPhones } = await supabase
    .from("phones")
    .select("*")
    .eq("is_featured", true)
    .limit(5);

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-40 md:pb-32">
        <div className="container px-4 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-10">
            <div className="inline-flex items-center border-2 border-foreground px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-highlight/10 text-highlight">
              <span className="flex h-2 w-2 bg-highlight mr-3"></span>
              New reviews every week
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter max-w-5xl leading-[0.85] uppercase">
              Turn Your <span className="text-highlight">Search</span> Into A <span className="text-accent">Deal</span> — Anytime.
            </h1>
            <p className="text-lg md:text-2xl text-foreground/70 max-w-3xl font-medium leading-relaxed">
              Buy premium, pre-owned smartphones reviewed and recommended by 
              tech experts. Verified quality, direct WhatsApp ordering.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <Button asChild size="lg" className="h-14 px-10 text-xs font-black uppercase tracking-widest rounded-none bg-foreground shadow-[6px_6px_0px_rgba(45,58,58,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_rgba(45,58,58,0.3)] transition-all">
                <Link href="/phones">
                  Browse Catalog <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-xs font-black uppercase tracking-widest rounded-none border-2 border-foreground shadow-[6px_6px_0px_rgba(45,58,58,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_rgba(45,58,58,0.2)] transition-all">
                <Link href="#featured">Latest Reviews</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-highlight/15 blur-[150px]"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center text-center p-10 border-2 border-foreground bg-card shadow-[8px_8px_0px_rgba(45,58,58,0.1)] hover:shadow-[12px_12px_0px_rgba(61,122,106,0.2)] transition-all">
          <div className="h-16 w-16 bg-highlight/10 flex items-center justify-center mb-6">
            <ShieldCheck className="h-8 w-8 text-highlight" />
          </div>
          <h3 className="text-xl font-black mb-3 uppercase tracking-tight">Verified Reviews</h3>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">Every phone is personally reviewed by creators you trust. No fake specs.</p>
        </div>
        <div className="flex flex-col items-center text-center p-10 border-2 border-foreground bg-card shadow-[8px_8px_0px_rgba(45,58,58,0.1)] hover:shadow-[12px_12px_0px_rgba(196,110,90,0.2)] transition-all">
          <div className="h-16 w-16 bg-accent/10 flex items-center justify-center mb-6">
            <Zap className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-black mb-3 uppercase tracking-tight">Instant Order</h3>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">Order directly via WhatsApp with one click. No complex checkouts.</p>
        </div>
        <div className="flex flex-col items-center text-center p-10 border-2 border-foreground bg-card shadow-[8px_8px_0px_rgba(45,58,58,0.1)] hover:shadow-[12px_12px_0px_rgba(45,58,58,0.2)] transition-all">
          <div className="h-16 w-16 bg-foreground/10 flex items-center justify-center mb-6">
            <Star className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="text-xl font-black mb-3 uppercase tracking-tight">Premium Quality</h3>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">Only high-tier devices in excellent condition are listed here.</p>
        </div>
      </section>

      {/* Featured Phones */}
      <section id="featured" className="container px-4 max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-4 border-b-4 border-foreground">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="w-12 h-2 bg-highlight mb-2"></div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">Featured <br />Listings</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-highlight">The most popular reviews this week.</p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex rounded-none border-2 border-foreground font-black uppercase text-xs tracking-widest px-8">
            <Link href="/phones">View All Phones <ArrowRight className="ml-3 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredPhones?.map((phone) => (
            <PhoneCard
              key={phone.id}
              id={phone.id}
              name={phone.name}
              brand={phone.brand}
              price={phone.price}
              image={phone.images?.[0]}
              whatsapp_number={phone.whatsapp_number}
              is_featured={phone.is_featured}
              specs={phone.specs}
            />
          ))}
          {(!featuredPhones || featuredPhones.length === 0) && (
            <div className="col-span-full py-24 text-center border-4 border-dashed border-foreground/10 flex flex-col items-center justify-center">
              <Smartphone className="h-16 w-16 mb-6 text-muted-foreground opacity-20" />
              <p className="text-lg font-bold uppercase tracking-widest text-muted-foreground">No listings found.</p>
              <Button asChild variant="link" className="mt-4 font-black uppercase text-xs tracking-widest text-highlight">
                <Link href="/admin">Add your first product</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-foreground text-background py-24">
        <div className="container px-4 max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="h-1 w-20 bg-accent"></div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9]">Trusted by 10k+ <br />Tech Enthusiasts</h2>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale invert">
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">NextGen</h3>
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">TechDaily</h3>
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">PhoneGuru</h3>
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">MobileReview</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
