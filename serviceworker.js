var cacheName = 'v1.0';

var cacheAssets = [
  '/',
  'index.html',
  'dist/output.css'
]

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName)
    .then(cache => {
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});