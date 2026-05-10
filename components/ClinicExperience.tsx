"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Clinic Experience / Location Section
   • Centered editorial header
   • Side-by-side: clinic interior + warm-tinted map
   • Horizontal info strip below
   • Warm neutral palette — 100% design-system tokens
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

/* ── Component ───────────────────────────────────────────── */
export default function ClinicExperience(): React.ReactElement {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.04);
  const { ref: mediaRef, isVisible: mediaVisible } = useScrollReveal(0.06);
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal(0.1);

  return (
    <section
      ref={sectionRef as any}
      aria-label="Clinic Location & Experience"
      id="contact"
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
        {/* ── Section Header (centered) ──────────────────── */}
        <div
          style={{
            textAlign: "center" as const,
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s var(--ease-luxury), transform 0.9s var(--ease-luxury)",
            marginBottom: "clamp(3rem, 5vw, 4rem)",
          }}
        >
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
            The Atelier
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "var(--color-text-heading)",
              marginBottom: "var(--space-8)",
            }}
          >
            A Space Designed for{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-accent-dark)",
                fontWeight: 300,
              }}
            >
              Renewal
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)",
              color: "var(--color-text-muted)",
              maxWidth: "32rem",
              margin: "0 auto",
            }}
          >
            Nestled in the heart of Bali, our atelier is a sanctuary where clinical
            precision meets serene luxury — every detail thoughtfully crafted for
            your comfort and renewal.
          </p>
        </div>

        {/* ── Image + Map Row ────────────────────────────── */}
        <div
          ref={mediaRef as any}
          className="clinic-media-row"
          style={{
            marginBottom: "clamp(3rem, 5vw, 4.5rem)",
          }}
        >
          {/* Clinic Interior Image */}
          <div
            style={{
              opacity: mediaVisible ? 1 : 0,
              transform: mediaVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s var(--ease-luxury) 0.1s, transform 1s var(--ease-luxury) 0.1s",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(44, 26, 14, 0.06)",
              }}
            >
              <Image
                src="/clinic-interior-v1.png"
                alt="JUUNÉ Skin Atelier — luxury clinic interior in Bali"
                fill
                sizes="(max-width: 768px) 90vw, 50vw"
                style={{ objectFit: "cover" }}
                priority={false}
              />
            </div>
          </div>

          {/* Map Embed */}
          <div
            style={{
              opacity: mediaVisible ? 1 : 0,
              transform: mediaVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1s var(--ease-luxury) 0.18s, transform 1s var(--ease-luxury) 0.18s",
            }}
          >
            <div
              className="clinic-map-container"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.1!2d115.1620!3d-8.6895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd247490e0da3c1%3A0x7427c1dc9f356a1!2sSeminyak%2C+Kuta%2C+Badung+Regency%2C+Bali!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  position: "absolute",
                  inset: 0,
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JUUNÉ Skin Atelier location — Seminyak, Bali"
              />
            </div>
          </div>
        </div>

        {/* ── Info Strip ─────────────────────────────────── */}
        <div
          ref={infoRef as any}
          className="clinic-info-strip"
          style={{
            opacity: infoVisible ? 1 : 0,
            transform: infoVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s var(--ease-luxury) 0.2s, transform 0.9s var(--ease-luxury) 0.2s",
          }}
        >
          {/* Address */}
          <div className="clinic-info-block">
            <span className="clinic-info-label">Visit Us</span>
            <address
              style={{
                fontStyle: "normal",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-text-body)",
              }}
            >
              Jl. Raya Seminyak No. 28<br />
              Seminyak, Bali 80361
            </address>
          </div>

          {/* Hours */}
          <div className="clinic-info-block">
            <span className="clinic-info-label">Hours</span>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-text-body)",
              }}
            >
              Mon – Fri&ensp;·&ensp;10:00 – 19:00<br />
              Saturday&ensp;·&ensp;10:00 – 17:00<br />
              <span style={{ color: "var(--color-text-muted)" }}>
                Sunday&ensp;·&ensp;By Appointment
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="clinic-info-block">
            <span className="clinic-info-label">Get in Touch</span>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-text-body)",
                display: "flex",
                flexDirection: "column" as const,
                gap: "var(--space-1)",
              }}
            >
              <a href="tel:+6281234567890" className="clinic-link">
                +62 812 3456 7890
              </a>
              <a href="mailto:hello@juune-atelier.com" className="clinic-link">
                hello@juune-atelier.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── CSS ── */}
      <style>{`
        .clinic-media-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(1.5rem, 3vw, 2rem);
        }
        @media (min-width: 768px) {
          .clinic-media-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .clinic-map-container iframe {
          filter: grayscale(0.35) sepia(0.18) brightness(1.03) contrast(0.92);
          transition: filter var(--duration-slow) var(--ease-smooth);
        }
        .clinic-map-container:hover iframe {
          filter: grayscale(0.1) sepia(0.05) brightness(1.01) contrast(0.97);
        }

        .clinic-info-strip {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 4vw, 2.5rem);
          padding-top: var(--space-8);
          border-top: 1px solid var(--color-border-light);
        }
        @media (min-width: 640px) {
          .clinic-info-strip {
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(2rem, 4vw, 3rem);
          }
          .clinic-info-block {
            text-align: center;
          }
        }

        .clinic-info-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
          color: var(--color-accent-dark);
          margin-bottom: var(--space-3);
        }

        .clinic-link {
          color: var(--color-text-body);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-smooth);
        }
        .clinic-link:hover {
          color: var(--color-accent-dark);
        }
      `}</style>
    </section>
  );
}
