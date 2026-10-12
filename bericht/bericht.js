// Ordinum · Individualisierter Bericht: baut den Bericht im Browser aus den gespeicherten Ergebnissen.
// Grafiken als SVG, Seiten im A4-Format; Inhalte fließen automatisch auf neue Seiten, wenn eine Seite voll ist.
(function(){
var T = window.TEXTE, Q = window.QUELLE, D;
// Farbvariante: hell oder dunkel, gewählt beim Erzeugen (OrdinumBericht.render(daten, { dunkel:true }))
var DK, K, FCOL;
function kk(o){ var r = {}; Object.keys(o).forEach(function(k){ r[k] = o[k][DK ? 1 : 0]; }); return r; }
// Farben der Grafiken je Variante (hell | dunkel)
var PAL = {
  ink:['#18201c','#eef2f0'], tick:['#8b958f','#8e9a95'], knob:['#fff','#111513'], zt:['#edf1ee','#1a211e'], zm:['#e2e8e4','#2a3430'],
  fz:['#eef2ef','#161d1a'], fo:['#e0e6e1','#2a3430'], fs:['#f1f4f2','#141a17'], fl:['#3d4843','#cdd5d1'], fc:['#fbfcfa','#0a0d0c'],
  rt:['#e7ebe8','#1f2724'],
  wbase:['#dfe5e1','#2a3430'], wbeam:['#9aa59f','#5d6964'], wpl:['#f6c8bf','rgba(240,138,126,.4)'], wpr:['#bfe3cf','rgba(108,196,151,.4)'], wstr:['#c9d1cc','#3a4440'], wf:['#b4543f','#f08a7e'], ws:['#2f7a52','#8fd1a9'],
  ef:['#fff','#111513'], eb:['#f1f4f2','#171d1a'], ed:['#d3dbd6','#2f3934'], eq1:['#4a5550','#c9d2cd'], eq2:['#8b958f','#7d8a84'], ea:['#5d6964','#8e9a95'], ep:['#b03c8c','#ec8cce'],
  cb:['#f3f8f6','rgba(95,208,184,.05)'], cs:['#dbe7e2','#26302c'], cf:['#1f8a73','#5fd0b8'], co:['#5fd0b8','#3a9e89'], ca:['#a9bdb6','#3a4642'], cc:['#c9d9d3','#2a3430'], cl:['#26312c','#d5ddd9'], cv:['#18201c','#f2f6f4'], ccap:['#5d6964','#97a39e'],
  fbar:['#eef1ef','#1a211e'], fname:['#4a5550','#a3aea9'], ebar:['#f8e9f3','#2a1f27'], care:['#7a66c9','#b9a3f2'], wm:['#6c56c4','#b9a3f2'], logo:['saturate(1.25) brightness(.82)','none'],
  // Übersicht und Deckblatt im Stil der Website (hell: Light Mode der Startseite)
  g1:['#2b8257','#8fd1a9'], g2:['#6650bd','#b9a3f2'], otr:['#e1e6e2','#1f2724'], owb:['#c9a72a','#e8d27a'], ost:['#5b86e0','#7ea8f8'],
  obg:['rgba(31,138,115,.06)','rgba(95,208,184,.05)'], ocs:['#d3e0db','#26302c'], ocf:['#1f8a73','#5fd0b8'], oco:['#5fd0b8','#3a9e89'], ocap:['#8b958f','#66726d'],
  ozt:['rgba(24,32,28,.08)','rgba(231,236,233,.09)'], ozl:['#7a8680','#7d8a84'],
  rz:['#eaf0ec','rgba(143,209,169,.08)'],
  // Werte (Koralle) und Chronotyp (Limette)
  wseg:['#e46f6f','#f28080'], wtr:['#f3eeee','#1d2321'], wtx:['#b84a4a','#f5a3a3'], lim:['#7f9c2c','#c4de76'], limw:['rgba(127,156,44,.10)','rgba(196,222,118,.08)']
};
function thema(dunkel){
  DK = !!dunkel; K = kk(PAL);
  FCOL = DK ? { O:'#8fd1a9', C:'#b9a3f2', E:'#f0cf6e', A:'#5fd0b8', N:'#7ea8f8' } : { O:'#4fae7f', C:'#8b74e0', E:'#d6a634', A:'#33ab92', N:'#6a8fe6' };
}
var MON = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
function fmt(d){ return +d.slice(6,8) + '. ' + MON[+d.slice(4,6)-1] + ' ' + d.slice(0,4); }
function monat(d){ return MON[+d.slice(4,6)-1] + ' ' + d.slice(0,4); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function band(v){ return v < 40 ? 'low' : v > 60 ? 'high' : 'mid'; }
var BAND = { low:'eher niedrig', mid:'mittel', high:'eher hoch' };
var TESTS = {
  big5:         { name:'Persönlichkeit',             f:'#8fd1a9', d:'#2f7a52' },
  neo120:       { name:'Persönlichkeit ausführlich', f:'#8fd1a9', d:'#2f7a52' }, // im Bericht hat Persönlichkeit immer dieselbe Farbe
  staerken:     { name:'Charakterstärken',           f:'#b9a3f2', d:'#6b55c4' },
  wohlbefinden: { name:'Wohlbefinden',               f:'#f0cf6e', d:'#9a7300' },
  stress:       { name:'Stress & Resilienz',         f:'#7ea8f8', d:'#2f5fc4' },
  emotionen:    { name:'Emotionen',                  f:'#ec8cce', d:'#b03c8c' },
  beziehung:    { name:'Beziehungsstil',             f:'#5fd0b8', d:'#1f8a73' },
  werte:        { name:'Werte',                      f:'#f28080', d:'#c24f4f' },
  chronotyp:    { name:'Chronotyp',                  f:'#c4de76', d:'#6f8a1f' }
};
var BEZ = { PA:'Bestimmend', BC:'Direkt', DE:'Nüchtern', FG:'Reserviert', HI:'Leise', JK:'Nachsichtig', LM:'Warmherzig', NO:'Gesellig', AUS:'Ausgewogen' };
var WBN = { F:'Lebensfreude', M:'Ausgeglichene Stimmung', O:'Zuversicht', S:'Selbstwert', V:'Lebendigkeit' };
var EMN = { W:'Gefühle wahrnehmen', P:'Freude zeigen', N:'Schweres zeigen', J:'Mitschwingen', E:'Bauchgefühl' };
var n = 0; function uid(){ return 'g' + (++n); }
function r1(x){ return Math.round(x * 10) / 10; }
var ZAHL = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf'];
function zahl(x){ return ZAHL[x] || String(x); }
function val(x, m){ return typeof x === 'function' ? x(m) : x; } // Mustertexte können vom Profil abhängen
var MM = 96 / 25.4; // Pixel pro Millimeter im Browser
var LOGO = window.BERICHT_LOGO || 'logo-ringe.svg';

/* ---------- Modell ---------- */
function bezModel(sc){
  var ang = { LM:0, NO:45, PA:90, BC:135, DE:180, FG:225, HI:270, JK:315 }, k = Object.keys(ang), mean = 0, x = 0, y = 0;
  k.forEach(function(f){ mean += sc[f] / 8; });
  k.forEach(function(f){ var a = ang[f] * Math.PI / 180; x += (sc[f] - mean) * Math.cos(a); y += (sc[f] - mean) * Math.sin(a); });
  var len = Math.sqrt(x*x + y*y) / 2, focus = 'AUS';
  var top3 = k.slice().sort(function(a, b){ return sc[b] - sc[a]; }).slice(0, 3);
  if (len >= 12) { var a = (Math.round(Math.atan2(y, x) * 180 / Math.PI / 45) * 45 + 360) % 360; focus = k.filter(function(f){ return ang[f] === a; })[0];
    // Liegt der höchste Einzelstil direkt neben der Richtung, heißt er Schwerpunkt: so passt der Schwerpunkt zur Liste der stärksten Stile
    var d = Math.abs(ang[top3[0]] - a) % 360; if (d === 45 || d === 315) focus = top3[0]; }
  return { sc:sc, ang:ang, x:x, y:y, len:len, focus:focus, top3:top3 };
}
// Werte wie auf der Testseite: Schwerpunkt aus den Werten nach Abzug des eigenen Durchschnitts, Stufe je Wert ab 7 Punkten Abstand
var WORD = ['ST','SD','UN','BE','TR','CO','SE','PO','AC','HE'], WANG = { UN:18, SD:54, ST:90, HE:126, AC:162, PO:198, SE:234, CO:270, TR:306, BE:342 };
var WLVL = { low:'weniger wichtig', mid:'im Mittelfeld', high:'besonders wichtig' };
function werteModel(sc){
  var mean = 0, x = 0, y = 0; WORD.forEach(function(f){ mean += sc[f] / 10; });
  WORD.forEach(function(f){ var d = sc[f] - mean, t = WANG[f] * Math.PI / 180; x += d * Math.cos(t); y += d * Math.sin(t); });
  x /= 2.5; y /= 2.5; var p = Math.sqrt(x*x + y*y); if (p > 100) { x *= 100 / p; y *= 100 / p; p = 100; }
  var ang = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360, reg = ang >= 315 || ang < 45 ? 'T' : ang < 135 ? 'O' : ang < 225 ? 'E' : 'C';
  var rk = WORD.map(function(f, i){ return [f, i]; }).sort(function(a, b){ return sc[b[0]] - sc[a[0]] || a[1] - b[1]; }).map(function(z){ return z[0]; });
  var lv = function(f){ var d = sc[f] - mean; return d > 7 ? 'high' : d < -7 ? 'low' : 'mid'; };
  var lvl = p < 12 ? 0 : p < 30 ? 1 : p < 55 ? 2 : 3;
  return { sc:sc, mean:mean, x:x, y:y, p:p, reg: lvl ? reg : 'bal', lvl:lvl, rk:rk, top:rk.slice(0, 3).filter(function(f){ return sc[f] > mean; }), lv:lv };
}
// Chronotyp wie auf der Testseite: Typ aus der Abendtendenz, Leistungshoch zwischen 8:30 und 16:30 Uhr, Jetlag 25 Punkte pro Stunde
function chronoModel(sc){
  var E = sc.E, ti = E < 20 ? 0 : E < 40 ? 1 : E <= 60 ? 2 : E <= 80 ? 3 : 4, jh = Math.round(sc.J / 25);
  return { E:E, J:sc.J, ti:ti, peak: Math.round((8.5 + E / 100 * 8) * 2) / 2, jh:jh, ji: Math.min(3, jh) };
}
function uhr(h){ h = (h + 24) % 24; return Math.floor(h) + (h % 1 ? ':30' : ''); }
function model(D){
  var t = D.tests, m = { name:D.name, date:D.date, t:t };
  if (t.neo120) m.P = { src:'neo120', date:t.neo120.date, O:t.neo120.O, C:t.neo120.C, E:t.neo120.E, A:t.neo120.A, S:100 - t.neo120.N, facets:t.neo120 };
  else if (t.big5) m.P = { src:'big5', date:t.big5.date, O:t.big5.O, C:t.big5.C, E:t.big5.E, A:t.big5.A, S:t.big5.S };
  if (t.staerken) {
    var arr = Object.keys(Q.staerken).map(function(k){ return { k:k, v:t.staerken[k] }; }).sort(function(a, b){ return b.v - a.v; });
    m.st = arr; m.top = arr.slice(0, 5); m.low3 = arr.slice(-3);
  }
  if (t.wohlbefinden) { var w = t.wohlbefinden; m.wb = { F:w.F, M:w.M, O:w.O, S:w.S, V:w.V, ov: Math.round((w.F + w.M + w.O + w.S + w.V) / 5) }; }
  if (t.stress) { var s = t.stress; m.stress = { A:s.A, R:s.R, U:s.U, S:s.S, ov: Math.round(((100 - s.A) + (100 - s.R) + (100 - s.U) + s.S) / 4) }; }
  if (t.emotionen) m.emo = t.emotionen;
  if (t.beziehung) m.bez = bezModel(t.beziehung);
  if (t.werte) m.werte = werteModel(t.werte);
  if (t.chronotyp) m.chrono = chronoModel(t.chronotyp);
  // Liegen beide Persönlichkeitstests vor, fließt nur der ausführliche ein und wird gezählt
  m.tests = Object.keys(TESTS).filter(function(k){ return t[k] && !(k === 'big5' && t.neo120); });
  m.muster = window.waehleMuster(m);
  return m;
}

/* ---------- Grafik-Bausteine ---------- */
function svg(w, h, body, cls, style){ return '<svg class="' + (cls || '') + '" viewBox="0 0 ' + w + ' ' + h + '" style="' + (style || '') + '" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>'; }
function lin(id, a, b){ return '<defs><linearGradient id="' + id + '" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs>'; }
function txt(x, y, s, o){ o = o || {}; return '<text x="' + r1(x) + '" y="' + r1(y) + '" font-family="' + (o.mono ? 'JetBrains Mono' : o.display ? 'Unbounded' : 'Hanken Grotesk') + '" font-size="' + (o.size || 12) + '" font-weight="' + (o.weight || 400) + '" fill="' + (o.fill || K.ink) + '" text-anchor="' + (o.anchor || 'start') + '"' + (o.base ? ' dominant-baseline="' + o.base + '"' : '') + (o.rot != null ? ' transform="rotate(' + r1(o.rot) + ' ' + r1(x) + ' ' + r1(y) + ')"' : '') + (o.ls ? ' letter-spacing="' + o.ls + '"' : '') + '>' + s + '</text>'; }
function sector(cx, cy, ra, rb, a0, a1, fill, extra){
  var p = function(r, a){ a = a * Math.PI / 180; return r1(cx + Math.cos(a) * r) + ' ' + r1(cy + Math.sin(a) * r); };
  var large = (a1 - a0) > 180 ? 1 : 0;
  return '<path d="M' + p(rb, a0) + ' A' + rb + ' ' + rb + ' 0 ' + large + ' 1 ' + p(rb, a1) + ' L' + p(ra, a1) + ' A' + ra + ' ' + ra + ' 0 ' + large + ' 0 ' + p(ra, a0) + ' Z" fill="' + fill + '"' + (extra || '') + '/>';
}

// Balken mit drei Zonen (eher niedrig / mittel / eher hoch) und Markierung
function zoneBar(v, c, opts){
  opts = opts || {}; var id = uid(), W = 600, labels = opts.labels !== false, y = opts.ticks ? 17 : 8, H = labels ? y + 28 : y + 14;
  var s = DK ? lin(id, c.d, c.f) : lin(id, c.f, c.d), R = function(x, w, extra){ return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="10"' + (extra || '') + '/>'; };
  s += R(0, 240, ' rx="5" fill="' + K.zt + '"') + R(240, 120, ' fill="' + K.zm + '"') + R(360, 240, ' rx="5" fill="' + K.zt + '"') + R(236, 8, ' fill="' + K.zm + '"') + R(356, 8, ' fill="' + K.zm + '"');
  if (v != null) {
    s += R(0, Math.max(10, v * 6), ' rx="5" fill="url(#' + id + ')" opacity=".9"');
    s += '<circle cx="' + Math.min(593, Math.max(7, v * 6)) + '" cy="' + (y + 5) + '" r="7.5" fill="' + K.knob + '" stroke="' + (DK ? c.f : c.d) + '" stroke-width="2.6"/>';
  }
  if (labels) {
    var o = { mono:1, size:9.5, fill:K.tick, anchor:'middle' };
    s += txt(120, y + 25, 'eher niedrig', o) + txt(300, y + 25, 'mittel', o) + txt(480, y + 25, 'eher hoch', o);
    if (opts.ticks) s += txt(0, y + 25, '0', { mono:1, size:9.5, fill:K.tick }) + txt(240, y - 6, '40', o) + txt(360, y - 6, '60', o) + txt(600, y + 25, '100', { mono:1, size:9.5, fill:K.tick, anchor:'end' });
  }
  return svg(W, H, s, 'zone');
}

function facetWheel(F){
  var doms = ['O','C','E','A','N'], W = 820, H = 780, cx = 410, cy = 390, r0 = 66, R = 196, gap = 6, slot = 11, bw = 9;
  var rr = function(v){ return r0 + (R - r0) * v / 100; };
  var s = sector(cx, cy, rr(40), rr(60), 0, 359.99, K.fz);
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="' + K.fo + '" stroke-width="1"/>';
  doms.forEach(function(d, di){
    for (var j = 0; j < 6; j++) {
      var f = d + (j + 1), v = F[f], a0 = -90 + di * (6 * slot + gap) + j * slot + (slot - bw) / 2, a1 = a0 + bw;
      s += sector(cx, cy, r0, R, a0, a1, K.fs);
      s += sector(cx, cy, r0, rr(v), a0, a1, FCOL[d]);
      var am = (a0 + a1) / 2, rad = am * Math.PI / 180, lx = cx + Math.cos(rad) * (R + 9), ly = cy + Math.sin(rad) * (R + 9), flip = Math.cos(rad) < -0.0001;
      s += '<text x="' + r1(lx) + '" y="' + r1(ly) + '" transform="rotate(' + r1(flip ? am + 180 : am) + ' ' + r1(lx) + ' ' + r1(ly) + ')" text-anchor="' + (flip ? 'end' : 'start') + '" dominant-baseline="middle" font-family="Hanken Grotesk" font-size="14.5" fill="' + K.fl + '">' + esc(Q.facetten[f].name) + ' <tspan font-family="JetBrains Mono" font-size="13" font-weight="700" fill="' + K.ink + '">' + v + '</tspan></text>';
    }
  });
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r0 - 6) + '" fill="' + K.fc + '" stroke="' + K.fo + '"/>';
  s += txt(cx, cy + 4, '30', { display:1, size:30, weight:300, anchor:'middle' }) + txt(cx, cy + 24, 'FACETTEN', { mono:1, size:9, fill:K.tick, anchor:'middle', ls:2 });
  return svg(W, H, s, '', 'width:168mm;display:block;margin:0 auto');
}

// Rangliste aller 24 Charakterstärken: die fünf stärksten hervorgehoben, die drei am wenigsten ausgeprägten abgesetzt
function strengthRanking(m){
  var n = m.st.length;
  var row = function(x, i, cls){ return '<div class="sr' + cls + '"><span class="r">' + (i + 1) + '</span><span class="sn">' + esc(Q.staerken[x.k].name) + '</span><div class="st"><span style="width:' + x.v + '%"></span></div><span class="v">' + x.v + '</span></div>'; };
  var head = function(label, scale){ return '<div class="sr head"><span></span><span class="lbl">' + label + '</span>' + (scale ? '<div class="sscale"><span>eher niedrig</span><span>mittel</span><span>eher hoch</span></div>' : '<span></span>') + '<span></span></div>'; };
  return '<div class="srank">' + head('Deine fünf stärksten', 1) + m.st.slice(0, 5).map(function(x, i){ return row(x, i, ' top'); }).join('') +
    head('Weitere Stärken') + m.st.slice(5, n - 3).map(function(x, i){ return row(x, i + 5, ''); }).join('') +
    head(T.uebersicht.seltener) + m.st.slice(n - 3).map(function(x, i){ return row(x, i + n - 3, ' low'); }).join('') + '</div>';
}

function ring(v, c, label){
  var r = 46, C = 2 * Math.PI * r, s = '<circle cx="60" cy="60" r="' + r + '" fill="none" stroke="' + K.rt + '" stroke-width="11"/>';
  s += '<circle cx="60" cy="60" r="' + r + '" fill="none" stroke="' + c + '" stroke-width="11" stroke-linecap="round" stroke-dasharray="' + r1(C * v / 100) + ' ' + r1(C) + '" transform="rotate(-90 60 60)"/>';
  s += txt(60, 70, v, { display:1, size:28, weight:300, anchor:'middle' });
  return '<div class="ring">' + svg(120, 120, s, '', 'width:34mm') + '<div class="rl">' + label + '</div></div>';
}

// Waage: was fordert (Stressbereiche) und was stärkt (Selbstwirksamkeit und Wohlbefinden)
function waageListen(m){
  return { load:[{ n:'Anspannung', v:m.stress.A }, { n:'Reizbarkeit', v:m.stress.R }, { n:'Überforderung', v:m.stress.U }],
    res:[{ n:'Selbstwirksamkeit', v:m.stress.S }].concat(['F','M','O','S','V'].map(function(k){ return { n:WBN[k], v:m.wb[k] }; })) };
}
function avg(l){ return l.reduce(function(a, x){ return a + x.v; }, 0) / l.length; }
function waageCap(w){ var d = avg(w.res) - avg(w.load); return d > 15 ? T.jetzt.waage.plus : d < -15 ? T.jetzt.waage.minus : T.jetzt.waage.gleich; }
function balance(w){
  var load = w.load, res = w.res, lm = avg(load), rm = avg(res);
  var tilt = Math.max(-7, Math.min(7, (rm - lm) / 3)), cx = 300, cy = 62, L = 220;
  var s = '<polygon points="' + (cx - 16) + ',' + (cy + 44) + ' ' + (cx + 16) + ',' + (cy + 44) + ' ' + cx + ',' + (cy + 6) + '" fill="' + K.wbase + '"/>';
  s += '<g transform="rotate(' + r1(tilt) + ' ' + cx + ' ' + cy + ')">';
  s += '<line x1="' + (cx - L) + '" y1="' + cy + '" x2="' + (cx + L) + '" y2="' + cy + '" stroke="' + K.wbeam + '" stroke-width="3" stroke-linecap="round"/>';
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="' + K.knob + '" stroke="' + K.wbeam + '" stroke-width="2.4"/>';
  s += '<path d="M' + (cx - L - 34) + ' ' + (cy + 22) + ' Q' + (cx - L) + ' ' + (cy + 40) + ' ' + (cx - L + 34) + ' ' + (cy + 22) + ' Z" fill="' + K.wpl + '"/><line x1="' + (cx - L) + '" y1="' + cy + '" x2="' + (cx - L) + '" y2="' + (cy + 22) + '" stroke="' + K.wstr + '" stroke-width="1.5"/>';
  s += '<path d="M' + (cx + L - 34) + ' ' + (cy + 22) + ' Q' + (cx + L) + ' ' + (cy + 40) + ' ' + (cx + L + 34) + ' ' + (cy + 22) + ' Z" fill="' + K.wpr + '"/><line x1="' + (cx + L) + '" y1="' + cy + '" x2="' + (cx + L) + '" y2="' + (cy + 22) + '" stroke="' + K.wstr + '" stroke-width="1.5"/>';
  s += '</g>';
  s += txt(cx - L, 20, 'WAS FORDERT', { mono:1, size:11, fill:K.wf, anchor:'middle', ls:1.5 }) + txt(cx + L, 20, 'WAS STÄRKT', { mono:1, size:11, fill:K.ws, anchor:'middle', ls:1.5 });
  var cap = waageCap(w);
  var rows = function(list, side){ return list.map(function(x){
    var bar = '<div class="dtrack"><span style="width:' + x.v + '%;background:' + (side === 'l' ? 'linear-gradient(270deg,#f08a7e,#f6c3ba)' : 'linear-gradient(90deg,#6cc497,#b9e2cb)') + '"></span></div>';
    return side === 'l' ? '<div class="drow"><span class="t">' + x.n + '</span>' + bar + '<span class="v">' + x.v + '</span></div>' : '<div class="drow"><span class="v">' + x.v + '</span>' + bar + '<span>' + x.n + '</span></div>';
  }).join(''); };
  return svg(600, 120, s, '', 'width:150mm;display:block;margin:0 auto') +
    '<div class="div"><div class="dcol dl">' + rows(load, 'l') + '</div><div class="dcol dr">' + rows(res, 'r') + '</div></div>' +
    '<p class="center muted" style="margin-top:3mm">' + cap + '</p>';
}

function emotionField(P, N){
  var x0 = 70, y0 = 20, S = 300, X = function(v){ return x0 + S * v / 100; }, Y = function(v){ return y0 + S * (1 - v / 100); };
  var s = '<rect x="' + x0 + '" y="' + y0 + '" width="' + S + '" height="' + S + '" rx="10" fill="' + K.ef + '" stroke="' + K.fo + '"/>';
  s += '<rect x="' + X(40) + '" y="' + y0 + '" width="' + (S * .2) + '" height="' + S + '" fill="' + K.eb + '"/><rect x="' + x0 + '" y="' + Y(60) + '" width="' + S + '" height="' + (S * .2) + '" fill="' + K.eb + '"/>';
  s += '<line x1="' + X(50) + '" y1="' + y0 + '" x2="' + X(50) + '" y2="' + (y0 + S) + '" stroke="' + K.ed + '" stroke-dasharray="4 4"/><line x1="' + x0 + '" y1="' + Y(50) + '" x2="' + (x0 + S) + '" y2="' + Y(50) + '" stroke="' + K.ed + '" stroke-dasharray="4 4"/>';
  var q = function(x, y, a, b, anchor){ return txt(x, y, a, { size:12.5, weight:600, fill:K.eq1, anchor:anchor }) + txt(x, y + 16, b, { size:11.5, fill:K.eq2, anchor:anchor }); };
  s += q(X(96), Y(92), 'Offen in beidem', 'Freude und Schweres', 'end') + q(X(4), Y(92), 'Vor allem Schweres', 'Freude eher leise', 'start');
  s += q(X(96), Y(14), 'Vor allem Freude', 'Schweres eher für dich', 'end') + q(X(4), Y(14), 'Eher für dich', 'beides eher leise', 'start');
  s += txt(x0 + S / 2, y0 + S + 30, 'Freude zeigen  →', { mono:1, size:11, fill:K.ea, anchor:'middle', ls:1 });
  s += txt(x0 - 26, y0 + S / 2, 'Schweres zeigen  →', { mono:1, size:11, fill:K.ea, anchor:'middle', ls:1, rot:-90 });
  s += '<circle cx="' + X(P) + '" cy="' + Y(N) + '" r="18" fill="#ec8cce" opacity=".22"/><circle cx="' + X(P) + '" cy="' + Y(N) + '" r="8" fill="' + K.ep + '" stroke="' + K.knob + '" stroke-width="3"/>';
  s += txt(X(P) + 14, Y(N) - 14, P + ' / ' + N, { mono:1, size:11, fill:K.ep, weight:500 });
  return svg(390, 365, s, '', 'width:78mm;display:block');
}

function circumplex(b){
  var cx = 300, cy = 212, r0 = 22, R = 150, W = 600, H = 430, s = '', rr = function(v){ return r0 + (R - r0) * v / 100; };
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + K.cb + '" stroke="' + K.cs + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + rr(50) + '" fill="none" stroke="' + K.cs + '"/>';
  Object.keys(b.ang).forEach(function(k){
    var a = -b.ang[k], v = b.sc[k], foc = k === b.focus;
    s += sector(cx, cy, r0, rr(v), a - 21, a + 21, foc ? K.cf : K.co, ' fill-opacity="' + (foc ? .9 : r1(.28 + .5 * v / 100)) + '"');
  });
  s += '<line x1="' + (cx - R - 8) + '" y1="' + cy + '" x2="' + (cx + R + 8) + '" y2="' + cy + '" stroke="' + K.ca + '" stroke-dasharray="3 5"/><line x1="' + cx + '" y1="' + (cy - R - 8) + '" x2="' + cx + '" y2="' + (cy + R + 8) + '" stroke="' + K.ca + '" stroke-dasharray="3 5"/>';
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r0 - 4) + '" fill="' + K.knob + '" stroke="' + K.cc + '"/>';
  Object.keys(b.ang).forEach(function(k){
    var a = b.ang[k] * Math.PI / 180, lx = cx + Math.cos(a) * (R + 28), ly = cy - Math.sin(a) * (R + 28), anchor = Math.abs(Math.cos(a)) < .2 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
    if (Math.abs(Math.cos(a)) > .9) lx = cx + Math.cos(a) * (R + 14);
    s += txt(lx, ly + 6, BEZ[k] + ' <tspan font-family="JetBrains Mono" font-size="14" font-weight="700" fill="' + K.cv + '">' + b.sc[k] + '</tspan>', { size:17, weight: k === b.focus ? 700 : 500, fill: k === b.focus ? K.cf : K.cl, anchor:anchor });
  });
  var cap = function(x, y, t, anchor){ return txt(x, y, t, { mono:1, size:11.5, fill:K.ccap, anchor:anchor || 'middle', ls:2 }); };
  s += cap(cx, cy - R - 44, 'EINFLUSS NEHMEN') + cap(cx, cy + R + 58, 'RAUM LASSEN') + cap(cx + R + 14, cy + 27, 'NÄHE', 'start') + cap(cx - R - 14, cy + 27, 'ABSTAND', 'end');
  if (b.focus !== 'AUS') {
    var ang = Math.atan2(b.y, b.x), rad = r0 + (R - r0) * Math.min(b.len, 60) / 60 * .82, px = cx + Math.cos(ang) * rad, py = cy - Math.sin(ang) * rad;
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + r1(px) + '" y2="' + r1(py) + '" stroke="' + K.cf + '" stroke-width="2" stroke-dasharray="3 3"/>';
    s += '<circle cx="' + r1(px) + '" cy="' + r1(py) + '" r="13" fill="' + K.cf + '" opacity=".2"/><circle cx="' + r1(px) + '" cy="' + r1(py) + '" r="7" fill="' + K.knob + '" stroke="' + K.cf + '" stroke-width="3.4"/>';
  }
  return svg(W, H, s, '', 'width:96mm;display:block');
}

// Wertekreis: zehn Werte im Kreis wie auf der Testseite (0° rechts = über dich hinaus, 90° oben = offen für Neues)
function werteKreis(w){
  var W = 640, H = 436, cx = 320, cy = 218, R0 = 18, R = 146, rr = function(v){ return R0 + (R - R0) * Math.max(v, 2) / 100; }, s = '';
  WORD.forEach(function(f){ s += sector(cx, cy, R0, R, -WANG[f] - 16.5, -WANG[f] + 16.5, K.wtr); });
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + rr(50) + '" fill="none" stroke="' + K.cs + '" stroke-dasharray="3 4"/>';
  WORD.forEach(function(f){ var on = w.top.indexOf(f) >= 0; s += sector(cx, cy, R0, rr(w.sc[f]), -WANG[f] - 16.5, -WANG[f] + 16.5, K.wseg, ' fill-opacity="' + (on ? .95 : r1(.3 + .35 * w.sc[f] / 100)) + '"'); });
  s += '<line x1="' + (cx - R - 6) + '" y1="' + cy + '" x2="' + (cx + R + 6) + '" y2="' + cy + '" stroke="' + K.ca + '" stroke-dasharray="3 5"/><line x1="' + cx + '" y1="' + (cy - R - 6) + '" x2="' + cx + '" y2="' + (cy + R + 6) + '" stroke="' + K.ca + '" stroke-dasharray="3 5"/>';
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R0 - 4) + '" fill="' + K.knob + '" stroke="' + K.cc + '"/>';
  var W8 = Q.werte.texte;
  WORD.forEach(function(f){
    var a = WANG[f] * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a), lx = cx + c * (R + 16), ly = cy - sn * (R + 16) + (Math.abs(c) < .2 ? (sn > 0 ? -4 : 14) : 6);
    var anchor = Math.abs(c) < .2 ? 'middle' : c > 0 ? 'start' : 'end', on = w.top.indexOf(f) >= 0;
    s += txt(lx, ly, esc(W8[f].name) + ' <tspan font-family="JetBrains Mono" font-size="14" font-weight="700" fill="' + K.cv + '">' + w.sc[f] + '</tspan>', { size:16.5, weight: on ? 700 : 500, fill: on ? K.wtx : K.cl, anchor:anchor });
  });
  var cap = function(x, y, t, anchor){ return txt(x, y, t, { mono:1, size:11, fill:K.ccap, anchor:anchor || 'middle', ls:2 }); };
  s += cap(cx, cy - R - 40, 'OFFEN FÜR NEUES') + cap(cx, cy + R + 52, 'BESTÄNDIGKEIT') + cap(cx + R + 12, cy + 4, 'ÜBER DICH HINAUS', 'start') + cap(cx - R - 12, cy + 4, 'EIGENE ZIELE', 'end');
  if (w.lvl) {
    var px = cx + R * w.x / 100, py = cy - R * w.y / 100;
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + r1(px) + '" y2="' + r1(py) + '" stroke="' + K.wtx + '" stroke-width="2" stroke-dasharray="3 3"/>';
    s += '<circle cx="' + r1(px) + '" cy="' + r1(py) + '" r="13" fill="' + K.wseg + '" opacity=".22"/><circle cx="' + r1(px) + '" cy="' + r1(py) + '" r="7" fill="' + K.knob + '" stroke="' + K.wtx + '" stroke-width="3.4"/>';
  }
  return svg(W, H, s, '', 'width:100%;display:block');
}
// Tageskurve wie auf der Testseite: Spektrum vom Morgen- zum Abendtyp und Wachheit über den Tag (Veranschaulichung, keine Messung)
function tagKurve(c){
  var p = c.peak, X = function(h){ return 40 + (h - 6) / 18 * 540; }, Y0 = 250, H = 150, id = uid();
  var g = function(h, m, sd){ return Math.exp(-Math.pow((h - m) / sd, 2)); }, sig = function(x){ return 1 / (1 + Math.exp(-x)); };
  var wach = function(h){ var wake = p - 3.5, bed = p + 12.5; return (0.15 + g(h, p, 3.2) + 0.7 * g(h, p + 7, 2.6) - 0.35 * g(h, p + 3.8, 1.3)) * sig((h - wake) / 0.7) * sig((bed - h) / 0.9); };
  var s = '<defs><linearGradient id="' + id + '" x1="0" x2="1"><stop offset="0" stop-color="' + K.lim + '"/><stop offset=".5" stop-color="' + K.g1 + '"/><stop offset="1" stop-color="' + K.g2 + '"/></linearGradient>' +
    '<linearGradient id="' + id + 'a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="' + K.lim + '" stop-opacity=".35"/><stop offset="1" stop-color="' + K.lim + '" stop-opacity="0"/></linearGradient></defs>';
  var sx = function(e){ return 90 + e / 100 * 420; };
  s += '<rect x="90" y="24" width="420" height="5" rx="2.5" fill="url(#' + id + ')" opacity=".75"/>';
  s += '<circle cx="64" cy="26.5" r="7" fill="none" stroke="' + K.lim + '" stroke-width="2"/>' + [0, 45, 90, 135, 180, 225, 270, 315].map(function(a){ var t = a * Math.PI / 180; return '<line x1="' + r1(64 + 10 * Math.cos(t)) + '" y1="' + r1(26.5 + 10 * Math.sin(t)) + '" x2="' + r1(64 + 13 * Math.cos(t)) + '" y2="' + r1(26.5 + 13 * Math.sin(t)) + '" stroke="' + K.lim + '" stroke-width="1.6" stroke-linecap="round"/>'; }).join('');
  s += '<path d="M541 18.5a8 8 0 1 0 0 16 6.6 6.6 0 0 1 0-16Z" fill="' + K.g2 + '"/>';
  s += txt(90, 50, 'MORGENTYP', { mono:1, size:10.5, fill:K.ccap, ls:1.5 }) + txt(510, 50, 'ABENDTYP', { mono:1, size:10.5, fill:K.ccap, anchor:'end', ls:1.5 });
  s += '<circle cx="' + r1(sx(c.E)) + '" cy="26.5" r="13" fill="' + K.lim + '" opacity=".22"/><circle cx="' + r1(sx(c.E)) + '" cy="26.5" r="6.5" fill="' + K.knob + '" stroke="' + K.lim + '" stroke-width="3"/>';
  var pts = [], mx = 0, h; for (h = 6; h <= 24.001; h += 0.25) { var v = wach(h); pts.push([h, v]); if (v > mx) mx = v; }
  var line = pts.map(function(q, i){ return (i ? 'L' : 'M') + r1(X(q[0])) + ' ' + r1(Y0 - q[1] / mx * H); }).join('');
  s += '<rect x="' + r1(X(p - 1.5)) + '" y="' + (Y0 - H - 12) + '" width="' + r1(X(p + 1.5) - X(p - 1.5)) + '" height="' + (H + 12) + '" rx="8" fill="' + K.limw + '"/>';
  s += '<path d="' + line + 'L' + X(24) + ' ' + Y0 + 'L' + X(6) + ' ' + Y0 + 'Z" fill="url(#' + id + 'a)"/><path d="' + line + '" fill="none" stroke="url(#' + id + ')" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
  s += '<line x1="' + X(6) + '" y1="' + Y0 + '" x2="' + X(24) + '" y2="' + Y0 + '" stroke="' + K.cs + '"/>';
  [6, 9, 12, 15, 18, 21, 24].forEach(function(hh){ s += '<line x1="' + X(hh) + '" y1="' + Y0 + '" x2="' + X(hh) + '" y2="' + (Y0 + 5) + '" stroke="' + K.tick + '"/>' + txt(X(hh), Y0 + 21, hh === 24 ? '24 Uhr' : String(hh), { mono:1, size:10.5, fill:K.tick, anchor:'middle' }); });
  s += txt(Math.min(Math.max(X(p), 90), 530), Y0 - H - 20, 'LEISTUNGSHOCH', { mono:1, size:10.5, fill:K.lim, anchor:'middle', ls:1.5 });
  return svg(620, 280, s, '', 'width:126mm;display:block;margin:0 auto');
}

