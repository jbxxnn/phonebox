import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Settings2, 
  Youtube,
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: phone } = await supabase.from("phones").select("*").eq("id", id).single();

  if (!phone) return { title: "Phone Not Found" };

  return {
    title: `${phone.name} | PhoneResell`,
    description: phone.description || `Get the ${phone.name} reviewed by experts. Best prices on verified ${phone.brand} phones.`,
    openGraph: {
      images: phone.images?.[0] ? [phone.images[0]] : [],
    },
  };
}

export default async function PhoneDetailPage({
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

  // Parse specs if they are JSON
  const specs = typeof phone.specs === "object" ? phone.specs : {};

  return (
    <div className="container px-4 max-w-7xl mx-auto py-12 lg:py-20 flex flex-col gap-12">
      {/* Breadcrumbs / Back button */}
      <div>
        <Link 
          href="/phones" 
          className="inline-flex items-center text-xs font-black uppercase tracking-widest text-highlight hover:text-accent transition-colors group"
        >
          <ChevronLeft className="mr-2 h-4 w-4 bg-highlight/10 p-0.5 rounded-full group-hover:bg-accent/10 transition-colors" />
          Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-8">
          <div className="relative aspect-square border-4 border-foreground bg-card shadow-[12px_12px_0px_rgba(45,58,58,0.1)] overflow-hidden group">
            <Image
              src={phone.images?.[0] || "/placeholder-phone.jpg"}
              alt={phone.name}
              fill
              className="object-contain p-10 md:p-16 hover:scale-105 transition-transform duration-700"
              priority
            />
            {phone.is_featured && (
              <Badge className="absolute top-8 left-8 bg-accent text-accent-foreground rounded-none border-0 font-black uppercase text-xs tracking-[.2em] px-4 py-2 shadow-lg">
                Featured Review
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {phone.images?.map((img: string, i: number) => (
              <div 
                key={i} 
                className={`relative aspect-square border-2 border-foreground/10 transition-all cursor-pointer hover:border-highlight ${i === 0 ? "border-highlight shadow-[4px_4px_0px_rgba(61,122,106,0.2)]" : "opacity-60 hover:opacity-100"}`}
              >
                <Image src={img} alt={`${phone.name} - ${i}`} fill className="object-cover p-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="text-highlight font-black tracking-widest uppercase text-[10px] px-2 py-1 bg-highlight/10">
                {phone.brand}
              </span>
              <div className="flex items-center text-foreground/40 font-bold uppercase text-[10px] tracking-widest">
                <ShieldCheck className="h-4 w-4 mr-2 text-highlight" />
                Verified Listing
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              {phone.name}
            </h1>
            <div className="flex items-baseline gap-6 mt-2">
              <span className="text-5xl font-black text-foreground">
                ${phone.price.toLocaleString()}
              </span>
              <span className="text-muted-foreground line-through text-xl font-bold opacity-40">
                ${(phone.price * 1.2).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-foreground/70 text-lg leading-relaxed font-medium">
            {phone.description || `Excellent condition ${phone.name} with original accessories. This specific unit was tested and reviewed by the channel.`}
          </p>

          <div className="flex flex-col gap-5 pt-4">
            <WhatsAppButton 
              phone={phone.whatsapp_number} 
              productName={phone.name} 
              className="h-20 text-xl rounded-none bg-highlight font-black uppercase tracking-widest shadow-[8px_8px_0px_rgba(61,122,106,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_rgba(61,122,106,0.3)] transition-all"
            />
            <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-2 font-black uppercase tracking-[.2em]">
              <Zap className="h-4 w-4 text-accent fill-accent" />
              Usually replies within 1 hour
            </p>
          </div>

          {/* Key Selling Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {[
              { icon: Truck, title: "Shipping & Pick-up", desc: "Available for delivery" },
              { icon: ShieldCheck, title: "Condition", desc: "Premium Verified" },
              { icon: Youtube, title: "Review Video", desc: "Included below" },
              { icon: Share2, title: "Share Product", desc: "Send to friends" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 border-2 border-foreground/5 h-full group hover:border-highlight transition-colors">
                <item.icon className="h-6 w-6 text-highlight shrink-0 transition-colors group-hover:text-accent" />
                <div className="flex flex-col">
                  <span className="font-black text-xs uppercase tracking-widest leading-none mb-1">{item.title}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Specs & Video Review Section */}
      <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
        <div className="lg:col-span-2 flex flex-col gap-16">
          {/* Review Video */}
          {phone.review_video_url && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="h-1 shadow-[4px_4px_0px_rgba(196,110,90,1)] w-12 bg-accent"></div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Watch the review</h2>
              </div>
              <div className="relative aspect-video border-4 border-foreground shadow-[12px_12px_0px_rgba(45,58,58,0.1)] overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={phone.review_video_url.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Technical Specifications */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="h-1 shadow-[4px_4px_0px_rgba(61,122,106,1)] w-12 bg-highlight"></div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Technical Specs</h2>
            </div>
            <div className="border-4 border-foreground bg-card shadow-[12px_12px_0px_rgba(45,58,58,0.05)]">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(specs).map(([key, value], idx) => (
                    <tr 
                      key={idx} 
                      className={`border-b-2 border-foreground/5 last:border-0 hover:bg-highlight/5 transition-colors`}
                    >
                      <td className="px-8 py-6 font-black uppercase tracking-[.2em] text-highlight w-1/3 text-[10px]">
                        {key.replace("_", " ")}
                      </td>
                      <td className="px-8 py-6 font-bold text-foreground">
                        {String(value)}
                      </td>
                    </tr>
                  ))}
                  {Object.keys(specs).length === 0 && (
                    <tr className="border-b last:border-0">
                      <td className="px-8 py-10 text-center font-bold uppercase tracking-widest text-muted-foreground" colSpan={2}>
                        No technical specifications provided for this listing.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Consistency Check Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-10 p-10 border-4 border-foreground bg-card shadow-[12px_12px_0px_rgba(61,122,106,0.1)]">
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none border-b-4 border-highlight pb-4">Why buy <br />from us?</h3>
            <ul className="flex flex-col gap-8">
              {[
                "100% Verified Quality",
                "Creator Endorsed Devices",
                "Fast WhatsApp Support",
                "Secure Transactions",
                "Next-day Local Delivery",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <CheckCircle2 className="h-6 w-6 text-highlight shrink-0 transition-colors group-hover:text-accent" />
                  <span className="font-bold text-sm uppercase tracking-tight">{text}</span>
                </li>
              ))}
            </ul>
            <WhatsAppButton 
              phone={phone.whatsapp_number} 
              productName={phone.name} 
              variant="outline"
              className="mt-6 border-2 border-foreground rounded-none font-black uppercase text-xs tracking-[.2em] py-8 h-auto shadow-[6px_6px_0px_rgba(45,58,58,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
