import Link from "next/link";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/motion-parts";
import { JsonLd, breadcrumbs, canonical, pageMeta } from "@/lib/seo";
import { trainingPages, business, whatsappHref } from "@/lib/content";

export const metadata = pageMeta({
  title: "Training and coaching in Hyderabad",
  description: `Personal training, beginner programmes, strength and conditioning, fat-loss coaching and women-only timings at ${business.name}, ${business.city}. Seven branches, membership from Rs 999.`,
  path: "/training",
  keywords: [
    "personal training Hyderabad",
    "fitness coaching Hyderabad",
    "strength and conditioning Hyderabad",
    "fat loss coaching Hyderabad",
    "beginner gym programme Hyderabad",
  ],
});

/** Hub for the topic cluster. Every spoke links back here and to the branches. */
export default function TrainingIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Training", path: "/training" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Training and coaching at ${business.name}`,
          numberOfItems: trainingPages.length,
          itemListElement: trainingPages.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: canonical(`/training/${t.slug}`),
            name: t.title,
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
                <li className="text-bone">Training</li>
              </ol>
            </nav>

            <p className="label">What you can train</p>
            <h1 className="display mt-4 max-w-[16ch] text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              Training and coaching
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-smoke sm:text-xl">
              {business.name} programmes every member individually, from a first
              session to a competitive plan. One membership covers all seven
              branches in {business.city}.
            </p>

            <div className="mt-9">
              <ButtonLink href={whatsappHref} external size="lg">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Book a trial
              </ButtonLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="all-training" className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <MaskReveal>
              <h2 id="all-training" className="display text-4xl sm:text-5xl">
                Every programme, explained
              </h2>
            </MaskReveal>

            <ul className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
              {trainingPages.map((t, i) => (
                <Reveal key={t.slug} as="li" delay={i * 0.04}>
                  <Link
                    href={`/training/${t.slug}`}
                    className="group flex h-full flex-col justify-between gap-8 bg-carbon p-7 transition-colors duration-200 hover:bg-slab sm:p-8"
                  >
                    <div>
                      <h3 className="display text-2xl text-bone sm:text-3xl">
                        {t.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-smoke">
                        {t.intro.split(". ")[0]}.
                      </p>
                    </div>
                    <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                      Read more
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
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
