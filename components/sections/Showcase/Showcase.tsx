"use client";

import { useEffect, useRef } from "react";
import { VideoMedia } from "@/components/VideoMedia";
import { useLocale } from "@/context/LocaleContext";
import { VIDEO_PATHS } from "@/data/videos";

const SCENE_VARIANTS = [
  "hero",
  "offset",
  "immersive",
  "inset",
  "offset-alt",
  "finale",
] as const;

type SceneVariant = (typeof SCENE_VARIANTS)[number];

export const Showcase = (): React.ReactElement => {
  const { t } = useLocale();
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) {
      return;
    }

    const scenes = Array.from(
      reel.querySelectorAll<HTMLElement>("[data-showcase-scene]"),
    );

    if (scenes.length === 0) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyProgress = (scene: HTMLElement, ratio: number): void => {
      const progress = mediaQuery.matches ? 1 : Math.min(1, Math.max(0, ratio));
      scene.style.setProperty("--scene-progress", progress.toFixed(3));
      scene.classList.toggle("is-active", progress >= 0.42);
      scene.classList.toggle("is-visible", progress > 0.08);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          applyProgress(entry.target as HTMLElement, entry.intersectionRatio);
        });
      },
      {
        threshold: [0, 0.08, 0.16, 0.28, 0.42, 0.55, 0.7, 0.85, 1],
        rootMargin: "-8% 0px -8% 0px",
      },
    );

    scenes.forEach((scene) => {
      applyProgress(scene, 0);
      observer.observe(scene);
    });

    const onMotionChange = (): void => {
      scenes.forEach((scene) => {
        if (mediaQuery.matches) {
          applyProgress(scene, 1);
        }
      });
    };

    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, [t.showcase.items]);

  return (
    <section className="showcase" id="showcase" aria-label={t.showcase.label}>
      <header className="showcase-head wrap">
        <span className="showcase-eyebrow">{t.showcase.eyebrow}</span>
        <span className="showcase-head-rule" aria-hidden="true" />
      </header>

      <div className="showcase-reel" ref={reelRef}>
        {t.showcase.items.map((item, index) => {
          const variant: SceneVariant =
            SCENE_VARIANTS[index % SCENE_VARIANTS.length];

          return (
            <article
              key={item.num}
              className={`showcase-scene showcase-scene--${variant}`}
              data-showcase-scene
              aria-label={item.label}
            >
              <div className="showcase-scene-stage">
                <div className="showcase-mask">
                  <VideoMedia
                    src={VIDEO_PATHS[item.videoKey]}
                    label={item.label}
                  />
                  <span className="showcase-vignette" aria-hidden="true" />
                </div>

                <div className="showcase-marks" aria-hidden="true">
                  <span className="showcase-index">{item.num}</span>
                  <span className="showcase-mark-rule" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
