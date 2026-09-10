"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveals.
 *
 * Motivation: sections carry a reading order, and the reveal enforces it so
 * the eye lands on the headline before the supporting copy.
 *
 * Same rule as motion-parts.tsx: `useReducedMotion()` is null on the server
 * and on the first client render, so it never decides the shape of the tree.
 * Structure is fixed; only the animated values change. Transform and opacity
 * only, and a `data-reveal` hook so the no-JS fallback in globals.css can
 * force everything visible when scripting is off.
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      data-reveal
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </Tag>
  );
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/**
 * Staggered container. Parent and children must live in the same client tree,
 * which is why RevealItem is exported alongside rather than in its own file.
 */
export function RevealList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** For items that carry their own position, e.g. plotted map pins. */
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className={className}
      style={style}
      variants={
        reduce
          ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE_OUT },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
