'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="Header_header__DfAB0 Header_colorMode-dark__mOHc7" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <Link href="/" aria-label="Go to Homepage" className="Header_logoWrapper__jGiqc" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '24px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          lineHeight: 1,
        }}>
          bookcabs <span style={{ color: '#d4a359', fontStyle: 'italic', fontWeight: 800 }}>aus</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
        <ul className="NavigationMenu_navList__DpxWT NavigationMenu_layout-horizontal__245As" style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <Link
              href="/"
              className={`BaseButton_baseButton__RgDvP BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN ${pathname === '/' ? 'active-demo-btn' : ''}`}
              style={{
                borderRadius: '999px',
                border: pathname === '/' ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
                background: pathname === '/' ? 'rgba(255,255,255,0.15)' : 'transparent',
                padding: '6px 14px',
                textDecoration: 'none',
                color: '#fff',
                fontSize: '13px',
              }}
            >
              Demo page 1
            </Link>
          </li>
          <li>
            <Link
              href="/demo-2"
              className={`BaseButton_baseButton__RgDvP BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN ${pathname === '/demo-2' ? 'active-demo-btn' : ''}`}
              style={{
                borderRadius: '999px',
                border: pathname === '/demo-2' ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
                background: pathname === '/demo-2' ? 'rgba(255,255,255,0.15)' : 'transparent',
                padding: '6px 14px',
                textDecoration: 'none',
                color: '#fff',
                fontSize: '13px',
              }}
            >
              Demo page 2
            </Link>
          </li>
          <li className="NavigationMenuDropdown_dropdown__nfmEJ" style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="BaseButton_baseButton__RgDvP BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN NavigationMenuDropdown_dropdownTrigger__Vq_nM"
              aria-expanded={langOpen}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#fff', fontSize: '13px', cursor: 'pointer' }}
            >
              English (US)
              <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="NavigationMenuDropdown_icon__vTaYm">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: '#0F1319',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '8px 0',
                minWidth: '140px',
                zIndex: 200,
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
              }}>
                {['English (US)', 'Deutsch', 'Español', 'Français'].map(l => (
                  <div key={l} onClick={() => setLangOpen(false)} style={{ padding: '8px 16px', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>
                    {l}
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger Toggle */}
      <div className="mobile-toggle" style={{ display: 'none' }}>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '8px 10px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: 'rgba(11, 14, 20, 0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 150,
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
        }}>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: pathname === '/' ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: pathname === '/' ? '#38BDF8' : '#ffffff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            Demo page 1
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Main Landing</span>
          </Link>

          <Link
            href="/demo-2"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: pathname === '/demo-2' ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: pathname === '/demo-2' ? '#d4a359' : '#ffffff',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            Demo page 2
            <span style={{ fontSize: '12px', color: '#d4a359' }}>3D Showroom ★</span>
          </Link>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>Language</span>
            <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>English (US)</span>
          </div>
        </div>
      )}
    </header>
  );
}
