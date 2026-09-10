# The Fitness Edge

Site for The Fitness Edge, a seven-branch gym chain in Hyderabad founded in
2011 by bodybuilding champion Imran Khan.

```bash
npm run dev      # http://localhost:3000
npm run build
npm start
node verify.mjs     # layout + hydration + reveal audit against a running server
node map-check.mjs  # branch-map pin overlap + tap-target audit
```

Next.js 16 (App Router, RSC) · Tailwind v4 · Motion · Phosphor Icons.
All 25 routes prerender to static HTML.

## Deploying

Import the repo on Vercel and press deploy. There is no build configuration to
add: the framework is detected, every route prerenders, and no runtime service
is required.

**Environment.** One optional variable, `NEXT_PUBLIC_SITE_URL`. Leave it unset
and the build falls back to `VERCEL_PROJECT_PRODUCTION_URL`, so a fresh import
canonicalises to its own production domain rather than to a site it is not.
Set it once the real domain is attached. See `.env.example`.

**Preview deploys are not indexable.** `VERCEL_ENV=preview` serves
`Disallow: /` plus `noindex, nofollow`. This matters here: the repo is public,
so without it a demo copy would compete with the client's real site for its
own branded terms.

Security headers (`nosniff`, `SAMEORIGIN`, `Referrer-Policy`,
`Permissions-Policy`, HSTS) are set in `next.config.ts`. There is deliberately
no CSP; the reasoning is in the comment there.

---

## 1. Palette: why this red

The accent is a long-wavelength red-orange because **perception of red
measurably increases the force and velocity of motor output** (Elliot & Aarts,
2011, *Emotion*, doi:10.1037/a0022599). Red also carries an attentional
advantage and raises appraisals of dominance (Elliot, 2015 review, PMC4383146).

The same literature carries the constraint that decides the entire system.
Sustained red in an *achievement* context produces **avoidance** motivation and
measurably degrades cognitive-task performance (Elliot et al., 2007, *JEP:
General*). Threat mobilises energy, but it also "evokes worry, task
distraction, and self-preoccupation."

So the rule is: **red is a trigger, not a room.**

`ember` appears only at moments of physical commitment — primary CTAs, the
active branch, stat figures, section markers, prices. It is under 5% of the
pixels on screen, and it never becomes an ambient wash. The first build of
this page had a full-bleed red ticker band and a solid red bento tile; both
were removed for exactly this reason.

The field is a low-arousal near-black so the ember spike registers by contrast
(short vs long wavelength arousal, per the wavelength literature in Elliot
2015).

| Token | Value | Role | Contrast |
| --- | --- | --- | --- |
| `void` | `#0b0b0d` | page ground | — |
| `carbon` / `slab` | `#131316` / `#1a1a1e` | raised surfaces | — |
| `seam` / `seam-2` | `#2a2a30` / `#38383f` | hairlines | — |
| `bone` | `#f6f5f3` | primary text | 18.1:1 |
| `smoke` | `#a3a3ac` | body copy | 7.9:1 |
| `ash` | `#82828c` | captions | 5.2:1 |
| `ember` | `#ff4a18` | **action only** | 5.9:1 with `void` on it |
| `ember-lift` | `#ff6238` | hover | 6.6:1 |
| `steel` | `#7fa8d9` | **credentials only** | 8.0:1 |

Two details that fell out of the maths:

- The solid CTA hover **heats up** (`ember` → `ember-lift`) rather than
  darkening. That is the right metaphor, and it is also the only direction
  that works: darkening the fill drops the dark label to 4.48:1 and fails AA.
- `steel` is the one other hue and it is strictly semantic, used on the
  founder's certification marker and nowhere else, because blue raises
  trustworthiness appraisals (Labrecque & Milne, 2012) and subjective
  alertness (Chellappa et al., 2011).

**Deliberately not claimed:** the Frank & Gilovich (1988) black-uniform
aggression finding. It failed to replicate on expanded NFL/NHL data
(Goldschmied, Raphaeli & Furley, 2026, *Collabra*). The dark ground is
justified by arousal contrast and legibility, not by that study.

Type is **Barlow Condensed** for display, **Barlow** for body. Locks: dark
theme whole-site, one action accent, 4px radius on every surface including
buttons.

## 2. Motion

Every animation passed a two-part gate before it was written — frequency tier,
then a named purpose — and each carries that reasoning in a comment.

