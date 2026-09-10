import Image from "next/image";
import { WhatsappLogoIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { ButtonLink } from "../ui/Button";
import { photo, BLUR } from "@/lib/img";
import { whatsappHref, business } from "@/lib/content";

/** Full-bleed closing frame. One CTA, the same label used everywhere else. */
export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={photo("photo-1517836357463-d25dfeac3438", 1800)}
        alt="Lifter braced over a loaded barbell at the start of a set"
        fill
        loading="lazy"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-void/80" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/70"
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-start px-5 py-28 sm:px-8 sm:py-36 lg:py-48">
        <Reveal>
          <MaskReveal><h2 className="display text-[2.75rem] sm:text-[4.25rem] lg:text-[5rem]">
            Your first session
            <br />
            <span className="text-ember">is a conversation</span>
          </h2></MaskReveal>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-smoke sm:text-xl">
            Tell us where you are starting from. We will tell you honestly what it
            takes, at whichever branch suits you.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={whatsappHref} external size="lg">
              <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
              Book a trial
            </ButtonLink>
            <ButtonLink href="#branches" variant="outline" size="lg">
              See all seven branches
              <ArrowUpRightIcon size={17} weight="bold" aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-7 text-sm text-ash">
            Coaching desk on WhatsApp, {business.supportHours}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
