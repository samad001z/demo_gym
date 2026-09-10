import { Reveal } from "./ui/Reveal";
import { MaskReveal } from "./ui/motion-parts";

/**
 * AEO answer section.
 *
 * Rendered as a plain definition-style list of question headings with a
 * self-contained answer directly beneath. No accordion here on purpose: an
 * answer hidden behind a click is still in the DOM, but collapsed content is
 * weighted less and the whole point of this block is extractability.
 *
 * The FAQ accordion on the home page serves the reader who is browsing. This
 * serves the reader who arrived from a search with one specific question, and
 * the engine that wants a passage to quote.
 */
export function AnswerBlock({
  heading,
  items,
  intro,
}: {
  heading: string;
  items: readonly { q: string; a: string }[];
  intro?: string;
}) {
  return (
    <section aria-labelledby="answers-heading" className="bg-carbon py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <MaskReveal>
              <h2 id="answers-heading" className="display text-4xl sm:text-5xl">
                {heading}
              </h2>
            </MaskReveal>
            {intro && (
              <p className="mt-5 max-w-[42ch] leading-relaxed text-smoke">{intro}</p>
            )}
          </div>

          <div className="lg:col-span-8">
            <dl className="space-y-10">
              {items.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.04}>
                  <dt className="display border-l-2 border-ember pl-5 text-xl text-bone sm:text-2xl">
                    {item.q}
                  </dt>
                  <dd className="mt-3 max-w-[68ch] pl-5 text-[17px] leading-relaxed text-smoke">
                    {item.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
