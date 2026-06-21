import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';

const SERVICES = [
  {
    number: "01",
    name: "3D Modeling",
    description:
      "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
    accent: "#8B5CF6",
  },
  {
    number: "02",
    name: "Rendering",
    description:
      "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
    accent: "#EC4899",
  },
  {
    number: "03",
    name: "Motion Design",
    description:
      "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
    accent: "#F59E0B",
  },
  {
    number: "04",
    name: "Branding",
    description:
      "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.",
    accent: "#10B981",
  },
  {
    number: "05",
    name: "Web Design",
    description:
      "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
    accent: "#3B82F6",
  },
];

/* ── Animated border line that draws across ── */
const DrawLine: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <div ref={ref} className="relative h-px w-full bg-[#0c0c0c]/10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[#0c0c0c]/30"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
};

/* ── Single service row — fully centered ── */
const ServiceRow: React.FC<{ service: (typeof SERVICES)[0]; index: number }> = ({
  service,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: '-5% 0px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: index * 0.07,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <div ref={rowRef}>
      <DrawLine />
      <motion.div
        className="relative w-full flex flex-col items-center text-center py-10 sm:py-12 md:py-14 cursor-default overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover tinted background */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{ backgroundColor: hovered ? `${service.accent}0D` : 'transparent' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Number */}
        <motion.div variants={itemVariants}>
          <motion.span
            className="font-black leading-none select-none block"
            style={{ fontSize: 'clamp(2rem, 5vw, 72px)' }}
            animate={{ color: hovered ? service.accent : 'rgba(12,12,12,0.18)' }}
            transition={{ duration: 0.3 }}
          >
            {service.number}
          </motion.span>
        </motion.div>

        {/* Service name + arrow */}
        <motion.div className="flex items-center justify-center gap-0 mt-2" variants={itemVariants}>
          <h3
            className="font-black uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.8rem)' }}
          >
            {service.name}
          </h3>
          <motion.span
            className="font-light leading-none"
            style={{ color: service.accent, fontSize: '1.5rem' }}
            initial={{ opacity: 0, x: -10 }}
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-light leading-relaxed text-center text-[#0C0C0C]/55 mt-3 max-w-lg mx-auto"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          variants={itemVariants}
          animate={hovered ? { opacity: 1 } : { opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {service.description}
        </motion.p>

        {/* Accent dot */}
        <motion.div
          className="w-2 h-2 rounded-full mt-4"
          style={{ backgroundColor: service.accent }}
          animate={{ scale: hovered ? 1.8 : 1, opacity: hovered ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

/* ── Letter-by-letter heading ── */
const AnimatedHeading: React.FC = () => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const letters = "Services".split("");

  return (
    <h2
      ref={ref}
      className="font-black uppercase text-center leading-none overflow-hidden w-full"
      style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      aria-label="Services"
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={isInView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
};

/* ── Scroll-driven line under heading ── */
const ScrollStrip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const width = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);
  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto h-px bg-[#0c0c0c]/10 mt-4 mb-14 sm:mb-18 md:mb-24 overflow-hidden">
      <motion.div className="h-full bg-[#0c0c0c]/30" style={{ width }} />
    </div>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-20 sm:py-24 md:py-32 relative z-10 overflow-hidden flex flex-col items-center"
    >
      {/* ── Centered inner wrapper ── */}
      <div className="w-full max-w-3xl px-5 sm:px-10 md:px-16 flex flex-col items-center">

        {/* Label */}
        <FadeIn delay={0} y={0} className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-px w-10 bg-[#0c0c0c]/20" />
            <span className="uppercase tracking-[0.3em] text-[#0c0c0c]/40 text-xs sm:text-sm font-medium text-center">
              What I Do
            </span>
            <div className="h-px w-10 bg-[#0c0c0c]/20" />
          </div>
        </FadeIn>

        {/* Heading */}
        <AnimatedHeading />
        <ScrollStrip />

        {/* Service rows */}
        <div className="flex flex-col w-full">
          {SERVICES.map((service, index) => (
            <ServiceRow key={service.number} service={service} index={index} />
          ))}
          <DrawLine />
        </div>

      </div>
    </section>
  );
};
