importScripts('/qr-bar/version-files.js');

const CACHE_NAME = version;

// Arrays to store log messages
let cachedResources = [];
let networkResources = [];

// Install the Service Worker and Cache Resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    self.skipWaiting();
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            console.log('Service Worker: Caching resources:', urlsToCache);
            try {
                await cache.addAll(urlsToCache);
            } catch (error) {
                console.error('Service Worker: Failed to cache resources:', error);
            }
        })()
    );
});

// Activate the Service Worker, Delete Old Cache, and Force Reload
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`Service Worker: Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
            console.log('Service Worker: Claiming clients...');
            await self.clients.claim();
            // Send a message to all open clients (including the WebView) to trigger reload
            self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({ action: 'force-reload' });
                });
            });
        })()
    );
});

// Fetch Resources and Cache New Requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) {
                cachedResources.push(event.request.url);
                return cachedResponse;
            }

            try {
                const response = await fetch(event.request);
                networkResources.push(event.request.url);

                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                const responseClone = response.clone();
                const cache = await caches.open(CACHE_NAME);
                await cache.put(event.request, responseClone);
                return response;
            } catch (error) {
                console.error(`Service Worker: Fetch failed: ${event.request.url}`, error);
                if (event.request.mode === 'navigate') {
                    return caches.match('/qr-bar/offline.html');
                }
            }
        })()
    );
});

// Periodically Log Cached and Network Resources
setInterval(() => {
    if (cachedResources.length > 0) {
        console.log("Service Worker: Serving from cache:", cachedResources);
        cachedResources = []; // Reset array
    }
    if (networkResources.length > 0) {
        console.log("Service Worker: Fetching from network:", networkResources);
        networkResources = []; // Reset array
    }
}, 2000); // Logs every 2 seconds
