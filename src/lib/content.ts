/**
 * Single source of truth for everything the page says.
 *
 * Shared copy for the demo. Keep claims general until the business supplies
 * approved facts and identifiers.
 */

export const business = {
  name: "The Fitness Edge",
  short: "Fitness Edge",
  city: "Hyderabad",
  tagline: "A practical place to train",
  url: "http://localhost:3000",
  /** Online coaching desk hours, per the site's WhatsApp support block. */
  supportHours: "Monday to Saturday, 10am - 5pm",
  whatsapp: {
    // TODO: replace with the gym's real WhatsApp business number (digits only,
    // country code first). The link degrades to wa.me's own search if wrong.
    number: "919000000000",
    message:
      "Hi Fitness Edge, I'd like to know more about membership and a trial session.",
  },
} as const;

export const whatsappHref = `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(
  business.whatsapp.message,
)}`;

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */

export type Program = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
};

export const programs: Program[] = [
  {
    slug: "strength",
    title: "Strength & Cardio",
    summary:
      "Barbell, machine and conditioning work programmed around your current health and training age.",
    image: "photo-1517836357463-d25dfeac3438",
    alt: "Lifter setting up over a loaded barbell on a gym floor",
  },
  {
    slug: "recomposition",
    title: "Fat Loss & Muscle Gain",
    summary:
      "Body recomposition through proven method: measured training load paired with a nutrition plan you can hold.",
    image: "photo-1583454110551-21f2fa2afe61",
    alt: "Close-up of an athlete gripping a dumbbell from the rack",
  },
  {
    slug: "personal",
    title: "Personal Training",
    summary:
      "One coach, your schedule, your plan. Programmes are built around your current fitness level.",
    image: "photo-1581009146145-b5ef050c2e1e",
    alt: "Trainer working through a cable press in a well-equipped gym",
  },
  {
    slug: "group",
    title: "Group & HIIT",
    summary:
      "CrossFit, kickboxing and HIIT sessions. The room does half the work of getting you through the set.",
    image: "photo-1594381898411-846e7d193883",
    alt: "Member mid-set during a floor conditioning workout",
  },
  {
    slug: "yoga",
    title: "Yoga & Mobility",
    summary:
      "Flexibility, breathing and recovery work that keeps the heavy days repeatable instead of costly.",
    image: "photo-1546483875-ad9014c88eba",
    alt: "Member training on a bench in a naturally lit gym floor",
  },
];

/* -------------------------------------------------------------------------- */

/** How the gym describes its own process. Verb-led, no "Step 1" labels. */
export const method = [
  {
    title: "Consultation",
    body: "We start with your body type, health history and what you actually want out of this.",
  },
  {
    title: "Programming",
    body: "A training plan built for your goal and your calendar, not a template handed to everyone.",
  },
  {
    title: "Nutrition",
    body: "A diet plan that fits Hyderabad food and your working hours, so you can keep it past week three.",
  },
  {
    title: "Weekly review",
    body: "Assessments every week. If the numbers are not moving, the plan changes, not your motivation.",
  },
  {
    title: "Coaching",
    body: "Certified trainers and health coaches on the floor with you, correcting form before it costs you.",
  },
  {
    title: "Recovery",
    body: "Mobility, flexibility and stress work, because the recovery is where the training becomes results.",
  },
] as const;

/* -------------------------------------------------------------------------- */

export type Branch = {
  slug: string;
  name: string;
  hours: { window: string; note?: string }[];
  /** Continuous-hours branches get a flag so the UI can call that out. */
  continuous?: boolean;
  /**
   * One line of genuine local context for the area, used in the location
   * page intro and meta description. Geography only. Nothing is claimed
   * about the branch itself that is not published.
   */
  area: string;
  /** The single fact that makes this branch different from the other six. */
  standout: string;
  /** Verified listing details, added only where the business has supplied them. */
  address?: string;
  phone?: string;
  plusCode?: string;
  nearbyAreas: readonly string[];
  mapPosition: { x: number; y: number };
};

