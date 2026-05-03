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
  // Add a subtle vertical offset to the second column for an editorial stagger
  const offsetClass = index % 2 !== 0 ? "md:mt-16 lg:mt-24" : "";

  return (
    <div
      className={offsetClass}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 800ms ease-[0.25,0,0.05,1] ${150 + index * 100}ms, transform 800ms ease-[0.25,0,0.05,1] ${150 + index * 100}ms`,
      }}
    >
      <a
        href={treatment.href}
        id={`treatment-item-${index}`}
        className="group block w-full cursor-pointer"
      >
        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
          <Image
            src={treatment.image}
            alt={`${treatment.title} — JUUNÉ Skin Atelier`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Subtle white overlay gradient for depth */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            aria-hidden="true"
            style={{
              background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* ── Text Content ──────────────────────────────────── */}
        <div className="flex flex-col items-start w-full mt-7">
          <h3
            className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-neutral-800 transition-colors duration-300 group-hover:text-neutral-900"
          >
            {treatment.title}
          </h3>

          <p
            className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-3 max-w-[92%]"
          >
            {treatment.description}
          </p>

          {/* ── CTA ─────────────────────────────────────────── */}
          <span
            className="mt-5 inline-block text-xs uppercase tracking-widest text-neutral-400 transition-all duration-500 ease-out group-hover:text-neutral-800 group-hover:underline underline-offset-[8px] decoration-[0.5px]"
          >
            Learn More
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
      className="relative overflow-hidden py-24 flex flex-col items-center"
      aria-label="Featured Treatments"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* ── Ambient background — warm radials for glass depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.6,
          background: `
            radial-gradient(ellipse 60% 50% at 20% 40%, var(--color-bg-muted) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 60%, var(--color-primary-light) 0%, transparent 65%)
          `,
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* ── Section Header ──────────────────────────────── */}
        <div
          className="flex flex-col items-center text-center w-full max-w-2xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0, 0.05, 1), transform 0.8s cubic-bezier(0.25, 0, 0.05, 1)",
          }}
        >
          {/* Eyebrow */}
          <span
            className="inline-block mb-4 text-[0.75rem] font-medium uppercase"
            style={{
              letterSpacing: "var(--tracking-widest)",
              color: "var(--color-text-muted)",
            }}
          >
            Our Treatments
          </span>

          {/* Heading */}
          <h2
            className="font-serif font-light mb-6 text-center"
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
            className="text-base leading-[1.8] text-center max-w-md mx-auto"
            style={{ color: "var(--color-text-muted)" }}
          >
            Discover our curated collection of premium treatments —
            each meticulously designed to nurture, restore, and elevate
            your natural beauty.
          </p>
        </div>

        {/* ── Treatment Grid ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24 w-full mx-auto">
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
          className="flex justify-center w-full mt-24"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s cubic-bezier(0.25, 0, 0.05, 1) 600ms, transform 0.7s cubic-bezier(0.25, 0, 0.05, 1) 600ms",
          }}
        >
          <a
            href="#treatments"
            id="treatments-view-all"
            className="btn-secondary inline-flex items-center justify-center gap-3 uppercase text-center"
            style={{
              padding: "0.85rem 2.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.15em"
            }}
          >
            View All Treatments
          </a>
        </div>
      </div>
    </section>
  );
}
