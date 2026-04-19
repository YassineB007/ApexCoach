"use client";

import { LANDING_IMAGES } from "@/lib/landing-images";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * SUPABASE: `select * from testimonials where published = true`
 * Fields: quote, name, metric, program, before_image_url, after_image_url, sort_order
 */
const TESTIMONIALS = [
  {
    quote:
      "I dropped 10kg in 12 weeks without hating my diet. The weekly check-ins kept me honest and the plan actually fit my life.",
    name: "Maya L.",
    metric: "−10 kg",
    timeframe: "12 weeks",
    program: "90-day transformation",
  },
  {
    quote:
      "Finally a program that fits travel. I'm stronger than my twenties and my energy is back. Worth every penny.",
    name: "Daniel R.",
    metric: "−7 kg",
    timeframe: "90 days",
    program: "Online program",
  },
  {
    quote:
      "Clear expectations, great communication, and workouts I can actually repeat. Completely changed my relationship with training.",
    name: "Priya S.",
    metric: "−8.5 kg",
    timeframe: "14 weeks",
    program: "Personal training",
  },
];

const RESULT_STATS = [
  { value: "120+", label: "Clients transformed" },
  { value: "−8.4 kg", label: "Average result" },
  { value: "90 days", label: "Avg. timeframe" },
  { value: "4.9 / 5", label: "Client rating" },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="h-3.5 w-3.5 fill-[#0f0f0d]" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section id="results" className="scroll-mt-20 bg-[#f5f1eb] py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              Results
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#0f0f0d] sm:text-5xl">
              Real people.{" "}
              <span className="text-stone-400">Real results.</span>
            </h2>
          </div>
        </div>

        {/* Stats strip — gap-px trick creates clean 1px dividers */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-stone-200 sm:grid-cols-4">
          {RESULT_STATS.map((s) => (
            <div key={s.label} className="bg-white px-6 py-7 text-center">
              <p className="text-2xl font-bold text-[#0f0f0d] sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* 3 testimonial cards — shown all at once, no carousel needed */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={idx}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-950/5 sm:p-7"
            >
              <Stars />
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-[#0f0f0d]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 border-t border-stone-100 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#0f0f0d]">{t.name}</p>
                    <p className="mt-0.5 text-sm font-semibold text-stone-500">{t.metric} · {t.timeframe}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                    {t.program}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Before/after — full width on small screens, two columns from sm */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
          {/* SUPABASE: before_image_url */}
          <figure className="relative aspect-[4/5] min-h-[220px] w-full overflow-hidden rounded-2xl bg-stone-200 sm:min-h-0 sm:aspect-[4/5]">
            <Image
              src={LANDING_IMAGES.testimonialBefore}
              alt="Before — wellness and movement (placeholder)"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 560px"
              unoptimized
              className="object-cover object-center sm:object-[center_35%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 to-transparent px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-sm font-bold text-white">Before</p>
              <p className="text-[10px] text-white/50">Starting point — real client photos soon</p>
            </figcaption>
          </figure>
          {/* SUPABASE: after_image_url */}
          <figure className="relative aspect-[4/5] min-h-[220px] w-full overflow-hidden rounded-2xl bg-stone-200 sm:min-h-0 sm:aspect-[4/5]">
            <Image
              src={LANDING_IMAGES.testimonialAfter}
              alt="After — active, balanced lifestyle (placeholder)"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 560px"
              unoptimized
              className="object-cover object-center sm:object-[center_45%]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 to-transparent px-4 py-4 sm:px-5 sm:py-5">
              <p className="text-sm font-bold text-white">After</p>
              <p className="text-[10px] text-white/50">Health-first habits that stick</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
