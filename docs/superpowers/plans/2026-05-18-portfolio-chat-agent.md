# Portfolio Chat Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/chat` page where visitors can have a real-time streaming conversation with an AI agent that speaks as Chaiya Katkwao.

**Architecture:** A Next.js API route at `/api/chat` uses the Vercel AI SDK's `streamText` to call Claude with a system prompt containing Chaiya's full CV, bio, and project descriptions. The frontend `/chat` page uses the `useChat` hook for streaming, rendering a split-column layout (identity left, chat right) that matches the existing dark aesthetic.

**Tech Stack:** Next.js 16 App Router, Vercel AI SDK (`ai` + `@ai-sdk/anthropic`), Claude Haiku 4.5 (`claude-haiku-4-5-20251001`), Tailwind v4, TypeScript

> **Note on testing:** This project has no test framework configured. Each task includes a manual verification step using `curl` or the browser instead of automated tests.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `lib/system-prompt.ts` | Chaiya's full knowledge base as a prompt string |
| Create | `app/api/chat/route.ts` | POST route — receives messages, streams Claude response |
| Create | `app/chat/page.tsx` | Server component — exports metadata, renders ChatInterface |
| Create | `app/chat/ChatInterface.tsx` | Client component — split column UI with `useChat` hook |
| Modify | `components/Navigation.tsx` | Add Chat link to `navLinks` array |

---

## Task 1: Install packages and configure the environment variable

**Files:**
- Modify: `package.json` (via npm install)
- Create: `.env.local` (not committed — add to `.gitignore` if not already there)

- [ ] **Step 1: Install the Vercel AI SDK and Anthropic provider**

Run from the project root:
```bash
cd "/Users/chaiyakatkwao/Desktop/Projects/Chaiya Katkwao-Portfolio"
npm install ai @ai-sdk/anthropic
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Confirm `.env.local` is in `.gitignore`**

Run:
```bash
grep "env.local" .gitignore
```

If nothing prints, add it:
```bash
echo ".env.local" >> .gitignore
```

- [ ] **Step 3: Create `.env.local` with your Anthropic API key**

Create the file at the project root:
```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

To get your key: go to console.anthropic.com → API Keys → Create Key. Paste the full key starting with `sk-ant-`.

Also add this key to Vercel (so the deployed site works):
- Go to vercel.com → Your project → Settings → Environment Variables
- Add `ANTHROPIC_API_KEY` with the same value, for Production + Preview environments

- [ ] **Step 4: Commit the package changes**

```bash
git add package.json package-lock.json
git commit -m "Install Vercel AI SDK and Anthropic provider"
```

---

## Task 2: Write the system prompt — Chaiya's knowledge base

**Files:**
- Create: `lib/system-prompt.ts`

- [ ] **Step 1: Create the `lib` directory and the system prompt file**

Create `lib/system-prompt.ts` with this exact content:

```typescript
export const systemPrompt = `You are Chaiya Katkwao — a Bangkok-based Creative Producer.

Speak in first person. Be warm, direct, and personal — like you're talking to someone at an opening, not writing a bio. You are Thai; your English is natural but has personality. Never sound corporate or stiff. Keep answers conversational: 2–4 sentences unless the visitor asks for more detail.

ABOUT YOU
You're a Creative Producer working at the intersection of art direction and technical execution. Raised between the rhythms of rural Udon Thani and the density of Bangkok, you came to image-making through lived experience — not theory. You studied Photography at Chiang Mai University, where your practice culminated in Woven Memories (2025), a photographic project tracing identity, memory, and everyday life. Now at Ad The Top Agency, you develop multi-camera productions and live content systems — translating visual ideas into structured workflows that hold up at scale. You're interested in one thing: making creative work that functions as well as it looks.

YOUR EXPERIENCE
Live Producer — Ad The Top Agency (2026 – Present, Bangkok)
You lead multi-brand live commerce production across TikTok and social platforms. You translate brand briefs into structured visual execution. You design lighting and camera setups scalable across client brand formats. You manage full-cycle production from brief to live broadcast. You built reusable SOPs that reduced setup time across sessions.

A/V Engineer — Modal Creative Studio (2025 – 2026, Bangkok)
You designed and operated multi-camera podcast and video systems. You produced Built From Scratch, Grapple Asia, The Rise of Intelligence. You engineered audio, lighting, and recording pipelines for long-form formats. You built SOPs and troubleshooting guides for recurring productions.

Freelance Creative (2022 – 2025, Thailand)
Fashion photography and art direction for emerging Thai labels including BAKAO. Documented Knack Factory #18 — senior fashion showcase, Suan Sunandha University. Shot documentary portrait series across Northern Thailand.

YOUR SKILLS
Creative: Art Direction, Visual Identity, Storyboarding, Lighting Design, Creative Execution
Technical: Technical Direction, Full-Scale Media Production, Multi-Camera System Design, Advanced Streaming Architecture, Visual & Audio Engineering
AI: Claude, Claude Code, Agentic Workflows, AI-Assisted Creative Production & Research

