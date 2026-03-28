"use client";

import { LANDING_IMAGES } from "@/lib/landing-images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * SUPABASE: `site_assets.hero_image_url` overrides `LANDING_IMAGES.hero`
 */
export default function HeroSection() {
  const bgRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const el = bgRef.current;
    if (!el) return;

    let frame = 0;
    /* Parallax via margin — avoids `transform` on the image stack (Chrome often blurs GPU layers). */
    const sync = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.marginTop = `${window.scrollY * 0.2}px`;
      });
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] max-h-[1080px] overflow-hidden">
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 h-[120vh] -top-[10vh]"
      >
        <Image
          src={LANDING_IMAGES.hero}
          alt="Outdoor fitness training"
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover object-center"
        />
      </div>

      {/* Bottom gradient — text lives here */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0d]/95 via-[#0f0f0d]/45 to-[#0f0f0d]/10" />
      {/* Top fade for header legibility */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0f0f0d]/45 to-transparent" />

      {/* Bottom-anchored editorial content */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-10 pt-24 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 animate-hero-rise"
            style={{ animationDelay: "0ms" }}
          >
            1:1 coaching · programs · accountability
          </p>

          <h1
            className="mt-5 max-w-[16ch] font-bold leading-[1.02] tracking-tight text-white animate-hero-rise"
            style={{
              animationDelay: "80ms",
              fontSize: "clamp(2.6rem, 6vw, 5.25rem)",
            }}
          >
            Lose 5–10 kg in 90 days,{" "}
            <em className="not-italic text-white/50">your way.</em>
          </h1>

          <p
            className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg animate-hero-rise"
            style={{ animationDelay: "160ms" }}
          >
            A structured, coach-led system for training, nutrition, and
            habits—built around your schedule so results actually stick.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-hero-rise"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="#book"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-[#0f0f0d] shadow-xl shadow-[#0f0f0d]/20 transition duration-200 hover:bg-stone-100 active:scale-[0.98]"
            >
              Book your free consultation
            </Link>
            <Link
              href="#programs"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-medium text-white/75 transition duration-200 hover:border-white/40 hover:text-white"
            >
              View programs
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <dl
            className="mt-10 grid grid-cols-2 gap-5 border-t border-white/12 pt-8 sm:grid-cols-4 animate-hero-rise"
            style={{ animationDelay: "320ms" }}
          >
            {[
              { k: "Avg. result", v: "−8.4 kg" },
              { k: "Timeframe", v: "90 days" },
              { k: "Check-ins", v: "Weekly" },
              { k: "Format", v: "Hybrid" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-white/38">
                  {row.k}
                </dt>
                <dd className="mt-1.5 text-2xl font-bold text-white">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
