"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import clsx from "clsx";

export default function CinematicCover({
  sectionId = "cinematic-cover",
}: {
  sectionId: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;
      const headline = headlineRef.current!;
      const imageSelector = `.${sectionId}-image`;
      const headlineSelector = `.${sectionId}-headline`;
      const lineSelector = `.${sectionId}-line`;

      // ─── Vertical line: position from headline bottom + mt-16 to section bottom ──
      const sectionTop = section.getBoundingClientRect().top;
      const headlineBottom = headline.getBoundingClientRect().bottom;
      gsap.set(lineSelector, { top: headlineBottom - sectionTop + 64 });

      // ─── Phase 1 — Entry ─────────────────────────────────────────────────
      // Starts when section is 40% from viewport bottom,
      // completes when section reaches viewport top.
      // Image expands from px-16 inset to full bleed,
      // headline + line fade in simultaneously.
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          end: "top top",
          scrub: true,
        },
      });

      entryTl
        .fromTo(
          imageSelector,
          { clipPath: "inset(64px)" },
          { clipPath: "inset(0px)", ease: "none", duration: 1 },
          0,
        )
        .fromTo(
          headlineSelector,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", duration: 1 },
          0,
        )
        .fromTo(
          lineSelector,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", duration: 1 },
          0,
        );

      // ─── Phase 2 — Exit ──────────────────────────────────────────────────
      // Image scales up from bottom edge as section scrolls out of viewport.
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      exitTl.to(`${imageSelector} img`, {
        scale: 1.15,
        transformOrigin: "center top",
        ease: "none",
        duration: 1,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 h-screen flex items-center justify-center overflow-hidden"
      id={sectionId}
    >
      {/* Background image */}
      <div
        className={clsx(
          `${sectionId}-image`,
          "image absolute inset-0 overflow-hidden",
        )}
      >
        <img
          src="/nature-green.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* Headline */}
      <div className="relative z-10 text-center px-16">
        <h2
          ref={headlineRef}
          className={clsx(
            `${sectionId}-headline`,
            "text-[112px] font-light leading-none tracking-[-2.24px] text-white opacity-0",
          )}
        >
          world&apos;s animal
          <br />
          by-products
          <br />
          processed
        </h2>
      </div>

      {/* Vertical center line */}
      <div
        className={clsx(
          `${sectionId}-line`,
          "absolute left-1/2 -translate-x-1/2 bottom-2 w-px bg-white z-10 opacity-0",
        )}
      />
    </section>
  );
}
