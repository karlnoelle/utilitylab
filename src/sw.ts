/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

// Handle install
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Handle activation
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle fetch
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API requests with network-first strategy
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open('api-cache');
            cache.then((c) => c.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseToCache = response.clone();
          caches
            .open('v1')
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
      );
    })
  );
});

// Handle message events
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
