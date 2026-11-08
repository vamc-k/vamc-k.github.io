// Deterministic capture of the live ourstory page at 540x960 @2x (= 1080x1920).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = process.argv[2];
const BASE = process.env.BASE || 'http://localhost:8123/index.html';
const only = (process.argv[3]||'').split(',').filter(Boolean);
const want = n => !only.length || only.includes(n);
const sm = t => t*t*(3-2*t);

const HIDE = `
.progress{display:none!important}
.hero-timer{visibility:hidden!important}
.tap-hint{display:none!important}
`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  await p.goto(BASE, { waitUntil: 'load' });
  await p.addStyleTag({ content: HIDE });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1200);
  // RSVP wording: no phone number on screen
  await p.evaluate(() => { const a = document.querySelector('#rsvp .btn.maroon'); if (a) a.textContent = 'RSVP via the link'; });
  // freeze time-based animation so we can drive it by hand
  const driver = () => p.evaluate((t) => {
    for (const a of document.getAnimations()) {
      const n = a.constructor.name;
      if (n === 'CSSTransition') { try { a.finish(); } catch (e) {} }
      else { a.pause(); a.currentTime = t * 1000 + 9000; }
    }
  }, 0);
  const setP = async (id, pr, tms, off = 9000) => {
    await p.evaluate(([id, pr, tms, off]) => {
      const el = document.getElementById(id), r = el.offsetHeight - innerHeight;
      scrollTo(0, el.offsetTop + r * pr); sy = scrollY;
      for (const a of document.getAnimations()) {
        if (a.constructor.name === 'CSSTransition') { try { a.finish(); } catch (e) {} }
        else { a.pause(); a.currentTime = tms + off; }
      }
    }, [id, pr, tms, off]);
    await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    await p.evaluate(() => { for (const a of document.getAnimations()) if (a.constructor.name === 'CSSTransition') { try { a.finish(); } catch (e) {} } });
  };
  const seq = async (name, id, p0, p1, frames, hide, off) => {
    if (!want(name)) return;
    const dir = path.join(OUT, name); fs.mkdirSync(dir, { recursive: true });
    if (hide) await p.addStyleTag({ content: hide });
    for (let f = 0; f < frames; f++) {
      const u = frames === 1 ? 0 : f / (frames - 1);
      await setP(id, p0 + (p1 - p0) * sm(u), f / 30 * 1000, off);
      await p.screenshot({ path: path.join(dir, String(f).padStart(4, '0') + '.png') });
    }
    console.log('done', name);
  };

  // ---- HERO: title hidden (re-animated in Remotion), tower rises ----
  if (want('hero')) {
    await setP('hero', 0, 0);
    const parts = { h1a: '.hero-title h1:nth-of-type(1)', weds: '.hero-title small', h1b: '.hero-title h1:nth-of-type(2)', sub: '.hero-title p' };
    fs.mkdirSync(path.join(OUT, 'title'), { recursive: true });
    for (const [k, sel] of Object.entries(parts)) {
      const box = await p.locator(sel).first().boundingBox();
      console.log('title', k, JSON.stringify(box));
      await p.locator(sel).first().screenshot({ path: path.join(OUT, 'title', k + '.png'), omitBackground: true });
      fs.writeFileSync(path.join(OUT, 'title', k + '.json'), JSON.stringify(box));
    }
  }
  await seq('hero', 'hero', 0.0, 0.78, 150, '#heroTitle{visibility:hidden!important}');
  await seq('invite', 'invite', 0.03, 0.93, 150);
  // ---- EVENTS: backplate + 4 card cutouts ----
  if (want('events')) {
    fs.mkdirSync(path.join(OUT, 'events'), { recursive: true });
    for (let i = 0; i < 4; i++) {
      await setP('events', 0.2 + (0.76 / 4) * (i + 0.5), 0);
      await p.waitForTimeout(500);
      await p.evaluate(() => { for (const a of document.getAnimations()) if (a.constructor.name === 'CSSTransition') { try { a.finish(); } catch (e) {} } });
      const box = await p.locator('#evCard').boundingBox();
      console.log('card', i, JSON.stringify(box), await p.locator('#evTitle').textContent());
      await p.locator('#evCard').screenshot({ path: path.join(OUT, 'events', `card${i}.png`), omitBackground: true });
      fs.writeFileSync(path.join(OUT, 'events', `card${i}.json`), JSON.stringify(box));
    }
    await p.addStyleTag({ content: '#evCard{visibility:hidden!important}' });
    await setP('events', 0.5, 0);
    await p.screenshot({ path: path.join(OUT, 'events', 'back.png') });
    await p.addStyleTag({ content: '#evCard{visibility:visible!important}' });
  }
  await seq('couple', 'couple', 0.08, 0.95, 150);
  await seq('temple', 'temple', 0.14, 0.86, 80);
  await seq('opening', 'temple', 0.0, 0.27, 100);
  await seq('rsvp', 'rsvp', 0.0, 0.28, 120);
  await seq('finale', 'finale', 0.05, 0.95, 135, '.credit{visibility:hidden!important}', 400);
  await b.close();
})();
