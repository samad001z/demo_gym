import Link from "next/link";
import Image from "next/image";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { JsonLd, breadcrumbs, canonical, pageMeta } from "@/lib/seo";
import { business, method, whatsappHref } from "@/lib/content";

export const metadata = pageMeta({
  title: `About ${business.name}`,
  description: `${business.name} is a practical training space in ${business.city} offering strength, cardio, group classes, yoga and personal training.`,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": canonical("/about") + "#about",
          name: `About ${business.name}`,
          description: `${business.name} is a practical training space in ${business.city}.`,
          url: canonical("/about"),
          isPartOf: { "@id": canonical("/") + "#website" },
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
                <li><Link href="/" className="transition-colors hover:text-ember">Home</Link></li>
                <li aria-hidden>/</li>
                <li className="text-bone">About</li>
              </ol>
            </nav>

            <p className="label">About the gym</p>
            <h1 className="display mt-4 max-w-[14ch] text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              A place to train with intent
            </h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-smoke sm:text-xl">
              {business.name} is a practical training space in {business.city}, with
              coaching and equipment for different goals and starting points.
            </p>

            <div className="mt-9">
              <ButtonLink href={whatsappHref} external size="lg">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Train with the team
              </ButtonLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="approach" className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <MaskReveal>
                  <h2 id="approach" className="display text-4xl sm:text-5xl">The approach</h2>
                </MaskReveal>
                <div className="mt-7 space-y-5 text-lg leading-relaxed text-smoke">
                  <p>Every programme starts with a conversation about your goals, schedule and current fitness level.</p>
                  <p>From there, the team combines coaching, movement practice and repeatable habits so training can fit real life.</p>
                </div>
                <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-edge border border-seam">
                  <Image
                    src={photo("photo-1534438327276-14e5300c3a48", 900, { grayscale: true })}
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
                <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ash">How the team works</p>
                <dl className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
                  {method.map((m) => (
                    <Reveal key={m.title} className="bg-carbon p-6 sm:p-7">
                      <dt className="display text-2xl text-bone">{m.title}</dt>
                      <dd className="mt-2.5 text-[15px] leading-relaxed text-smoke">{m.body}</dd>
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
