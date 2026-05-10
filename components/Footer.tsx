"use client";

import React from "react";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Footer
   • Dark warm brown background — visual closure
   • Inverted cream/gold typography
   • Minimal 3-column layout (brand, nav, connect)
   • Copyright bar with warm hairline divider
   • 100% design-system tokens
───────────────────────────────────────────────────────────── */

/* ── Nav & Social Data ───────────────────────────────────── */
const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const CONNECT_LINKS = [
  { label: "Instagram", href: "https://instagram.com/juune.atelier", external: true },
  { label: "hello@juune-atelier.com", href: "mailto:hello@juune-atelier.com", external: false },
  { label: "+62 812 3456 7890", href: "tel:+6281234567890", external: false },
] as const;

/* ── Component ───────────────────────────────────────────── */
export default function Footer(): React.ReactElement {
  return (
    <footer
      aria-label="Site footer"
      style={{
        backgroundColor: "var(--color-text-heading)",
        paddingTop: "clamp(4rem, 6vw, 6rem)",
        paddingBottom: "clamp(2rem, 4vw, 3rem)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 2.5rem)",
        }}
      >
        {/* ── 3-Column Grid ──────────────────────────────── */}
        <div className="footer-grid">
          {/* Left — Brand ────────────────────────────────── */}
          <div>
            {/* Logo — mirrors Navbar, inverted */}
            <a
              href="#"
              aria-label="JUUNÉ Skin Atelier — home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                marginBottom: "var(--space-6)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--color-bg-base)",
                  textTransform: "uppercase" as const,
                  lineHeight: 1,
                }}
              >
                JUUNÉ
              </span>
              <span
                style={{
                  width: "1px",
                  height: "14px",
                  background: "rgba(250, 248, 245, 0.2)",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.55rem",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase" as const,
                  color: "rgba(250, 248, 245, 0.5)",
                  lineHeight: 1,
                  whiteSpace: "nowrap" as const,
                }}
              >
                Skin Atelier
              </span>
            </a>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-body)",
                color: "rgba(250, 248, 245, 0.45)",
                maxWidth: "18rem",
              }}
            >
              Personalised luxury skincare rituals, crafted in Bali.
            </p>
          </div>

          {/* Middle — Navigation ─────────────────────────── */}
          <div>
            <span className="footer-col-label">Navigation</span>
            <nav
              aria-label="Footer navigation"
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "var(--space-3)",
              }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-link"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right — Connect ─────────────────────────────── */}
          <div>
            <span className="footer-col-label">Connect</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column" as const,
                gap: "var(--space-3)",
              }}
            >
              {CONNECT_LINKS.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-link"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Copyright Bar ──────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid rgba(250, 248, 245, 0.08)",
            marginTop: "var(--space-12)",
            paddingTop: "var(--space-8)",
            textAlign: "center" as const,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "rgba(250, 248, 245, 0.3)",
              letterSpacing: "0.04em",
            }}
          >
            &copy; {new Date().getFullYear()} JUUNÉ Skin Atelier. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── CSS ── */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2.5rem, 4vw, 3rem);
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.3fr 1fr 1fr;
            gap: clamp(3rem, 5vw, 4rem);
          }
        }

        .footer-col-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
          color: var(--color-accent);
          margin-bottom: var(--space-6);
        }

        .footer-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: rgba(250, 248, 245, 0.55);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-smooth);
          line-height: 1;
        }
        .footer-link:hover {
          color: var(--color-accent);
        }
      `}</style>
    </footer>
  );
}
