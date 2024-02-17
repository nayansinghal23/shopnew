import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopNew",
  description: "Your favourite Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="false">
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