/* ---------- Symbole: feine Linien, Farbe über currentColor ---------- */
var ICO = {
  pentagon: '<path d="M12 3l8.6 6.2-3.3 10.1H6.7L3.4 9.2z"/><path d="M12 3v9m8.6-2.8L12 12m5.3 7.3L12 12m-5.3 7.3L12 12M3.4 9.2L12 12" opacity=".5"/>',
  ringe: '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
  sonne: '<circle cx="12" cy="12" r="3.6"/><path d="M18.5 12H21M16.6 16.6l1.8 1.8M12 18.5V21M7.4 16.6l-1.8 1.8M5.5 12H3M7.4 7.4L5.6 5.6M12 5.5V3M16.6 7.4l1.8-1.8"/>',
  welle: '<circle cx="12" cy="12" r="9"/><path d="M4.5 12c1.9-3.2 3.8-3.2 5 0s3.1 3.2 5 0 3.1-3.2 5 0"/>',
  bahn: '<path d="M12 3v18M3 12h18" opacity=".5"/><circle cx="12" cy="12" r="7"/><circle cx="16.95" cy="7.05" r="1.5" fill="currentColor"/><circle cx="7.05" cy="16.95" r="1.1" fill="currentColor"/>',
  weg: '<circle cx="5" cy="18" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="6" r="1.6"/><path d="M6.3 16.9l4.4-3.8m2.6-2.2l4.4-3.8" stroke-dasharray="1.2 1.8"/>',
  stern: '<path d="M12 2.5l2 7.5 7.5 2-7.5 2-2 7.5-2-7.5-7.5-2 7.5-2z"/><circle cx="12" cy="12" r=".9" fill="currentColor"/>',
  rhythmus: '<path d="M9.5 4.5A7.5 7.5 0 0 0 9.5 19.5A9 9 0 0 1 9.5 4.5z"/><circle cx="16.5" cy="12" r="3.4"/>',
  halb: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" fill-opacity=".35" stroke="none"/><path d="M12 3.5v17"/>',
  fleck: '<circle cx="12" cy="12" r="8.5"/><path d="M4.6 16.2A8.5 8.5 0 0 0 19.4 16.2z" fill="currentColor" fill-opacity=".4" stroke="none"/>',
  kompass: '<circle cx="12" cy="12" r="8.5"/><path d="M12 6l2.2 6h-4.4z" fill="currentColor" stroke="none"/><path d="M12 18l2.2-6h-4.4z"/>',
  funke: '<path d="M12 3c.6 4.6 3.4 7.4 9 9-5.6 1.6-8.4 4.4-9 9-.6-4.6-3.4-7.4-9-9 5.6-1.6 8.4-4.4 9-9z"/>',
  zug: '<path d="M4 9h15m-3.5-3.5L19 9l-3.5 3.5M20 15H5m3.5-3.5L5 15l3.5 3.5"/>',
  buch: '<path d="M12 6.5c-2.2-1.6-5-2-8-1.6v13c3-.4 5.8 0 8 1.6 2.2-1.6 5-2 8-1.6v-13c-3-.4-5.8 0-8 1.6zM12 6.5v13"/>'
};
// Kapitelsymbole in der Reihenfolge von T.kapitel
var KICO = ['pentagon', 'ringe', 'sonne', 'welle', 'bahn', 'weg', 'stern', 'rhythmus', 'halb'];
function ico(n, c){ return '<svg class="ico' + (c ? ' ' + c : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + ICO[n] + '</svg>'; }

/* ---------- HTML-Bausteine ---------- */
function q(text){ return '<div class="q"><p><span class="rl">' + ico('kompass') + 'Frage an dich</span>' + esc(text) + '</p></div>'; }
function ask(text, sym){ return '<div class="ask"><p class="lbl">' + ico(sym || 'kompass') + 'Frage an dich</p><p>' + esc(text) + '</p><div class="ln"></div><div class="ln"></div></div>'; }
function opener(nr, titel, lead){ var k = T.kapitel.map(function(x){ return x.titel; }).indexOf(titel); return '<p class="ey">' + (k >= 0 ? ico(KICO[k], 'kico') : '') + (nr ? 'Kapitel ' + nr : 'Zu Beginn') + '</p><h1>' + esc(titel) + '</h1>' + (lead ? '<p class="lead">' + lead + '</p>' : ''); }
function pill(p){ var c = TESTS[p.test]; return '<div class="cp" style="--c:' + c.f + '"><div class="ct"><i></i>' + esc(c.name) + '</div><div class="cl">' + esc(p.label) + '<b>' + esc(p.value) + '</b></div></div>'; }
function conn(pills){ var h = pill(pills[0]); for (var i = 1; i < pills.length; i++){ var a = TESTS[pills[i - 1].test], b = TESTS[pills[i].test]; h += '<div class="cline" style="background:linear-gradient(90deg,' + a.f + ',' + b.f + ')"></div>' + pill(pills[i]); } return '<div class="conn' + (pills.length > 2 ? ' drei' : '') + '">' + h + '</div>'; }
/* ---------- Übersicht: dunkle Seite im Stil der Website ---------- */
// Netzgrafik der fünf Bereiche; dunkel für die Übersicht, hell für den Kapitelanfang
function radar2(P, dark){
  var keys = ['O','C','E','A','S'], W = 480, H = 272, cx = 245, cy = 146, R = 92, id = uid();
  var c = dark ? { grid:'#2a3430', line:'#8fd1a9', dot:'#0a0d0c', lab:'#8e9a95', val:'#f2f6f4' } : { grid:'#dbe2dd', line:'#2f7a52', dot:'#fff', lab:'#5d6964', val:'#18201c' };
  function pt(i, v){ var a = (-90 + i * 72) * Math.PI / 180; return [cx + Math.cos(a) * R * v / 100, cy + Math.sin(a) * R * v / 100]; }
  function poly(v){ return keys.map(function(k, i){ return pt(i, Array.isArray(v) ? v[i] : v).map(r1).join(','); }).join(' '); }
  var s = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fd1a9" stop-opacity="' + (dark ? .62 : .5) + '"/><stop offset="1" stop-color="#b9a3f2" stop-opacity="' + (dark ? .62 : .5) + '"/></linearGradient>' +
    '<radialGradient id="' + id + 'h"><stop offset="0" stop-color="#8fd1a9" stop-opacity=".18"/><stop offset=".6" stop-color="#b9a3f2" stop-opacity=".07"/><stop offset="1" stop-color="#b9a3f2" stop-opacity="0"/></radialGradient></defs>';
  if (dark) s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R * 1.4) + '" fill="url(#' + id + 'h)"/>';
  s += '<path d="M' + poly(60) + ' Z M' + poly(40) + ' Z" fill-rule="evenodd" fill="' + (dark ? 'rgba(143,209,169,.08)' : '#eaf0ec') + '"/>';
  [100, 66, 33].forEach(function(v){ s += '<polygon points="' + poly(v) + '" fill="none" stroke="' + c.grid + '" stroke-width="1"/>'; });
  keys.forEach(function(k, i){ var p = pt(i, 100); s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + r1(p[0]) + '" y2="' + r1(p[1]) + '" stroke="' + c.grid + '" stroke-width="1"/>'; });
  var vals = keys.map(function(k){ return P[k]; });
  s += '<polygon points="' + poly(vals) + '" fill="url(#' + id + ')" stroke="' + c.line + '" stroke-width="2" stroke-linejoin="round"/>';
  vals.forEach(function(v, i){ var p = pt(i, v); s += '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="4" fill="' + c.dot + '" stroke="' + c.line + '" stroke-width="2"/>'; });
  var pos = [[0, -30, 'middle'], [14, -8, 'start'], [8, 22, 'start'], [-8, 22, 'end'], [-14, -8, 'end']];
  keys.forEach(function(k, i){ var p = pt(i, 100), o = pos[i], x = p[0] + o[0], y = p[1] + o[1];
    s += txt(x, y, esc(T.bereiche[k].name), { size:13, fill:c.lab, anchor:o[2] }) + txt(x, y + 18, String(P[k]), { display:1, size:16, weight:300, fill:c.val, anchor:o[2] }); });
  return svg(W, H, s, '', 'width:100%;display:block');
}
// Ring wie im Beispielbericht der Startseite: Bogen links, Zahl und Name rechts daneben
function ringDark(v, col, label){
  var r = 30, C = 2 * Math.PI * r;
  var s = '<circle cx="38" cy="38" r="' + r + '" fill="none" stroke="' + K.otr + '" stroke-width="7"/>' +
    '<circle cx="38" cy="38" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + r1(C * v / 100) + ' ' + r1(C) + '" transform="rotate(-90 38 38)"/>';
  return '<div class="dring">' + svg(76, 76, s, '', 'width:11.5mm;display:block;flex:none') + '<div><b>' + v + '</b><span>' + esc(label) + '</span></div></div>';
}
// Kleiner Kreis der acht Beziehungsstile
function circDark(b){
  var cx = 110, cy = 76, r0 = 9, R = 52, rr = function(v){ return r0 + (R - r0) * v / 100; };
  var s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + K.obg + '" stroke="' + K.ocs + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + rr(50) + '" fill="none" stroke="' + K.ocs + '" stroke-dasharray="2 3"/>';
  Object.keys(b.ang).forEach(function(k){ var a = -b.ang[k], v = b.sc[k], foc = k === b.focus;
    s += sector(cx, cy, r0, rr(v), a - 20, a + 20, foc ? K.ocf : K.oco, ' fill-opacity="' + (foc ? .95 : r1(.25 + .4 * v / 100)) + '"'); });
  var cap = function(x, y, t, anchor){ return txt(x, y, t, { mono:1, size:10, fill:K.ocap, anchor:anchor || 'middle', ls:1 }); };
  s += cap(cx, cy - R - 7, 'EINFLUSS') + cap(cx, cy + R + 15, 'RAUM') + cap(cx + R + 5, cy + 3.5, 'NÄHE', 'start') + cap(cx - R - 5, cy + 3.5, 'ABSTAND', 'end');
  return svg(220, 152, s, '', 'width:39mm;display:block;flex:none');
}
function zoneDark(){
  var o = { mono:1, size:17, fill:K.ozl, anchor:'middle' };
  var id = uid(), s = '<defs><linearGradient id="' + id + '" x1="0" x2="1"><stop offset="0" stop-color="' + K.g1 + '"/><stop offset="1" stop-color="' + K.g2 + '"/></linearGradient></defs>' +
    '<rect x="0" y="30" width="620" height="10" rx="5" fill="' + K.ozt + '"/><rect x="248" y="30" width="124" height="10" fill="url(#' + id + ')" fill-opacity=".5"/>' +
    txt(248, 21, '40', o) + txt(372, 21, '60', o) + txt(124, 64, 'eher niedrig', o) + txt(310, 64, 'mittel', o) + txt(496, 64, 'eher hoch', o);
  return svg(620, 70, s, '', 'width:58mm;display:block');
}
function emoKey(e){ var P = e.P, N = e.N; return (P >= 40 && P <= 60) || (N >= 40 && N <= 60) ? 'mid' : (P > 60 ? 'h' : 'l') + (N > 60 ? 'h' : 'l'); }
function satz1(t){ return t.split('. ')[0].replace(/\.$/, '') + '.'; }
function dtile(cls, glow, titel, idx, body){
  return '<div class="tile ' + cls + '" style="--glow:' + glow + '"><p class="tl"><span>' + esc(titel) + '</span>' + (idx != null ? '<span class="pref" data-kap="' + idx + '"></span>' : '') + '</p>' + body + '</div>';
}
function overviewDark(m){
  var U = T.uebersicht, right = (m.st ? 1 : 0) + (m.wb || m.stress ? 1 : 0), tiles = [];
  if (m.P) {
    var ks = ['O','C','E','A','S'], hi = ks.slice().sort(function(a, b){ return m.P[b] - m.P[a]; })[0], lo = ks.slice().sort(function(a, b){ return m.P[a] - m.P[b]; })[0], foot = '';
    if (m.P.facets) { // Die Facetten der emotionalen Stabilität beschreiben Herausforderungen, deshalb nur die vier anderen Bereiche
      var tf = []; ['O','C','E','A'].forEach(function(d){ for (var j = 1; j <= 6; j++) tf.push({ f:d + j, v:m.P.facets[d + j] }); });
      tf.sort(function(a, b){ return b.v - a.v; });
      foot = '<p class="dfoot" data-opt="3">' + U.facetten + ': ' + tf.slice(0, 3).map(function(x){ return esc(Q.facetten[x.f].name) + ' ' + x.v; }).join(', ') + '</p>';
    }
    var stat = '<div class="dstat"><div><span>' + U.deutlichst + '</span><b>' + esc(T.bereiche[hi].name) + '<em>' + m.P[hi] + '</em></b></div><div><span>' + U.wenigsten + '</span><b>' + esc(T.bereiche[lo].name) + '<em>' + m.P[lo] + '</em></b></div></div>';
    tiles.push(dtile(right === 2 ? 'c7 r2' : right === 1 ? 'c7' : 'c12', 'rgba(143,209,169,.20)', 'Persönlichkeit', 0, '<div class="drad">' + radar2(m.P, DK) + '</div>' + stat + foot));
  }
  var cr = m.P ? 'c5' : right === 2 ? 'c6' : 'c12';
  if (m.st) tiles.push(dtile(cr, 'rgba(185,163,242,.24)', U.topStaerken, 2, '<div class="dstr">' + m.top.map(function(x, i){
      return '<div><span class="r">' + (i + 1) + '</span><span>' + esc(Q.staerken[x.k].name) + '</span><i><b style="width:' + x.v + '%"></b></i><span class="v">' + x.v + '</span></div>'; }).join('') + '</div>' +
    '<p class="dfoot" data-opt="2">' + U.seltener + ': ' + m.low3.map(function(x){ return esc(Q.staerken[x.k].name); }).join(', ') + '</p>'));
  if (m.wb || m.stress) {
    var rf = '';
    if (m.wb && m.stress) rf = esc(waageCap(waageListen(m)));
    else if (m.wb) { var bw = ['F','M','O','S','V'].sort(function(a, b){ return m.wb[b] - m.wb[a]; })[0]; rf = U.wbStark + ': ' + WBN[bw] + ' ' + m.wb[bw]; }
    else { var ls = [['A','Anspannung'], ['R','Reizbarkeit'], ['U','Überforderung']].sort(function(a, b){ return m.stress[b[0]] - m.stress[a[0]]; })[0]; rf = U.fordert + ': ' + ls[1] + ' ' + m.stress[ls[0]]; }
    tiles.push(dtile(cr, 'rgba(232,210,122,.16)', T.kapitel[3].titel, 3, '<div class="dwb"><div class="drings">' + (m.wb ? ringDark(m.wb.ov, K.owb, U.wb) : '') + (m.stress ? ringDark(m.stress.ov, K.ost, U.belastbarkeit) : '') + '</div><p class="dnote">' + rf + '</p></div>'));
  }
  if (m.bez) {
    var b = m.bez;
    tiles.push(dtile(m.emo ? 'c6' : 'c12', 'rgba(95,208,184,.20)', TESTS.beziehung.name, 4, '<div class="dbez">' + circDark(b) + '<div><span class="k">' + (b.focus === 'AUS' ? U.ausgewogen : U.schwerpunkt) + '</span><b>' + BEZ[b.focus] + '</b>' +
      '<span class="k" style="margin-top:2.4mm">' + U.stileTop + '</span><div class="top3">' + b.top3.map(function(k){ return '<span>' + BEZ[k] + ' <em>' + b.sc[k] + '</em></span>'; }).join('') + '</div></div></div>' +
      '<p class="dfoot" data-opt="1">' + esc(satz1(T.fuehlen.stile[b.focus].text)) + '</p>'));
  }
  if (m.emo) {
    var lab = { W:'Gefühle<br>wahrnehmen', P:'Freude<br>zeigen', N:'Schweres<br>zeigen', J:'Mit-<br>schwingen', E:'Bauch-<br>gefühl' }, z = T.fuehlen.zeigen[emoKey(m.emo)];
    tiles.push(dtile(m.bez ? 'c6' : 'c12', 'rgba(236,140,206,.20)', TESTS.emotionen.name, 4, '<div class="eq">' + Object.keys(EMN).map(function(k){ var v = m.emo[k];
      return '<div class="eqc"><b>' + v + '</b><div class="eqt"><i style="height:' + v + '%"></i></div><span>' + lab[k] + '</span></div>'; }).join('') + '</div>' +
      '<p class="dfoot" data-opt="1">' + esc(satz1(z)) + '</p>'));
  }
  // Werte und Chronotyp als schmale Kacheln: Schwerpunkt bzw. Typ und das Wichtigste daneben
  var klein = (m.werte ? 1 : 0) + (m.chrono ? 1 : 0);
  if (m.werte) {
    var w = m.werte, wn = Q.werte.texte, wl = (w.top.length ? w.top : w.rk.slice(0, 3));
    tiles.push(dtile(klein === 2 ? 'c6' : 'c12', 'rgba(242,128,128,.18)', TESTS.werte.name, 6, '<div class="dkv"><div><span class="k">' + U.schwerpunkt + '</span><b style="color:' + K.wtx + '">' + esc(Q.werte.regionen[w.reg].name) + '</b></div>' +
      '<div><span class="k">' + U.wichtig + '</span><div class="top3">' + wl.map(function(f){ return '<span>' + esc(wn[f].name) + ' <em>' + w.sc[f] + '</em></span>'; }).join('') + '</div></div></div>'));
  }
  if (m.chrono) {
    var c = m.chrono, ct = Q.chrono.typen[c.ti];
    tiles.push(dtile(klein === 2 ? 'c6' : 'c12', 'rgba(196,222,118,.16)', U.rhythmus, 7, '<div class="dkv"><div><span class="k">' + U.chronotyp + '</span><b style="color:' + K.lim + '">' + esc(ct.name) + '</b></div>' +
      '<div><span class="k">' + U.hoch + '</span><div class="top3"><span>etwa ' + uhr(c.peak - 1.5) + ' bis ' + uhr(c.peak + 1.5) + ' Uhr</span><span>' + U.jetlag + ' <em>' + esc(Q.chrono.jetlag[c.ji].lvl) + '</em></span></div></div></div>' +
      '<div class="cspec"><i style="left:' + c.E + '%;border-color:' + K.lim + '"></i></div>'));
  }
  var mu = m.muster.gezeigt;
  if (mu.length) {
    var dots = function(r){ var p = r.pills(m); return '<span class="dots"><i style="background:' + TESTS[p[0].test].f + '"></i><i style="background:' + TESTS[p[1].test].f + '"></i></span>'; };
    var feat = '<div class="feat"><p class="pk">' + dots(mu[0]) + 'Muster 1 von ' + mu.length + '</p><p class="fq">„' + esc(val(mu[0].titel, m)) + '“</p></div>';
    var rest = mu.slice(1).map(function(r, i){ return '<div>' + dots(r) + '<span class="n">' + (i + 2) + '</span><span>' + esc(val(r.titel, m)) + '</span></div>'; }).join('');
    tiles.push(dtile('c12', 'rgba(150,140,255,.18)', U.muster, 1, '<div class="dmu' + (rest ? '' : ' solo') + '">' + feat + (rest ? '<div class="dlist">' + rest + '</div>' : '') + '</div>'));
  }
  return '<div class="bento">' + tiles.join('') + '</div>';
}
// Drei feine Linien wie unter dem Startbereich der Website, an den Enden ausgeblendet
// Farbverlauf über Text als einzeln gefärbte Buchstaben: background-clip:text zeichnet im PDF eine feine Rahmenlinie
function verlauf(str){
  function rgb(h){ return [1, 3, 5].map(function(i){ return parseInt(h.substr(i, 2), 16); }); }
  var a = rgb(K.g1), b = rgb(K.g2), n = str.length;
  return str.split('').map(function(c, i){
    var t = n > 1 ? i / (n - 1) : 0, col = a.map(function(x, j){ return Math.round(x + (b[j] - x) * t); });
    return '<span style="color:rgb(' + col.join(',') + ')">' + esc(c) + '</span>';
  }).join('');
}
function LINIEN(){ return '<svg class="dlines" viewBox="0 0 174 12" preserveAspectRatio="none"><defs><linearGradient id="dl" x1="0" x2="1"><stop offset="0" stop-color="' + K.g1 + '" stop-opacity="0"/><stop offset=".2" stop-color="' + K.g1 + '"/><stop offset=".8" stop-color="' + K.g2 + '"/><stop offset="1" stop-color="' + K.g2 + '" stop-opacity="0"/></linearGradient></defs>' +
  '<path d="M0 6 C 30 1, 60 10, 90 5.5 S 150 1.5, 174 5" fill="none" stroke="url(#dl)" stroke-width=".3" opacity=".7"/>' +
  '<path d="M0 8 C 32 3.5, 64 12, 96 7.5 S 152 3.5, 174 7" fill="none" stroke="url(#dl)" stroke-width=".22" opacity=".45"/>' +
  '<path d="M0 10 C 34 6, 68 13.5, 102 9.5 S 156 5.5, 174 9" fill="none" stroke="url(#dl)" stroke-width=".16" opacity=".3"/></svg>' }
