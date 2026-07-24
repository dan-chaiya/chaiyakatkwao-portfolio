// data/media-manifest.ts — typed accessor over media-manifest.json.
// The front-end imports THIS, never raw /public paths. Re-run the Higgsfield
// pipeline → JSON updates → components pick up new motion automatically.
import raw from "./media-manifest.json";

export type MotionKind = "still" | "loop" | "push-in" | "hero-loop";
export type VideoType = "video/mp4" | "video/webm";

export type MotionAsset = {
  id: string;
  set: string;
  kind: MotionKind;
  flagged?: string[];                       // e.g. ["hero"]
  poster: string;
  sources: { src: string; type: VideoType }[];
  still?: { src: string; w: number; h: number }[];
  alt: string;
  aspect: number;                            // 0.5625 = 9:16, 1.7778 = 16:9
  durationS?: number;
  treatment: string[];
};

export type MediaManifest = {
  version: string;
  generatedAt: string;
  note?: string;
  assets: MotionAsset[];
};

const manifest = raw as MediaManifest;

export const media = manifest;
export const allAssets = manifest.assets;

export function getAsset(id: string): MotionAsset | undefined {
  return manifest.assets.find((a) => a.id === id);
}
export function bySet(set: string): MotionAsset[] {
  return manifest.assets.filter((a) => a.set === set);
}
export function heroAssets(): MotionAsset[] {
  return manifest.assets.filter((a) => a.flagged?.includes("hero"));
}
/** A loop is renderable once at least one video source exists; otherwise fall back to poster/still. */
export function hasMotion(a: MotionAsset): boolean {
  return a.kind !== "still" && a.sources.length > 0;
}
