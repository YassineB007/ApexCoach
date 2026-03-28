"use client";

import { LANDING_IMAGES } from "@/lib/landing-images";
import Image from "next/image";
import { useState } from "react";

/**
 * SUPABASE: on submit → insert into `leads`:
 *   full_name, phone, email, message (optional), best_time (optional), source: 'landing_callback', created_at
 * Optional: Edge Function → SMS/email/CRM
 */
export default function LeadCaptureSection() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");
    setStatus("sending");

    const data = new FormData(form);
    const payload = {
      full_name: data.get("full_name"),
      phone: data.get("phone"),
      email: data.get("email"),
      best_time: data.get("best_time") || "",
      message: data.get("message") || "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof json.error === "string" ? json.error : "Something went wrong.");
        setStatus("idle");
        return;
      }
      // SUPABASE (optional): await supabase.from('leads').insert({ ...payload, source: 'landing_callback' })
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setError("Network error. Check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <section id="book" className="scroll-mt-20 bg-[#0f0f0d] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-24">
          {/* Left: heading + booking embed */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              Booking
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Ready to start?{" "}
              <span className="text-stone-500">Let's talk.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-400">
              Book a free 30-minute call or drop a message. We'll figure out
              the best program for your goal and timeline.
            </p>

            {/* SUPABASE: render iframe from `site_settings.booking_embed_html` or provider URL */}
            <div className="relative mt-8 flex min-h-[240px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 px-6 py-10 text-center">
              <Image
                src={LANDING_IMAGES.healthyMeal}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                unoptimized
                className="object-cover opacity-10"
              />
              <div className="relative z-[1] max-w-sm">
                <p className="text-base font-semibold text-stone-200">Pick a time that works for you</p>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  Your live calendar will show here after you connect Cal.com, Calendly, or another scheduler in your
                  site settings.
                </p>
              </div>
            </div>
          </div>

          {/* Right: lead form */}
          <div>
            <h3 className="text-sm font-semibold text-stone-400">Request a call back</h3>
            <p className="mt-1 text-sm text-stone-600">
              {/* SUPABASE: `leads` table + RLS for public insert */}
              Leave your details and we’ll call you—usually within one business day.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="lead-name" className="text-xs font-medium text-stone-500">
                  Full name <span className="text-stone-600">*</span>
                </label>
                <input
                  id="lead-name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-600 transition focus:border-stone-600 focus:ring-2 focus:ring-stone-700"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-phone" className="text-xs font-medium text-stone-500">
                    Phone <span className="text-stone-600">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="+1 555 000 0000"
                    className="mt-1.5 w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-600 transition focus:border-stone-600 focus:ring-2 focus:ring-stone-700"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="text-xs font-medium text-stone-500">
                    Email <span className="text-stone-600">*</span>
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-600 transition focus:border-stone-600 focus:ring-2 focus:ring-stone-700"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-best-time" className="text-xs font-medium text-stone-500">
                  Best time to call <span className="font-normal text-stone-600">(optional)</span>
                </label>
                <select
                  id="lead-best-time"
                  name="best_time"
                  defaultValue=""
                  className="mt-1.5 w-full rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm text-white outline-none transition focus:border-stone-600 focus:ring-2 focus:ring-stone-700"
                >
                  <option value="">No preference</option>
                  <option value="morning">Morning (9am–12pm)</option>
                  <option value="afternoon">Afternoon (12pm–5pm)</option>
                  <option value="evening">Evening (5pm–8pm)</option>
                  <option value="any">Any time</option>
                </select>
              </div>

              <div>
                <label htmlFor="lead-msg" className="text-xs font-medium text-stone-500">
                  What should we know? <span className="font-normal text-stone-600">(optional)</span>
                </label>
                <textarea
                  id="lead-msg"
                  name="message"
                  rows={3}
                  placeholder="Goal, injuries, schedule, timezone…"
                  className="mt-1.5 w-full resize-none rounded-xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-600 transition focus:border-stone-600 focus:ring-2 focus:ring-stone-700"
                />
              </div>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-[#0f0f0d] shadow-lg transition duration-200 hover:bg-stone-100 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                    ? "Received — talk soon!"
                    : "Request a call back"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