export const branches: Branch[] = [
  {
    slug: "gachibowli",
    name: "Gachibowli",
    hours: [{ window: "6:00 am - 10:00 pm", note: "Continuous, no midday break" }],
    continuous: true,
    area: "West Hyderabad's IT corridor, near the Financial District and HITEC City.",
    standout:
      "The only branch open continuously from 6am to 10pm, with no midday close.",
    phone: "+91 99999 00000",
    nearbyAreas: ["Gachibowli", "Financial District", "HITEC City", "Anjaiah Nagar"],
    mapPosition: { x: 28, y: 39 },
  },
  {
    slug: "begumpet",
    area: "Central Hyderabad, close to Begumpet railway station and the Greenlands junction.",
    standout: "A central-city floor built around early-morning and after-work training windows.",
    name: "Begumpet",
    hours: [{ window: "6:00 am - 10:00 am" }, { window: "5:00 pm - 10:00 pm" }],
    nearbyAreas: ["Begumpet", "Greenlands", "Begumpet railway station"],
    mapPosition: { x: 58, y: 30 },
  },
  {
    slug: "abids",
    area: "The old commercial heart of Hyderabad, near Koti and the GPO.",
    standout: "The longest morning window of the split-timing branches, open until 11am.",
    name: "Abids",
    hours: [{ window: "6:00 am - 11:00 am" }, { window: "5:00 pm - 10:00 pm" }],
    nearbyAreas: ["Abids", "Koti", "Hyderabad GPO"],
    mapPosition: { x: 58, y: 48 },
  },
  {
    slug: "kondapur",
    area: "West Hyderabad, between Gachibowli and Madhapur.",
    standout: "Morning training runs to noon, which suits shift and hybrid schedules.",
    name: "Kondapur",
    hours: [{ window: "6:00 am - 12:00 pm" }, { window: "5:00 pm - 10:00 pm" }],
    nearbyAreas: ["Kondapur", "Madhapur", "Gachibowli"],
    mapPosition: { x: 39, y: 31 },
  },
  {
    slug: "kokapet",
    area: "Hyderabad's Neopolis and Financial District growth corridor, south west of Gachibowli.",
    standout: "Morning training runs to noon, in one of the city's fastest-growing residential areas.",
    name: "Kokapet",
    hours: [{ window: "6:00 am - 12:00 pm" }, { window: "5:00 pm - 10:00 pm" }],
    nearbyAreas: ["Kokapet", "Neopolis", "Financial District"],
    mapPosition: { x: 24, y: 57 },
  },
  {
    slug: "hafeezpet",
    area: "West Hyderabad, off the Miyapur to Kondapur stretch.",
    standout: "The latest close in the chain, with the floor open until 11pm.",
    name: "Hafeezpet",
    hours: [{ window: "6:00 am - 10:00 am" }, { window: "5:00 pm - 11:00 pm" }],
    nearbyAreas: ["Hafeezpet", "Miyapur", "Kondapur"],
    mapPosition: { x: 27, y: 21 },
  },
  {
    slug: "saidabad",
    area: "South east Hyderabad, near Santosh Nagar and Malakpet.",
    standout: "Reserves 11am to 4pm as a women-only floor, every day.",
    name: "Saidabad",
    hours: [
      { window: "6:00 am - 11:00 am", note: "Unisex" },
      { window: "11:00 am - 4:00 pm", note: "Women only" },
      { window: "5:00 pm - 10:00 pm", note: "Unisex" },
    ],
    nearbyAreas: ["Saidabad", "Santosh Nagar", "Malakpet"],
    mapPosition: { x: 67, y: 72 },
  },
];

/* -------------------------------------------------------------------------- */

export const amenities = [
  "Modern cardio, strength and functional equipment",
  "Personal lockers",
  "Separate cardio, weightlifting and class zones",
  "Sanitised floors, clean washrooms with showers",
  "Nutrition cafe for post-workout refuelling",
] as const;

/** Safe offer placeholders until approved figures are supplied. */
export const offers = [
  {
    kicker: "Membership",
    price: "Pricing",
    unit: "on request",
    title: "Full floor access",
    points: [
      "Access to cardio, strength and functional zones",
      "Group classes including HIIT, yoga and kickboxing",
      "Induction session with a certified trainer",
      "Seven branches across Hyderabad",
    ],
    primary: true,
  },
  {
    kicker: "Nutrition",
    price: "Pricing",
    unit: "on request",
    title: "Protein and supplements",
    points: [
      "Premium protein stocked in-house",
      "Guidance on what your plan actually needs",
      "Available to members at all branches",
    ],
    primary: false,
  },
] as const;

/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "What are the timings at each branch?",
    a: "They vary by location. Gachibowli runs continuously from 6am to 10pm. Most other branches open 6am and run a morning and an evening window. Saidabad reserves 11am to 4pm for women only. The branch selector above lists every window.",
  },
  {
    q: "Which classes are available?",
    a: "Strength training, cardio, HIIT, CrossFit, kickboxing and yoga, plus specialised personal training. Classes are pitched at mixed levels and scaled by the coach on the floor.",
  },
  {
    q: "Do you offer personal training?",
    a: "Yes. Our trainers programme to your specific goal and current fitness level, whether that is a first 5k, a body recomposition, or building consistent training habits.",
  },
  {
    q: "Is this suitable for complete beginners?",
    a: "Yes. Members range from first-timers to competitive athletes. Everyone starts with a consultation, and the first weeks are built around learning the movements safely.",
  },
  {
    q: "How do I book a session?",
    a: `Message us on WhatsApp, ${business.supportHours}, or walk into any branch. Trial sessions and last-minute bookings are handled the same way.`,
  },
] as const;

