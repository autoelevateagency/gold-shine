"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { STUDIO_LOCATION } from "@/data/location";

type ContactMapProps = {
  title: string;
  brand: string;
  directionsLabel: string;
};

export const ContactMap = ({
  title,
  brand,
  directionsLabel,
}: ContactMapProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(containerRef.current, {
      center: [STUDIO_LOCATION.lat, STUDIO_LOCATION.lng],
      zoom: STUDIO_LOCATION.zoom,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: true,
      dragging: !L.Browser.mobile,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
        maxZoom: 16,
      },
    ).addTo(map);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "",
        maxZoom: 16,
        opacity: 0.72,
      },
    ).addTo(map);

    const markerIcon = L.divIcon({
      className: "contact-map-marker",
      html: `
        <span class="contact-map-marker-pulse" aria-hidden="true"></span>
        <span class="contact-map-marker-pin" aria-hidden="true">
          <svg viewBox="0 0 28 36" width="28" height="36" focusable="false">
            <path
              d="M14 0C6.268 0 0 6.268 0 14c0 9.625 12.25 21.25 13.02 21.97a1.4 1.4 0 0 0 1.96 0C15.75 35.25 28 23.625 28 14 28 6.268 21.732 0 14 0Zm0 19.6A5.6 5.6 0 1 1 14 8.4a5.6 5.6 0 0 1 0 11.2Z"
              fill="currentColor"
            />
          </svg>
        </span>
      `,
      iconSize: [28, 36],
      iconAnchor: [14, 36],
      popupAnchor: [0, -34],
    });

    const marker = L.marker([STUDIO_LOCATION.lat, STUDIO_LOCATION.lng], {
      icon: markerIcon,
      title: brand,
      alt: brand,
    }).addTo(map);

    marker.bindPopup(
      `<div class="contact-map-popup">
        <strong>${brand}</strong>
        <a href="${STUDIO_LOCATION.googleMapsUrl}" target="_blank" rel="noopener noreferrer">${directionsLabel}</a>
      </div>`,
      { closeButton: false, offset: [0, -4] },
    );

    marker.openPopup();
    mapRef.current = map;

    const frameId = window.requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      map.remove();
      mapRef.current = null;
    };
  }, [brand, directionsLabel]);

  return (
    <div
      ref={containerRef}
      className="contact-map-canvas"
      role="img"
      aria-label={title}
    />
  );
};
