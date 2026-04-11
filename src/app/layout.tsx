import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onyx.thomaspercival.dev"),
  title: "Onyx - Xbox Achievement Tracker",
  description:
    "Track your Xbox achievements in style. Earn coins based on your completion progress and compete for the ultimate Onyx status.",
  openGraph: {
    title: "Onyx - Xbox Achievement Tracker",
    description:
      "Track your Xbox achievements in style. Earn coins based on your completion progress and compete for the ultimate Onyx status.",
    url: "https://onyx.thomaspercival.dev",
    siteName: "Onyx",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Onyx - Xbox Achievement Tracker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onyx - Xbox Achievement Tracker",
    description:
      "Track your Xbox achievements in style. Earn coins based on your completion progress and compete for the ultimate Onyx status.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
