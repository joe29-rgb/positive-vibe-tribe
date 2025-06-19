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
    }, ],
    navigateFallback: '/offline.html',
}).then(({ count, size }) => {
    console.log(`Generated sw.js, which will precache ${count} files, totaling ${size} bytes.`);
});