/* -------------------------------------------------------------------------- */

export const nav = [
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/gyms", label: "Branches" },
  { href: "/#membership", label: "Membership" },
  { href: "/#faq", label: "FAQ" },
] as const;

export type TrainingPage = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  intro: string;
  sections: readonly {
    heading: string;
    body: string;
    bullets?: readonly string[];
  }[];
  faqs: readonly { q: string; a: string }[];
};

/** Intent-led pages built from services and facts already published by the gym. */
export const trainingPages: readonly TrainingPage[] = [
  {
    slug: "personal-training",
    title: "Personal training in Hyderabad",
    kicker: "One coach. Your plan.",
    description:
      "Personal training in Hyderabad from internationally certified coaches at The Fitness Edge. Start with a consultation, then train against a plan built around your goal and schedule.",
    intro:
      "Personal training at The Fitness Edge starts with a consultation covering your body type, health history, training age and goal. The coach then writes the work around your calendar rather than handing you a generic routine.",
    sections: [
      { heading: "A plan that changes when the numbers do", body: "Programming, nutrition and weekly review sit together. If the numbers are not moving, the plan changes instead of asking you to rely on motivation.", bullets: ["Goal and health-history consultation", "Measured training load", "Nutrition guidance that fits Hyderabad food and working hours", "Weekly review and programme adjustments"] },
      { heading: "Coaching on the floor", body: "The team coaches movement quality in real time, correcting form and helping each member train at an appropriate level." },
    ],
    faqs: [{ q: "Is personal training available at every branch?", a: "The Fitness Edge offers personal training across its Hyderabad branch network. Message the coaching desk to confirm the coach and time available at the branch nearest you." }, { q: "How much does personal training cost?", a: "Personal training is quoted after consultation because the programme length and coaching requirement determine the price." }],
  },
  {
    slug: "beginner-gym-programme",
    title: "Beginner gym programme in Hyderabad",
    kicker: "Start with the first week",
    description: "A beginner gym programme in Hyderabad with consultation-first coaching, movement instruction and support from certified trainers at The Fitness Edge.",
    intro: "You do not need to be fit before joining a gym. The Fitness Edge starts beginners with a consultation, teaches the movements safely and builds the first weeks around consistency rather than punishment.",
    sections: [
      { heading: "What happens first", body: "The first conversation covers your body type, health history, work pattern and what you want out of training. That context shapes the starting load, exercise choice and pace.", bullets: ["Learn the main movement patterns", "Train at a manageable starting intensity", "Ask questions on the floor", "Review the plan as your confidence grows"] },
      { heading: "A gym for first-timers and athletes", body: "The same floors serve complete beginners, members returning after a break and competitive athletes. Exercises are scaled by the coach rather than assuming everyone starts at the same level." },
    ],
    faqs: [{ q: "Can I join if I have never trained before?", a: "Yes. Beginners start with a consultation and learn the movements safely with certified trainers on the floor." }, { q: "What should I bring for my first session?", a: "Wear comfortable training clothes and shoes, bring any relevant health information, and message the coaching desk before visiting so the branch can confirm the current timing." }],
  },
  {
    slug: "womens-gym-timings",
    title: "Women-only gym timings in Hyderabad",
    kicker: "A clear window at Saidabad",
    description: "Women-only gym timings in Hyderabad at The Fitness Edge Saidabad, with a dedicated 11am to 4pm floor and unisex sessions before and after.",
    intro: "The Fitness Edge Saidabad reserves 11am to 4pm as a women-only floor every day. Outside that window, the branch is unisex from 6am to 11am and 5pm to 10pm.",
    sections: [
      { heading: "Saidabad schedule", body: "The women-only window is part of the published Saidabad schedule, not a temporary appointment slot.", bullets: ["6:00am to 11:00am, unisex", "11:00am to 4:00pm, women only", "5:00pm to 10:00pm, unisex"] },
      { heading: "Women across the network", body: "Women also train at all seven branches during their general hours. For personal training, members can ask the coaching desk about the coach and timing available for their preferred branch." },
    ],
    faqs: [{ q: "Which branch has women-only gym timings?", a: "Saidabad reserves 11am to 4pm every day for a women-only floor. The branch is unisex from 6am to 11am and 5pm to 10pm." }, { q: "Can women train at other Fitness Edge branches?", a: "Yes. Women train at all seven branches during general hours." }],
  },
  {
    slug: "strength-and-conditioning",
    title: "Strength and conditioning in Hyderabad",
    kicker: "Build capacity, not noise",
    description: "Strength and conditioning in Hyderabad using barbell, machine, cardio and functional work programmed around your training age at The Fitness Edge.",
    intro: "Strength work at The Fitness Edge combines resistance training with conditioning. The starting point depends on your current health, training age and goal, not on a fixed class template.",
    sections: [
      { heading: "The floor has room for different goals", body: "Members can work through strength, cardio and functional zones, with certified trainers adjusting the load and movement choice to the person in front of them.", bullets: ["Barbell and free-weight work", "Machine-based strength training", "Cardio and conditioning", "Functional training and mobility"] },
      { heading: "Repeatable training", body: "Recovery and mobility are part of the method because the goal is to make the next training day possible, not to turn one hard session into a week away." },
    ],
    faqs: [{ q: "Is strength training suitable for beginners?", a: "Yes. Beginners start with a consultation and learn movements safely before load and complexity increase." }, { q: "Do you offer cardio as well as weights?", a: "Yes. The published programme mix includes cardio, strength and functional training zones." }],
  },
  {
    slug: "fat-loss-coaching",
    title: "Fat-loss coaching in Hyderabad",
    kicker: "Training plus a plan you can keep",
    description: "Fat-loss and body-recomposition coaching in Hyderabad with measured training, nutrition guidance and weekly review at The Fitness Edge.",
    intro: "Fat loss at The Fitness Edge is treated as a programme rather than a punishment. Training load, food choices, working hours and weekly progress all sit in the same conversation.",
    sections: [
      { heading: "Body recomposition, measured", body: "The coaching team pairs resistance and conditioning work with nutrition guidance that fits Hyderabad food and real working hours. Progress is reviewed so the programme can change when the evidence changes." },
      { heading: "Support beyond the first plan", body: "The process includes consultation, programming, nutrition, weekly review, coaching and recovery. That structure is designed to make the work repeatable past the first few weeks." },
    ],
    faqs: [{ q: "Do you provide a diet plan?", a: "Nutrition planning is part of the consultation-led process. The plan is built around your goal, food context and schedule." }, { q: "Can beginners join a fat-loss programme?", a: "Yes. Every member starts with a consultation and the first weeks are scaled to their starting point." }],
  },
  {
    slug: "gym-membership-prices",
    title: "Gym membership prices in Hyderabad",
    kicker: "Clear starting prices",
    description: "The Fitness Edge offers gym membership and nutrition products in Hyderabad. Pricing is available on request, with personal training quoted after consultation.",
    intro: "The Fitness Edge keeps pricing simple: membership, nutrition products and personal training are quoted on request after a conversation about your needs.",
    sections: [
      { heading: "Membership access", body: "Membership includes access to cardio, strength and functional zones, group classes including HIIT, yoga and kickboxing, and an induction session.", bullets: ["Cardio, strength and functional zones", "HIIT, yoga and kickboxing group classes", "Induction with a certified trainer", "Ask about branch access"] },
      { heading: "What needs a consultation", body: "Personal training and specialist programmes are quoted individually because the programme length and coaching requirement determine the price. Message the coaching desk before joining." },
    ],
    faqs: [{ q: "How much is Fitness Edge membership?", a: "Pricing is available on request. Confirm the current offer and branch terms with the coaching desk before joining." }, { q: "Does one membership cover all branches?", a: "Ask the coaching desk about current access terms for the branch or branches you plan to use." }],
  },
  {
    slug: "equipment-guide",
    title: "Gym equipment at The Fitness Edge",
    kicker: "A floor built for more than one goal",
    description: "Explore the equipment and facilities published by The Fitness Edge: cardio, strength, functional training, lockers, showers and a nutrition cafe across seven Hyderabad branches.",
    intro: "The Fitness Edge publishes a practical equipment mix instead of a novelty list: cardio, strength and functional zones with the facilities members need around a session.",
    sections: [
      { heading: "What is on the floor", body: "The published amenities include modern cardio, strength and functional equipment, with separate zones for different kinds of training.", bullets: ["Modern cardio equipment", "Strength and free-weight equipment", "Functional training area", "Separate cardio, weightlifting and class zones"] },
      { heading: "Around the session", body: "Members can also use personal lockers, clean washrooms with showers and the nutrition cafe for post-workout refuelling. Confirm branch-specific availability before travelling." },
    ],
    faqs: [{ q: "Does every branch have the same equipment?", a: "The chain describes a consistent coaching and membership standard, but branch-specific equipment details are not published for every location. Ask the coaching desk about a particular machine before visiting." }, { q: "Are showers available?", a: "Showers and clean washrooms are listed among the published amenities. Confirm current availability at your chosen branch." }],
  },
  {
    slug: "trainers",
    title: "Fitness Edge trainers in Hyderabad",
    kicker: "Coaching with a competitive foundation",
    description: "Meet the coaching approach at The Fitness Edge in Hyderabad, supported by trainers who build programmes around each member's current fitness level.",
    intro: "The Fitness Edge coaching approach starts with a conversation about your current fitness level, goals and schedule, then builds a plan that can be adjusted over time.",
    sections: [
      { heading: "A practical method", body: "The coaching process moves from consultation to programming, nutrition, weekly review, coaching and recovery. The point is not a single hard session; it is a plan that can be adjusted and repeated." },
      { heading: "Coaching built around you", body: "Programmes are adapted to your current fitness level, goals and schedule. Ask the coaching desk about trainer availability and the options at your preferred branch." },
    ],
    faqs: [{ q: "How does The Fitness Edge coaching work?", a: "The coaching process starts with a consultation, then combines programming, nutrition guidance, weekly review, coaching and recovery around your current fitness level." }, { q: "Can I request a specific trainer?", a: "Message the coaching desk with your branch, goal and preferred schedule so the team can confirm current trainer availability." }],
  },
] as const;

