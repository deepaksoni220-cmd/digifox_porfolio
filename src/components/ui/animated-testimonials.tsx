import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  country?: string;
  flag?: string;
  tag?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <div className={cn("max-w-sm md:max-w-4xl lg:max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-10", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* 3D Stacked Image Cards */}
        <div className="relative">
          <div className="relative h-80 sm:h-96 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                  />
                  {testimonial.flag && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg">
                      <span>{testimonial.flag}</span>
                      <span>{testimonial.country}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating Navigation Arrows on Sides */}
          <div className="absolute inset-y-0 -left-3 sm:-left-6 flex items-center z-[1000]">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-black/80 hover:bg-blue-600 text-white border border-white/25 backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all active:scale-95 hover:scale-105 cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute inset-y-0 -right-3 sm:-right-6 flex items-center z-[1000]">
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-black/80 hover:bg-blue-600 text-white border border-white/25 backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all active:scale-95 hover:scale-105 cursor-pointer"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Quote & Info */}
        <div className="flex justify-between flex-col py-4 min-h-[300px]">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            {current.tag && (
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-3">
                {current.tag}
              </span>
            )}
            
            <div className="flex items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-strong)] tracking-tight">
                {current.name}
              </h3>
              <span className="text-yellow-400 text-sm tracking-wider">★★★★★</span>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">
              {current.designation}
            </p>

            <motion.div className="text-base sm:text-lg text-[var(--text-primary)] mt-6 leading-relaxed italic">
              {current.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center justify-between pt-10 border-t border-[var(--border-subtle)] mt-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-80">
              Review <span className="text-[var(--text-strong)]">{active + 1}</span> of <span className="text-[var(--text-strong)]">{testimonials.length}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="h-10 w-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center group/button hover:border-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="h-4 w-4 text-[var(--text-strong)] group-hover/button:-translate-x-0.5 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="h-10 w-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center group/button hover:border-blue-500 hover:bg-blue-500/10 transition-all cursor-pointer shadow-md"
              >
                <ArrowRight className="h-4 w-4 text-[var(--text-strong)] group-hover/button:translate-x-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
