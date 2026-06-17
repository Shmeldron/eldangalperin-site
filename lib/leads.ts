/**
 * Lead capture for the public AI assistant.
 *
 * - `validateLead` is pure (validated by unit tests).
 * - `deliverLead` fans out to two best-effort sinks: an email via Resend and a
 *   capped Redis list. Each is skipped gracefully when its env vars are absent;
 *   one failing never blocks the other (Promise.allSettled).
 */
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

export const MAX_EMAIL_CHARS = 120;
export const MAX_NOTE_CHARS = 600;

// Deliberately simple: one @, a dot in the domain, no spaces. Good enough for a
// contact-intent signal; the real verification is Eldan replying.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadValidation =
  | { ok: true; email: string; note: string }
  | { ok: false; error: string };

export function validateLead(input: unknown): LeadValidation {
  if (!input || typeof input !== "object") return { ok: false, error: "Invalid request." };
  const { email, note } = input as { email?: unknown; note?: unknown };

  if (typeof email !== "string") return { ok: false, error: "Email is required." };
  const trimmedEmail = email.trim();
  if (
    trimmedEmail.length === 0 ||
    trimmedEmail.length > MAX_EMAIL_CHARS ||
    !EMAIL_RE.test(trimmedEmail)
  ) {
    return { ok: false, error: "Please enter a valid email." };
  }

  let trimmedNote = "";
  if (note != null) {
    if (typeof note !== "string") return { ok: false, error: "Invalid note." };
    trimmedNote = note.trim().slice(0, MAX_NOTE_CHARS);
  }

  return { ok: true, email: trimmedEmail, note: trimmedNote };
}

const hasResend = Boolean(
  process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL && process.env.LEAD_TO_EMAIL
);
const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

/** True when at least one sink is configured; the route 503s otherwise. */
export function leadCaptureEnabled(): boolean {
  return hasResend || hasUpstash;
}

type LeadRecord = { email: string; note: string; ip: string; at: string };

async function sendLeadEmail(r: LeadRecord): Promise<void> {
  if (!hasResend) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL!,
    to: process.env.LEAD_TO_EMAIL!,
    subject: "New lead from the site",
    text: `Email: ${r.email}\nNote: ${r.note || "(none)"}\nAt: ${r.at}\nIP: ${r.ip}`,
  });
}

async function logLeadToRedis(r: LeadRecord): Promise<void> {
  if (!hasUpstash) return;
  const redis = Redis.fromEnv();
  await redis.lpush("eg:leads", JSON.stringify(r));
  await redis.ltrim("eg:leads", 0, 499); // keep the last 500
}

/** Fan out to both sinks; throws only if BOTH reject. */
export async function deliverLead(
  lead: { email: string; note: string },
  meta: { ip: string; at: string }
): Promise<void> {
  const record: LeadRecord = { ...lead, ip: meta.ip, at: meta.at };
  const results = await Promise.allSettled([sendLeadEmail(record), logLeadToRedis(record)]);
  const attempted = results.filter((_, i) => (i === 0 ? hasResend : hasUpstash));
  if (attempted.length > 0 && attempted.every((r) => r.status === "rejected")) {
    throw new Error("All configured lead sinks failed.");
  }
}
