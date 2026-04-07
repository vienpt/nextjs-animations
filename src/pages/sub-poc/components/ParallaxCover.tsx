"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxCoverProps {
  headline: string;
  topRightImage?: string;
  bottomLeftImage?: string;
}

export default function ParallaxCover({
  headline,
  topRightImage,
  bottomLeftImage,
}: ParallaxCoverProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current!;

      // ─── 1. Background color transition ──────────────────────────────────
      // Runs as the section enters the viewport from the bottom
      const bgTl = gsap.timeline({
        id: "parallax-bg",
        scrollTrigger: {
          trigger: section,
          start: "40% bottom",
          end: "top top",
          scrub: true,
        },
      });

      bgTl.fromTo(
        document.body,
        { backgroundColor: "#dfe5f1" },
        { backgroundColor: "#e5fff6", ease: "none" },
      );

      // ─── 2. Headline: fade in → visible → fade out + scale down ──────────
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom top",
          scrub: true,
          fastScrollEnd: true,
        },
      });

      headlineTl
        // fade in (first 20% of scroll)
        .fromTo(
          headlineRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "none", duration: 0.2 },
        )
        // hold visible (middle 50%)
        .to(headlineRef.current, { duration: 0.5 })
        // fade out + scale down (last 30%)
        .to(headlineRef.current, {
          autoAlpha: 0,
          scale: 0.6,
          ease: "none",
          duration: 0.3,
        });

      // ─── 3. Image parallax ────────────────────────────────────────────────
      if (topRightImage || bottomLeftImage) {
        const imgTl = gsap.timeline({
          id: "parallax-images",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        if (topRightImage) {
          imgTl.to(
            ".parallax-img-tr",
            {
              y: () => -(window.innerHeight + 256),
              ease: "none",
            },
            0,
          );
        }

        if (bottomLeftImage) {
          imgTl.to(
            ".parallax-img-bl",
            {
              y: () => -(window.innerHeight + 256),
              ease: "none",
            },
            0,
          );
        }
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 h-screen mb-56 flex items-center justify-center bg-transparent z-0"
      id="parallax-cover"
    >
      {/* Top-right image */}
      {topRightImage && (
        <div className="parallax-img-tr absolute top-1/2 -translate-y-1/2 right-0 w-52 h-52 overflow-hidden z-10">
          <img
            src={topRightImage}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}

      <div className="relative z-10 text-center px-16">
        <h2
          ref={headlineRef}
          className="parallax-headline text-[112px] font-light leading-none tracking-[-2.24px] text-[#1a1a1a]"
        >
          {headline}
        </h2>
      </div>

      {/* Bottom-left image */}
      {bottomLeftImage && (
        <div className="parallax-img-bl absolute bottom-0 left-0 w-52 h-52 overflow-hidden z-0">
          <img
            src={bottomLeftImage}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}
    </section>
  );
}
