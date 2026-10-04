// Light/Dark-Umschalter: Wahl wird im Browser gespeichert, Standard ist der Dark Mode
(function(){
  var KEY = 'ordinum-theme', root = document.documentElement;
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
  function label(){ var l = root.dataset.theme === 'light'; b.setAttribute('aria-label', l ? 'Dunkles Design' : 'Helles Design'); b.title = b.getAttribute('aria-label'); }
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
})();
