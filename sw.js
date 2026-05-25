/* ─── Service Worker — English Teaching Board ─── */
const CACHE = 'etb-v1';
const STATIC = ['./', './index.html', './student.html', './app.js', './style.css'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only handle same-origin (skip dictionary/datamuse APIs + Google Fonts)
  if (url.origin !== self.location.origin) return;

  const isDoc = req.destination === 'document' || req.mode === 'navigate';

  if (isDoc) {
    // Network-first cho HTML (luôn lấy bản mới nhất, fallback cache khi offline)
    e.respondWith(
      fetch(req)
        .then(resp => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Stale-while-revalidate cho JS/CSS/v.v.
  e.respondWith(
    caches.match(req).then(cached => {
      const networked = fetch(req)
        .then(resp => {
          if (resp && resp.ok && resp.status === 200) {
            const copy = resp.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return resp;
        })
        .catch(() => cached);
      return cached || networked;
    })
  );
});
