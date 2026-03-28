/** Read Gmail SMTP settings from the environment (call from the Route Handler, not at module top level). */

export function normalizeAppPassword(raw) {
  return String(raw ?? "")
    .replace(/^\uFEFF/, "")
    .replace(/\s+/g, "");
}

/**
 * Exact names Vercel must use: GMAIL_USER, GMAIL_APP_PASSWORD (optional LEAD_NOTIFY_EMAIL).
 * Redeploy after changing env vars. Enable for Production (and Preview if you test preview URLs).
 */
export function readLeadSmtpEnv() {
  const user = process.env.GMAIL_USER?.trim();
  const pass = normalizeAppPassword(process.env.GMAIL_APP_PASSWORD);
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || user;
  return { user, pass, to };
}
