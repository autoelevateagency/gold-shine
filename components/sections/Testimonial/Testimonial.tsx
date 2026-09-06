"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

const AUTO_MS = 7000;
const SWIPE_THRESHOLD = 48;

export const Testimonial = (): React.ReactElement => {
  const { t, dir } = useLocale();
  const items = t.testimonial.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pointerStartX = useRef<number | null>(null);

  const goTo = (index: number): void => {
    setActive(((index % count) + count) % count);
  };

  const goPrev = (): void => {
    goTo(active - 1);
  };

  const goNext = (): void => {
    goTo(active + 1);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = (): void => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || count < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, count, active]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>): void => {
    if (pointerStartX.current === null) {
      return;
    }

    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD) {
      return;
    }

    const swipedLeft = delta < 0;
    const shouldGoNext = dir === "rtl" ? !swipedLeft : swipedLeft;
    if (shouldGoNext) {
      goNext();
    } else {
      goPrev();
    }
  };

  const onPointerCancel = (): void => {
    pointerStartX.current = null;
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (dir === "rtl") {
        goNext();
      } else {
        goPrev();
      }
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (dir === "rtl") {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  const activeItem = items[active];
  const indexLabel = `${String(active + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  return (
    <section className="testimonial" aria-label={t.testimonial.label}>
      <div className="wrap">
        <Reveal>
          <span className="meta-line">{t.testimonial.label}</span>
        </Reveal>

        <Reveal delay="d1">
          <div
            className="testimonial-carousel"
            dir={dir}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.testimonial.label}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <div className="testimonial-stage" aria-live="polite">
              {items.map((item, index) => {
                const isActive = index === active;
                return (
                  <figure
                    key={item.cite}
                    className={`testimonial-slide${isActive ? " is-active" : ""}`}
                    aria-hidden={!isActive}
                  >
                    <blockquote>{item.quote}</blockquote>
                    <span className="gold-rule" />
                    <cite>{item.cite}</cite>
                  </figure>
                );
              })}
            </div>

            <div
              className="testimonial-controls"
              onPointerDown={(event) => event.stopPropagation()}
              onPointerUp={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="testimonial-nav"
                onClick={goPrev}
                aria-label={t.testimonial.prev}
              >
                <span aria-hidden="true">{dir === "rtl" ? "→" : "←"}</span>
              </button>

              <div className="testimonial-progress">
                <span className="testimonial-index" aria-hidden="true">
                  {indexLabel}
                </span>
                <div
                  className="testimonial-dots"
                  role="tablist"
                  aria-label={t.testimonial.label}
                >
                  {items.map((item, index) => (
                    <button
                      key={item.cite}
                      type="button"
                      role="tab"
                      aria-selected={index === active}
                      aria-label={`${t.testimonial.goTo} ${index + 1}`}
                      className={`testimonial-dot${index === active ? " is-active" : ""}`}
                      onClick={() => goTo(index)}
                    />
                  ))}
                </div>
                {!reduceMotion && (
                  <span
                    key={`${active}-${paused ? "p" : "r"}`}
                    className={`testimonial-timer${paused ? " is-paused" : ""}`}
                    aria-hidden="true"
                  />
                )}
              </div>

              <button
                type="button"
                className="testimonial-nav"
                onClick={goNext}
                aria-label={t.testimonial.next}
              >
                <span aria-hidden="true">{dir === "rtl" ? "←" : "→"}</span>
              </button>
            </div>

            <span className="visually-hidden">
              {activeItem.cite}: {activeItem.quote}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
