import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/content";
import { SITE } from "@/lib/seo";

/**
 * Barlow Condensed for display, Barlow for body. A condensed grotesk is the
 * native voice of athletics signage, and the two share a skeleton so the
 * headline and the body read as one family rather than a pairing.
 */
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const title = `${business.name} | Training and fitness in Hyderabad`;
const description =
  `${business.name} offers strength, cardio, group classes, yoga, nutrition guidance and personal training in Hyderabad.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  // Sub-pages set their own title; this template keeps the brand on the end
  // without any page having to repeat it.
  title: { default: title, template: `%s | ${business.name}` },
  description,
  applicationName: business.name,
  category: "Health & Fitness",
  robots: { index: false, follow: false },
  // TODO: paste the Search Console token here to verify the property.
  // verification: { google: "..." },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // never set maximumScale or userScalable: pinch zoom stays available
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full bg-void">{children}</body>
    </html>
  );
}
