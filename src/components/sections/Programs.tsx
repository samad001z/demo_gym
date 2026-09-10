"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { programs } from "@/lib/content";

/**
 * Horizontal scroll-snap rail. Six programmes is too many for a grid without
 * either shrinking each one to a label or building a wall of identical cards,
 * so breadth goes sideways and each card keeps a real photograph.
 *
 * Native scroll does the work. The arrows are an affordance on top of it, and
 * the rail stays keyboard and touch scrollable with or without them.
 */
export function Programs() {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="programs" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <MaskReveal><h2 className="display max-w-[15ch] text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
              What you can train here
            </h2></MaskReveal>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={edge.start}
                aria-label="Previous programmes"
                className="flex h-12 w-12 items-center justify-center rounded-edge border border-seam text-bone transition-colors hover:border-ember hover:text-ember disabled:opacity-35 disabled:hover:border-seam disabled:hover:text-bone"
              >
                <ArrowLeftIcon size={18} weight="bold" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={edge.end}
                aria-label="More programmes"
                className="flex h-12 w-12 items-center justify-center rounded-edge border border-seam text-bone transition-colors hover:border-ember hover:text-ember disabled:opacity-35 disabled:hover:border-seam disabled:hover:text-bone"
              >
                <ArrowRightIcon size={18} weight="bold" aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* The rail lives inside the page container so its first card lines up
          with the headline, then bleeds out with a negative margin. */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div
          ref={rail}
          onScroll={sync}
          tabIndex={0}
          role="group"
          aria-label="Training programmes, scroll horizontally"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8"
        >
          {programs.map((p) => (
            <article
              key={p.slug}
              className="group relative flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-edge border border-seam bg-carbon sm:w-[380px] lg:w-[420px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo(p.image, 800)}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 80vw, 420px"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="display text-3xl text-bone">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-smoke">{p.summary}</p>
              </div>

              <span
                aria-hidden
                className="h-[3px] w-0 bg-ember transition-[width] duration-500 ease-[var(--ease-out)] group-hover:w-full"
              />
            </article>
          ))}
          {/* trailing spacer so the last card can snap clear of the edge */}
          <div aria-hidden className="w-1 shrink-0 sm:w-4" />
        </div>
      </div>
    </section>
  );
}
