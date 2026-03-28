"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fade/slide sections in on scroll. Keeps initial paint light (opacity-0 until visible).
 */
export default function Reveal({ children, className = "", delayMs = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }

    // Trigger a bit earlier so sections don’t feel empty while scrolling
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -2% 0px", threshold: 0.04 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? undefined : 0,
        transform: visible ? undefined : "translate3d(0, 28px, 0)",
        transition: visible ? `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
