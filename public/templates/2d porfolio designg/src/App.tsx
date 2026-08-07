import { useState } from 'react';
import { Menu, X, Clock, Compass, ShieldCheck, EyeOff, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

import { useCustomizer } from './context/CustomizerContext';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { brandName, logoUrl } = useCustomizer();

  const menuItems = ['Start', 'Story', 'Rates', 'Benefits', 'FAQ'];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How quickly can a flight be arranged?",
      answer: "Typically, flights can be scheduled and ready for boarding within 2 to 4 hours, depending on aircraft positioning, crew availability, and international customs clearance."
    },
    {
      question: "What is your safety rating standard?",
      answer: "Every operator in our network is double-audited and holds an ARG/US Platinum or Wyvern Wingman rating. We only deploy crews that exceed the standard regulatory requirements."
    },
    {
      question: "Are pets allowed on board?",
      answer: "Yes, we welcome pets in the cabin on all our flights. Your companions can travel alongside you without the restriction of cargo crates."
    },
    {
      question: "What are your cancellation policies?",
      answer: "Cancellations made more than 7 days prior to departure incur zero fees. For last-minute adjustments, please contact your dedicated flight manager to discuss flexible rescheduling options."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans scroll-smooth">
      {/* 1. START / HERO SECTION */}
      <section id="start" className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Content Wrapper */}
        <div className="relative h-full flex flex-col z-10 bg-black/10">
          {/* Navigation Bar */}
          <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div className="text-2xl font-semibold text-gray-900 tracking-tight flex items-center">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-8 object-contain" />
              ) : (
                brandName
              )}
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-900 hover:text-gray-700 transition-colors duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-900 hover:text-gray-700 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile menu dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-20 left-4 right-4 md:hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col gap-4 z-50 transition-all duration-300">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-900 hover:text-gray-700 transition-colors duration-200 font-medium py-2 border-b border-gray-100 last:border-b-0"
                >
                  {item}
                </a>
              ))}
            </div>
          )}

          {/* Main content area */}
          <main className="flex-1 flex items-center justify-center px-4">
            {/* Hero Content Box with upward pull */}
            <div className="text-center -mt-80 flex flex-col items-center">
              <span className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4 block">
                PRIVATE JETS
              </span>

              {/* Title with Overlapping headings */}
              <h1 className="flex flex-col items-center">
                <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                  Premium.
                </span>
                <span 
                  className="text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-tighter"
                  style={{ color: '#202A36', marginTop: '-12px' }}
                >
                  Accessible.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-6 mt-4 max-w-2xl px-4">
                Your dedication deserves recognition.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 items-center justify-center">
                <a 
                  href="#story" 
                  className="px-6 py-2.5 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors duration-200"
                >
                  Discover
                </a>
                <a 
                  href="#rates"
                  className="px-6 py-2.5 rounded-full text-white font-medium transition-colors duration-200"
                  style={{ backgroundColor: '#202A36' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a2229';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#202A36';
                  }}
                >
                  Book Now
                </a>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section id="story" className="py-24 px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">OUR STORY</span>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight leading-tight">
              A new standard in refined aviation.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              SkyElite was founded to disrupt the traditional friction of private aviation. We believe that true luxury is not defined by excess, but by accessibility, simplicity, and precision.
            </p>
            <p>
              Our curated fleet and digital flight coordination remove standard delays, bringing you transparent pricing and instant booking options. From corporate summits to remote retreats, we value your time as the ultimate currency.
            </p>
            <div className="pt-4">
              <a 
                href="#benefits" 
                className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                Learn about the benefits <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RATES SECTION */}
      <section id="rates" className="py-24 px-8 bg-[#202A36] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">CHARTER RATES</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Transparent, competitive hourly tiers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Light Jet</h3>
                <p className="text-gray-400 text-sm mb-6">Ideal for quick regional hops.</p>
                <div className="text-3xl font-light mb-6">$4,500 <span className="text-sm text-gray-400">/ hr</span></div>
                <ul className="space-y-3 border-t border-white/10 pt-6 text-gray-300 text-sm">
                  <li className="flex justify-between"><span>Passengers</span> <span className="font-semibold">Up to 6</span></li>
                  <li className="flex justify-between"><span>Typical Fleet</span> <span className="font-semibold">Phenom 300</span></li>
                  <li className="flex justify-between"><span>Max Range</span> <span className="font-semibold">1,970 nm</span></li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-full bg-white text-[#202A36] font-medium hover:bg-gray-100 transition-colors">
                Reserve
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-300 text-[#202A36] text-xs uppercase font-bold py-1 px-4 rounded-bl-lg">
                Popular
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Super Midsize</h3>
                <p className="text-gray-400 text-sm mb-6">Enhanced comfort and range.</p>
                <div className="text-3xl font-light mb-6">$6,800 <span className="text-sm text-gray-400">/ hr</span></div>
                <ul className="space-y-3 border-t border-white/10 pt-6 text-gray-300 text-sm">
                  <li className="flex justify-between"><span>Passengers</span> <span className="font-semibold">Up to 9</span></li>
                  <li className="flex justify-between"><span>Typical Fleet</span> <span className="font-semibold">Challenger 350</span></li>
                  <li className="flex justify-between"><span>Max Range</span> <span className="font-semibold">3,200 nm</span></li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-full bg-gray-300 text-[#202A36] font-semibold hover:bg-gray-200 transition-colors">
                Reserve
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Heavy Jet</h3>
                <p className="text-gray-400 text-sm mb-6">Unrivaled intercontinental cabin space.</p>
                <div className="text-3xl font-light mb-6">$11,500 <span className="text-sm text-gray-400">/ hr</span></div>
                <ul className="space-y-3 border-t border-white/10 pt-6 text-gray-300 text-sm">
                  <li className="flex justify-between"><span>Passengers</span> <span className="font-semibold">Up to 14</span></li>
                  <li className="flex justify-between"><span>Typical Fleet</span> <span className="font-semibold">Gulfstream G650</span></li>
                  <li className="flex justify-between"><span>Max Range</span> <span className="font-semibold">7,500 nm</span></li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-full bg-white text-[#202A36] font-medium hover:bg-gray-100 transition-colors">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section id="benefits" className="py-24 px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">BENEFITS</span>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
              Crafted around your schedule.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <Clock className="text-[#202A36] mb-6" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">On-Demand Dispatch</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Skip airport terminals. Request flights and take off in as little as 3 hours from booking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <Compass className="text-[#202A36] mb-6" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Global Access</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect directly to thousands of regional and private airfields closer to your destination.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <ShieldCheck className="text-[#202A36] mb-6" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Platinum Safety</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Double-vetted aircraft and crews that consistently exceed state and global safety regulations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <EyeOff className="text-[#202A36] mb-6" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Total Anonymity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Strict flight privacy protocols, private terminal access, and NDA-bound professional flight crews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section id="faq" className="py-24 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">QUESTIONS & ANSWERS</span>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="border-b border-gray-150 pb-4 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left py-4 text-gray-900 hover:text-gray-700 transition-colors focus:outline-none"
                  >
                    <span className="font-medium text-lg">{faq.question}</span>
                    {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                  </button>
                  {isOpen && (
                    <div className="text-gray-600 text-sm md:text-base leading-relaxed pt-2 pb-4 transition-all duration-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#202A36] text-white/50 py-12 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-medium text-white">SkyElite</div>
          <div className="text-sm">
            © 2026 SkyElite Aviation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
