"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Featured Treatments Section
   • Compact 4-column overlay cards
   • Text overlaid on image with gradient
   • Hover reveals description + CTA
   • Responsive: 2-col mobile / 4-col desktop
───────────────────────────────────────────────────────────── */

/* ── Treatment Data ──────────────────────────────────────── */
interface Treatment {
  title: string;
  description: string;
  image: string;
  href: string;
}

const TREATMENTS: Treatment[] = [
  {
    title: "Facial Treatment",
    description:
      "A deeply personalised facial ritual designed to restore luminosity, refine texture, and reveal your skin's natural radiance.",
    image: "/treatment-facial-v2.png",
    href: "#facial-treatment",
  },
  {
    title: "Botox & Filler",
    description:
      "Precision-driven aesthetic enhancements that subtly restore volume, smooth fine lines, and preserve your natural expression.",
    image: "/treatment-botox-v2.png",
    href: "#botox-filler",
  },
  {
    title: "Acne Treatment",
    description:
      "Advanced clinical protocols targeting breakouts at their source — clearing, calming, and preventing future imperfections.",
    image: "/treatment-acne-v2.png",
    href: "#acne-treatment",
  },
  {
    title: "Skin Rejuvenation",
    description:
      "Next-generation therapies that stimulate collagen renewal, restore elasticity, and unveil a visibly younger complexion.",
    image: "/treatment-rejuvenation-v2.png",
    href: "#skin-rejuvenation",
  },
];

