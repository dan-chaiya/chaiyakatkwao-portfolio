import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { systemPrompt } from "@/lib/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: systemPrompt,
    messages,
    maxTokens: 512,
  });

  return new Response(result.textStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
