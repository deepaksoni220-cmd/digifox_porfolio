import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  price?: string;
}

interface ServicesSectionProps {
  items?: ServiceItem[];
}

const defaultVideos = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
];

export default function ServicesSection({ items }: ServicesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cards = items && items.length > 0 ? items.map((item, idx) => ({
    video: defaultVideos[idx % defaultVideos.length],
    tag: item.icon || "Service",
    title: item.title,
    description: item.description,
    price: item.price
  })) : [
    {
      video: defaultVideos[0],
      tag: "Strategy",
      title: "Research & Insight",
      description: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change."
    },
    {
      video: defaultVideos[1],
      tag: "Craft",
      title: "Design & Execution",
      description: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary."
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden w-full flex flex-col items-center"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10">
        {/* Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-normal">
            What we do
          </h2>
          <span className="text-white/40 text-sm hidden md:inline uppercase tracking-wider">
            Our services
          </span>
        </motion.div>

        {/* Two Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col cursor-pointer"
            >
              {/* Card Video Area */}
              <div className="aspect-video w-full overflow-hidden relative">
                <video
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={card.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">
                    {card.tag}
                  </span>
                  <div className="liquid-glass rounded-full p-2 text-white group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                    {card.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
