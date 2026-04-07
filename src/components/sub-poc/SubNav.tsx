'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = ['Impact', 'Process', 'Stories', 'Disclosures'];

export default function SubNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const HEADER_HEIGHT = 97;

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const navHeight = nav.offsetHeight;
      const heroHeight = window.innerHeight;

      // Initial position: fixed at bottom
      gsap.set(nav, {
        position: 'fixed',
        bottom: 0,
        top: 'auto',
        y: 0,
        zIndex: 40,
      });

      // Phase 1 — slide up while scrolling through hero (0% → 80%)
      ScrollTrigger.create({
        start: 0,
        end: heroHeight * 0.8,
        scrub: 0.3,
        onUpdate: (self) => {
          // travel distance = from bottom-0 to HEADER_HEIGHT from top
          const totalTravel = heroHeight - navHeight - HEADER_HEIGHT;
          gsap.set(nav, {
            y: -(totalTravel * self.progress),
          });
        },
      });

      // Phase 2 — snap to sticky at 80% of hero
      ScrollTrigger.create({
        start: heroHeight * 0.8,
        onEnter: () => {
          gsap.set(nav, {
            position: 'fixed',
            top: HEADER_HEIGHT,
            bottom: 'auto',
            y: 0,
          });
        },
        onLeaveBack: () => {
          gsap.set(nav, {
            position: 'fixed',
            bottom: 0,
            top: 'auto',
          });
        },
      });
    },
    { scope: navRef }
  );

  return (
    <div ref={navRef} className="w-full bg-[#00FFA3] px-8 py-4 flex items-center justify-between">
      <span className="font-bold text-black text-xl">Sustainability</span>
      <nav className="flex gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-black text-sm font-medium hover:opacity-70 transition-opacity"
          >
            {item}
          </a>
        ))}
      </nav>
      <a href="/report" className="flex items-center gap-2 text-black text-sm font-semibold">
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