function introDark(m){
  var n = zahl(m.tests.length);
  return '<div class="dhead"><p class="ey">Zu Beginn<span>' + n.replace(/^./, function(c){ return c.toUpperCase(); }) + ' Tests · ' + monat(m.date) + '</span></p>' +
    '<h1>Deine Ergebnisse ' + verlauf('im Überblick') + '</h1>' +
    '<div class="dcols"><div><p class="intro">' + esc(T.einleitung[0].replace('{n}', n)) + '</p></div>' +
    '<div class="dzone"><p>' + esc(T.zahlen) + '</p>' + zoneDark() + '</div></div>' + LINIEN() + '</div>';
}

// Was die fünf stärksten Charakterstärken verbindet (die sechs Gruppen nach Peterson und Seligman)
function gruppen(m){
  var G = T.staerken.gruppen, V = T.staerken.verbindet, cnt = {}, by = {};
  m.top.forEach(function(x){ var v = Q.staerken[x.k].virtue; cnt[v] = (cnt[v] || 0) + 1; (by[v] = by[v] || []).push(Q.staerken[x.k].name); });
  var vs = Object.keys(cnt).sort(function(a, b){ return cnt[b] - cnt[a]; }), max = cnt[vs[0]];
  var liste = function(a){ return a.length > 1 ? a.slice(0, -1).join(', ') + ' und ' + a[a.length - 1] : a[0]; };
  if (max === 1) return V.breit;
  var two = vs.filter(function(v){ return cnt[v] === 2; });
  // Zwei Paare: die Stärken selbst nennen, je Gruppe ein kurzer Halbsatz statt zweier Gruppentexte
  if (max === 2 && two.length === 2) return V.zwei.replace('{l1}', liste(by[two[0]])).replace('{k1}', G[two[0]].kurz).replace('{l2}', liste(by[two[1]])).replace('{k2}', G[two[1]].kurz);
  var v = vs[0], satz = max === 5 ? V.alle : V.eine.replace('{N}', zahl(max).replace(/^./, function(c){ return c.toUpperCase(); }));
  var dazu = max === 3 && two.length === 1 ? ' ' + V.dazu.replace('{l}', liste(by[two[0]])).replace('{k}', G[two[0]].kurz) : '';
  return satz.replace('{g}', G[v].name).replace('{l}', liste(by[v])) + ' ' + G[v].text + dazu;
}

