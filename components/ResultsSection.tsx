"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Results Section
   • Editorial before/after showcase
   • Minimal testimonial snippet
   • Treatment outcome metrics
   • Luxury CTA
   • 100% design-system tokens from globals.css
───────────────────────────────────────────────────────────── */

/* ── Scroll Reveal Hook ──────────────────────────────────── */
function useScrollReveal(threshold: number = 0.1): {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
} {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

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

/* ── Outcome Metrics Data ───────────────────────────────── */
const OUTCOMES = [
  { end: 97, suffix: "%", label: "Visible Improvement", duration: 1400 },
  { end: 89, suffix: "%", label: "Texture Refinement", duration: 1200 },
  { end: 94, suffix: "%", label: "Client Satisfaction", duration: 1000 },
] as const;

/* ── Component ────────────────────────────────────────────── */
export default function ResultsSection(): React.ReactElement {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.06);
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollReveal(0.12);
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollReveal(0.1);
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollReveal(0.15);

  const outcome0 = useCountUp(OUTCOMES[0].end, OUTCOMES[0].duration, OUTCOMES[0].suffix);
  const outcome1 = useCountUp(OUTCOMES[1].end, OUTCOMES[1].duration, OUTCOMES[1].suffix);
  const outcome2 = useCountUp(OUTCOMES[2].end, OUTCOMES[2].duration, OUTCOMES[2].suffix);
  const outcomeRefs = [outcome0, outcome1, outcome2];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="results-section"
      aria-label="Treatment Results"
      id="results"
    >
      {/* ── Ambient Background ─────────────────────────────── */}
      <div className="results-bg-wash" aria-hidden="true" />

      <div className="results-container">

        {/* ═══════════════════════════════════════════════════
            SECTION HEADER — Editorial Intro
        ═══════════════════════════════════════════════════ */}
        <div
          className="results-header"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 0.9s cubic-bezier(0.25, 0, 0.05, 1), transform 0.9s cubic-bezier(0.25, 0, 0.05, 1)",
          }}
        >
          {/* Luxury Label */}
          <span className="results-eyebrow">Real Results</span>

          {/* Editorial Divider */}
          <hr className="divider results-divider" />

          {/* Headline */}
          <h2 className="results-headline">
            The Proof Is in{" "}
            <em>the Glow</em>
          </h2>

          {/* Supporting Text */}
          <p className="results-subtext">
            Every transformation begins with trust. See the visible difference
            our personalised treatments deliver — naturally radiant, 
            clinically refined skin.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════
            BEFORE / AFTER SHOWCASE — Editorial Comparison
        ═══════════════════════════════════════════════════ */}
        <div
          ref={showcaseRef as React.RefObject<HTMLDivElement>}
          className="results-showcase"
          style={{
            opacity: showcaseVisible ? 1 : 0,
            transform: showcaseVisible ? "translateY(0)" : "translateY(32px)",
            transition:
              "opacity 1s cubic-bezier(0.25, 0, 0.05, 1) 0.15s, transform 1s cubic-bezier(0.25, 0, 0.05, 1) 0.15s",
          }}
        >
          {/* Before Column */}
          <div className="results-showcase-col results-showcase-col--before">
            <div className="results-image-wrapper results-image--before">
              <Image
                src="/hero-portrait-fix.png"
                alt="Before treatment — natural skin with visible texture"
                fill
                sizes="(max-width: 768px) 86vw, 42vw"
                className="results-image"
              />
              {/* CSS filter overlay applied via class */}
              <div className="results-image-overlay results-image-overlay--before" aria-hidden="true" />
            </div>
            <span className="results-image-label">Before</span>
          </div>

          {/* After Column */}
          <div className="results-showcase-col results-showcase-col--after">
            <div className="results-image-wrapper results-image--after">
              <Image
                src="/hero-portrait-fix.png"
                alt="After treatment — visibly radiant, luminous skin"
                fill
                sizes="(max-width: 768px) 86vw, 42vw"
                className="results-image"
              />
              <div className="results-image-overlay results-image-overlay--after" aria-hidden="true" />
            </div>
            <span className="results-image-label">After</span>
          </div>

          {/* Floating Treatment Badge */}
          <div className="results-treatment-badge" role="img" aria-label="Facial Rejuvenation treatment — 6 sessions">
            <span className="results-badge-title">Facial Rejuvenation</span>
            <span className="results-badge-detail">6 Sessions · 12 Weeks</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            TESTIMONIAL — Minimal Editorial Quote
        ═══════════════════════════════════════════════════ */}
        <div
          ref={testimonialsRef as React.RefObject<HTMLDivElement>}
          className="results-testimonial"
          style={{
            opacity: testimonialsVisible ? 1 : 0,
            transform: testimonialsVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.9s cubic-bezier(0.25, 0, 0.05, 1) 0.1s, transform 0.9s cubic-bezier(0.25, 0, 0.05, 1) 0.1s",
          }}
        >
          {/* Decorative open quote */}
          <span className="results-quote-mark" aria-hidden="true">&ldquo;</span>

          <blockquote className="results-quote">
            My skin has never felt this alive. After just a few sessions,
            I noticed a clarity and luminosity I hadn&apos;t seen in years.
            It&apos;s not just treatment — it&apos;s transformation.
          </blockquote>

          <cite className="results-cite">
            <span className="results-cite-name">Minji K.</span>
            <span className="results-cite-detail">Facial Rejuvenation Client</span>
          </cite>
        </div>

        {/* ═══════════════════════════════════════════════════
            TREATMENT OUTCOMES — Subtle Metrics
        ═══════════════════════════════════════════════════ */}
        <div
          ref={metricsRef as React.RefObject<HTMLDivElement>}
          className="results-outcomes"
          style={{
            opacity: metricsVisible ? 1 : 0,
            transform: metricsVisible ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.8s cubic-bezier(0.25, 0, 0.05, 1) 0.15s, transform 0.8s cubic-bezier(0.25, 0, 0.05, 1) 0.15s",
          }}
        >
          <span className="results-outcomes-eyebrow">Treatment Outcomes</span>

          <div className="results-outcomes-row">
            {OUTCOMES.map((o, i) => (
              <div className="results-outcome" key={o.label}>
                <span className="results-outcome-value" ref={outcomeRefs[i].ref}>
                  {outcomeRefs[i].display}
                </span>
                <span className="results-outcome-label">{o.label}</span>
                {i < OUTCOMES.length - 1 && (
                  <span className="results-outcome-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            CTA — Elegant
        ═══════════════════════════════════════════════════ */}
        <div
          className="results-cta-wrapper"
          style={{
            opacity: metricsVisible ? 1 : 0,
            transform: metricsVisible ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 0.7s cubic-bezier(0.25, 0, 0.05, 1) 0.4s, transform 0.7s cubic-bezier(0.25, 0, 0.05, 1) 0.4s",
          }}
        >
          <a href="#booking" className="btn-accent" id="results-cta-booking">
            Begin Your Transformation
          </a>
          <a href="#treatments" className="results-cta-secondary" id="results-cta-treatments">
            Explore Treatments
            <svg className="results-cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
