import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { systemPrompt } from "@/lib/system-prompt";

// This route spends real Anthropic credit and sits on a public marketing site
// with no login in front of it. Everything below exists to bound what one
// caller can spend, not to be clever.

// Hard per-request bounds. These hold on every instance regardless of the
// limiter, so they are the floor of the protection.
export const maxDuration = 30;

const MAX_MESSAGES = 24;
const MAX_CHARS_PER_MESSAGE = 2_000;
const MAX_TOTAL_CHARS = 12_000;

const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW = "60 s" as const;

// Upstash Redis, provisioned through the Vercel Marketplace. The state lives
// outside the function, so unlike the previous in-memory Map this is a true
// global cap rather than a per-instance one.
//
// NOTE: the Marketplace injects KV_REST_API_URL / KV_REST_API_TOKEN, not the
// UPSTASH_REDIS_REST_* names that Redis.fromEnv() expects — hence the explicit
// construction. fromEnv() throws here.
//
// Built lazily: Next evaluates module scope at build time, and the env vars are
// absent in that context on a clean checkout.
let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS_PER_WINDOW, WINDOW),
    prefix: "ratelimit:chat",
    analytics: false,
  });
  return limiter;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): IncomingMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages)) return null;
  if (messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  let total = 0;
  const clean: IncomingMessage[] = [];

  for (const m of messages) {
    if (typeof m !== "object" || m === null) return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    // Only the two roles the client can legitimately send. A "system" role from
    // the request body would let a caller replace the persona.
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    if (content.length > MAX_CHARS_PER_MESSAGE) return null;
    total += content.length;
    if (total > MAX_TOTAL_CHARS) return null;
    clean.push({ role, content });
  }

  return clean;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = getLimiter();
  if (rl) {
    const { success, reset } = await rl.limit(ip);
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return new Response("Too many requests — give it a minute.", {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Fail closed. Losing the limiter in production means an unmetered path to
    // a paid API, which is worse than the endpoint being briefly unavailable.
    console.error("[chat] rate limiter unavailable: KV_REST_API_* not set");
    return new Response("Chat is temporarily unavailable.", { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Malformed request.", { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return new Response("Malformed request.", { status: 400 });
  }

  const result = await streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: systemPrompt,
    messages,
    maxTokens: 512,
  });

  return new Response(result.textStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
