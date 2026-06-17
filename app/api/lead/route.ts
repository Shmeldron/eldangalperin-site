import { checkLeadRateLimit, clientIp } from "@/lib/limits";
import { deliverLead, leadCaptureEnabled, validateLead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  if (!leadCaptureEnabled()) {
    return json({ code: "disabled", error: "Lead capture is currently offline." }, 503);
  }

  const ip = clientIp(req);
  if (!(await checkLeadRateLimit(ip))) {
    return json({ code: "rate_limited", error: "Too many submissions — give it a moment." }, 429);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ code: "bad_request", error: "Invalid request." }, 400);
  }

  const result = validateLead(payload);
  if (!result.ok) {
    return json({ code: "bad_request", error: result.error }, 400);
  }

  try {
    await deliverLead(
      { email: result.email, note: result.note },
      { ip, at: new Date().toISOString() }
    );
  } catch (err) {
    console.error("[lead] delivery error", err);
    return json({ code: "error", error: "Couldn't send that — please try the contact section." }, 500);
  }

  return json({ ok: true }, 200);
}
