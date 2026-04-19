import HashLink from "./HashLink";

/**
 * SUPABASE: replace `PROGRAMS` with `select * from programs where published = true order by sort_order`
 */
const FEATURED = {
  title: "90-day transformation",
  blurb:
    "Full coaching stack: personalized training plan, nutrition targets, weekly reviews, and habit tracking — everything you need to get there and stay there.",
  price: "Custom — apply for pricing",
  cta: "Apply now",
  duration: "90 days",
  features: [
    "Fully personalized training plan",
    "Nutrition targets + meal guidance",
    "Weekly 1:1 video check-ins",
    "Habit & progress tracking",
    "Unlimited coach messaging",
    "Mid-program plan adjustments",
  ],
};

const OTHER_PROGRAMS = [
  {
    title: "Personal training",
    blurb:
      "In-person or live video sessions with form checks, progression, and real-time adjustments.",
    price: "From $120 / session",
    cta: "Request availability",
    features: [
      "Live video or in-person sessions",
      "Form & technique coaching",
      "Progressive overload planning",
      "Direct messaging support",
    ],
  },
  {
    title: "Online program",
    blurb:
      "Structured 12-week training blocks with video demos. Best for self-starters who want autonomy.",
    price: "$79 / month",
    cta: "Start online",
    features: [
      "12-week structured program",
      "Full video exercise library",
      "Bi-weekly check-ins",
      "Private community access",
    ],
  },
];

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ProgramsSection() {
  return (
    <section id="programs" className="scroll-mt-20 bg-white py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              Programs
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0f0d] sm:text-5xl">
              Same standard of coaching.{" "}
              <span className="text-stone-400">Your format.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-stone-500 sm:text-right">
            Every option includes clear programming and direct access to your coach.
          </p>
        </div>

        {/* Asymmetric bento: featured (large) left + two stacked right */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          {/* Featured — dark, full feature list */}
          <div className="flex flex-col rounded-2xl bg-[#0f0f0d] p-6 sm:p-10 lg:p-12">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex rounded-full border border-white/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/45">
                Most popular
              </span>
              <span className="text-xs text-white/30">{FEATURED.duration}</span>
            </div>

            <h3 className="mt-7 text-3xl font-bold text-white sm:text-4xl">{FEATURED.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/55">{FEATURED.blurb}</p>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {FEATURED.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                  <CheckIcon className="text-white/35" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
              <p className="text-sm font-semibold text-white/55">{FEATURED.price}</p>
              <HashLink
                href="#consult"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[#0f0f0d] transition hover:bg-stone-100 active:scale-[0.98]"
              >
                {FEATURED.cta}
              </HashLink>
            </div>
          </div>

          {/* Other two — stacked */}
          <div className="flex flex-col gap-4">
            {OTHER_PROGRAMS.map((p) => (
              <div
                key={p.title}
                className="flex flex-1 flex-col rounded-2xl border border-stone-200 bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-xl hover:shadow-stone-950/5"
              >
                <h3 className="text-lg font-bold text-[#0f0f0d]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.blurb}</p>

                <ul className="mt-5 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-stone-500">
                      <CheckIcon className="text-stone-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-5">
                  <p className="text-sm font-semibold text-[#0f0f0d]">{p.price}</p>
                  <HashLink
                    href="#consult"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-stone-200 px-5 text-xs font-semibold text-[#0f0f0d] transition hover:border-[#0f0f0d] hover:bg-[#0f0f0d] hover:text-white"
                  >
                    {p.cta}
                  </HashLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