| Animation | Tier | Purpose | Tool |
| --- | --- | --- | --- |
| Hero line rise | once/session | explanation | **CSS animation** |
| Hero parallax | once/session | spatial consistency | Motion `useScroll` |
| Scroll progress bar | once/session | state indication | Motion `useScroll` |
| Magnetic primary CTA | rare | feedback / delight | Motion values + spring |
| Headline mask reveal | once/section | hierarchy | Motion variants |
| Scroll reveals | once/section | hierarchy | Motion `whileInView` |
| Stat count-up | once/session | state indication | rAF, cancelled on unmount |
| Branch panel crossfade | occasional | state transition | `AnimatePresence` |
| FAQ height | occasional | preventing a jarring change | `AnimatePresence` |
| Mobile sticky CTA | occasional | state indication | `AnimatePresence` |
| Ticker | ambient | breadth, not detail | CSS, one per site |

The hero entrance is **CSS, not Motion**, on purpose: it fires while the main
thread is hydrating and decoding the hero image, and CSS animations run off
the main thread. A JS-driven reveal stutters at the one moment everyone
watches.

Curves come from a fixed token set (`--ease-out`, `--ease-in-out`,
`--ease-drawer`) rather than being approximated per component. No
`window.addEventListener("scroll")` anywhere. No `transition: all`. Transform
and opacity only.

### Two bugs worth knowing about

**IntersectionObserver deadlock.** `IntersectionObserver` computes its ratio
against *every ancestor clip rect*. An element translated fully outside its
own `overflow-hidden` wrapper — or clipped to zero height by an `inset()`
clip-path — reports a ratio of 0 no matter where the page is scrolled. Putting
`whileInView` on that element deadlocks it: it must be visible in order to be
told to become visible, so it never animates. Eight section headlines were
silently invisible before this was caught. The fix is in `MaskReveal`: the
trigger lives on the unclipped wrapper, and the inner element is driven by
variant name.

**Reduced motion must not change the tree.** `useReducedMotion()` returns
`null` on the server and on the first client render. Branching the DOM
*structure* on it (returning one `<div>` on the server, two on the client)
throws React #418 and hydration fails, taking interactivity with it. Same for
seeding state from it — `useState(reduce ? to : 0)` rendered `0` server-side
and `14` client-side. Structure and initial state are now fixed; only
animation values branch.

## 3. SEO and AEO

**Pages** (was one; now a real site).

- `/` — home
- `/gyms` — branch index with a schematic map and `ItemList` schema
- `/gyms/[branch]` × 7 — the local-intent landing pages
- `/training` — topic hub with `ItemList` schema
- `/training/[topic]` × 8 — the intent-led cluster
- `/about` — the founder, for E-E-A-T
- `sitemap.xml`, `robots.txt`, `llms.txt`, a real 404

25 routes, all prerendered.

**Two clusters, crossed.** The location pages answer *where*, the training
pages answer *what*, and they link into each other.

"Best gym in Hyderabad" is a hard head term and is not won by repeating the
phrase; it is won by owning the cluster around it. "Gym in Kokapet" and
"women only gym timings Hyderabad" are winnable now and feed authority back.
Each location page has a unique title, description, canonical, `HealthClub`
node with its own opening hours, and two branch-specific answers so it is not
a near-duplicate of its six siblings. Each training page carries its own
`FAQPage`, an answer-first intro, and a sidebar linking every branch, so the
topic cluster feeds the location cluster rather than pooling on orphans. Every
spoke is reachable from the sitewide footer.

**Structured data.** A cross-referenced `@graph` rather than loose blobs:
`Organization` (the hub) → `WebSite` → seven `HealthClub` nodes →
`BreadcrumbList` → `FAQPage` → `Person` for the founder. Everything is joined
by `@id` so a crawler resolves one entity, not seven unrelated businesses.

`aggregateRating`, `streetAddress` and `telephone` are emitted **per branch,
only where the real listing data exists**. Gachibowli has all three (4.9 from
877 Google reviews, verified against its public listing); the other six emit
none of them. Unverifiable rating markup is a manual-action risk and a wrong
address is worse than a missing one, so both stay absent until the data lands.

`areaServed` on each branch carries the actual neighbourhoods it serves, not
just "Hyderabad". That, plus the matching visible "Serving …" line on each
branch page, is what lets a branch surface for a "gym near <area>" query.

**AEO.** Answer engines lift *passages*, and a passage that opens "We also
offer…" cannot be extracted because it has no subject. So every answer in
`answers` (in `content.ts`) opens with a complete, self-contained sentence
that resolves the question without needing the heading, the page or the brand
for context, then adds at most two sentences. 40–70 words each.

