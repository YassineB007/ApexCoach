/** Shared Gmail SMTP env read — used by /api/lead and sendLeadNotification (single source of truth). */

export function normalizeAppPassword(raw) {
  return String(raw ?? "")
    .replace(/^\uFEFF/, "")
    .replace(/\s+/g, "");
}

/**
 * @returns {{ user: string, pass: string, to: string }}
 */
export function getLeadSmtpCredentials() {
  const user =
    String(process.env["GMAIL_USER"] ?? process.env["SMTP_USER"] ?? "").trim() || "";
  const pass = normalizeAppPassword(
    process.env["GMAIL_APP_PASSWORD"] ??
      process.env["SMTP_PASS"] ??
      process.env["SMTP_PASSWORD"],
  );
  const to = String(process.env["LEAD_NOTIFY_EMAIL"] ?? "").trim() || user || "";
  return { user, pass, to };
}
