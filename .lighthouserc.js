module.exports = {
    ci: {
        collect: {
            // URL will be passed via startServerCommand during CI; default fallback for local use
            url: [
                'http://localhost:3000/',
            ],
            numberOfRuns: 1,
            startServerCommand: 'npm run start:client',
            startServerReadyPattern: 'Compiled successfully',
            staticDistDir: 'build',
            settings: {
                chromeFlags: '--no-sandbox',
            },
        },
        assert: {
            assertions: {
                'largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-byte-weight': ['error', { maxNumericValue: 250000 }],
                'unused-javascript': 'warn',
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};