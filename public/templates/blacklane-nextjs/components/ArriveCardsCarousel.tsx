'use client';

import { useRef, useState, useEffect } from 'react';

const CARDS = [
  {
    tag: 'Airport transfers',
    title: 'Smooth landings, every time.',
    desc: 'Delayed flight? Chauffeurs track arrivals and adjust accordingly. Plus, you have 1 hour of complimentary wait time just in case.',
    image: '/assets/_next/static/media/1.879377e626f27fdd.webp',
    alt: 'Airport transfers',
  },
  {
    tag: 'Hourly and full day hire',
    title: 'Seize the day.',
    desc: 'Reserve a dedicated chauffeur from 2 to 24 hours. They\'ll be on standby as long as you need them.',
    image: '/assets/_next/static/media/2.9ae17562d88c590d.webp',
    alt: 'Hourly and full day hire',
  },
  {
    tag: 'City-to-city',
    title: 'Between cities, done better.',
    desc: 'Turn long-distance journeys into time well spent. Arrive refreshed, not stressed.',
    image: '/assets/_next/static/media/3.a05cc4329bbe2ee0.webp',
    alt: 'City-to-city',
  },
  {
    tag: 'Enterprise and agency solutions',
    title: 'Corporate travel, simplified.',
    desc: 'One platform for companies and agencies to book, track, and account for every journey.',
    image: '/assets/_next/static/media/4.13f5624e9bdcc2ee.webp',
    alt: 'Enterprise and agency solutions',
  },
];

export function ArriveCardsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollBy = (offset: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="BookSection_cardsSectionContainer__H6Qd5" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
      <div
        ref={trackRef}
        className="Carousel_trackViewport__O_bZ8"
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          paddingBottom: '16px',
          display: 'flex',
        }}
      >
        <div
          className="Carousel_track__RC3x9"
          style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
            padding: '0 4px',
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="Carousel_slide__GNfI8"
              style={{
                listStyle: 'none',
                flex: '0 0 280px',
                width: '280px',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="ImageCard_card__e9GJD"
                style={{
                  background: '#131822',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: '480px',
                }}
              >
                <div style={{ width: '100%', height: '210px', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={card.image}
                    alt={card.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <small
                      style={{
                        color: '#0F63BD',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '11px',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {card.tag}
                    </small>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '24px' }}>
                      {card.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="StandardButton_standard-button__uILct StandardButton_variant-outlined__xn2x4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrow Buttons */}
      <div
        className="Carousel_navigation__MCVtp"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          marginTop: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => scrollBy(-300)}
          disabled={!canScrollLeft}
          aria-label="Previous slide"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: canScrollLeft ? '#ffffff' : 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canScrollLeft ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(300)}
          disabled={!canScrollRight}
          aria-label="Next slide"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: canScrollRight ? '#ffffff' : 'rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: canScrollRight ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
