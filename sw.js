const CACHE_NAME = 'nosleep-v2';

// Relative paths so the app works under any base path (e.g. GitHub Pages
// project sites served from /<repo>/, not the domain root).
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// Install: pre-cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache opened:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate: drop any old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames
        .filter(name => name !== CACHE_NAME)
        .map(name => {
          console.log('Deleting old cache:', name);
          return caches.delete(name);
        })
    )).then(() => self.clients.claim())
  );
});

// Fetch strategy:
//  - Navigations / documents -> network-first (fresh HTML, cache as offline fallback)
//  - Everything else         -> stale-while-revalidate (fast, self-healing cache)
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle same-origin GET requests; let the browser do the rest.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  const isNavigation =
    request.mode === 'navigate' || request.destination === 'document';

  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
