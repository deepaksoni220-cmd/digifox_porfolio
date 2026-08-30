import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template 1: WeAreBrand
const appWeAreBrand = express();
const wearebrandDir = path.join(__dirname, '../public/templates/burgers/wearebrand.io/wearebrand.io');
appWeAreBrand.use(express.static(wearebrandDir));
appWeAreBrand.listen(3005, () => {
  console.log('🍔 WeAreBrand template running at: http://localhost:3005');
});

// Template 2: Intik Burgers
const appIntik = express();
const intikDir = path.join(__dirname, '../public/templates/burgers/intikburgers_9ytz.vercel.app/intikburgers-9ytz.vercel.app');

// Middleware: URL-decode paths so tilde (~) files resolve correctly
appIntik.use((req, res, next) => {
  req.url = decodeURIComponent(req.url);
  next();
});

// Serve index.html with injected reveal/interaction scripts (BEFORE static)
appIntik.get('/', (req, res) => {
  const indexPath = path.join(intikDir, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  // Inject standalone scripts before </body> for sections that rely on JS interactions
  const injectedScripts = `
<script>
/* ===== STANDALONE REVEAL OBSERVER ===== */
(function(){
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el){ obs.observe(el); });
})();

/* ===== STAT COUNTER ANIMATION ===== */
(function(){
  var statEls = document.querySelectorAll('.stat-number');
  if (!statEls.length) return;
  var targets = [
    { el: statEls[0], end: 4.6, dec: 1, prefix: '', suffix: '' },
    { el: statEls[1], end: 1000, dec: 0, prefix: '', suffix: '+' },
    { el: statEls[2], end: 100, dec: 0, prefix: '', suffix: '%' },
    { el: statEls[3], end: 0, dec: 0, prefix: '', suffix: '', text: 'FAST' }
  ];
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      targets.forEach(function(t){
        if (t.text) { t.el.textContent = t.text; return; }
        var start = 0, dur = 1800, startTime = null;
        function step(ts){
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / dur, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          var val = start + (t.end - start) * ease;
          t.el.textContent = t.prefix + val.toFixed(t.dec) + t.suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  if (statEls[0]) obs.observe(statEls[0].closest('.stats') || statEls[0]);
})();

/* ===== BURGER PANEL SWITCHER ===== */
(function(){
  var panels = document.querySelectorAll('.burger-panel');
  var images = document.querySelectorAll('.burger-visual img');
  var numEl = document.querySelector('.burger-visual-number');
  var metaEl = document.querySelector('.burger-visual-meta');
  if (!panels.length || !images.length) return;

  var names = ['Cruncher','Grillz','Cheesy AF','Seaquel','Bad Guy','Bad Girl','INTIK'];
  var prices = ['400','400','800','800','800','850','850'];
  var tones = ['#ff7b16','#ff4444','#ffcc00','#3399ff','#cc3333','#ff69b4','#ffaa00'];
  var current = 0;

  function activate(idx){
    panels.forEach(function(p,i){
      p.classList.toggle('is-active', i === idx);
    });
    images.forEach(function(img,i){
      img.classList.toggle('is-active', i === idx);
    });
    if(numEl) numEl.textContent = String(idx+1).padStart(2,'0');
    if(metaEl){
      var spans = metaEl.querySelectorAll('span');
      if(spans[0]) spans[0].textContent = names[idx] || '';
      if(spans[1]) spans[1].textContent = (prices[idx]||'') + ' DZD';
    }
    var visual = document.querySelector('.burger-visual');
    if(visual) visual.style.setProperty('--burger-tone', tones[idx] || '#ff7b16');
    current = idx;
  }

  panels.forEach(function(panel, idx){
    panel.addEventListener('click', function(){ activate(idx); });
  });

  // Auto-rotate every 4s
  setInterval(function(){
    activate((current + 1) % panels.length);
  }, 4000);
})();

/* ===== SCROLL PROGRESS BAR ===== */
(function(){
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? window.scrollY / h : 0;
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  }, { passive: true });
})();

/* ===== STICKY NAV BACKGROUND ===== */
(function(){
  var nav = document.querySelector('.site-nav');
  if (!nav) return;
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ===== MOBILE MENU TOGGLE ===== */
(function(){
  var btn = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function(){
    var open = btn.classList.toggle('is-open');
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      btn.classList.remove('is-open');
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
})();

/* ===== BACK TO TOP ===== */
(function(){
  var btn = document.querySelector('.footer button');
  if (!btn) return;
  btn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===== SMOOTH ANCHOR SCROLL ===== */
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
</script>
`;

  html = html.replace('</body>', injectedScripts + '</body>');
  res.type('html').send(html);
});

// Static files for all other requests (JS chunks, CSS, images, fonts)
appIntik.use(express.static(intikDir));
appIntik.listen(7005, () => {
  console.log('🍔 Intik Burgers template running at: http://localhost:7005');
});

// Template 3: Style Demo 1 (Riska Luxury Fashion Portfolio)
const appStyleDemo1 = express();
const styleDemo1Dir = path.join(__dirname, '../public/templates/style demo 1/biska_luxury.aura.build/riska-luxury.aura.build');
const styleDemo1SupabaseDir = path.join(__dirname, '../public/templates/style demo 1/biska_luxury.aura.build/hoirqrkdgbmvpwutwuwj.supabase.co');

appStyleDemo1.use('/storage', express.static(path.join(styleDemo1SupabaseDir, 'storage')));
appStyleDemo1.use(express.static(styleDemo1Dir));
appStyleDemo1.use((req, res) => {
  res.sendFile(path.join(styleDemo1Dir, 'index.html'));
});

appStyleDemo1.listen(7006, () => {
  console.log('✨ Style Demo 1 (Riska Luxury) running at: http://localhost:7006');
});

// Template 4: Style Demo 2 (Studio Fashion & Beauty eCommerce)
const appStyleDemo2 = express();
const styleDemo2Dir = path.join(__dirname, '../public/templates/stylg demo 2/studio_fashion.aura.build/studio-fashion.aura.build');
const styleDemo2SupabaseDir = path.join(__dirname, '../public/templates/stylg demo 2/studio_fashion.aura.build/hoirqrkdgbmvpwutwuwj.supabase.co');

appStyleDemo2.use('/storage', express.static(path.join(styleDemo2SupabaseDir, 'storage')));
appStyleDemo2.use(express.static(styleDemo2Dir));
appStyleDemo2.use((req, res) => {
  res.sendFile(path.join(styleDemo2Dir, 'index.html'));
});

appStyleDemo2.listen(7007, () => {
  console.log('💄 Style Demo 2 (Studio Fashion) running at: http://localhost:7007');
});

// Template 5: adidas CHILE20
const appAdidasChile = express();
const adidasChileDir = path.join(__dirname, '../public/templates/soe/adidaschile20.com/adidaschile20.com');
const adidasChileParentDir = path.join(__dirname, '../public/templates/soe/adidaschile20.com');

appAdidasChile.use((req, res, next) => {
  const oldSend = res.send;
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      console.log(`[adidas 404/ERR] ${req.method} ${req.url} -> ${res.statusCode}`);
    } else {
      console.log(`[adidas OK] ${req.method} ${req.url} -> ${res.statusCode}`);
    }
  });
  next();
});

