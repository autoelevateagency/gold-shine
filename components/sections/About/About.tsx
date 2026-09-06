"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

export const About = (): React.ReactElement => {
  const { t } = useLocale();

  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <Reveal>
          <h2>
            {t.about.titleLine1}
            <br />
            {t.about.titleLine2Before}
            <em>{t.about.titleLine2Em}</em>
            {t.about.titleLine2After}
          </h2>
        </Reveal>
        <Reveal className="about-body" delay="d1">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <div className="about-words">
            {t.about.words.map((word) => (
              <div className="about-word" key={word.num}>
                <span className="wnum">{word.num}</span>
                <div className="wtitle">{word.title}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
