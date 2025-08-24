// LHAMO Agency Service Worker - Brutal Caching Strategy

const CACHE_NAME = 'lhamo-brutal-v1';
const STATIC_CACHE = 'lhamo-static-v1';
const DYNAMIC_CACHE = 'lhamo-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/blog',
  '/contact',
  '/careers',
  '/favicon.svg',
  '/logo.svg',
  '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔥 LHAMO SW: Installing brutal service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('💀 LHAMO SW: Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ LHAMO SW: Static assets cached brutally!');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ LHAMO SW: Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 LHAMO SW: Activating brutal service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ LHAMO SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ LHAMO SW: Brutal service worker activated!');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('💀 LHAMO SW: Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response for caching
            const responseToCache = networkResponse.clone();
            
            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                console.log('🔥 LHAMO SW: Caching dynamic content:', request.url);
                cache.put(request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('❌ LHAMO SW: Network fetch failed:', error);
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/');
            }
            
            throw error;
          });
      })
  );
});

// Background sync for better offline experience
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 LHAMO SW: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implement background sync logic here
  return Promise.resolve();
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  console.log('📱 LHAMO SW: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'LHAMO has brutal updates for you!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'lhamo-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View Site',
        icon: '/favicon.svg'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/favicon.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('LHAMO - Brutal Updates', options)
  );
});

console.log('💀 LHAMO Service Worker loaded and ready for brutal caching!');
