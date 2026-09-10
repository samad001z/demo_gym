import Image from "next/image";
import { Reveal, RevealList, RevealItem } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { founderTitles, business } from "@/lib/content";

/**
 * The founder section. His competitive record is the visual: six title cards
 * stacked as a trophy wall, set against a single quiet photograph.
 *
 * No portrait here on purpose. Imran Khan is a real person and the site ships
 * with stock photography, so his name never sits under a stranger's face.
 * Drop a real photograph into the frame below and the layout absorbs it.
 */
export function Legacy() {
  return (
    <section id="legacy" className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="lg:col-span-5">
            <Reveal>
              <MaskReveal><h2 className="display text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
                The man who
                <br />
                built the floor
              </h2></MaskReveal>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-smoke">
                <p>
                  {business.founder} opened Fitness Edge in {business.founded} after a
                  competitive career that took him from Mr. Osmania to Mr. South India.
                  He was selected for Mr. India. A bike accident ended that run.
                </p>
                <p>
                  What it did not end was the coaching. He is an internationally
                  certified trainer and nutritionist, and he still programmes on the
                  floor. The gym runs on what he learned making his own body do
                  difficult things.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-edge border border-seam">
                {/* TODO: replace with a real photograph of the founder or a
                    branch floor. Same aspect ratio, no layout change needed. */}
                <Image
                  src={photo("photo-1534438327276-14e5300c3a48", 900, { grayscale: true })}
                  alt="Dumbbell rack running the length of a low-lit training floor"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>

          {/* Trophy wall */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ash">
                Competitive record
              </p>
            </Reveal>

            <RevealList className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
              {founderTitles.map((title) => (
                <RevealItem
                  key={title}
                  className="group relative flex min-h-[132px] flex-col justify-between bg-carbon p-6 transition-colors duration-300 hover:bg-slab sm:min-h-[168px] sm:p-8"
                >
                  <span
                    aria-hidden
                    className="h-[3px] w-9 bg-ember transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-16"
                  />
                  <span className="display text-3xl text-bone sm:text-[2.25rem]">
                    {title}
                  </span>
                </RevealItem>
              ))}
            </RevealList>

            <Reveal delay={0.1}>
              <p className="mt-8 border-l-2 border-ember pl-5 text-lg leading-relaxed text-bone">
                Fourteen years later the mission has not moved: get people fit,
                strong and healthy, whatever age they start at.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
