import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";
import CursorGrid from "../../components/ui/CursorGrid";

export const BlogsPage: React.FC = () => {
  const blogs = [
    {
      id: "why-3d-websites-convert-better",
      title: "Why 3D Animated Websites Convert 3X Better in 2026",
      excerpt: "Interactive WebGL physics and spatial storytelling keep visitors engaged for 4.2 minutes longer than static web pages.",
      category: "Design Trends",
      readTime: "5 min read",
      date: "Aug 20, 2026",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "ai-prompt-engineering-for-websites",
      title: "Mastering Natural Language Prompts to Generate High-Converting Websites",
      excerpt: "How to craft clear brand descriptions that guide AI in generating persuasive headlines, benefit stacks, and compelling CTAs.",
      category: "AI Technology",
      readTime: "4 min read",
      date: "Aug 18, 2026",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white relative overflow-hidden">
      <SEOMeta
        title="WebMake Blog — Insights on AI Websites, 3D WebGL, & Growth"
        description="Learn the latest techniques in AI-powered website design, 3D animations, Core Web Vitals optimization, and conversion rate tactics."
      />
      
      {/* Background Interactive Cursor Grid like 'Dominate Online' section */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <CursorGrid 
          cellSize={65}
          color="#3B82F6"
          radius={160}
          falloff="smooth"
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.2}
          maxOpacity={0.9}
          fillOpacity={0.06}
          gridOpacity={0.04}
          cellRadius={4}
          clickPulse={true}
          pulseSpeed={600}
        />
      </div>

      {/* Ambient Overlay Vignettes */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060709] via-[#060709]/70 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060709] via-[#060709]/70 to-transparent pointer-events-none z-0" />

      <WebMakeNav activePage="blogs" />

      {/* Hero Header */}
      <div className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center relative z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-[#3b82f6]/15 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-[#60a5fa] mb-6 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>Articles, Guides & Engineering Insights</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl mx-auto drop-shadow-md"
        >
          The WebMake <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Design & AI Journal
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Deep dives into modern web development, 3D interactive user experiences, and AI product building.
        </motion.p>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((b, i) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.015, y: -4 }}
              className="group relative bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.14),_#0d0f12_70%)] border border-white/[0.08] hover:border-white/25 rounded-[28px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-white/15 text-blue-400">
                      {b.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
                    <span>{b.date}</span>
                    <span>•</span>
                    <span>{b.readTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight mb-3 leading-snug">
                    {b.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
                <Link
                  to="/ai-builder"
                  className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white transition-colors flex items-center gap-1.5 pt-4"
                >
                  <span>Build with this technique</span>
                  <span>↗</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <WebMakeFooter />
    </div>
  );
};
