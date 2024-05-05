import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yasd tech",
  description: "yasd tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <GoogleAnalytics /> */}</head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
