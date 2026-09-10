"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { faqs } from "@/lib/content";

/**
 * Accordion. Motion here is a state transition: the height animation shows
 * where the new text came from instead of snapping the page down under the
 * reader's eye.
 *
 * Built on buttons with aria-expanded rather than <details>, because the panel
 * needs to animate and native details cannot be animated reliably yet.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <MaskReveal><h2 className="display text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
                Questions,
                <br />
                answered
              </h2></MaskReveal>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-seam">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="border-b border-seam">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex min-h-[76px] w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-ember"
                      >
                        <span className="display text-xl text-bone transition-colors sm:text-2xl">
                          {f.q}
                        </span>
                        <span
                          aria-hidden
                          className={[
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-edge border transition-[transform,background-color,border-color,color] duration-300 ease-[var(--ease-out)]",
                            isOpen
                              ? "rotate-45 border-ember bg-ember text-void"
                              : "border-seam text-smoke",
                          ].join(" ")}
                        >
                          <PlusIcon size={18} weight="bold" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="panel"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[68ch] pb-7 pr-14 text-[17px] leading-relaxed text-smoke">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
