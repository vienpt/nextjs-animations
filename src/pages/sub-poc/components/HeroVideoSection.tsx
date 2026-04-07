"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const targetTimeRef = useRef(0);
  const rafIdRef = useRef(0);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const EASE_FACTOR = 0.2; // move 20% of the remaining distance per frame

      // rAF loop: smoothly interpolate video.currentTime → targetTime
      const tick = () => {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          video.currentTime += diff * EASE_FACTOR;
        }
        rafIdRef.current = requestAnimationFrame(tick);
      };
      rafIdRef.current = requestAnimationFrame(tick);

      // ScrollTrigger drives targetTime: 0 -> 1
      // scroll position (px)          progress        video time (for a 10s video)
      // ─────────────────────────────────────────────────────────────────────────
      // start (top top)               0.0             0.0s
      // +125px                        0.25            2.5s
      // +250px                        0.5             5.0s
      // +375px                        0.75            7.5s
      // +500px (end)                  1.0             10.0s

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000", // 2000px of scroll = full video
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            targetTimeRef.current = self.progress * video.duration;
          }
        },
      });

      // Cleanup rAF when useGSAP context reverts
      return () => cancelAnimationFrame(rafIdRef.current);
    },
    { scope: sectionRef }, // scopes all selectors to this ref
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#070e1d]"
    >
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
      <div className="relative z-10 flex items-start pt-50 pl-[274px] gap-6">
        {/* Teal vertical accent line */}
        <div className="w-0.5 h-40 bg-[#00FFA3]" />
        <div>
          <h1 className="text-white text-[112px] font-light leading-none tracking-[-2.24px]">
            Delivering sustainability.
            <br />
            Driving growth.
          </h1>
          <p className="text-white/80 text-[20px] leading-[1.36] tracking-[-0.2px] mt-10 max-w-2xl">
            Darling Ingredients experienced a year of strong momentum in
            sustainability performance. We continued to advance our goals,
            demonstrating sustainability is core to who we are and what we do.
          </p>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}
