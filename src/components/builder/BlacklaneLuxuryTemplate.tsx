import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import { 
  ChevronDown, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface BlacklaneTemplateProps {
  data: GeneratedWebsiteData;
  fullScreen?: boolean;
  logoUrl?: string;
  updateData: (path: string[], val: string) => void;
  EditableField: React.FC<{
    value: string;
    onChange: (val: string) => void;
    as?: any;
    className?: string;
    multiline?: boolean;
  }>;
}

export const BlacklaneLuxuryTemplate: React.FC<BlacklaneTemplateProps> = ({
  data,
  logoUrl,
  updateData,
  EditableField
}) => {
  const [tripType, setTripType] = useState<'oneway' | 'hourly'>('oneway');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const carouselCards = [
    {
      tag: "AIRPORT TRANSFERS",
      title: "Flight tracking & 1hr free wait time",
      description: "Relax with 1 hour of complimentary wait time and real-time flight tracking.",
      image: "/templates/blacklane/assets/_next/static/media/1.879377e626f27fdd.webp"
    },
    {
      tag: "CITY TO CITY",
      title: "Your hassle-free alternative to flights and trains",
      description: "Save time and travel in comfort between global metropolitan hubs.",
      image: "/templates/blacklane/assets/_next/static/media/2.9ae17562d88c590d.webp"
    },
    {
      tag: "BY THE HOUR",
      title: "A dedicated chauffeur for as long as you need",
      description: "Total flexibility for business meetings, roadshows, and city exploration.",
      image: "/templates/blacklane/assets/_next/static/media/3.a05cc4329bbe2ee0.webp"
    },
    {
      tag: "CHAUFFEURED RIDES",
      title: "First-class mobility on demand",
      description: "Top-of-the-line European luxury fleet with licensed, suited chauffeurs.",
      image: "/templates/blacklane/assets/_next/static/media/4.13f5624e9bdcc2ee.webp"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#07080d] text-white font-sans selection:bg-[#1d4ed8] selection:text-white overflow-x-hidden">
      
      {/* ── 1. HERO SECTION WITH CINEMATIC PASSENGER BACKGROUND ── */}
      <section 
        className="relative min-h-[92vh] flex flex-col justify-between bg-cover bg-center px-4 sm:px-8 py-6"
        style={{
          backgroundImage: "url('/templates/blacklane/assets/_next/static/media/bg.e8e3285679399bbb.jpg')",
          backgroundColor: "#0b0d14"
        }}
      >
        {/* Subtle Dark Film Overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

        {/* TOP NAVIGATION BAR */}
        <header className="relative z-20 flex items-center justify-between max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-7 w-auto object-contain" />
            ) : (
              <span className="text-2xl font-serif tracking-tight font-normal text-white flex items-baseline gap-1">
                <span className="font-bold">bookcabs</span>
                <span className="italic font-serif text-amber-200/90 text-xl">aus</span>
              </span>
            )}
          </div>

          <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium text-white/90">
            <a href="#hero" className="hover:text-white transition-colors">Demo page 1</a>
            <a href="/templates/blacklane/demo-2.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              Demo page 2 ↗
            </a>
            <div className="hidden sm:flex items-center gap-1.5 cursor-pointer text-white/80 hover:text-white">
              <Globe size={14} />
              <span>English (US)</span>
              <ChevronDown size={14} />
            </div>
          </nav>
        </header>

        {/* CENTER HERO HEADING */}
        <div className="relative z-20 flex flex-col items-center text-center my-auto pt-16 pb-8">
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-normal text-white max-w-4xl tracking-tight mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <EditableField
              value={data.hero?.title || "Your chauffeur awaits."}
              onChange={(val) => updateData(['hero', 'title'], val)}
            />
          </h1>

          {/* CAPSULE TRIP-TYPE TOGGLE (ONE WAY | BY THE HOUR) */}
          <div className="inline-flex items-center bg-black/60 backdrop-blur-xl border border-white/20 p-1 rounded-full mb-8 shadow-2xl">
            <button
              onClick={() => setTripType('oneway')}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                tripType === 'oneway'
                  ? 'bg-[#1d6ee8] text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              One way
            </button>
            <button
              onClick={() => setTripType('hourly')}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                tripType === 'hourly'
                  ? 'bg-[#1d6ee8] text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              By the hour
            </button>
          </div>

          {/* FLOATING TRANSLUCENT BOOKING SEARCH BAR */}
          <div className="w-full max-w-5xl bg-[#0b0e18]/85 border border-white/15 rounded-2xl sm:rounded-3xl p-3 sm:p-4 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            
            {/* Pickup Location */}
            <div className="lg:col-span-3 px-4 py-2 bg-white/[0.04] rounded-xl border border-white/[0.06] hover:border-white/20 transition-all">
              <label className="block text-[11px] font-medium text-white/50 mb-0.5">Pickup location</label>
              <input 
                type="text" 
                placeholder="Address, airport, hotel, ..." 
                defaultValue="Melbourne Airport (MEL)"
                className="w-full bg-transparent text-white text-xs sm:text-sm font-medium outline-none placeholder:text-white/30"
              />
            </div>

            {/* Drop-off Location */}
            {tripType === 'oneway' && (
              <div className="lg:col-span-3 px-4 py-2 bg-white/[0.04] rounded-xl border border-white/[0.06] hover:border-white/20 transition-all">
                <label className="block text-[11px] font-medium text-white/50 mb-0.5">Drop-off location</label>
                <input 
                  type="text" 
                  placeholder="Address, airport, hotel, ..." 
                  defaultValue="Crown Towers Melbourne"
                  className="w-full bg-transparent text-white text-xs sm:text-sm font-medium outline-none placeholder:text-white/30"
                />
              </div>
            )}

            {/* Date Picker */}
            <div className={`${tripType === 'oneway' ? 'lg:col-span-2' : 'lg:col-span-4'} px-4 py-2 bg-white/[0.04] rounded-xl border border-white/[0.06] flex items-center justify-between cursor-pointer`}>
              <div>
                <label className="block text-[11px] font-medium text-white/50 mb-0.5">Date</label>
                <span className="text-white text-xs sm:text-sm font-medium">Today</span>
              </div>
              <ChevronDown size={16} className="text-white/40" />
            </div>

            {/* Time Picker */}
            <div className="lg:col-span-2 px-4 py-2 bg-white/[0.04] rounded-xl border border-white/[0.06] flex items-center justify-between cursor-pointer">
              <div>
                <label className="block text-[11px] font-medium text-white/50 mb-0.5">Pickup time</label>
                <span className="text-white text-xs sm:text-sm font-medium">1:15 PM</span>
              </div>
              <ChevronDown size={16} className="text-white/40" />
            </div>

            {/* CTA Button */}
            <div className="lg:col-span-2">
              <button 
                onClick={() => alert("Connecting to Melbourne & Global Chauffeur Dispatch...")}
                className="w-full h-full py-3.5 px-5 rounded-xl bg-[#1d6ee8] hover:bg-[#1a5ec4] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center"
              >
                <span>View options</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom space filler */}
        <div className="relative z-20" />
      </section>

      {/* ── 2. ARRIVE AT YOUR BEST (SWIPABLE LUXURY CAROUSEL) ── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 
            className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Arrive at your best.
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Effortless journeys, tailored to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carouselCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden bg-[#111420] border border-white/10 flex flex-col justify-between shadow-xl cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181c2c]">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md text-white/90">
                  {card.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-400">
                  <span>Learn more</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. STEP IN. BREATHE OUT. (LUXURY INTERIOR HERO) ── */}
      <section className="py-20 px-6 lg:px-12 bg-[#0c0e18] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] text-xs font-semibold text-white/80 mb-4">
              <Sparkles size={12} className="text-amber-400" />
              PEACE OF MIND TRAVEL
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-normal text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Step in. Breathe out.
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
              Whether you are heading to an international flight or a high-stakes board meeting, enjoy absolute silence, privacy, and impeccable European chauffeur hospitality.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <ShieldCheck className="text-blue-400 mb-2" size={24} />
                <h4 className="font-semibold text-sm text-white">Vetted Chauffeurs</h4>
                <p className="text-xs text-white/50 mt-1">Licensed, insured, and thoroughly background checked.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <Clock className="text-amber-400 mb-2" size={24} />
                <h4 className="font-semibold text-sm text-white">Flight Tracking</h4>
                <p className="text-xs text-white/50 mt-1">Automatic dispatch adjustment for delay compensation.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15">
            <img 
              src="/templates/blacklane/assets/_next/static/media/ride-2.1ffe259f4c10fd5e.webp" 
              alt="Luxury Chauffeur Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 4. WE MOVE WITH YOU (APP DOWNLOAD SECTION) ── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="text-3xl sm:text-5xl font-normal text-white mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              We move with you.
            </h2>
            <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed">
              Have all your journeys in the palm of your hand with the bookcabs aus mobile application.
            </p>
            <div className="flex flex-wrap gap-4">
              <img 
                src="/templates/blacklane/assets/_next/static/media/app-store-logo-light.5f768b87b08b58e5.svg" 
                alt="App Store" 
                className="h-11 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
              <img 
                src="/templates/blacklane/assets/_next/static/media/playstore-logo-light.2938f2b1a073fbc4.svg" 
                alt="Google Play" 
                className="h-11 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/templates/blacklane/assets/_next/static/media/img.59bf95b01983baf4.png" 
              alt="Mobile App Demo"
              className="max-h-[460px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── 5. FAQ SECTION ── */}
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto border-t border-white/[0.08]">
        <h2 
          className="text-3xl sm:text-4xl font-normal text-white text-center mb-12"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {(data.faqs || [
            {
              question: "How does the airport pickup and meet & greet service work?",
              answer: "Your chauffeur tracks your flight in real time and waits inside the terminal arrivals hall holding a personalized digital nameboard, assisting with all luggage directly to your luxury vehicle."
            },
            {
              question: "What is included in the fixed-rate quote?",
              answer: "All rates are 100% all-inclusive. Airport parking, road tolls, and chauffeur gratuities are already covered with zero hidden surcharges."
            },
            {
              question: "Can I book a chauffeur by the hour?",
              answer: "Yes, select 'By the hour' on the booking bar to reserve a dedicated vehicle and driver for flexible multi-stop transit."
            }
          ]).map((faq, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl bg-[#0e111c] border border-white/[0.08] overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-medium text-white text-base hover:text-blue-400 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-white/50 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-blue-400' : ''}`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 text-sm text-white/60 leading-relaxed border-t border-white/[0.04] pt-4"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. FOOTER ── */}
      <footer className="border-t border-white/[0.08] bg-[#07080c] py-12 px-6 lg:px-12 text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>© 2026 bookcabs aus / Blacklane Executive Transport. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy Notice</a>
            <a href="#" className="hover:text-white">Chauffeur Terms</a>
            <a href="#" className="hover:text-white">Corporate Accounts</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
