import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

/**
 * One radius (4px) and one action accent, everywhere.
 *
 * Solid is void-on-ember at 5.9:1; outline and ghost are bone-on-void at 18:1.
 * The solid hover HEATS UP rather than darkening (ember -> ember-lift), which
 * is both the right metaphor and the only direction that keeps the dark label
 * above 4.5:1 - darkening the fill drops it to 4.48:1 and fails AA.
 */
// `inline-flex` is deliberately NOT in the base string: it collides with a
// `hidden` utility passed via className, and which one wins depends on
// stylesheet order rather than attribute order. Callers that need to hide a
// button responsively wrap it instead.
const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-edge font-display font-semibold uppercase tracking-[0.1em] whitespace-nowrap " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-ember text-void hover:bg-ember-lift",
  outline:
    "border border-seam-2 text-bone hover:border-ember hover:text-ember bg-void/40 backdrop-blur-sm",
  ghost: "text-smoke hover:text-bone",
};

const sizes: Record<Size, string> = {
  // 48px and 56px tall: both clear the 44px minimum touch target.
  md: "h-12 px-5 text-[13px]",
  lg: "h-14 px-7 text-sm",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "solid",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "solid",
  size = "md",
  className,
  external,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
}) {
  const cls = classes(variant, size, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}
