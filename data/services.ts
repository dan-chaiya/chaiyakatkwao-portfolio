// data/services.ts — the freelance Creative Producer services, one list for Information
// and the /chat assistant (lib/system-prompt.ts reads it), so the two can never disagree.
// Copy rules: no prices, no em dashes, no pitch. Say what the client gets and stop.

export type Service = { number: string; title: string; terms: string; summary: string };

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Studio Design",
    terms: "Plan only",
    summary:
      "Floor plan, equipment list, lighting and audio plan, and a 3D render. The client builds it themselves or hands it to anyone.",
  },
  {
    number: "02",
    title: "Studio Build",
    terms: "Design to handover",
    summary:
      "Sourcing, contractors, installation and training, so the client's team runs the studio on its own.",
  },
  {
    number: "03",
    title: "Studio Technician",
    terms: "By the day",
    summary:
      "Room and set preparation, props, lighting, picture and sound for recorded shows, then colour grade and audio finish. No full edits.",
  },
];

export const SERVICES_TERMS =
  "The first conversation and a site visit are free, anywhere within an hour of Bangkok. After the visit, one fixed price for the whole job; work begins when the client accepts it.";
