import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  ease?: string;
  /** ScrollTrigger start value, e.g. 'top 80%' */
  triggerStart?: string;
}

export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  options: CountUpOptions,
  deps: React.DependencyList = []
) {
  const elRef = useRef<T>(null);
  const {
    from = 0,
    to,
    duration = 1.8,
    decimals = 0,
    suffix = '',
    prefix = '',
    ease = 'power2.out',
    triggerStart = 'top 80%',
  } = options;

  useGSAP(
    () => {
      if (!elRef.current) return;
      const obj = { val: from };

      ScrollTrigger.create({
        trigger: elRef.current,
        start: triggerStart,
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: to,
            duration,
            ease,
            onUpdate: () => {
              if (elRef.current) {
                elRef.current.textContent = prefix + obj.val.toFixed(decimals) + suffix;
              }
            },
          });
        },
      });
    },
    { dependencies: [to, ...deps], revertOnUpdate: true }
  );

  return elRef;
}
