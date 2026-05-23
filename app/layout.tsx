import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { Courier_Prime } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const _ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuuta | Software Engineer & Designer",
  description:
    "Welcome to my developer portfolio. Specializing in high-performance web development, mobile applications, and premium interactive designs.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "Portfolio",
    "Yuuta",
  ],
  authors: [{ name: "Yuuta" }],
  openGraph: {
    title: "Yuuta | Software Engineer & Designer",
    description:
      "Welcome to my developer portfolio. Specializing in high-performance web development, mobile applications, and premium interactive designs.",
    type: "website",
    url: "https://yuuta.dev",
    siteName: "Yuuta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuuta | Software Engineer & Designer",
    description:
      "Welcome to my developer portfolio. Specializing in high-performance web development, mobile applications, and premium interactive designs.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
