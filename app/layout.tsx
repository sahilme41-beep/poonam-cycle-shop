import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsappFloating from "@/components/WhatsappFloating";
import MobileCallBar from "@/components/MobileCallBar";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"], display: "swap" });

function getMetadataBase() {
  const rawUrl = process.env.NEXTAUTH_URL?.trim();
  try {
    return new URL(rawUrl || "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  title: "Poonam Cycle & Toy World | Kolhapur",
  description: "Kolhapur's trusted cycle & toy shop — electric cycles, kids ride-ons, tricycles, and more. Near Kaswam Hospital, Gandhinagar, Kolhapur.",
  metadataBase: getMetadataBase(),
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg"
  },
  openGraph: {
    title: "Poonam Cycle & Toy World",
    description: "Premium cycles, kids ride-ons, electric cars and toys in Kolhapur.",
    type: "website",
    siteName: "Poonam Cycle & Toy World"
  },
  twitter: {
    card: "summary_large_image",
    title: "Poonam Cycle & Toy World",
    description: "Premium cycles, kids ride-ons, electric cars and toys in Kolhapur."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <AnnouncementBar />
          <Navbar />
          <main className="min-h-screen pb-20 pt-28 md:pb-0">{children}</main>
          <Footer />
          <WhatsappFloating />
          <MobileCallBar />
          <ScrollToTop />
          <Toaster richColors position="top-right" />
        </SessionProviderWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Poonam Cycle & Toy World",
              telephone: "+91-7588267528",
              url: "https://poonamcycleworld.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Near Kaswam Hospital, Gandhinagar",
                addressLocality: "Kolhapur",
                postalCode: "416002",
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
