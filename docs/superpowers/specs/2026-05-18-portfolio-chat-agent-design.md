# Portfolio Chat Agent — Design Spec
**Date:** 2026-05-18  
**Status:** Approved  

---

## Overview

A dedicated `/chat` page on chaiyakatkwao.com where visitors can have a real conversation with an AI agent that speaks as Chaiya Katkwao. Built with the Vercel AI SDK and Claude. The agent knows Chaiya's full background — CV, projects, bio — and responds warmly and directly, like talking to the actual person.

---

## Goals

- Give potential clients a fast, personal way to understand who Chaiya is and what he does
- Give curious creatives a way to explore his work conversationally
- Demonstrate applied AI skills as part of the portfolio itself

---

## Architecture

### New files

| File | Purpose |
|---|---|
| `app/chat/page.tsx` | The `/chat` page — split-column UI, client component |
| `app/api/chat/route.ts` | POST route handler — calls Claude via Vercel AI SDK |
| `lib/system-prompt.ts` | Chaiya's knowledge base as a prompt string |

### Data flow

```
Visitor types message
      ↓
app/chat/page.tsx         "use client" — useChat() hook from Vercel AI SDK
      ↓  POST /api/chat   { messages: [...] }
app/api/chat/route.ts     streamText() with Claude, passes system prompt
      ↓
Anthropic Claude API      generates response with full knowledge of Chaiya
      ↓  streamed tokens
useChat() hook            updates UI as tokens arrive — real-time typing effect
      ↓
Visitor sees response appear word by word
```

### Packages to install

```bash
npm install ai @ai-sdk/anthropic
```

### Environment variable required

```
ANTHROPIC_API_KEY=sk-ant-...
```

Set locally in `.env.local` and on Vercel dashboard under Environment Variables.

---

## UI Design

### Layout: Split Column

The page is divided into two panels:

**Left panel (narrower):**
- Eyebrow label: `SPEAKING WITH` (JetBrains Mono, uppercase, muted)
- Large display name: `Chaiya / Katkwao.` (Jakarta, heavy weight)
- Role and location: `Creative Producer — Bangkok, Thailand` (muted body text)
- Separated from chat by a vertical border rule matching the site's `#1E1C1A` divider style

**Right panel (wider):**
- Message thread — scrollable, grows upward as conversation continues
- Agent messages: dark background bubble (`#161514`), subtle border, off-white text
- Visitor messages: light background (`#F2F0EB`), dark text — visually distinct
- Input field at bottom: full-width, minimal border, placeholder `Ask something...`, submit on Enter
- Typing indicator (`...`) shown while Claude is streaming

### Opening state

When the page loads with no conversation, the agent sends an opening message automatically:

> "Hey — I'm Chaiya. Ask me anything about my work, or just say hi."

This is injected as an `initialMessages` prop on `useChat()` — it is not a real API call, just a seeded message that makes the page feel alive immediately.

### Navigation

`CHAT` is added to the main navigation alongside HOME, COMMERCIAL, GALLERY, ABOUT, CV.

---

## Knowledge Base — System Prompt

Stored in `lib/system-prompt.ts` and passed as the `system` parameter to `streamText()`. The prompt is never sent to the browser.

### Structure

```
Identity & tone instructions
      ↓
About / bio (from About page)
      ↓
Experience (from CV)
      ↓
Skills — Creative, Technical, AI
      ↓
Projects (all 4 with titles, roles, descriptions, briefs)
      ↓
Clients list
      ↓
Education & exhibitions
      ↓
Behaviour rules
```

### Tone instructions

```
You are Chaiya Katkwao — a Bangkok-based Creative Producer.
Speak in first person. Be warm, direct, and personal — like you're 
talking to someone at an opening, not writing a bio. You are Thai; 
your English is natural but has personality. Never sound corporate 
or stiff. Keep answers conversational: 2–4 sentences unless the 
visitor asks for more detail.
```

### Behaviour rules

- If asked something outside your knowledge, say so honestly and offer your email: `chaiyakatkwao@gmail.com`
- Never fabricate projects, clients, or experiences not in the prompt
- If asked about availability or pricing, acknowledge the question warmly and direct to email
- Do not break character or refer to yourself as an AI unless directly asked

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| `ANTHROPIC_API_KEY` missing or invalid | Route returns 500; UI shows "Something went wrong — try refreshing." |
| Claude slow to respond | `isLoading` state from `useChat()` shows `...` typing indicator |
| Visitor asks out-of-scope question | Handled in system prompt — agent acknowledges and offers email |
| Network failure mid-stream | `useChat()` catches the error; UI shows the error message inline |

---

## What Is NOT in Scope

- Conversation history persistence (no database — conversations are session-only)
- Rate limiting (out of scope for portfolio use; revisit if needed)
- Mobile-optimised split layout (will stack to single column on small screens naturally)
- Moderation or content filtering beyond Claude's built-in safety

---

## Success Criteria

- Visitor can ask "what do you do?" and get a warm, accurate, first-person answer
- Visitor can ask about a specific project (e.g., "tell me about BAKAO") and get detail
- Visitor can ask "are you available?" and be directed to email naturally
- Response streams in real time — no waiting for a full reply to appear
- Page matches the existing site aesthetic (dark background, same fonts, same border language)
