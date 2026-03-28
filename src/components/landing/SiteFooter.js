import NewsletterForm from "./NewsletterForm";

/**
 * SUPABASE: `site_settings` for social URLs, footer email, legal links
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-800 bg-[#0f0f0d] py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[15px] font-bold tracking-tight text-white">
              Apex<span className="text-stone-500">Coach</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-stone-500">
              Premium coaching for sustainable fat loss, strength, and confidence.
            </p>
            <p className="mt-4 text-sm">
              <a
                href="mailto:hello@apexcoach.example"
                className="font-medium text-stone-400 transition-colors hover:text-white"
              >
                hello@apexcoach.example
              </a>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { label: "Instagram", href: "#" },
                { label: "YouTube", href: "#" },
                { label: "LinkedIn", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-stone-800 px-4 py-1.5 text-xs font-medium text-stone-500 transition hover:border-stone-600 hover:text-stone-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-600">
                Navigate
              </p>
              <ul className="mt-4 space-y-2 text-sm text-stone-500">
                {[
                  ["#about", "About"],
                  ["#programs", "Programs"],
                  ["#results", "Results"],
                  ["#process", "Process"],
                  ["#book", "Book"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="transition-colors hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-600">
                Newsletter
              </p>
              <p className="mt-4 text-sm text-stone-500">
                Weekly training tips—no spam.
                {/* SUPABASE: `newsletter_subscribers` or hook to MailerLite / Resend */}
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-stone-800 pt-8 text-center text-xs text-stone-600">
          © {new Date().getFullYear()} ApexCoach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
