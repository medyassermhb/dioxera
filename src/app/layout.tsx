// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dioxera.com'), // Replace with your production URL
  title: {
    default: "DIOXERA | Molecular Purity Systems",
    template: "%s | DIOXERA"
  },
  description: "High-end CDL generators and advanced water purification technology.",
  keywords: ["CDL generator", "water purification", "Dioxera 3000", "molecular purity"],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dioxera.com",
    siteName: "DIOXERA",
    title: "DIOXERA | Molecular Purity Systems",
    description: "High-end CDL generators and advanced water purification technology.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIOXERA | Molecular Purity Systems",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#0a0a0a] text-white`}>
        <CartDrawer />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}