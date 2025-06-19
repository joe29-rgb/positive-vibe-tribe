// Minimal service worker generated at runtime
// Caches nothing but enables PWA install prompt without errors.
// Feel free to replace with Workbox build if offline support is desired.
self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.clients.claim();
});