// Ergebnis teilen: erzeugt im Browser ein Bild vom Testergebnis (Story 9:16 oder Beitrag 3:4).
// Es verlässt nichts den Browser: Das Bild wird lokal gezeichnet und nur geteilt oder gespeichert, wenn man es selbst auslöst.
// Aufruf auf der Ergebnisseite: OrdinumShare.show({eyebrow, title, colors:[c1,c2], rows:[{name,v}], file, ...})
(function(){
  var EN = document.documentElement.lang === 'en';
  var BASE = document.currentScript ? document.currentScript.src : location.href;
  var LOGO = new URL('logo-ringe.svg', BASE).href;
  var T = EN ? {
    h: 'Share your result as an image',
    p: 'Save your result as an image for your Instagram story or feed. The image is created right here in your browser and only shows what you see in the preview. Your personal link is not included.',
    story: 'Story', feed: 'Post', dark: 'Dark', light: 'Light',
    share: 'Share image', save: 'Save image', alt: 'Preview of your share image',
    saved: 'Image saved.', fail: 'The image could not be created in this browser.',
    shareText: 'My result on ordinum.de'
  } : {
    h: 'Dein Ergebnis als Bild teilen',
    p: 'Speichere dein Ergebnis als Bild für deine Instagram-Story oder deinen Feed. Das Bild entsteht direkt hier in deinem Browser und zeigt nur, was du in der Vorschau siehst. Dein persönlicher Link ist nicht enthalten.',
    story: 'Story', feed: 'Beitrag', dark: 'Dunkel', light: 'Hell',
    share: 'Bild teilen', save: 'Bild speichern', alt: 'Vorschau deines Bildes zum Teilen',
    saved: 'Bild gespeichert.', fail: 'Das Bild konnte in diesem Browser nicht erstellt werden.',
    shareText: 'Mein Ergebnis auf ordinum.de'
  };

  var CSS = '.share-box{border:1px solid var(--line);border-radius:20px;padding:24px;background:var(--surface);display:grid;gap:14px;margin-top:20px}' +
    '.share-box h3{font-size:20px}.share-box>p{color:var(--muted);margin:0}' +
    '.share-grid{display:grid;grid-template-columns:minmax(0,220px) 1fr;gap:22px;align-items:start}' +
    '.share-prev{width:100%;border-radius:14px;border:1px solid var(--line);display:block;background:#0a0d0c}' +
    '.share-opts{display:grid;gap:12px;align-content:start}' +
    '.share-seg{display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px;width:max-content}' +
    '.share-seg button{border:0;background:transparent;color:var(--muted);font:500 13px var(--mono);letter-spacing:.04em;padding:7px 14px;border-radius:999px;cursor:pointer}' +
    '.share-seg button[aria-pressed="true"]{background:var(--green);color:#0a0d0c}' +
    '.share-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px}' +
    '.share-toast{min-height:1.2em;font-size:14px;color:var(--muted);margin:0}' +
    '@media (max-width:620px){.share-grid{grid-template-columns:minmax(0,1fr)}.share-prev{max-width:240px;margin:0 auto}}' +
    '@media print{.share-box{display:none}}';

  var st = {fmt: 'story', theme: 'dark'}, opts = null, box = null, logoImg = null, logoOk = false, blob = null, seq = 0;

  function loadLogo(){
    if (logoImg) return Promise.resolve();
    return new Promise(function(res){
      logoImg = new Image();
      logoImg.onload = function(){ logoOk = true; res(); };
      logoImg.onerror = function(){ res(); };
      logoImg.src = LOGO;
    });
  }
  function loadFonts(){
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all(['300 80px Unbounded', '400 40px "Hanken Grotesk"', '500 40px "Hanken Grotesk"', '400 30px "JetBrains Mono"', '500 30px "JetBrains Mono"']
      .map(function(f){ return document.fonts.load(f, 'ÄÖÜäöüß Aa1').catch(function(){}); })).catch(function(){});
  }

  function rgb(hex){ var n = parseInt(hex.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function rgba(hex, a){ var c = rgb(hex); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  // dunklere Fassung einer Akzentfarbe, damit sie auf hellem Grund lesbar bleibt
  function deep(hex, k){ var c = rgb(hex); return 'rgb(' + c.map(function(v){ return Math.round(v * k); }).join(',') + ')'; }

  function wrap(ctx, text, maxW){
    var words = text.split(' '), lines = [], line = '';
    words.forEach(function(w){
      var t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    });
    if (line) lines.push(line);
    return lines;
  }
  function spaced(ctx, text, x, y, sp, align){
    // Text mit Buchstabenabstand (Canvas kann letterSpacing nicht überall)
    var w = 0, i;
    for (i = 0; i < text.length; i++) w += ctx.measureText(text[i]).width + (i < text.length - 1 ? sp : 0);
    var cx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    ctx.textAlign = 'left';
    for (i = 0; i < text.length; i++) { ctx.fillText(text[i], cx, y); cx += ctx.measureText(text[i]).width + sp; }
    return w;
  }
  function rr(ctx, x, y, w, h, r){
    r = Math.min(r, h / 2, w / 2);
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function draw(){
    var W = 1080, H = st.fmt === 'story' ? 1920 : 1440, dark = st.theme === 'dark';
    var c1 = opts.colors[0], c2 = opts.colors[1];
    var P = dark ? {bg: '#0a0d0c', fg: '#eef2ee', mut: 'rgba(238,242,238,.58)', faint: 'rgba(238,242,238,.1)', ac: c1, ac2: c2, bar: c1, bar2: c2, glow: .2}
                 : {bg: '#eef0eb', fg: '#141816', mut: 'rgba(20,24,22,.6)', faint: 'rgba(20,24,22,.09)', ac: deep(c1, .55), ac2: deep(c2, .62), bar: c1, bar2: c2, glow: .3};
    var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    var ctx = cv.getContext('2d');

    // Hintergrund mit zwei weichen Farbschleiern
    ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H);
    [[W * .1, H * .12, W * .95, c1], [W * .95, H * .9, W * 1.05, c2]].forEach(function(g){
      var rg = ctx.createRadialGradient(g[0], g[1], 0, g[0], g[1], g[2]);
      rg.addColorStop(0, rgba(g[3], P.glow)); rg.addColorStop(1, rgba(g[3], 0));
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    });
    // drei feine, ruhige Linien wie auf der Startseite
    ctx.lineWidth = 2;
    [[.2, c1, .22], [.26, c2, .18], [.32, c1, .12]].forEach(function(l, i){
      var y0 = H * (st.fmt === 'story' ? .9 : .86) + i * 18;
      ctx.strokeStyle = rgba(l[1], dark ? l[2] : l[2] * 1.6);
      ctx.beginPath(); ctx.moveTo(-20, y0);
      ctx.bezierCurveTo(W * .3, y0 - H * l[0] * .25, W * .6, y0 + H * l[0] * .18, W + 20, y0 - 60 - i * 10);
      ctx.stroke();
    });

    var M = 96, top = st.fmt === 'story' ? 290 : 150, bottom = st.fmt === 'story' ? H - 250 : H - 110;
    ctx.textBaseline = 'alphabetic';

    // Kopf: Testname klein, darüber nichts weiter
    ctx.fillStyle = P.ac; ctx.font = '500 28px "JetBrains Mono", monospace';
    spaced(ctx, opts.eyebrow.toUpperCase(), M, top, 5);
    ctx.fillStyle = P.fg; ctx.font = '300 74px Unbounded, sans-serif';
    var tl = wrap(ctx, opts.title, W - 2 * M), y = top + 52;
    tl.forEach(function(l){ y += 90; ctx.fillText(l, M, y); });
    var headEnd = y + 40;

    // Fuß: kleines Ringsymbol und ordinum.de
    var fy = bottom;
    ctx.font = '400 30px "JetBrains Mono", monospace'; ctx.fillStyle = P.mut;
    var lw = 0, lh = 44;
    if (logoOk) { lw = lh * (logoImg.naturalWidth || 2073) / (logoImg.naturalHeight || 1859); }
    var tw = 0; for (var i = 0; i < 10; i++) tw += ctx.measureText('ordinum.de'[i]).width + (i < 9 ? 3 : 0);
    var fx = W / 2 - (tw + (lw ? lw + 16 : 0)) / 2;
    if (lw) ctx.drawImage(logoImg, fx, fy - lh + 10, lw, lh);
    spaced(ctx, 'ordinum.de', fx + (lw ? lw + 16 : 0), fy, 3);
    var footTop = fy - 90;

    // Inhalt mittig zwischen Kopf und Fuß
    var avail = footTop - headEnd;
    if (opts.kind === 'circle') drawCircle(ctx, P, W, headEnd, avail);
    else drawRows(ctx, P, W, M, headEnd, avail);
    return cv;
  }

  function drawRows(ctx, P, W, M, y0, avail){
    var rows = opts.rows, n = rows.length, rh = Math.min(150, avail / n), h = rh * n;
    var y = y0 + (avail - h) / 2, bw = W - 2 * M;
    rows.forEach(function(r, i){
      var by = y + rh * i;
      var nx = M;
      if (opts.ranked) {
        ctx.fillStyle = P.ac; ctx.font = '500 30px "JetBrains Mono", monospace'; ctx.textAlign = 'left';
        ctx.fillText(String(i + 1), M, by + 44); nx = M + 50;
      }
      ctx.fillStyle = P.fg; ctx.font = '400 42px "Hanken Grotesk", sans-serif'; ctx.textAlign = 'left';
      var name = r.name; while (ctx.measureText(name).width > bw - 140 - (nx - M) && name.length > 4) name = name.slice(0, -2) + '…';
      ctx.fillText(name, nx, by + 44);
      ctx.fillStyle = P.mut; ctx.font = '500 34px "JetBrains Mono", monospace'; ctx.textAlign = 'right';
      ctx.fillText(String(r.v), W - M, by + 44);
      ctx.textAlign = 'left';
      var ty = by + 72, th = 14;
      ctx.fillStyle = P.faint; rr(ctx, nx, ty, bw - (nx - M), th, 7); ctx.fill();
      var fw = Math.max(th, (bw - (nx - M)) * Math.max(r.v, 2) / 100);
      var g = ctx.createLinearGradient(nx, 0, nx + bw, 0);
      g.addColorStop(0, P.bar); g.addColorStop(1, P.bar2);
      ctx.fillStyle = g; rr(ctx, nx, ty, fw, th, 7); ctx.fill();
    });
  }

  function drawCircle(ctx, P, W, y0, avail){
    var C = opts.circle, story = st.fmt === 'story';
    var R = story ? 250 : 200, R0 = 26, below = story ? 250 : 210;
    var cx = W / 2, cy = y0 + (avail - below) / 2 + 10;
    function sector(a, r0, r1){
      var hw = 180 / C.rows.length, s = (a - hw + 1.2) * Math.PI / 180, e = (a + hw - 1.2) * Math.PI / 180;
      ctx.beginPath(); ctx.arc(cx, cy, r1, -s, -e, true); ctx.arc(cx, cy, r0, -e, -s, false); ctx.closePath();
    }
    C.rows.forEach(function(r){ ctx.fillStyle = P.faint; sector(r.ang, R0, R); ctx.fill(); });
    C.rows.forEach(function(r){
      var on = r.on, r1 = R0 + (R - R0) * Math.max(r.v, 2) / 100;
      var g = ctx.createRadialGradient(cx, cy, R0, cx, cy, R);
      g.addColorStop(0, rgba(opts.colors[0], on ? .35 : .18)); g.addColorStop(1, rgba(opts.colors[0], on ? .95 : .55));
      ctx.fillStyle = g; sector(r.ang, R0, r1); ctx.fill();
    });
    ctx.font = '400 30px "Hanken Grotesk", sans-serif'; ctx.textBaseline = 'middle';
    C.rows.forEach(function(r){
      var a = r.ang * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), LR = R + 24;
      ctx.textAlign = Math.abs(c) < .2 ? 'center' : c > 0 ? 'left' : 'right';
      ctx.fillStyle = r.on ? P.ac : P.mut;
      ctx.fillText(r.name, cx + LR * c, cy - LR * s + (Math.abs(c) < .2 ? (s > 0 ? -8 : 8) : 0));
    });
    ctx.textBaseline = 'alphabetic';
    if (C.dot) {
      var x = cx + R * C.dot.x / 100, y = cy - R * C.dot.y / 100;
      var h = ctx.createRadialGradient(x, y, 0, x, y, 50);
      h.addColorStop(0, rgba(opts.colors[1], .7)); h.addColorStop(1, rgba(opts.colors[1], 0));
      ctx.fillStyle = h; ctx.beginPath(); ctx.arc(x, y, 50, 0, 7); ctx.fill();
      ctx.fillStyle = P.ac2; ctx.beginPath(); ctx.arc(x, y, 13, 0, 7); ctx.fill();
    }
    var ty = cy + R + (story ? 170 : 150);
    ctx.textAlign = 'center'; ctx.fillStyle = P.fg; ctx.font = '300 60px Unbounded, sans-serif';
    ctx.fillText(C.focus, cx, ty);
    if (C.sub) { ctx.fillStyle = P.mut; ctx.font = '400 32px "Hanken Grotesk", sans-serif'; ctx.fillText(C.sub, cx, ty + 56); }
    ctx.textAlign = 'left';
  }

  function toBlob(cv){
    return new Promise(function(res, rej){
      try { cv.toBlob(function(b){ b ? res(b) : rej(); }, 'image/png'); } catch(e){ rej(e); }
    });
  }
  function render(){
    var my = ++seq;
    return Promise.all([loadFonts(), loadLogo()]).then(function(){
      var cv = draw();
      return toBlob(cv).catch(function(){ logoOk = false; return toBlob(draw()); });
    }).then(function(b){
      if (my !== seq) return;
      blob = b;
      var img = box.querySelector('.share-prev'), old = img.src;
      img.src = URL.createObjectURL(b);
      if (old && old.indexOf('blob:') === 0) URL.revokeObjectURL(old);
    }).catch(function(){ if (my === seq) msg(T.fail); });
  }
  function msg(t){ box.querySelector('.share-toast').textContent = t; }
  function fileName(){ return (opts.file || 'ordinum-ergebnis') + (st.fmt === 'story' ? '-story' : EN ? '-post' : '-beitrag') + '.png'; }
  function file(){ return new File([blob], fileName(), {type: 'image/png'}); }
  function canShareFiles(){
    try { return !!(navigator.canShare && navigator.share && navigator.canShare({files: [new File([new Blob(['x'])], 'x.png', {type: 'image/png'})]})); } catch(e){ return false; }
  }
  function download(){
    if (!blob) return;
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fileName();
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 4000);
    msg(T.saved);
  }

  function seg(name, items){
    var s = document.createElement('div'); s.className = 'share-seg'; s.setAttribute('role', 'group');
    items.forEach(function(it){
      var b = document.createElement('button'); b.type = 'button'; b.textContent = it[1];
      b.setAttribute('aria-pressed', st[name] === it[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        st[name] = it[0];
        [].forEach.call(s.children, function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        msg(''); render();
      });
      s.appendChild(b);
    });
    return s;
  }

  function build(){
    if (!document.getElementById('share-css')) {
      var sc = document.createElement('style'); sc.id = 'share-css'; sc.textContent = CSS; document.head.appendChild(sc);
    }
    box = document.createElement('div'); box.className = 'share-box';
    box.innerHTML = '<h3></h3><p></p><div class="share-grid"><img class="share-prev" alt=""><div class="share-opts"><div class="share-btns"></div><p class="share-toast" aria-live="polite"></p></div></div>';
    box.querySelector('h3').textContent = T.h;
    box.querySelector('p').textContent = T.p;
    box.querySelector('.share-prev').alt = T.alt;
    var o = box.querySelector('.share-opts'), btns = box.querySelector('.share-btns');
    o.insertBefore(seg('theme', [['dark', T.dark], ['light', T.light]]), btns);
    o.insertBefore(seg('fmt', [['story', T.story], ['feed', T.feed]]), o.firstChild);
    if (canShareFiles()) {
      var sh = document.createElement('button'); sh.type = 'button'; sh.className = 'btn primary'; sh.textContent = T.share;
      sh.addEventListener('click', function(){
        if (!blob) return;
        var f = file();
        if (!navigator.canShare({files: [f]})) { download(); return; }
        navigator.share({files: [f], text: T.shareText}).catch(function(e){ if (e && e.name !== 'AbortError') download(); });
      });
      btns.appendChild(sh);
    }
    var dl = document.createElement('button'); dl.type = 'button'; dl.className = 'btn' + (btns.children.length ? '' : ' primary'); dl.textContent = T.save;
    dl.addEventListener('click', download);
    btns.appendChild(dl);
    var anchor = document.querySelector('#result .save-box');
    if (anchor) anchor.parentNode.insertBefore(box, anchor); else document.getElementById('result').appendChild(box);
  }

  window.OrdinumShare = {
    show: function(o){
      opts = o;
      if (!box) build();
      msg('');
      return render();
    },
    // für Vorschaubilder und Tests: Bild direkt erzeugen
    canvas: function(o, fmt, theme){
      opts = o; st.fmt = fmt || 'story'; st.theme = theme || 'dark';
      return Promise.all([loadFonts(), loadLogo()]).then(draw);
    }
  };
})();
