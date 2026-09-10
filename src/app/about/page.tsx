import Link from "next/link";
import Image from "next/image";
import { WhatsappLogoIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealList, RevealItem } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { JsonLd, breadcrumbs, canonical, pageMeta } from "@/lib/seo";
import { business, founderTitles, method, whatsappHref } from "@/lib/content";

export const metadata = pageMeta({
  title: "Imran Khan, Founder and Head Trainer",
  description: `${business.name} was founded in ${business.founded} by Imran Khan, an internationally certified personal trainer and nutritionist who won Mr. Hyderabad, Mr. Telangana and Mr. South India. Seven gyms across Hyderabad.`,
  path: "/about",
  keywords: [
    "Imran Khan fitness trainer Hyderabad",
    "Mr Telangana bodybuilder",
    "certified personal trainer Hyderabad",
    "best gym owner Hyderabad",
    "Fitness Edge founder",
  ],
});

/**
 * The E-E-A-T page.
 *
 * For a health and fitness query, Google weighs demonstrable expertise and
 * real-world credentials heavily. A named, verifiable expert with a
 * competitive record and a stated certification is the strongest asset this
 * business has, and it was buried on the old site. Here it gets its own URL,
 * its own Person schema, and a link from every page footer.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": canonical("/about") + "#founder",
          name: business.founder,
          jobTitle: "Founder and Head Trainer",
          description: `Internationally certified personal trainer and nutritionist. Founder of ${business.name}, ${business.city}.`,
          url: canonical("/about"),
          worksFor: { "@id": canonical("/") + "#organization" },
          knowsAbout: [
            "Strength and conditioning",
            "Bodybuilding",
            "Sports nutrition",
            "Body recomposition",
            "Diabetes reversal through exercise",
            "Injury rehabilitation training",
          ],
          award: [...founderTitles],
          hasOccupation: {
            "@type": "Occupation",
            name: "Personal trainer",
            occupationLocation: { "@type": "City", name: business.city },
          },
        }}
      />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
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
                <li className="text-bone">About</li>
              </ol>
            </nav>

            <p className="label">Founder</p>
            <h1 className="display mt-4 max-w-[14ch] text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              Imran Khan
            </h1>
            {/* Answer-first: complete sentence, no pronouns, quotable. */}
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-smoke sm:text-xl">
              Imran Khan is the founder and head trainer of {business.name} in{" "}
              {business.city}, an internationally certified personal trainer and
              nutritionist who opened the first branch in {business.founded}.
            </p>

            <div className="mt-9">
              <ButtonLink href={whatsappHref} external size="lg">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Train with the team
              </ButtonLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="record" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <MaskReveal>
                  <h2 id="record" className="display text-4xl sm:text-5xl">
                    The record
                  </h2>
                </MaskReveal>

                <div className="mt-7 space-y-5 text-lg leading-relaxed text-smoke">
                  <p>
                    His competitive career ran from Mr. Osmania through to Mr. South
                    India. He was selected for Mr. India, a milestone he could not
                    pursue after a bike accident.
                  </p>
                  <p>
                    The setback moved the work rather than ending it. Since{" "}
                    {business.founded} he has built {business.name} into seven
                    branches across {business.city}, training more than 1,500 members
                    across every age and starting point.
                  </p>
                </div>

                {/* Credential marker: the one place steel appears, because
                    blue raises trustworthiness appraisals and this is the
                    single most trust-critical claim on the site. */}
                <p className="mt-8 flex items-start gap-3 border-l-2 border-steel pl-5 text-[15px] leading-relaxed text-bone">
                  <SealCheckIcon
                    size={19}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-steel"
                    aria-hidden
                  />
                  Internationally certified personal trainer and nutritionist. Still
                  programmes and coaches on the floor.
                </p>

                <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-edge border border-seam">
                  {/* TODO: replace with a real photograph of Imran Khan. */}
                  <Image
                    src={photo("photo-1534438327276-14e5300c3a48", 900, {
                      grayscale: true,
                    })}
                    alt="Dumbbell rack running the length of a low-lit training floor"
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover"
                  />
                </figure>
              </div>

              <div className="lg:col-span-7">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ash">
                  Titles
                </p>
                <RevealList className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
                  {founderTitles.map((t) => (
                    <RevealItem
                      key={t}
                      className="group flex min-h-[132px] flex-col justify-between bg-carbon p-6 transition-colors duration-300 hover:bg-slab sm:min-h-[168px] sm:p-8"
                    >
                      <span
                        aria-hidden
                        className="h-[3px] w-9 bg-ember transition-[width] duration-300 ease-[var(--ease-out)] group-hover:w-16"
                      />
                      <span className="display text-3xl text-bone sm:text-[2.25rem]">
                        {t}
                      </span>
                    </RevealItem>
                  ))}
                </RevealList>

                <h2 className="display mt-16 text-4xl sm:text-5xl">
                  How the team works
                </h2>
                <dl className="mt-8 grid gap-px bg-seam sm:grid-cols-2">
                  {method.map((m) => (
                    <Reveal key={m.title} className="bg-carbon p-6 sm:p-7">
                      <dt className="display text-2xl text-bone">{m.title}</dt>
                      <dd className="mt-2.5 text-[15px] leading-relaxed text-smoke">
                        {m.body}
                      </dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
