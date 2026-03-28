"use client";

/**
 * Same-page #anchors with Next.js often scroll only once (hash unchanged → browser skips).
 * Always scroll into view and sync the URL hash on click.
 */
export default function HashLink({ href, className, children, onClick, ...rest }) {
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || !href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      try {
        const path = `${window.location.pathname}${window.location.search}${href}`;
        window.history.replaceState(null, "", path);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
