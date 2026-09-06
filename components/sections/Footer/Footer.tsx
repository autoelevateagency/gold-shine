"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/context/LocaleContext";

export const Footer = (): React.ReactElement => {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "#hero", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#showcase", label: t.nav.showcase },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <Reveal variant="up">
            <div className="foot-brand">
              {t.footer.brand}
              <span className="tag">{t.footer.tagline}</span>
            </div>
            <p
              style={{
                marginTop: 24,
                maxWidth: 280,
                fontSize: "0.85rem",
                color: "#8b8983",
              }}
            >
              {t.footer.blurb}
            </p>
          </Reveal>
          <Reveal className="foot-col" variant="up" delay="d1">
            <h4>{t.footer.navigate}</h4>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="foot-col" variant="up" delay="d2">
            <h4>{t.footer.contact}</h4>
            <p>{t.footer.location}</p>
            <p style={{ marginTop: 10 }}>
              <a href={t.footer.phoneHref}>{t.footer.phone}</a>
            </p>
          </Reveal>
        </div>
        <Reveal className="foot-bottom" variant="fade" delay="d3">
          <span>
            © {year} {t.footer.copyright}
          </span>
          <span>{t.footer.servicesLine}</span>
        </Reveal>
      </div>
    </footer>
  );
};
