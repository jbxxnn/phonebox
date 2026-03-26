import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "./whatsapp-button";
import Image from "next/image";
import Link from "next/link";

interface PhoneCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  whatsapp_number: string;
  is_featured?: boolean;
  specs?: any;
}

export function PhoneCard({
  id,
  name,
  brand,
  price,
  image,
  whatsapp_number,
  is_featured,
  specs,
}: PhoneCardProps) {
  const ram = specs?.RAM || specs?.ram;
  const storage = specs?.Storage || specs?.storage || specs?.ROM || specs?.rom;

  return (
    <Card className="overflow-hidden group transition-all duration-300 border-2 border-foreground/10 hover:border-highlight shadow-[4px_4px_0px_rgba(45,58,58,0.1)] hover:shadow-[6px_6px_0px_rgba(61,122,106,0.3)] bg-card">
      <Link href={`/phones/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted border-b-2 border-foreground/10">
          <Image
            src={image || "/placeholder-phone.jpg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {is_featured && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground rounded-none border-0 font-bold uppercase text-[10px] tracking-widest px-2 py-1">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      <CardHeader className="p-4 pb-2">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-highlight uppercase tracking-[0.2em] font-extrabold">
            {brand}
          </p>
          <div className="flex justify-between items-baseline gap-2">
            <CardTitle className="text-lg font-extrabold leading-tight line-clamp-1 uppercase tracking-tighter">
              {name}
            </CardTitle>
            <p className="text-lg font-black text-foreground">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex gap-2 text-[10px] text-muted-foreground">
          {ram && <Badge variant="outline" className="rounded-none border-foreground/20 px-1 font-bold uppercase tracking-tighter">RAM: {ram}</Badge>}
          {storage && <Badge variant="outline" className="rounded-none border-foreground/20 px-1 font-bold uppercase tracking-tighter">ROM: {storage}</Badge>}
          {!ram && !storage && <Badge variant="outline" className="rounded-none border-foreground/20 px-1 font-bold uppercase tracking-tighter italic opacity-50">Verified Specs</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <WhatsAppButton
          phone={whatsapp_number}
          productName={name}
          className="w-full font-extrabold uppercase tracking-widest text-xs h-10 rounded-none bg-highlight hover:bg-highlight/90"
        />
      </CardFooter>
    </Card>
  );
}
