const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker...', event);

  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then((cache) => {
        console.log('Precaching...');
        cache.addAll([
          '/theme.css',
          '/data/resume.json',
          '/images/userpic01.webp',
          '/images/favicon.ico',
          '/offline/',
          '/opensource/',
          '/talks/',
        ]);
      })
    .catch(console.error)
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker...', event);

  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('Removing old cache...', key);
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
        return caches.open(CACHE_DYNAMIC_NAME)
          .then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
      })
      .catch(() => {
        return caches.match(event.request);
      })
      .then((res) => {
        if (!res) {
          return caches.match('/offline');
        }

        return res;
      })
  );
});
