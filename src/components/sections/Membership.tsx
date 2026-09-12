import { CheckIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { ButtonLink } from "../ui/Button";
import { offers, whatsappHref, business } from "@/lib/content";

/**
 * Two real offers, not an invented tier table.
 *
 * Pricing stays intentionally general until approved figures are supplied.
 */
export function Membership() {
  return (
    <section id="membership" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <MaskReveal><h2 className="display text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
                What it costs
              </h2></MaskReveal>
              <p className="mt-6 text-lg leading-relaxed text-smoke">
                Membership and personal training pricing is available on request,
                because the plan should match your goals and schedule.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-ash">
                Coaching desk on WhatsApp, {business.supportHours}.
              </p>
              <ButtonLink href={whatsappHref} external size="lg" className="mt-8 w-full sm:w-auto">
                <WhatsappLogoIcon size={19} weight="fill" aria-hidden />
                Get a quote
              </ButtonLink>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {offers.map((o, i) => (
              <Reveal key={o.kicker} delay={i * 0.08}>
                <article
                  className={[
                    "flex h-full flex-col rounded-edge border p-7 sm:p-8",
                    o.primary
                      ? "border-ember/50 bg-carbon"
                      : "border-seam bg-carbon/50",
                  ].join(" ")}
                >
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-ash">
                    {o.kicker}
                  </p>

                  <p className="mt-5 flex items-baseline gap-2">
                      <span className="display text-5xl text-ember sm:text-6xl">
                      {o.price}
                    </span>
                    <span className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-smoke">
                      {o.unit}
                    </span>
                  </p>

                  <h3 className="display mt-6 text-2xl text-bone">{o.title}</h3>

                  <ul className="mt-5 space-y-3 border-t border-seam pt-5">
                    {o.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-snug text-smoke">
                        <CheckIcon
                          size={17}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-ember"
                          aria-hidden
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
