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

