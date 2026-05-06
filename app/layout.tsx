import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsappFloating from "@/components/WhatsappFloating";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Poonam Cycle & Toy World",
  description: "Cycle and toy shop website for Kolhapur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-screen pt-28">{children}</main>
        <Footer />
        <WhatsappFloating />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
