import type { NextConfig } from "next";

/**
 * Baseline security headers.
 *
 * Deliberately no Content-Security-Policy. A strict CSP on an App Router site
 * needs per-request nonces threaded through the framework's inline bootstrap
 * scripts, which turns every page dynamic and costs the static prerender the
 * whole site currently gets. A half-configured CSP that has to be loosened to
 * 'unsafe-inline' protects nothing while implying it does, so this ships the
 * headers that are unambiguously worth having and leaves CSP as a deliberate
 * follow-up rather than a broken checkbox.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
    // Photography is swapped for real branch shots before launch; a long TTL
    // is safe because the URLs are content-addressed by Unsplash photo id.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
