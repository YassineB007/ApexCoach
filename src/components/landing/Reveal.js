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

    // Generous root margin so content isn’t stuck invisible on short viewports / mobile
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "120px 0px 80px 0px", threshold: 0.01 },
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
        transform: visible ? undefined : "translate3d(0, 10px, 0)",
        transition: visible
          ? `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
