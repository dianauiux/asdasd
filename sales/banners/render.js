const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const dir = __dirname;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 3440, height: 4300 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(dir, 'index.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  for (let i = 1; i <= 9; i++) {
    const el = await page.$('#b' + i);
    await el.screenshot({ path: path.join(dir, 'out', `banner-0${i}.png`) });
  }
  await browser.close();
  console.log('rendered 9');
})();
