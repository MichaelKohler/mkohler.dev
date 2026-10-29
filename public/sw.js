const CACHE_NAME = 'cache::v8';
const OFFLINE_URL = '/offline/';

const RESOURCES_TO_PREFETCH = [
  // We need the offline page so we can show it
  // as it's unlikely somebody would fetch that
  // by themselves..
  OFFLINE_URL,
];

self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(RESOURCES_TO_PREFETCH))
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
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only GET requests can be cached, and we only want to cache
  // same-origin requests, not cross-origin resources like fonts or
  // embeds. Vercel's analytics endpoints are never worth caching.
  if (
    event.request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/_vercel/')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          );
        }

        return res;
      })
      .catch(async (error) => {
        console.error('Fetch failed; trying the cache instead.', error);

        const cached = await caches.match(event.request);
        if (cached) {
          return cached;
        }

        // Only page navigations get the offline page; images, styles and
        // fonts must not be answered with HTML.
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }

        return Response.error();
      })
  );
});
