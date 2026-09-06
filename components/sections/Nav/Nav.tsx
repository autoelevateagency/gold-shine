"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/LocaleContext";

const MOBILE_MAX = 900;
const TOP_SHOW_OFFSET = 72;
const SCROLL_DELTA = 8;

export const Nav = (): React.ReactElement => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const menuOpenRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen) {
      setHidden(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const updateNav = (): void => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;

      setScrolled(current > 40);

      if (menuOpenRef.current || current <= TOP_SHOW_OFFSET) {
        setHidden(false);
      } else if (delta > SCROLL_DELTA) {
        setHidden(true);
      } else if (delta < -SCROLL_DELTA) {
        setHidden(false);
      }

      lastScrollYRef.current = current;
      tickingRef.current = false;
    };

    const onScroll = (): void => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateNav);
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    updateNav();
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
    if (!menuOpen) return;

    const y = window.scrollY;
    scrollYRef.current = y;
    document.body.classList.add("menu-open");
    document.body.style.top = `-${y}px`;

    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    };
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

  const navClassName = [
    "nav",
    scrolled || menuOpen ? "scrolled" : "",
    menuOpen ? "menu-active" : "",
    hidden && !menuOpen ? "nav-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
        <div className="nav-panel-bar">
          <a href="#hero" className="nav-panel-brand" onClick={closeMenu}>
            <span className="nav-brand-name">{t.nav.brand}</span>
            <span className="nav-brand-services">{t.nav.tagline}</span>
          </a>
          <button
            className="nav-panel-close"
            type="button"
            aria-label={t.nav.closeMenu}
            onClick={closeMenu}
          >
            <span />
            <span />
          </button>
        </div>
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
      <nav className={navClassName} id="siteNav">
        <a href="#hero" className="nav-logo" onClick={closeMenu}>
          <span className="nav-brand-name">{t.nav.brand}</span>
          <span className="nav-brand-services">{t.nav.tagline}</span>
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
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.toggleMenu}
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
