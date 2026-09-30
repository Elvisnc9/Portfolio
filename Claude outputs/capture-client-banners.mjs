// Screenshots the three client restaurant sites (1440x900) and saves them as the
// Selected Work banners, replacing the placeholder images.
//
// Run from the project root (Playwright is not a project dependency, so --no-save):
//   npm i --no-save playwright && npx playwright install chromium
//   node "Claude outputs/capture-client-banners.mjs"
//
// Then open each file in public/images/projects/ and check it. If one looks bad
// (blank, cookie popup, loader, ugly crop), replace it with the site's logo on a
// clean brand-coloured 1440x900 background instead.
import { chromium } from 'playwright';
import sharp from 'sharp';

const sites = [
  { slug: 'kenz-sushi', url: 'https://kenzsushi.com' },
  { slug: 'resto-yulmaz', url: 'https://restoyulmazalger.com' },
  { slug: 'the-11th-floor', url: 'https://the11thfloor.co.za' },
];

const browser = await chromium.launch();
for (const { slug, url } of sites) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    // Let loaders, hero animations and lazy images settle
    await page.waitForTimeout(4000);
    const png = await page.screenshot();
    await sharp(png).webp({ quality: 82 }).toFile(`public/images/projects/${slug}.webp`);
    console.log(`saved ${slug}.webp`);
  } catch (error) {
    console.error(`${slug}: ${error.message.split('\n')[0]} (kept the placeholder)`);
  }
  await page.close();
}
await browser.close();
