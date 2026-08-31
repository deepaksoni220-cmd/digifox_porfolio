import React, { useEffect, useRef, useMemo, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  scrollTriggerStart?: string;
  scrollTriggerEnd?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 3,
  blurStrength = 6,
  containerClassName = '',
  textClassName = '',
  scrollTriggerStart = 'top 85%',
  scrollTriggerEnd = 'bottom 40%',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll<HTMLElement>('.word');
      if (wordElements.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollTriggerStart,
          end: scrollTriggerEnd,
          scrub: 0.8,
        }
      });

      if (baseRotation) {
        tl.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          { ease: 'none', rotate: 0, duration: 1 },
          0
        );
      }

      const totalWords = wordElements.length;
      wordElements.forEach((word, index) => {
        // Spread each word evenly across the scroll duration for discrete word-by-word reveal
        const wordStart = (index / totalWords) * 0.82;
        const wordDuration = 0.22;

        tl.fromTo(
          word,
          {
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            y: 4,
            willChange: 'opacity, filter, transform'
          },
          {
            opacity: 1,
            filter: enableBlur ? 'blur(0px)' : 'none',
            y: 0,
            ease: 'power2.out',
            duration: wordDuration,
          },
          wordStart
        );
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, scrollTriggerStart, scrollTriggerEnd, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.3] font-semibold ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
