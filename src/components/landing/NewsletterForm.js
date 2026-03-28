"use client";

import { useState } from "react";

/** SUPABASE: insert into `newsletter_subscribers` or call Edge Function */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
        window.setTimeout(() => setDone(false), 2500);
        // await supabase.from('newsletter_subscribers').insert({ email })
      }}
    >
      <input
        type="email"
        required
        name="newsletter_email"
        placeholder="Email"
        className="h-10 flex-1 rounded-full border border-stone-800 bg-stone-900 px-4 text-sm text-white outline-none placeholder:text-stone-600 focus:border-stone-600 focus:ring-2 focus:ring-stone-700"
      />
      <button
        type="submit"
        className="h-10 shrink-0 rounded-full bg-white px-5 text-sm font-semibold text-[#0f0f0d] transition hover:bg-stone-100 active:scale-[0.98]"
      >
        {done ? "Thanks!" : "Join"}
      </button>
    </form>
  );
}
