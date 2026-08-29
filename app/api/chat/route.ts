import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { systemPrompt } from "@/lib/system-prompt";

// This route spends real Anthropic credit and sits on a public marketing site
// with no login in front of it. Everything below exists to bound what one
// caller can spend, not to be clever.

const MAX_MESSAGES = 24;
const MAX_CHARS_PER_MESSAGE = 2_000;
const MAX_TOTAL_CHARS = 12_000;

// Fixed-window limiter, per IP. In-memory, so it resets on cold start and is not
// shared between instances — it stops a loop from a single client, which is the
// realistic abuse here. Move to Vercel KV / Upstash if this ever needs to hold
// across instances.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    // Opportunistic sweep so the map cannot grow without bound.
    if (hits.size > 5_000) {
      for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
    }
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
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

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return new Response("Too many requests — give it a minute.", {
      status: 429,
      headers: { "Retry-After": String(limit.retryAfter) },
    });
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
