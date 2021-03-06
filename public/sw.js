const CACHE_NAME = 'cache::v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        cache.addAll([
          // General
          '/favicon.ico',
          '/data/resume.json',
          '/images/userpic01.webp',
          '/offline/',
          '/fonts/dosis.woff2',
          '/fonts/fa.woff2',
          '/fonts/raleway.woff2',

          // Subpages
          '/opensource/',
          '/images/me.webp',
          '/images/me_community_building.webp',
          '/images/me_firefox.webp',
          '/images/reps_group.webp',
          '/talks/',
        ]);
      })
      .catch(console.error)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
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
            cache.put(event.request.url, res.clone());
            return res;
          });
      })
      .catch(() => {
        return caches.match(event.request);
      })
      .then((res) => {
        if (!res) {
          return caches.match('/offline/');
        }

        return res;
      })
  );
});
