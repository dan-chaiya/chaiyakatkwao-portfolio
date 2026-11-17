# Case notes: clearance record

Branch `claude/project-thread-vni4fx`, file `data/case-notes.ts`. Answered by Dan, 17 Nov 2026.

## Answers

| # | Item | Dan's answer | What changed |
|---|---|---|---|
| 1 | Did you build the Modal studio? | No. An employee; built nothing | Modal note now says "Ran", not "Designed"; no build claim |
| 2 | "Disappear for the guest" line | Dan's own framing | Heading is "My aim", not "Brief" |
| 3 | Naming Modal, BAKAO, the three shows | They are okay | Kept as written |
| 4 | BAKAO model release, Knack Factory designers' consent | Yes | Kept as written |

## Modal lines fixed elsewhere on the site

Dan said "fix them all" on 17 Nov 2026. All three are changed on this branch.

| Where | Was | Now |
|---|---|---|
| Podcast studio credit (`data/works.json` line 765, from `New/_curation.md`) | Studio build and production, Modal Creative Studio, Bangkok | A/V Engineer, Modal Creative Studio, Bangkok |
| CV, Modal first point (`app/(v2)/cv/page.tsx` line 51) | Designed and ran the studio's multi-camera podcast set… | Ran the studio's multi-camera podcast set… |
| /chat profile (`lib/system-prompt.ts`) | "You designed and ran…"; "Studio design and live production systems"; "Creative Producer / AV Engineer"; "The job was to build a machine…" | "You ran…"; "Live production for an ongoing slate…"; "A/V Engineer"; drop the build line |

`New/_curation.md` is not in the repo, so `cleanCredit()` in `scripts/import-assets.mjs` now forces the new credit for work 19. Correct `_curation.md` on Dan's machine when convenient, then the override can go.

## Not drafted, on purpose

- No fees, gear lists, floor plans, extra room photos, people's names or numbers.
- `podcast-studio-build` (2026, Freelance, text-only row): no page yet. It needs a client name, scope and photos.
