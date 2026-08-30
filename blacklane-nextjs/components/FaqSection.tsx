'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Booking & Timing',
    question: 'How far in advance can I book a chauffeur ride?',
    answer:
      'You can book rides months in advance or as little as 60 minutes before your scheduled pickup time. For airport transfers and long-distance city-to-city rides, we recommend booking early to secure your preferred vehicle class.',
  },
  {
    id: 'faq-2',
    category: 'Airport Transfers',
    question: 'What happens if my flight is delayed or arrives early?',
    answer:
      'Every airport pickup includes complimentary real-time flight tracking. Your professional chauffeur monitors your flight status and automatically adjusts their arrival time, with up to 60 minutes of free wait time after your flight touches down.',
  },
  {
    id: 'faq-3',
    category: 'Fleet & Vehicles',
    question: 'What vehicle classes are available in the bookcabs aus fleet?',
    answer:
      'Our fleet includes Luxury Sedans (Audi A7, Mercedes-Benz S-Class, BMW 7 Series, Tesla Model S), Executive Business Vans (Mercedes-Benz V-Class), and Premium First-Class SUVs. All vehicles are impeccably detailed and under 3 years old.',
  },
  {
    id: 'faq-4',
    category: 'Pricing & Cancellation',
    question: 'What is the cancellation policy and are there hidden fees?',
    answer:
      'Cancellation is completely free up to 1 hour before pickup for one-way rides, and 24 hours prior for hourly charters. All bookcabs aus rates are 100% all-inclusive — taxes, tolls, airport surcharges, and chauffeur gratuities are locked in at checkout with zero surprises.',
  },
  {
    id: 'faq-5',
    category: 'Service Options',
    question: 'Can I hire a chauffeur by the hour for multi-stop itineraries?',
    answer:
      'Yes! Our "By the hour" service allows you to book a dedicated chauffeur and vehicle with unlimited stops within your booked duration. It is ideal for roadshows, corporate meetings, weddings, shopping tours, and private events.',
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq-section"
      style={{
        backgroundColor: '#090d14',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212,163,89,0.06) 0%, rgba(9,13,20,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="Faq_GridContainer">
          {/* ── LEFT COLUMN (Sticky Title & Support Box) ───────────────────── */}
          <div className="Faq_StickyLeftCol">
            <div className="Faq_StickyInner">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#d4a359',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                <span>✦</span> FREQUENTLY ASKED QUESTIONS
              </span>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(36px, 4vw, 54px)',
                  lineHeight: '1.15',
                  fontWeight: 400,
                  color: '#ffffff',
                  marginBottom: '20px',
                }}
              >
                Got Questions?<br />
                <span style={{ color: '#d4a359', fontStyle: 'italic' }}>We've Got Answers.</span>
              </h2>

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.72)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '36px',
                  maxWidth: '440px',
                }}
              >
                Explore everything you need to know about our luxury fleet, flight tracking guarantees, transparent pricing, and chauffeur standards.
              </p>

              {/* Direct Support Card */}
              <div
                style={{
                  background: '#0e131f',
                  border: '1px solid rgba(212, 163, 89, 0.3)',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(212, 163, 89, 0.12)',
                      border: '1px solid rgba(212, 163, 89, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4a359',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: 0 }}>Still have questions?</h4>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>24/7 VIP Concierge Support</span>
                  </div>
                </div>

                <a
                  href="tel:+61391234567"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    background: 'linear-gradient(135deg, #d4a359 0%, #b8860b 100%)',
                    color: '#090d14',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '1px',
                    padding: '14px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>CONNECT WITH VIP TEAM</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (Animated Accordion List) ────────────────────── */}
          <div className="Faq_AccordionCol">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {FAQS.map((faq, idx) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    style={{
                      backgroundColor: '#0e131f',
                      border: isOpen
                        ? '1px solid rgba(212, 163, 89, 0.6)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      transition: 'all 0.25s ease',
                      boxShadow: isOpen
                        ? '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 163, 89, 0.15)'
                        : '0 4px 16px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        padding: '24px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '20px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: isOpen ? '#d4a359' : 'rgba(255,255,255,0.3)',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            color: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.4',
                          }}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isOpen
                            ? 'linear-gradient(135deg, #d4a359 0%, #b8860b 100%)'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: isOpen
                            ? '1px solid #d4a359'
                            : '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.25s ease',
                          color: isOpen ? '#090d14' : '#d4a359',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <div
                            style={{
                              padding: '0 28px 26px 64px',
                              color: 'rgba(255, 255, 255, 0.75)',
                              fontSize: '15px',
                              lineHeight: '1.7',
                              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                              paddingTop: '18px',
                            }}
                          >
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
