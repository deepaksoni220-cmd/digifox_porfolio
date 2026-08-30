'use client';

export function Footer() {
  return (
    <footer className="Footer_footer__6mFqH" style={{ background: '#0F1319', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '60px 48px 40px', color: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
            <li>Airport transfers</li>
            <li>Hourly car service</li>
            <li>City-to-city rides</li>
            <li>Chauffeur hailing</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Business</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
            <li>Corporate accounts</li>
            <li>Travel agencies</li>
            <li>Event transportation</li>
            <li>Partner portal</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
            <li>About us</li>
            <li>Connect</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Download App</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <img src="/assets/_next/static/media/app-store-logo-light.5f768b87b08b58e5.svg" height="35" width="120" alt="App Store" />
            <img src="/assets/_next/static/media/playstore-logo-light.2938f2b1a073fbc4.svg" height="35" width="120" alt="Google Play" />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
        <div>© 2026 bookcabs aus. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Legal Notice</span>
          <span>Cookie Settings</span>
        </div>
      </div>
    </footer>
  );
}
