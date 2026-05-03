"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   JUUNÉ Skin Atelier — Featured Treatments Section (v2)
   • Luxury glassmorphism cards with scroll-triggered reveal
   • Responsive grid: 1 → 2 → 3 columns
   • Full design-system token integration
   • Warm ambient background for true glass depth
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
    image: "/treatment-facial.png",
    href: "#facial-treatment",
  },
  {
    title: "Botox & Filler",
    description:
      "Precision-driven aesthetic enhancements that subtly restore volume, smooth fine lines, and preserve your natural expression.",
    image: "/treatment-botox.png",
    href: "#botox-filler",
  },
  {
    title: "Acne Treatment",
    description:
      "Advanced clinical protocols targeting breakouts at their source — clearing, calming, and preventing future imperfections.",
    image: "/treatment-acne.png",
    href: "#acne-treatment",
  },
  {
    title: "Skin Rejuvenation",
    description:
      "Next-generation therapies that stimulate collagen renewal, restore elasticity, and unveil a visibly younger complexion.",
    image: "/treatment-rejuvenation.png",
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

/* ── Treatment Card ──────────────────────────────────────── */
function TreatmentCard({
  treatment,
  index,
  isVisible,
}: {
  treatment: Treatment;
  index: number;
  isVisible: boolean;
}): React.ReactElement {
  return (
    <a
      href={treatment.href}
      id={`treatment-card-${index}`}
      className="group relative flex flex-col rounded-2xl p-6 cursor-pointer"
      style={{
        background: "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(20px) saturate(1.15)",
        WebkitBackdropFilter: "blur(20px) saturate(1.15)",
        border: "1px solid var(--color-border-light)",
        boxShadow: "var(--shadow-xs)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.25, 0, 0.05, 1) ${150 + index * 130}ms, 
                     transform 0.7s cubic-bezier(0.25, 0, 0.05, 1) ${150 + index * 130}ms, 
                     box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                     border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = isVisible ? "translateY(0)" : "translateY(24px)";
        e.currentTarget.style.boxShadow = "var(--shadow-xs)";
        e.currentTarget.style.borderColor = "var(--color-border-light)";
      }}
    >
      {/* ── Image ─────────────────────────────────────────── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl mb-6">
        <Image
          src={treatment.image}
          alt={`${treatment.title} — JUUNÉ Skin Atelier`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0,0.05,1)] group-hover:scale-[1.04]"
        />
        {/* Subtle warm gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to top, rgba(44, 26, 14, 0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* ── Text Content ──────────────────────────────────── */}
      <div className="flex flex-col flex-1 gap-3 px-0.5">
        <h3
          className="font-serif text-xl font-normal leading-snug tracking-[-0.01em]"
          style={{ color: "var(--color-text-heading)" }}
        >
          {treatment.title}
        </h3>

        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {treatment.description}
        </p>

        {/* ── CTA ─────────────────────────────────────────── */}
        <span
          className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-400"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="group-hover:text-[var(--color-accent-dark)] transition-colors duration-400">
            Learn More
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="transition-all duration-400 ease-[cubic-bezier(0.25,0,0.05,1)] group-hover:translate-x-1 group-hover:text-[var(--color-accent-dark)]"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ── Section Component ───────────────────────────────────── */
export default function FeaturedTreatments(): React.ReactElement {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.08);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      aria-label="Featured Treatments"
      style={{
        backgroundColor: "var(--color-bg-base)",
        paddingTop: "var(--space-32)",
        paddingBottom: "var(--space-24)",
        borderTop: "1px solid var(--color-border-light)",
      }}
    >
      {/* ── Top gradient blend — seamless transition from Trust ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          height: "120px",
          background: "linear-gradient(180deg, var(--color-bg-soft) 0%, transparent 100%)",
        }}
      />

      {/* ── Ambient background — warm radials for glass depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          background: `
            radial-gradient(ellipse 55% 45% at 15% 55%, var(--color-bg-muted) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 85% 35%, var(--color-primary-light) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 50% 80%, rgba(232, 217, 200, 0.35) 0%, transparent 70%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Section Header ──────────────────────────────── */}
        <div
          className="text-center mx-auto mb-16"
          style={{
            maxWidth: "480px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0, 0.05, 1), transform 0.8s cubic-bezier(0.25, 0, 0.05, 1)",
          }}
        >
          {/* Eyebrow */}
          <span
            className="inline-block mb-5 text-xs font-medium uppercase"
            style={{
              letterSpacing: "var(--tracking-widest)",
              color: "var(--color-text-muted)",
            }}
          >
            Our Treatments
          </span>

          {/* Gold divider */}
          <hr
            className="mx-auto mb-7 border-none"
            style={{
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--color-accent)",
            }}
          />

          {/* Heading */}
          <h2
            className="font-serif font-light mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
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
            className="text-[0.95rem] leading-7 mx-auto"
            style={{
              color: "var(--color-text-muted)",
              maxWidth: "400px",
            }}
          >
            Discover our curated collection of premium treatments —
            each meticulously designed to nurture, restore, and elevate
            your natural beauty.
          </p>
        </div>

        {/* ── Treatment Cards Grid ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TREATMENTS.slice(0, 3).map((treatment, index) => (
            <TreatmentCard
              key={treatment.title}
              treatment={treatment}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* ── Second Row — Centered Single Card ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
          <div className="hidden lg:block" />
          <TreatmentCard
            treatment={TREATMENTS[3]}
            index={3}
            isVisible={isVisible}
          />
          <div className="hidden lg:block" />
        </div>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <div
          className="text-center mt-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s cubic-bezier(0.25, 0, 0.05, 1) 750ms, transform 0.7s cubic-bezier(0.25, 0, 0.05, 1) 750ms",
          }}
        >
          <a
            href="#treatments"
            id="treatments-view-all"
            className="btn-secondary inline-flex items-center gap-2.5"
            style={{
              padding: "0.9rem 2.25rem",
              fontSize: "var(--text-sm)",
            }}
          >
            View All Treatments
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-400 ease-[cubic-bezier(0.25,0,0.05,1)]"
              style={{ marginLeft: "2px" }}
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
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
