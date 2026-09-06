"use client";

import { useEffect, useRef } from "react";

type VideoMediaProps = {
  src: string;
  className?: string;
  label?: string;
};

export const VideoMedia = ({
  src,
  className = "",
  label,
}: VideoMediaProps): React.ReactElement => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = (): void => {
      if (mediaQuery.matches) {
        video.pause();
        return;
      }
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    };

    syncPlayback();
    mediaQuery.addEventListener("change", syncPlayback);
    return () => mediaQuery.removeEventListener("change", syncPlayback);
  }, [src]);

  return (
    <video
      ref={ref}
      className={`video-media ${className}`.trim()}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
};
