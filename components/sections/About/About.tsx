"use client";

import { Reveal, type RevealDelay } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

const WORD_DELAYS: RevealDelay[] = ["d2", "d3", "d4"];

export const About = (): React.ReactElement => {
  const { t } = useLocale();

  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <Reveal variant="left" as="h2">
          {t.about.titleLine1}
          <br />
          {t.about.titleLine2Before}
          <em>{t.about.titleLine2Em}</em>
          {t.about.titleLine2After}
        </Reveal>
        <div className="about-body">
          <Reveal variant="up" delay="d1">
            <p>{t.about.p1}</p>
          </Reveal>
          <Reveal variant="up" delay="d2">
            <p>{t.about.p2}</p>
          </Reveal>
          <div className="about-words">
            {t.about.words.map((word, index) => (
              <Reveal
                key={word.num}
                className="about-word"
                variant="up"
                delay={WORD_DELAYS[index]}
              >
                <span className="wnum">{word.num}</span>
                <div className="wtitle">{word.title}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
