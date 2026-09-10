import Link from "next/link";
import { RevealList, RevealItem } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { branches, business } from "@/lib/content";

/**
 * Schematic plot of the seven branches across Hyderabad.
 *
 * Deliberately not a real map tile: an embedded map is a third-party request,
 * a consent problem and an API key, and none of that buys anything here. The
 * question a visitor actually has is "which one is on my side of the city",
 * and a coordinate plot answers it in one glance with zero network cost.
 *
 * Positions come from `mapPosition` in content.ts, as percentages where
 * x runs west to east and y runs north to south.
 *
 * Accessibility: this is a supplementary view, never the only way through.
 * Every pin is a real link named after its branch, and the full branch list
 * with hours sits directly below it. The frame, grid and compass labels are
 * decoration and are hidden from assistive tech.
 */
export function BranchMap() {
  return (
    <section aria-labelledby="map-heading" className="border-b border-seam py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <MaskReveal>
              <h2 id="map-heading" className="display text-4xl sm:text-5xl">
                Where they are
              </h2>
            </MaskReveal>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-smoke">
              Four floors across west {business.city}, two in the centre and one
              in the south east. One membership covers all of them.
            </p>

            <dl className="mt-8 space-y-3 border-t border-seam pt-6 text-sm">
              <div className="flex items-baseline gap-3">
                <dt className="flex items-center gap-2 text-smoke">
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 bg-ember" />
                  Open all day
                </dt>
                <dd className="text-ash">Gachibowli, 6am to 10pm</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="flex items-center gap-2 text-smoke">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 border border-smoke"
                  />
                  Split timings
                </dt>
                <dd className="text-ash">Morning and evening windows</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <div className="relative aspect-[3/5] w-full overflow-hidden rounded-edge border border-seam bg-carbon sm:aspect-[16/10]">
              {/* Coordinate grid. Kept faint: it organises the plot rather
                  than decorating it, which is the only reason to draw one. */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.55]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-seam) 1px, transparent 1px), linear-gradient(to bottom, var(--color-seam) 1px, transparent 1px)",
                  backgroundSize: "12.5% 12.5%",
                }}
              />

              {/* Orientation labels, so the plot is readable without a legend */}
              <span
                aria-hidden
                className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-ash sm:text-xs"
              >
                West
              </span>
              <span
                aria-hidden
                className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-ash sm:text-xs"
              >
                East
              </span>

              <RevealList className="absolute inset-0">
                {branches.map((b, i) => (
                  <RevealItem
                    key={b.slug}
                    className="absolute"
                    style={{
                      left: `${b.mapPosition.x}%`,
                      top: `${b.mapPosition.y}%`,
                    }}
                  >
                    <Link
                      href={`/gyms/${b.slug}`}
                      className="group/pin absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-edge p-2"
                    >
                      <span
                        aria-hidden
                        className={[
                          "flex h-7 w-7 items-center justify-center rounded-edge border text-[11px] font-semibold transition-colors duration-200 ease-[var(--ease-out)]",
                          b.continuous
                            ? "border-ember bg-ember text-void"
                            : "border-seam-2 bg-slab text-smoke group-hover/pin:border-ember group-hover/pin:text-ember group-focus-visible/pin:border-ember",
                        ].join(" ")}
                      >
                        <span className="tnum md:hidden">{i + 1}</span>
                        <span
                          className="hidden h-2 w-2 bg-current md:block"
                        />
                      </span>

                      {/* Labels would collide at phone widths, so the pins
                          carry a number there and the numbered list below
                          acts as the key. */}
                      <span className="hidden whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.1em] text-smoke transition-colors duration-200 group-hover/pin:text-bone md:block">
                        {b.name}
                      </span>
                      <span className="sr-only">
                        {b.name} branch, {b.area}
                      </span>
                    </Link>
                  </RevealItem>
                ))}
              </RevealList>
            </div>

            <p className="mt-4 text-xs text-ash md:hidden">
              Pins are numbered to match the branch list below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
