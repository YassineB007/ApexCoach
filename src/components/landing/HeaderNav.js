"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#results", label: "Results" },
  { href: "#process", label: "Process" },
  { href: "#book", label: "Book" },
];

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 border-b border-stone-200 backdrop-blur-xl shadow-sm shadow-stone-900/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8 lg:px-12">
        <Link
          href="/"
          className={`text-[15px] font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? "text-[#0f0f0d]" : "text-white"
          }`}
          onClick={() => setOpen(false)}
        >
          Apex
          <span className={`transition-colors duration-300 ${scrolled ? "text-stone-400" : "text-white/45"}`}>
            Coach
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                scrolled
                  ? "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#book"
            className={`ml-3 inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200 active:scale-[0.97] ${
              scrolled
                ? "bg-[#0f0f0d] text-white hover:bg-stone-800"
                : "bg-white text-[#0f0f0d] hover:bg-stone-100"
            }`}
          >
            Free consult
          </Link>
        </nav>

        <button
          type="button"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden ${
            scrolled
              ? "border-stone-200 bg-white text-stone-800"
              : "border-white/20 bg-white/10 text-white backdrop-blur-md"
          }`}
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="border-t border-stone-100 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-0.5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#book"
              className="mt-3 rounded-full bg-[#0f0f0d] py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Book free consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
