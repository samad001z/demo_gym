import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/content";
import { canonical, SITE, NOINDEX } from "@/lib/seo";

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

const title = `Best Gym in Hyderabad | ${business.name} | 7 Branches Since 2011`;
const description =
  `${business.name} is one of Hyderabad's longest-running gym chains, open since 2011 across 7 branches. Internationally certified personal training, HIIT, yoga and nutrition. Membership from Rs 999.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  // Sub-pages set their own title; this template keeps the brand on the end
  // without any page having to repeat it.
  title: { default: title, template: `%s | ${business.name}` },
  description,
  applicationName: business.name,
  category: "Health & Fitness",
  alternates: { canonical: canonical("/") },
  keywords: [
    "best gym in Hyderabad",
    "gym in Hyderabad",
    "fitness centre Hyderabad",
    "personal training Hyderabad",
    "gym near me Hyderabad",
    "Gachibowli gym",
    "Kondapur gym",
    "Begumpet gym",
    "HIIT classes Hyderabad",
    "women only gym timings Hyderabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: canonical("/"),
    siteName: business.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  // Preview deploys are excluded outright; see NOINDEX in lib/seo.
  robots: NOINDEX
    ? { index: false, follow: false, nocache: true }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
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
