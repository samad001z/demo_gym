import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRightIcon,
  CheckIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/motion-parts";
import { AnswerBlock } from "@/components/AnswerBlock";
import { JsonLd, breadcrumbs, canonical, pageMeta } from "@/lib/seo";
import { trainingPages, branches, business, whatsappHref } from "@/lib/content";

export function generateStaticParams() {
  return trainingPages.map((t) => ({ topic: t.slug }));
}

function find(slug: string) {
  return trainingPages.find((t) => t.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const page = find(topic);
  if (!page) return {};

  return pageMeta({
    title: page.title,
    description: page.description,
    path: `/training/${page.slug}`,
    keywords: [
      `${page.title.toLowerCase()}`,
      `${page.slug.replace(/-/g, " ")} ${business.city}`,
      `gym ${business.city}`,
    ],
  });
}

/**
 * Intent-led topic pages.
 *
 * These sit beside the location pages rather than competing with them. A
 * location page answers "where", these answer "what" - somebody searching
 * "women only gym timings hyderabad" or "fat loss coaching hyderabad" has a
 * question the branch pages do not directly address, and a head term like
 * "best gym in Hyderabad" is won by owning the cluster around it, not by
 * repeating the phrase.
 *
 * Every page links back into the branch cluster, so authority circulates
 * instead of pooling on orphans.
 */
export default async function TrainingTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const page = find(topic);
  if (!page) notFound();

  const others = trainingPages.filter((t) => t.slug !== page.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Training", path: "/training" },
          { name: page.title, path: `/training/${page.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": canonical(`/training/${page.slug}`) + "#page",
          name: page.title,
          description: page.description,
          url: canonical(`/training/${page.slug}`),
          isPartOf: { "@id": canonical("/") + "#website" },
          about: { "@id": canonical("/") + "#organization" },
          primaryImageOfPage: undefined,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <Header />

      <main>
        <section className="border-b border-seam pt-[68px]">
          <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ash">
                <li>
                  <Link href="/" className="transition-colors hover:text-ember">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/training" className="transition-colors hover:text-ember">
                    Training
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-bone">{page.title}</li>
              </ol>
            </nav>

            <p className="label">{page.kicker}</p>
            <h1 className="display mt-4 max-w-[18ch] text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
              {page.title}
            </h1>
            {/* Answer-first: resolves the query on its own, no context needed */}
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-smoke sm:text-xl">
              {page.intro}
            </p>

            <div className="mt-9">
              <ButtonLink href={whatsappHref} external size="lg">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Book a trial
              </ButtonLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="detail-heading" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <h2 id="detail-heading" className="sr-only">
              About {page.title}
            </h2>

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-8">
                <div className="space-y-14">
                  {page.sections.map((sec, i) => (
                    <Reveal key={sec.heading} delay={i * 0.05}>
                      <MaskReveal>
                        <h3 className="display text-3xl text-bone sm:text-4xl">
                          {sec.heading}
                        </h3>
                      </MaskReveal>
                      <p className="mt-4 max-w-[66ch] text-[17px] leading-relaxed text-smoke">
                        {sec.body}
                      </p>
                      {sec.bullets && (
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                          {sec.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex gap-3 text-[15px] leading-snug text-smoke"
                            >
                              <CheckIcon
                                size={17}
                                weight="bold"
                                className="mt-0.5 shrink-0 text-ember"
                                aria-hidden
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Branch links: the topic cluster feeding the location cluster */}
              <aside className="lg:col-span-4">
                <div className="rounded-edge border border-seam bg-carbon p-6 sm:p-7 lg:sticky lg:top-24">
                  <h3 className="display text-2xl text-bone">
                    Available at all seven branches
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-smoke">
                    One membership, from Rs 999 a month, covers every floor.
                  </p>
                  <ul className="mt-5 space-y-px border-t border-seam pt-5">
                    {branches.map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={`/gyms/${b.slug}`}
                          className="group/branch flex min-h-11 items-center justify-between gap-3 text-[15px] text-smoke transition-colors hover:text-ember"
                        >
                          Gym in {b.name}
                          <ArrowRightIcon
                            size={14}
                            weight="bold"
                            className="shrink-0 text-ash transition-transform duration-200 ease-[var(--ease-out)] group-hover/branch:translate-x-1 group-hover/branch:text-ember"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <AnswerBlock heading={`${page.kicker}: questions`} items={page.faqs} />

        <section
          aria-labelledby="related-training"
          className="border-t border-seam py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <h2 id="related-training" className="display text-4xl sm:text-5xl">
              Related training
            </h2>
            <ul className="mt-10 grid gap-px bg-seam sm:grid-cols-2">
              {others.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/training/${t.slug}`}
                    className="group flex h-full flex-col justify-between gap-6 bg-carbon p-6 transition-colors duration-200 hover:bg-slab sm:p-7"
                  >
                    <div>
                      <h3 className="display text-2xl text-bone">{t.title}</h3>
                      <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-smoke">
                        {t.kicker}
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
                </li>
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
