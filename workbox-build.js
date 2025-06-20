const workboxBuild = require('workbox-build');

// NOTE: run after CRA build. It will generate public/sw.js
workboxBuild.generateSW({
    globDirectory: 'build',
    globPatterns: [
        '**/*.{html,js,css,svg,png,jpg,jpeg,webp,gif,woff2}',
    ],
    swDest: 'build/sw.js',
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [{
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'images',
                expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 Days
            },
        },
        {
            urlPattern: /\/api\//,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api',
                networkTimeoutSeconds: 3,
                expiration: { maxEntries: 30, maxAgeSeconds: 5 * 60 }, // 5 minutes
                cacheableResponse: { statuses: [0, 200] },
            },
        },
    ],
    navigateFallback: '/offline.html',
    navigateFallbackDenylist: [/^\/api\//, /\/static\//],
}).then(({ count, size }) => {
    console.log(`Generated sw.js, which will precache ${count} files, totaling ${size} bytes.`);
});