/** Ticker copy, taken from the gym's own rotating strapline. */
export const ticker = [
  "Personal training",
  "HIIT",
  "Yoga",
  "Kickboxing",
  "CrossFit",
  "Nutrition counselling",
  "Strength & conditioning",
  "Group classes",
] as const;

/* -------------------------------------------------------------------------- */

/**
 * Answer Engine Optimisation blocks.
 *
 * These exist to be quoted. Each answer opens with a complete, self-contained
 * sentence that resolves the question without needing the heading, the page
 * or the brand for context, then adds at most two sentences of detail. That
 * shape is what generative search engines lift; a passage that starts with
 * "We also offer..." cannot be extracted because it has no subject.
 *
 * Kept to 40-70 words each. Every claim traces to thefitnessedge.in.
 */
export const answers = [
  {
    q: "What kind of gym is The Fitness Edge?",
    a: "The Fitness Edge is a gym in Hyderabad offering strength, cardio, group classes, yoga, nutrition guidance and personal training. Programmes are built around each member's current fitness level, goals and schedule.",
  },
  {
    q: "How much does a gym membership cost in Hyderabad?",
    a: "Pricing is available on request. Ask the coaching desk about membership, group classes, nutrition products and personal training options for your goals and schedule.",
  },
  {
    q: "Which gym in Hyderabad is open 24 hours?",
    a: "The Fitness Edge Gachibowli is open continuously from 6am to 10pm with no midday break, the longest unbroken window in the chain. Hafeezpet runs latest into the night, closing at 11pm. The other five branches run a morning window and an evening window, with the exact times listed on each branch page.",
  },
  {
    q: "Are there women-only gym timings in Hyderabad?",
    a: "The Fitness Edge Saidabad reserves 11am to 4pm as a women-only floor every day. Outside that window the branch is unisex, opening 6am to 11am and 5pm to 10pm. Women train at all seven branches during general hours, and female members can request a female trainer for personal training sessions.",
  },
  {
    q: "Where is The Fitness Edge Gachibowli?",
    a: "The Fitness Edge Gachibowli branch details, opening hours and available training options are listed on its branch page. Contact details are placeholders for this private demo.",
  },
  {
    q: "Is The Fitness Edge suitable for beginners?",
    a: "Yes. Every member at The Fitness Edge starts with a consultation covering body type, health history and goals before any programme is written. First weeks focus on learning movements safely, with certified trainers correcting form on the floor. The chain trains everyone from complete beginners to competitive athletes across its seven Hyderabad branches.",
  },
] as const;

/**
 * Short, factual entity summary. Repeated verbatim in the llms.txt file and
 * used as the fallback meta description. Consistent entity descriptions
 * across a site are what let an answer engine resolve who you are.
 */
export const entitySummary =
  `${business.name} is a gym in ${business.city}, India, offering personal training, group classes, strength and cardio coaching, yoga and nutrition guidance. Pricing is available on request.`;
