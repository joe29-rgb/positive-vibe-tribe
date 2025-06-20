module.exports = {
    ci: {
        collect: {
            // URL will be passed via startServerCommand during CI; default fallback for local use
            url: [
                'http://localhost:3000/',
            ],
            numberOfRuns: 3,
            startServerCommand: 'npm run start:client',
            startServerReadyPattern: 'Compiled successfully',
            settings: {
                chromeFlags: '--no-sandbox --headless',
            },
        },
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.9 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};