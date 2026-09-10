import { ticker } from "@/lib/content";

/**
 * The one marquee on the page. Motivation: ten disciplines is breadth, not
 * detail. None of them needs its own card, and a static list of ten would eat
 * a full section to say "we do a lot of things".
 *
 * Pure CSS transform, duplicated track for a seamless loop, and it stops dead
 * under prefers-reduced-motion (handled in globals.css).
 */
export function Ticker() {
  const items = [...ticker, ...ticker];

  return (
    <section
      aria-label="Disciplines trained at Fitness Edge"
      className="overflow-hidden border-y border-seam bg-carbon py-5"
    >
      <div className="flex w-max animate-marquee items-center will-change-transform">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center" aria-hidden={i >= ticker.length}>
            <span className="font-display text-2xl font-bold uppercase tracking-tight text-bone sm:text-3xl">
              {t}
            </span>
            <span className="mx-7 h-2 w-2 shrink-0 bg-ember sm:mx-9" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
