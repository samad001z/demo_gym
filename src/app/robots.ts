import type { MetadataRoute } from "next";
import { canonical, NOINDEX } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // A preview deployment must not be crawled at all. Serving the permissive
  // ruleset from every branch build is how demo copies end up indexed.
  if (NOINDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Answer engines are allowed deliberately: being cited in an AI answer
      // is the point of the llms.txt and the answer blocks on each page.
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"], allow: "/" },
      { userAgent: ["ClaudeBot", "Claude-User", "Claude-SearchBot"], allow: "/" },
      { userAgent: ["PerplexityBot", "Perplexity-User"], allow: "/" },
      { userAgent: ["Google-Extended", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: canonical("/sitemap.xml"),
    host: canonical("/"),
  };
}
