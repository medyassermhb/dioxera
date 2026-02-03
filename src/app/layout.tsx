// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DIOXERA | Molecular Purity Systems",
  description: "High-end CDL generators and water purification technology.",
  // Explicitly defining the icons
  icons: {
    icon: "/icon.png",
    // You can also add these if you have the files:
    // apple: "/apple-icon.png",
    // shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartDrawer />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}