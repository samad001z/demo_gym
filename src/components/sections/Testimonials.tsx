import { Reveal, RevealList, RevealItem } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { testimonials } from "@/lib/content";

/**
 * Reviews as published by the gym, trimmed to three lines each.
 *
 * Monogram initials rather than avatars: these are real members and the site
 * ships with stock imagery, so nobody's name gets a stranger's face attached.
 */
function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function Testimonials() {
  return (
    <section className="border-y border-seam bg-carbon py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <MaskReveal><h2 className="display max-w-[16ch] text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
            What members say
          </h2></MaskReveal>
        </Reveal>

        {/* Masonry-ish columns so the cards do not lock into a rigid grid and
            short quotes are not padded out to match tall ones. */}
        <RevealList className="mt-14 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="mb-5 break-inside-avoid rounded-edge border border-seam bg-void p-6 sm:p-7"
            >
              <blockquote className="text-lg leading-relaxed text-bone">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-seam pt-5">
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-edge bg-ember font-display text-base font-bold tracking-wide text-void"
                >
                  {initials(t.name)}
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-base font-semibold uppercase tracking-[0.08em] text-bone">
                    {t.name}
                  </span>
                  <span className="block text-sm text-ash">
                    Member, {t.place}
                  </span>
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
