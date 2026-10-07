// Light/Dark-Umschalter: Wahl wird im Browser gespeichert, Standard ist der Dark Mode
(function(){
  var KEY = 'ordinum-theme', root = document.documentElement, EN = root.lang === 'en';
  function setMeta(){ var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = root.dataset.theme === 'light' ? '#e6e9e3' : '#0a0d0c'; }
  function apply(t){
    if (t === 'light') root.dataset.theme = 'light'; else delete root.dataset.theme;
    try{ localStorage.setItem(KEY, t); }catch(e){}
    setMeta();
    // Hero-Animation an neue Farben anpassen
    window.dispatchEvent(new Event('resize'));
  }
  var b = document.createElement('button');
  b.type = 'button'; b.className = 'theme-btn';
  b.innerHTML = '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></svg><svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>';
  function label(){ var l = root.dataset.theme === 'light'; b.setAttribute('aria-label', EN ? (l ? 'Dark theme' : 'Light theme') : (l ? 'Dunkles Design' : 'Helles Design')); b.title = b.getAttribute('aria-label'); }
  b.addEventListener('click', function(){ apply(root.dataset.theme === 'light' ? 'dark' : 'light'); label(); });
  label(); setMeta();
  var links = document.querySelector('.nav .nav-links'), cta = document.querySelector('.nav .wrap > .btn');
  if (links) links.insertBefore(b, links.firstChild);
  else if (cta) {
    // Umschalter und Warteliste-Button zusammenhalten, damit die Navigation mittig bleibt
    var end = document.createElement('div'); end.className = 'nav-end';
    cta.parentNode.insertBefore(end, cta); end.appendChild(b); end.appendChild(cta);
  }
  else { b.classList.add('floating'); document.body.appendChild(b); }

  // Sprachumschalter: erscheint, wenn die Seite eine Fassung in der anderen Sprache verlinkt
  var alt = document.querySelector('link[rel="alternate"][hreflang="' + (EN ? 'de' : 'en') + '"]');
  if (alt) {
    var href = alt.getAttribute('href');
    if (/^https?:/.test(location.protocol)) { try { href = new URL(href).pathname; } catch(e){} }
    var lg = document.createElement('a');
    lg.className = 'lang-btn'; lg.href = href; lg.hreflang = EN ? 'de' : 'en';
    lg.textContent = EN ? 'DE' : 'EN'; lg.title = EN ? 'Deutsche Version' : 'English version';
    lg.setAttribute('aria-label', lg.title);
    b.parentNode.insertBefore(lg, b);
    var ul = document.querySelector('.nav ul');
    if (ul) {
      var li = document.createElement('li'); li.className = 'lang-li';
      var la = document.createElement('a'); la.href = href; la.hreflang = lg.hreflang;
      la.textContent = EN ? 'Deutsch' : 'English';
      li.appendChild(la); ul.appendChild(li);
    }
  }

  // Menü-Button für kleine Bildschirme: blendet die Bereichs-Links als Klappmenü unter der Leiste ein
  var nav = document.querySelector('.nav'), list = nav && nav.querySelector('ul');
  if (list) {
    var m = document.createElement('button');
    m.type = 'button'; m.className = 'menu-btn';
    m.setAttribute('aria-label', EN ? 'Open menu' : 'Menü öffnen'); m.setAttribute('aria-expanded', 'false');
    list.id = list.id || 'nav-menu'; m.setAttribute('aria-controls', list.id);
    m.innerHTML = '<span></span><span></span><span></span>';
    (nav.querySelector('.nav-end') || nav.querySelector('.wrap')).appendChild(m);
    function setOpen(o){
      nav.classList.toggle('open', o);
      m.setAttribute('aria-expanded', o ? 'true' : 'false');
      m.setAttribute('aria-label', EN ? (o ? 'Close menu' : 'Open menu') : (o ? 'Menü schließen' : 'Menü öffnen'));
    }
    m.addEventListener('click', function(e){ e.stopPropagation(); setOpen(!nav.classList.contains('open')); });
    list.addEventListener('click', function(e){ if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', function(e){ if (!nav.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function(){ if (window.innerWidth > 1080) setOpen(false); });
  }
})();
