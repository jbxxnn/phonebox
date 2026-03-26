import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "PhoneResell - Buy Phones Reviewed by Experts",
    template: "%s | PhoneResell"
  },
  description: "High-quality phones reviewed by your favorite YouTube and TikTok creators. Order directly via WhatsApp with verified quality.",
  openGraph: {
    title: "PhoneResell - Expert Reviewed Phones",
    description: "Verified pre-owned smartphones recommended by tech creators.",
    type: "website",
    siteName: "PhoneResell",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhoneResell - Expert Reviewed Phones",
    description: "Verified pre-owned smartphones recommended by tech creators.",
  },
};

const archivo = Archivo({
  variable: "--font-archivo",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} font-sans antialiased bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
