"use client";

import dynamic from "next/dynamic";
import { Reveal, type RevealDelay } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";
import { STUDIO_LOCATION } from "@/data/location";

const ContactMap = dynamic(
  () =>
    import("@/components/sections/Contact/ContactMap").then(
      (mod) => mod.ContactMap,
    ),
  {
    ssr: false,
    loading: () => <div className="contact-map-canvas contact-map-loading" />,
  },
);

const INFO_DELAYS: RevealDelay[] = ["d1", "d2", "d3", "d4"];

export const Contact = (): React.ReactElement => {
  const { t } = useLocale();

  const infoRows = [
    {
      label: t.contact.locationLabel,
      content: (
        <a
          className="value link"
          href={STUDIO_LOCATION.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.contact.locationValue}
        </a>
      ),
    },
    {
      label: t.contact.phoneLabel,
      content: (
        <a className="value link" href={t.contact.phoneHref}>
          {t.contact.phoneValue}
        </a>
      ),
    },
    {
      label: t.contact.emailLabel,
      content: (
        <a className="value link" href={t.contact.emailHref}>
          {t.contact.emailValue}
        </a>
      ),
    },
    {
      label: t.contact.hoursLabel,
      content: (
        <ul className="value hours-list">
          {t.contact.hoursLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal className="contact-head" variant="up">
          <span className="meta-line">{t.contact.label}</span>
          <h2>
            {t.contact.headingLine1}
            <br />
            {t.contact.headingLine2}
          </h2>
        </Reveal>
        <div className="contact-body">
          <div className="contact-info">
            {infoRows.map((row, index) => (
              <Reveal
                key={row.label}
                className="info-row"
                variant="up"
                delay={INFO_DELAYS[index]}
              >
                <span className="label">{row.label}</span>
                {row.content}
              </Reveal>
            ))}
          </div>
          <Reveal className="contact-map" variant="clip" delay="d2">
            <ContactMap
              title={t.contact.mapTitle}
              brand={t.footer.brand}
              directionsLabel={t.contact.mapDirections}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
