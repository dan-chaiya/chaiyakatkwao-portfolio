import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { systemPrompt } from "@/lib/system-prompt";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: systemPrompt,
    messages,
    maxTokens: 512,
  });

  return result.toUIMessageStreamResponse();
}
