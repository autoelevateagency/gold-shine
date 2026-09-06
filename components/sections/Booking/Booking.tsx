"use client";

import { Reveal } from "@/components/Reveal";
import { VideoMedia } from "@/components/VideoMedia";
import { useLocale } from "@/context/LocaleContext";
import { BOOKING_VIDEO, VIDEO_PATHS } from "@/data/videos";

export const Booking = (): React.ReactElement => {
  const { t } = useLocale();

  return (
    <section className="booking">
      <div className="booking-media">
        <VideoMedia
          src={VIDEO_PATHS[BOOKING_VIDEO]}
          label="Golden Ride craftsmanship"
        />
      </div>
      <div className="wrap booking-inner">
        <Reveal variant="scale" as="h2">
          <span>{t.booking.line1}</span>
          <span>{t.booking.line2}</span>
        </Reveal>
        <Reveal className="brand" variant="fade" delay="d1">
          {t.booking.brand}
        </Reveal>
        <Reveal variant="up" delay="d2" as="p">
          {t.booking.sub}
        </Reveal>
        <Reveal className="booking-ctas" variant="up" delay="d3">
          <a href="#contact" className="btn-gold">
            {t.booking.book}
          </a>
          <a href={t.contact.phoneHref} className="btn-outline">
            {t.booking.call}
          </a>
        </Reveal>
      </div>
    </section>
  );
};
