// Service Worker for EvoFuse Game Site
const CACHE_NAME = "evofuse-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/logo.png",
  "/manifest.json"
  // Dynamic assets are handled by the fetch event handler
];

// Install event - cache core assets
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Use Promise.allSettled instead of addAll to handle individual failures
        return Promise.allSettled(
          urlsToCache.map(function(url) {
            return cache.add(url).catch(function() {
              console.log("Failed to cache:", url);
              return Promise.resolve(); // Continue despite error
            });
          })
        );
      })
      .then(function() {
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.log("Service worker install failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", function(event) {
  try {
    // Skip cross-origin requests and non-GET requests
    if (!event.request.url.startsWith(self.location.origin) || event.request.method !== "GET") {
      return;
    }

    // Skip URLs with query parameters
    const url = new URL(event.request.url);
    if (url.search) {
      return;
    }

    // For HTML pages - network first, then cache
    if (event.request.mode === "navigate") {
      event.respondWith(
        fetch(event.request)
          .then(function(response) {
            // Cache the latest version of the page
            if (response.ok) {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, clonedResponse).catch(function() {
                  // Silently handle cache put failures
                });
              }).catch(function() {
                // Silently handle cache open failures
              });
            }
            return response;
          })
          .catch(function() {
            // If network fails, try to serve from cache
            return caches.match(event.request).catch(function() {
              // If cache match fails, return a fallback response
              return new Response("Network and cache both failed", { 
                status: 503, 
                headers: { "Content-Type": "text/plain" } 
              });
            });
          })
      );
      return;
    }

    // For assets - cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then(function(cachedResponse) {
          if (cachedResponse) {
            // Return cached response
            return cachedResponse;
          }

          // If not in cache, fetch from network
          return fetch(event.request)
            .then(function(response) {
              // Don't cache non-successful responses
              if (!response || !response.ok) {
                return response;
              }

              // Clone the response as it can only be consumed once
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache).catch(function() {
                    // Silently handle cache put failures
                  });
                })
                .catch(function() {
                  // Silently handle cache open failures
                });

              return response;
            })
            .catch(function() {
              console.log("Fetch failed for:", event.request.url);
              // Return a fallback response
              return new Response("Network request failed", { 
                status: 503, 
                headers: { "Content-Type": "text/plain" } 
              });
            });
        })
        .catch(function() {
          console.log("Cache match failed for:", event.request.url);
          // Return a fallback response
          return fetch(event.request).catch(function() {
            return new Response("Cache and network both failed", { 
              status: 503, 
              headers: { "Content-Type": "text/plain" } 
            });
          });
        })
    );
  } catch (error) {
    console.log("Service worker fetch error:", error);
  }
});