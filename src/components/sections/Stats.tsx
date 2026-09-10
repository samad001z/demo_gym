"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { stats } from "@/lib/content";

/**
 * Count-up on the stat band. Motivation: the numbers ARE the credibility, and
 * counting draws the eye across all four instead of letting it stop at the
 * first. Runs once, off React state at ~60fps for under a second, then stops.
 */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  // Always start at 0. Seeding this with `to` when motion is reduced would
  // render "0" on the server and "14" on the client, which is a text-content
  // hydration mismatch (React #418). The effect below settles it instead.
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    // Reduced motion still gets the real number, it just arrives in one frame
    // rather than counting. Writing it from the rAF callback rather than the
    // effect body keeps the state update out of render.
    const duration = reduce ? 0 : 900;

    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      // strong ease-out, so the number decelerates into its final value
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tnum">
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Fitness Edge in numbers" className="border-y border-seam bg-carbon">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-seam lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-carbon px-5 py-9 sm:px-8 sm:py-12">
            <p className="display text-5xl text-ember sm:text-6xl lg:text-7xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-4 font-display text-base font-semibold uppercase tracking-[0.1em] text-bone">
              {s.label}
            </p>
            <p className="mt-1 text-sm text-ash">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
