const CACHE_NAME = "ved-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/docs",
  "/docs/introduction",
  "/globals.css",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    }),
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = new Set([CACHE_NAME]);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.has(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});
