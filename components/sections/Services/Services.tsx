"use client";

import { useState } from "react";
import { Reveal, type RevealDelay } from "@/components/Reveal";
import { VideoMedia } from "@/components/VideoMedia";
import { useLocale } from "@/context/LocaleContext";
import { SERVICE_VIDEOS, VIDEO_PATHS } from "@/data/videos";

const ROW_DELAYS: RevealDelay[] = ["d1", "d2", "d3", "d4", "d5", "d6"];

export const Services = (): React.ReactElement => {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [visualShow, setVisualShow] = useState(false);

  const previewIndex = activeIndex ?? hoverIndex;
  const previewItem = t.services.items[previewIndex];
  const previewVideo = SERVICE_VIDEOS[previewIndex];

  const handleToggle = (index: number): void => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  const handleEnter = (index: number): void => {
    setHoverIndex(index);
    setVisualShow(true);
  };

  return (
    <section className="services" id="services">
      <div className="wrap">
        <Reveal className="services-head" variant="up">
          <h2>{t.services.heading}</h2>
          <p>{t.services.sub}</p>
        </Reveal>

        <div
          className="service-list"
          id="serviceList"
          onMouseLeave={() => setVisualShow(false)}
        >
          {t.services.items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <Reveal
                key={item.num}
                className={`service-row${isActive ? " active" : ""}`}
                variant="up"
                delay={ROW_DELAYS[index]}
                threshold={0.08}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => handleToggle(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleToggle(index);
                  }
                }}
                onMouseEnter={() => handleEnter(index)}
              >
                <span className="num">{item.num}</span>
                <span className="title">{item.title}</span>
                <span className="arrow">{t.services.view}</span>
                <div className="desc">{isActive ? item.desc : ""}</div>
                {isActive ? (
                  <div className="service-row-media">
                    <VideoMedia
                      src={VIDEO_PATHS[SERVICE_VIDEOS[index]]}
                      label={item.title}
                    />
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
      <div
        className={`service-visual${visualShow ? " show" : ""}`}
        id="serviceVisual"
      >
        <div className="panel">
          <VideoMedia
            key={previewVideo}
            src={VIDEO_PATHS[previewVideo]}
            label={previewItem.title}
          />
          <span id="serviceVisualLabel">
            {previewItem.num} — {previewItem.title}
          </span>
        </div>
      </div>
    </section>
  );
};
