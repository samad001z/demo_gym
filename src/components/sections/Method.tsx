import Image from "next/image";
import { Reveal, RevealList, RevealItem } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { method, amenities } from "@/lib/content";

/**
 * Bento. Eight cells for eight pieces of content: six method steps, one photo
 * and one amenities panel. No empty tiles, and three of the eight carry
 * something other than text so the grid does not read as a wall of cards.
 */
export function Method() {
  return (
    <section className="bg-carbon py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <MaskReveal><h2 className="display max-w-[18ch] text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
            No one-size-fits-all. Ever.
          </h2></MaskReveal>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-smoke">
            Whether you are starting from nothing, coming back from an injury, or
            training for a stage, the shape of the work is the same and the plan
            is not.
          </p>
        </Reveal>

        <RevealList className="mt-14 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
          {/* photo cell, spans two on desktop */}
          <RevealItem className="relative min-h-[220px] overflow-hidden bg-slab sm:col-span-2 lg:row-span-2">
            <Image
              src={photo("photo-1550345332-09e3ac987658", 900, { grayscale: true })}
              alt="Member working through a set of ring rows in a dim training hall"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-void/35" />
          </RevealItem>

          {method.map((m) => (
            <RevealItem
              key={m.title}
              className="group flex min-h-[200px] flex-col justify-end bg-slab p-6 transition-colors duration-300 hover:bg-void sm:p-7"
            >
              <span
                aria-hidden
                className="mb-auto h-[3px] w-8 bg-ember transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-14"
              />
              <h3 className="display mt-6 text-[1.75rem] text-bone">{m.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-smoke">{m.body}</p>
            </RevealItem>
          ))}

          {/* amenities cell, tinted so the grid has a third texture */}
          <RevealItem className="relative flex min-h-[200px] flex-col justify-between bg-slab bg-gradient-to-br from-ember/15 via-transparent to-transparent p-6 sm:col-span-2 sm:p-8 lg:col-span-2">
            <span aria-hidden className="mb-auto block h-[3px] w-8 bg-ember" />
            <h3 className="display mt-6 text-[1.75rem] text-bone">On every floor</h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {amenities.map((a) => (
                <li
                  key={a}
                  className="text-[15px] leading-snug text-smoke"
                >
                  {a}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealList>
      </div>
    </section>
  );
}