// Eigene Fragebögen (Werte, Chronotyp) werden im Hinweis eigens genannt
function hinweise(m){ var e = m.werte && m.chrono ? 'beide' : m.werte ? 'werte' : m.chrono ? 'chrono' : null; return e ? [T.hinweis[0], T.hinweisEigen[e]].concat(T.hinweis.slice(1)) : T.hinweis; }

/* ---------- Kapitel ---------- */
// Jedes Kapitel ist eine Liste von Blöcken. Ein Block ist HTML oder ein Objekt mit
// brk (neue Seite), keep (mit dem vorigen Block zusammenhalten), fill (Notizlinien bis Seitenende), pin (an den Seitenfuß).
function chapters(m){
  var C = [], KN = 0; // Kapitelzähler (K sind die Farben)
  function kap(i){ KN++; return { nr:KN, idx:i, titel:T.kapitel[i].titel, head:'Kapitel ' + KN + ' · ' + T.kapitel[i].titel, blocks:[] }; }

  // Zu Beginn: Einleitung und alle Ergebnisse in Kürze auf einer Seite
  C.push({ head:'Zu Beginn', ov:1, blocks:[ introDark(m) + overviewDark(m) ] });

  // Persönlichkeit
  if (m.P) {
    var k1 = kap(0), b1 = k1.blocks, src = m.P.src === 'neo120' ? 'ausführlichen Persönlichkeitstest' : 'Persönlichkeitstest';
    b1.push(opener(k1.nr, k1.titel) + '<div class="kopf"><div><p class="lead">' + esc(T.profil.replace('{quelle}', src).replace('{datum}', fmt(m.P.date))) + '</p><p class="muted small">' + esc(T.netz) + '</p></div><div>' + radar2(m.P, DK) + '</div></div>');
    ['O','C','E','A','S'].forEach(function(k, i){
      var v = m.P[k], bd = band(v), B = T.bereiche[k], what = k === 'S' ? B.what : (m.P.src === 'neo120' ? Q.doms[k].what : Q.big5[k].what);
      b1.push((i === 0 ? '<p class="lbl" style="margin:3mm 0 2mm">Die fünf Bereiche im Einzelnen</p>' : '') +
        '<div class="card"><div class="card-top"><h2>' + B.name + '</h2><div class="val"><span class="n">' + v + '</span><span class="pill">' + BAND[bd] + '</span></div></div>' + zoneBar(v, TESTS.big5, { labels:false }) + '<p class="what">' + esc(what) + '</p>' +
        '<div class="cbody"><div><p><span class="rl">Im Alltag</span>' + esc(B.alltag[bd === 'high' && v <= 75 ? 'highm' : bd === 'low' && v >= 25 ? 'lowm' : bd]) + '</p>' + q(B.frage[bd]) + '</div><div class="ks"><p class="kq"><span class="rl">Kraftquelle</span>' + esc(B.kraft[bd]) + '</p><p class="st"><span class="rl">Stolperstein</span>' + esc(B.stolper[bd]) + '</p></div></div></div>');
    });
    if (m.P.facets) {
      var F = m.P.facets;
      b1.push('<div class="sub"><p class="ey">Kapitel ' + k1.nr + ' · Genauer hingeschaut</p><h2 class="h2b">Deine 30 Facetten</h2><p class="muted" style="margin:0 0 1mm">' + esc(T.facetten.intro) + '</p>' + facetWheel(F) +
        '<div class="legend">' + ['O','C','E','A','N'].map(function(d){ return '<span><i style="background:' + FCOL[d] + '"></i>' + (d === 'N' ? 'Emotionale Stabilität' : T.bereiche[d].name) + '<b>' + (d === 'N' ? 100 - F.N : F[d]) + '</b></span>'; }).join('') + '</div>' +
        '<p class="muted small center" style="margin:2mm 0 0">Bei der emotionalen Stabilität zeigen die Facetten, was sie herausfordert: Je höher der Wert, desto deutlicher erlebst du es.</p></div>');
      b1.push('<div class="sub"><p class="ey">Kapitel ' + k1.nr + ' · Genauer hingeschaut</p><h2 class="h2b">Was die Facetten zeigen</h2><p class="muted" style="margin-bottom:3mm">' + esc(T.facetten.genauer) + '</p></div>');
      ['O','C','E','A','N'].forEach(function(d){
        var fs = [1,2,3,4,5,6].map(function(j){ return { f:d + j, v:F[d + j] }; }), hi = fs.slice().sort(function(a, b){ return b.v - a.v; })[0], lo = fs.slice().sort(function(a, b){ return a.v - b.v; })[0];
        var name = d === 'N' ? 'Emotionale Stabilität' : T.bereiche[d].name, deutlich = hi.v - lo.v >= 20, txtp;
        var satz = function(x){ var b = band(x.v); return b === 'mid' ? null : Q.facetten[x.f][b]; };
        var teil = function(lbl, x){ var t = satz(x); return lbl + ' <b>' + esc(Q.facetten[x.f].name) + '</b> (' + x.v + ')' + (t ? '. ' + esc(t) : ', ' + esc(T.facetten.mitte)); };
        if (deutlich) txtp = esc(T.facetten.deutlich.replace('{bereich}', name)) + ' ' + teil(T.facetten.staerkste, hi) + ' ' + teil(T.facetten.schwaechste, lo);
        else txtp = esc(T.facetten.nah);
        if (d === 'N') txtp += ' <span class="muted">' + esc(T.facetten.stabilitaet) + '</span>';
        var bars = fs.map(function(x){ var em = deutlich && (x === hi || x === lo); return '<div style="display:grid;grid-template-columns:30mm 1fr 6mm;gap:2mm;align-items:center;font-size:8pt;margin-bottom:.9mm"><span style="' + (em ? 'font-weight:700' : 'color:' + K.fname) + '">' + esc(Q.facetten[x.f].name) + '</span><div class="bar" style="background:' + K.fbar + '"><span style="width:' + x.v + '%;background:' + FCOL[d] + ';opacity:' + (em || !deutlich ? 1 : .55) + '"></span></div><span style="font-family:var(--mono);font-size:7pt;text-align:right">' + x.v + '</span></div>'; }).join('');
        // Die Überschrift soll nicht allein am Seitenende stehen: die erste Zeile hält sie fest
        b1.push({ keep: d === 'O', html: '<div class="frow"><div><p class="lbl" style="color:' + FCOL[d] + '">' + name + '</p>' + bars + '</div><p style="margin:3.4mm 0 0">' + txtp + '</p></div>' });
      });
    } else b1.push('<p class="muted">' + esc(T.facetten.ohne) + '</p>');
    C.push(k1);
  }

  // Muster
  var k2 = kap(1), b2 = k2.blocks, mu = m.muster;
  b2.push(opener(k2.nr, k2.titel, esc(T.muster.intro)));
  if (!mu.gezeigt.length) b2.push('<p>' + esc(T.muster.keins) + '</p>');
  mu.gezeigt.forEach(function(r, i){
    b2.push('<div class="pattern ' + (r.b ? 'last' : 'kraft') + '"><p class="pnr">' + ico('ringe') + 'Muster ' + (i + 1) + ' von ' + mu.gezeigt.length + '</p>' + conn(r.pills(m)) + '<h2>' + esc(val(r.titel, m)) + '</h2><p>' + esc(r.text(m)) + '</p><div class="try"><p class="lbl">' + ico('funke') + 'Ausprobieren</p><p>' + esc(val(r.uebung, m)) + '</p></div>' + q(val(r.frage, m)) + '</div>');
  });
  // Höchstens vier weitere Verbindungen, damit das Kapitel kompakt bleibt
  if (mu.weitere.length) b2.push('<p class="lbl" style="margin-top:2mm">' + T.muster.weitere + '</p><div class="more">' + mu.weitere.slice(0, 4).map(function(r){ var p = r.pills(m); return '<div>' + esc(val(r.titel, m)) + ' <span>' + esc(p[0].label) + ' · ' + esc(p[1].label) + '</span></div>'; }).join('') + '</div>');
  b2.push({ keep:1, html:ask(T.muster.frage) });
  C.push(k2);

  // Charakterstärken
  if (m.st) {
    var k3 = kap(2), b3 = k3.blocks;
    b3.push(opener(k3.nr, k3.titel, esc(T.staerken.intro)) + strengthRanking(m) + '<p style="margin:3mm 0 0">' + esc(T.staerken.seltener) + '</p>');
    b3.push('<div class="sep" style="margin:5mm 0 4mm"></div><p class="lbl">' + T.staerken.verbindet.titel + '</p><p style="margin:0">' + esc(gruppen(m)) + '</p>');
    // Kein fester Seitenwechsel mehr: die Überschrift wandert mit der ersten Idee, falls der Platz nicht reicht
    b3.push('<div class="sub"><p class="ey">Kapitel ' + k3.nr + ' · ' + k3.titel + '</p><h2 class="h2b" style="margin-bottom:4mm">Ideen für diese Woche</h2></div>');
    m.top.forEach(function(x, i){ var S = Q.staerken[x.k]; b3.push({ keep: i === 0, html:'<div class="idea" style="margin-bottom:3mm"><div class="box"></div><div><p class="lbl">Platz ' + (i + 1) + ' · ' + x.v + '</p><h3>' + esc(S.name) + '</h3><p class="w">' + esc(S.what) + '</p><p>' + esc(T.staerken.ideen[x.k]) + '</p></div></div>' }); });
    b3.push('<p class="muted" style="margin-top:3mm">' + esc(T.staerken.forschung) + '</p>');
    b3.push({ keep:1, html:ask(T.staerken.frage) });
    b3.push({ fill:'notes' });
    C.push(k3);
  }

  // Licht und Schatten: Kehrseiten der stärksten Stärken, was leiser ist, Spannungsfelder
  if (m.st) {
    var ks = kap(8), bs = ks.blocks, SH = T.schatten, blick = window.waehleBlick(m), sp = window.waehleSpannungen(m);
    var zeile = function(lbl, name, v, farbe, text, frage){ return '<div class="shrow"><div><p class="lbl">' + lbl + '</p><h3 style="color:' + farbe + '">' + esc(name) + ' <span class="shv">' + v + '</span></h3></div><div><p>' + esc(text) + '</p>' + (frage ? q(frage) : '') + '</div></div>'; };
    bs.push(opener(ks.nr, ks.titel, esc(SH.intro)));
    bs.push('<h2 class="h2b" style="margin-top:2mm">' + ico('sonne', 'hico') + SH.zuViel + '</h2><p class="muted" style="margin:0 0 1mm">' + esc(SH.zuVielIntro) + '</p>');
    m.top.slice(0, 3).forEach(function(x, i){ bs.push({ keep: i === 0, html: zeile(SH.kehrseite, Q.staerken[x.k].name, x.v, DK ? '#b9a3f2' : '#6b55c4', SH.viel[x.k]) }); });
    bs.push('<div class="sub"><h2 class="h2b">' + ico('fleck', 'hico') + SH.leiser + '</h2><p class="muted" style="margin:0 0 1mm">' + esc(SH.leiserIntro) + '</p></div>');
    m.low3.slice().reverse().forEach(function(x, i){ var b = blick.filter(function(r){ return r.k === x.k; })[0];
      bs.push({ keep: i === 0, html: zeile(SH.staerkeLabel, Q.staerken[x.k].name, x.v, K.fname, b ? b.text(m) : SH.wenig[x.k], b && b.frage) }); });
    if (m.P && m.P.facets) {
      // Facetten, die schon ein Spannungsfeld zeigt, stehen hier nicht noch einmal
      var inSp = [].concat.apply([], sp.map(function(r){ return r.pills(m).map(function(p){ return p.label; }); }));
      var F = m.P.facets, lowF = Object.keys(SH.facette).map(function(f){ return { f:f, v:F[f] }; }).filter(function(x){ return x.v <= 35 && inSp.indexOf(Q.facetten[x.f].name) < 0; }).sort(function(a, b){ return a.v - b.v; }).slice(0, 3);
      lowF.forEach(function(x){ bs.push(zeile(SH.facetteLabel + ' · ' + T.bereiche[x.f.charAt(0)].name, Q.facetten[x.f].name, x.v, FCOL[x.f.charAt(0)], SH.facette[x.f])); });
    }
    if (sp.length) {
      bs.push('<div class="sub"><h2 class="h2b">' + ico('zug', 'hico') + T.muster.spannung + '</h2><p class="muted" style="margin:0">' + esc(T.muster.spannungIntro) + '</p></div>');
      sp.forEach(function(r, i){ bs.push({ keep: i === 0, html:'<div class="pattern spannung"><p class="pnr">' + ico('zug') + 'Spannungsfeld ' + (i + 1) + ' von ' + sp.length + '</p>' + conn(r.pills(m)) + '<h2>' + esc(val(r.titel, m)) + '</h2><p>' + esc(r.text(m)) + '</p>' + q(r.frage) + '</div>' }); });
    }
    bs.push({ keep:1, html:ask(SH.frage) });
    bs.push({ fill:'notes' });
    C.push(ks);
  }

  // Werte
  if (m.werte) {
    var kw = kap(6), bw = kw.blocks, w = m.werte, WT = T.werte, wn = Q.werte.texte, reg = Q.werte.regionen[w.reg];
    bw.push(opener(kw.nr, kw.titel, esc(WT.intro)));
    bw.push('<div class="two" style="grid-template-columns:92mm 1fr;gap:6mm;align-items:center"><div>' + werteKreis(w) + '</div><div><p class="lbl">' + WT.schwerpunkt + '</p><h2 style="margin:0 0 1mm;color:' + K.wtx + '">' + esc(reg.name) + '</h2>' +
      (w.lvl ? '<p class="muted small" style="margin:0 0 2.4mm">' + WT.staerke[w.lvl] + '</p>' : '') + '<p style="font-size:10.4pt">' + esc(reg.text) + '</p><p class="muted small" style="margin:0">' + esc(WT.kreis) + '</p></div></div>');
    bw.push('<p class="lbl" style="margin:4mm 0 2mm">' + WT.wichtigste + '</p>');
    w.rk.slice(0, 3).forEach(function(f){ var lv = w.lv(f);
      bw.push('<div class="card"><div class="card-top"><h2>' + esc(wn[f].name) + '</h2><div class="val"><span class="n">' + w.sc[f] + '</span><span class="pill">' + WLVL[lv] + '</span></div></div><p class="what">' + esc(wn[f].what) + '</p><p style="margin:0">' + esc(wn[f][lv]) + '</p></div>'); });
    var lo = w.rk[w.rk.length - 1];
    if (w.lv(lo) === 'low') bw.push('<div style="margin-top:1mm"><p class="lbl">' + WT.hinten + ' · ' + esc(wn[lo].name) + ' ' + w.sc[lo] + '</p><p style="margin:0">' + esc(wn[lo].low) + '</p></div>');
    if (m.st) {
      var topK = m.top.map(function(x){ return x.k; }), saetze = [];
      w.rk.slice(0, 3).forEach(function(f){
        if (saetze.length >= 2) return;
        var hit = WT.passt[f].filter(function(k){ return topK.indexOf(k) >= 0; }).map(function(k){ return Q.staerken[k].name; });
        if (!hit.length) return;
        var liste = hit.length > 1 ? hit.slice(0, -1).join(', ') + ' und ' + hit[hit.length - 1] : hit[0];
        saetze.push((saetze.length ? (hit.length > 1 ? WT.nochMehr : WT.nochEins) : (hit.length > 1 ? WT.passtMehr : WT.passtEins)).replace('{w}', wn[f].name).replace('{s}', liste).replace('{f}', WT.wofuer[f]));
      });
      if (!saetze.length) saetze.push(WT.passtKeins.replace(/\{w\}/g, wn[w.rk[0]].name).replace('{s}', Q.staerken[m.top[0].k].name));
      bw.push('<p class="lbl" style="margin-top:5mm">' + WT.mitStaerken + '</p><p style="margin:0">' + esc(saetze.join(' ')) + '</p>');
    }
    bw.push({ keep:1, html:'<p class="muted small" style="margin:3mm 0 0">' + esc(WT.quelle) + '</p>' });
    bw.push({ keep:1, html:ask(WT.frage) });
    bw.push({ fill:'notes' }); // Das Kapitel reicht meist knapp auf eine zweite Seite: dort Platz zum Schreiben
    C.push(kw);
  }

  // Wohlbefinden und Stress
  if (m.wb || m.stress) {
    var k4 = kap(3), b4 = k4.blocks;
    b4.push(opener(k4.nr, k4.titel, esc(T.jetzt.intro)));
    var rings = '<div class="rings">' + (m.wb ? ring(m.wb.ov, TESTS.wohlbefinden.f, 'Wohlbefinden') : '') + (m.stress ? ring(m.stress.ov, TESTS.stress.f, 'Belastbarkeit') : '') + '</div>';
    b4.push(rings + (m.wb && m.stress ? '<p class="center" style="max-width:140mm;margin:0 auto 2mm;font-size:10.4pt">' + esc(T.jetzt.gesamt[band(m.wb.ov)][band(m.stress.ov)]) + '</p>' : ''));
    // Der Hinweis steht direkt unter der Gesamteinschätzung, damit er nicht allein auf einer Folgeseite landet
    var care = (m.wb && (m.wb.M < 40 || m.wb.ov < 35)) || (m.stress && (m.stress.U > 70 || m.stress.ov < 30));
    if (care) b4.push('<div class="care" style="margin-top:3mm"><p class="lbl" style="color:' + K.care + '">Gut auf dich achten</p><p style="margin:0">' + esc(T.jetzt.hilfe) + '</p></div>');
    if (m.wb && m.stress) b4.push('<div class="sep" style="margin:4mm 0 3mm"></div><p class="lbl center">Belastung und Kraftquellen</p>' + balance(waageListen(m)));
    var cand = []; if (m.wb) ['F','M','O','S','V'].forEach(function(k){ cand.push({ k:k, n:WBN[k], v:m.wb[k] }); }); if (m.stress) cand.push({ k:'SW', n:'Selbstwirksamkeit', v:m.stress.S });
    var best = cand.filter(function(x){ return x.v >= 40; }).sort(function(a, b){ return b.v - a.v; });
    var staerkt = best.length > 1 ? T.jetzt.staerkt.replace('{a}', best[0].n).replace('{b}', best[1].n) : best.length ? T.jetzt.staerktEins.replace('{a}', best[0].n) : T.jetzt.staerktKeins;
    var flags = []; if (m.wb) ['F','M','O','S','V'].forEach(function(k){ if (m.wb[k] < 40) flags.push({ k:k, d:40 - m.wb[k] }); });
    if (m.stress) { ['A','R','U'].forEach(function(k){ if (m.stress[k] > 60) flags.push({ k:k, d:m.stress[k] - 60 }); }); if (m.stress.S < 40) flags.push({ k:'SW', d:40 - m.stress.S }); }
    flags.sort(function(a, b){ return b.d - a.d; });
    m.schritt = flags.length ? T.jetzt.schritte[flags[0].k] : null;
    b4.push('<div class="two" style="align-items:start;margin-top:4mm"><div><p class="lbl">Was dich gerade stärkt</p><p>' + esc(staerkt) + '</p></div><div><p class="lbl">Ein kleiner Schritt</p><p>' + esc(m.schritt || T.jetzt.keinSchritt) + '</p></div></div>');
    b4.push({ keep:1, html:ask(T.jetzt.frage) });
    if (care) b4.push({ fill:'notes' }); // Mit Hinweis wird das Kapitel länger: Platz zum Schreiben statt einer halbleeren Seite
    C.push(k4);
  }

  // Chronotyp
  if (m.chrono) {
    var kc = kap(7), bc = kc.blocks, c = m.chrono, RT = T.rhythmus, ty = Q.chrono.typen[c.ti], jl = Q.chrono.jetlag[c.ji];
    bc.push(opener(kc.nr, kc.titel, esc(RT.intro)));
    bc.push('<div class="card-top" style="margin:1mm 0 2mm"><h2 style="color:' + K.lim + '">' + esc(ty.name) + '</h2><div class="val"><span class="n">' + c.E + '</span><span class="pill">Abendtendenz</span></div></div>' + tagKurve(c) +
      '<p class="muted small center" style="margin:1mm 0 3mm">' + esc(RT.kurve) + '</p><p style="font-size:10.4pt">' + esc(ty.text) + '</p><p><b>' + esc(RT.hoch.replace('{a}', uhr(c.peak - 1.5)).replace('{b}', uhr(c.peak + 1.5))) + '.</b></p>');
    bc.push('<div class="two" style="align-items:start;margin-top:3mm"><div><p class="lbl">' + RT.tag + '</p><p>' + esc(ty.day) + '</p></div><div><p class="lbl">' + RT.abend + '</p><p>' + esc(ty.eve) + '</p></div></div>');
    bc.push('<div class="sep" style="margin:3mm 0 3mm"></div><p class="lbl">' + RT.jetlag + ' · ' + esc(jl.lvl) + (c.jh ? ' · etwa ' + c.jh + ' Std.' : '') + '</p><p style="margin:0">' + esc(jl.text) + '</p><p class="muted small" style="margin:2.4mm 0 0">' + esc(RT.quelle) + '</p>');
    bc.push({ keep:1, html:ask(RT.frage) });
    C.push(kc);
  }

  // Emotionen und Beziehungsstil
  if (m.emo || m.bez) {
    var k5 = kap(4), b5 = k5.blocks;
    b5.push(opener(k5.nr, k5.titel, esc(T.fuehlen.intro)));
    if (m.emo) {
      var P = m.emo.P, N = m.emo.N, key = emoKey(m.emo);
      b5.push('<h2 style="margin-top:2mm">Wie du Gefühle zeigst</h2><div class="two" style="grid-template-columns:80mm 1fr;align-items:center">' + emotionField(P, N) + '<div><p style="font-size:10.4pt">' + esc(T.fuehlen.zeigen[key]) + '</p><p class="lbl" style="margin-top:4mm">Deine fünf Gefühlsbereiche</p>' +
        Object.keys(EMN).map(function(k){ return '<div class="erow"><span>' + EMN[k] + '</span><div class="bar" style="background:' + K.ebar + '"><span style="width:' + m.emo[k] + '%;background:linear-gradient(90deg,#f3b5df,#d65fb0)"></span></div><span class="v">' + m.emo[k] + '</span></div>'; }).join('') + '</div></div>');
    }
    if (m.bez) {
      var st = T.fuehlen.stile[m.bez.focus];
      b5.push((m.emo ? '<div class="sep" style="margin:4mm 0 3mm"></div>' : '') + '<h2>Wie du anderen begegnest</h2><div class="two" style="grid-template-columns:1fr 96mm;gap:5mm;align-items:center"><div>' +
        '<p class="lbl">Dein Schwerpunkt: ' + BEZ[m.bez.focus] + '</p><p style="font-size:10.4pt">' + esc(st.text) + '</p>' + (st.einladung ? '<p><b>Eine Einladung:</b> ' + esc(st.einladung) + '</p>' : '') +
        '<p class="muted small" style="margin:0 0 2mm">Deine drei stärksten Stile: ' + m.bez.top3.map(function(k){ return BEZ[k] + ' (' + m.bez.sc[k] + ')'; }).join(', ') + '</p><p class="muted small" style="margin:0">' + esc(T.fuehlen.achsen) + '</p></div>' + circumplex(m.bez) + '</div>');
    }
    b5.push({ keep:1, html:ask(T.fuehlen.frage) });
    C.push(k5);
  }

  // Nächste Schritte
  var steps = [];
  if (m.top) steps.push({ k:'Deine stärkste Charakterstärke · ' + Q.staerken[m.top[0].k].name, h:'Etwas aus deiner Stärke machen', p:T.staerken.ideen[m.top[0].k], kurz: Q.staerken[m.top[0].k].name + ' leben' });
  if (m.schritt) steps.push({ k:'Wie es dir gerade geht', h:'Ein kleiner Schritt', p:m.schritt, kurz:'Kleiner Schritt' });
  else { var fm = mu.gezeigt.filter(function(r){ return r.id.charAt(0) !== 'G'; })[0]; // Grundmuster nicht, sie greifen die stärkste Stärke schon auf
    if (fm) steps.push({ k: fm === mu.gezeigt[0] ? 'Aus deinem ersten Muster' : 'Aus deinen Mustern', h:val(fm.titel, m), p:val(fm.uebung, m), kurz:val(fm.kurz, m) }); }
  var bl = 'gute';
  if ((m.emo && m.emo.W < 40) || mu.gezeigt.some(function(r){ return r.id === 'M4'; })) bl = 'emotion';
  else if ((m.wb && m.wb.V < 40) || (m.chrono && m.chrono.J >= 50)) bl = 'schlaf';
  else if (m.wb && (m.wb.F < 40 || m.wb.O < 40)) bl = 'gute';
  else if (m.P && (m.P.O > 60 || (m.P.facets && m.P.facets.O1 > 60))) bl = 'traum';
  var B = T.schritte.blaetter[bl];
  steps.push({ k:'Arbeitsblatt · ordinum.de/arbeitsmaterial', h:B.name, p:B.text + ' Kostenlos zum Ausdrucken.', kurz:B.name });
  var k6 = kap(5), b6 = k6.blocks;
  b6.push(opener(k6.nr, k6.titel, esc(T.schritte.intro.replace('{n}', zahl(steps.length)))));
  steps.forEach(function(s, i){ b6.push('<div class="step" style="margin-bottom:3.4mm"><div class="num">' + (i + 1) + '</div><div><p class="k">' + esc(s.k) + '</p><h3>' + esc(s.h) + '</h3><p>' + esc(s.p) + '</p></div></div>'); });
  b6.push({ keep:1, html:'<div class="ask" style="margin-top:5mm"><p class="lbl">' + ico('buch') + esc(T.schritte.rueckblick) + '</p><p>' + esc(T.schritte.rueckblickFrage) + '</p><div class="ln"></div><div class="ln"></div></div>' });
  b6.push({ fill:'notes' });
  C.push(k6);

  // Zum Schluss
  C.push({ head:'Zum Schluss', blocks:[
    '<p class="ey">Zum Schluss</p><h1>Eine Momentaufnahme</h1><p class="end">' + esc(T.schluss) + '</p>',
    '<div class="sep" style="margin:8mm 0 5mm"></div><p class="lbl">Eingeflossene Tests</p><div class="src">' + m.tests.map(function(k){ return '<span>' + esc(TESTS[k].name) + '</span><span>' + fmt(m.t[k].date) + '</span>'; }).join('') + '</div>',
    '<div class="einordnung"><p class="lbl">' + esc(T.einordnung) + '</p>' + hinweise(m).map(function(p){ return '<p class="fine">' + esc(p) + '</p>'; }).join('') + '</div>',
    { pin:1, html:'<div style="margin-top:10mm;display:flex;align-items:center;gap:3mm;border-top:.25mm solid var(--line);padding-top:5mm"><img src="' + LOGO + '" style="height:9mm;filter:' + K.logo + '"><span class="wm" style="color:' + K.wm + ';font-size:11pt">ORD<i>I</i>NUM</span><span class="muted small" style="margin-left:auto;text-align:right">' + esc(T.autor) + '<br>ordinum.de</span></div>' }
  ]});
  return C;
}

