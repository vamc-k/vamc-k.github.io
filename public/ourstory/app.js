/* ============================================================
   Rahul weds Kiran — scroll-driven wedding invitation
   All artwork is generated here as inline SVG / CSS.
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const ease = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const WEDDING = new Date('2026-11-21T20:52:00');

/* ---------- ART GENERATORS ---------- */
const PAL = {
  color: { base: '#e9c9a0', tiers: ['#f0a8b8', '#f6d36b', '#7fc8c0', '#8fa4f0', '#f4b27a', '#b6d77a'], trim: '#fff1c8', roof: '#e86a8a', win: ['#7a6ad8', '#e8645a', '#3fa88f', '#f2b840'], door: '#7a3b2a', fin: '#f5c542' },
  gold: { base: '#e8c36a', tiers: ['#f6dc8a', '#e6bb55', '#f2d176'], trim: '#fff0b8', roof: '#d9a640', win: ['#b8841f', '#c8963a'], door: '#9a6a14', fin: '#f9e089' },
  goldDark: { base: '#d9a640', tiers: ['#f0cf7a', '#c8963a', '#e0b45a'], trim: '#ffe9a0', roof: '#b8841f', win: ['#7a5410', '#9a6a14'], door: '#5c3a08', fin: '#f9e089' },
  line: { base: '#e9cf86', tiers: ['#f3e1a2', '#e6c875'], trim: '#c8963a', roof: '#d9b25a', win: ['#b8841f'], door: '#8a5a10', fin: '#c8963a', stroke: '#a8761a' },
};
function gopuram(pal = PAL.color, tiers = 8) {
  const cx = 100; let y = 300, w = 176, s = '';
  const st = pal.stroke ? `stroke="${pal.stroke}" stroke-width="1"` : '';
  s += `<rect x="${cx - w / 2}" y="${y - 54}" width="${w}" height="54" fill="${pal.base}" ${st}/>`;
  s += `<path d="M${cx - 18} ${y} V${y - 34} Q${cx} ${y - 50} ${cx + 18} ${y - 34} V${y}Z" fill="${pal.door}"/>`;
  for (let k = 0; k < 6; k++) s += `<rect x="${cx - w / 2 + 6 + k * 14.5}" y="${y - 48}" width="8" height="16" rx="3" fill="${pal.win[k % pal.win.length]}" opacity=".8"/>`;
  for (let k = 0; k < 6; k++) s += `<rect x="${cx + 21 + k * 14.5}" y="${y - 48}" width="8" height="16" rx="3" fill="${pal.win[(k + 1) % pal.win.length]}" opacity=".8"/>`;
  y -= 54;
  for (let i = 0; i < tiers; i++) {
    const h = 27, w2 = w - Math.min(17, 130 / tiers);
    s += `<polygon points="${cx - w / 2},${y} ${cx + w / 2},${y} ${cx + w2 / 2},${y - h} ${cx - w2 / 2},${y - h}" fill="${pal.tiers[i % pal.tiers.length]}" ${st}/>`;
    s += `<rect x="${cx - w2 / 2 - 2}" y="${y - h - 3}" width="${w2 + 4}" height="5" rx="2" fill="${pal.trim}" ${st}/>`;
    const n = Math.max(3, Math.floor(w2 / 13)), gap = (w2 - 16) / n;
    for (let k = 0; k < n; k++) {
      const x = cx - w2 / 2 + 8 + k * gap + gap / 2 - 3.5;
      s += `<rect x="${x}" y="${y - h + 6}" width="7" height="14" rx="3.5" fill="${pal.win[(i + k) % pal.win.length]}" opacity=".85"/>`;
      s += `<circle cx="${x + 3.5}" cy="${y - h + 4}" r="2" fill="${pal.fin}"/>`;
    }
    y -= h; w = w2;
  }
  s += `<rect x="${cx - w / 2}" y="${y - 22}" width="${w}" height="22" rx="11" fill="${pal.roof}" ${st}/>`;
  s += `<rect x="${cx - w / 2 + 6}" y="${y - 15}" width="${w - 12}" height="8" rx="4" fill="${pal.trim}" opacity=".7"/>`;
  y -= 22;
  const kalash = Math.max(3, Math.floor(w / 24));
  for (let k = 0; k < kalash; k++) {
    const x = cx - w / 2 + (w / (kalash)) * (k + .5);
    s += `<path d="M${x - 4} ${y} L${x} ${y - 18} L${x + 4} ${y}Z" fill="${pal.fin}" ${st}/><circle cx="${x}" cy="${y - 20}" r="2.2" fill="${pal.fin}"/>`;
  }
  return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

function cloud(w, fill = '#fff') {
  return `<svg viewBox="0 0 220 90" width="${w}" xmlns="http://www.w3.org/2000/svg"><g fill="${fill}">
  <circle cx="60" cy="58" r="30"/><circle cx="100" cy="40" r="36"/><circle cx="144" cy="52" r="30"/><circle cx="178" cy="62" r="22"/><circle cx="34" cy="66" r="20"/>
  <rect x="30" y="58" width="170" height="30" rx="15"/></g></svg>`;
}

const ARCH_PATH = 'M0 500 L0 190 C60 190 70 120 110 110 C150 100 150 60 170 40 C185 25 195 10 200 0 C205 10 215 25 230 40 C250 60 250 100 290 110 C330 120 340 190 400 190 L400 500 Z';
function archSVG(fill = '#fbf2d6', stroke = '#d9b25a') {
  return `<svg class="arch-bg" viewBox="0 0 400 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${ARCH_PATH}" fill="${fill}" stroke="${stroke}" stroke-width="5" vector-effect="non-scaling-stroke"/>
  <path d="${ARCH_PATH}" fill="none" stroke="${stroke}" stroke-width="1.5" transform="translate(200 250) scale(.93) translate(-200 -250)" opacity=".6" vector-effect="non-scaling-stroke"/></svg>`;
}

function coupleSVG() {
  return `<svg viewBox="0 0 300 430" xmlns="http://www.w3.org/2000/svg">
  <!-- bride -->
  <path d="M62 178 Q56 150 84 142 L130 142 Q150 150 146 178 L168 428 L36 428Z" fill="#f08a2c"/>
  <path d="M40 392 L166 392 L168 428 L36 428Z" fill="#e05a1a"/>
  <path d="M38 404 H168" stroke="#f7d36b" stroke-width="5" stroke-dasharray="8 4"/>
  <path d="M82 142 L130 142 L124 186 L90 186Z" fill="#2f9a6a"/>
  <rect x="96" y="124" width="22" height="22" rx="8" fill="#b97a50"/>
  <circle cx="107" cy="100" r="31" fill="#b97a50"/>
  <path d="M74 96 Q76 62 108 62 Q140 62 140 96 Q124 78 108 78 Q90 78 74 96Z" fill="#1b1210"/>
  <circle cx="118" cy="56" r="17" fill="#1b1210"/><circle cx="118" cy="56" r="14" fill="none" stroke="#f6e9a0" stroke-width="5" stroke-dasharray="3 5"/>
  <circle cx="124" cy="104" r="2.5" fill="#2a1a12"/><circle cx="140" cy="104" r="0"/><path d="M118 118 Q124 122 130 118" stroke="#8a3a2a" stroke-width="2.2" fill="none"/>
  <circle cx="120" cy="86" r="3" fill="#e8442e"/>
  <!-- groom -->
  <path d="M176 424 L184 255 L270 255 L276 424Z" fill="#fffaf0"/>
  <path d="M178 400 H274" stroke="#d9a640" stroke-width="7"/><path d="M178 416 H274" stroke="#d9a640" stroke-width="3"/>
  <path d="M186 150 Q180 140 198 138 L258 138 Q276 140 270 150 L276 270 L180 270Z" fill="#fffaf0"/>
  <path d="M222 140 V270" stroke="#e8dcb8" stroke-width="2"/>
  <rect x="210" y="122" width="24" height="22" rx="8" fill="#d6a074"/>
  <circle cx="222" cy="98" r="32" fill="#d6a074"/>
  <path d="M190 96 Q190 62 224 62 Q256 62 254 94 Q240 76 222 78 Q204 78 190 96Z" fill="#17100c"/>
  <circle cx="208" cy="102" r="2.5" fill="#2a1a12"/><path d="M212 116 Q222 122 232 116" stroke="#8a3a2a" stroke-width="2.2" fill="none"/>
  <!-- garlands -->
  <g>${garland2(70, 148, 140, 12, ['#f6c542', '#f08a2c', '#fff'])}${garland2(184, 146, 80, 12, ['#fff', '#f26b8a', '#f6c542'])}</g>
  <path d="M140 188 Q172 230 200 188" stroke="#f08a2c" stroke-width="9" fill="none" stroke-dasharray="1 9" stroke-linecap="round"/>
  <path d="M132 192 Q166 244 206 192" stroke="#f6c542" stroke-width="9" fill="none" stroke-dasharray="1 9" stroke-linecap="round"/>
  </svg>`;
}
function garland2(x, y, w, n, cols) {
  let s = '';
  for (let i = 0; i < n; i++) { const t = i / (n - 1); s += `<circle cx="${x + t * w}" cy="${y + Math.sin(t * Math.PI) * 28}" r="6" fill="${cols[i % cols.length]}"/>`; }
  return s;
}

function pillarSVG(side) {
  const figs = [['#f06a8a', '#7a8ff0'], ['#f6c542', '#e8645a'], ['#6ec6b8', '#f06a8a'], ['#7a8ff0', '#f6c542']];
  let s = `<rect width="100" height="800" fill="#f7e6b4" preserveAspectRatio="none"/>`;
  for (let i = 0; i < 10; i++) {
    const y = i * 82 + 6, c = figs[i % 4];
    s += `<rect x="6" y="${y}" width="88" height="74" rx="${i % 2 ? 6 : 30}" fill="${c[1]}" opacity=".35"/>`;
    s += `<rect x="6" y="${y}" width="88" height="74" rx="${i % 2 ? 6 : 30}" fill="none" stroke="#d9a640" stroke-width="2"/>`;
    s += `<circle cx="50" cy="${y + 22}" r="9" fill="#c98a5a"/><path d="M36 ${y + 70} L40 ${y + 34} Q50 ${y + 28} 60 ${y + 34} L64 ${y + 70}Z" fill="${c[0]}"/>`;
    s += `<path d="M40 ${y + 44} H60" stroke="#f6d36b" stroke-width="4"/><circle cx="50" cy="${y + 14}" r="12" fill="none" stroke="#f6d36b" stroke-width="2" stroke-dasharray="3 3"/>`;
  }
  const fade = side === 'left' ? 'to right' : 'to left';
  return `<svg viewBox="0 0 100 800" preserveAspectRatio="xMidYMin slice"><defs><linearGradient id="pf${side}" x1="0" x2="1" y1="0" y2="0">
  <stop offset="${side === 'left' ? 0.7 : 0}" stop-color="#fbf2d6" stop-opacity="${side === 'left' ? 0 : 1}"/><stop offset="1" stop-color="#fbf2d6" stop-opacity="${side === 'left' ? 1 : 0}"/></linearGradient></defs>
  ${s}<rect width="100" height="800" fill="url(#pf${side})"/></svg>`;
}

function shrineSVG() {
  const cols = ['#f0a8b8', '#f6d36b', '#7fc8c0', '#8fa4f0'];
  let s = `<rect x="0" y="190" width="800" height="150" fill="#f1d9e6"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${i * 128} 340 V230 Q${i * 128 + 54} 190 ${i * 128 + 108} 230 V340Z" fill="${cols[i % 4]}" opacity=".85"/>`;
  [0, 1, 2, 3, 4].forEach(i => {
    const r = 190 - i * 28; s += `<path d="M${400 - r} 200 Q${400 - r} ${200 - r * 1.25} 400 ${200 - r * 1.5} Q${400 + r} ${200 - r * 1.25} ${400 + r} 200Z" fill="${cols[i % 4]}" stroke="#fff6d6" stroke-width="5"/>`;
  });
  s += `<path d="M330 200 Q330 100 400 70 Q470 100 470 200Z" fill="#fde7a4"/><circle cx="400" cy="130" r="22" fill="#c8963a"/>`;
  s += `<rect x="0" y="330" width="800" height="30" fill="#e8b85c"/>`;
  return `<svg viewBox="0 0 800 360" width="100%" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

function friezeSVG() {
  const cols = ['#f0a8b8', '#f6d36b', '#7fc8c0', '#8fa4f0', '#f4b27a'];
  let s = `<rect y="60" width="1600" height="240" fill="#e9f3f6"/>`;
  for (let i = 0; i < 40; i++) {
    const x = i * 40; s += `<rect x="${x + 4}" y="${90 + (i % 3) * 8}" width="32" height="${150 - (i % 3) * 8}" fill="${cols[i % 5]}" opacity=".85"/>
    <path d="M${x + 4} ${96 + (i % 3) * 8} Q${x + 20} ${60 + (i % 3) * 8} ${x + 36} ${96 + (i % 3) * 8}Z" fill="${cols[(i + 2) % 5]}"/>`;
  }
  s += `<rect y="240" width="1600" height="60" fill="#fbf3dd"/>`;
  for (let i = 0; i < 40; i++) s += `<rect x="${i * 40 + 6}" y="250" width="28" height="40" rx="3" fill="${cols[(i + 1) % 5]}" opacity=".7"/>`;
  return `<svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

function leafSVG(flip) {
  return `<svg viewBox="0 0 220 520" style="${flip ? 'transform:scaleX(-1)' : ''}" xmlns="http://www.w3.org/2000/svg">
  <g>${[[30, 20, -30], [90, 0, -8], [150, 30, 20]].map(([x, y, r]) => `<path d="M${x + 40} 330 Q${x - 30} 160 ${x + 30} ${y} Q${x + 130} 150 ${x + 40} 330Z" fill="#8cc23a" transform="rotate(${r} ${x + 40} 330)"/><path d="M${x + 40} 330 Q${x + 38} 150 ${x + 30} ${y + 10}" stroke="#5e9a22" stroke-width="3" fill="none" transform="rotate(${r} ${x + 40} 330)"/>`).join('')}</g>
  <path d="M60 520 L70 330 L150 330 L160 520Z" fill="#e0a830"/><ellipse cx="110" cy="330" rx="48" ry="12" fill="#f6d36b"/>
  <path d="M96 330 Q110 250 124 330Z" fill="#fff3c0"/><circle cx="110" cy="286" r="6" fill="#ff9a2c"/>
  <circle cx="60" cy="480" r="22" fill="#f7b6cc"/><circle cx="60" cy="480" r="10" fill="#fff"/><circle cx="170" cy="490" r="20" fill="#f7b6cc"/></svg>`;
}

function gateSVG() {
  const g = '#e2b24a', gd = '#b8841f';
  let s = `<rect y="120" width="1600" height="180" fill="#f9e8b0"/><rect y="120" width="1600" height="16" fill="${g}"/>`;
  for (let i = 0; i < 24; i++) s += `<path d="M${i * 66 + 6} 300 V190 Q${i * 66 + 33} 150 ${i * 66 + 60} 190 V300Z" fill="${i % 2 ? '#fbf3d6' : '#f2d98a'}" stroke="${gd}" stroke-width="2"/>`;
  s += `<rect x="640" y="30" width="320" height="270" fill="${g}" stroke="${gd}" stroke-width="3"/><path d="M700 300 V130 Q800 40 900 130 V300Z" fill="#fff6d4" stroke="${gd}" stroke-width="3"/>`;
  s += `<path d="M620 30 Q800 -30 980 30Z" fill="${gd}"/>`;
  return `<svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
}

const PHOTOS = { haldi: ['haldi', '50% 30%'], pelli: ['pelli', '50% 62%'], wedding: ['wedding', '50% 72%'], vratam: ['vratam', '50% 58%'], frame: ['frame', '50% 30%'],
  p1: ['p1', '50% 30%'], p2: ['p2', '50% 30%'], p3: ['p3', '50% 30%'], p4: ['p4', '50% 30%'], p5: ['p5', '50% 40%'], p6: ['p6', '50% 40%'], p7: ['p7', '50% 30%'], p8: ['p8', '50% 30%'] };
function photoSVG(kind) {
  if (PHOTOS[kind]) return `<img src="assets/photos/${PHOTOS[kind][0]}.jpg" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:${PHOTOS[kind][1]};display:block">`;
  const bg = { mehendi: ['#d8ddb0', '#f3e8c0'], haldi: ['#fbe08a', '#f6b64a'], sangeet: ['#c9b6f0', '#f7c6dc'], wedding: ['#f7d9a0', '#e98a5a'], frame: ['#f1c9a0', '#cfe1ef'], pol: ['#f6d9b0', '#d6e8c0'] }[kind] || ['#ddd', '#eee'];
  return `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g${kind}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs>
  <rect width="300" height="400" fill="url(#g${kind})"/>
  <circle cx="240" cy="70" r="40" fill="#fff" opacity=".35"/>
  <path d="M0 330 Q150 290 300 330 V400 H0Z" fill="#fff" opacity=".35"/>
  <g transform="translate(40 120) scale(.75)">${coupleSVG().replace(/<svg[^>]*>|<\/svg>/g, '')}</g></svg>`;
}

/* ---------- BUILD STATIC ART ---------- */
(function build() {
  const $ = (sel, r = document) => r.querySelector(sel) || { set innerHTML(v) {}, insertAdjacentHTML() {}, style: {}, classList: { toggle() {} } };
  $('#heroTower').innerHTML = '<img src="assets/tower-hero.png" alt="">';
  $('#wallTower').innerHTML = '<img src="assets/tower-hero.png" alt="">';
  $('#goldTower').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#goldL').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#goldR').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#finTower').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#tL').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#tM').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#tR').innerHTML = '<img src="assets/tower-gold.png" alt="">';
  $('#pL').innerHTML = gopuram(PAL.goldDark, 10);
  $('#pR').innerHTML = gopuram(PAL.goldDark, 10);
  $$('.tower.s').forEach(t => t.innerHTML = gopuram(PAL.line, 6));
  $('#shrine').innerHTML = shrineSVG();
  $('#frieze').innerHTML = friezeSVG();
  $('#leafL').innerHTML = leafSVG(false);
  $('#leafR').innerHTML = leafSVG(true);
  $('#coupleFig').innerHTML = '<img src="assets/couple.png?v=3" alt="Vamsi Krishna and Mounika">';
  $('#pilL').innerHTML = pillarSVG('left');
  $('#pilR').innerHTML = pillarSVG('right');
    $('#gateRow').innerHTML = gateSVG();
  $('#gate').innerHTML = gateSVG();
  $('#frameImg').innerHTML = photoSVG('frame');
  $$('.arch.big, .arch.med').forEach(a => a.insertAdjacentHTML('afterbegin', archSVG()));

  // garland swags
  let g = '';
  for (let k = 0; k < 4; k++) {
    const x0 = k * 300, x1 = x0 + 300;
    g += `<path d="M${x0} 18 Q${(x0 + x1) / 2} 130 ${x1} 18" stroke="#6fa83a" stroke-width="5" fill="none"/>`;
    for (let i = 0; i <= 22; i++) {
      const t = i / 22, x = x0 + t * 300, y = (1 - t) * (1 - t) * 18 + 2 * t * (1 - t) * 130 + t * t * 18;
      g += `<circle cx="${x}" cy="${y}" r="9" fill="${['#f7c93c', '#f59a2c', '#fff3c4'][i % 3]}"/>`;
      if (i % 4 === 0) g += `<path d="M${x} ${y + 8} v22" stroke="#f7c93c" stroke-width="3"/><circle cx="${x}" cy="${y + 32}" r="5" fill="#f08a2c"/>`;
    }
  }
  $('#garland').innerHTML = g;

  // clouds
  [['#heroClouds', '#fff', [[8, 12, 18], [62, 30, 22], [76, 8, 14], [-4, 62, 20]]], ['#paperClouds', '#fff4cf', [[6, 18, 16], [78, 62, 14], [58, 8, 12]]]].forEach(([sel, fill, list]) => {
    $(sel).innerHTML = list.map(([x, y, w]) => `<div class="cloud" style="left:${x}vw;top:${y}vh">${cloud(w + 'vw', fill)}</div>`).join('');
  });

  // events
  for (let i = 0; i < 4; i++) $('#evDots').insertAdjacentHTML('beforeend', '<i></i>');
})();

/* ---------- EVENTS DATA ---------- */
var EVENTS = [
  { t: 'Haldi', d: '20 November 2026', tm: '9:00 AM', p: 'Raynah Garden, Vijayawada', desc: 'A bright, joyful morning of turmeric, laughter and blessings.', k: 'haldi', q: 'https://maps.app.goo.gl/NDzBPQgFcXXcCcyJA?g_st=ic' },
  { t: 'Pellikoduku', d: '21 November 2026', tm: '9:00 AM', p: 'Navya Meadows, Penamaluru', desc: 'The groom-to-be is blessed by family before the big day.', k: 'pelli', q: 'https://maps.app.goo.gl/MCpLRMx6URGADayY6?g_st=ic' },
  { t: 'Wedding', d: '21 November 2026', tm: '8:52 PM', p: 'Anne Aruna Convention, Kanuru', desc: 'The auspicious muhurtham — join us as we take our vows.', k: 'wedding', q: 'https://maps.app.goo.gl/4MRR5SQ5H8LZ5GY97?g_st=ic' },
  { t: 'Vratam', d: '22 November 2026', tm: '9:00 AM', p: 'Navya Meadows, Penamaluru', desc: 'A sacred ritual to bless the newly-wed couple.', k: 'vratam', q: 'https://maps.app.goo.gl/MCpLRMx6URGADayY6?g_st=ic' },
];
let evShown = -1;
function showEvent(i) {
  const e = EVENTS[i];
  if (!e || i === evShown) return; evShown = i;
  const card = $('#evCard');
  card.style.opacity = 0; card.style.transform = 'translateY(10px)';
  setTimeout(() => {
    $('#evTitle').textContent = e.t; $('#evDate').textContent = e.d; $('#evTime').textContent = e.tm;
    $('#evPlace').textContent = e.p; $('#evDesc').textContent = e.desc; $('#evPhoto').innerHTML = photoSVG(e.k); $('#evCard .btn').href = e.q;
    card.style.opacity = 1; card.style.transform = 'none';
  }, 220);
  $$('#evDots i').forEach((d, k) => d.classList.toggle('on', k === i));
}

/* ---------- SCROLL ENGINE ---------- */
const scenes = $$('.scene').map(el => {
  const h = +el.dataset.h; el.style.height = h + 'vh';
  return { el, id: el.id, p: 0 };
});
let sy = scrollY;

const U = {
  hero(p) {
    const t = ease(seg(p, 0, .75));
    $('#heroTitle').style.opacity = 1 - seg(p, .05, .3);
    $('#heroTitle').style.transform = `translateY(${-seg(p, 0, .3) * 18}vh)`;
    const tw = $('#heroTower');
    tw.style.transform = `translate(-50%, ${lerp(30, -4, t)}%) scale(${lerp(.55, 2.3, t)})`;
    const tr = seg(p, .3, .65);
    $('#treeL').style.opacity = tr; $('#treeR').style.opacity = tr;
    $('#treeL').style.transform = `translateX(${(1 - tr) * -20}vw)`;
    $('#treeR').style.transform = `translateX(${(1 - tr) * 20}vw)`;
    $$('#heroClouds .cloud').forEach((c, i) => c.style.transform = `translate(${p * (i % 2 ? -30 : 30)}vw, ${-p * 10 * (i + 1)}vh)`);
  },
  wall(p) { if (!$('#wallTop')) return;
    $('#wallTop').style.transform = `translateY(${-p * 8}vh)`;
    $('#shrine').style.transform = `translateX(-50%) translateY(${(1 - ease(seg(p, 0, .6))) * 30}vh) scale(${lerp(.9, 1.06, p)})`;
    $('#garland').style.transform = `translateY(${-p * 6}vh)`;
  },
  invite(p) {
    const a = seg(p, .05, .18) * (1 - seg(p, .42, .52));
    $('#ibA').style.opacity = a; $('#ibA').style.transform = `translate(-50%, calc(-50% + ${(1 - seg(p, .05, .2)) * 30 - seg(p, .42, .52) * 30}px))`;
    const b = seg(p, .56, .7) * (1 - seg(p, .94, 1));
    $('#ibB').style.opacity = b; $('#ibB').style.transform = `translate(-50%, calc(-50% + ${(1 - seg(p, .56, .72)) * 40}px))`;
    $('#pilL').style.transform = `translateX(${-(1 - seg(p, 0, .12)) * 20}vw)`;
    $('#pilR').style.transform = `translateX(${(1 - seg(p, 0, .12)) * 20}vw)`;
    $('#inviteArch').style.transform = `scale(${1.18 - seg(p, 0, .5) * .18 + seg(p, .6, 1) * .1})`;
  },
  events(p) {
    const intro = seg(p, 0, .06) * (1 - seg(p, .97, 1));
    $('#evIntro').style.opacity = intro; $('#evIntro').style.transform = `translateY(${(1 - seg(p, 0, .06)) * 20}px)`;
    const f = ease(seg(p, .04, .16));
    $('#evFrame').style.opacity = Math.min(1, f * 1.5) * (1 - seg(p, .97, 1));
    $('#evFrame').style.transform = `translateY(${(1 - f) * 60}vh)`;
    const idx = clamp(Math.floor(seg(p, .2, .96) * EVENTS.length), 0, EVENTS.length - 1);
    showEvent(idx);
  },
  couple(p) {
    const t = ease(seg(p, 0, .5));
    $('#goldTower').style.transform = `translate(-50%, ${lerp(60, 14, t)}%) scale(${lerp(.8, 1.7, t)})`;
    $('#goldL').style.transform = `translate(-50%, ${lerp(80, 6, t)}%) translateX(${lerp(-60, -240, t)}%)`;
    $('#goldR').style.transform = `translate(-50%, ${lerp(80, 6, t)}%) translateX(${lerp(60, 240, t)}%)`;
    const cf = ease(seg(p, .1, .5));
    $('#coupleFig').style.transform = `translate(-50%, ${lerp(100, 0, cf)}%) scale(${lerp(.6, 1, cf) + seg(p, .55, 1) * .06})`;
    $('#mandap').style.opacity = seg(p, .55, .85);
    const hn = $('#petalHint'); if (hn) hn.classList.toggle('show', p > .62 && p < .97 && !hn.dataset.done);
    $('#goldTower').style.opacity = 1 - seg(p, .5, .75);
    $$('#paperClouds .cloud').forEach((c, i) => c.style.transform = `translate(${p * (i % 2 ? -20 : 20)}vw, ${-p * 6}vh)`);
  },
  story(p) { if (!$('#storyArch')) return;
    const t = ease(seg(p, 0, .5));
    $('#storyArch').style.transform = `translateX(-50%) translateY(${(1 - t) * 90}vh)`;
    $('#cam').style.transform = `rotate(${-18 + p * 10}deg) translateY(${-p * 8}vh)`;
    $('#lan').style.transform = `translateY(${Math.sin(p * 12) * 6 - p * 6}vh)`;
    $('.arch-in', $('#storyArch')).style.opacity = seg(p, .3, .6);
  },
  temple(p) {
    const f = ease(seg(p, 0, .25));
    $('#photoFrame').style.transform = `translateX(-50%) translateY(${(1 - f) * -60 - seg(p, .35, .6) * 90}vh) rotate(${(1 - f) * -6}deg)`;
    ['tL', 'tM', 'tR'].forEach((id, i) => $('#' + id).style.transform = `translateX(-50%) translateY(${(1 - f) * 40 + seg(p, .35, .6) * 40}vh)`);
    $('#pano').style.transform = `translateY(${(1 - ease(seg(p, .4, .85))) * 105}%)`;
    $$('.tower.xl').forEach(t => t.style.transform = `translateX(-50%) scale(${lerp(.8, 1, seg(p, .5, 1))})`);
  },
  rsvp(p) {
    $('#lotusBand').style.transform = `translateY(${-(1 - seg(p, 0, .12)) * 100}%)`;
    const t = ease(seg(p, 0, .2));
    $('#rsvpArch').style.transform = `translateX(-50%) translateY(${(1 - t) * 100}vh)`;
    $('#gate').style.transform = `translateY(${(1 - seg(p, .5, .9)) * 60}%)`;
    const i = p < .5 ? 1 : 3;
    [1, 3].forEach(n => $('#sl' + n).classList.toggle('on', n === i));
  },
  count(p) {
    $('#countWrap').style.opacity = seg(p, 0, .15) * (1 - seg(p, .88, 1));
    $('#countWrap').style.transform = `translateY(${(1 - seg(p, 0, .15)) * 40}px)`;
  },
  finale(p) {
    const t = ease(seg(p, 0, .75));
    $('#mL').style.transform = `translateY(${(1 - t) * 90}%)`;
    $('#mR').style.transform = `translateY(${(1 - t) * 90}%)`;
    $('#finTower').style.transform = `translate(-50%, ${(1 - ease(seg(p, .1, .85))) * 110}%)`;
    $('#finTower').style.opacity = 1;
    $('.credit').style.opacity = 1 - seg(p, .35, .6) * 0.0;
    $('.credit').style.transform = `translateY(${-seg(p, 0, 1) * 4}vh)`;
  },
};

function frame() {
  sy += (scrollY - sy) * .14;
  const vh = innerHeight;
  scenes.forEach(s => {
    const r = s.el.getBoundingClientRect();
    // use smoothed scroll: shift by delta
    const top = r.top + (scrollY - sy);
    const range = r.height - vh;
    const p = clamp(-top / range);
    const near = top < vh * 1.2 && top + r.height > -vh * .2;
    if (near && Math.abs(p - s.p) > .00005 || s.first === undefined) { s.p = p; s.first = 1; U[s.id] && U[s.id](p); }
  });
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#bar').style.width = (sy / max * 100) + '%';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- COUNTDOWN ---------- */
let tickFirst = true;
function tick() {
  let d = Math.max(0, WEDDING - new Date());
  const day = Math.floor(d / 864e5); d -= day * 864e5;
  const h = Math.floor(d / 36e5); d -= h * 36e5;
  const m = Math.floor(d / 6e4); d -= m * 6e4;
  const s = Math.floor(d / 1e3);
  const f = n => String(n).padStart(2, '0');
  const set = (id, v) => {
    const el = $('#' + id);
    if (!el || el.textContent === v) return;
    el.textContent = v;
    if (!tickFirst) el.animate([{ transform: 'rotateX(-90deg)', opacity: 0 }, { transform: 'rotateX(0deg)', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.8,.3,1)' });
  };
  set('cd', f(day)); set('ch', f(h)); set('cm', f(m)); set('cs', f(s));
  set('hd', f(day)); set('hh', f(h)); set('hm', f(m)); set('hs', f(s));
  tickFirst = false;
}
tick(); setInterval(tick, 1000);

/* ---------- MAGIC: polaroid burst ---------- */
function polaroid(kind) {
  const el = document.createElement('div'); el.className = 'pol'; el.innerHTML = photoSVG(kind); return el;
}
$('#magic').addEventListener('click', () => {
  const box = $('#polaroids'), kinds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p1'];
  for (let i = 0; i < 9; i++) {
    const el = polaroid(kinds[i % kinds.length]); box.appendChild(el);
    const dx = (Math.random() - .5) * innerWidth * .7, dy = -(innerHeight * (.35 + Math.random() * .55));
    const rot = (Math.random() - .5) * 60;
    el.animate([
      { transform: 'translate(-50%,0) scale(.3) rotate(0deg)', opacity: 0 },
      { transform: `translate(calc(-50% + ${dx * .6}px), ${dy * .7}px) scale(1.05) rotate(${rot}deg)`, opacity: 1, offset: .5 },
      { transform: `translate(calc(-50% + ${dx}px), ${dy}px) scale(.9) rotate(${rot * 1.4}deg)`, opacity: 0 },
    ], { duration: 2200 + Math.random() * 800, delay: i * 90, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => el.remove();
  }
  setTimeout(() => $('#finale').scrollIntoView({ behavior: 'smooth' }), 1300);
});

/* falling polaroids in the finale: random spot, size, speed, tilt and sway on every drop.
   Tap a card and it pops into 4 more cards (random photos from the same 9) that join the fall. */
(function () {
  const box = $('#fall'), kinds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p2']; // the same 9 photos
  const rnd = (a, b) => a + Math.random() * (b - a);
  const MAX_EXTRA = 28;
  const sizeFor = () => rnd(9, 15) * (innerWidth < 700 ? 1.7 : 1);

  // regular cards: respawn forever at a fresh random spot
  function drop(el, first) {
    const size = sizeFor(), wide = innerWidth;
    const sway = rnd(-8, 8) * (wide / 100);
    const r0 = rnd(-28, 28), r1 = r0 + rnd(-40, 40);
    const dur = rnd(9000, 17000);
    el.style.left = rnd(2, 90) + '%'; el.style.top = '';
    el.style.width = `min(${size}vh, ${size * 1.3}vw)`;
    el.style.zIndex = Math.round(size);
    const startY = first ? rnd(-10, 100) : -25;
    const anim = el.animate([
      { transform: `translate(0, ${startY}vh) rotate(${r0}deg)`, opacity: first ? 1 : 0 },
      { opacity: 1, offset: .06 },
      { transform: `translate(${sway}px, 125vh) rotate(${r1}deg)`, opacity: 1 }
    ], { duration: first ? dur * (1.25 - startY / 100) : dur, easing: 'linear', fill: 'forwards', delay: first ? 0 : rnd(0, 6000) });
    anim.onfinish = () => { anim.cancel(); drop(el, false); };
  }

  // extra cards: burst out of the tapped card, then fall once and disappear
  function burst(cx, cy) {
    for (let i = 0; i < 4; i++) {
      const el = polaroid(kinds[Math.floor(Math.random() * kinds.length)]);
      el.classList.add('extra');
      const size = sizeFor();
      el.style.width = `min(${size}vh, ${size * 1.3}vw)`;
      el.style.zIndex = 50 + Math.round(size);
      el.style.left = cx + 'px'; el.style.top = cy + 'px';
      box.appendChild(el);
      const ang = (i / 4) * Math.PI * 2 + rnd(-.5, .5), dist = rnd(60, 150);
      const bx = Math.cos(ang) * dist, by = Math.sin(ang) * dist - 30;
      const r0 = rnd(-35, 35), sway = rnd(-6, 6) * (innerWidth / 100);
      const fall = innerHeight - cy + 220;
      const dur = rnd(5500, 9000);
      const a = el.animate([
        { transform: 'translate(-50%,-50%) scale(.3) rotate(0deg)', opacity: 0 },
        { transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px)) scale(1.08) rotate(${r0}deg)`, opacity: 1, offset: .08 },
        { transform: `translate(calc(-50% + ${bx + sway}px), calc(-50% + ${by + fall}px)) scale(1) rotate(${r0 + rnd(-30, 30)}deg)`, opacity: 1 }
      ], { duration: dur, easing: 'cubic-bezier(.25,.1,.4,1)', fill: 'forwards' });
      a.onfinish = () => el.remove();
    }
    // keep the page light: drop the oldest extras if too many
    const extras = box.querySelectorAll('.extra');
    for (let i = 0; i < extras.length - MAX_EXTRA; i++) extras[i].remove();
  }

  box.addEventListener('click', e => {
    const card = e.target.closest('.pol'); if (!card) return;
    const r = card.getBoundingClientRect(), b = box.getBoundingClientRect();
    burst(r.left - b.left + r.width / 2, r.top - b.top + r.height / 2);
    // little pop on the tapped card
    card.animate([{ filter: 'brightness(1.25)' }, { filter: 'brightness(1)' }], { duration: 250 });
  });

  kinds.forEach(k => { const el = polaroid(k); box.appendChild(el); drop(el, true); });
})();


/* =====================  INTERACTIONS  ===================== */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rr = (a, b) => a + Math.random() * (b - a);

/* 1 · Petal shower: tap anywhere on the couple scene */
(function () {
  const stage = $('#coupleStage'), box = $('#petals'), hint = $('#petalHint');
  if (!stage || !box) return;
  function shower(cx) {
    const n = REDUCED ? 14 : 44;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('i');
      el.className = 'petal ' + (Math.random() < .55 ? 'jas' : 'mar');
      const sz = rr(10, 22);
      el.style.width = sz + 'px'; el.style.height = sz * 1.3 + 'px';
      el.style.left = clamp(cx * innerWidth + rr(-.35, .35) * innerWidth, 0, innerWidth) + 'px';
      box.appendChild(el);
      const sw1 = rr(-90, 90), sw2 = rr(-90, 90), rot = rr(180, 720) * (Math.random() < .5 ? -1 : 1);
      const a = el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 0 },
        { opacity: 1, offset: .08 },
        { transform: `translate(${sw1}px, ${innerHeight * .5}px) rotate(${rot * .5}deg)`, offset: .5 },
        { transform: `translate(${sw2}px, ${innerHeight * 1.12}px) rotate(${rot}deg)`, opacity: .9 }
      ], { duration: rr(4200, 8200), delay: rr(0, 1600), easing: 'ease-in', fill: 'both' });
      a.onfinish = () => el.remove();
    }
  }
  // Tap or click ANYWHERE in the couple section. A swipe/scroll gesture does not count as a tap.
  const area = $('#couple') || stage;
  let down = null;
  area.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; }, { passive: true });
  area.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t;
    down = null;
    if (moved > 14 || dt > 700) return;
    shower(e.clientX / innerWidth);
    if (hint) { hint.dataset.done = '1'; hint.classList.remove('show'); }
  });
  area.addEventListener('pointercancel', () => { down = null; });
})();

/* 2 · Flickering lamp glows over the mandap artwork */
(function () {
  const box = $('#glowBox'); if (!box) return;
  // flame positions in the 2000x1116 artwork: [x, y, radius]
  const flames = [[225, 448, 150], [330, 592, 100], [425, 532, 95], [1775, 448, 150], [1670, 592, 100], [1575, 528, 95], [160, 440, 80], [1850, 445, 80]];
  flames.forEach(([x, y, r], i) => {
    const el = document.createElement('i'); el.className = 'flame';
    el.style.left = (x / 20) + '%'; el.style.top = (y / 11.16) + '%'; el.style.width = (r / 20) + '%';
    el.style.setProperty('--d', rr(1.1, 2.2).toFixed(2) + 's'); el.style.setProperty('--dl', (-rr(0, 2)).toFixed(2) + 's');
    box.appendChild(el);
  });
})();

/* 3 · Tilt / mouse parallax (phones: gyroscope, laptops: mouse) */
(function () {
  if (REDUCED) return;
  const root = document.documentElement;
  let gx = 0, gy = 0, tx = 0, ty = 0, lx = 9, ly = 9;
  addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; gx = (e.clientX / innerWidth - .5) * 2; gy = (e.clientY / innerHeight - .5) * 2; }, { passive: true });
  const onOri = e => { if (e.gamma == null) return; gx = clamp(e.gamma / 22, -1, 1); gy = clamp((e.beta - 50) / 22, -1, 1); };
  if (typeof DeviceOrientationEvent !== 'undefined') {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS: needs a tap to ask permission
      addEventListener('click', () => DeviceOrientationEvent.requestPermission().then(r => { if (r === 'granted') addEventListener('deviceorientation', onOri); }).catch(() => {}), { once: true });
    } else addEventListener('deviceorientation', onOri);
  }
  (function loop() {
    tx += (gx - tx) * .08; ty += (gy - ty) * .08;
    if (Math.abs(tx - lx) > .002 || Math.abs(ty - ly) > .002) {
      root.style.setProperty('--tx', tx.toFixed(3)); root.style.setProperty('--ty', ty.toFixed(3)); lx = tx; ly = ty;
    }
    requestAnimationFrame(loop);
  })();
})();

/* 5 · Heart burst on RSVP buttons */
document.addEventListener('click', e => {
  const b = e.target.closest('#rsvp .btn'); if (!b) return;
  const r = b.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const n = REDUCED ? 6 : 16, cols = ['#e7799a', '#f2a6c0', '#d94f7a', '#f7c1d2', '#c8963a'];
  for (let i = 0; i < n; i++) {
    const h = document.createElement('span'); h.className = 'heart-fx'; h.textContent = '♥';
    h.style.left = x + 'px'; h.style.top = y + 'px'; h.style.color = cols[i % cols.length]; h.style.fontSize = rr(14, 30) + 'px';
    document.body.appendChild(h);
    const ang = rr(-Math.PI * .95, -Math.PI * .05), dist = rr(70, 190);
    h.animate([
      { transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * dist * .6}px), calc(-50% + ${Math.sin(ang) * dist * .6}px)) scale(1.1)`, opacity: 1, offset: .35 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist - 40}px)) scale(.8) rotate(${rr(-30, 30)}deg)`, opacity: 0 }
    ], { duration: rr(900, 1700), easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => h.remove();
  }
}, true);
