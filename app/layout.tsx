import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { Courier_Prime } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/custom-cursor";
import { ThemeProvider } from "@/components/theme-provider";
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
  title: " | Medical AI Engineer",
  description: "Medical AI Enthusiast with Full Stack Web Development Skills.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Web Development",
    "Medical AI Engineer",
    "Arkar",
  ],
  authors: [{ name: "Arkar" }],
  openGraph: {
    title: "Arkar | Medical AI Engineer",
    description:
      "Medical AI Enthusiast with Full Stack Web Development Skills.",
    type: "website",
    url: "https://arkarchanmyae.vercel.app",
    siteName: "Arkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkar | Medical AI Engineer",
    description:
      "Medical AI Enthusiast with Full Stack Web Development Skills.",
  },
  icons: {
    icon: [
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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
