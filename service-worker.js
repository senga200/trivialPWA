// service-worker.js

const CACHE_NAME = 'trivial-pwa-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/app.css',
  '/style.css',
  '/questions.json',
];

// Installation : met les fichiers en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting(); // Active le service worker immédiatement
});

// Activation : nettoie les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch : sert les fichiers depuis le cache ou le réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
