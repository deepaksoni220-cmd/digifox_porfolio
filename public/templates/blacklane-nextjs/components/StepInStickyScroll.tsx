'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEP_CARDS = [
  {
    tag: '01 / WELCOME',
    title: 'A welcome like no other',
    desc: 'The door is opened for you. Your luggage is stowed. Everything is taken care of from the moment you meet your chauffeur.',
    image: '/assets/_next/static/media/ride-1.510c61ecb0d86e20.webp',
    accent: '#0F63BD',
  },
  {
    tag: '02 / AMBIENCE',
    title: 'You set the tone',
    desc: 'Sit back and relax. Ambient lighting, music playlists, and climate temperature will be adjusted to your exact preferences.',
    image: '/assets/_next/static/media/ride-2.1ffe259f4c10fd5e.webp',
    accent: '#cda869',
  },
  {
    tag: '03 / CONNECTIVITY',
    title: 'Recharge your batteries',
    desc: 'Stay connected and productive on the go with high-speed Wi-Fi and universal fast chargers for all your iOS and Android devices.',
    image: '/assets/_next/static/media/ride-3.76756924ac2f6197.webp',
    accent: '#64B5F6',
  },
];

function StickyCard({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: (typeof STEP_CARDS)[0];
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  // 3D Stacking transforms
  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 1 - (total - index) * 0.04]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.15), start],
    [12, 0]
  );

  return (
    <div
      style={{
        position: 'sticky',
        top: `${130 + index * 28}px`,
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      <motion.div
        style={{
          scale: index === total - 1 ? 1 : scale,
          rotateX: rotateX,
          opacity: 1, // 100% Solid Opaque - Zero Transparency
          width: '100%',
          maxWidth: '1080px',
          backgroundColor: '#0e131f', // 100% Solid Dark Obsidian
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 1px rgba(255, 255, 255, 0.3) inset',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          minHeight: '440px',
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          y: -4,
          transition: { duration: 0.2 },
        }}
      >
        {/* Left Image */}
        <div style={{ position: 'relative', minHeight: '300px', overflow: 'hidden', backgroundColor: '#0e131f' }}>
          <img
            src={card.image}
            alt={card.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(14,19,31,0) 0%, #0e131f 100%)',
            }}
          />
        </div>

        {/* Right Content - 100% Solid Background */}
        <div
          style={{
            padding: '48px 44px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#0e131f',
            background: 'linear-gradient(135deg, #141926 0%, #0e131f 100%)', // Solid opaque
          }}
        >
          <span
            style={{
              color: card.accent,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'inline-block',
            }}
          >
            {card.tag}
          </span>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}
          >
            {card.title}
          </h3>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '440px',
            }}
          >
            {card.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '36px',
                height: '2px',
                background: card.accent,
                display: 'inline-block',
              }}
            />
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              bookcabs aus Experience
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function StepInStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '120px 24px 80px',
        background: '#080c14',
        minHeight: '260vh',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto 64px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            color: '#d4a359',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          EXPERIENCE THE JOURNEY
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '16px',
          }}
        >
          Step in. Breathe out.
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Your private sanctuary on the road — designed for quiet comfort, productivity, and peace of mind.
        </p>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {STEP_CARDS.map((card, idx) => (
          <StickyCard
            key={card.tag}
            card={card}
            index={idx}
            total={STEP_CARDS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
