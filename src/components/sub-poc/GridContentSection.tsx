"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function GridContentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ─── Top row: left text + right image enter together ────────────────
      const topTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
          fastScrollEnd: true,
        },
      });

      topTl
        .from(
          [
            ".grid-section-icon",
            ".grid-section-headline",
            ".grid-section-body",
          ],
          { y: 40, autoAlpha: 0, stagger: 0.1, ease: "none", duration: 0.5 },
          0,
        )
        .from(
          ".grid-section-aerial",
          { x: 60, autoAlpha: 0, ease: "none", duration: 0.5 },
          0,
        );

      // ─── Bottom row: industrial image + stat enter together ─────────────
      const bottomTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-section-bottom",
          start: "top 80%",
          end: "top 40%",
          scrub: true,
          fastScrollEnd: true,
        },
      });

      bottomTl.from([".grid-section-industrial", ".grid-section-stat"], {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        ease: "none",
        duration: 0.5,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent px-16 py-24"
      id="grid-content-section"
    >
      {/* Top 2-col grid */}
      <div className="grid grid-cols-2 gap-8 mb-12 items-start">
        {/* Left: icon + heading + body */}
        <div className="flex flex-col">
          {/* Water cycle icon */}
          <div className="grid-section-icon mb-8 w-16 h-16">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                fill="none"
              />
              {/* water drop */}
              <path
                d="M32 20 C32 20 24 28 24 34 C24 38.4 27.6 42 32 42 C36.4 42 40 38.4 40 34 C40 28 32 20 32 20Z"
                stroke="#1a73e8"
                strokeWidth="1.5"
                fill="none"
              />
              {/* arrow top */}
              <path
                d="M44 16 L47 12 L44 8"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* arrow bottom */}
              <path
                d="M20 48 L17 52 L20 56"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="grid-section-headline text-[64px] font-light leading-tight tracking-[-1.28px] text-[#1a1a1a] mb-16">
            Lead with the
            <br />
            outcome
          </h2>

          <p className="grid-section-body text-[18px] text-[#444] leading-relaxed max-w-[420px] mt-auto">
            Our rendering process recovers more water than it consumes. In 2024,
            we returned more than 11 billion gallons to the environment —
            treated and clean — making us net water-positive across our core
            operations.
          </p>
        </div>

        {/* Right: aerial nature photo */}
        <div className="grid-section-aerial h-[520px] overflow-hidden bg-[#c8d8cc]">
          <img
            src="/nature-green.png"
            className="w-full h-full object-cover"
            alt="Aerial view of forest and water"
          />
        </div>
      </div>

      {/* Bottom 2-col grid */}
      <div className="grid-section-bottom grid grid-cols-2 gap-8 items-center">
        {/* Industrial photo */}
        <div className="grid-section-industrial h-[360px] overflow-hidden bg-[#b0b8c0]">
          <img
            src="/nature-green.png"
            className="w-full h-full object-cover object-bottom"
            alt="Industrial processing facility"
          />
        </div>

        {/* 11bn stat with L-bracket */}
        <div className="grid-section-stat flex items-start gap-6 pl-8">
          {/* L-bracket */}
          <div
            className="relative flex-shrink-0"
            style={{ width: 4, height: 180 }}
          >
            <div className="absolute top-0 left-0 w-[4px] h-full bg-[#2563eb]" />
            <div className="absolute bottom-0 left-0 w-10 h-[4px] bg-[#2563eb]" />
          </div>

          <div>
            <div className="text-[120px] font-light leading-none tracking-[-3px] text-[#999]">
              11bn
            </div>
            <div className="text-[18px] text-[#666] mt-2 leading-snug">
              Gallons of
              <br />
              water
              <br />
              annually
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
