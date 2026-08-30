'use client';

import { TestimonialsSection } from '@/components/ui/testimonials-3';
import { Smooth3DSlideshow } from '@/components/Smooth3DSlideshow';

export function ReviewsSection() {
  return (
    <section
      id="reviews-section"
      style={{
        backgroundColor: '#0b0e14',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '100px 24px 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212,163,89,0.05) 0%, rgba(11,14,20,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#d4a359',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <span>✦</span> VIP CLIENT EXPERIENCES
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(38px, 5vw, 60px)',
              lineHeight: '1.12',
              fontWeight: 400,
              color: '#ffffff',
              marginBottom: '18px',
            }}
          >
            Trusted by Industry Leaders.<br />
            <span style={{ color: '#d4a359', fontStyle: 'italic' }}>Celebrated by Global Travelers.</span>
          </h2>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.72)',
              fontSize: '16px',
              lineHeight: '1.6',
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            Discover why executives, founders, and discerning travelers rely on bookcabs aus for effortless chauffeur journeys.
          </p>
        </div>

        {/* 3D Coverflow Gallery Showcase */}
        <div style={{ marginBottom: '64px', width: '100%' }}>
          <Smooth3DSlideshow
            cardWidth={390}
            cardHeight={270}
            gap={7}
            tilt={14}
            sideTilt={8}
            radius={6}
            autoplay={true}
          />
        </div>

        {/* Testimonials 3 Stepped Cards */}
        <TestimonialsSection />
      </div>
    </section>
  );
}

export default ReviewsSection;
