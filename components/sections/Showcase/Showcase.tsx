"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { VideoMedia } from "@/components/VideoMedia";
import { useLocale } from "@/context/LocaleContext";
import { VIDEO_PATHS } from "@/data/videos";

const FRAME_VARIANTS = ["a", "b", "c", "d", "e", "f"] as const;
const BASE_SPEED = 32;
const HOVER_SPEED = 12;
const RESUME_DELAY_MS = 2200;
const AXIS_LOCK_PX = 12;

export const Showcase = (): React.ReactElement => {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(BASE_SPEED);
  const draggingRef = useRef(false);
  const holdAutoRef = useRef(false);
  const axisLockRef = useRef<"none" | "x" | "y">("none");
  const resumeTimerRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const inViewRef = useRef(true);
  const reduceMotionRef = useRef(false);

  const items = t.showcase.items;
  const loopItems = [...items, ...items];

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = motionQuery.matches;

    const syncMotion = (): void => {
      reduceMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) {
        offsetRef.current = 0;
        track.style.transform = "translate3d(0, 0, 0)";
        viewport.classList.remove("is-interacting");
      }
    };

    motionQuery.addEventListener("change", syncMotion);

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.12 },
    );
    viewObserver.observe(section);

    let lastTime = performance.now();
    let rafId = 0;

    const wrapOffset = (): void => {
      const loopWidth = track.scrollWidth / 2;
      if (loopWidth <= 0) {
        return;
      }
      while (offsetRef.current <= -loopWidth) {
        offsetRef.current += loopWidth;
      }
      while (offsetRef.current > 0) {
        offsetRef.current -= loopWidth;
      }
    };

    const applyTransform = (): void => {
      wrapOffset();
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const clearResumeTimer = (): void => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
    };

    const beginInterrupt = (): void => {
      clearResumeTimer();
      holdAutoRef.current = true;
      viewport.classList.add("is-interacting");
    };

    const endHorizontalGesture = (): void => {
      draggingRef.current = false;
      axisLockRef.current = "none";
      pointerIdRef.current = null;
      scheduleResume();
    };

    const scheduleResume = (): void => {
      clearResumeTimer();
      holdAutoRef.current = true;
      draggingRef.current = false;
      axisLockRef.current = "none";
      resumeTimerRef.current = window.setTimeout(() => {
        holdAutoRef.current = false;
        velocityRef.current = 0;
        speedRef.current = section.matches(":hover")
          ? HOVER_SPEED
          : BASE_SPEED;
        viewport.classList.remove("is-interacting");
      }, RESUME_DELAY_MS);
    };

    const tick = (now: number): void => {
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (
        !reduceMotionRef.current &&
        inViewRef.current &&
        !draggingRef.current
      ) {
        if (Math.abs(velocityRef.current) > 2) {
          offsetRef.current += velocityRef.current * delta;
          velocityRef.current *= 0.92;
          if (Math.abs(velocityRef.current) < 2) {
            velocityRef.current = 0;
          }
          applyTransform();
        } else if (!holdAutoRef.current) {
          offsetRef.current -= speedRef.current * delta;
          applyTransform();
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    const onPointerDown = (event: PointerEvent): void => {
      if (reduceMotionRef.current) {
        return;
      }
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      // Do not capture or block scroll yet — wait for clear horizontal intent.
      clearResumeTimer();
      draggingRef.current = true;
      axisLockRef.current = "none";
      velocityRef.current = 0;
      pointerIdRef.current = event.pointerId;
      dragStartXRef.current = event.clientX;
      dragStartYRef.current = event.clientY;
      dragStartOffsetRef.current = offsetRef.current;
      lastMoveXRef.current = event.clientX;
      lastMoveTimeRef.current = performance.now();
    };

    const onPointerMove = (event: PointerEvent): void => {
      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
        return;
      }

      const dxTotal = event.clientX - dragStartXRef.current;
      const dyTotal = event.clientY - dragStartYRef.current;

      if (axisLockRef.current === "none") {
        if (
          Math.abs(dxTotal) < AXIS_LOCK_PX &&
          Math.abs(dyTotal) < AXIS_LOCK_PX
        ) {
          return;
        }

        // Vertical scroll wins — release and let the page move.
        if (Math.abs(dyTotal) > Math.abs(dxTotal)) {
          draggingRef.current = false;
          pointerIdRef.current = null;
          axisLockRef.current = "none";
          viewport.classList.remove("is-interacting");
          holdAutoRef.current = false;
          return;
        }

        axisLockRef.current = "x";
        beginInterrupt();
        try {
          viewport.setPointerCapture(event.pointerId);
        } catch {
          // Ignore capture failures on some browsers.
        }
      }

      if (axisLockRef.current !== "x") {
        return;
      }

      event.preventDefault();
      const now = performance.now();
      offsetRef.current = dragStartOffsetRef.current + dxTotal;

      const moveDt = (now - lastMoveTimeRef.current) / 1000;
      if (moveDt > 0) {
        velocityRef.current =
          (event.clientX - lastMoveXRef.current) / moveDt;
      }
      lastMoveXRef.current = event.clientX;
      lastMoveTimeRef.current = now;
      applyTransform();
    };

    const onPointerUp = (event: PointerEvent): void => {
      if (pointerIdRef.current !== event.pointerId) {
        return;
      }

      const wasHorizontal = axisLockRef.current === "x";
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }

      if (wasHorizontal) {
        endHorizontalGesture();
        return;
      }

      // Tap / unfinished gesture — do not hold the reel paused.
      draggingRef.current = false;
      pointerIdRef.current = null;
      axisLockRef.current = "none";
      viewport.classList.remove("is-interacting");
    };

    const onWheel = (event: WheelEvent): void => {
      if (reduceMotionRef.current) {
        return;
      }

      // Never steal normal vertical page scroll.
      if (event.shiftKey) {
        event.preventDefault();
        beginInterrupt();
        velocityRef.current = 0;
        offsetRef.current -= event.deltaY;
        applyTransform();
        scheduleResume();
        return;
      }

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      if (absX <= absY || absX < 1) {
        return;
      }

      event.preventDefault();
      beginInterrupt();
      velocityRef.current = 0;
      offsetRef.current -= event.deltaX;
      applyTransform();
      scheduleResume();
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (reduceMotionRef.current) {
        return;
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();
      beginInterrupt();
      velocityRef.current = 0;
      offsetRef.current += event.key === "ArrowLeft" ? 120 : -120;
      applyTransform();
      scheduleResume();
    };

    const onMouseEnter = (): void => {
      if (!holdAutoRef.current && !draggingRef.current) {
        speedRef.current = HOVER_SPEED;
      }
    };

    const onMouseLeave = (): void => {
      if (!holdAutoRef.current && !draggingRef.current) {
        speedRef.current = BASE_SPEED;
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove, {
      passive: false,
    });
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("keydown", onKeyDown);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      clearResumeTimer();
      viewObserver.disconnect();
      motionQuery.removeEventListener("change", syncMotion);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("keydown", onKeyDown);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="showcase"
      id="showcase"
      aria-label={t.showcase.label}
    >
      <header className="showcase-head wrap">
        <Reveal variant="fade">
          <p className="showcase-micro">{t.showcase.micro}</p>
        </Reveal>
        <Reveal variant="up" delay="d1">
          <h2 className="showcase-title">{t.showcase.label}</h2>
        </Reveal>
        <Reveal className="showcase-head-meta" variant="up" delay="d2">
          <span className="showcase-head-rule" aria-hidden="true" />
          <span className="showcase-range">{t.showcase.range}</span>
        </Reveal>
      </header>

      <Reveal variant="clip" delay="d2" threshold={0.1}>
        <div
          ref={viewportRef}
          className="showcase-viewport"
          role="region"
          aria-label={t.showcase.label}
          tabIndex={0}
        >
        <div className="showcase-track" ref={trackRef}>
          {loopItems.map((item, index) => {
            const variant = FRAME_VARIANTS[index % FRAME_VARIANTS.length];
            const setKey = index < items.length ? "a" : "b";

            return (
              <figure
                key={`${setKey}-${item.num}`}
                className={`showcase-frame showcase-frame--${variant}`}
                aria-hidden={setKey === "b"}
              >
                <div className="showcase-frame-media">
                  <VideoMedia
                    src={VIDEO_PATHS[item.videoKey]}
                    label={setKey === "a" ? item.label : undefined}
                  />
                </div>
                <figcaption className="showcase-frame-index" aria-hidden="true">
                  {item.num} / {String(items.length).padStart(2, "0")}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      </Reveal>
    </section>
  );
};
