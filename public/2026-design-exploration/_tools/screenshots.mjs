// Captures a desktop and a mobile screenshot of each proposal's home page (the CV)
// straight from disk, into NN-name/screenshots/.
//   node exploration/_tools/screenshots.mjs [NN-name]
// Set CHROMIUM=/path/to/chrome if Playwright's bundled browser is not installed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { pages } from './content.mjs';
import { screenshotWebp } from './webp.mjs';

const exploration = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv[2];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--disable-gpu'] });

const views = [
  { suffix: '', width: 1440, height: 900, scheme: 'light' },
  { suffix: '-mobile', width: 390, height: 844, scheme: 'light' },
];

for (const dir of fs.readdirSync(exploration).filter((d) => /^\d\d-/.test(d)).sort()) {
  if (only && only !== dir) continue;
  const out = path.join(exploration, dir, 'screenshots');
  fs.mkdirSync(out, { recursive: true });

  for (const view of views) {
    const context = await browser.newContext({
      viewport: { width: view.width, height: view.height },
      colorScheme: view.scheme,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    for (const [key, file] of [['cv', pages.cv]]) {
      await page.goto(pathToFileURL(path.join(exploration, dir, file)).href, { waitUntil: 'networkidle' });
      // Scroll-driven animations stall screenshots in headless Chromium.
      await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
      await page.evaluate(() => document.fonts.ready);
      await screenshotWebp(page, path.join(out, `${key}${view.suffix}.webp`), {}, 0.82);
    }
    await context.close();
  }
  console.log(`${dir}: screenshots done`);
}

await browser.close();
