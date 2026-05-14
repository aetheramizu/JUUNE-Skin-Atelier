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

/* ── Treatment Card (Overlay Style) ──────────────────────── */
function TreatmentItem({
  treatment,
  index,
  isVisible,
}: {
  treatment: Treatment;
  index: number;
  isVisible: boolean;
}): React.ReactElement {
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
        className="treatment-card group relative block w-full cursor-pointer overflow-hidden rounded-[12px]"
      >
        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-bg-soft)]">
          <Image
            src={treatment.image}
            alt={`${treatment.title} — JUUNÉ Skin Atelier`}
            fill
            sizes="(max-width: 768px) 48vw, (max-width: 1024px) 46vw, 260px"
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />

          {/* ── Default gradient overlay (bottom) ─────────── */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to top, rgba(28, 18, 8, 0.65) 0%, rgba(28, 18, 8, 0.25) 35%, transparent 60%)",
            }}
          />

          {/* ── Hover gradient overlay (extends higher) ───── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to top, rgba(28, 18, 8, 0.78) 0%, rgba(28, 18, 8, 0.45) 45%, rgba(28, 18, 8, 0.1) 75%, transparent 100%)",
            }}
          />

          {/* ── Text Content (overlaid) ───────────────────── */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-5 lg:p-5">
            {/* Title — always visible */}
            <h3
              className="font-serif text-[1.15rem] sm:text-[1.3rem] lg:text-[1.35rem] font-normal leading-[1.15] tracking-[0.01em]"
              style={{ color: "rgba(250, 248, 245, 0.95)" }}
            >
              {treatment.title}
            </h3>

            {/* Description — revealed on hover */}
            <div className="treatment-card-desc">
              <p
                className="mt-2.5 text-[0.78rem] sm:text-[0.82rem] leading-[1.6] line-clamp-3"
                style={{ color: "rgba(250, 248, 245, 0.72)" }}
              >
                {treatment.description}
              </p>

              {/* CTA */}
              <span
                className="treatment-card-cta mt-3 inline-flex items-center gap-2.5 text-[0.65rem] font-medium uppercase tracking-[0.16em]"
                style={{ color: "rgba(250, 248, 245, 0.6)" }}
              >
                Learn More
                <span
                  className="treatment-card-line h-px w-7 transition-all duration-500"
                  style={{ backgroundColor: "rgba(250, 248, 245, 0.35)" }}
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>

        {/* ── Hover styles (scoped via styled-jsx) ────────── */}
        <style jsx>{`
          .treatment-card-desc {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 500ms ease-out, opacity 500ms ease-out;
          }
          .treatment-card:hover .treatment-card-desc {
            max-height: 140px;
            opacity: 1;
          }
          .treatment-card:hover .treatment-card-cta {
            color: rgba(250, 248, 245, 0.85);
          }
          .treatment-card:hover .treatment-card-line {
            width: 2.5rem;
            background-color: rgba(201, 169, 110, 0.7);
          }
        `}</style>
      </a>
    </div>
  );
}


/* ── Section Component ───────────────────────────────────── */
export default function FeaturedTreatments(): React.ReactElement {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.08);

  return (
    <section
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
            className="font-serif text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-light text-center"
            style={{
              lineHeight: 1.02,
              letterSpacing: "0",
              color: "var(--color-text-heading)",
              marginBottom: "1.75rem",
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
            className="text-[1rem] sm:text-[1.05rem] leading-[1.9] text-center max-w-xl mx-auto"
            style={{ color: "color-mix(in srgb, var(--color-text-body) 78%, var(--color-text-muted) 22%)" }}
          >
            Discover our curated collection of premium treatments —
            each meticulously designed to nurture, restore, and elevate
            your natural beauty.
          </p>
        </div>

        {/* ── Treatment Grid (4-col desktop, 2-col mobile) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full mx-auto">
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
