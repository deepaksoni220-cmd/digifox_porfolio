'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArriveCardsCarousel } from '@/components/ArriveCardsCarousel';
import { StepInStickyScroll } from '@/components/StepInStickyScroll';
import { FaqSection } from '@/components/FaqSection';

const CarCanvas = dynamic(() => import('@/components/CarCanvas'), {
  ssr: false,
  loading: () => null,
});

const CARS = [
  { name: 'LUXURY CARS', url: '/assets/_next/static/media/audi_a7.glb' },
  { name: 'SEDAN CARS',  url: '/assets/_next/static/media/tesla_model_s.glb' },
];

export default function Demo2Page() {
  const [mounted, setMounted] = useState(false);
  const [carIdx, setCarIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('INITIALIZING 3D ENGINE...');

  useEffect(() => {
    setMounted(true);

    // Simulated / Preloader step progression
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('LOADING LUXURY FLEET ASSETS...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setStatusText('CONFIGURING LIGHTING & SHADERS...');
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('SHOWROOM READY');
    }, 1400);

    const timer4 = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const prev = () => setCarIdx(i => (i - 1 + CARS.length) % CARS.length);
  const next = () => setCarIdx(i => (i + 1) % CARS.length);

  const car = CARS[carIdx];

  return (
    <main className="Layout_main__h283P" style={{ position: 'relative' }}>
      {/* ── LUXURY 3D SHOWROOM PRELOADER OVERLAY ────────────────────────── */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#080c14',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            transition: 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s ease',
            opacity: progress === 100 ? 0 : 1,
            pointerEvents: progress === 100 ? 'none' : 'auto',
          }}
        >
          {/* Ambient Background Glow */}
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,163,89,0.15) 0%, rgba(8,12,20,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Luxury Spinner Icon */}
          <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '28px' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid rgba(212,163,89,0.2)',
                borderTopColor: '#d4a359',
                borderRightColor: '#d4a359',
                animation: 'spinLoader 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '12px',
                borderRadius: '50%',
                border: '1px solid rgba(212,163,89,0.15)',
                borderBottomColor: '#e5c27a',
                animation: 'spinLoader 1.6s linear infinite reverse',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d4a359',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
              </svg>
            </div>
          </div>

          {/* Brand Eyebrow */}
          <span style={{ color: '#d4a359', fontSize: '11px', fontWeight: 800, letterSpacing: '3.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
            BOOKCABS AUS 3D SHOWROOM
          </span>

          {/* Status Text */}
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '1.5px', marginBottom: '20px', height: '20px' }}>
            {statusText}
          </div>

          {/* Progress Bar Container */}
          <div
            style={{
              width: '240px',
              height: '3px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #b8860b, #d4a359, #fff)',
                borderRadius: '999px',
                transition: 'width 0.4s ease-out',
                boxShadow: '0 0 10px #d4a359',
              }}
            />
          </div>

          {/* Percentage */}
          <span style={{ color: 'rgba(212,163,89,0.7)', fontSize: '11px', fontFamily: 'monospace', marginTop: '8px' }}>
            {progress}%
          </span>
        </div>
      )}

      {/* ── 3D SHOWROOM HERO SECTION ────────────────────────────────────── */}
      <section className="Demo2_HeroSection">
        <div className="Demo2_HeroBg" id="demo2HeroBg" style={{ position: 'absolute', inset: 0, backgroundImage: "url('/assets/backroundbig.png')", backgroundSize: 'cover', backgroundPosition: 'center 75%', opacity: 1, zIndex: 0 }}></div>
        <div className="Demo2_HeroOverlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,20,0.4) 0%, rgba(8,12,20,0.1) 40%, rgba(8,12,20,0.4) 100%)', zIndex: 1 }}></div>

        <div className="Demo2_Container" style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
          {/* Top Grid: Left headline, Right 3D Car Showcase */}
          <div className="Demo2_TopGrid">
            {/* BIGGER HEADLINE SECTION */}
            <div className="Demo2_LeftCol">
              <span className="Demo2_Eyebrow">
                PREMIUM CHAUFFEUR SERVICE
              </span>
              <h1 className="Demo2_Title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, color: '#ffffff' }}>
                Driven by<br />
                <span style={{ color: '#d4a359', fontStyle: 'italic' }}>Excellence</span>
              </h1>
              <p className="Demo2_Subtitle">
                Luxury chauffeur driven car service in Melbourne, tailored for you.
              </p>
              <div className="Demo2_ActionRow">
                <a href="tel:+61391234567" className="Demo2_BookBtn">
                  <span>BOOK A RIDE NOW</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            {/* 3D Car Showcase: Full Size 3D Car + Side Arrows + Dual Segmented Category Pill */}
            <div className="Demo2_TurntableArea" id="carShowcaseArea" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
              <div className="Demo2_Stage" id="carStage" style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Small Left Arrow on side of car */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous Car"
                  className="Demo2_SideArrow Demo2_SideArrowLeft"
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 25,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(15,19,25,0.85)',
                    border: '1px solid rgba(212,163,89,0.5)',
                    color: '#d4a359',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                {/* 3D WebGL Canvas */}
                <div className="Demo2_ThreeCanvasContainer" id="threeCanvasContainer" style={{ width: '100%' }}>
                  {mounted && <CarCanvas modelUrl={car.url} />}
                </div>

                {/* Small Right Arrow on side of car */}
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next Car"
                  className="Demo2_SideArrow Demo2_SideArrowRight"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 25,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(15,19,25,0.85)',
                    border: '1px solid rgba(212,163,89,0.5)',
                    color: '#d4a359',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* LUXURY CARS / SEDAN CARS Dual Segmented Switcher */}
                <div className="Demo2_CategoryToggleRow">
                  <div className="Demo2_SegmentedPill">
                    <button
                      type="button"
                      onClick={() => setCarIdx(0)}
                      className={`Demo2_SegmentTab ${carIdx === 0 ? 'active' : ''}`}
                      aria-label="Select Luxury Cars"
                    >
                      <span className="Demo2_TabDot"></span>
                      <span>LUXURY CARS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarIdx(1)}
                      className={`Demo2_SegmentTab ${carIdx === 1 ? 'active' : ''}`}
                      aria-label="Select Sedan Cars"
                    >
                      <span className="Demo2_TabDot"></span>
                      <span>SEDAN CARS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features Glass Bar */}
          <div className="Demo2_FeaturesBar">
            <div className="Demo2_FeatureItem" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="Demo2_FeatureIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="Demo2_FeatureText">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Reliable on Time</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>Punctuality you can depend on.</p>
              </div>
            </div>

            <div className="Demo2_FeatureItem" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="Demo2_FeatureIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z"/><path d="M4 11h16a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2z"/><path d="M6 14v4a6 6 0 0 0 12 0v-4"/><line x1="12" y1="18" x2="12" y2="22"/></svg>
              </div>
              <div className="Demo2_FeatureText">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Professional Chauffeurs</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>Experienced, trained and dedicated to you.</p>
              </div>
            </div>

            <div className="Demo2_FeatureItem" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="Demo2_FeatureIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
              </div>
              <div className="Demo2_FeatureText">
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0 }}>Latest Fleets</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>Luxury vehicles, always immaculate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ARRIVE AT YOUR BEST (SWIPABLE CAROUSEL) ─────────────────────── */}
      <section className="BookSection_bookSection__icco5" style={{ padding: '100px 48px', background: '#0b0e14' }}>
        <div className="BookSection_firstScreenContainer__tWKIL" style={{ maxWidth: '1280px', margin: '0 auto 48px' }}>
          <div className="BookSection_titleWrapper__Bb4Sy">
            <h3 className="Typography_display__MFaXd Typography_lg__eZWnf BookSection_subtitle__C22At gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, marginBottom: '12px' }}>
              Arrive at your best.
            </h3>
            <h4 className="Typography_subheadline__OTYvI Typography_md__MMzMN" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
              Effortless journeys, tailored to you.
            </h4>
          </div>
        </div>

        <div className="BookSection_cardsSection__uty_u">
          <ArriveCardsCarousel />
        </div>
      </section>

      {/* ── 3. STEP IN. BREATHE OUT. (3D STICKY SCROLL ANIMATION) ───────── */}
      <StepInStickyScroll />

      {/* ── 4. WE MOVE WITH YOU (APP DOWNLOAD) ──────────────────────────── */}
      <section className="BookAnyWhereSection_section__0f_l9" style={{ padding: '100px 48px', background: '#0F1319' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#fff', marginBottom: '16px' }}>We move with you.</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.6 }}>Have all your journeys in the palm of your hand with the bookcabs aus app.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <img src="/assets/_next/static/media/app-store-logo-light.5f768b87b08b58e5.svg" height="40" width="135" alt="App Store" />
              <img src="/assets/_next/static/media/playstore-logo-light.2938f2b1a073fbc4.svg" height="40" width="135" alt="Google Play" />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/assets/_next/static/media/img.59bf95b01983baf4.png" alt="bookcabs aus mobile app" style={{ maxWidth: '100%', maxHeight: '440px', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* ── 5. EXPECT EXCELLENCE (BELOW WE MOVE WITH YOU) ───────────────── */}
      <section className="Arrive_arrive__7XKKN" style={{ padding: '100px 48px', background: '#eaf2ff', color: '#0F1319' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#0F1319', marginBottom: '12px' }}>Expect excellence.</h2>
            <p style={{ fontSize: '18px', color: 'rgba(15,19,25,0.7)' }}>Leave the car refreshed and ready for what&apos;s next.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Card 1: Worldwide Network Animated SVG */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', minHeight: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>Available worldwide</h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)' }}>Expert local chauffeurs in 500+ cities</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ width: '64px', height: '64px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Rotating Globe Orbit */}
                    <circle cx="30" cy="30" r="26" stroke="#0F63BD" strokeWidth="1.5" strokeDasharray="4 3" style={{ animation: 'spinSlow 20s linear infinite', transformOrigin: 'center' }} />
                    <circle cx="30" cy="30" r="18" stroke="#0F63BD" strokeWidth="1.2" strokeOpacity="0.4" />
                    {/* Pulsing Radar Ring */}
                    <circle cx="30" cy="30" r="22" stroke="#d4a359" strokeWidth="1.5" strokeOpacity="0.8" style={{ animation: 'pulseWave 2.2s ease-in-out infinite', transformOrigin: 'center' }} />
                    {/* Center Location Pin */}
                    <g style={{ animation: 'floatSmooth 3s ease-in-out infinite' }}>
                      <path d="M30 16C24.4772 16 20 20.4772 20 26C20 32.5 28 41 30 42.5C32 41 40 32.5 40 26C40 20.4772 35.5228 16 30 16Z" fill="#0F63BD" />
                      <circle cx="30" cy="25" r="4" fill="#ffffff" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: High-End Vehicle Animated SVG */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', minHeight: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>High-end vehicles</h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)' }}>Only the best recent models</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ width: '72px', height: '64px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="70" height="54" viewBox="0 0 70 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Headlight Beam Shimmer */}
                    <path d="M58 32L68 28V40L58 36Z" fill="url(#beamGrad2)" style={{ animation: 'beamShimmer 2s ease-in-out infinite' }} />
                    {/* Car Silhouette Body */}
                    <path d="M10 36C10 36 12 28 18 24C24 20 34 18 44 20C48 21 54 26 58 31L60 36C61 37.5 60 40 58 40H12C10 40 9.5 37.5 10 36Z" fill="#0F63BD" />
                    {/* Windows */}
                    <path d="M22 24H35V30H18C19 28 20.5 25 22 24Z" fill="#eaf2ff" fillOpacity="0.85" />
                    <path d="M37 24H45C48 25 51 28 52 30H37V24Z" fill="#eaf2ff" fillOpacity="0.85" />
                    {/* Front Wheel */}
                    <g style={{ transformOrigin: '48px 40px', animation: 'spinSlow 3s linear infinite' }}>
                      <circle cx="48" cy="40" r="7" fill="#1e293b" />
                      <circle cx="48" cy="40" r="4" fill="#d4a359" />
                      <line x1="48" y1="33" x2="48" y2="47" stroke="#ffffff" strokeWidth="1" />
                      <line x1="41" y1="40" x2="55" y2="40" stroke="#ffffff" strokeWidth="1" />
                    </g>
                    {/* Rear Wheel */}
                    <g style={{ transformOrigin: '20px 40px', animation: 'spinSlow 3s linear infinite' }}>
                      <circle cx="20" cy="40" r="7" fill="#1e293b" />
                      <circle cx="20" cy="40" r="4" fill="#d4a359" />
                      <line x1="20" y1="33" x2="20" y2="47" stroke="#ffffff" strokeWidth="1" />
                      <line x1="13" y1="40" x2="27" y2="40" stroke="#ffffff" strokeWidth="1" />
                    </g>
                    <defs>
                      <linearGradient id="beamGrad2" x1="58" y1="34" x2="68" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#d4a359" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#d4a359" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Safe Travels Shield Animated SVG */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', minHeight: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>Safe travels</h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)' }}>Trained professionals and reliable pickups</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ width: '64px', height: '64px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Protective Shield Outline Pulse */}
                    <path d="M29 6L47 13V27C47 38.5 39.5 48.5 29 52C18.5 48.5 11 38.5 11 27V13L29 6Z" stroke="#d4a359" strokeWidth="2" strokeOpacity="0.5" style={{ animation: 'pulseWave 2.4s ease-in-out infinite', transformOrigin: 'center' }} />
                    {/* Main Solid Shield */}
                    <path d="M29 9L44 15V26.5C44 36.5 37.5 45.5 29 48.5C20.5 45.5 14 36.5 14 26.5V15L29 9Z" fill="#0F63BD" />
                    {/* Animated Checkmark */}
                    <path d="M22 28L27 33L36 23" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'floatSmooth 2.5s ease-in-out infinite' }} />
                    <circle cx="29" cy="9" r="2.5" fill="#d4a359" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REACT BITS PRO FAQ 1 SECTION ───────────────────────────── */}
      <FaqSection />
    </main>
  );
}
