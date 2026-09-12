import type { Metadata } from "next";
import { business, entitySummary } from "./content";

/**
 * The origin used by structured-data URLs and internal links.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL   - set this once the real domain is attached
 *   2. VERCEL_PROJECT_PRODUCTION_URL - the project's production domain, so a
 *      fresh Vercel import is correct with zero configuration
 *   3. the client's own domain, for local builds
 *
 * Hardcoding the domain would make every preview deploy self-canonicalise to
 * a site it is not, which is the fastest way to lose a local ranking.
 */
export const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : business.url)
).replace(/\/+$/, "");

/**
 * Preview and development deployments must never be indexed. This demo is a
 * public repo deploying to a public URL, and an indexed copy would compete
 * with the client's real site for its own branded terms.
 */
export const NOINDEX =
  process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";

export function canonical(path = "/") {
  return new URL(path, SITE).toString();
}

/**
 * Page metadata intentionally contains no canonical, social-preview, or
 * keyword fields because this is a private demo.
 */
export function pageMeta({
  title,
  description = entitySummary,
}: {
  title: string;
  description?: string;
}): Metadata {
  return {
    title,
    description,
    robots: { index: false, follow: false },
  };
}

/* -------------------------------------------------------------------------- */

/** Renders a JSON-LD block. Content is authored, never user input. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumbs. Emitted on every page below the root so search engines show
 * the location hierarchy instead of a bare URL in the result.
 */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: canonical(t.path),
    })),
  };
}

/** "6:00 am - 10:00 pm" -> { opens: "06:00", closes: "22:00" } */
export function toSchemaHours(window: string) {
  const to24 = (raw: string) => {
    const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
    if (!m) return null;
    let h = Number(m[1]) % 12;
    if (m[3].toLowerCase() === "pm") h += 12;
    return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
  };
  const [from, till] = window.split("-");
  const opens = to24(from ?? "");
  const closes = to24(till ?? "");
  return opens && closes ? { opens, closes } : null;
}

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * One HealthClub node per branch.
 *
 * `streetAddress` and `telephone` are included only where the demo has a
 * placeholder or approved branch detail.
 */
export function branchSchema(branch: {
  slug: string;
  name: string;
  hours: { window: string; note?: string }[];
  area: string;
  address?: string;
  phone?: string;
  nearbyAreas?: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": canonical(`/gyms/${branch.slug}`) + "#gym",
    name: `${business.name} ${branch.name}`,
    description: `${business.name} gym in ${branch.name}, ${business.city}. ${branch.area}`,
    url: canonical(`/gyms/${branch.slug}`),
    parentOrganization: { "@id": canonical("/") + "#organization" },
    address: {
      "@type": "PostalAddress",
      addressLocality: branch.name,
      addressRegion: "Telangana",
      addressCountry: "IN",
      ...(branch.address ? { streetAddress: branch.address } : {}),
    },
    // The neighbourhoods this floor actually serves, not just "Hyderabad".
    // This is what lets a branch surface for a "gym near <area>" query.
    areaServed: [
      { "@type": "City", name: business.city },
      ...(branch.nearbyAreas ?? []).map((name) => ({ "@type": "Place", name })),
    ],
    ...(branch.phone ? { telephone: branch.phone } : {}),
    openingHoursSpecification: branch.hours
      .map((h) => {
        const t = toSchemaHours(h.window);
        return t
          ? { "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, ...t }
          : null;
      })
      .filter(Boolean),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    amenityFeature: [
      "Cardio zone",
      "Strength and free weights",
      "Functional training area",
      "Group class studio",
      "Personal lockers",
      "Showers",
      "Nutrition cafe",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  };
}
