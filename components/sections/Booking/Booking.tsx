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
      <Reveal className="wrap booking-inner">
        <h2>
          <span>{t.booking.line1}</span>
          <span>{t.booking.line2}</span>
        </h2>
        <div className="brand">{t.booking.brand}</div>
        <p>{t.booking.sub}</p>
        <div className="booking-ctas">
          <a href="#contact" className="btn-gold">
            {t.booking.book}
          </a>
          <a href={t.contact.phoneHref} className="btn-outline">
            {t.booking.call}
          </a>
        </div>
      </Reveal>
    </section>
  );
};
