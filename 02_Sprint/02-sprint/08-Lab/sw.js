const CACHE_NAME = 'todo-pwa-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js',
    '/offline.html',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/icon-maskable.png'
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Cacheando recursos estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Instalación completada');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error en la instalación', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                        console.log('Service Worker: Eliminando cache antigua', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activación completada');
            return self.clients.claim();
        })
    );
});

const staleWhileRevalidate = (request, cacheName) => {
    return caches.open(cacheName).then(cache => {
        return cache.match(request).then(cachedResponse => {
            const fetchPromise = fetch(request).then(networkResponse => {
                cache.put(request, networkResponse.clone());
                return networkResponse;
            }).catch(error => {
                console.error('Fetch failed:', error);
                throw error;
            });
            
            return cachedResponse || fetchPromise;
        });
    });
};

const networkFirst = (request, cacheName) => {
    return fetch(request).then(networkResponse => {
        caches.open(cacheName).then(cache => {
            cache.put(request, networkResponse.clone());
        });
        return networkResponse;
    }).catch(async () => {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        return cachedResponse || cache.match('/offline.html');
    });
};

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    if (url.pathname.endsWith('.json') || url.pathname.includes('/api/')) {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
        return;
    }
    
    if (request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'image') {
        event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
        return;
    }
    
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});