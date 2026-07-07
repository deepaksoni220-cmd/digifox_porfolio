import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';
import { FadeIn } from '../components/FadeIn';
import { Media } from '../components/Media';

import siteData from '../data.json';

const PROJECTS = siteData.projects;

/* ─── Individual Project Card ─────────────────────────────────────────────── */
interface ProjectCardProps {
  project: (typeof PROJECTS)[0];
  index: number;
  totalCards: number;
  sectionProgress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  sectionProgress,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Each card's own scroll-into-view progress (for image parallax)
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.2"],
  });

  // Image subtle scale-in as card enters viewport
  const imgScale = useTransform(cardProgress, [0, 1], [1.12, 1]);

  // Section-level stacking scale
  // Cards behind (lower index) get scaled down as you scroll further
  const scaleStart = index / totalCards;
  const scaleEnd = (index + 1) / totalCards;
  const scale = useTransform(sectionProgress, [scaleStart, scaleEnd], [1, 1 - (totalCards - 1 - index) * 0.04]);

  // Card Y nudge upward as next cards stack on top
  const y = useTransform(sectionProgress, [scaleStart, scaleEnd], [0, -24]);

  const stickyTop = 80 + index * 28;

  return (
    <div
      ref={cardRef}
      className="h-[85vh] flex items-start justify-center"
      style={{ position: "sticky", top: `${stickyTop}px` }}
    >
      <motion.div
        style={{ scale, y, transformOrigin: "top center" }}
        className="w-full max-w-6xl mx-auto rounded-[32px] md:rounded-[48px] border border-[#D7E2EA]/10 bg-[#111111] overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
      >
        {/* ── Card Header ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 border-b border-[#D7E2EA]/10">
          {/* Left: number + info */}
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#D7E2EA]/15 select-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="uppercase tracking-[0.2em] text-[#D7E2EA]/50 font-medium text-xs sm:text-sm">
                {project.category} · {project.year}
              </span>
              <h3
                className="font-black uppercase tracking-tight leading-none text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.2rem, 3vw, 2.6rem)" }}
              >
                {project.name}
              </h3>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs uppercase tracking-widest border border-[#D7E2EA]/20 text-[#D7E2EA]/60 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Project button */}
          <div className="hidden sm:block shrink-0 mt-1">
            <LiveProjectButton />
          </div>
        </div>

        {/* ── Image Grid ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
          {/* Left column — 40% */}
          <div className="grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-4 w-full sm:w-[38%]">
            <div
              className="overflow-hidden rounded-2xl sm:rounded-3xl w-full bg-transparent"
              style={{ height: "clamp(100px, 14vw, 210px)" }}
            >
              <motion.div
                style={{ scale: imgScale }}
                className="w-full h-full"
              >
                <Media
                  src={project.images.leftTop}
                  alt={`${project.name} image 1`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div
              className="overflow-hidden rounded-2xl sm:rounded-3xl w-full bg-transparent"
              style={{ height: "clamp(130px, 20vw, 310px)" }}
            >
              <motion.div
                style={{ scale: imgScale }}
                className="w-full h-full"
              >
                <Media
                  src={project.images.leftBottom}
                  alt={`${project.name} image 2`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right column — 60% */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl w-full sm:w-[62%] bg-transparent" style={{ height: "clamp(220px, 36vw, 530px)" }}>
            <motion.div
              style={{ scale: imgScale }}
              className="w-full h-full"
            >
              <Media
                src={project.images.right}
                alt={`${project.name} main image`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile: Live Project button */}
        <div className="flex sm:hidden px-4 pb-5">
          <LiveProjectButton />
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Projects Section ────────────────────────────────────────────────────── */
export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-20 bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14"
    >
      {/* ── Section Header ──────────────────────────────────────────── */}
      <div className="px-5 sm:px-10 md:px-16 pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 flex flex-col items-center w-full">
        {/* Label row */}
        <FadeIn delay={0} y={20} className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px w-10 bg-[#D7E2EA]/30" />
            <span className="uppercase tracking-[0.3em] text-[#D7E2EA]/50 text-xs sm:text-sm font-medium">
              Selected Works
            </span>
            <div className="h-px w-10 bg-[#D7E2EA]/30" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={50} className="w-full flex flex-col items-center">
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            What we do
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20} className="w-full flex flex-col items-center">
          <p
            className="text-center text-[#D7E2EA]/70 font-light mt-8 max-w-xl mx-auto"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)" }}
          >
            A selection of 3D, branding, webdesign and marketing projects crafted with precision and increase convertions and sale for every business with a solid digital marketing.
          </p>
        </FadeIn>
      </div>

      {/* ── Stacking Cards ──────────────────────────────────────────── */}
      <div className="px-5 sm:px-10 md:px-16 pb-40">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS.length}
            sectionProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
};
