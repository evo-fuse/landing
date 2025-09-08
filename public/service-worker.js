// Service Worker for EvoFuse Game Site
const CACHE_NAME = 'evofuse-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/manifest.json',
  '/assets/index-DmrrAyrQ.js',
  '/assets/index-Cvq3jtLo.css'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Use Promise.allSettled instead of addAll to handle individual failures
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(error => {
              console.log('Failed to cache:', url);
              return Promise.resolve(); // Continue despite error
            })
          )
        );
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.log('Service worker install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  try {
    // Skip cross-origin requests and non-GET requests
    if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
      return;
    }

    // Skip URLs with query parameters
    const url = new URL(event.request.url);
    if (url.search) {
      return;
    }

    // For HTML pages - network first, then cache
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            // Cache the latest version of the page
            if (response.ok) {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, clonedResponse).catch(() => {
                  // Silently handle cache put failures
                });
              }).catch(() => {
                // Silently handle cache open failures
              });
            }
            return response;
          })
          .catch(() => {
            // If network fails, try to serve from cache
            return caches.match(event.request).catch(() => {
              // If cache match fails, return a fallback response
              return new Response('Network and cache both failed', { status: 503, headers: { 'Content-Type': 'text/plain' } });
            });
          })
      );
      return;
    }

    // For assets - cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Return cached response
            return cachedResponse;
          }

          // If not in cache, fetch from network
          return fetch(event.request)
            .then(response => {
              // Don't cache non-successful responses
              if (!response || !response.ok) {
                return response;
              }

              // Clone the response as it can only be consumed once
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache).catch(() => {
                    // Silently handle cache put failures
                  });
                })
                .catch(() => {
                  // Silently handle cache open failures
                });

              return response;
            })
            .catch(error => {
              console.log('Fetch failed:', error);
              // Return a fallback response
              return new Response('Network request failed', { status: 503, headers: { 'Content-Type': 'text/plain' } });
            });
        })
        .catch(error => {
          console.log('Cache match failed:', error);
          // Return a fallback response
          return fetch(event.request).catch(() => {
            return new Response('Cache and network both failed', { status: 503, headers: { 'Content-Type': 'text/plain' } });
          });
        })
    );
  } catch (error) {
    console.log('Service worker fetch error:', error);
  }
});
