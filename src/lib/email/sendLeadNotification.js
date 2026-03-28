import dns from "node:dns";
import nodemailer from "nodemailer";

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeAppPassword(raw) {
  return String(raw ?? "")
    .replace(/^\uFEFF/, "")
    .replace(/\s+/g, "");
}

/**
 * Sends a notification email when someone requests a callback on the landing page.
 * Requires GMAIL_USER + GMAIL_APP_PASSWORD in env (Gmail SMTP + App Password).
 *
 * Uses port 587 + STARTTLS (often works on networks that block 465).
 * Forces IPv4 for smtp.gmail.com to avoid broken IPv6 routes timing out.
 */
export async function sendLeadNotification({
  fullName,
  phone,
  email,
  message,
  bestTime,
}) {
  const user = process.env.GMAIL_USER?.trim();
  const pass = normalizeAppPassword(process.env.GMAIL_APP_PASSWORD);
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim() || user;

  if (!user || !pass) {
    throw new Error("Email is not configured (missing GMAIL_USER or GMAIL_APP_PASSWORD).");
  }
  if (!to) {
    throw new Error("Email is not configured (missing LEAD_NOTIFY_EMAIL / GMAIL_USER).");
  }

  /** Antivirus / corporate SSL inspection often injects a self-signed cert → ESOCKET "self-signed certificate in chain". Set GMAIL_TLS_INSECURE=1 only on trusted dev machines; never in production unless you understand the risk. */
  const tlsInsecure = process.env.GMAIL_TLS_INSECURE === "1";

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 25_000,
    tls: {
      minVersion: "TLSv1.2",
      ...(tlsInsecure ? { rejectUnauthorized: false } : {}),
    },
    /** Prefer IPv4 — fixes long hangs when IPv6 route to Gmail is broken */
    lookup(hostname, _options, callback) {
      dns.lookup(hostname, { family: 4, all: false }, callback);
    },
  });

  const safeName = fullName.trim();
  const safePhone = phone.trim();
  const safeEmail = email.trim();
  const safeMsg = (message || "").trim() || "—";
  const safeBest = (bestTime || "").trim() || "No preference";

  const text = [
    "New callback request — ApexCoach",
    "",
    `Name: ${safeName}`,
    `Phone: ${safePhone}`,
    `Email: ${safeEmail}`,
    `Best time to call: ${safeBest}`,
    "",
    "Notes:",
    safeMsg,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;background:#f5f5f4;font-family:ui-sans-serif,system-ui,sans-serif;color:#0c0a09;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e7e5e4;">
    <tr>
      <td style="padding:24px 28px;background:#0c0a09;color:#fafaf9;">
        <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7;">ApexCoach · Lead</p>
        <h1 style="margin:10px 0 0;font-size:20px;font-weight:700;">New callback request</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px 28px;">
        <table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.6;">
          <tr><td style="padding:6px 0;color:#78716c;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(safeName)}</td></tr>
          <tr><td style="padding:6px 0;color:#78716c;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(safePhone.replace(/\s/g, ""))}" style="color:#0c0a09;">${escapeHtml(safePhone)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#78716c;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(safeEmail)}" style="color:#0c0a09;">${escapeHtml(safeEmail)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#78716c;">Best time</td><td style="padding:6px 0;">${escapeHtml(safeBest)}</td></tr>
        </table>
        <p style="margin:20px 0 8px;font-size:12px;font-weight:600;color:#78716c;text-transform:uppercase;letter-spacing:0.06em;">Notes</p>
        <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(safeMsg)}</p>
      </td>
    </tr>
  </table>
  <p style="max-width:560px;margin:16px auto 0;text-align:center;font-size:12px;color:#a8a29e;">Reply to this email goes to the visitor (Reply-To).</p>
</body>
</html>`;

  await transporter.sendMail({
    from: `"ApexCoach website" <${user}>`,
    to,
    replyTo: safeEmail,
    subject: `New callback: ${safeName}`,
    text,
    html,
  });
}
