import React, { useEffect, useRef, useState } from 'react';
import { Media } from '../components/Media';

import siteData from '../data.json';

const IMAGES = siteData.marquee;

const ROW_1_IMAGES = IMAGES.slice(0, 11);
const ROW_2_IMAGES = IMAGES.slice(11, 21);

// Tripled arrays for seamless effect
const ROW_1_TRIPLED = [...ROW_1_IMAGES, ...ROW_1_IMAGES, ...ROW_1_IMAGES];
const ROW_2_TRIPLED = [...ROW_2_IMAGES, ...ROW_2_IMAGES, ...ROW_2_IMAGES];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      // Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize offset
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[var(--bg-base)] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-2 sm:gap-3"
    >
      {/* Row 1 */}
      <div 
        className="flex gap-2 sm:gap-3 will-change-transform whitespace-nowrap"
        style={{ transform: `translateX(${scrollOffset - 200}px)` }}
      >
        {ROW_1_TRIPLED.map((src, idx) => (
          <div
            key={`r1-${idx}`}
            className="marquee-item shrink-0 w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] bg-[var(--bg-surface-elevated)] rounded-xl overflow-hidden"
          >
            <Media
              src={src}
              alt={`Marquee row 1 item ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div 
        className="flex gap-2 sm:gap-3 will-change-transform whitespace-nowrap"
        style={{ transform: `translateX(${-(scrollOffset - 200)}px)` }}
      >
        {ROW_2_TRIPLED.map((src, idx) => (
          <div
            key={`r2-${idx}`}
            className="marquee-item shrink-0 w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] bg-[var(--bg-surface-elevated)] rounded-xl overflow-hidden"
          >
            <Media
              src={src}
              alt={`Marquee row 2 item ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
