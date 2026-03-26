import { createClient } from "@/lib/supabase/server";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PhonesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const brand = (params.brand as string) || null;
  const query = (params.q as string) || null;

  let dbQuery = supabase.from("phones").select("*").order("created_at", { ascending: false });

  if (brand) {
    dbQuery = dbQuery.eq("brand", brand);
  }
  if (query) {
    dbQuery = dbQuery.ilike("name", `%${query}%`);
  }

  const { data: phones } = await dbQuery;
  
  // Get unique brands for filtering
  const { data: brandsData } = await supabase
    .from("phones")
    .select("brand");
  const uniqueBrands = Array.from(new Set(brandsData?.map((p) => p.brand) || []));

  return (
    <div className="container px-4 max-w-7xl mx-auto py-16 flex flex-col gap-12">
      <div className="flex flex-col gap-4 border-l-8 border-highlight pl-6">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Browse Listings</h1>
        <p className="text-highlight text-sm font-bold uppercase tracking-widest">
          Explore our collection of reviewed smartphones.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card p-6 border-2 border-foreground shadow-[8px_8px_0px_rgba(45,58,58,0.1)] transition-all">
        <form action="/phones" className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-highlight" />
          <Input
            name="q"
            defaultValue={query || ""}
            placeholder="Search model or brand..."
            className="w-full bg-background border-2 border-foreground rounded-none h-12 pl-10 pr-4 text-xs font-bold uppercase tracking-wider focus:ring-0 focus:border-highlight transition-all"
          />
        </form>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          <Button variant="outline" size="sm" asChild className="rounded-none border-2 border-foreground px-5 font-black uppercase text-[10px] tracking-widest h-9">
            <a href="/phones">All Brands</a>
          </Button>
          {uniqueBrands.map((b) => (
            <Button
              key={b}
              variant={brand === b ? "default" : "outline"}
              size="sm"
              asChild
              className={`rounded-none border-2 border-foreground px-5 font-black uppercase text-[10px] tracking-widest h-9 transition-all ${brand === b ? 'bg-highlight text-white border-highlight shadow-[3px_3px_0px_rgba(0,0,0,0.1)]' : 'hover:border-highlight hover:text-highlight'}`}
            >
              <a href={`/phones?brand=${b}`}>{b}</a>
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {phones?.map((phone) => (
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
        {(!phones || phones.length === 0) && (
          <div className="col-span-full py-32 text-center border-4 border-dashed border-foreground/10 flex flex-col items-center justify-center">
            <PackageOpen className="h-20 w-20 mx-auto mb-6 text-muted-foreground opacity-20" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-muted-foreground">No results found</h2>
            <p className="text-sm font-medium text-muted-foreground/60 max-w-sm mx-auto mt-2">
              We couldn't find any phones matching your search criteria. 
            </p>
            <Button asChild variant="link" className="mt-6 font-black uppercase text-xs tracking-widest text-highlight">
              <a href="/phones">View all listings</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
