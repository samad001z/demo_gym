import Image from "next/image";
import {
  ArrowDownRightIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "../ui/Button";
import { HeroParallax, Magnetic } from "../ui/motion-parts";
import { photo, BLUR } from "@/lib/img";
import { whatsappHref } from "@/lib/content";

/**
 * Asymmetric split hero. Four text elements exactly: eyebrow, headline,
 * subtext, CTA pair.
 *
 * The entrance is a CSS animation, not Motion. It fires during initial load
 * while the main thread is hydrating and decoding the hero image; CSS
 * animations run off the main thread and hold their frame rate through that,
 * where a JS-driven reveal would stutter at the one moment everybody watches.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-[68px] lg:justify-center"
    >
      <HeroParallax>
        <Image
          src={photo("photo-1526506118085-60ce8714f8c5", 1600)}
          alt="Athlete pulling through the top of a weighted pull-up in a dark training hall"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 56vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover object-[64%_22%]"
        />
        {/* Scrims. Mobile reads bottom-up, desktop left-to-right, so the
            headline always sits on ink and never on the subject. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-void via-void/92 to-void/25 lg:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-r from-void via-void/55 to-void/10 lg:block"
        />
      </HeroParallax>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 lg:pb-0">
        <div className="max-w-[62ch] lg:max-w-[58%]">
          <p className="label fade-rise">Hyderabad training network</p>

          {/* Each line rises on its own 80ms beat. Two lines desktop. */}
          <h1 className="display line-rise mt-5 text-[3.25rem] leading-[0.9] sm:text-[4.5rem] lg:text-[4.5rem] xl:text-[5.25rem]">
            <span style={{ "--line-index": 1 } as React.CSSProperties}>
              Built by a champion.
            </span>
            <span
              className="text-ember"
              style={{ "--line-index": 2 } as React.CSSProperties}
            >
              Built for you.
            </span>
          </h1>

          <p
            className="fade-rise mt-6 max-w-[46ch] text-lg leading-relaxed text-smoke sm:text-xl"
            style={{ "--rise-delay": "320ms" } as React.CSSProperties}
          >
            Seven branches, certified coaches, and fourteen years of turning
            first sessions into results that hold.
          </p>

          <div
            className="fade-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--rise-delay": "420ms" } as React.CSSProperties}
          >
            <Magnetic>
              <ButtonLink href={whatsappHref} external size="lg" className="w-full sm:w-auto">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Book a trial
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#branches" variant="outline" size="lg">
              Find your branch
              <ArrowDownRightIcon size={17} weight="bold" aria-hidden />
            </ButtonLink>
          </div>

        </div>
      </div>
    </section>
  );
}
