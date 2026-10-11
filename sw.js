// Ordinum als installierbare App: Seiten und Dateien für die Offline-Nutzung zwischenspeichern.
// Seiten kommen zuerst aus dem Netz (damit Änderungen sofort sichtbar sind), bei fehlender Verbindung aus dem Speicher.
// Bei Änderungen an der Liste VERSION erhöhen, dann wird der alte Speicher gelöscht.
var VERSION = 'ordinum-v1';
var CORE = [
  '/', '/index.html', '/meine-ergebnisse.html',
  '/persoenlichkeitstest.html', '/persoenlichkeit-facetten.html', '/staerkentest.html',
  '/wohlbefinden.html', '/stresstest.html', '/emotionen.html', '/beziehungsstil.html',
  '/werte.html', '/chronotyp.html',
  '/theme.css', '/theme.js', '/teilen.js', '/fonts.css', '/logo-ringe.svg',
  '/favicon.png', '/icon-192.png', '/icon-512.png',
  '/fonts/HankenGrotesk-latin-605034.woff2', '/fonts/HankenGrotesk-latin-ext-af150b.woff2', '/fonts/JetBrainsMono-latin-480c06.woff2', '/fonts/JetBrainsMono-latin-ext-ba1653.woff2', '/fonts/Unbounded-latin-06f2e4.woff2', '/fonts/Unbounded-latin-ext-80da0c.woff2'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){
    // Einzeln laden, damit eine fehlende Datei nicht die ganze Installation abbricht
    return Promise.all(CORE.map(function(u){ return c.add(u).catch(function(){}); }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== VERSION; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request, url = new URL(req.url);
  // Nur eigene Dateien; Besucherzählung und Warteliste laufen immer direkt übers Netz
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function(res){
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function(c){ c.put(req, copy); }); }
      return res;
    }).catch(function(){
      return caches.match(req, {ignoreSearch: true}).then(function(r){ return r || caches.match('/index.html'); });
    }));
    return;
  }

  // Dateien (CSS, JS, Schriften, Bilder): sofort aus dem Speicher, im Hintergrund aktualisieren
  e.respondWith(caches.match(req).then(function(cached){
    var fresh = fetch(req).then(function(res){
      if (res.ok) { var copy = res.clone(); caches.open(VERSION).then(function(c){ c.put(req, copy); }); }
      return res;
    }).catch(function(){ return cached; });
    return cached || fresh;
  }));
});