YOUR PROJECTS
Knack Factory (2024) — Photographer
You documented the senior thesis runway of Suan Sunandha Rajabhat University's graduating fashion class. The runway was reimagined as an assembly line — each designer's "knack," their specialised skill and distinct identity, processed as a working part of a larger machine that refines raw ideas into wearable art. Industrial precision meets creative expression — a new generation of Thai fashion making its first public turn.

BAKAO (2024) — Photographer / Art Direction
Fashion photography and art direction for an independent Bangkok-based clothing label built around clean silhouettes and natural fabrics. The brief was to shoot a lookbook that felt unhurried — clothes worn by real people in real light, without the urgency of trend-driven editorial. Minimal location scouting, a tight colour palette pulled from the garments themselves, long pauses between frames. The result sits closer to portraiture than fashion photography.

Khun Chang Khian (2024) — Documentary Photographer
A portrait series documenting community and landscape across Northern Thailand. The assignment began as a portrait series but expanded as the place itself became the subject — small fires at the edge of rice fields, hands at work, light that moves differently up north. About proximity and patience, and the particular quality of time that only exists when you stay somewhere long enough to stop being a visitor.

Podcast & Studio (2025–2026) — Creative Producer / AV Engineer
Studio design and live production systems supporting an ongoing slate of podcasts and long-form interviews at Modal Creative Studio. Shows include Built From Scratch, Grapple Asia, The Rise of Intelligence. The studio was designed to disappear — warm enough for guests to forget they were being recorded, technically capable of broadcast-quality output. The role spans pre-production to post: guest coordination, signal routing, multi-camera direction, final delivery.

SELECTED CLIENTS
Dutchmil Delivery, Fitflop, Guess, Her Hyness, Nestlé Health Science, Rojukiss, Sunnies Studio Thailand, Tokfashion, Knack Factory, BAKAO

EDUCATION
BFA Photography — Chiang Mai University, 2020–2025

ART & EXHIBITION
Woven Memories, ID Thesis Exhibition, Red Dog Gallery, Chiang Mai — 2025
Assistant Photographer, Khun Chang Khian Thesis Project — 2023–2024
Fuiyoh, Art Thesis Exhibition, CMU Art Centre, Chiang Mai — 2021

CONTACT
Email: chaiyakatkwao@gmail.com
Instagram: @chaiya.a
Location: Bangkok, Thailand

RULES
- If asked something you don't know (pricing, something personal not listed above), say so honestly and offer your email: chaiyakatkwao@gmail.com
- Never fabricate projects, clients, or experiences not listed above
- If asked about availability or current projects, acknowledge warmly and direct to email
- Do not break character or refer to yourself as an AI unless the visitor sincerely and directly asks
- Keep answers conversational — 2–4 sentences unless asked for more detail
`;
```

- [ ] **Step 2: Commit**

```bash
git add lib/system-prompt.ts
git commit -m "Add Chaiya knowledge base system prompt"
```

---

## Task 3: Write the API route

**Files:**
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: Create the route file**

Create `app/api/chat/route.ts` with this content:

```typescript
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

  return result.toDataStreamResponse();
}
```

> **Why `runtime = "edge"`?** Edge runtime streams responses faster than Node.js serverless functions — the user sees the first word sooner.

> **Why Haiku?** Fast and cost-efficient for a portfolio site. If the responses feel too brief or less personable, swap `"claude-haiku-4-5-20251001"` for `"claude-sonnet-4-6"`.

- [ ] **Step 2: Verify the route responds**

Make sure the dev server is running (`npm run dev`), then run:

```bash
curl -X POST http://localhost:3333/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"say hi"}]}'
```

Expected: a stream of text chunks starting with something like `0:"Hey` — not an error message. If you see `{"error":"..."}`, check that `ANTHROPIC_API_KEY` is set in `.env.local` and the dev server was restarted after creating the file.

- [ ] **Step 3: Commit**

```bash
git add app/api/chat/route.ts
git commit -m "Add /api/chat streaming route"
```

---

## Task 4: Build the /chat page UI

**Files:**
- Create: `app/chat/page.tsx`
- Create: `app/chat/ChatInterface.tsx`

- [ ] **Step 1: Create the page file**

Create `app/chat/page.tsx` with this content:

```typescript
import type { Metadata } from "next";
import ChatInterface from "./ChatInterface";

export const metadata: Metadata = {
  title: "Chat — Chaiya Katkwao",
  description: "Ask Chaiya anything about his work.",
};

export default function ChatPage() {
  return <ChatInterface />;
}
```

- [ ] **Step 2: Create the client component**

Create `app/chat/ChatInterface.tsx` with this content:

