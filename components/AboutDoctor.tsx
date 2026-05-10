"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — About / Doctor Section
   • Editorial split layout (portrait left, philosophy right)
   • Warm neutral palette — 100% design-system tokens
   • Credential trust indicators
   • Founder signature quote
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

/* ── Credential Data ─────────────────────────────────────── */
const CREDENTIALS = [
  { value: "15+", label: "Years" },
  { value: "800+", label: "Clients" },
  { value: "Board", label: "Certified" },
] as const;

/* ── Component ───────────────────────────────────────────── */
export default function AboutDoctor(): React.ReactElement {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.06);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.08);

  return (
    <section
      ref={sectionRef as any}
      aria-label="About the Founder"
      id="about"
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
              textTransform: "uppercase" as const,
              letterSpacing: "var(--tracking-widest)",
              color: "var(--color-accent-dark)",
              marginBottom: "var(--space-6)",
            }}
          >
            About the Founder
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
              maxWidth: "22rem",
            }}
          >
            The Heart Behind{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-accent-dark)",
                fontWeight: 300,
              }}
            >
              the Glow
            </em>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--color-text-muted)",
              maxWidth: "30rem",
            }}
          >
            Behind every radiant transformation is a philosophy rooted in precision,
            empathy, and an unwavering belief in your skin&apos;s natural potential.
          </p>
        </div>

        {/* ── Editorial Split Layout ─────────────────────── */}
        <div
          ref={contentRef as any}
          className="about-grid"
        >
          {/* Left — Portrait ─────────────────────────────── */}
          <div
            className="about-portrait-col"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 1s var(--ease-luxury) 0.1s, transform 1s var(--ease-luxury) 0.1s",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Image
                src="/about-doctor-v1.png"
                alt="Dr. Juuné Park — Founder of JUUNÉ Skin Atelier"
                fill
                sizes="(max-width: 768px) 90vw, 42vw"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                priority={false}
              />
            </div>
          </div>

          {/* Right — Philosophy & Bio ────────────────────── */}
          <div
            className="about-content-col"
            style={{
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "center",
            }}
          >
            {/* Philosophy */}
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s var(--ease-luxury) 0.15s, transform 0.9s var(--ease-luxury) 0.15s",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body-lg)",
                  lineHeight: "var(--leading-relaxed)",
                  color: "var(--color-text-body)",
                  marginBottom: "var(--space-8)",
                }}
              >
                At JUUNÉ, we believe that true beauty is never about masking — it&apos;s about
                revealing. Every treatment we offer is a carefully considered ritual, designed
                to honour your skin&apos;s unique story and guide it toward its most luminous expression.
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--leading-relaxed)",
                  color: "var(--color-text-muted)",
                  marginBottom: "var(--space-8)",
                }}
              >
                Our approach combines advanced clinical science with a deeply intuitive
                understanding of each client&apos;s needs. We don&apos;t follow trends — we listen,
                assess, and craft personalised treatment journeys that deliver lasting,
                visible transformation.
              </p>

              {/* Gold separator */}
              <div
                style={{
                  width: "2.5rem",
                  height: "1px",
                  backgroundColor: "var(--color-accent)",
                  opacity: 0.5,
                  marginBottom: "var(--space-8)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Credentials Row */}
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.9s var(--ease-luxury) 0.25s, transform 0.9s var(--ease-luxury) 0.25s",
                marginBottom: "var(--space-10)",
              }}
            >
              <div
                className="about-credentials"
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: "0",
                }}
              >
                {CREDENTIALS.map((cred, i) => (
                  <div
                    key={cred.label}
                    style={{
                      display: "flex",
                      flexDirection: "column" as const,
                      alignItems: "center",
                      gap: "var(--space-1)",
                      flex: "1 1 0",
                      minWidth: "0",
                      paddingTop: "var(--space-4)",
                      paddingBottom: "var(--space-4)",
                      borderLeft: i > 0 ? "1px solid var(--color-border-light)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                        fontWeight: 400,
                        color: "var(--color-accent-dark)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {cred.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.65rem",
                        fontWeight: 400,
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        textAlign: "center" as const,
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      {cred.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Quote */}
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.9s var(--ease-luxury) 0.35s, transform 0.9s var(--ease-luxury) 0.35s",
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "var(--color-text-heading)",
                  marginBottom: "var(--space-3)",
                  letterSpacing: "0.01em",
                }}
              >
                &ldquo;Your skin carries your story. My role is simply to help it
                tell that story with confidence and light.&rdquo;
              </blockquote>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 500,
                  letterSpacing: "var(--tracking-wide)",
                  color: "var(--color-accent-dark)",
                  textTransform: "uppercase" as const,
                }}
              >
                — Dr. Juuné Park
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive Grid CSS ── */}
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2.5rem, 5vw, 4rem);
        }
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1.1fr;
            align-items: center;
            gap: clamp(3rem, 5vw, 4.5rem);
          }
        }
        @media (max-width: 767px) {
          .about-portrait-col {
            max-width: 420px;
          }
        }
      `}</style>
    </section>
  );
}
