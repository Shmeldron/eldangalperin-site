import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import {
  ANTHROPIC_MODEL,
  OPENAI_MODEL,
  MAX_OUTPUT_TOKENS,
  buildSystemPrompt,
  sanitizeMessages,
  selectProvider,
  type ChatMessage,
} from "@/lib/assistant";
import { checkRateLimit, clientIp, reserveMonthlyBudget } from "@/lib/limits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function monthKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Stream plain-text deltas from the selected provider into a controller. */
async function streamReply(
  provider: "openai" | "anthropic",
  system: string,
  messages: ChatMessage[],
  push: (text: string) => void
) {
  if (provider === "openai") {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await client.chat.completions.create({
      model: OPENAI_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      stream: true,
      messages: [{ role: "system", content: system }, ...messages],
    });
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) push(text);
    }
    return;
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const stream = anthropic.messages.stream({
    model: ANTHROPIC_MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system,
    messages,
  });
  for await (const event of stream) {
    if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
      push(event.delta.text);
    }
  }
}

export async function POST(req: Request) {
  const provider = selectProvider();
  if (!provider) {
    return json({ code: "disabled", error: "The assistant is currently offline." }, 503);
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

  const system = buildSystemPrompt();
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await streamReply(provider, system, messages, (text) =>
          controller.enqueue(encoder.encode(text))
        );
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
