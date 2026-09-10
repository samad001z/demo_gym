/**
 * Unsplash source photography.
 *
 * These are real, verified photo IDs, not stock of the actual branches. Swap
 * each `image` field in content.ts for a real Fitness Edge photograph before
 * launch; the component API does not change when you do.
 *
 * Deliberate rule: no stock face is ever placed under a real person's name.
 * The founder and the coaches are presented through their record, not through
 * a photograph of someone else.
 */
export function photo(id: string, width: number, opts?: { grayscale?: boolean }) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: "72",
  });
  if (opts?.grayscale) params.set("sat", "-100");
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

/** A 1x1 near-black pixel, used as the blur placeholder on every photo. */
export const BLUR =
  "data:image/gif;base64,R0lGODlhAQABAIABAAoKCwAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==";
