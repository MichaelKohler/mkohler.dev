const CACHE_NAME = 'cache::v6';

const RESOURCES_TO_PREFETCH = [
  // We need the offline page so we can show it
  // as it's unlikely somebody would fetch that
  // by themselves..
  '/offline/',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(RESOURCES_TO_PREFETCH))
      .catch(console.error)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        // Purge old caches
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
      })
      .catch(() => {
        return caches.match(event.request)
      })
      .then((res) => {
        if (!res) {
          return caches.match('/offline/');
        }

        return res;
      })
  );
});
