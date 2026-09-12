"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { whatsappHref } from "@/lib/content";

/**
 * Mobile action bar.
 *
 * Tier: occasional.  Purpose: state indication - once the hero CTA has
 * scrolled away on a phone, the primary action would otherwise be a full
 * scroll back. This keeps it one thumb-reach away.
 *
 * Enters and exits along the same axis it lives on (translateY 100% -> 0),
 * so the path is symmetric. 260ms with the drawer curve; a transition rather
 * than keyframes, because a user flicking up and down can retrigger it twice
 * in a second and keyframes would restart from zero each time.
 *
 * Desktop never sees it: the header CTA is always visible there.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    // Appears once the hero is genuinely behind you, not on the first nudge.
    setShow(v > 900);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-cta"
          initial={reduce ? { opacity: 0 } : { transform: "translate3d(0, 100%, 0)" }}
          animate={reduce ? { opacity: 1 } : { transform: "translate3d(0, 0%, 0)" }}
          exit={reduce ? { opacity: 0 } : { transform: "translate3d(0, 100%, 0)" }}
          transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-seam bg-void/95 backdrop-blur-md sm:hidden"
          // sits above the iOS home indicator
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-3 px-4 pt-3">
            <p className="min-w-0 flex-1 text-[13px] leading-tight text-smoke">
              <span className="block font-display font-semibold uppercase tracking-[0.1em] text-bone">
                Membership pricing on request
              </span>
              Seven branches across Hyderabad
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 shrink-0 items-center gap-2 rounded-edge bg-ember px-5 font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-void transition-colors duration-200 ease-[var(--ease-out)] hover:bg-ember-lift active:translate-y-px"
            >
              <WhatsappLogoIcon size={17} weight="fill" aria-hidden />
              Book a trial
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
