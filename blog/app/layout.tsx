import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
// import GoogleAnalytics from "@/components/GoogleAnalytics";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "yasd tech",
  description: "yasd tech",
};

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics gaId={GA_ID} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
