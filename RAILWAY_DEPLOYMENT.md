# Railway Deployment Guide

## Changes Made for Railway Migration

### 1. Fixed Package Dependencies
- Updated `package.json` versions to match installed packages:
  - `helmet`: `^7.2.0`
  - `react-window`: `^1.8.11`
  - `cypress`: `^13.17.0`
- Regenerated `package-lock.json` to sync with `package.json`

### 2. MongoDB Made Optional
- Modified `backend/server.js` to start without MongoDB connection
- Server now runs with sample data if `MONGO_URI` is not provided
- No database required for initial deployment

### 3. Railway Configuration Files Created
- `railway.json`: Railway service configuration
- `nixpacks.toml`: Build configuration for Node.js 20
- `.railwayignore`: Excludes unnecessary files from deployment

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `positive-vibe-tribe` repository
5. Railway will auto-detect the configuration and start building

### Step 3: Configure Environment Variables (Optional)
In Railway dashboard, add these variables if needed:
- `NODE_ENV`: `production`
- `MONGO_URI`: (only if you want to connect MongoDB later)
- `STRIPE_SECRET_KEY`: (for payment processing)
- `STRIPE_WEBHOOK_SECRET`: (for Stripe webhooks)
- `CLOUDINARY_URL`: (for image uploads)
- `FRONTEND_URL`: (your Railway app URL)

### Step 4: Verify Deployment
- Railway will provide a public URL (e.g., `https://your-app.up.railway.app`)
- Visit the URL to see your deployed app
- The app will serve sample product data without MongoDB

## Build Process
Railway will execute:
1. `npm ci` - Clean install dependencies
2. `npm run build` - Build React app and generate service worker
3. `npm run start` - Start Express server on Railway's assigned PORT

## Key Features
- **No MongoDB Required**: App works with in-memory sample data
- **Production Ready**: Helmet security headers, compression enabled
- **Static Asset Serving**: Express serves built React files
- **Service Worker**: PWA capabilities with Workbox

## Troubleshooting

### Build Fails
- Ensure `package-lock.json` is committed
- Check Railway build logs for specific errors

### App Doesn't Start
- Verify `PORT` environment variable is set by Railway (automatic)
- Check Railway deployment logs

### MongoDB Connection (If Adding Later)
- Add `MONGO_URI` environment variable in Railway dashboard
- Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
- Server will auto-connect on restart

## Differences from Render
- Railway uses Nixpacks instead of custom build commands
- No `render.yaml` needed (Railway uses `railway.json` and `nixpacks.toml`)
- Environment variables set in Railway dashboard, not config file
- Automatic PORT assignment (no need to specify)
