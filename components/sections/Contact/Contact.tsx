"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/Reveal";
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

export const Contact = (): React.ReactElement => {
  const { t } = useLocale();

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal className="contact-head">
          <span className="meta-line">{t.contact.label}</span>
          <h2>
            {t.contact.headingLine1}
            <br />
            {t.contact.headingLine2}
          </h2>
        </Reveal>
        <Reveal className="contact-body" delay="d1">
          <div className="contact-info">
            <div className="info-row">
              <span className="label">{t.contact.locationLabel}</span>
              <a
                className="value link"
                href={STUDIO_LOCATION.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.contact.locationValue}
              </a>
            </div>
            <div className="info-row">
              <span className="label">{t.contact.phoneLabel}</span>
              <a className="value link" href={t.contact.phoneHref}>
                {t.contact.phoneValue}
              </a>
            </div>
            <div className="info-row">
              <span className="label">{t.contact.emailLabel}</span>
              <a className="value link" href={t.contact.emailHref}>
                {t.contact.emailValue}
              </a>
            </div>
            <div className="info-row">
              <span className="label">{t.contact.hoursLabel}</span>
              <ul className="value hours-list">
                {t.contact.hoursLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="contact-map">
            <ContactMap
              title={t.contact.mapTitle}
              brand={t.footer.brand}
              directionsLabel={t.contact.mapDirections}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
