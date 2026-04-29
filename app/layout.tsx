import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

/* ── Brand Fonts ─────────────────────────────────────────────
   Cormorant Garamond — elegant serif for headings & display
   Inter — clean sans-serif for body copy & UI
──────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* ── Brand Metadata ──────────────────────────────────────────*/
export const metadata: Metadata = {
  title: {
    default: "JUUNÉ Skin Atelier — Luxury Skincare",
    template: "%s | JUUNÉ Skin Atelier",
  },
  description:
    "Discover JUUNÉ Skin Atelier — a curated luxury skincare experience. Premium formulations crafted for radiant, effortless skin.",
  keywords: ["luxury skincare", "premium beauty", "skin atelier", "JUUNÉ", "aesthetic clinic"],
  authors: [{ name: "JUUNÉ Skin Atelier" }],
  creator: "JUUNÉ Skin Atelier",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "JUUNÉ Skin Atelier — Luxury Skincare",
    description: "Premium skincare curated for radiant, effortless skin.",
    siteName: "JUUNÉ Skin Atelier",
  },
  twitter: {
    card: "summary_large_image",
    title: "JUUNÉ Skin Atelier — Luxury Skincare",
    description: "Premium skincare curated for radiant, effortless skin.",
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
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
