"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Hero Section (Refined v3)
   • Floating badges with improved visibility
   • Metric-based trust section with count-up animation
   • Tokens: 100% design-system variables from globals.css
───────────────────────────────────────────────────────────── */

/* ── Count-Up Hook ──────────────────────────────────────────── */
function useCountUp(
  end: number,
  duration: number = 1400,
  suffix: string = "",
  prefix: string = "",
  decimals: number = 0
) {
  const [display, setDisplay] = useState<string>(`${prefix}0${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;

      if (decimals > 0) {
        setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      } else {
        setDisplay(`${prefix}${Math.round(current).toLocaleString()}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, suffix, prefix, decimals]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return { ref, display };
}

/* ── Metric Data ──────────────────────────────────────────── */
const METRICS = [
  { end: 12, suffix: "K+", prefix: "", decimals: 0, label: "Happy Clients" },
  { end: 98, suffix: "%", prefix: "", decimals: 0, label: "Satisfaction" },
  { end: 8, suffix: "+", prefix: "", decimals: 0, label: "Years Experience" },
] as const;

/* ── Component ────────────────────────────────────────────── */
export default function Hero(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Count-up hooks for each metric
  const metric0 = useCountUp(METRICS[0].end, 1400, METRICS[0].suffix, METRICS[0].prefix, METRICS[0].decimals);
  const metric1 = useCountUp(METRICS[1].end, 1200, METRICS[1].suffix, METRICS[1].prefix, METRICS[1].decimals);
  const metric2 = useCountUp(METRICS[2].end, 1000, METRICS[2].suffix, METRICS[2].prefix, METRICS[2].decimals);
  const metricRefs = [metric0, metric1, metric2];

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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l1.09 3.26L16.18 6l-3.09 1.74L14.18 11 12 8.77 9.82 11l1.09-3.26L7.82 6l3.09-.74L12 2z" fill="currentColor" opacity="0.5" />
              <path d="M12 2l1.09 3.26L16.18 6l-3.09 1.74L14.18 11 12 8.77 9.82 11l1.09-3.26L7.82 6l3.09-.74L12 2z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
              <path d="M19 14l.62 1.88L21.5 16.5l-1.88.62L19 19l-.62-1.88L16.5 16.5l1.88-.62L19 14z" fill="currentColor" opacity="0.4" />
              <path d="M6 16l.44 1.32L7.76 17.76l-1.32.44L6 19.52l-.44-1.32L4.24 17.76l1.32-.44L6 16z" fill="currentColor" opacity="0.3" />
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3C12 3 6 10.5 6 14.5a6 6 0 0 0 12 0C18 10.5 12 3 12 3Z" fill="currentColor" opacity="0.18" />
              <path d="M12 3C12 3 6 10.5 6 14.5a6 6 0 0 0 12 0C18 10.5 12 3 12 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="hero-badge-text">
            <span className="hero-badge-value">94%</span>
            <span className="hero-badge-label">Hydration</span>
          </div>
        </div>
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

          {/* ── Metrics Trust Section — Count-Up Animation ─── */}
          <div className="hero-metrics">
            {METRICS.map((m, i) => (
              <div className="hero-metric" key={m.label}>
                <span className="hero-metric-value" ref={metricRefs[i].ref}>
                  {metricRefs[i].display}
                </span>
                <span className="hero-metric-label">{m.label}</span>
                {i < METRICS.length - 1 && (
                  <span className="hero-metric-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}