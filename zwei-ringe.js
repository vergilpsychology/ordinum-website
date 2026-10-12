// Zwei Ringe: das persönliche Zeichen aus den Testergebnissen.
// Acht Achsen mit je zwei Gegenpolen. Der helle Ring wird zu den Polen gezogen, die jemand stark lebt,
// der violette ist seine Punktspiegelung und zieht zu den leiseren Gegenpolen.
// Werte und Beziehungsstil stehen so im Kreis wie in ihren Originalmodellen (Schwartz, Wiggins): je zwei Achsen im 90°-Winkel.
// Herleitung und Quellen: Konzept „Zwei Ringe“ (12.10.2026).
(function(){
  // Position i liegt bei i × 22,5° im Uhrzeigersinn ab oben, Pol b gegenüber
  var ACHSEN = [
    {a: 'Präsenz', b: 'Raumgeben', test: 'beziehung'},
    {a: 'Kontakt', b: 'Stille', test: 'person'},
    {a: 'Erneuerung', b: 'Bewahrung', test: 'werte'},
    {a: 'Offenheit', b: 'Bodenhaftung', test: 'person'},
    {a: 'Nähe', b: 'Eigenraum', test: 'beziehung'},
    {a: 'Ordnung', b: 'Spontaneität', test: 'person'},
    {a: 'Wirkung', b: 'Fürsorge', test: 'werte'},
    {a: 'Gelassenheit', b: 'Empfindsamkeit', test: 'person'}
  ];
  // Farbpaar „Mondlicht“: Champagner-Gold für das Gelebte, Dämmerviolett für das Leisere
  var FARBEN = {dunkel: {a: '#e8d9b5', b: '#7f78c8', netz: 'rgba(238,242,238,.07)', text: '#c9c2b0', leise: '#a9a4d8'},
                hell: {a: '#9a7b3c', b: '#5b54b0', netz: 'rgba(20,24,22,.09)', text: '#6e5a2e', leise: '#5b54b0'}};
  // Beziehungsstil: Winkel der acht Stile im interpersonellen Kreis (wie auf der Testseite)
  var IPC = {LM: 0, NO: 45, PA: 90, BC: 135, DE: 180, FG: 225, HI: 270, JK: 315};
  var IPC_MAX = 100 * (1 + 2 * Math.SQRT1_2); // größtmögliche Summe auf einer Hauptachse

  function mw(){ var s = 0; for (var i = 0; i < arguments.length; i++) s += arguments[i]; return s / arguments.length; }
  function klemm(x){ return Math.max(0, Math.min(1, x)); }

  // t: {neo120, big5, werte, beziehung}, jeweils die Skalenwerte (0 bis 100) des neuesten Ergebnisses
  function modell(t){
    t = t || {};
    var P = null;
    if (t.neo120) P = {O: t.neo120.O, C: t.neo120.C, E: t.neo120.E, A: t.neo120.A, S: 100 - t.neo120.N};
    else if (t.big5) P = {O: t.big5.O, C: t.big5.C, E: t.big5.E, A: t.big5.A, S: t.big5.S};
    var w = t.werte, b = t.beziehung, dom = null, lov = null;
    if (b) {
      dom = 0; lov = 0;
      Object.keys(IPC).forEach(function(k){ var a = IPC[k] * Math.PI / 180; dom += b[k] * Math.sin(a); lov += b[k] * Math.cos(a); });
      dom = .5 + dom / (2 * IPC_MAX); lov = .5 + lov / (2 * IPC_MAX);
    }
    var p = [
      dom,
      P ? P.E / 100 : null,
      w ? .5 + (mw(w.SD, w.ST) - mw(w.SE, w.CO, w.TR)) / 200 : null,
      P ? P.O / 100 : null,
      lov != null ? lov : P ? P.A / 100 : null, // ohne Beziehungsstil: Verträglichkeit als Näherung der Wärmeachse
      P ? P.C / 100 : null,
      w ? .5 + (mw(w.PO, w.AC) - mw(w.UN, w.BE)) / 200 : null,
      P ? P.S / 100 : null
    ];
    var fehlt = p.map(function(x){ return x == null; });
    p = p.map(function(x){ return x == null ? .5 : klemm(x); });
    var da = fehlt.filter(function(f){ return !f; }).length;
    // stärkste innere Dynamik: die Achse mit dem größten Ausschlag
    var best = -1, bi = -1;
    p.forEach(function(x, i){ if (!fehlt[i] && Math.abs(x - .5) > best) { best = Math.abs(x - .5); bi = i; } });
    var dyn = bi < 0 ? null : p[bi] >= .5 ? {achse: bi, stark: ACHSEN[bi].a, leise: ACHSEN[bi].b} : {achse: bi, stark: ACHSEN[bi].b, leise: ACHSEN[bi].a};
    // Ausgeprägtheit: mittlerer Ausschlag der vorhandenen Achsen (0 = alles in der Mitte, 1 = alles an einem Pol)
    var aus = 0; p.forEach(function(x, i){ if (!fehlt[i]) aus += Math.abs(x - .5) * 2; }); aus = da ? aus / da : 0;
    return {p: p, fehlt: fehlt, achsen: da, dyn: dyn, auspraegung: aus,
      balance: aus < .22 ? 'ausgewogen' : aus < .4 ? 'schwerpunkte' : 'klar',
      fehlendeTests: ['person', 'werte', 'beziehung'].filter(function(k){ return ACHSEN.some(function(a, i){ return a.test === k && fehlt[i] && !(i === 4 && P); }); })};
  }

  // 16 Pole: 0 bis 7 die Pole a, 8 bis 15 die Pole b; Violett ist Grün um 180° gedreht
  function pole(m){ var g = []; for (var k = 0; k < 16; k++) g.push(k < 8 ? m.p[k] : 1 - m.p[k - 8]); return g; }
  function winkel(k){ return k * Math.PI / 8 - Math.PI / 2; }
  function radius(R, v){ return R * (.45 + .85 * v); }
  // geschlossene, weiche Kurve durch die Polpunkte (Catmull-Rom als kubische Bézierkurven)
  function kurve(werte, cx, cy, R){
    var pts = werte.map(function(v, k){ var r = radius(R, v), a = winkel(k); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }), n = pts.length, seg = [];
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      seg.push([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]]);
    }
    return {start: pts[0], seg: seg};
  }
  function pfad(k){
    var f = function(x){ return Math.round(x * 10) / 10; };
    return 'M' + f(k.start[0]) + ',' + f(k.start[1]) + k.seg.map(function(s){ return 'C' + s.map(f).join(','); }).join('') + 'Z';
  }

  var nr = 0;
  // SVG der beiden Ringe. o: {size, labels, dunkel, farben:{a,b,netz,text,leise}}; Farben dürfen CSS-Variablen sein
  function svg(m, o){
    o = o || {};
    var F = o.farben || FARBEN[o.dunkel === false ? 'hell' : 'dunkel'], S = o.size || 320, rand = o.labels ? S * .3 : S * .04;
    var V = S + 2 * rand, c = V / 2, R = S * .3, id = 'zr' + (++nr), g = pole(m), v = g.map(function(_, k){ return g[(k + 8) % 16]; });
    var gp = pfad(kurve(g, c, c, R)), vp = pfad(kurve(v, c, c, R)), w = S * .007;
    var h = '<svg class="zwei-ringe" viewBox="0 0 ' + V + ' ' + V + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Deine zwei Ringe">' +
      '<defs><filter id="' + id + 'b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="' + (S * .012) + '"/></filter>' +
      '<radialGradient id="' + id + 'a"><stop offset="0" style="stop-color:' + F.a + ';stop-opacity:.1"/><stop offset="1" style="stop-color:' + F.a + ';stop-opacity:0"/></radialGradient>' +
      '<radialGradient id="' + id + 'v"><stop offset="0" style="stop-color:' + F.b + ';stop-opacity:.12"/><stop offset="1" style="stop-color:' + F.b + ';stop-opacity:0"/></radialGradient></defs>';
    for (var k = 0; k < 16; k++) {
      var a = winkel(k), miss = m.fehlt[k % 8];
      h += '<line x1="' + c + '" y1="' + c + '" x2="' + (c + R * 1.32 * Math.cos(a)).toFixed(1) + '" y2="' + (c + R * 1.32 * Math.sin(a)).toFixed(1) + '" style="stroke:' + F.netz + '" stroke-width="1"' + (miss ? ' stroke-dasharray="3 5"' : '') + '/>';
    }
    [.45, .875, 1.3].forEach(function(f){ h += '<circle cx="' + c + '" cy="' + c + '" r="' + (R * f).toFixed(1) + '" fill="none" style="stroke:' + F.netz + '" stroke-width="1"' + (f === .875 ? ' stroke-dasharray="2 5"' : '') + '/>'; });
    h += '<path d="' + vp + '" fill="url(#' + id + 'v)"/><path d="' + gp + '" fill="url(#' + id + 'a)"/>' +
      '<g filter="url(#' + id + 'b)" opacity=".35"><path d="' + vp + '" fill="none" style="stroke:' + F.b + '" stroke-width="' + (w * 2.4) + '"/><path d="' + gp + '" fill="none" style="stroke:' + F.a + '" stroke-width="' + (w * 2.4) + '"/></g>' +
      '<path d="' + vp + '" fill="none" style="stroke:' + F.b + '" stroke-width="' + w + '"/><path d="' + gp + '" fill="none" style="stroke:' + F.a + '" stroke-width="' + w + '"/>';
    if (o.labels) {
      var fs = o.fontSize || S * .036;
      for (k = 0; k < 16; k++) {
        var aa = winkel(k), r = R * 1.45, x = c + r * Math.cos(aa), y = c + r * Math.sin(aa) + fs * .35, cs = Math.cos(aa);
        var name = k < 8 ? ACHSEN[k].a : ACHSEN[k - 8].b, anchor = Math.abs(cs) < .2 ? 'middle' : cs > 0 ? 'start' : 'end';
        h += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="' + anchor + '" font-family="Hanken Grotesk, sans-serif" font-size="' + fs.toFixed(1) + '" style="fill:' + (k < 8 ? F.text : F.leise) + '"' + (m.fehlt[k % 8] ? ' opacity=".4"' : '') + '>' + name + '</text>';
      }
    }
    return h + '</svg>';
  }

  // dieselben Ringe auf eine Canvas (für das Bild zum Teilen)
  function zeichne(ctx, m, cx, cy, R, F){
    var g = pole(m), v = g.map(function(_, k){ return g[(k + 8) % 16]; });
    function weg(k){ ctx.beginPath(); ctx.moveTo(k.start[0], k.start[1]); k.seg.forEach(function(s){ ctx.bezierCurveTo(s[0], s[1], s[2], s[3], s[4], s[5]); }); ctx.closePath(); }
    ctx.save();
    ctx.strokeStyle = F.netz; ctx.lineWidth = 1.5;
    for (var k = 0; k < 16; k++) {
      var a = winkel(k); ctx.setLineDash(m.fehlt[k % 8] ? [6, 10] : []);
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * 1.32 * Math.cos(a), cy + R * 1.32 * Math.sin(a)); ctx.stroke();
    }
    ctx.setLineDash([]);
    [.45, 1.3].forEach(function(f){ ctx.beginPath(); ctx.arc(cx, cy, R * f, 0, 2 * Math.PI); ctx.stroke(); });
    [[v, F.b], [g, F.a]].forEach(function(r){
      var k = kurve(r[0], cx, cy, R);
      ctx.shadowColor = r[1]; ctx.shadowBlur = R * .09; ctx.strokeStyle = r[1]; ctx.lineWidth = R * .022;
      weg(k); ctx.stroke(); ctx.shadowBlur = 0; ctx.stroke();
    });
    ctx.restore();
  }

  var TEXT = {
    titel: 'Deine zwei Ringe',
    ueber: 'Was du lebst und was leiser bleibt',
    dynamik: 'Deine stärkste innere Dynamik',
    erklaerung: 'Der goldene Ring zeigt, was du im Alltag aktiv lebst. Der violette Ring spiegelt deine leiseren Gegenpole. Sie sind kein Mangel, sondern ruhende Reserven, auf die du zurückgreifen kannst, wenn eine Situation neue Wege verlangt.',
    balance: {
      ausgewogen: 'Deine beiden Ringe liegen nah beieinander: ein ausbalanciertes Profil, in dem beide Seiten der meisten Pole ihren Platz haben.',
      schwerpunkte: 'Deine Ringe zeigen erkennbare Schwerpunkte: Einige Pole lebst du deutlich, ihre Gegenseiten bleiben leiser.',
      klar: 'Deine Ringe gehen deutlich auseinander: ein klares Profil mit ausgeprägter Richtung. Gerade die leisen Gegenpole können hier neue Wege öffnen.'
    },
    wie: 'Die Ringe entstehen aus acht Achsen mit je zwei Gegenpolen, berechnet aus deinem Persönlichkeitstest, deinen Werten und deinem Beziehungsstil. Werte und Beziehungsstil stehen dabei so im Kreis wie in ihren wissenschaftlichen Vorbildern. Die Ringe zeigen dein Selbstbild in diesen Tests, nicht den ganzen Menschen.',
    fehlt: 'Gestrichelte Achsen werden genauer mit dem {tests}.',
    testName: {person: 'Persönlichkeitstest', werte: 'Werte-Test', beziehung: 'Beziehungsstil-Test'},
    testSeite: {person: 'persoenlichkeitstest.html', werte: 'werte.html', beziehung: 'beziehungsstil.html'}
  };

  window.OrdinumRinge = {ACHSEN: ACHSEN, FARBEN: FARBEN, TEXT: TEXT, modell: modell, svg: svg, zeichne: zeichne};
})();
