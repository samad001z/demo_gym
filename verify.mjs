import { chromium } from 'playwright';
const b = await chromium.launch();
const routes = ['/', '/gyms', '/gyms/gachibowli', '/gyms/saidabad', '/about',
  '/training', '/training/womens-gym-timings', '/training/gym-membership-prices', '/nope'];
let fail = 0;

for (const rm of [false, true]) {
  for (const route of routes) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 },
      reducedMotion: rm ? 'reduce' : 'no-preference' });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(String(e).slice(0, 90)));
    await p.goto('http://localhost:4311' + route, { waitUntil: 'networkidle' });
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(90); }
    await p.waitForTimeout(700);
    const r = await p.evaluate(() => ({
      hidden: [...document.querySelectorAll('[data-reveal]')].filter(e => +getComputedStyle(e).opacity < 0.9).length,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      smallTargets: [...document.querySelectorAll('a,button')]
        .filter(e => { const b = e.getBoundingClientRect();
          return b.width > 0 && b.height > 0 && (b.height < 40) && !e.closest('nav[aria-label="Breadcrumb"],footer'); }).length,
    }));
    const bad = r.hidden || r.overflow || r.h1 !== 1 || errs.length;
    if (bad) fail++;
    console.log(`${rm?'RM':'  '} ${route.padEnd(18)} hidden:${r.hidden} overflow:${r.overflow} h1:${r.h1} smallTap:${r.smallTargets} err:${errs.length} ${bad?'<< CHECK':''}`);
    await ctx.close();
  }
}

// mobile pass
for (const route of ['/', '/gyms/saidabad']) {
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto('http://localhost:4311' + route, { waitUntil: 'networkidle' });
  await p.evaluate(() => scrollTo(0, 1400)); await p.waitForTimeout(800);
  const r = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    stickyCta: !!document.querySelector('a[href*="wa.me"]')
  }));
  console.log(`375 ${route.padEnd(18)} overflow:${r.overflow} cta:${r.stickyCta}`);
  await p.screenshot({ path: `C:/tmp/shots/final-m-${route.replace(/\W/g,'_')}.png` });
  await ctx.close();
}
await b.close();
console.log(fail ? `\n${fail} route(s) need attention` : '\nall routes clean');
