import { StarIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./ui/Reveal";
import { MaskReveal } from "./ui/motion-parts";

/**
 * Verbatim excerpts from a branch's public Google listing.
 *
 * Rendered visibly but deliberately NOT emitted as schema.org `Review` nodes.
 * Review markup requires a named author, and these excerpts arrive without
 * one; inventing authors to satisfy the schema would be exactly the kind of
 * fabricated credibility signal that earns a manual action. The verified
 * `aggregateRating` on the branch node already carries the rating claim, and
 * it is sourced from the same public listing.
 *
 * Quotes are shown as-is, including their original punctuation, and the
 * heading names Google explicitly so nobody reads them as testimonials the
 * gym wrote about itself.
 */
export function BranchReviews({
  branchName,
  excerpts,
  rating,
  reviewCount,
  mapsUrl,
}: {
  branchName: string;
  excerpts: readonly string[];
  rating?: number;
  reviewCount?: number;
  mapsUrl?: string;
}) {
  if (!excerpts.length) return null;

  return (
    <section
      aria-labelledby="branch-reviews-heading"
      className="border-t border-seam py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <MaskReveal>
              <h2 id="branch-reviews-heading" className="display text-4xl sm:text-5xl">
                What {branchName} members say on Google
              </h2>
            </MaskReveal>

            {rating && reviewCount && (
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-smoke">
                <span className="flex items-center gap-1.5 text-ember">
                  <StarIcon size={19} weight="fill" aria-hidden />
                  <span className="tnum font-display text-2xl font-semibold">
                    {rating}
                  </span>
                </span>
                <span className="text-[15px]">
                  from {reviewCount.toLocaleString("en-IN")} reviews
                </span>
              </p>
            )}

            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ember transition-colors hover:text-ember-lift"
              >
                Read them on Google
                <ArrowUpRightIcon size={14} weight="bold" aria-hidden />
              </a>
            )}
          </div>

          <div className="lg:col-span-8">
            {/* auto-fit rather than a fixed column count: the excerpt list is
                whatever the listing yields, and a hard 2-col grid leaves a
                blank tile on an odd number of them */}
            <ul className="grid gap-px bg-seam sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {excerpts.map((quote, i) => (
                <Reveal
                  key={quote}
                  as="li"
                  delay={i * 0.05}
                  className="bg-carbon p-6 sm:p-7"
                >
                  <blockquote className="text-[17px] leading-relaxed text-bone">
                    {quote}
                  </blockquote>
                  <p className="mt-4 border-t border-seam pt-4 text-xs text-ash">
                    Google review, {branchName}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
