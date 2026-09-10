"use client";

import { useEffect, useId, useRef, useState } from "react";
import { animate, createScope, stagger } from "animejs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../ui/Reveal";
import { MaskReveal } from "../ui/motion-parts";
import { ButtonLink } from "../ui/Button";
import { branches, whatsappHref, business } from "@/lib/content";

const districts = [
  { name: "North", points: "354,40 448,50 492,105 454,164 363,150 330,96" },
  { name: "West", points: "100,144 220,104 330,118 355,206 292,270 164,264 82,216" },
  { name: "Central", points: "330,118 454,164 468,254 378,296 292,270 355,206" },
  { name: "East", points: "454,164 608,146 682,208 632,302 468,254" },
  { name: "South", points: "292,270 378,296 468,254 535,337 494,452 370,500 270,429 224,334" },
] as const;

const mapPins: Record<string, { x: number; y: number; anchor: "left" | "right" }> = {
  hafeezpet: { x: 176, y: 151, anchor: "right" },
  kondapur: { x: 246, y: 207, anchor: "right" },
  gachibowli: { x: 203, y: 260, anchor: "left" },
  kokapet: { x: 142, y: 349, anchor: "left" },
  begumpet: { x: 439, y: 170, anchor: "right" },
  abids: { x: 462, y: 278, anchor: "right" },
  saidabad: { x: 550, y: 384, anchor: "right" },
};

const branchRoute = "M176 151 C214 158 216 193 246 207 S227 244 203 260 S160 315 142 349 M246 207 C314 172 374 157 439 170 S441 235 462 278 S511 338 550 384";

