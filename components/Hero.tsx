"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Hero Section (Refined)
   Layout  : V1 structure (bleed image) + V2 polish (glass badges)
   Tokens  : 100 % design-system variables from globals.css
───────────────────────────────────────────────────────────── */

export default function Hero(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero-section" aria-label="Hero — JUUNÉ Skin Atelier">

      {/* ── Ambient background wash ───────────────────────── */}
      <div className="hero-bg-wash" aria-hidden="true" />

      {/* ── Model image — right side, bleeds into background ── */}
      <div className={`hero-model-container ${visible ? "hero-model--visible" : ""}`}>
        <Image
          src="/hero-portrait-fix.png"
          alt="Radiant glowing skin — JUUNÉ Skin Atelier treatment result"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 58vw"
          className="hero-model-img"
        />
        {/* Left-edge gradient fade for seamless blend */}
        <div className="hero-model-fade" aria-hidden="true" />
        {/* Bottom fade */}
        <div className="hero-model-bottom-fade" aria-hidden="true" />

        {/* ── Floating Badge — Glow Score ──────────────── */}
        <div className="hero-badge hero-badge--glow" role="img" aria-label="Glow score 4.9">
          <div className="hero-badge-icon hero-badge-icon--gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-value">4.9</span>
            <span className="hero-badge-label">Glow Score</span>
          </div>
        </div>

        {/* ── Floating Badge — Hydration ───────────────── */}
        <div className="hero-badge hero-badge--hydration" role="img" aria-label="Hydration level 94%">
          <div className="hero-badge-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0 0 14 0C19 9.5 12 2 12 2Z" fill="currentColor" opacity="0.2" />
              <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0 0 14 0C19 9.5 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-value">94%</span>
            <span className="hero-badge-label">Hydration</span>
          </div>
        </div>

        {/* ── Decorative sparkles ──────────────────────── */}
        <span className="hero-sparkle hero-sparkle--1" aria-hidden="true" />
        <span className="hero-sparkle hero-sparkle--2" aria-hidden="true" />
        <span className="hero-sparkle hero-sparkle--3" aria-hidden="true" />
      </div>

      {/* ── Content overlay — left side ───────────────────── */}
      <div className="container-juune hero-inner">
        <div className={`hero-content ${visible ? "hero-content--visible" : ""}`}>

          {/* Eyebrow */}
          <span className="label-eyebrow hero-eyebrow">Luxury Skin Atelier</span>

          {/* Gold rule */}
          <hr className="divider hero-divider" />

          {/* Headline */}
          <h1 className="hero-headline">
            Timeless Skin,<br />
            <em>Effortless</em> Confidence
          </h1>

          {/* Body */}
          <p className="hero-body">
            At JUUNÉ Skin Atelier, we craft personalised treatments
            designed to reveal your most confident, radiant skin.
          </p>

          {/* CTA row */}
          <div className="hero-cta-row">
            <a href="#booking" className="btn-accent" id="hero-cta-primary">
              Start Your Treatment
            </a>
            <a href="#results" className="btn-secondary" id="hero-cta-secondary">
              View Results
              <svg className="hero-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Trust bar — 4 metrics */}
          <div className="hero-trust-bar">
            <div className="hero-trust-item">
              <svg className="hero-trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L17.18 19 12 15.27 6.82 19l2.09-6.26L3.82 9l6.09-.74L12 2z" fill="var(--color-accent)" opacity="0.2" />
                <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L17.18 19 12 15.27 6.82 19l2.09-6.26L3.82 9l6.09-.74L12 2z" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              <div className="hero-trust-text">
                <span className="hero-trust-value">4.9</span>
                <span className="hero-trust-label">Glow Score</span>
              </div>
            </div>

            <div className="hero-trust-item">
              <svg className="hero-trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="9" cy="7" r="3" stroke="var(--color-accent)" strokeWidth="1.3" />
                <circle cx="16" cy="7" r="3" stroke="var(--color-accent)" strokeWidth="1.3" />
                <path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M16 11a5 5 0 0 1 5 5v5" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <div className="hero-trust-text">
                <span className="hero-trust-value">2 000+</span>
                <span className="hero-trust-label">Happy Clients</span>
              </div>
            </div>

            <div className="hero-trust-item">
              <svg className="hero-trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="hero-trust-text">
                <span className="hero-trust-value">Certified</span>
                <span className="hero-trust-label">Specialists</span>
              </div>
            </div>

            <div className="hero-trust-item">
              <svg className="hero-trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              <div className="hero-trust-text">
                <span className="hero-trust-value">Premium</span>
                <span className="hero-trust-label">Experience</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}