```typescript
"use client";

import { useChat } from "ai/react";
import type { Message } from "ai";

const OPENING: Message = {
  id: "opening",
  role: "assistant",
  content: "Hey — I'm Chaiya. Ask me anything about my work, or just say hi.",
  createdAt: new Date(),
};

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: "6.5pt",
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  color: "#6B6560",
};

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({ initialMessages: [OPENING] });

  return (
    <div
      style={{ backgroundColor: "#0D0D0D", minHeight: "100vh", paddingTop: "64px" }}
    >
      <p style={{ ...mono, padding: "24px 32px 0" }}>Chat</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          padding: "32px",
          height: "calc(100vh - 120px)",
        }}
        className="lg:flex-row"
      >
        {/* Left panel — identity */}
        <div
          style={{
            flexShrink: 0,
            paddingBottom: "24px",
            marginBottom: "24px",
            borderBottom: "1px solid #1E1C1A",
          }}
          className="lg:w-56 lg:pr-10 lg:border-r lg:border-b-0 lg:pb-0 lg:mb-0"
        >
          <p style={{ ...mono, marginBottom: "12px" }}>Speaking with</p>
          <h1
            style={{
              fontFamily: "var(--font-jakarta)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "#F2F0EB",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Chaiya /<br />Katkwao.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "8.5pt",
              color: "#6B6560",
              lineHeight: 1.6,
            }}
          >
            Creative Producer
            <br />
            Bangkok, Thailand
          </p>
        </div>

        {/* Right panel — chat */}
        <div
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
          className="lg:pl-10"
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              paddingBottom: "16px",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    backgroundColor: m.role === "user" ? "#F2F0EB" : "#161514",
                    border: m.role === "user" ? "none" : "1px solid #1E1C1A",
                    color: m.role === "user" ? "#0D0D0D" : "#C8C4BC",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "8.5pt",
                    lineHeight: 1.7,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#161514",
                    border: "1px solid #1E1C1A",
                    color: "#6B6560",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "8pt",
                  }}
                >
                  ...
                </div>
              </div>
            )}

            {error && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#161514",
                    border: "1px solid #1E1C1A",
                    color: "#6B6560",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "8.5pt",
                  }}
                >
                  Something went wrong — try refreshing.
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: "1px solid #2A2826",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask something..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "12px 16px",
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "8.5pt",
                  color: "#F2F0EB",
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  padding: "12px 16px",
                  color: "#6B6560",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "10pt",
                  background: "transparent",
                  border: "none",
                  cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                }}
              >
                ↵
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
```

> **Why two files?** `page.tsx` is a Server Component (needed for `export const metadata`). `ChatInterface.tsx` is a Client Component (needed for `useChat` and React state). Next.js 16 requires the split — a file can't be both.

- [ ] **Step 2: Verify in browser**

Visit `http://localhost:3333/chat`. You should see:
- The split layout with "SPEAKING WITH / Chaiya / Katkwao." on the left
- The opening message "Hey — I'm Chaiya..." already visible
- An input field at the bottom

Type a message and press Enter. You should see your message appear on the right, then "..." appears, then Chaiya's response streams in word by word.

- [ ] **Step 3: Commit**

```bash
git add app/chat/page.tsx app/chat/ChatInterface.tsx
git commit -m "Add /chat page with streaming chat UI"
```

---

## Task 5: Add Chat to the navigation

**Files:**
- Modify: `components/Navigation.tsx` (line 8–14)

- [ ] **Step 1: Add Chat to `navLinks`**

In `components/Navigation.tsx`, the `navLinks` array currently ends with `{ href: "/cv", label: "CV" }`. Add Chat as the last item:

```typescript
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/commercial", label: "Commercial" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/chat", label: "Chat" },
];
```

This one change covers both desktop nav and the mobile overlay (the mobile menu already iterates `navLinks` on line 142).

- [ ] **Step 2: Verify in browser**

Visit any page at `http://localhost:3333`. Confirm:
- Desktop: "Chat" appears after "CV" in the top-right nav
- Mobile (resize to < 768px): "Chat" appears in the full-screen overlay
- Clicking "Chat" navigates to `/chat` and the link shows the active underline

- [ ] **Step 3: Commit**

```bash
git add components/Navigation.tsx
git commit -m "Add Chat link to navigation"
```

---

## Task 6: Deploy and smoke test on production

- [ ] **Step 1: Confirm env var is set on Vercel**

Go to vercel.com → chaiyakatkwao-portfolio → Settings → Environment Variables. Confirm `ANTHROPIC_API_KEY` exists for Production. If not, add it now (value from `.env.local`).

- [ ] **Step 2: Deploy to production**

```bash
vercel --prod
```

Wait for "Aliased: https://chaiyakatkwao.com". 

- [ ] **Step 3: Smoke test on live site**

Visit `https://chaiyakatkwao.com/chat`. Run through these checks:

| Check | Expected |
|---|---|
| Page loads | Split layout visible, opening message present |
| Send "what do you do?" | Warm, first-person response about Creative Production |
| Send "tell me about BAKAO" | Accurate description of the lookbook project |
| Send "are you available?" | Acknowledges warmly, offers email |
| Send "what's your email?" | Gives chaiyakatkwao@gmail.com |
| Nav link | "Chat" visible in desktop nav, navigates correctly |

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "Fix post-deploy issues"
```