appAdidasChile.get(['/', '/index.html', '/bomber/3.html'], (req, res) => {
  const indexPath = path.join(adidasChileDir, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  const killCookieScript = `
<style>
.CookiesBar, #Stage .CookiesBar, [class*="CookiesBar"], [class*="cookie"], [class*="Cookie"], .CookiesBar * {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
  height: 0 !important;
  width: 0 !important;
  max-height: 0 !important;
  overflow: hidden !important;
}
</style>
<script>
(function() {
  const removeCookies = () => {
    document.querySelectorAll('.CookiesBar, #Stage .CookiesBar, [class*="CookiesBar"]').forEach(el => el.remove());
  };
  removeCookies();
  setInterval(removeCookies, 50);
  window.addEventListener('DOMContentLoaded', removeCookies);
  window.addEventListener('load', removeCookies);
})();
</script>
`;
  html = html.replace('</head>', killCookieScript + '</head>');
  res.type('html').send(html);
});

appAdidasChile.use(express.static(adidasChileDir));
appAdidasChile.use(express.static(adidasChileParentDir));
appAdidasChile.use((req, res) => {
  console.log(`[adidas Fallback] Requested: ${req.url}`);
  if (req.url.startsWith('/assets/')) {
    res.status(404).send('Not found');
  } else {
    res.sendFile(path.join(adidasChileDir, 'index.html'));
  }
});

appAdidasChile.listen(5005, () => {
  console.log('👟 adidas CHILE20 running at: http://localhost:5005');
});

// Template 6: Dig Portfolio (digifox porfolio - Creative Portfolio)
const appDigPortfolio = express();
const digPortfolioBaseDir = path.join(__dirname, '../public/templates/dig profolio/dig porfolio');
const digPortfolioVercelDir = path.join(digPortfolioBaseDir, 'webild-components-version-4.vercel.app');
const digPortfolioStorageDir = path.join(digPortfolioBaseDir, 'storage.googleapis.com');
const digPortfolioRandomUserDir = path.join(digPortfolioBaseDir, 'randomuser.me');

appDigPortfolio.use('/storage.googleapis.com', express.static(digPortfolioStorageDir));
appDigPortfolio.use('/randomuser.me', express.static(digPortfolioRandomUserDir));
appDigPortfolio.use('/assets', express.static(path.join(digPortfolioVercelDir, 'assets')));
appDigPortfolio.use(express.static(digPortfolioVercelDir));
appDigPortfolio.use(express.static(digPortfolioBaseDir));

appDigPortfolio.get(['/', '/index.html', '/templates/creative-portfolio', '/components/templates/creative-portfolio.html'], (req, res) => {
  res.sendFile(path.join(digPortfolioVercelDir, 'index.html'));
});

appDigPortfolio.use((req, res) => {
  if (req.url.startsWith('/assets/')) {
    res.status(404).send('Asset not found');
  } else {
    res.sendFile(path.join(digPortfolioVercelDir, 'index.html'));
  }
});

appDigPortfolio.listen(50020, () => {
  console.log('💼 Dig Portfolio (Creative Portfolio) running at: http://localhost:50020');
});
appDigPortfolio.listen(5004, () => {
  console.log('💼 Dig Portfolio (Creative Portfolio) running at: http://localhost:5004');
});

// Template 7: Blacklane (The Global Chauffeur Service)
const appBlacklane = express();
const blacklaneBaseDir = path.join(__dirname, '../public/templates/blacklane web/www.blacklane.com');
const blacklaneStaticDir = path.join(blacklaneBaseDir, 'static.blacklane.com');
const blacklaneWebDir = path.join(blacklaneBaseDir, 'www.blacklane.com');
const blacklaneUsercentricsDir = path.join(blacklaneBaseDir, 'web.cmp.usercentrics.eu');

appBlacklane.use('/assets', express.static(path.join(blacklaneStaticDir, 'assets')));
appBlacklane.use('/public', express.static(path.join(blacklaneStaticDir, 'public')));
appBlacklane.use('/static.blacklane.com', express.static(blacklaneStaticDir));
appBlacklane.use('/web.cmp.usercentrics.eu', express.static(blacklaneUsercentricsDir));
appBlacklane.use(express.static(blacklaneStaticDir, { index: false }));
appBlacklane.use(express.static(blacklaneWebDir, { index: false }));
appBlacklane.use(express.static(blacklaneBaseDir, { index: false }));

function renderBlacklaneHtml(isDemo2 = false) {
  const indexPath = path.join(blacklaneWebDir, 'en/index.html');
  if (!fs.existsSync(indexPath)) return null;
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace remote static hostname references
  html = html.replace(/https:\/\/static\.blacklane\.com\//g, '/');

  // Remove next.js hydration scripts & third party trackers that cause hydration errors/looping/wobble
  html = html.replace(/<script defer="" nomodule="" src=".*?polyfills.*?"><\/script>/gi, '');
  html = html.replace(/<script id="usercentrics-cmp".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?_buildManifest\.js".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?_ssgManifest\.js".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?webpack-.*?\.js".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?framework-.*?\.js".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?main-.*?\.js".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?pages\/_app-.*?\.js".*?><\/script>/gi, '');
  html = html.replace(/<script.*?src=".*?pages\/index-.*?\.js".*?><\/script>/gi, '');
  
  // Remove raw unstyled legal terms dialog that leaked into the bottom of the page
  html = html.replace(/<dialog[\s\S]*?<\/dialog>/gi, '');

  // Replace Blacklane Logo with bookcabs aus
  const blacklaneSvgRegex = /<svg[^>]*class="Header_logo__tcCHI[^>]*>[\s\S]*?<\/svg>/i;
  const bookcabsLogoHtml = `
    <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; display: flex; align-items: center; gap: 5px; line-height: 1;">
      bookcabs <span style="color: #d4a359; font-style: italic; font-weight: 800;">aus</span>
    </span>
  `;
  html = html.replace(blacklaneSvgRegex, bookcabsLogoHtml);
  html = html.replace(/Blacklane GmbH/g, 'bookcabs aus');
  html = html.replace(/Blacklane app/g, 'bookcabs aus app');
  html = html.replace(/The Global Chauffeur Service \| Blacklane/g, 'bookcabs aus | Premium Chauffeur Service Australia');
  html = html.replace(/<li>.*?Sustainability.*?<\/li>/gi, '<li><a href="tel:+61391234567" style="color:inherit;text-decoration:none;">Connect</a></li>');
  html = html.replace(/<li>.*?Newsroom.*?<\/li>/gi, '');
  html = html.replace(/<li>.*?Careers.*?<\/li>/gi, '');

  if (isDemo2) {
    const demo2HeroHtml = `
      <main class="Layout_main__h283P">
        <section class="Demo2_HeroSection">
          <div class="Demo2_HeroBg" id="demo2HeroBg" style="background-image: url('/assets/backroundbig.png'); background-position: center 75%; opacity: 1;"></div>
          <div class="Demo2_HeroOverlay" style="background: linear-gradient(180deg, rgba(8,12,20,0.4) 0%, rgba(8,12,20,0.1) 40%, rgba(8,12,20,0.4) 100%);"></div>

          <div class="Demo2_Container">
            <!-- Top Grid: Left headline, Right 3D Car Showcase -->
            <div class="Demo2_TopGrid">
              <div class="Demo2_LeftCol">
                <span class="Demo2_Eyebrow">PREMIUM CHAUFFEUR SERVICE</span>
                <h1 class="Demo2_Title">
                  Driven by<br />
                  <span>Excellence</span>
                </h1>
                <p class="Demo2_Subtitle">
                  Luxury chauffeur driven car service in Melbourne, tailored for you.
                </p>
                <div class="Demo2_ActionRow">
                  <a href="tel:+61391234567" class="Demo2_BookBtn">
                    BOOK A RIDE NOW
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>

              <div class="Demo2_TurntableArea" id="carShowcaseArea" style="display:flex;flex-direction:column;align-items:center;width:100%;position:relative;margin-top:110px;transform:translateX(-40px);">
                <div class="Demo2_Stage" id="carStage" style="width:100%;position:relative;display:flex;align-items:center;justify-content:center;">
                  <!-- Small Left Arrow -->
                  <button type="button" class="Demo2_NavBtn Demo2_NavPrev" id="carPrevBtn" aria-label="Previous Car" style="position:absolute;left:8px;top:50%;transform:translateY(-50%);z-index:25;width:38px;height:38px;border-radius:50%;background:rgba(15,19,25,0.85);border:1px solid rgba(212,163,89,0.5);color:#d4a359;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>

                  <div class="Demo2_ThreeCanvasContainer" id="threeCanvasContainer" style="width:100%;">
                    <div class="Demo2_CanvasLoader" id="canvasLoader">
                      <div class="Demo2_Spinner"></div>
                      <span>Loading 3D Model...</span>
                    </div>
                  </div>

                  <!-- Small Right Arrow -->
                  <button type="button" class="Demo2_NavBtn Demo2_NavNext" id="carNextBtn" aria-label="Next Car" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:25;width:38px;height:38px;border-radius:50%;background:rgba(15,19,25,0.85);border:1px solid rgba(212,163,89,0.5);color:#d4a359;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>

                  <!-- LUXURY CARS / SEDAN CARS Dual Segmented Switcher -->
                  <div class="Demo2_CategoryToggleRow" style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);z-index:35;display:flex;justify-content:center;">
                    <div class="Demo2_SegmentedPill" style="display:inline-flex;align-items:center;gap:4px;background:rgba(15,19,25,0.94);border:1px solid rgba(212,163,89,0.5);padding:4px;border-radius:999px;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,0.8), 0 0 20px rgba(212,163,89,0.2);">
                      <button type="button" id="tabLuxury" class="Demo2_SegmentTab active" style="display:inline-flex;align-items:center;gap:7px;padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.35);background:linear-gradient(135deg, #d4a359 0%, #b8860b 100%);color:#0b0e14;font-family:monospace;font-size:12px;font-weight:800;letter-spacing:1.2px;cursor:pointer;">
                        <span class="Demo2_TabDot" style="width:5px;height:5px;border-radius:50%;background:#0b0e14;"></span>
                        <span>LUXURY CARS</span>
                      </button>
                      <button type="button" id="tabSedan" class="Demo2_SegmentTab" style="display:inline-flex;align-items:center;gap:7px;padding:8px 18px;border-radius:999px;border:1px solid transparent;background:transparent;color:rgba(255,255,255,0.65);font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1.2px;cursor:pointer;">
                        <span class="Demo2_TabDot" style="width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,0.4);"></span>
                        <span>SEDAN CARS</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Features Glass Bar -->
            <div class="Demo2_FeaturesBar">
              <div class="Demo2_FeatureItem">
                <div class="Demo2_FeatureIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="Demo2_FeatureText">
                  <h4>Reliable on Time</h4>
                  <p>Punctuality you can depend on.</p>
                </div>
              </div>

              <div class="Demo2_FeatureItem">
                <div class="Demo2_FeatureIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z"/><path d="M4 11h16a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2z"/><path d="M6 14v4a6 6 0 0 0 12 0v-4"/><line x1="12" y1="18" x2="12" y2="22"/></svg>
                </div>
                <div class="Demo2_FeatureText">
                  <h4>Professional Chauffeurs</h4>
                  <p>Experienced, trained and dedicated to you.</p>
                </div>
              </div>

              <div class="Demo2_FeatureItem">
                <div class="Demo2_FeatureIcon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9L2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                </div>
                <div class="Demo2_FeatureText">
                  <h4>Latest Fleets</h4>
                  <p>Luxury vehicles, always immaculate.</p>
                </div>
              </div>
            </div>

            <!-- Bottom Contact Strip -->
            <div class="Demo2_ContactBar">
              <div class="Demo2_ContactLeft">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <span>Proudly serving:</span>
                  <strong>Melbourne &amp; Surrounding Areas</strong>
                </div>
              </div>

              <div class="Demo2_SkylineGraphic">
                <svg width="140" height="22" viewBox="0 0 200 30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"><path d="M0 28h10V18h6V8h8v10h4V4h8v24h6V12h6v16h8V6h10v22h8V14h6v14h12V2h10v26h8V16h6v12h14V10h8v18h10V14h8v14h16V8h10v20h10"/></svg>
              </div>

              <div class="Demo2_ContactRight">
                <a href="tel:+61391234567" class="Demo2_ContactLink">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +61 3 9123 4567
                </a>
                <a href="mailto:info@melbournechauffeur.com.au" class="Demo2_ContactLink">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4a359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  info@melbournechauffeur.com.au
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    `;

    const mainRegex = /<main class="Layout_main__h283P">[\s\S]*?<\/main>/i;
    html = html.replace(mainRegex, demo2HeroHtml);
  }

  const customHead = `
  <link rel="stylesheet" href="/assets/_next/static/css/blacklane-custom.css" />
  <style>
    /* Prevent any layout shifts or gray dividers */
    hr.Divider_divider__NDhMz,
    .BookingWidget_divider__cecmo {
      flex: 0 0 1px !important;
      width: 1px !important;
      height: 38px !important;
      min-width: 1px !important;
      max-width: 1px !important;
      background: rgba(255, 255, 255, 0.25) !important;
      border: none !important;
      margin: 0 16px !important;
      padding: 0 !important;
      display: block !important;
    }
    ${isDemo2 ? `
    .Hero_hero__L3_jO {
      min-height: calc(100vh - 120px) !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      padding-bottom: 60px !important;
    }
    ` : ''}
  </style>
  `;

  // Inject mobile toggle button into header
  const mobileToggleHtml = `
    <button type="button" class="MobileMenu_toggleButton" aria-label="Toggle menu" id="mobileMenuBtn">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;
  html = html.replace('</header>', mobileToggleHtml + '</header>');

  // Desktop Top Navigation: keep ONLY Demo page 1, Demo page 2, and English (US)
  const navListRegex = /<ul class="NavigationMenu_navList__DpxWT[^>]*>[\s\S]*?<\/ul>/i;
  const cleanNavListHtml = `
    <ul class="NavigationMenu_navList__DpxWT NavigationMenu_layout-horizontal__245As" style="display: flex; align-items: center; gap: 12px;">
      <li><a class="BaseButton_baseLink__6FHbz BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN TopNav_demoBtn ${!isDemo2 ? 'TopNav_active' : ''}" href="/en/">Demo page 1</a></li>
      <li><a class="BaseButton_baseLink__6FHbz BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN TopNav_demoBtn ${isDemo2 ? 'TopNav_active' : ''}" href="/demo-2">Demo page 2</a></li>
      <li class="NavigationMenuDropdown_dropdown__nfmEJ"><button type="button" class="BaseButton_baseButton__RgDvP BaseButton_size-small__KDY96 GhostButton_ghost-button__SfQDT GhostButton_color-inverse__zLPsN NavigationMenuDropdown_dropdownTrigger__Vq_nM" aria-expanded="false">English (US)<svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" class="NavigationMenuDropdown_icon__vTaYm"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></li>
    </ul>
  `;
  html = html.replace(navListRegex, cleanNavListHtml);

  // Mobile drawer overlay: keep ONLY Demo page 1, Demo page 2, and English (US)
  const mobileDrawerHtml = `
    <div class="MobileMenu_drawer" id="mobileDrawer">
      <ul class="MobileMenu_links">
        <li><a href="/en/" style="${!isDemo2 ? 'color: #60a5fa !important; font-weight: 600;' : ''}">✨ Demo page 1 (Full Main Page)</a></li>
        <li><a href="/demo-2" style="${isDemo2 ? 'color: #60a5fa !important; font-weight: 600;' : ''}">✨ Demo page 2 (Main Banner Only)</a></li>
        <li><a href="/en/">English (US)</a></li>
      </ul>
    </div>
  `;

  const customScripts = `
  <script>
    (function() {
      // 0. Mobile Hamburger Menu Toggle
      const menuBtn = document.getElementById('mobileMenuBtn');
      const drawer = document.getElementById('mobileDrawer');
      if (menuBtn && drawer) {
        menuBtn.addEventListener('click', () => {
          drawer.classList.toggle('is-open');
          const isOpen = drawer.classList.contains('is-open');
          menuBtn.classList.toggle('is-active', isOpen);
          document.body.style.overflow = isOpen ? 'hidden' : '';
        });
      }

      // 1. Category Switcher (One Way / By the hour)
      const options = document.querySelectorAll('.SegmentedControlItem_option__qIJgI');
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          options.forEach(o => {
            const r = o.querySelector('input[type="radio"]');
            if (r) r.checked = false;
            o.classList.remove('is-active');
            o.style.background = 'transparent';
          });
          const radio = opt.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;
          opt.classList.add('is-active');
          opt.style.background = '#0f63bd';
        });
      });

      if (options[0]) {
        options[0].classList.add('is-active');
        options[0].style.background = '#0f63bd';
      }

      // 2. Date & Time interactive initializers
      const dateInput = document.querySelector('input[data-cy="date-picker-input"]');
      if (dateInput) {
        dateInput.removeAttribute('readonly');
        dateInput.value = 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }

      const timeInput = document.querySelector('input[name="pickup-location"]')?.closest('.BookingWidget_searchBar__yrr_r')?.querySelector('.Combobox_readOnly__sLWN5 input');
      if (timeInput) {
        timeInput.removeAttribute('readonly');
      }

      // 3. View Options action
      const viewBtn = document.querySelector('.BookingWidget_searchButton__0z5yQ');
      if (viewBtn) {
        viewBtn.addEventListener('click', () => {
          const pickup = document.querySelector('input[name="pickup-location"]')?.value || 'Current Location';
          const dropoff = document.querySelector('input[name="dropoff-location"]')?.value || 'Destination';
          alert('🚗 Blacklane Booking Search:\\n\\nPickup: ' + pickup + '\\nDrop-off: ' + dropoff + '\\nStatus: Finding available chauffeurs...');
        });
      }

      // 4. Scroll-Driven Sticky Cards Scale & Dim Deck Animation ("Step in. Breathe out.")
      const cards = document.querySelectorAll('.RideSection_slideWrapper__qJBLG');
      if (cards.length) {
        cards.forEach(c => {
          c.style.transformOrigin = 'top center';
          c.style.transition = 'transform 0.12s ease-out, filter 0.12s ease-out';
          c.style.willChange = 'transform, filter';
        });

        function updateStickyCards() {
          if (window.innerWidth <= 768) {
            cards.forEach(c => {
              c.style.transform = 'none';
              c.style.filter = 'none';
            });
            return;
          }
          const stickyTopBase = 180;
          for (let i = 0; i < cards.length - 1; i++) {
            const currentCard = cards[i];
            const nextCard = cards[i + 1];
            const nextRect = nextCard.getBoundingClientRect();
            const triggerDistance = 500;
            const targetTop = stickyTopBase + (i + 1) * 30;
            const diff = nextRect.top - targetTop;

            if (diff < triggerDistance && diff > 0) {
              const progress = 1 - (diff / triggerDistance);
              const scale = 1 - (progress * 0.07);
              const brightness = 1 - (progress * 0.45);
              const translateY = -progress * 16;
              currentCard.style.transform = 'scale(' + scale.toFixed(4) + ') translateY(' + translateY.toFixed(1) + 'px)';
              currentCard.style.filter = 'brightness(' + brightness.toFixed(3) + ')';
            } else if (diff <= 0) {
              const depth = cards.length - 1 - i;
              const scale = Math.max(0.86, 1 - (depth * 0.065));
              const brightness = Math.max(0.42, 1 - (depth * 0.28));
              currentCard.style.transform = 'scale(' + scale.toFixed(4) + ') translateY(-16px)';
              currentCard.style.filter = 'brightness(' + brightness.toFixed(3) + ')';
            } else {
              currentCard.style.transform = 'scale(1) translateY(0px)';
              currentCard.style.filter = 'brightness(1)';
            }
          }
        }

        window.addEventListener('scroll', () => {
          requestAnimationFrame(updateStickyCards);
        }, { passive: true });
        window.addEventListener('resize', updateStickyCards);
        updateStickyCards();

        // Mobile / Desktop touch and drag for Ride Section
        const rideTrack = document.querySelector('.RideSection_imageContainer__40TAg');
        if (rideTrack) {
          let isDownRide = false, startXRide, scrollLeftRide;
          rideTrack.addEventListener('mousedown', (e) => {
            if (window.innerWidth > 768) return;
            isDownRide = true;
            startXRide = e.pageX - rideTrack.offsetLeft;
            scrollLeftRide = rideTrack.scrollLeft;
          });
          rideTrack.addEventListener('mouseleave', () => { isDownRide = false; });
          rideTrack.addEventListener('mouseup', () => { isDownRide = false; });
          rideTrack.addEventListener('mousemove', (e) => {
            if (!isDownRide || window.innerWidth > 768) return;
            e.preventDefault();
            const x = e.pageX - rideTrack.offsetLeft;
            const walk = (x - startXRide) * 1.5;
            rideTrack.scrollLeft = scrollLeftRide - walk;
          });
        }
      }

      // 5. Carousel buttons & swipe in "Arrive at your best"
      const track = document.querySelector('.Carousel_trackViewport__O_bZ8') || document.querySelector('.Carousel_track__RC3x9');
      const prevBtn = document.querySelector('button[aria-label="Previous slide"]');
      const nextBtn = document.querySelector('button[aria-label="Next slide"]');
      if (track) {
        if (prevBtn) {
          prevBtn.removeAttribute('disabled');
          prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -300, behavior: 'smooth' });
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 300, behavior: 'smooth' });
          });
        }

        // Drag to scroll for desktop & swipe support
        let isDown = false;
        let startX, scrollLeft;
        track.addEventListener('mousedown', (e) => {
          isDown = true;
          track.style.cursor = 'grabbing';
          startX = e.pageX - track.offsetLeft;
          scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => {
          isDown = false;
          track.style.cursor = 'grab';
        });
        track.addEventListener('mouseup', () => {
          isDown = false;
          track.style.cursor = 'grab';
        });
        track.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - track.offsetLeft;
          const walk = (x - startX) * 1.5;
          track.scrollLeft = scrollLeft - walk;
        });
      }
    })();

    ${isDemo2 ? `
    <script src="/assets/_next/static/js/three-car-viewer.js" defer></script>
    ` : ''}
  `;

  html = html.replace('</head>', customHead + '</head>');
  html = html.replace('</body>', mobileDrawerHtml + customScripts + '</body>');
  return html;
}

appBlacklane.get(['/demo-2', '/demo2', '/en/demo-2', '/en/demo2'], (req, res) => {
  const html = renderBlacklaneHtml(true);
  res.type('html').send(html);
});

appBlacklane.use((req, res, next) => {
  if (req.path.startsWith('/assets/') || req.path.startsWith('/public/') || req.path.startsWith('/static.') || req.path.endsWith('.js') || req.path.endsWith('.css') || req.path.endsWith('.svg') || req.path.endsWith('.png') || req.path.endsWith('.webp') || req.path.endsWith('.jpg') || req.path.endsWith('.woff2') || req.path.endsWith('.glb') || req.path.endsWith('.wasm') || req.path.endsWith('.bin')) {
    return next();
  }
  const isDemo2 = req.path.includes('demo-2') || req.path.includes('demo2');
  const html = renderBlacklaneHtml(isDemo2);
  if (html) {
    res.type('html').send(html);
  } else {
    next();
  }
});

appBlacklane.listen(5009, () => {
  console.log('🚗 Blacklane template running at: http://localhost:5009');
});
appBlacklane.listen(50090, () => {
  console.log('🚗 Blacklane template running at: http://localhost:50090');
});
appBlacklane.listen(50092, () => {
  console.log('🚗 Blacklane template running at: http://localhost:50092');
});
appBlacklane.listen(5008, () => {
  console.log('🚗 Blacklane template running at: http://localhost:5008');
});





