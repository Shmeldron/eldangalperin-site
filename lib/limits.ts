/**
 * Guardrails for the public AI assistant.
 *
 * - Per-IP rate limit (burst protection).
 * - Hard monthly request cap (runaway-cost protection).
 *
 * Durable across serverless instances when Upstash Redis env vars are set
 * (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN). Without them it falls
 * back to a best-effort in-memory limiter — fine for low traffic / preview,
 * but set up Upstash before relying on the monthly cap in production.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const PER_IP_LIMIT = Number(process.env.AI_RATE_LIMIT_PER_MIN ?? 8);
const MONTHLY_CAP = Number(process.env.AI_MONTHLY_REQUEST_CAP ?? 1500);
const LEAD_LIMIT = Number(process.env.LEAD_RATE_LIMIT_PER_MIN ?? 3);

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

export const durableLimits = hasUpstash;

const redis = hasUpstash ? Redis.fromEnv() : null;

const ipLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(PER_IP_LIMIT, "1 m"),
      prefix: "eg:rl",
    })
  : null;

const leadLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(LEAD_LIMIT, "1 m"),
      prefix: "eg:lead-rl",
    })
  : null;

// ---- in-memory fallbacks ----
const memWindow = new Map<string, number[]>();
const memLeadWindow = new Map<string, number[]>();
const memMonth = { key: "", count: 0 };

function memSlidingWindow(map: Map<string, number[]>, ip: string, limit: number): boolean {
  const now = Date.now();
  const cutoff = now - 60_000;
  const hits = (map.get(ip) ?? []).filter((t) => t > cutoff);
  hits.push(now);
  map.set(ip, hits);
  return hits.length <= limit;
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (ipLimiter) {
    const { success } = await ipLimiter.limit(ip);
    return success;
  }
  return memSlidingWindow(memWindow, ip, PER_IP_LIMIT);
}

export async function checkLeadRateLimit(ip: string): Promise<boolean> {
  if (leadLimiter) {
    const { success } = await leadLimiter.limit(ip);
    return success;
  }
  return memSlidingWindow(memLeadWindow, ip, LEAD_LIMIT);
}

/** First client IP from proxy headers, or "unknown". Shared by both API routes. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Returns true if a request is still within the monthly budget (and reserves one). */
export async function reserveMonthlyBudget(monthKey: string): Promise<{
  ok: boolean;
  count: number;
  cap: number;
}> {
  if (redis) {
    const key = `eg:budget:${monthKey}`;
    const count = await redis.incr(key);
    // ~35 days TTL so old months expire.
    if (count === 1) await redis.expire(key, 60 * 60 * 24 * 35);
    return { ok: count <= MONTHLY_CAP, count, cap: MONTHLY_CAP };
  }
  if (memMonth.key !== monthKey) {
    memMonth.key = monthKey;
    memMonth.count = 0;
  }
  memMonth.count += 1;
  return { ok: memMonth.count <= MONTHLY_CAP, count: memMonth.count, cap: MONTHLY_CAP };
}
