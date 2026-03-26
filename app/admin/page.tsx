import { createClient } from "@/lib/supabase/server";
import { deletePhone } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: phones } = await supabase
    .from("phones")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card p-8 border-4 border-foreground shadow-[8px_8px_0px_rgba(45,58,58,0.1)] gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Current Listings</h2>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-highlight">Manage your product catalog</p>
        </div>
        <Button asChild className="font-black uppercase tracking-widest text-xs h-12 px-8 rounded-none bg-highlight shadow-[4px_4px_0px_rgba(61,122,106,0.2)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(61,122,106,0.3)] transition-all">
          <Link href="/admin/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Phone
          </Link>
        </Button>
      </div>

      <div className="border-4 border-foreground bg-card shadow-[12px_12px_0px_rgba(45,58,58,0.05)] overflow-hidden">
        <Table>
          <TableHeader className="bg-foreground text-background">
            <TableRow className="hover:bg-foreground border-b-4 border-foreground">
              <TableHead className="w-[100px] px-8 py-4 font-black uppercase tracking-widest text-[10px] text-background">Image</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] text-background">Phone Details</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] text-background">Price</TableHead>
              <TableHead className="font-black uppercase tracking-widest text-[10px] text-background">Status</TableHead>
              <TableHead className="text-right px-8 font-black uppercase tracking-widest text-[10px] text-background">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phones?.map((phone) => (
              <TableRow key={phone.id} className="hover:bg-highlight/5 border-b-2 border-foreground/5 last:border-0 transition-colors group">
                <TableCell className="px-8 py-6">
                  <div className="relative h-14 w-14 border-2 border-foreground/10 bg-muted shrink-0 overflow-hidden">
                    <Image
                      src={phone.images?.[0] || "/placeholder-phone.jpg"}
                      alt={phone.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-black text-base uppercase tracking-tight">{phone.name}</span>
                    <span className="text-[10px] text-highlight uppercase tracking-[.2em] font-black">{phone.brand}</span>
                  </div>
                </TableCell>
                <TableCell className="font-black text-lg tracking-tight">${phone.price.toLocaleString()}</TableCell>
                <TableCell>
                  {phone.is_featured ? (
                    <span className="inline-flex items-center bg-accent/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent border-2 border-accent/20">
                      Featured
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-muted/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-2 border-foreground/5">
                      Standard
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right px-8 py-6">
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" size="icon" asChild title="Public View" className="h-10 w-10 rounded-none border-2 border-foreground shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                      <Link href={`/phones/${phone.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild title="Edit Content" className="h-10 w-10 rounded-none border-2 border-highlight text-highlight hover:bg-highlight/5 shadow-[3px_3px_0px_rgba(61,122,106,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                      <Link href={`/admin/edit/${phone.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form action={deletePhone}>
                      <input type="hidden" name="id" value={phone.id} />
                      <Button variant="outline" size="icon" type="submit" title="Delete listing" className="h-10 w-10 rounded-none border-2 border-accent text-accent hover:bg-accent/5 shadow-[3px_3px_0px_rgba(196,110,90,0.1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!phones || phones.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-4 opacity-30">
                    <Smartphone className="h-14 w-14" />
                    <p className="font-black uppercase tracking-[.2em] text-xs">No listings found</p>
                    <Button asChild variant="link" className="font-black uppercase text-[10px] tracking-widest text-highlight">
                      <Link href="/admin/new">Create first listing</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper to mimic lucide Smartphone if not manually imported
function Smartphone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
