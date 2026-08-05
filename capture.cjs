const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const templates = [
  { id: 'aero', url: 'http://localhost:1002' },
  { id: 'bnrmlss2', url: 'https://digifox-storedemo-gqiq.vercel.app/' },
  { id: 'drinking5d', url: 'https://digifox-onlinestore.vercel.app/' }
];

const outDir = path.join(__dirname, 'public', 'templates');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const t of templates) {
    console.log(`Capturing ${t.id} from ${t.url}...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 960 });
      await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Small delay to let animations settle
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(outDir, `${t.id}.png`) });
      console.log(`Saved ${t.id}.png`);
      await page.close();
    } catch (e) {
      console.error(`Failed to capture ${t.id}:`, e.message);
    }
  }
  await browser.close();
})();
