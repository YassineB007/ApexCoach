import { sendLeadNotification } from "@/lib/email/sendLeadNotification";

/** Nodemailer + Gmail SMTP require Node (not Edge). */
export const runtime = "nodejs";

/** Ensure env is read at request time (not statically optimized away). */
export const dynamic = "force-dynamic";

const MAX_LEN = 4000;

/** Gmail app passwords may include spaces; strip them. */
function normalizeAppPassword(raw) {
  return String(raw ?? "")
    .replace(/^\uFEFF/, "")
    .replace(/\s+/g, "");
}

/**
 * Read SMTP env at request time inside this file (reliable on Vercel; avoids some bundlers
 * stripping `process.env` from shared modules). Use bracket access for the same reason.
 *
 * Supported keys (first match wins):
 * - user: GMAIL_USER, SMTP_USER
 * - pass: GMAIL_APP_PASSWORD, SMTP_PASS, SMTP_PASSWORD
 * - to: LEAD_NOTIFY_EMAIL (else same as user)
 */
function readLeadSmtpEnv() {
  const user =
    String(process.env["GMAIL_USER"] ?? process.env["SMTP_USER"] ?? "")
      .trim() || "";
  const pass = normalizeAppPassword(
    process.env["GMAIL_APP_PASSWORD"] ??
      process.env["SMTP_PASS"] ??
      process.env["SMTP_PASSWORD"],
  );
  const to =
    String(process.env["LEAD_NOTIFY_EMAIL"] ?? "").trim() || user || "";
  return { user, pass, to };
}

function badRequest(message) {
  return Response.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const fullName = typeof body.full_name === "string" ? body.full_name : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const email = typeof body.email === "string" ? body.email : "";
  const message = typeof body.message === "string" ? body.message.slice(0, MAX_LEN) : "";
  const bestTime = typeof body.best_time === "string" ? body.best_time.slice(0, 120) : "";

  if (!fullName.trim() || fullName.length > 200) {
    return badRequest("Name is required.");
  }
  if (!phone.trim() || phone.length > 40) {
    return badRequest("Phone is required.");
  }
  if (!email.trim() || email.length > 320) {
    return badRequest("Email is required.");
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return badRequest("Invalid email address.");
  }

  const smtp = readLeadSmtpEnv();
  if (!smtp.user || !smtp.pass) {
    const isDev = process.env["NODE_ENV"] === "development";
    console.error("[api/lead] SMTP env missing", {
      hasUser: Boolean(smtp.user),
      hasPass: Boolean(smtp.pass),
      checkedKeys: {
        GMAIL_USER: Boolean(process.env["GMAIL_USER"]),
        GMAIL_APP_PASSWORD: Boolean(process.env["GMAIL_APP_PASSWORD"]),
        SMTP_USER: Boolean(process.env["SMTP_USER"]),
        SMTP_PASS: Boolean(process.env["SMTP_PASS"]),
      },
    });
    return Response.json(
      {
        ok: false,
        error: "Email is not configured on the server.",
        hint: isDev
          ? "Create .env.local with GMAIL_USER and GMAIL_APP_PASSWORD (see .env.example), then stop and run `npm run dev` again."
          : "In Vercel: Project → Settings → Environment Variables — add GMAIL_USER and GMAIL_APP_PASSWORD for Production (and Preview if needed). Names must match exactly. Then Deployments → Redeploy.",
      },
      { status: 503 },
    );
  }

  try {
    await sendLeadNotification({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message,
      bestTime,
      smtp,
    });
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? String(err.code) : "";
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[api/lead]", code || msg, err);
    return Response.json(
      {
        ok: false,
        error: "Could not send email. Try again later.",
        ...(process.env["NODE_ENV"] === "development"
          ? { debug: msg.slice(0, 200), code: code || undefined }
          : {}),
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
