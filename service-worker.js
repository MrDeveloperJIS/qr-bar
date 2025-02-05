const CACHE_NAME = 'v1.0.3'; // 2025-02-05 02:00 pm

const urlsToCache = [
    // Root
    '/qr-bar/',
    '/qr-bar/index.html',
    '/qr-bar/404.html',
    '/qr-bar/offline.html',
    '/qr-bar/robots.txt',
    '/qr-bar/sitemap.xml',
    // Apps - HTML
    '/qr-bar/apps/bar-code-generator/index.html',
    '/qr-bar/apps/data-matrix-generator/index.html',
    '/qr-bar/apps/qr-code-generator/index.html',
    // Apps - JS
    '/qr-bar/apps/bar-code-generator/barcode.js',
    '/qr-bar/apps/bar-code-generator/script.js',
    '/qr-bar/apps/data-matrix-generator/datamatrix.js',
    '/qr-bar/apps/data-matrix-generator/script.js',
    '/qr-bar/apps/qr-code-generator/qrcode.js',
    '/qr-bar/apps/qr-code-generator/script.js',
    // Assets - CSS
    '/qr-bar/assets/css/style.css',
    '/qr-bar/assets/css/apps.css',
    '/qr-bar/assets/css/particles.css',
    // Assets - JS
    '/qr-bar/assets/js/script.js',
    '/qr-bar/assets/js/apps.js',
    '/qr-bar/assets/js/buttons.js',
    '/qr-bar/assets/js/particles.js',
    '/qr-bar/assets/js/particles.min.js',
    // Assets - Images
    '/qr-bar/assets/img/index.gif',
    '/qr-bar/assets/img/bar-code-generator.svg',
    '/qr-bar/assets/img/data-matrix-generator.svg',
    '/qr-bar/assets/img/qr-code-generator.svg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching resources:', urlsToCache);
            return cache.addAll(urlsToCache);
        }).catch((error) => console.error('Service Worker: Failed to cache resources:', error))
    );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`Service Worker: Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Claiming clients...');
            return self.clients.claim();
        })
    );
});

// Fetch Resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log(`Service Worker: Serving from cache: ${event.request.url}`);
                return cachedResponse;
            }
            console.log(`Service Worker: Fetching from network: ${event.request.url}`);
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    console.log(`Service Worker: Caching new resource: ${event.request.url}`);
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch((error) => {
                console.error(`Service Worker: Fetch failed: ${event.request.url}`, error);
                if (event.request.mode === 'navigate') {
                    return caches.match('/qr-bar/offline.html');
                }
            });
        })
    );
});
