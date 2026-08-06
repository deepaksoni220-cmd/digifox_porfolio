import { useEffect, useRef } from 'react';
import { Globe, ArrowRight, Instagram, Twitter } from 'lucide-react';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const fadingInRef = useRef(false);

  const animateOpacity = (
    from: number,
    to: number,
    durationMs: number,
    onComplete?: () => void
  ) => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const currentVal = from + (to - from) * progress;
      if (videoRef.current) {
        videoRef.current.style.opacity = currentVal.toString();
      }
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial opacity to 0
    video.style.opacity = "0";

    const handleCanPlay = () => {
      if (fadingInRef.current) return;
      fadingInRef.current = true;
      video.play().then(() => {
        animateOpacity(0, 1, 500, () => {
          fadingInRef.current = false;
        });
      }).catch(err => {
        console.error("Video play failed:", err);
      });
    };

    const handleTimeUpdate = () => {
      if (!video.duration || fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55) {
        fadingOutRef.current = true;
        const currentOpacity = parseFloat(video.style.opacity || '1');
        animateOpacity(currentOpacity, 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().then(() => {
          fadingOutRef.current = false;
          fadingInRef.current = true;
          animateOpacity(0, 1, 500, () => {
            fadingInRef.current = false;
          });
        }).catch(err => {
          console.error("Video replay failed:", err);
        });
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If video is already loaded or ready state indicates it's ready, manually call handCanPlay
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
        />

        {/* Navbar */}
        <nav className="relative z-20 w-full px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Left Brand and Links */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-white animate-[spin_8s_linear_infinite]" />
                <span className="text-white font-semibold text-lg tracking-tight select-none">Asme</span>
              </div>
              
              {/* Nav links - hidden on mobile */}
              <div className="hidden md:flex items-center gap-8 ml-10">
                <a href="#features" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Pricing</a>
                <a href="#about" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</a>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-4">
              <button className="text-white text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                Sign Up
              </button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[8%] md:-translate-y-[12%]">
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white tracking-tight font-normal font-serif mb-8 select-none">
            Know it then <span className="italic font-serif">all</span>.
          </h1>

          {/* Email Subscription Container */}
          <div className="max-w-xl w-full flex flex-col items-center gap-6">
            
            {/* Email Pill Input */}
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-white placeholder:text-white/40 text-sm flex-1 focus:ring-0 focus:outline-none"
              />
              <button className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors cursor-pointer flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Subtitle */}
            <p className="text-white text-sm leading-relaxed px-4 max-w-md text-white/70">
              Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
            </p>

            {/* Manifesto button */}
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer mt-2">
              Manifesto
            </button>
          </div>

        </div>

        {/* Social Icons Footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <Instagram className="w-5 h-5" />
          </button>
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
            <Globe className="w-5 h-5" />
          </button>
        </div>

      </section>

      {/* Section 2: About */}
      <AboutSection />

      {/* Section 3: Featured Video */}
      <FeaturedVideoSection />

      {/* Section 4: Philosophy */}
      <PhilosophySection />

      {/* Section 5: Services */}
      <ServicesSection />
    </div>
  );
}

export default App;
