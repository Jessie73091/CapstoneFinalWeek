// Set a name for the current cache
var cacheName = 'v1';

// Default files to always cache
var cacheFiles = [
    '/',
    '/index.html',
    '/offline.html',
    '/static/css/main.css',
    '/static/js/main.js',
    '/static/media/logo.png'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // Cache files
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);

    // Return cached data if offline
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log('[ServiceWorker] Found in Cache', e.request.url);
                return response;
            }

            var requestClone = e.request.clone();
            return fetch(requestClone)
                .then(function(response) {
                    if (!response) {
                        console.log('[ServiceWorker] No response from fetch ');
                        return response;
                    }

                    var responseClone = response.clone();

                    caches.open(cacheName).then(function(cache) {
                        cache.put(e.request, responseClone);
                        return response;
                    });

                    return response;
                })
                .catch(function(err) {
                    console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                    return caches.match('/offline.html');
                });
        })
    );
});
