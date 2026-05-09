"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Featured Treatments Section
   • Editorial layout without cards
   • Clean text-left hierarchy
   • Responsive 2x2 grid for perfect balance
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

/* ── Treatment Item ──────────────────────────────────────── */
function TreatmentItem({
  treatment,
  index,
  isVisible,
}: {
  treatment: Treatment;
  index: number;
  isVisible: boolean;
}): React.ReactElement {
  // Add a subtle vertical offset to the second column for an editorial stagger.
  const offsetClass = index % 2 !== 0 ? "md:mt-10 lg:mt-14" : "";

  return (
    <div
      className={offsetClass}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 800ms cubic-bezier(0.25, 0, 0.05, 1) ${150 + index * 100}ms, transform 800ms cubic-bezier(0.25, 0, 0.05, 1) ${150 + index * 100}ms`,
      }}
    >
      <a
        href={treatment.href}
        id={`treatment-item-${index}`}
        className="group block w-full cursor-pointer"
      >
        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative aspect-[6/7] w-full overflow-hidden rounded-[14px] bg-[var(--color-bg-soft)] shadow-[0_20px_60px_rgba(44,26,14,0.06)] transition-shadow duration-700 group-hover:shadow-[0_26px_80px_rgba(44,26,14,0.1)]">
          <Image
            src={treatment.image}
            alt={`${treatment.title} — JUUNÉ Skin Atelier`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 46vw, 540px"
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
          />
          {/* Subtle white overlay gradient for depth */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70 transition-opacity duration-700 group-hover:opacity-85"
            aria-hidden="true"
            style={{
              background: "linear-gradient(180deg, rgba(250, 248, 245, 0.1) 0%, transparent 40%, rgba(44, 26, 14, 0.08) 100%)",
            }}
          />
        </div>

        {/* ── Text Content ──────────────────────────────────── */}
        <div className="flex w-full flex-col items-start border-t border-[rgba(44,26,14,0.07)] pt-5 mt-6">
          <h3
            className="font-serif text-[1.6rem] sm:text-[1.8rem] font-normal leading-[1.05] tracking-normal text-[var(--color-text-heading)] transition-colors duration-300 group-hover:text-[var(--color-accent-dark)]"
          >
            {treatment.title}
          </h3>

          <p
            className="mt-3.5 max-w-[30rem] text-[0.92rem] leading-[1.8] line-clamp-3"
            style={{ color: "color-mix(in srgb, var(--color-text-body) 82%, var(--color-text-muted) 18%)" }}
          >
            {treatment.description}
          </p>

          {/* ── CTA ─────────────────────────────────────────── */}
          <span
            className="mt-5 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors duration-500 ease-out group-hover:text-[var(--color-text-heading)]"
          >
            Learn More
            <span
              className="h-px w-10 bg-[rgba(44,26,14,0.2)] transition-all duration-500 group-hover:w-14 group-hover:bg-[var(--color-accent-dark)]"
              aria-hidden="true"
            />
          </span>
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
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden pt-52 sm:pt-60 lg:pt-72 pb-28 sm:pb-32 lg:pb-40 flex flex-col items-center"
      aria-label="Featured Treatments"
      style={{ backgroundColor: "var(--color-bg-soft)", borderTop: "1px solid var(--color-border-light)" }}
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

      <div className="relative w-full max-w-[1080px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center">
        {/* ── Section Header ──────────────────────────────── */}
        <div
          className="flex flex-col items-center text-center w-full max-w-3xl mx-auto mb-28 lg:mb-36"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0, 0.05, 1), transform 0.8s cubic-bezier(0.25, 0, 0.05, 1)",
          }}
        >
          {/* Eyebrow */}
          <span
            className="inline-block mb-5 text-[0.72rem] font-medium uppercase"
            style={{
              letterSpacing: "var(--tracking-widest)",
              color: "var(--color-accent-dark)",
            }}
          >
            Our Treatments
          </span>

          {/* Heading */}
          <h2
            className="font-serif text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-light mb-7 text-center"
            style={{
              lineHeight: 1.02,
              letterSpacing: "0",
              color: "var(--color-text-heading)",
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

        {/* ── Treatment Grid ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-24 gap-y-16 sm:gap-y-20 lg:gap-y-28 w-full mx-auto">
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
          className="flex justify-center w-full mt-32 lg:mt-40"
          style={{
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
