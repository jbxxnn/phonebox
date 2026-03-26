import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface WhatsAppButtonProps {
  phone: string;
  productName: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
}

export function WhatsAppButton({
  phone,
  productName,
  variant = "default",
  className,
}: WhatsAppButtonProps) {
  const link = getWhatsAppLink(phone, productName);

  return (
    <Button asChild variant={variant} className={className}>
      <Link href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Order via WhatsApp
      </Link>
    </Button>
  );
}
