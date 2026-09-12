import Image from "next/image";
import { Reveal, RevealList, RevealItem } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { method, business } from "@/lib/content";

/**
 * The gym's approach section uses the existing split layout and motion.
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
                Built around
                <br />
                your starting point
              </h2></MaskReveal>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-smoke">
                <p>
                  {business.name} is built around practical coaching, useful equipment
                  and programmes that meet people at their current fitness level.
                </p>
                <p>
                  The team combines consultation, programming, nutrition guidance,
                  weekly review and recovery so training can fit real life.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-edge border border-seam">
                {/* The existing stock image keeps the approved layout intact. */}
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
                How the team works
              </p>
            </Reveal>

            <RevealList className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
              {method.map((item) => (
                <RevealItem
                  key={item.title}
                  className="group relative flex min-h-[132px] flex-col justify-between bg-carbon p-6 transition-colors duration-300 hover:bg-slab sm:min-h-[168px] sm:p-8"
                >
                  <span
                    aria-hidden
                    className="h-[3px] w-9 bg-ember transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-16"
                  />
                  <span className="display text-3xl text-bone sm:text-[2.25rem]">
                    {item.title}
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
