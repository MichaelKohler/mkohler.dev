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
      .catch((error) => {
        console.error('Fetch failed; returning cached page instead.', error);
        console.debug('Original request was:', event.request);
        return caches.match(event.request)
      })
      .then((res) => {
        if (!res) {
          console.error('No cached page found; returning offline page instead.');
          return caches.match('/offline/');
        }

        console.log('Found cached page, returning that instead.');
        return res;
      })
  );
});
