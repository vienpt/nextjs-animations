"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MainNav() {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const heroHeight = window.innerHeight;
      const heroPinScroll = 500; // matches HeroVideoSection end: "+=500"
      const heroEnd = heroHeight + heroPinScroll;

      // Hide MainNav when SubNav slide-up completes
      ScrollTrigger.create({
        start: heroEnd,
        onEnter: () => {
          gsap.to(nav, {
            y: "-100%",
            duration: 0.3,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          gsap.to(nav, {
            y: "0%",
            duration: 0.3,
            ease: "power2.inOut",
          });
        },
      });
    },
    { scope: navRef },
  );

  return (
    <div
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 bg-[#070e1d] px-16 py-6 flex items-center justify-between"
    >
      <span className="text-white text-xl font-bold tracking-wide">
        DARLING
      </span>
      {/* <nav className="flex gap-8">
        {["About", "Sustainability", "Investors", "Careers"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white/80 text-sm font-medium hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav> */}
    </div>
  );
}