function mapsHref(branch: (typeof branches)[number]) {
  if (branch.googleMapsUrl) return branch.googleMapsUrl;
  const query = branch.address
    ? branch.address
    : `${business.name} ${branch.name} ${business.city}`;
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

function HyderabadMap({
  active,
  onSelect,
  reduce,
}: {
  active: string;
  onSelect: (slug: string) => void;
  reduce: boolean | null;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || reduce) return;
    const scope = createScope({ root }).add(() => {
      animate(".map-district", {
        opacity: [0, 1],
        scale: [0.985, 1],
        delay: stagger(65),
        duration: 650,
        ease: "out(3)",
      });
      animate(".map-route", {
        strokeDashoffset: [1100, 0],
        duration: 1500,
        delay: 250,
        ease: "inOut(3)",
      });
      animate(".map-pin", {
        opacity: [0, 1],
        translateY: [8, 0],
        scale: [0.85, 1],
        delay: stagger(75, { start: 700 }),
        duration: 520,
        ease: "out(4)",
      });
    });
    return () => scope.revert();
  }, [reduce]);

  useEffect(() => {
    if (!root.current || reduce) return;
    animate(root.current.querySelectorAll(`[data-map-pin="${active}"] .pin-pulse`), {
      scale: [1, 1.75],
      opacity: [0.34, 0],
      duration: 950,
      loop: 2,
      ease: "out(3)",
    });
  }, [active, reduce]);

  return (
    <div
      ref={root}
      className="relative min-h-[430px] overflow-hidden bg-[#e9ebe6] sm:min-h-[560px]"
      aria-label="Stylized Hyderabad map showing all seven Fitness Edge branches"
    >
      <svg viewBox="0 0 760 540" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="city-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="#c6cac3" strokeWidth="1" opacity=".48" />
          </pattern>
          <filter id="district-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#6f756d" floodOpacity=".12" />
          </filter>
        </defs>
        <rect width="760" height="540" fill="url(#city-grid)" />
        <g filter="url(#district-shadow)">
          {districts.map((district, index) => (
            <polygon
              key={district.name}
              className="map-district"
              points={district.points}
              fill={index % 2 ? "#f8f8f4" : "#f1f2ed"}
              stroke="#b8bdb5"
              strokeWidth="1.5"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </g>
        <path d="M74 304 C165 287 224 312 306 335 S463 378 678 330" fill="none" stroke="#c1d3d4" strokeWidth="13" opacity=".7" />
        <path d="M74 304 C165 287 224 312 306 335 S463 378 678 330" fill="none" stroke="#d9e4e2" strokeWidth="5" />
        <path d="M82 216 C200 219 283 181 363 150 S520 145 682 208" fill="none" stroke="#c4c8c1" strokeWidth="3" strokeDasharray="8 9" />
        <path d="M164 264 C251 268 306 325 370 500" fill="none" stroke="#c4c8c1" strokeWidth="3" strokeDasharray="8 9" />
        <path d={branchRoute} fill="none" stroke="#ff4a18" strokeWidth="2.5" strokeDasharray="9 8" opacity=".75" />
        <path className="map-route" d={branchRoute} fill="none" stroke="#ff4a18" strokeWidth="3" strokeLinecap="round" strokeDasharray="1100" />
        <g fill="#7b8179" fontFamily="var(--font-barlow-condensed)" fontSize="12" fontWeight="600" letterSpacing="1.4">
          <text x="386" y="87">NORTH HYDERABAD</text>
          <text x="118" y="196">WEST CORRIDOR</text>
          <text x="355" y="224">CENTRAL</text>
          <text x="548" y="222">EAST</text>
          <text x="373" y="414">SOUTH</text>
        </g>
        <circle cx="392" cy="253" r="5" fill="#151719" />
        <text x="405" y="258" fill="#151719" fontFamily="var(--font-barlow-condensed)" fontSize="13" fontWeight="700">HYDERABAD</text>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(233,235,230,.92),transparent_46%,rgba(233,235,230,.7))]" />
      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 sm:inset-x-8 sm:top-8">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#292c2b]">Hyderabad training network</p>
          <p className="mt-2 max-w-[25ch] text-sm leading-relaxed text-[#626761]">Seven branches connected across the city.</p>
        </div>
        <div className="hidden items-center gap-2 border border-[#c2c6bf] bg-[#f7f8f4]/85 px-3 py-2 text-[#555a55] sm:flex">
          <span className="h-1.5 w-7 bg-[#ff4a18]" aria-hidden />
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.14em]">Fitness Edge route</span>
        </div>
      </div>

      {branches.map((branch) => {
        const selected = branch.slug === active;
        const pin = mapPins[branch.slug];
        const labelSide = pin.anchor === "right" ? "left-full ml-2" : "right-full mr-2";
        return (
          <button
            key={branch.slug}
            type="button"
            data-map-pin={branch.slug}
            onClick={() => onSelect(branch.slug)}
            aria-label={`Select ${branch.name} branch`}
            aria-pressed={selected}
            title={branch.name}
            style={{ left: `${(pin.x / 760) * 100}%`, top: `${(pin.y / 540) * 100}%` }}
            className="map-pin group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:z-20"
          >
            <span className={[
              "pin-pulse absolute inset-0 rounded-full bg-[#ff4a18]",
              selected ? "opacity-30" : "opacity-0",
            ].join(" ")} />
            <span className={[
              "relative flex h-9 w-9 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow,transform] duration-300",
              selected
                ? "scale-110 border-[#ff4a18] bg-[#ff4a18] text-white shadow-[0_5px_16px_rgba(255,74,24,.3)]"
                : "border-white bg-[#181a1c] text-white shadow-[0_5px_14px_rgba(24,26,28,.2)] group-hover:border-[#ff4a18] group-hover:bg-[#ff4a18]",
            ].join(" ")}>
              <MapPinIcon size={17} weight={selected ? "fill" : "bold"} aria-hidden />
            </span>
            <span className={[
              "absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap px-2.5 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.12em] shadow-[0_4px_12px_rgba(18,20,22,.18)] sm:block",
              labelSide,
              selected ? "bg-[#ff4a18] text-white" : "bg-[#181a1c] text-white group-hover:bg-[#ff4a18]",
            ].join(" ")}>
              {branch.name}
            </span>
          </button>
        );
      })}

      <div className="absolute bottom-5 left-5 bg-[#181a1c] px-4 py-3 text-white sm:bottom-8 sm:left-8">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-[#aeb2ad]">Network status</p>
        <p className="mt-1 font-display text-lg font-semibold uppercase">7 branches / Hyderabad</p>
      </div>
      <div className="absolute bottom-5 right-5 hidden border-r-2 border-[#ff4a18] pr-3 text-right sm:bottom-8 sm:right-8 sm:block">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-[#727771]">West to south-east</p>
        <p className="mt-1 text-xs text-[#4c514c]">Tap a location to inspect hours</p>
      </div>
    </div>
  );
}

/** An animated map-led branch picker with readable timings and verified details. */
export function Branches() {
  const [active, setActive] = useState(branches[0].slug);
  const reduce = useReducedMotion();
  const panelId = useId();
  const branch = branches.find((b) => b.slug === active) ?? branches[0];

  const selectTab = (index: number) => {
    const next = branches[(index + branches.length) % branches.length];
    setActive(next.slug);
    document.getElementById(`${panelId}-tab-${next.slug}`)?.focus();
  };

  return (
    <section id="branches" className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <p className="label">Seven floors across the city</p>
          <MaskReveal>
            <h2 className="display mt-5 max-w-[16ch] text-[2.75rem] sm:text-6xl lg:text-[4.25rem]">
              Find the one on your way home
            </h2>
          </MaskReveal>
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-edge border border-seam bg-seam lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HyderabadMap active={branch.slug} onSelect={setActive} reduce={reduce} />
          </div>

          <div className="bg-slab p-5 sm:p-8 lg:col-span-5 lg:p-10">
            <div role="tablist" aria-label="Hyderabad branches" aria-orientation="vertical" className="grid grid-cols-2 gap-px bg-seam sm:grid-cols-3 lg:grid-cols-2">
              {branches.map((b, index) => {
                const selected = b.slug === active;
                return (
                  <button
                    key={b.slug}
                    role="tab"
                    type="button"
                    id={`${panelId}-tab-${b.slug}`}
                    aria-selected={selected}
                    aria-controls={`${panelId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(b.slug)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                        event.preventDefault();
                        selectTab(index + 1);
                      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                        event.preventDefault();
                        selectTab(index - 1);
                      } else if (event.key === "Home") {
                        event.preventDefault();
                        selectTab(0);
                      } else if (event.key === "End") {
                        event.preventDefault();
                        selectTab(branches.length - 1);
                      }
                    }}
                    className={[
                      "relative flex min-h-14 items-center justify-between gap-2 bg-carbon px-4 text-left transition-colors duration-200 sm:min-h-16 sm:px-5",
                      selected ? "bg-void text-bone" : "text-smoke hover:bg-carbon/70 hover:text-bone",
                    ].join(" ")}
                  >
                    <span aria-hidden className={["absolute inset-y-0 left-0 w-[3px] transition-colors duration-200", selected ? "bg-ember" : "bg-transparent"].join(" ")} />
                    <span className="display text-xl sm:text-2xl">{b.name}</span>
                    {b.continuous && <span className="hidden text-[10px] uppercase tracking-[0.1em] text-ember sm:block">6am-10pm</span>}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" id={`${panelId}-panel`} aria-labelledby={`${panelId}-tab-${branch.slug}`} className="pt-9 sm:pt-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={branch.slug}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="label">Selected branch</p>
                      <h3 className="display mt-3 text-4xl text-bone sm:text-5xl">{branch.name}</h3>
                    </div>
                    {branch.rating && branch.reviewCount && (
                      <a
                        href={mapsHref(branch)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-edge border border-ember/35 bg-ember/10 px-3 py-2 text-ember transition-colors hover:border-ember hover:bg-ember hover:text-void"
                        aria-label={`${branch.rating} out of 5 from ${branch.reviewCount} Google reviews for ${branch.name}`}
                      >
                        <StarIcon size={16} weight="fill" aria-hidden />
                        <span className="tnum font-display text-lg font-semibold">{branch.rating}</span>
                        <span className="text-xs text-smoke">({branch.reviewCount})</span>
                      </a>
                    )}
                  </div>

                  <p className="mt-5 text-[15px] leading-relaxed text-smoke">{branch.area}</p>
                  <div className="mt-7 space-y-3 border-y border-seam py-5">
                    {branch.hours.map((h) => (
                      <div key={h.window} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-smoke">
                        <ClockIcon size={17} className="text-ember" aria-hidden />
                        <span className="tnum font-display text-lg font-semibold text-bone">{h.window}</span>
                        {h.note && <span className="font-display text-[11px] uppercase tracking-[0.12em] text-ash">{h.note}</span>}
                      </div>
                    ))}
                  </div>

                  {branch.address && (
                    <div className="mt-5 flex gap-3 text-[14px] leading-relaxed text-smoke">
                      <MapPinIcon size={18} className="mt-0.5 shrink-0 text-ember" aria-hidden />
                      <address className="not-italic">{branch.address}</address>
                    </div>
                  )}
                  {branch.plusCode && <p className="mt-2 pl-8 text-xs text-ash">Plus code: {branch.plusCode}</p>}
                  {branch.phone && (
                    <a href={`tel:${branch.phone.replace(/[^\d+]/g, "")}`} className="mt-3 flex items-center gap-3 text-smoke transition-colors hover:text-ember">
                      <PhoneIcon size={17} className="text-ember" aria-hidden />
                      <span className="tnum">{branch.phone}</span>
                    </a>
                  )}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={whatsappHref} external size="md">
                      <WhatsappLogoIcon size={17} weight="fill" aria-hidden />
                      Book a trial
                    </ButtonLink>
                    <ButtonLink href={mapsHref(branch)} external variant="outline" size="md">
                      <MapPinIcon size={17} weight="bold" aria-hidden />
                      Open in Maps
                    </ButtonLink>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
