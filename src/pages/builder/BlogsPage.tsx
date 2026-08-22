import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WebMakeNav } from "../../components/builder/WebMakeNav";
import { WebMakeFooter } from "../../components/builder/WebMakeFooter";
import { SEOMeta } from "../../components/SEOMeta";

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
    },
    {
      id: "core-web-vitals-for-3d-sites",
      title: "How WebMake Delivers 60 FPS WebGL With 100/100 Core Web Vitals",
      excerpt: "The engineering behind lightweight 3D chunking, asset streaming, and edge caching for sub-second page loads on mobile.",
      category: "Engineering",
      readTime: "6 min read",
      date: "Aug 15, 2026",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "custom-domain-setup-guide",
      title: "Step-by-Step Guide: Connecting Your Custom Domain with Automated SSL",
      excerpt: "Point your GoDaddy, Namecheap, or Cloudflare domain to your Digifox website in less than 2 minutes.",
      category: "Tutorials",
      readTime: "3 min read",
      date: "Aug 12, 2026",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#07080e] text-white font-sans selection:bg-[#3b82f6] selection:text-white">
      <SEOMeta
        title="WebMake Blog — Insights on AI Websites, 3D WebGL, & Growth"
        description="Learn the latest techniques in AI-powered website design, 3D animations, Core Web Vitals optimization, and conversion rate tactics."
      />
      
      <WebMakeNav activePage="blogs" />

      {/* Hero Header */}
      <div className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#ec4899]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold uppercase tracking-widest text-[#f472b6] mb-6 backdrop-blur-md">
          <span>📚 Articles, Guides & Insights</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight max-w-4xl mx-auto">
          The WebMake <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f472b6] via-[#a855f7] to-[#60a5fa]">
            Design & AI Journal
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-light">
          Deep dives into modern web development, 3D interactive user experiences, and AI product building.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((b, i) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-[#0c0d1a] border border-white/10 hover:border-[#3b82f6]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-white/15 text-[#60a5fa]">
                      {b.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-3 font-medium">
                    <span>{b.date}</span>
                    <span>•</span>
                    <span>{b.readTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#60a5fa] transition-colors tracking-tight mb-3">
                    {b.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
                <Link
                  to="/ai-builder"
                  className="text-xs font-bold uppercase tracking-wider text-[#60a5fa] hover:text-white transition-colors flex items-center gap-1.5 pt-4"
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
