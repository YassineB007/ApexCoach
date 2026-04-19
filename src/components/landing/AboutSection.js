import { LANDING_IMAGES } from "@/lib/landing-images";
import Image from "next/image";
import HashLink from "./HashLink";

const STATS = [
  { value: "800+", label: "Clients coached" },
  { value: "10 yrs", label: "Experience" },
  { value: "92%", label: "Retention rate" },
  { value: "4", label: "Countries" },
];

/**
 * SUPABASE: map coach profile from `coaches` (or `profiles`) — bio, credentials[], photo_url
 */
export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden bg-[#f5f1eb]">
      {/* Mobile: copy first, then image. Desktop: image left, copy right. */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-1 flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:order-2 lg:py-24 lg:pl-14 xl:pl-20 xl:pr-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
            About
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0f0d] sm:text-5xl">
            Coaching built around your life,{" "}
            <span className="text-stone-400">not the other way around.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-600 sm:text-[17px]">
            I combine strength training, sustainable nutrition, and weekly
            accountability—so you always know what to do next. No guesswork,
            no shame, just a clear plan and consistent execution.
          </p>

          <ul className="mt-8 max-w-lg space-y-3">
            {[
              "10+ years coaching · 800+ client sessions",
              "Specialty: body recomposition, busy professionals, return-to-training",
              "Online + in-person programs across 4 countries",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-sm text-stone-700 sm:text-[15px]"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f0f0d]" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Evidence-based", "Habit-first", "Training + nutrition", "No crash diets"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium text-stone-700"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <HashLink
              href="#consult"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#0f0f0d] px-7 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
            >
              Free consult
            </HashLink>
            <HashLink
              href="#programs"
              className="inline-flex h-11 items-center justify-center rounded-full border border-stone-300 px-7 text-sm font-medium text-[#0f0f0d] transition hover:border-stone-950"
            >
              View programs
            </HashLink>
          </div>
        </div>

        <div className="relative order-2 aspect-[16/11] w-full sm:aspect-[16/10] lg:order-1 lg:aspect-auto lg:min-h-[min(100svh,720px)]">
          <Image
            src={LANDING_IMAGES.coach}
            alt="Coach portrait — replace with your photo"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 720px"
            unoptimized
            className="object-cover object-center sm:object-[center_25%] lg:object-[center_22%]"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-[#f5f1eb] to-transparent lg:block" />
        </div>
      </div>

      {/* Stats strip — full width, gap-px trick for 1px dividers */}
      <div className="grid grid-cols-2 gap-px bg-stone-200/70 border-t border-stone-200/70 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#f5f1eb] px-4 py-8 text-center sm:px-8 sm:py-10">
            <p className="text-3xl font-bold text-[#0f0f0d] sm:text-4xl">{s.value}</p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
