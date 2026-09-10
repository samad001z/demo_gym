"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { ListIcon, XIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ButtonLink } from "./ui/Button";
import { nav, whatsappHref, business } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import { ScrollProgress } from "./ui/motion-parts";

/**
 * Header height is 68px, inside the 80px cap. Nav renders on one line at lg
 * and collapses to a sheet below that. The condensed-on-scroll state is
 * driven by useScroll, never a scroll event listener.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setStuck(v > 24));

  // Lock the page behind the open sheet, and restore on close or unmount.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        stuck || open
          ? "border-b border-seam bg-void/85 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      {/* Unstuck, the bar floats over hero photography. This scrim keeps the
          wordmark and the menu control legible against the bright top crop. */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void/80 to-transparent transition-opacity duration-300",
          stuck || open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <div className="relative mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label={`${business.name}, back to top`}>
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-edge px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-smoke transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink href={whatsappHref} external variant="solid" size="md">
              <WhatsappLogoIcon size={17} weight="fill" aria-hidden />
              Book a trial
            </ButtonLink>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-12 w-12 items-center justify-center rounded-edge border border-seam text-bone transition-colors hover:border-ember hover:text-ember lg:hidden"
          >
            {open ? <XIcon size={22} aria-hidden /> : <ListIcon size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {stuck && <ScrollProgress />}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="sheet"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-seam bg-void lg:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8">
              <ul className="divide-y divide-seam">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center font-display text-2xl font-bold uppercase tracking-tight text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={whatsappHref}
                external
                size="lg"
                className="mt-5 w-full sm:hidden"
              >
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Book a trial
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
