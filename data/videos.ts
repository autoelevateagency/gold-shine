export const VIDEO_PATHS = {
  hero: "/assets/videos/hero.mp4",
  windowTint: "/assets/videos/window-tint.mp4",
  polishingDetailing: "/assets/videos/polishing-detailing.mp4",
  smokeLights: "/assets/videos/smoke-lights.mp4",
  emblemDecals: "/assets/videos/emblem-decals.mp4",
  bodyDecals: "/assets/videos/body-decals.mp4",
  plasticsRestore: "/assets/videos/plastics-restore.mp4",
} as const;

export type VideoKey = keyof typeof VIDEO_PATHS;

/** Showcase gallery — every work video except the hero reel */
export const SHOWCASE_VIDEOS: VideoKey[] = [
  "windowTint",
  "polishingDetailing",
  "smokeLights",
  "emblemDecals",
  "bodyDecals",
  "plasticsRestore",
];

/** Service row hover / active preview videos (index-aligned with services list) */
export const SERVICE_VIDEOS: VideoKey[] = [
  "windowTint",
  "plasticsRestore",
  "polishingDetailing",
  "smokeLights",
  "windowTint",
  "bodyDecals",
];

export const BOOKING_VIDEO: VideoKey = "hero";
