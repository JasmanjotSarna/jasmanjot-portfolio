const CACHE_NAME = 'site-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/tokens.css',
  '/reset.css',
  '/nav.css',
  '/hero.css',
  '/sections.css',
  '/about.css',
  '/projects.css',
  '/skills.css',
  '/experience.css',
  '/contact.css',
  '/footer.css',
  '/animations.css',
  '/style.css',
  '/nav.js',
  '/animations.js',
  '/contact.js',
  '/techstrip.js',
  '/script.js',
  '/profile.png',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Network-first for navigation, cache-first for assets
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((res) => {
      return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, res.clone()); return res; });
    }).catch(() => cached))
  );
});
