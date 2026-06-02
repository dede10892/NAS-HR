const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4200/modules/smart-attendance', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('.reveal-stagger>*,.reveal,.reveal-up,.reveal-right').forEach(el=>el.classList.add('is-visible')));
  await page.waitForTimeout(1200);
  const hero = await page.$('.module-hero');
  await hero.screenshot({ path: 'sa-hero.png' });
  await browser.close();
})();
