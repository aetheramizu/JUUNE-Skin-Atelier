"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Results Section (Redesigned)
   • Interactive before/after slider
   • Compact single-container layout
   • Integrated outcome metrics
   • No testimonial (handled by Testimonials section)
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

/* ── Before/After Slider ─────────────────────────────────── */
function BeforeAfterSlider({
  isVisible,
}: {
  isVisible: boolean;
}): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((p) => Math.max(5, p - 2));
    } else if (e.key === "ArrowRight") {
      setSliderPos((p) => Math.min(95, p + 2));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="results-slider"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 1s cubic-bezier(0.25, 0, 0.05, 1) 0.15s, transform 1s cubic-bezier(0.25, 0, 0.05, 1) 0.15s",
      }}
    >
      {/* After image — full background */}
      <div className="results-slider-img results-slider-img--after">
        <Image
          src="/results-after-v2.png"
          alt="After treatment — visibly radiant, luminous skin"
          fill
          sizes="(max-width: 768px) 92vw, 48rem"
          className="results-slider-photo"
          style={{ filter: "saturate(1.06) brightness(1.03)" }}
        />
      </div>

      {/* Before image — clipped by slider position */}
      <div
        className="results-slider-img results-slider-img--before"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src="/results-before-v2.png"
          alt="Before treatment — natural skin with visible texture"
          fill
          sizes="(max-width: 768px) 92vw, 48rem"
          className="results-slider-photo"
        />
      </div>

      {/* Labels   */}
      <span className="results-slider-text results-slider-text--before">Before</span>
      <span className="results-slider-text results-slider-text--after">After</span>

      {/* Slider handle */}
      <div
        className="results-slider-handle"
        style={{ left: `${sliderPos}%` }}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Vertical line */}
        <div className="results-slider-line" />

        {/* Grip circle */}
        <div className="results-slider-grip">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5l-5 7 5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 5l5 7-5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Floating treatment badge */}
      <div className="results-slider-badge" role="img" aria-label="Facial Rejuvenation treatment — 6 sessions">
        <span className="results-slider-badge-title">Facial Rejuvenation</span>
        <span className="results-slider-badge-detail">6 Sessions · 12 Weeks</span>
      </div>
    </div>
  );
}

/* ── Component ────────────────────────────────────────────── */
export default function ResultsSection(): React.ReactElement {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.06);
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollReveal(0.12);
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
            BEFORE / AFTER — Interactive Slider
        ═══════════════════════════════════════════════════ */}
        <div 
          ref={showcaseRef as React.RefObject<HTMLDivElement>}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <BeforeAfterSlider isVisible={showcaseVisible} />
        </div>

        {/* ═══════════════════════════════════════════════════
            TREATMENT OUTCOMES — Integrated Metrics
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
          <a href="#booking" className="btn-accent text-center" id="results-cta-booking">
            <span className="text-center w-full block">Begin Your Transformation</span>
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
