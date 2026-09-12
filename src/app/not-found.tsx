import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { branches } from "@/lib/content";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70dvh] max-w-[1400px] flex-col justify-center px-5 py-24 pt-[140px] sm:px-8">
        <p className="label">404</p>
        <h1 className="display mt-4 max-w-[16ch] text-[2.75rem] sm:text-6xl">
          That page is not on the floor
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-smoke">
          The link may be old. Every branch, every timing and every programme is
          one step away.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">Back to home</ButtonLink>
          <ButtonLink href="/gyms" variant="outline" size="lg">
            See all branches
          </ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3">
          {branches.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/gyms/${b.slug}`}
                className="text-[15px] text-ash transition-colors hover:text-ember"
              >
                Gym in {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
