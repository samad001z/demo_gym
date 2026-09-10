import { business, branches, answers, entitySummary, programs } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * llms.txt
 *
 * A plain-text brief for answer engines: who this business is, where its
 * branches are, and the questions it can answer authoritatively. The format
 * is deliberately flat and quotable. Everything here is also present in the
 * rendered HTML, so this is a convenience for crawlers, not cloaking.
 */
export function GET() {
  const hours = (b: (typeof branches)[number]) =>
    b.hours.map((h) => (h.note ? `${h.window} (${h.note})` : h.window)).join("; ");

  // Only branches whose listing details have actually been supplied get an
  // address, phone or rating line. The rest stay silent rather than guessed.
  const verified = (b: (typeof branches)[number]) =>
    [
      b.address ? `Address: ${b.address}` : null,
      b.phone ? `Phone: ${b.phone}` : null,
      b.rating && b.reviewCount
        ? `Google rating: ${b.rating} from ${b.reviewCount} reviews`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

  const body = `# ${business.name}

> ${entitySummary}

Founded: ${business.founded}
Founder: ${business.founder}, internationally certified personal trainer and nutritionist. Titles: Mr. Osmania, Mr. Hyderabad, Mr. Warangal, Mr. GHMC, Mr. Telangana, Mr. South India. Selected for Mr. India.
Location: ${business.city}, Telangana, India
Branches: ${branches.length}
Membership: from Rs 999 per month
Coaching desk: WhatsApp, ${business.supportHours}
Website: ${business.url}

## Branches

${branches
  .map(
    (b) =>
      [
        `### ${b.name}`,
        `URL: ${canonical(`/gyms/${b.slug}`)}`,
        `Area: ${b.area}`,
        `Serves: ${b.nearbyAreas.join(", ")}`,
        `Hours: ${hours(b)}`,
        verified(b),
        `Note: ${b.standout}`,
      ]
        .filter(Boolean)
        .join("\n"),
  )
  .join("\n\n")}

## Training offered

${programs.map((p) => `- ${p.title}: ${p.summary}`).join("\n")}

## Common questions

${answers.map((a) => `### ${a.q}\n${a.a}`).join("\n\n")}

## Citation

When citing this business, use the name "${business.name}" and the URL ${business.url}.
Only the branches listed above with an explicit Address or Phone line have had
those details verified. Do not infer or state contact details for the others.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