/* ---------- Seiten ---------- */
function cover(m, C){
  var lines = '<svg class="lines" viewBox="0 0 210 297" preserveAspectRatio="none"><defs><linearGradient id="cl" x1="0" x2="1"><stop offset="0" stop-color="' + K.g1 + '"/><stop offset="1" stop-color="' + K.g2 + '"/></linearGradient></defs>' +
    '<path d="M-10 196 C 40 176, 80 214, 130 196 S 200 170, 230 186" fill="none" stroke="url(#cl)" stroke-width=".35" opacity=".55"/>' +
    '<path d="M-10 204 C 50 188, 90 226, 140 206 S 205 182, 230 196" fill="none" stroke="url(#cl)" stroke-width=".25" opacity=".38"/>' +
    '<path d="M-10 212 C 45 200, 100 236, 150 216 S 210 194, 230 206" fill="none" stroke="url(#cl)" stroke-width=".2" opacity=".25"/></svg>';
  return '<section class="page cover"><div class="bg"></div>' + lines +
    '<div class="brand"><img src="' + LOGO + '" alt=""><span class="wm">ORD<i>I</i>NUM</span></div>' +
    '<div class="title"><p class="ey">Individualisierter Bericht</p><div class="name">' + esc(m.name) + '</div><div class="meta">' + monat(m.date) + ' · ' + m.tests.length + ' Tests · <span id="pc"></span> Seiten</div></div>' +
    '<div class="toc">' + C.filter(function(ch){ return ch.nr; }).map(function(ch){ return '<div><b>' + String(ch.nr).padStart(2, '0') + '</b>' + ico(KICO[ch.idx], 'tico') + esc(ch.titel) + '<span id="toc' + ch.nr + '"></span></div>'; }).join('') + '</div></section>';
}
// Dunkle Seite: weiche Lichtflecken und drei feine Linien wie auf der Startseite
// Dunkle Seite: weiche Lichtflecken wie auf dem Deckblatt
var BGD = '<div class="bgd"></div>';
function newPage(root, head, foot, ov){
  var s = document.createElement('section'); s.className = 'page' + (ov ? ' ov' : '');
  s.innerHTML = (ov || DK ? BGD : '') + '<div class="ph"><span>' + esc(head) + '</span><img src="' + LOGO + '" alt=""></div><div class="inner"></div><div class="pf"><span>' + esc(foot) + '</span><span class="pn"></span></div>';
  root.appendChild(s); return s.querySelector('.inner');
}
// Gemessen wird die Unterkante des letzten Blocks, ohne seinen Außenabstand nach unten
function over(inner){ return used(inner) > inner.clientHeight + 1; }
function used(inner){ var l = inner.lastElementChild; return l ? l.offsetTop + l.offsetHeight : 0; }
function notes(inner){
  var n = Math.min(12, Math.floor((inner.clientHeight - used(inner) - 16 * MM) / (8.5 * MM)));
  if (n < 3) return;
  var wrap = document.createElement('div');
  wrap.innerHTML = '<div class="notes" style="margin-top:7mm"><p class="lbl">' + esc(T.schritte.notizen) + '</p>' + new Array(n + 1).join('<div class="ln"></div>') + '</div>';
  inner.appendChild(wrap);
  if (over(inner)) inner.removeChild(wrap);
}
// Übersicht: Reicht der Platz nicht, entfallen zuerst die Fußzeilen der kleinen Kacheln, dann die der großen,
// und zuletzt rücken die Kacheln enger zusammen (kleinere Netzgrafik und Musterzitat)
function fit(inner){
  for (var o = 1; o <= 3 && over(inner); o++) Array.prototype.forEach.call(inner.querySelectorAll('[data-opt="' + o + '"]'), function(e){ e.parentNode.removeChild(e); });
  var b = inner.querySelector('.bento'); if (b && over(inner)) b.classList.add('eng');
}
function render(root){
  var m = model(D), foot = 'Individualisierter Bericht · ' + m.name + ' · ' + monat(m.date), warn = [], C = chapters(m);
  root.innerHTML = cover(m, C);
  C.forEach(function(ch){
    var inner = newPage(root, ch.head, foot, ch.ov);
    ch.page = root.querySelectorAll('.page').length;
    ch.blocks.forEach(function(b){
      if (typeof b === 'string') b = { html:b };
      if (b.fill) { notes(inner); return; }
      if (b.brk && inner.children.length) inner = newPage(root, ch.head, foot, ch.ov);
      var wrap = document.createElement('div');
      wrap.innerHTML = b.html; inner.appendChild(wrap);
      if (ch.ov) fit(inner);
      if (over(inner)) {
        var prev = wrap.previousElementSibling;
        // Eine Frage soll nicht allein auf einer Seite stehen: dann wandert der Block davor mit
        if (b.keep && prev && inner.children.length > 2) { inner = newPage(root, ch.head, foot, ch.ov); inner.appendChild(prev); inner.appendChild(wrap); }
        else if (inner.children.length > 1) { inner.removeChild(wrap); inner = newPage(root, ch.head, foot, ch.ov); inner.appendChild(wrap); }
        if (over(inner)) warn.push(ch.head + ': Block zu hoch für eine Seite');
      }
      if (b.pin && !over(inner)) wrap.style.cssText = 'position:absolute;left:0;right:0;bottom:0';
    });
  });
  var pages = root.querySelectorAll('.page');
  pages.forEach(function(p, i){ var pn = p.querySelector('.pn'); if (pn) pn.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(pages.length).padStart(2, '0'); });
  root.querySelector('#pc').textContent = pages.length;
  C.forEach(function(ch){ var el = ch.nr && root.querySelector('#toc' + ch.nr); if (el) el.textContent = String(ch.page).padStart(2, '0'); });
  Array.prototype.forEach.call(root.querySelectorAll('.pref'), function(el){ var ch = C.filter(function(c){ return c.idx === +el.getAttribute('data-kap'); })[0]; if (ch) el.textContent = 'S. ' + ch.page; });
  window.BERICHT = { seiten: pages.length, warnungen: warn, muster: m.muster.gezeigt.map(function(r){ return r.id; }), weitere: m.muster.weitere.map(function(r){ return r.id; }), spannungen: window.waehleSpannungen(m).map(function(r){ return r.id; }), blick: window.waehleBlick(m).map(function(r){ return r.id; }), kapitel: C.map(function(ch){ return ch.head + ' → S. ' + ch.page; }),
    fuellung: Array.prototype.map.call(pages, function(p, i){ var inn = p.querySelector('.inner'); return inn ? (i + 1) + ': ' + Math.round(used(inn) / MM) + '/' + Math.round(inn.clientHeight / MM) + 'mm' + ' [' + Array.prototype.map.call(inn.children, function(c){ return Math.round(c.offsetHeight / MM); }).join(',') + ']' : (i + 1) + ': Deckblatt'; }) };
}
// Schriften explizit laden, damit die Seitenaufteilung mit den echten Schriften gemessen wird
var SCHRIFTEN = null;
function schriften(){
  if (!SCHRIFTEN) SCHRIFTEN = (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function(){
    return Promise.all(['400 12px "Hanken Grotesk"','700 12px "Hanken Grotesk"','300 12px Unbounded','400 12px Unbounded','400 12px "JetBrains Mono"','500 12px "JetBrains Mono"'].map(function(f){ return document.fonts.load(f, 'ÄÖÜäöüß'); }));
  }).catch(function(){});
  return SCHRIFTEN;
}
// daten: { name, date:'JJJJMMTT', tests:{ testname:{ date, ...Werte 0 bis 100 } } }
// optionen: root (Element), dunkel (true/false), seiten (nur die ersten n Seiten behalten, z. B. für die Vorschau)
window.OrdinumBericht = {
  render: function(daten, o){
    o = o || {};
    return schriften().then(function(){
      D = daten; thema(o.dunkel);
      var root = o.root || document.getElementById('report');
      root.setAttribute('data-rt', DK ? 'dark' : 'light');
      render(root);
      var info = window.BERICHT;
      if (o.seiten) Array.prototype.slice.call(root.querySelectorAll('.page'), o.seiten).forEach(function(p){ p.parentNode.removeChild(p); });
      return info;
    });
  },
  // Welche Tests der Bericht nutzt (Reihenfolge wie im Bericht)
  tests: TESTS
};
})();
