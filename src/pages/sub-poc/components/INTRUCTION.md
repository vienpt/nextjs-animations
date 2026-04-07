## Old code

```tsx
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

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
      // Animate the whole page background so the transition affects everything above and below.
      gsap.fromTo(
        document.body,
        { backgroundColor: "#dfe5f1" },
        {
          backgroundColor: "#e5fff6",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "40% bottom",
            end: "top top",
            scrub: true,
          },
        },
      );

      // Grid section headline: scale down to 80% and fade to gray as this section enters
      const gridHeadline = document.querySelector(".grid-section-headline");
      if (gridHeadline) {
        gsap.to(gridHeadline, {
          scale: 0.8,
          color: "#aaaaaa",
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top top",
            scrub: 1,
          },
        });
      }

      // ParallaxCover headline: fades in as section scrolls into view
      gsap.fromTo(
        ".parallax-headline",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        },
      );

      // ParallaxCover headline: fades out as section exits.
      // immediateRender: false defers FROM-state capture until the tween first plays,
      // so GSAP reads autoAlpha: 1 (set by the fade-in above) rather than the initial 0.
      // This also makes backward scrolling work correctly — the tween reverses to autoAlpha: 1.
      gsap.to(".parallax-headline", {
        scale: 0.6,
        autoAlpha: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 40%",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hard-reset the headline whenever the section fully exits the viewport in either
      // direction. Guards against fast scrolling where scrub lag leaves it mid-animation.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () =>
          gsap.set(headlineRef.current, { autoAlpha: 0, clearProps: "scale" }),
        onLeaveBack: () =>
          gsap.set(headlineRef.current, { autoAlpha: 0, clearProps: "scale" }),
      });

      // Images: purely decorative parallax layers — scroll upward and fully exit,
      // reverse back on scroll up. Independent of headline tweens (different targets).
      // tr at top-1/2 needs -(50vh + 256px) to clear top edge over the full scroll range.
      // bl at bottom-0 needs -(100vh + 256px) to clear top edge over the full scroll range.
      // top-right exits first — completes before bottom-left so it clears the viewport sooner.
      gsap.to(".parallax-img-tr", {
        y: () => -(window.innerHeight * 0.5 + 256),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "75% top",
          scrub: true,
        },
      });

      // bottom-left exits after top-right — finishes at the full scroll end point.
      gsap.to(".parallax-img-bl", {
        y: () => -(window.innerHeight + 256),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
```
