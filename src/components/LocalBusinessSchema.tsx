import { business, branches, faqs, entitySummary, answers } from "@/lib/content";
import { canonical, branchSchema } from "@/lib/seo";

/**
 * The root structured-data graph.
 *
 * Four node types, cross-referenced by @id so a crawler resolves one entity
 * rather than seven unconnected businesses:
 *
 *   Organization  - the gym itself, the hub every other node points at
 *   WebSite       - enables the sitelinks search box
 *   HealthClub x7 - one per branch, each with its own opening hours
 *   FAQPage       - the home FAQ plus the AEO answer set
 *
 * The graph intentionally contains only general fitness information.
 */
export function LocalBusinessSchema() {
  const graph = [
    {
      "@type": "Organization",
      "@id": canonical("/") + "#organization",
      name: business.name,
      alternateName: business.short,
      description: entitySummary,
      url: canonical("/"),
      areaServed: { "@type": "City", name: business.city },
      address: {
        "@type": "PostalAddress",
        addressLocality: business.city,
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Personal training",
        "Strength and conditioning",
        "HIIT",
        "Yoga",
        "Sports nutrition",
        "Fitness programming",
        "Mobility and recovery",
      ],
      // TODO: add the gym's real social profile URLs here. sameAs is how
      // Google reconciles this Organization with its Business Profile.
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": canonical("/") + "#website",
      url: canonical("/"),
      name: business.name,
      publisher: { "@id": canonical("/") + "#organization" },
      inLanguage: "en-IN",
    },
    ...branches.map((b) => {
      const node = branchSchema(b) as Record<string, unknown>;
      delete node["@context"]; // lives on the graph wrapper instead
      return node;
    }),
    {
      "@type": "FAQPage",
      "@id": canonical("/") + "#faq",
      mainEntity: [...answers, ...faqs.map((f) => ({ q: f.q, a: f.a }))].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
