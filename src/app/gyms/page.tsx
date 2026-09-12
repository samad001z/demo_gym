import Link from "next/link";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/motion-parts";
import { AnswerBlock } from "@/components/AnswerBlock";
import { BranchMap } from "@/components/sections/BranchMap";
import { JsonLd, breadcrumbs, canonical, pageMeta } from "@/lib/seo";
import { branches, business, whatsappHref, answers } from "@/lib/content";

export const metadata = pageMeta({
  title: `${branches.length} Gyms in Hyderabad`,
  description: `${business.name} operates ${branches.length} gyms across Hyderabad: ${branches
    .map((b) => b.name)
    .join(", ")}. Compare timings, find the branch nearest you, and book a trial. Pricing is available on request.`,
});

export default function GymsIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Branches", path: "/gyms" },
        ])}
      />
      {/* An ItemList of the seven locations, so the branch cluster is legible
          to a crawler as one set rather than seven unrelated pages. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${business.name} branches in ${business.city}`,
          numberOfItems: branches.length,
          itemListElement: branches.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: canonical(`/gyms/${b.slug}`),
            name: `${business.name} ${b.name}`,
          })),
        }}
      />

      <Header />

      <main>
        <section className="border-b border-seam pt-[68px]">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-ash">
                <li>
                  <Link href="/" className="transition-colors hover:text-ember">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-bone">Branches</li>
              </ol>
            </nav>

            <p className="label">Seven floors</p>
            <h1 className="display mt-4 max-w-[16ch] text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              Gyms across Hyderabad
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-smoke sm:text-xl">
              {business.name} runs {branches.length} branches in {business.city}:{" "}
              {branches.map((b) => b.name).join(", ")}. One membership covers all of
              them, with pricing available on request.
            </p>

            <div className="mt-9">
              <ButtonLink href={whatsappHref} external size="lg">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Book a trial
              </ButtonLink>
            </div>
          </div>
        </section>

        <BranchMap />

        <section aria-labelledby="all-branches" className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <MaskReveal>
              <h2 id="all-branches" className="display text-4xl sm:text-5xl">
                Every branch and its hours
              </h2>
            </MaskReveal>

            <ul className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((b, i) => (
                <Reveal key={b.slug} as="li" delay={i * 0.04}>
                  <Link
                    href={`/gyms/${b.slug}`}
                    className="group flex h-full flex-col justify-between gap-8 bg-carbon p-7 transition-colors duration-200 hover:bg-slab sm:p-8"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="display flex items-baseline gap-3 text-3xl text-bone">
                          {/* keys the card to its pin on the map above */}
                          <span
                            aria-hidden
                            className="tnum text-base font-semibold text-ash md:hidden"
                          >
                            {i + 1}
                          </span>
                          {b.name}
                        </h3>
                        {b.continuous && (
                          <span className="shrink-0 rounded-edge border border-ember/40 px-2 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-ember">
                            Open all day
                          </span>
                        )}
                      </div>
                      <ul className="mt-4 space-y-1">
                        {b.hours.map((h) => (
                          <li key={h.window} className="tnum text-[15px] text-smoke">
                            {h.window}
                            {h.note && (
                              <span className="text-ash"> · {h.note}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[15px] leading-relaxed text-ash">
                        {b.area}
                      </p>
                    </div>

                    <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                      View {b.name}
                      <ArrowRightIcon
                        size={14}
                        weight="bold"
                        className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <AnswerBlock
          heading="Choosing a branch"
          intro="The questions people ask before their first visit."
          items={answers.slice(0, 4)}
        />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
