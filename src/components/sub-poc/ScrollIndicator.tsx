import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".scroll-dot", {
        y: 20,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="absolute left-[16%] bottom-10 w-[32px] h-[48px] rounded-full border-2 border-white flex justify-center pt-2"
    >
      <div className="scroll-dot size-1.5 rounded-full bg-[#00FFA3]" />
    </div>
  );
}
