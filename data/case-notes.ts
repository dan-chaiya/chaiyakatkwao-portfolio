// data/case-notes.ts — brief-to-handover notes shown in a work's Info panel, under the
// statement. Hand-kept (import-assets.mjs does not write this file), keyed by work slug.
//
// DRAFT, not cleared for main. Every sentence is reworded from text Dan has already
// published (the CV, the /chat profile in lib/system-prompt.ts, the work's credit).
// Nothing new about a client is added here: no fees, gear lists, room photos, people's
// names or numbers Dan has not given. See plans/case-notes-clearance.md for what still
// needs his yes before any of this goes public.

export type CaseNote = [heading: string, paragraphs: string[]];

export const caseNotes: Record<string, CaseNote[]> = {
  "podcast-studio": [
    ["Engagement", ["A/V Engineer, in-house at Modal Creative Studio, Bangkok, June 2025 to January 2026."]],
    [
      "Brief",
      [
        "A studio for an ongoing slate of podcasts and long-form interviews. It had to disappear for the guest, warm enough to forget the cameras, and still deliver broadcast-quality picture and sound.",
      ],
    ],
    [
      "What I did",
      [
        "Designed and ran the multi-camera podcast and video systems: the audio, lighting and recording chain for long-form shows, from guest arrival to final delivery. Guest coordination, signal routing, multi-camera direction.",
        "Shows include Built From Scratch, Grapple Asia and The Rise of Intelligence.",
      ],
    ],
    [
      "Handover",
      [
        "SOPs and troubleshooting guides the team runs recurring shows from. The job was to build a machine that runs the same way week after week.",
      ],
    ],
  ],

  bakao: [
    [
      "Brief",
      [
        "A lookbook for an independent Bangkok clothing label built around clean silhouettes and natural fabrics. It had to feel unhurried: clothes on real people in real light, none of the rush of a trend editorial.",
      ],
    ],
    [
      "Approach",
      ["Little scouting, a palette pulled from the garments themselves, and long pauses between frames."],
    ],
    ["Result", ["Pictures closer to portraiture than fashion photography."]],
  ],

  "knack-factory": [
    [
      "The show",
      [
        "Knack Factory #18, the senior thesis runway of Suan Sunandha Rajabhat University's graduating fashion class, photographed as a university show rather than a client commission. The runway was staged as an assembly line: each designer's knack, their skill and identity, processed as one working part of a machine that refines raw ideas into wearable work.",
      ],
    ],
    ["Why it matters", ["The first public turn for a new generation of Thai fashion graduates."]],
  ],
};