These render as a real `<dl>`, not an accordion — collapsed content is
weighted less, and extractability is the whole point of that block. The FAQ
accordion still exists further down for a human who is browsing.

`/llms.txt` gives crawlers a flat brief: entity summary, founder credentials,
every branch with hours, and the citation rule. `robots.ts` explicitly admits
GPTBot, ClaudeBot, PerplexityBot and Google-Extended — being cited in an AI
answer is the goal, not a leak.

**E-E-A-T.** A named expert with a verifiable competitive record is the
strongest asset this business has and it was buried on the old site. It now
has its own URL, `Person` schema with `award` and `knowsAbout`, and a link
from every page's footer.

## 4. The branch map

`/gyms` plots all seven branches on a schematic coordinate map, positioned
from `mapPosition` in `content.ts` (percentages, x west-to-east, y
north-to-south).

Deliberately **not** an embedded map tile: that costs a third-party request, a
consent banner and an API key, and buys nothing. The question a visitor
actually has is "which one is on my side of the city", and a plot answers it
in one glance at zero network cost.

- It is supplementary, never the only path. Every pin is a real link named
  after its branch, and the full list with hours sits directly below it.
- Pins carry a **number** below `md` and a **name** above it. Labels collide
  at phone widths, so the branch cards underneath are numbered to match and
  act as the key.
- The phone plot is `aspect-[3/5]` rather than `4/5` for a measurable reason:
  the vertical gap between the Gachibowli and Kondapur pins is 8% of the panel
  height, and at `4/5` that put their 44px tap targets on top of each other.
- `map-check.mjs` asserts zero pin overlaps and zero sub-44px targets at both
  1440px and 390px.

Branch pages with verified review excerpts also render them (`BranchReviews`).
Those are shown visibly but **not** emitted as schema.org `Review` nodes:
review markup needs a named author, the excerpts arrive without one, and
inventing authors to satisfy the schema is exactly the fabricated-credibility
move that earns a manual action. The verified `aggregateRating` already
carries the rating claim from the same public listing.

## 5. Accessibility

- Every text pair clears WCAG AA; the numbers are in the table above
- All touch targets ≥ 48px; a mobile action bar keeps the primary CTA in
  thumb reach and clears the iOS home indicator via `env(safe-area-inset-bottom)`
- Visible ember focus ring on everything focusable, never removed
- Branch picker is a real tablist; FAQ uses `aria-expanded` / `aria-controls`
- One `<h1>` per page, sequential headings, real breadcrumb `<nav>`
- Reduced motion removes movement and keeps comprehension; a
  `@media (scripting: none)` fallback shows all reveal content with JS off
- Pinch zoom is not disabled

`node verify.mjs` audits all six routes in both motion modes plus 375px:
stuck reveals, horizontal overflow, `h1` count, and page errors. Currently
clean on all.

## 6. Before launch

Marked `TODO` in the source:

1. **WhatsApp number** — `business.whatsapp.number` is a placeholder, and
   every CTA on the site routes through it.
2. **Branch street addresses and phone numbers — six of seven still missing.**
   Gachibowli is done (address, phone, plus code, 4.9 from 877 reviews) and
   its schema, llms.txt entry, hero badge and review section all light up from
   that data automatically. Begumpet, Abids, Kondapur, Kokapet, Hafeezpet and
   Saidabad emit no address, phone or rating until the same fields are filled
   in `content.ts`. Nothing else needs changing: every surface is already
   conditional on the data existing. This remains the highest-value missing
   item for local ranking.
3. **Photography** — all images are verified Unsplash stock. Swap the `image`
   fields in `content.ts` and the inline `photo()` calls.
4. **`sameAs` social profiles** on the Organization node — this is how Google
   reconciles the site with the Business Profile.
5. **Search Console verification token** in `layout.tsx`, then submit
   `sitemap.xml`.
6. **An OG image.** Metadata is wired; the asset is missing.

Two deliberate omissions, worth keeping:

- **No portrait under the founder's name.** Imran Khan is a real person and
  the site ships with stock photography. His section is built around his
  record instead. Drop a real photograph into the framed slot and the layout
  absorbs it.
- **No avatars on member reviews.** Same reason. Real names get typographic
  monograms.

## 7. Content

Everything the site says lives in `src/lib/content.ts`, sourced from
thefitnessedge.in. Nothing is invented: no fake tiers, no fake ratings, no
rounded-up member counts. The business publishes exactly two prices, so the
site shows exactly two prices and routes the rest to a consultation. Branch
`area` copy is public geography only and claims nothing about the premises.
