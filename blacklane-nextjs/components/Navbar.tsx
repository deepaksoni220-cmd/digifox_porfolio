'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const path = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: '68px',
      background: 'rgba(8, 12, 20, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(205,168,105,0.15)',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '3px',
          color: '#cda869',
          textTransform: 'uppercase',
        }}>
          CHAUFFEUR
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <NavLink href="/" label="Demo page 1" active={path === '/'} />
        <NavLink href="/demo-2" label="Demo page 2" active={path === '/demo-2'} />

        {/* Language dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.3px',
            }}
          >
            English (US)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9L12 15L18 9" />
            </svg>
          </button>
          {langOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: 'rgba(13,18,32,0.98)',
              border: '1px solid rgba(205,168,105,0.3)',
              borderRadius: '8px',
              padding: '6px',
              minWidth: '140px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            }}>
              {['English (US)', 'Deutsch', 'Español', 'Français'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLangOpen(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '13px',
                    padding: '9px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
        aria-label="Toggle menu"
      >
        <span style={{ fontSize: '22px', color: '#fff' }}>☰</span>
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          background: 'rgba(8,12,20,0.98)',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(205,168,105,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <MobileNavLink href="/" label="Demo page 1" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/demo-2" label="Demo page 2" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.3px',
        color: active ? '#cda869' : 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        padding: '8px 14px',
        borderRadius: '6px',
        border: active ? '1px solid rgba(205,168,105,0.5)' : '1px solid transparent',
        transition: 'all 0.2s ease',
        background: active ? 'rgba(205,168,105,0.1)' : 'transparent',
      }}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'block',
        padding: '14px 16px',
        fontSize: '15px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.9)',
        textDecoration: 'none',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {label}
    </Link>
  );
}