/* ── Scroll Reveal Hook ──────────────────────────────────── */
function useScrollReveal(threshold: number = 0.12): {
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

/* ── Treatment Card (Overlay Style — Refined) ───────────── */
function TreatmentItem({
  treatment,
  index,
  isVisible,
}: {
  treatment: Treatment;
  index: number;
  isVisible: boolean;
}): React.ReactElement {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 800ms cubic-bezier(0.25, 0, 0.05, 1) ${150 + index * 120}ms, transform 800ms cubic-bezier(0.25, 0, 0.05, 1) ${150 + index * 120}ms`,
      }}
    >
      <a
        href={treatment.href}
        id={`treatment-item-${index}`}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-[14px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          boxShadow: hovered
            ? "0 14px 44px rgba(44, 26, 14, 0.15)"
            : "0 8px 32px rgba(44, 26, 14, 0.08)",
          transition: "box-shadow 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative aspect-square md:aspect-[3/4] w-full overflow-hidden bg-[var(--color-bg-soft)]">
          <Image
            src={treatment.image}
            alt={`${treatment.title} — JUUNÉ Skin Atelier`}
            fill
            sizes="(max-width: 768px) 48vw, (max-width: 1024px) 46vw, 280px"
            className="object-cover object-center"
            style={{
              transform: hovered ? "scale(1.045)" : "scale(1)",
              transition: "transform 1200ms ease-out",
            }}
          />

          {/* ── Cinematic gradient overlay ───────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: hovered
                ? "linear-gradient(to top, rgba(18, 10, 4, 0.85) 0%, rgba(24, 14, 6, 0.55) 40%, rgba(28, 18, 8, 0.15) 70%, transparent 100%)"
                : "linear-gradient(to top, rgba(22, 14, 6, 0.82) 0%, rgba(28, 18, 8, 0.38) 35%, rgba(28, 18, 8, 0.05) 55%, transparent 70%)",
              transition: "background 600ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* ── Text Content (overlaid) ───────────────────── */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
            style={{ padding: "1.25rem 1.15rem" }}
          >
            {/* Title — always visible */}
            <h3
              className="font-serif font-normal leading-[1.15]"
              style={{
                fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
                letterSpacing: "0.01em",
                color: "rgba(250, 248, 245, 0.97)",
                textShadow: "0 1px 10px rgba(0, 0, 0, 0.35), 0 0 30px rgba(0, 0, 0, 0.15)",
              }}
            >
              {treatment.title}
            </h3>

            {/* Gold accent line — always visible */}
            <div
              aria-hidden="true"
              style={{
                width: hovered ? "2.5rem" : "1.5rem",
                height: "1.5px",
                backgroundColor: "rgba(201, 169, 110, 0.6)",
                marginTop: "0.6rem",
                borderRadius: "1px",
                transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1), background-color 500ms ease",
                ...(hovered ? { backgroundColor: "rgba(201, 169, 110, 0.85)" } : {}),
              }}
            />

            {/* Description & CTA — revealed on hover */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: hovered ? "1fr" : "0fr",
                transition: "grid-template-rows 450ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 400ms ease 100ms, transform 400ms ease 100ms",
                    pointerEvents: hovered ? "auto" : "none",
                  }}
                >
                  <p
                    className="line-clamp-3"
                    style={{
                      marginTop: "0.65rem",
                      fontSize: "0.8rem",
                      lineHeight: 1.65,
                      color: "rgba(250, 248, 245, 0.72)",
                    }}
                  >
                    {treatment.description}
                  </p>

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      marginTop: "0.75rem",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "rgba(250, 248, 245, 0.75)",
                    }}
                  >
                    Learn More
                    {/* Small arrow for affordance */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: 0.7 }}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}


/* ── Section Component ───────────────────────────────────── */
export default function FeaturedTreatments(): React.ReactElement {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.08);

  return (
    <section
      id="treatments"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden flex flex-col items-center"
      aria-label="Featured Treatments"
      style={{ backgroundColor: "var(--color-bg-soft)", borderTop: "1px solid var(--color-border-light)", paddingTop: "clamp(4rem, 6vw, 6rem)", paddingBottom: "clamp(4rem, 6vw, 5.5rem)" }}
    >
      {/* ── Ambient background — warm radials for glass depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.46,
          background: `
            radial-gradient(ellipse 54% 44% at 18% 34%, var(--color-bg-muted) 0%, transparent 72%),
            radial-gradient(ellipse 42% 46% at 84% 66%, var(--color-primary-light) 0%, transparent 68%)
          `,
        }}
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center">
        {/* ── Section Header ──────────────────────────────── */}
        <div
          className="flex flex-col items-center text-center w-full max-w-3xl mx-auto"
          style={{
            marginBottom: "clamp(2rem, 3.5vw, 3rem)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0, 0.05, 1), transform 0.8s cubic-bezier(0.25, 0, 0.05, 1)",
          }}
        >
          <span
            className="inline-block text-[0.72rem] font-medium uppercase"
            style={{
              letterSpacing: "var(--tracking-widest)",
              color: "var(--color-accent-dark)",
              marginBottom: "1.5rem",
            }}
          >
            Our Treatments
          </span>

          {/* Heading */}
          <h2
            className="font-serif text-[2.1rem] sm:text-[3.25rem] lg:text-[4rem] font-light text-center"
            style={{
              lineHeight: 1.1,
              letterSpacing: "0",
              color: "var(--color-text-heading)",
              marginBottom: "1.25rem",
              paddingInline: "1rem",
            }}
          >
            Tailored Care for{" "}
            <em
              className="italic font-normal"
              style={{ color: "var(--color-accent-dark)" }}
            >
              Every Skin
            </em>
          </h2>

          {/* Description */}
          <p
            className="text-[0.95rem] sm:text-[1.05rem] leading-[1.8] text-center max-w-[18rem] sm:max-w-xl mx-auto"
            style={{ color: "color-mix(in srgb, var(--color-text-body) 78%, var(--color-text-muted) 22%)" }}
          >
            Discover our curated collection of premium treatments —
            each meticulously designed to nurture, restore, and elevate
            your natural beauty.
          </p>
        </div>

        {/* ── Treatment Grid (4-col desktop, 2-col tablet, 1-col mobile) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6 w-full mx-auto max-w-[20rem] md:max-w-none">
          {TREATMENTS.map((treatment, index) => (
            <TreatmentItem
              key={treatment.title}
              treatment={treatment}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <div
          className="flex justify-center w-full"
          style={{
            marginTop: "clamp(3rem, 5vw, 4.5rem)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s cubic-bezier(0.25, 0, 0.05, 1) 600ms, transform 0.7s cubic-bezier(0.25, 0, 0.05, 1) 600ms",
          }}
        >
          <a
            href="#treatments"
            id="treatments-view-all"
            className="btn-secondary group inline-flex items-center justify-center gap-4 border-[rgba(44,26,14,0.18)] bg-[rgba(250,248,245,0.36)] uppercase text-center transition-transform duration-500 hover:-translate-y-0.5 hover:bg-[rgba(201,169,110,0.06)]"
            style={{
              padding: "0.95rem 2.75rem",
              fontSize: "0.72rem",
              letterSpacing: "0.18em"
            }}
          >
            View All Treatments
            <span
              className="h-px w-10 bg-[rgba(44,26,14,0.2)] transition-all duration-500 group-hover:w-14 group-hover:bg-[var(--color-accent-dark)]"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
