import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface PhilosophySectionProps {
  data?: {
    title1?: string;
    title2?: string;
    block1Label?: string;
    block1Text?: string;
    block2Label?: string;
    block2Text?: string;
  };
}

export default function PhilosophySection({ data }: PhilosophySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden w-full flex flex-col items-center"
    >
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 font-normal"
        >
          <span className="philosophy-title-1">{data?.title1 || "Innovation"} </span>
          <span className="font-serif italic text-white/40">x</span>
          <span className="philosophy-title-2"> {data?.title2 || "Vision"}</span>
        </motion.h2>
 
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column (Video) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] w-full"
          >
            <video
              className="w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          </motion.div>
 
          {/* Right Column (Text Blocks) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8 md:gap-10"
          >
            {/* Block 1 */}
            <div>
              <span className="philosophy-block-1-label text-white/40 text-xs tracking-widest uppercase mb-4 block">
                {data?.block1Label || "Choose your space"}
              </span>
              <p className="philosophy-block-1-text text-white/70 text-base md:text-lg leading-relaxed">
                {data?.block1Text || "Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries."}
              </p>
            </div>
 
            {/* Divider */}
            <div className="w-full h-px bg-white/10" />
 
            {/* Block 2 */}
            <div>
              <span className="philosophy-block-2-label text-white/40 text-xs tracking-widest uppercase mb-4 block">
                {data?.block2Label || "Shape the future"}
              </span>
              <p className="philosophy-block-2-text text-white/70 text-base md:text-lg leading-relaxed">
                {data?.block2Text || "We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
