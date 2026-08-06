import { useEffect, useRef, useState } from 'react';
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

  // Template Data State
  const [data, setData] = useState<any>({
    logo: "",
    brandName: "Asme",
    address: "New York, USA",
    phone: "+1 234 567 890",
    email: "hello@asme.com",
    hero: {
      title: "Know it then all.",
      subtitle: "Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.",
      ctaText: "Manifesto",
      imagePrompt: ""
    },
    about: {
      heading: "About Us",
      description: "Pioneering ideas for minds that create, build, and inspire.",
      imagePrompt: ""
    },
    items: [
      {
        title: "Research & Insight",
        description: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
        icon: "⚡"
      },
      {
        title: "Design & Execution",
        description: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
        icon: "💻"
      }
    ],
    contact: {
      heading: "Ready to take off?",
      buttonText: "Contact Us"
    },
    philosophy: {
      title1: "Innovation",
      title2: "Vision",
      block1Label: "Choose your space",
      block1Text: "Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries.",
      block2Label: "Shape the future",
      block2Text: "We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression."
    },
    navigation: {
      link1: "Features",
      link2: "About",
      btn1: "Sign Up",
      btn2: "Login"
    }
  });

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

  // Listen for editor actions from parent builder window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SYNC_DATA') {
        const incoming = event.data.data;
        if (incoming) {
          setData((prev: any) => ({
            ...prev,
            ...incoming,
            logo: incoming.contactDetails?.logo || prev.logo,
            brandName: incoming.contactDetails?.brandName || prev.brandName,
            address: incoming.contactDetails?.address || prev.address,
            phone: incoming.contactDetails?.phone || prev.phone,
            email: incoming.contactDetails?.email || prev.email,
          }));
        }
      }

      if (event.data?.type === 'UPDATE_FIELD') {
        const { field, value } = event.data;
        setData((prev: any) => {
          const next = { ...prev };
          if (field === 'brandName') next.brandName = value;
          if (field === 'address') next.address = value;
          if (field === 'phone') next.phone = value;
          if (field === 'email') next.email = value;
          if (field === 'logo') next.logo = value;
          return next;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    // Tell parent frame we are loaded and ready to sync initial data
    window.parent.postMessage({ type: 'REQUEST_SYNC' }, '*');

    return () => window.removeEventListener('message', handleMessage);
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
                {data.logo ? (
                  <img src={data.logo} alt="Logo" className="w-6 h-6 object-contain" />
                ) : (
                  <Globe className="w-6 h-6 text-white animate-[spin_8s_linear_infinite]" />
                )}
                <span className="text-white font-semibold text-lg tracking-tight select-none">
                  {data.brandName}
                </span>
              </div>
              
              {/* Nav links - hidden on mobile */}
              <div className="hidden md:flex items-center gap-8 ml-10">
                <a href="#features" className="nav-link-1 text-white/80 hover:text-white text-sm font-medium transition-colors">
                  {data.navigation?.link1 || "Features"}
                </a>
                <a href="#about" className="nav-link-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
                  {data.navigation?.link2 || "About"}
                </a>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-4">
              <button className="nav-btn-1 text-white text-sm font-medium hover:text-white/80 transition-colors cursor-pointer">
                {data.navigation?.btn1 || "Sign Up"}
              </button>
              <button className="nav-btn-2 liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">
                {data.navigation?.btn2 || "Login"}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[8%] md:-translate-y-[12%]">
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white tracking-tight font-normal font-serif mb-8 select-none">
            {data.hero?.title || "Know it then all."}
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
              {data.hero?.subtitle || "Stay updated with the latest news and insights. Subscribe to our newsletter today."}
            </p>

            {/* Manifesto button */}
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer mt-2">
              {data.hero?.ctaText || "Manifesto"}
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
      <AboutSection data={data.about} />

      {/* Section 3: Featured Video */}
      <FeaturedVideoSection />

      {/* Section 4: Philosophy */}
      <PhilosophySection data={data.philosophy} />

      {/* Section 5: Services */}
      <ServicesSection items={data.items} />
    </div>
  );
}

export default App;
