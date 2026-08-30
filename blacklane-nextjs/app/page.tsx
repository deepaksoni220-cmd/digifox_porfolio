'use client';

import { BookingWidget } from '@/components/BookingWidget';
import { ArriveCardsCarousel } from '@/components/ArriveCardsCarousel';
import { StepInStickyScroll } from '@/components/StepInStickyScroll';
import { FaqSection } from '@/components/FaqSection';

export default function HomePage() {
  return (
    <main className="Layout_main__h283P">
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section
        className="Hero_hero__L3_jO"
        style={{
          backgroundImage: "url('/assets/_next/static/media/bg.e8e3285679399bbb.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '120px 24px 60px',
          position: 'relative',
        }}
        aria-label="Hero section"
      >
        <div className="Hero_content__69IIW" style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1
            className="Typography_display__MFaXd Typography_sm__E6Yzg Hero_title__I_fKT"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(40px, 6vw, 76px)',
              fontWeight: 400,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '36px',
            }}
          >
            Your chauffeur awaits.
          </h1>

          {/* Interactive Booking Widget */}
          <BookingWidget />
        </div>
      </section>

      {/* ── 2. ARRIVE AT YOUR BEST (SWIPABLE CAROUSEL) ─────────────────────── */}
      <section className="BookSection_bookSection__icco5" style={{ padding: '100px 48px', background: '#0b0e14' }}>
        <div className="BookSection_firstScreenContainer__tWKIL" style={{ maxWidth: '1280px', margin: '0 auto 48px' }}>
          <div className="BookSection_titleWrapper__Bb4Sy">
            <h3
              className="Typography_display__MFaXd Typography_lg__eZWnf BookSection_subtitle__C22At gradient-text"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                marginBottom: '12px',
              }}
            >
              Arrive at your best.
            </h3>
            <h4
              className="Typography_subheadline__OTYvI Typography_md__MMzMN"
              style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
            >
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#fff', marginBottom: '16px' }}>
              We move with you.
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.6 }}>
              Have all your journeys in the palm of your hand with the bookcabs aus app.
            </p>
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
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, color: '#0F1319', marginBottom: '12px' }}>
              Expect excellence.
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(15,19,25,0.7)' }}>
              Leave the car refreshed and ready for what&apos;s next.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Card 1: Worldwide Network Animated SVG */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
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
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#0F1319', marginBottom: '8px' }}>High-end vehicles</h3>
                <p style={{ fontSize: '15px', color: 'rgba(15,19,25,0.7)' }}>Only the best recent models</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ width: '72px', height: '64px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="70" height="54" viewBox="0 0 70 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Headlight Beam Shimmer */}
                    <path d="M58 32L68 28V40L58 36Z" fill="url(#beamGrad)" style={{ animation: 'beamShimmer 2s ease-in-out infinite' }} />
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
                      <linearGradient id="beamGrad" x1="58" y1="34" x2="68" y2="34" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#d4a359" stopOpacity="0.8" />
                        <stop offset="1" stopColor="#d4a359" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Safe Travels Shield Animated SVG */}
            <div style={{ background: '#dce8fd', borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '270px', transition: 'all 0.3s ease', boxShadow: '0 4px 20px rgba(15,19,25,0.04)' }}>
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
