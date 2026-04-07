"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useCountUp from "@/hooks/useCountUp";

const IMAGES = [
  { src: "/images/safety-1.jpg", initialX: -80 },
  { src: "/images/safety-2.jpg", initialX: 0 },
  { src: "/images/safety-3.jpg", initialX: 60 },
];

export default function SafetySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Count-up: "11bn"
  const kpiRef = useCountUp<HTMLSpanElement>({
    from: 0,
    to: 11,
    duration: 2.2,
    suffix: "bn",
    ease: "power3.out",
    triggerStart: "top 70%",
  });

  // Count-up: secondary stat e.g. "95%"
  const statRef = useCountUp<HTMLSpanElement>({
    from: 0,
    to: 95,
    duration: 1.8,
    suffix: "%",
    ease: "power2.out",
    triggerStart: "top 70%",
  });

  useGSAP(
    () => {
      // Set initial state for images
      gsap.set(".safety-image", { opacity: 0, x: (i) => IMAGES[i].initialX });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.to(".safety-image", {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
          });
        },
      });

      // Headline slides in from left
      gsap.from(".safety-headline", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#00FFA3] min-h-screen px-16 py-24"
      id="process"
    >
      <h2 className="safety-headline text-[112px] font-light text-black tracking-[-2.24px] mb-16">
        Workplace safety
        <br />
        improvement
      </h2>

      <div className="flex gap-6 items-end">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="safety-image flex-1 overflow-hidden rounded-sm"
            style={{ aspectRatio: "3/4" }}
          >
            <img src={img.src} className="w-full h-full object-cover" alt="" />
          </div>
        ))}

        {/* KPI block — bottom anchored */}
        <div className="self-end pb-2 ml-8">
          <span
            ref={kpiRef}
            className="text-[200px] font-light text-black tracking-[-4px] leading-none block"
          >
            0bn
          </span>
          <p className="text-black/70 text-[20px]">lbs of material reclaimed</p>
          <div className="mt-6">
            <span
              ref={statRef}
              className="text-[64px] font-light text-black tracking-[-1px]"
            >
              0%
            </span>
            <p className="text-black/70 text-base">safety improvement rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
