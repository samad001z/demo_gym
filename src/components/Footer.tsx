import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { branches, nav, business, trainingPages } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-seam bg-void">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-16">
          <div className="lg:col-span-5">
            <Wordmark size="lg" />
            <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-smoke">
              {business.tagline}. Training, classes and coaching across {business.city}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ash">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-smoke transition-colors hover:text-ember"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ash">
              Training
            </h2>
            <ul className="mt-5 space-y-3">
              {trainingPages.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/training/${t.slug}`}
                    className="text-[15px] text-smoke transition-colors hover:text-ember"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ash">
              Branches
            </h2>
            <ul className="mt-5 grid gap-x-4 gap-y-3 sm:grid-cols-2">
              {branches.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/gyms/${b.slug}`}
                    className="text-[15px] text-smoke transition-colors hover:text-ember"
                  >
                    Gym in {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-seam pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ash">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 self-start font-display text-xs font-semibold uppercase tracking-[0.16em] text-smoke transition-colors hover:text-ember"
          >
            Back to top
            <ArrowUpIcon size={14} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
