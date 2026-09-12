import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Ticker } from "@/components/sections/Ticker";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/motion-parts";
import { AnswerBlock } from "@/components/AnswerBlock";
import { photo, BLUR } from "@/lib/img";
import { JsonLd, breadcrumbs, branchSchema, pageMeta } from "@/lib/seo";
import {
  branches,
  business,
  programs,
  amenities,
  whatsappHref,
  answers,
} from "@/lib/content";

export function generateStaticParams() {
  return branches.map((b) => ({ branch: b.slug }));
}

function find(slug: string) {
  return branches.find((b) => b.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch: slug } = await params;
  const branch = find(slug);
  if (!branch) return {};

  const hours = branch.hours.map((h) => h.window).join(", ");

  return pageMeta({
    // Title targets the query people actually type, with the differentiator
    // (the hours) doing the work in the description rather than a keyword list.
    title: `Gym in ${branch.name}, Hyderabad`,
    description: `${business.name} ${branch.name}: open ${hours}. Personal training, HIIT, yoga and strength coaching built around your current fitness level. ${branch.standout}`,
  });
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch: slug } = await params;
  const branch = find(slug);
  if (!branch) notFound();

  const others = branches.filter((b) => b.slug !== branch.slug);
  // Two answers that are genuinely branch-relevant, so the page is not a
  // duplicate of its six siblings in the eyes of a crawler.
  const localAnswers = [
    {
      q: `What are the timings of the ${branch.name} gym?`,
      a: `${business.name} ${branch.name} is open ${branch.hours
        .map((h) => (h.note ? `${h.window} (${h.note.toLowerCase()})` : h.window))
        .join(" and ")}. ${branch.standout} Timings can shift on public holidays, so message the coaching desk before a first visit.`,
    },
    ...answers.filter((a) =>
      branch.slug === "saidabad"
        ? a.q.includes("women-only")
        : a.q.includes("membership cost"),
    ),
  ];

  return (
    <>
      <JsonLd data={branchSchema(branch)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Branches", path: "/gyms" },
          { name: branch.name, path: `/gyms/${branch.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: localAnswers.map((a) => ({
            "@type": "Question",
            name: a.q,
            acceptedAnswer: { "@type": "Answer", text: a.a },
          })),
        }}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-[68px]">
          <div className="absolute inset-0">
            <Image
              src={photo("photo-1534438327276-14e5300c3a48", 1600, { grayscale: true })}
              alt={`Training floor at ${business.name} ${branch.name}`}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-void/72" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-void to-transparent"
            />
          </div>

          <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ash">
                <li>
                  <Link href="/" className="transition-colors hover:text-ember">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/gyms" className="transition-colors hover:text-ember">
                    Branches
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-bone">{branch.name}</li>
              </ol>
            </nav>

            <p className="label">{business.city}</p>
            <h1 className="display mt-4 text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              Gym in {branch.name}
            </h1>
            {/* Answer-first paragraph: complete on its own, quotable. */}
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-smoke sm:text-xl">
              {business.name} {branch.name} is a full-service gym in {business.city},
              open{" "}
              <span className="text-bone">
                {branch.hours.map((h) => h.window).join(" and ")}
              </span>
              . {branch.standout}
            </p>
              <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-ash">
                {branch.area}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-smoke">
                {branch.phone && (
                  <span className="flex items-center gap-2">
                    <PhoneIcon size={16} className="text-ember" aria-hidden />
                    <span className="tnum">{branch.phone}</span>
                  </span>
                )}
              </div>
              {branch.address && (
                <address className="mt-4 flex max-w-[62ch] gap-2 text-sm not-italic leading-relaxed text-smoke">
                  <MapPinIcon size={17} className="mt-0.5 shrink-0 text-ember" aria-hidden />
                  {branch.address}
                </address>
              )}
              {branch.plusCode && (
                <p className="mt-2 pl-7 text-xs text-ash">Plus code: {branch.plusCode}</p>
              )}

              <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-ash">
                <span className="text-smoke">Serving</span>{" "}
                {branch.nearbyAreas.join(", ")}.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={whatsappHref} external size="lg">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Book a trial
              </ButtonLink>
              <ButtonLink
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  branch.address ?? `${business.name} ${branch.name} ${business.city}`,
                )}`}
                external
                variant="outline"
                size="lg"
              >
                <MapPinIcon size={17} weight="bold" aria-hidden />
                Open in Maps
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Hours */}
        <section
          aria-labelledby="hours-heading"
          className="border-y border-seam bg-carbon py-16 sm:py-20"
        >
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <MaskReveal>
                  <h2 id="hours-heading" className="display text-4xl sm:text-5xl">
                    {branch.name} timings
                  </h2>
                </MaskReveal>
                <p className="mt-5 max-w-[42ch] leading-relaxed text-smoke">
                  Same equipment, same coaching standard, same membership at every
                  branch. Only the hours change.
                </p>
              </div>

              <div className="lg:col-span-8">
                {/* auto-fit, so 1, 2 or 3 windows all fill the row with no blank tile */}
                <ul className="grid gap-px bg-seam sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                  {branch.hours.map((h) => (
                    <li key={h.window} className="bg-carbon p-6 sm:p-7">
                      <ClockIcon size={20} className="text-ember" aria-hidden />
                      <p className="tnum mt-4 font-display text-2xl font-semibold tracking-wide text-bone">
                        {h.window}
                      </p>
                      {h.note && (
                        <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ash">
                          {h.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {amenities.map((a) => (
                    <li key={a} className="flex gap-3 text-[15px] leading-snug text-smoke">
                      <CheckIcon
                        size={17}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-ember"
                        aria-hidden
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Training available */}
        <section aria-labelledby="training-heading" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <MaskReveal>
              <h2 id="training-heading" className="display max-w-[20ch] text-4xl sm:text-5xl">
                Training available at {branch.name}
              </h2>
            </MaskReveal>

            <div className="mt-10 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => (
                <Reveal key={p.slug} as="article" className="group bg-carbon p-6 sm:p-7">
                  <span
                    aria-hidden
                    className="block h-[3px] w-8 bg-ember transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-14"
                  />
                  <h3 className="display mt-6 text-2xl text-bone">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-smoke">
                    {p.summary}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Ticker />

        <AnswerBlock
          heading={`${branch.name} gym questions`}
          items={localAnswers}
        />

        {/* Other branches: real internal linking, which is how the location
            cluster passes authority around instead of orphaning six pages. */}
        <section
          aria-labelledby="other-branches"
          className="border-t border-seam py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <h2 id="other-branches" className="display text-4xl sm:text-5xl">
              Other Hyderabad branches
            </h2>
            <ul className="mt-10 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
              {others.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/gyms/${b.slug}`}
                    className="group flex h-full flex-col justify-between gap-6 bg-carbon p-6 transition-colors duration-200 hover:bg-slab sm:p-7"
                  >
                    <div>
                      <h3 className="display text-2xl text-bone">
                        Gym in {b.name}
                      </h3>
                      <p className="tnum mt-2 text-[15px] text-smoke">
                        {b.hours.map((h) => h.window).join(" · ")}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ember">
                      View branch
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
