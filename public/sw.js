// Storyteller Magic Service Worker
const CACHE_NAME = 'storyteller-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip API requests
    if (event.request.url.includes('/api/') ||
        event.request.url.includes('googleapis.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached response and update cache in background
                event.waitUntil(
                    fetch(event.request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse);
                            });
                        }
                    }).catch(() => { })
                );
                return cachedResponse;
            }

            // Not in cache, fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Cache successful responses
                if (networkResponse.ok) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Offline fallback for HTML requests
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    return caches.match('/');
                }
            });
        })
    );
});

// Background sync for story generation
self.addEventListener('sync', (event) => {
    if (event.tag === 'generate-story') {
        event.waitUntil(syncGenerateStory());
    }
});

async function syncGenerateStory() {
    // Handle offline story generation queue
    console.log('Syncing story generation...');
}

// Push notifications for bedtime reminders
self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};

    const options = {
        body: data.body || 'Time for a bedtime story! 🌙',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/',
        },
        actions: [
            { action: 'open', title: 'Read Now' },
            { action: 'dismiss', title: 'Later' },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Storyteller Magic', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') return;

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            // If there's already a window open, focus it
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open a new window
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data?.url || '/');
            }
        })
    );
});
