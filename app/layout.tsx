import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReferralTracker } from "@/components/referral-tracker";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SRE Affiliate Program - Turn Your Network Into Passive Income",
    template: "%s | SRE Affiliate Program"
  },
  description: "Join the SRE Affiliate Program and earn lifetime commissions. Multi-tier rewards, instant payouts, and powerful tools to grow your network.",
  keywords: ["affiliate program", "passive income", "referral rewards", "SRE", "multi-tier marketing", "developer tools", "tech affiliate"],
  authors: [{ name: "SRE Team" }],
  creator: "SRE Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sre-affiliate.com",
    title: "SRE Affiliate Program - Turn Your Network Into Passive Income",
    description: "Join the SRE Affiliate Program and earn lifetime commissions. Multi-tier rewards, instant payouts, and powerful tools to grow your network.",
    siteName: "SRE Affiliate Program",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SRE Affiliate Program Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SRE Affiliate Program - Turn Your Network Into Passive Income",
    description: "Join the SRE Affiliate Program and earn lifetime commissions. Multi-tier rewards, instant payouts, and powerful tools to grow your network.",
    images: ["/og-image.png"],
    creator: "@sre_affiliate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ReferralTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
