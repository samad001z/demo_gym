"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "motion/react";

/*
 * A rule that governs every component in this file:
 *
 * `useReducedMotion()` returns null on the server and on the first client
 * render, then resolves. So it may NEVER decide the shape of the tree - a
 * component that returns one <div> on the server and two on the client throws
 * React #418, hydration fails, and interactivity goes with it.
 *
 * Structure is therefore always identical. Only animation VALUES branch.
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/* ---------------------------------------------------------------------------
   ScrollProgress
   Tier: seen once per session.  Purpose: state indication - the page is long
   and branch-heavy, and the bar answers "how much is left" without a label.
   Tool: Motion useScroll, never a scroll listener. Scroll-linked motion is
   linear by definition; the spring only removes trackpad jitter.
--------------------------------------------------------------------------- */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  // A progress bar IS the information, so it still tracks position under
  // reduced motion. It just does so without the spring smoothing.
  return (
    <motion.div
      aria-hidden
      style={{
        scaleX: reduce ? scrollYProgress : smoothed,
        transformOrigin: "0% 50%",
      }}
      className="absolute inset-x-0 bottom-0 h-[2px] bg-ember"
    />
  );
}

/* ---------------------------------------------------------------------------
   HeroParallax
   Tier: once per session.  Purpose: spatial consistency - the photograph sits
   behind the type, and moving it slower than the page says so.
   Full transform string, because the x/y shorthands are not hardware
   accelerated and drop frames on scroll. Parallax is a classic vestibular
   trigger, so the travel goes to zero under reduced motion.
--------------------------------------------------------------------------- */
export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const travel = reduce ? 0 : 90;
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    ["translate3d(0, 0px, 0)", `translate3d(0, ${travel}px, 0)`],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden lg:left-[46%]">
      {/* over-sized so the drift never exposes an edge */}
      <motion.div style={{ transform }} className="absolute -inset-y-[6%] inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Magnetic
   Tier: rare - one primary CTA, seen once or twice a visit.  Purpose:
   feedback, plus the delight budget a marketing hero is allowed.
   Motion values kept OUT of React state, so pointer movement never re-renders
   the tree. Spring, because the motion has to carry velocity through an
   interruption when the pointer reverses. Capped at 6px: enough to feel, not
   enough to look like a gimmick.
--------------------------------------------------------------------------- */
const SPRING = { stiffness: 260, damping: 22, mass: 0.6 } as const;
const PULL = 6;

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const transform = useTransform(
    [sx, sy] as [MotionValue<number>, MotionValue<number>],
    ([x, y]: number[]) => `translate3d(${x}px, ${y}px, 0)`,
  );

  return (
    <motion.span
      ref={ref}
      style={{ transform }}
      className={["inline-block", className].filter(Boolean).join(" ")}
      onPointerMove={(e) => {
        // Coarse pointers fire a single synthetic move on tap. Ignore those,
        // and do nothing at all when motion is reduced.
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        mx.set(Math.max(-1, Math.min(1, dx)) * PULL);
        my.set(Math.max(-1, Math.min(1, dy)) * PULL);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ---------------------------------------------------------------------------
   MaskReveal
   Tier: once per section on one scroll pass.  Purpose: hierarchy - the
   headline resolves before the copy beneath it, so the eye lands in reading
   order rather than on whichever line has the most contrast.

   The trigger lives on the OUTER element and the inner one is driven by
   variant name. That split is load-bearing: IntersectionObserver computes its
   ratio against every ancestor clip rect, so an element translated fully
   outside its own overflow-hidden wrapper reports a ratio of 0 no matter
   where the page is scrolled. Put whileInView on the inner element and it
   deadlocks - it must be visible to be told to become visible, so it never
   animates at all. An inset() clip-path on the element itself deadlocks
   identically, for the same reason. The wrapper is never clipped, so it
   observes reliably and hands the state down.
--------------------------------------------------------------------------- */
export function MaskReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={["overflow-hidden pb-[0.14em]", className].filter(Boolean).join(" ")}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        data-reveal
        variants={
          reduce
            ? // A wipe is pure decoration on a static heading, so there is
              // nothing worth degrading to a fade. Show it outright.
              { hidden: { opacity: 1 }, shown: { opacity: 1 } }
            : {
                hidden: { transform: "translate3d(0, 100%, 0)", opacity: 0 },
                shown: { transform: "translate3d(0, 0%, 0)", opacity: 1 },
              }
        }
        transition={{
          duration: reduce ? 0 : 0.7,
          delay: reduce ? 0 : delay,
          ease: EASE_OUT,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
