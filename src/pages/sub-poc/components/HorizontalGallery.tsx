"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import GridContentSection from "./GridContentSection";

const IMAGE_SIZE = 512;
const IMAGE_PADDING = 32;

const HorizontalGallery = ({ items }: { items: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const slotWidth = IMAGE_SIZE + IMAGE_PADDING * 2;
      const startX = window.innerWidth;
      const endX = -Math.max(0, (items.length - 2) * slotWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${startX - endX}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / items.length,
            duration: { min: 0.3, max: 0.5 },
            ease: "power3.inOut",
            delay: 0.05,
          },
        },
      });

      tl.fromTo(
        trackRef.current,
        { x: startX },
        { x: endX, ease: "none", duration: 1 },
      );
      tl.fromTo(
        headlineRef.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, ease: "none", duration: 0.5 },
        "<",
      );

      gsap.from(gridRef.current, {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [items.length] },
  );

  return (
    <div ref={containerRef}>
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <h2
          ref={headlineRef}
          className="absolute inset-x-0 z-10 text-center text-[112px] font-light leading-none tracking-[-2.24px] text-[#1a1a1a] pointer-events-none select-none"
        >
          Workplace safety
          <br />
          improved
        </h2>

        <div ref={trackRef} className="relative flex z-20">
          {items.map((_, i) => (
            <div key={i} className="shrink-0 px-8">
              <img
                src="/nature-green.png"
                alt=""
                className="object-cover"
                style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              />
            </div>
          ))}
        </div>
      </section>

      <section ref={gridRef} className="grid grid-cols-1 min-h-screen">
        <GridContentSection />
      </section>
    </div>
  );
};

export default HorizontalGallery;
