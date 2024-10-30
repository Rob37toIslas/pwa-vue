const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',                // URL base
  '/index.html',      // HTML principal
  '/manifest.json',   // Manifiesto de la PWA
  '/img/icons/android-chrome-192x192.png',  // Icono de la PWA
  '/src/main.js',               // JavaScript principal
  '/src/controllers/router.js', // Archivo de rutas
//   '/src/controllers/store.js',  // Estado global
  '/src/registerServiceWorker.js', // Registro del SW
  '/src/assets/main.css',   // Archivo CSS principal
  '/src/assets/icons/android-chrome-512x512.png', // Otro icono necesario
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
