"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

const MOBILE_MAX = 900;

export const Nav = (): React.ReactElement => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 60);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = (): void => {
      if (window.innerWidth > MOBILE_MAX) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const toggleMenu = (): void => {
    setMenuOpen((open) => !open);
  };

  const links = [
    { href: "#hero", label: t.nav.home },
    { href: "#services", label: t.nav.services },
    { href: "#showcase", label: t.nav.showcase },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <div
        className={`nav-backdrop${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <div
        className={`nav-panel${menuOpen ? " open" : ""}`}
        id="navPanel"
        aria-hidden={!menuOpen}
      >
        <div className="nav-panel-inner">
          <div className="nav-menu-head">
            <span className="gold-rule" />
            <span className="nav-menu-label">{t.nav.menuLabel}</span>
          </div>
          <ul className="nav-panel-links">
            {links.map((link, index) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  <span className="nav-link-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nav-link-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nav-mobile-cta" onClick={closeMenu}>
            {t.nav.bookNow}
          </a>
          <p className="nav-menu-tagline">{t.nav.tagline}</p>
        </div>
      </div>
      <nav
        className={`nav${scrolled || menuOpen ? " scrolled" : ""}${menuOpen ? " menu-active" : ""}`}
        id="siteNav"
      >
        <a href="#hero" className="nav-logo" onClick={closeMenu}>
          {t.nav.brand}
          <small>{t.nav.tagline}</small>
        </a>
        <ul className="nav-links" id="navLinks">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">
          {t.nav.bookNow}
        </a>
        <button
          className={`nav-burger${menuOpen ? " open" : ""}`}
          id="navBurger"
          type="button"
          aria-label={t.nav.toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="navPanel"
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
};
