"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Final CTA Section
   • Centered editorial composition
   • Gold separator with scaleX reveal
   • Reuses btn-accent + btn-secondary from globals.css
   • Warm neutral palette — 100% design-system tokens
   • Staggered scroll-reveal animations
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

/* ── Component ───────────────────────────────────────────── */
export default function FinalCTA(): React.ReactElement {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);

  return (
    <section
      ref={sectionRef as any}
      aria-label="Book your appointment"
      id="booking"
      style={{
        backgroundColor: "var(--color-bg-soft)",
        borderTop: "1px solid var(--color-border-light)",
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 5vw, 2.5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 2.5rem)",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          textAlign: "center" as const,
        }}
      >
        {/* Gold separator — scaleX reveal */}
        <div
          style={{
            width: "3rem",
            height: "1px",
            backgroundColor: "var(--color-accent)",
            opacity: 0.5,
            marginBottom: "var(--space-10)",
            transform: isVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1s var(--ease-luxury)",
          }}
          aria-hidden="true"
        />

        {/* Eyebrow */}
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "var(--tracking-widest)",
            color: "var(--color-accent-dark)",
            marginBottom: "var(--space-6)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s var(--ease-luxury) 0.1s, transform 0.9s var(--ease-luxury) 0.1s",
          }}
        >
          Your Journey Begins
        </span>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "var(--color-text-heading)",
            marginBottom: "var(--space-8)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s var(--ease-luxury) 0.18s, transform 0.9s var(--ease-luxury) 0.18s",
          }}
        >
          Ready to Reveal<br />
          Your{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-accent-dark)",
              fontWeight: 300,
            }}
          >
            Best
          </em>{" "}
          Skin?
        </h2>

        {/* Supporting text */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-relaxed)",
            color: "var(--color-text-muted)",
            maxWidth: "28rem",
            marginBottom: "clamp(2.5rem, 4vw, 3.5rem)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.9s var(--ease-luxury) 0.26s, transform 0.9s var(--ease-luxury) 0.26s",
          }}
        >
          Every transformation begins with a single step. Let us craft
          a personalised journey that honours your skin&apos;s unique story.
        </p>

        {/* Button row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            justifyContent: "center",
            gap: "var(--space-6)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s var(--ease-luxury) 0.35s, transform 0.9s var(--ease-luxury) 0.35s",
          }}
        >
          <a
            href="#booking"
            className="btn-accent"
            id="cta-final-primary"
            style={{
              padding: "1rem 2.75rem",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
            }}
          >
            Book Appointment
          </a>

          <a
            href="#treatments"
            className="btn-secondary"
            id="cta-final-secondary"
            style={{
              padding: "1rem 2.5rem",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
            }}
          >
            View Treatments
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              style={{ marginLeft: "0.35rem" }}
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
