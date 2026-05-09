"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Testimonials Section
   • Asymmetric editorial layout (featured left, stacked right)
   • Minimal quote presentation with serif typography
   • Warm neutral tones — 100% design-system tokens
   • Smooth scroll-reveal animations
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

/* ── Testimonial Data ────────────────────────────────────── */
interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
  detail: string;
}

const FEATURED_TESTIMONIAL: Testimonial = {
  quote:
    "I have visited many clinics, but JUUNÉ is in a different class entirely. After my Skin Rejuvenation series, people kept asking what I had done differently — my skin simply glows from within. It's the most confident I have felt in years.",
  name: "Natasha L.",
  treatment: "Skin Rejuvenation",
  detail: "3-session series · Jakarta",
};

const SECONDARY_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Botox & Filler treatment was so refined and precise. No bruising, no downtime — just a naturally lifted, softer version of myself. I couldn't have asked for a more elegant experience.",
    name: "Clarissa M.",
    treatment: "Botox & Filler",
    detail: "Single session · Bali",
  },
  {
    quote:
      "My complexion has completely transformed after the Acne Treatment programme. JUUNÉ's approach is clinical, but the environment is so calming. I finally feel at peace with my skin.",
    name: "Serena A.",
    treatment: "Acne Treatment",
    detail: "4-session programme · Singapore",
  },
];

/* ── Large Quote Mark SVG ─────────────────────────────────── */
function QuoteMark({ size = 48, opacity = 0.12 }: { size?: number; opacity?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 48 34"
      fill="none"
      aria-hidden="true"
      style={{ opacity, flexShrink: 0 }}
    >
      <path
        d="M0 34V20.8C0 14.4 1.6 9.33333 4.8 5.6C8 1.86667 12.5333 0 18.4 0V5.6C15.4667 5.6 13.0667 6.66667 11.2 8.8C9.33333 10.9333 8.4 13.6 8.4 16.8H16.8V34H0ZM28 34V20.8C28 14.4 29.6 9.33333 32.8 5.6C36 1.86667 40.5333 0 46.4 0V5.6C43.4667 5.6 41.0667 6.66667 39.2 8.8C37.3333 10.9333 36.4 13.6 36.4 16.8H44.8V34H28Z"
        fill="var(--color-accent-dark)"
      />
    </svg>
  );
}

/* ── Featured Testimonial Card ───────────────────────────── */
function FeaturedCard({
  testimonial,
  isVisible,
}: {
  testimonial: Testimonial;
  isVisible: boolean;
}): React.ReactElement {
  return (
    <article
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 1s var(--ease-luxury), transform 1s var(--ease-luxury)",
      }}
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Opening quote */}
      <QuoteMark size={52} opacity={0.08} />

      {/* Quote body */}
      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.65,
          color: "var(--color-text-heading)",
          marginTop: "var(--space-6)",
          marginBottom: "var(--space-8)",
          letterSpacing: "0.01em",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Thin separator */}
      <div
        style={{
          width: "2.5rem",
          height: "1px",
          backgroundColor: "var(--color-accent)",
          opacity: 0.6,
          marginBottom: "var(--space-6)",
        }}
        aria-hidden="true"
      />

      {/* Attribution */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            fontWeight: 500,
            letterSpacing: "var(--tracking-wide)",
            color: "var(--color-text-heading)",
            textTransform: "uppercase",
          }}
        >
          {testimonial.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap" as const,
          }}
        >
          {testimonial.treatment} &nbsp;·&nbsp; {testimonial.detail}
        </span>
      </div>
    </article>
  );
}

/* ── Secondary Testimonial Card ──────────────────────────── */
function SecondaryCard({
  testimonial,
  delay,
  isVisible,
}: {
  testimonial: Testimonial;
  delay: string;
  isVisible: boolean;
}): React.ReactElement {
  return (
    <article
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.9s var(--ease-luxury) ${delay}, transform 0.9s var(--ease-luxury) ${delay}`,
        paddingBottom: "var(--space-8)",
        borderBottom: "1px solid var(--color-border-light)",
      }}
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <QuoteMark size={32} opacity={0.06} />

      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.7,
          color: "var(--color-text-heading)",
          marginTop: "var(--space-4)",
          marginBottom: "var(--space-6)",
          letterSpacing: "0.01em",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "var(--tracking-wide)",
            color: "var(--color-text-heading)",
            textTransform: "uppercase",
          }}
        >
          {testimonial.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.07em",
            whiteSpace: "nowrap" as const,
          }}
        >
          {testimonial.treatment} &nbsp;·&nbsp; {testimonial.detail}
        </span>
      </div>
    </article>
  );
}

/* ── Section Component ───────────────────────────────────── */
export default function Testimonials(): React.ReactElement {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.06);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.1);

  return (
    <section
      ref={sectionRef as any}
      aria-label="Client Testimonials"
      id="testimonials"
      style={{
        backgroundColor: "var(--color-bg-base)",
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
        }}
      >
        {/* ── Section Header ──────────────────────────────── */}
        <div
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s var(--ease-luxury), transform 0.9s var(--ease-luxury)",
            marginBottom: "clamp(3.5rem, 6vw, 5rem)",
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-widest)",
              color: "var(--color-accent-dark)",
              marginBottom: "var(--space-6)",
            }}
          >
            Client Stories
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
              marginBottom: "var(--space-6)",
              maxWidth: "26rem",
            }}
          >
            Skin That{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-accent-dark)",
                fontWeight: 300,
              }}
            >
              Speaks
            </em>{" "}
            for Itself
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--color-text-muted)",
              maxWidth: "28rem",
            }}
          >
            Every story is a testament to what precision, care, and a deeply personalised
            approach can achieve.
          </p>
        </div>

        {/* ── Testimonial Grid ──────────────────────────── */}
        <div
          ref={gridRef as any}
          className="testimonials-grid"
        >
          {/* Featured — Left */}
          <div className="testimonials-featured">
            <FeaturedCard testimonial={FEATURED_TESTIMONIAL} isVisible={gridVisible} />
          </div>

          {/* Stacked — Right */}
          <div
            className="testimonials-stack"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2.5rem, 4vw, 3.5rem)",
            }}
          >
            {SECONDARY_TESTIMONIALS.map((t, i) => (
              <SecondaryCard
                key={t.name}
                testimonial={t}
                delay={`${0.15 + i * 0.12}s`}
                isVisible={gridVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid Layout CSS ── */}
      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 5vw, 5rem);
        }
        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1.15fr 1fr;
            align-items: center;
          }
          .testimonials-featured {
            padding-right: clamp(2rem, 4vw, 3.5rem);
          }
          .testimonials-stack {
            padding-left: clamp(2rem, 4vw, 3.5rem);
            border-left: 1px solid var(--color-border-light);
          }
        }
        .testimonials-stack article:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
      `}</style>
    </section>
  );
}
