import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsappFloating from "@/components/WhatsappFloating";
import { Toaster } from "sonner";

function getMetadataBase() {
  const rawUrl = process.env.NEXTAUTH_URL?.trim();
  try {
    return new URL(rawUrl || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  title: "Poonam Cycle & Toy World",
  description: "Cycle and toy shop website for Kolhapur",
  metadataBase: getMetadataBase(),
  openGraph: {
    title: "Poonam Cycle & Toy World",
    description: "Premium cycles, kids rides, and electric toys in Kolhapur.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Poonam Cycle & Toy World",
    description: "Premium cycles, kids rides, and electric toys in Kolhapur."
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Poonam Cycle & Toy World",
              telephone: "+91-7588267528",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Near Kaswam Hospital, Gandhinagar",
                addressLocality: "Kolhapur",
                addressRegion: "Maharashtra",
                addressCountry: "IN"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
