import { sendLeadNotification } from "@/lib/email/sendLeadNotification";

/** Nodemailer + Gmail SMTP require Node (not Edge). */
export const runtime = "nodejs";

const MAX_LEN = 4000;

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

  try {
    await sendLeadNotification({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message,
      bestTime,
    });
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? String(err.code) : "";
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[api/lead]", code || msg, err);
    return Response.json(
      {
        ok: false,
        error: "Could not send email. Try again later.",
        ...(process.env.NODE_ENV === "development"
          ? { debug: msg.slice(0, 200), code: code || undefined }
          : {}),
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
