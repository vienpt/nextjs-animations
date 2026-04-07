"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    num: "01",
    title: "Circular Economy",
    tags: ["ESG", "Circular", "Zero Waste"],
    stats: [
      { value: 95, suffix: "%", label: "Recovery rate" },
      { value: 2.1, suffix: "M", label: "Tons diverted", decimals: 1 },
    ],
  },
  {
    num: "02",
    title: "Carbon Reduction",
    tags: ["Carbon", "Climate"],
    stats: [
      { value: 40, suffix: "%", label: "Emissions reduced" },
      { value: 2030, suffix: "", label: "Carbon neutral target", decimals: 0 },
    ],
  },
  {
    num: "03",
    title: "Water Stewardship",
    tags: ["Water", "ESG"],
    stats: [
      { value: 30, suffix: "%", label: "Water reused" },
      { value: 150, suffix: "M", label: "Gallons saved" },
    ],
  },
];

// Individual item — has its own useGSAP scope
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof ITEMS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  // Track whether count-up has fired (only once per open)
  const hasCountedRef = useRef(false);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const icon = iconRef.current;
      if (!panel || !icon) return;

      if (isOpen) {
        // Measure natural height
        gsap.set(panel, { display: "block", height: "auto", opacity: 1 });
        const height = panel.offsetHeight;
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          { height, opacity: 1, duration: 0.45, ease: "power2.out" },
        );
        // Icon: + → rotate 45° (becomes ×)
        gsap.to(icon, { rotation: 45, duration: 0.3, ease: "back.out(2)" });

        // Count-up stats (only first time panel opens)
        if (!hasCountedRef.current) {
          hasCountedRef.current = true;
          item.stats.forEach((stat, i) => {
            const el = itemRef.current?.querySelector<HTMLSpanElement>(
              `.stat-num-${i}`,
            );
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 1.6,
              delay: 0.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent =
                  obj.val.toFixed(stat.decimals ?? 0) + stat.suffix;
              },
            });
          });
        }
      } else {
        // Collapse
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      }
    },
    { scope: itemRef, dependencies: [isOpen] },
  );

  return (
    <div ref={itemRef} className="border-b border-black/20 py-6">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6">
          <span className="text-sm text-black/40 tabular-nums">{item.num}</span>
          <span className="text-2xl font-light tracking-tight">
            {item.title}
          </span>
        </div>
        <span
          ref={iconRef}
          className="text-3xl font-light inline-block origin-center select-none"
          aria-hidden
        >
          +
        </span>
      </button>

      {/* Expandable panel */}
      <div
        ref={panelRef}
        style={{ height: 0, overflow: "hidden", display: "none" }}
      >
        {/* Tag pills */}
        <div className="flex gap-2 flex-wrap pt-4 pb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-black/30 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Count-up stats */}
        <div className="flex gap-12 pt-6 pb-2">
          {item.stats.map((stat, i) => (
            <div key={i}>
              <span
                className={`stat-num-${i} text-[64px] font-light tracking-[-1px] leading-none block`}
              >
                0{stat.suffix}
              </span>
              <p className="text-sm text-black/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccordionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      // Stagger accordion items on scroll into view
      gsap.from(".accordion-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="px-16 py-24 bg-white" id="disclosures">
      <h2 className="text-[112px] font-light tracking-[-2.24px] mb-16">
        Impact
      </h2>
      {ITEMS.map((item, i) => (
        <div key={i} className="accordion-item">
          <AccordionItem
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        </div>
      ))}
    </section>
  );
}
