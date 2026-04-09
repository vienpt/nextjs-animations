"use client";
import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_SECTIONS = [
  { label: "Impact", sectionId: "cinematic-cover-1" },
  { label: "Process", sectionId: "grid-content-section" },
  { label: "Stories", sectionId: "parallax-cover" },
  { label: "Disclosures", sectionId: "cinematic-cover-2" },
];

export default function SubNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  // ─── Slide underline to the active link ───────────────────────────────
  const showUnderline = useCallback((sectionId: string) => {
    const link = linkRefs.current[sectionId];
    const nav = navRef.current;
    const underline = underlineRef.current;
    if (!link || !nav || !underline) return;

    const navLeft = nav.getBoundingClientRect().left;
    const linkRect = link.getBoundingClientRect();

    gsap.to(underline, {
      x: linkRect.left - navLeft,
      width: linkRect.width,
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const hideUnderline = useCallback(() => {
    gsap.to(underlineRef.current, { autoAlpha: 0, duration: 0.3 });
  }, []);

  // ─── Activate a section (state + underline) ──────────────────────────
  const activate = useCallback(
    (sectionId: string) => {
      setActiveId(sectionId);
      showUnderline(sectionId);
    },
    [showUnderline],
  );

  const deactivate = useCallback(() => {
    setActiveId(null);
    hideUnderline();
  }, [hideUnderline]);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      // ─── Active section tracking ──────────────────────────────────────
      NAV_SECTIONS.forEach(({ sectionId }, i) => {
        const target = document.getElementById(sectionId);
        if (!target) return;

        ScrollTrigger.create({
          trigger: target,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => activate(sectionId),
          onEnterBack: () => activate(sectionId),
          ...(i === 0 && { onLeaveBack: deactivate }),
        });
      });
    },
    { scope: navRef },
  );

  return (
    <div
      ref={navRef}
      className="w-full bg-white px-16 py-6 flex items-center justify-between"
    >
      <span className="font-bold text-black text-xl">Sustainability</span>

      <nav className="flex gap-8">
        {NAV_SECTIONS.map(({ label, sectionId }) => (
          <a
            key={sectionId}
            ref={(el) => {
              linkRefs.current[sectionId] = el;
            }}
            href={`#${sectionId}`}
            className={`text-sm font-medium transition-opacity hover:opacity-70 ${
              activeId === sectionId ? "text-black" : "text-black/60"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Sliding underline — positioned under active link */}
      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-0.5 bg-blue-600 opacity-0"
      />

      <a
        href="/report"
        className="flex items-center gap-2 text-black text-sm font-semibold"
      >
        Download Report
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v9M4 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </div>
  );
}
