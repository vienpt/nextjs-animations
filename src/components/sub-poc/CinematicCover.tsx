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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 90%",
          scrub: true,
        },
      });

      tl.fromTo(
        `.${sectionId}-image`,
        { clipPath: "inset(64px)" }, // apply for respecting px-16 for each section
        { clipPath: "inset(0px)", scale: 1.1, ease: "none", duration: 1 },
        0,
      );

      tl.fromTo(
        `.${sectionId}-headline`,
        { y: 0, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: "none", duration: 1 },
        0,
      );

      // Static vertical line: set top position based on actual headline bottom + mt-16
      const sectionTop = sectionRef.current!.getBoundingClientRect().top;
      const headlineBottom =
        headlineRef.current!.getBoundingClientRect().bottom;
      const lineTop = headlineBottom - sectionTop + 64; // 64px = mt-16
      gsap.set(`.${sectionId}-line`, { top: lineTop });

      tl.fromTo(
        `.${sectionId}-line`,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: "none", duration: 1 },
        0,
      );
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

      {/* Headline — centered */}
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
