# chaiyakatkwao.com

The portfolio of Chaiya Katkwao, photographer, artist and producer in Bangkok: a numbered
archive of the work in paper and ink, where the photographs carry all the colour.

Next.js 16 (App Router) on Vercel. Every push to `main` deploys to production; every branch
gets a preview. Read `AGENTS.md` before writing Next code: this version differs from older docs.

## Where things are

| Path | What |
|---|---|
| `PRODUCT.md` | Who the site is for and what it must do. Read first. |
| `DESIGN.md` | The design system: colours, type, components, rules. |
| `app/(v2)/` | Every page: Home, `/works` (Index), `/work/[slug]`, `/information`, `/systems`, `/cv`, `/chat`. `v2.css` holds the design. |
| `app/api/chat/route.ts` | The chat's API: Claude via the AI SDK, rate-limited through Upstash Redis. |
| `components/v2/` | The page components. |
| `data/works.json` | The catalogue: works, frames, credits. Written by `scripts/import-assets.mjs`; don't edit by hand. |
| `data/frame-alt.json` | A description of every photo, keyed by its `src`. Hand-kept. |
| `data/exhibitions.ts` | The exhibition list, shared by Information and the CV. |
| `data/live-studio.ts` | Studio numbers used by the CV and the chat. |
| `lib/system-prompt.ts` | What the chat assistant knows. Keep it in step with the CV. |
| `plans/impeccable-audit-2026-10-29.md` | The last audit and everything fixed since. |

## Run it

```bash
npm install
```

```bash
npm run dev
```

Before a push, run the same checks the deploy does:

```bash
npm run lint && npx tsc --noEmit && npm run build
```

The chat needs `ANTHROPIC_API_KEY`, `KV_REST_API_URL` and `KV_REST_API_TOKEN` (set in Vercel).
Without the rate limiter a production build refuses chat requests on purpose.

## Common jobs

**Add or change a work.** Put the originals in `New/` (never committed) and the text in
`New/_curation.md`, set the frames in `PICKS` in `scripts/import-assets.mjs`, then run
`node scripts/import-assets.mjs`. It writes the images to `public/v2/`, the strip thumbnails
and `data/works.json`. Then add a description for each new frame to `data/frame-alt.json`.
To take a work down, add its curation number to `WITHDRAWN` in the same script and redirect
its URL in `next.config.mjs`.

**Change the CV.** Edit `app/(v2)/cv/page.tsx`, then with a production build running
(`npm run build && npm start`) check it still prints on one A4 page with room to spare:

```bash
node scripts/check-cv-print.mjs
```

**Change the share card** (the image shown when a link is posted): see the note at the top of
`scripts/share-card.html`.
