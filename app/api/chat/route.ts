import Anthropic from "@anthropic-ai/sdk";
import {
  ASSISTANT_MODEL,
  MAX_OUTPUT_TOKENS,
  buildSystemPrompt,
  sanitizeMessages,
} from "@/lib/assistant";
import { checkRateLimit, reserveMonthlyBudget } from "@/lib/limits";

export const runtime = "nodejs";
// Don't prerender / cache — this is dynamic.
export const dynamic = "force-dynamic";

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function monthKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json(
      { code: "disabled", error: "The assistant is currently offline." },
      503
    );
  }

  // --- guardrails ---
  const ip = clientIp(req);
  if (!(await checkRateLimit(ip))) {
    return json(
      { code: "rate_limited", error: "You're sending messages too fast — give it a moment." },
      429
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json({ code: "bad_request", error: "Invalid request." }, 400);
  }

  const messages = sanitizeMessages((payload as { messages?: unknown })?.messages);
  if (!messages) {
    return json({ code: "bad_request", error: "Please send a valid message." }, 400);
  }

  const budget = await reserveMonthlyBudget(monthKey());
  if (!budget.ok) {
    return json(
      {
        code: "limit_reached",
        error:
          "This AI demo has reached its monthly limit. Please reach out via the contact section instead.",
      },
      429
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const ai = anthropic.messages.stream({
          model: ASSISTANT_MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          system: buildSystemPrompt(),
          messages,
        });
        for await (const event of ai) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("[chat] stream error", err);
        controller.enqueue(
          encoder.encode("\n\n[The assistant ran into an error. Please try again.]")
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
