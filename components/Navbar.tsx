"use client";

import { useEffect, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Navbar (Tailwind-driven, v3)
   • Transparent default → frosted glass on scroll
   • Desktop: Logo | Nav Center | CTA right
   • Mobile: hamburger → full-screen overlay
   • All styling via Tailwind utilities + inline styles
───────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "About", href: "#about" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Header shell ──────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "72px",
          background: scrolled ? "rgba(250,248,245,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(228,217,204,0.45)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(44,26,14,0.06)" : "none",
          transition: "background 0.7s cubic-bezier(0.25,0,0.05,1), border-color 0.7s cubic-bezier(0.25,0,0.05,1), box-shadow 0.7s cubic-bezier(0.25,0,0.05,1)",
        }}
        role="banner"
      >
        {/* 3-col grid: logo | nav | cta+ham */}
        <div
          className="nav-grid"
          style={{
            display: "grid",
            alignItems: "center",
            height: "100%",
            maxWidth: "1440px",
            marginInline: "auto",
            paddingInline: "clamp(1.5rem, 5vw, 5rem)",
          }}
        >
          {/* ── Logo ──────────────────────────────────────── */}
          <a
            href="#"
            aria-label="JUUNÉ Skin Atelier — home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              textDecoration: "none"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.60rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "var(--color-text-heading)",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              JUUNÉ
            </span>

            {/* Elegant vertical divider */}
            <span
              style={{
                width: "1px",
                height: "16px",
                background: "var(--color-border)",
                opacity: 0.8
              }}
              className="hidden-mobile"
            />

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                lineHeight: 1,
                whiteSpace: "nowrap",
                marginTop: "2px"
              }}
            >
              Skin Atelier
            </span>
          </a>

          {/* ── Desktop nav links — center ─────────────────── */}
          <nav
            aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
            className="hidden-mobile"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-body)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-body)")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── Right: CTA + Hamburger ─────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.5rem" }}>
            {/* Desktop CTA */}
            <a
              href="#booking"
              id="nav-cta-book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#ffffff",
                background: "linear-gradient(135deg, #C9A96E 0%, #A8833C 100%)",
                padding: "0.65rem 1.6rem",
                borderRadius: "9999px",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 12px rgba(201,169,110,0.22)",
                transition: "transform 0.2s ease, box-shadow 0.3s ease",
                border: "none",
                cursor: "pointer",
              }}
              className="hidden-mobile"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(1.025)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,169,110,0.30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(201,169,110,0.22)";
              }}
            >
              Book Now
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                width: "40px",
                height: "40px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              className="show-mobile"
            >
              {/* Top bar */}
              <span style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--color-text-heading)",
                borderRadius: "1px",
                transformOrigin: "center",
                transition: "transform 0.35s cubic-bezier(0.25,0,0.05,1)",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }} />
              {/* Mid bar */}
              <span style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--color-text-heading)",
                borderRadius: "1px",
                transition: "opacity 0.2s ease, transform 0.35s cubic-bezier(0.25,0,0.05,1)",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }} />
              {/* Bottom bar */}
              <span style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--color-text-heading)",
                borderRadius: "1px",
                transformOrigin: "center",
                transition: "transform 0.35s cubic-bezier(0.25,0,0.05,1)",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.6s cubic-bezier(0.25,0,0.05,1)",
        }}
      >
        {/* Warm cream backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(250,248,245,0.97)",
            backdropFilter: "blur(24px) saturate(1.3)",
            WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          }}
        />

        {/* Invisible close zone */}
        <button
          tabIndex={-1}
          onClick={closeMenu}
          aria-label="Close menu"
          style={{
            position: "absolute",
            inset: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        />

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
            width: "100%",
            paddingBlock: "4rem",
          }}
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 8vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-text-heading)",
                textDecoration: "none",
                paddingBlock: "0.5rem",
                lineHeight: 1,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(0.25,0,0.05,1), color 0.3s ease`,
                transitionDelay: menuOpen ? `${i * 80 + 100}ms` : "0ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-heading)")}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  color: "var(--color-accent)",
                  alignSelf: "flex-start",
                  marginTop: "0.55em",
                }}
              >
                0{i + 1}
              </span>
              {label}
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="#booking"
            onClick={closeMenu}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#ffffff",
              background: "linear-gradient(135deg, #C9A96E 0%, #A8833C 100%)",
              padding: "1rem 3rem",
              borderRadius: "9999px",
              boxShadow: "0 4px 20px rgba(201,169,110,0.24)",
              marginTop: "2rem",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.25,0,0.05,1), box-shadow 0.3s ease",
              transitionDelay: menuOpen ? `${NAV_LINKS.length * 80 + 100}ms` : "0ms",
            }}
          >
            Book Now
          </a>
        </nav>
      </div>

      {/* ── Responsive helpers ─────────────────────────────── */}
      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none  !important; }
        .nav-grid      { grid-template-columns: 1fr auto 1fr; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex  !important; }
          .nav-grid      { grid-template-columns: 1fr auto; }
        }
      `}</style>
    </>
  );
}
