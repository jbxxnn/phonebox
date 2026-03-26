"use client";

import { useTransition } from "react";
import { upsertPhone } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, DollarSign, Video, Info, Image as ImageIcon } from "lucide-react";

interface PhoneFormProps {
  phone?: {
    id: string;
    name: string;
    brand: string;
    price: number;
    whatsapp_number: string;
    review_video_url: string;
    description: string;
    is_featured: boolean;
    images: string[];
    specs: {
      RAM: string;
      Storage: string;
      Camera: string;
      Battery: string;
    };
  };
}

export function PhoneForm({ phone }: PhoneFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await upsertPhone(formData);
    });
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-8 max-w-4xl mx-auto">
      {phone?.id && <input type="hidden" name="id" value={phone.id} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Basic Info */}
        <div className="flex flex-col gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Smartphone className="h-4 w-4" /> Basic Information
              </h3>
              <div className="grid gap-2">
                <Label htmlFor="name">Phone Name</Label>
                <Input id="name" name="name" defaultValue={phone?.name} required placeholder="iPhone 15 Pro Max" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" name="brand" defaultValue={phone?.brand} required placeholder="Apple" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="price" name="price" type="number" defaultValue={phone?.price} required className="pl-9" placeholder="999" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Video className="h-4 w-4" /> Review Details
              </h3>
              <div className="grid gap-2">
                <Label htmlFor="review_video_url">YouTube URL</Label>
                <Input id="review_video_url" name="review_video_url" defaultValue={phone?.review_video_url} placeholder="https://youtube.com/watch?v=..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                <Input id="whatsapp_number" name="whatsapp_number" defaultValue={phone?.whatsapp_number} required placeholder="+1234567890" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox id="is_featured" name="is_featured" defaultChecked={phone?.is_featured} />
                <Label htmlFor="is_featured">Feature on Home Page</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Specs & Images */}
        <div className="flex flex-col gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Info className="h-4 w-4" /> Technical Specs
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ram">RAM</Label>
                  <Input id="ram" name="ram" defaultValue={phone?.specs?.RAM} placeholder="8 GB" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storage">Storage</Label>
                  <Input id="storage" name="storage" defaultValue={phone?.specs?.Storage} placeholder="256 GB" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="camera">Camera</Label>
                  <Input id="camera" name="camera" defaultValue={phone?.specs?.Camera} placeholder="48 MP" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="battery">Battery</Label>
                  <Input id="battery" name="battery" defaultValue={phone?.specs?.Battery} placeholder="5000 mAh" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Images
              </h3>
              <div className="grid gap-2">
                <Label htmlFor="image_url">Main Image URL</Label>
                <Input id="image_url" name="image_url" defaultValue={phone?.images?.[0]} placeholder="https://example.com/phone.jpg" />
                <p className="text-[10px] text-muted-foreground mt-1">Provide an absolute URL for the phone's primary image.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  name="description" 
                  defaultValue={phone?.description}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Detailed description of the phone's condition..."
                ></textarea>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8 pb-12">
        <Button variant="outline" type="button" asChild className="px-8 h-12 rounded-xl">
          <a href="/admin">Cancel</a>
        </Button>
        <Button disabled={isPending} type="submit" className="px-12 h-12 rounded-xl font-bold shadow-lg shadow-primary/20">
          {isPending ? "Saving..." : phone?.id ? "Update Listing" : "Create Listing"}
        </Button>
      </div>
    </form>
  );
}
