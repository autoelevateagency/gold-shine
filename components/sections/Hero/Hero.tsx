"use client";

import { VideoMedia } from "@/components/VideoMedia";
import { useLocale } from "@/context/LocaleContext";
import { VIDEO_PATHS } from "@/data/videos";

export const Hero = (): React.ReactElement => {
  const { t } = useLocale();

  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="gold-rule" />
          <span className="meta-line">{t.hero.eyebrow}</span>
        </div>
        <h1 className="hero-title">
          {t.hero.titleBefore}
          <br />
          <em>{t.hero.titleEm}</em> {t.hero.titleAfter}
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-services">
          {t.hero.services.map((service, index) => (
            <span key={service}>
              {index > 0 ? <span className="sep">·</span> : null}
              {service}
            </span>
          ))}
        </div>
        <div className="hero-location">{t.hero.location}</div>
        <div className="hero-ctas">
          <a href="#services" className="btn-primary">
            {t.hero.explore}
          </a>
          <a href="#contact" className="btn-text">
            {t.hero.book}
          </a>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-frame-label">
          <span className="meta-line">{t.hero.frameLabel}</span>
        </div>
        <div className="hero-media">
          <VideoMedia src={VIDEO_PATHS.hero} label="Golden Ride studio work" />
        </div>
        <div className="hero-scroll">
          <div className="stem" />
          <span>{t.hero.scroll}</span>
        </div>
      </div>
    </section>
  );
};
