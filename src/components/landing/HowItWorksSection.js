import HashLink from "./HashLink";

const STEPS = [
  {
    n: "01",
    title: "Free consult",
    body: "We align on goals, schedule, and what \u201csuccess\u201d looks like in 90 days. No commitment required.",
    time: "30 min call",
  },
  {
    n: "02",
    title: "Get your custom plan",
    body: "Training blocks, nutrition targets, and habit cues are built specifically for your lifestyle and schedule.",
    time: "Within 48 hrs",
  },
  {
    n: "03",
    title: "Train with clarity",
    body: "Execute sessions, log progress, and message your coach whenever life gets messy. We adapt with you.",
    time: "Day 1 onward",
  },
  {
    n: "04",
    title: "Review & adjust weekly",
    body: "Small tweaks beat big restarts. Weekly reviews ensure your plan evolves as your fitness does.",
    time: "Every week",
  },
];

/**
 * SUPABASE: optional CMS `process_steps` table if steps become editable
 */
export default function HowItWorksSection() {
  return (
    <section id="process" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0f0d] sm:text-5xl">
              Simple path from first call to first results.
            </h2>
          </div>
          <HashLink
            href="#consult"
            className="hidden sm:inline-flex h-11 items-center justify-center rounded-full bg-[#0f0f0d] px-7 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
          >
            Start today
          </HashLink>
        </div>

        {/* Steps — cards with giant watermark numbers */}
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-stone-400 hover:bg-[#f5f1eb] hover:shadow-xl hover:shadow-stone-950/5"
            >
              {/* Giant watermark number — clipped at top-right, purely decorative */}
              <span
                className="pointer-events-none absolute -right-3 -top-5 select-none text-[6.5rem] font-black leading-none"
                style={{ color: "#ece9e3" }}
                aria-hidden
              >
                {s.n}
              </span>

              {/* Time badge */}
              <span className="relative inline-flex rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                {s.time}
              </span>

              <h3 className="relative mt-10 text-base font-bold text-[#0f0f0d]">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-stone-600">{s.body}</p>
            </li>
          ))}
        </ol>

        {/* Mobile CTA */}
        <div className="mt-10 flex sm:hidden">
          <HashLink
            href="#consult"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#0f0f0d] text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Start today — free consult
          </HashLink>
        </div>
      </div>
    </section>
  );
}
