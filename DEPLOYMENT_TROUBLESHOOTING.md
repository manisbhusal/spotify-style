# Vercel Deployment Troubleshooting Guide

## Issue: 404 NOT_FOUND Error

Your deployment URL `spotify-style-green.vercel.app` is returning a 404 error, which means:
- ✅ Vercel has your deployment
- ❌ Frontend files are not being built/served correctly

## Quick Fix Checklist

### Step 1: Fix Build Configuration ✓
The `vercel.json` has been updated to:
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build"
}
```

### Step 2: Redeploy on Vercel

**In Vercel Dashboard:**

1. Go to your project: https://vercel.com/dashboard
2. Find project: `spotify-style-green`
3. Click **Deployments** tab
4. Click the most recent failed deployment
5. Click **Redeploy** button (top right)
6. This will trigger a new build with the fixed configuration

**OR via CLI:**
```bash
npm i -g vercel
vercel deploy --prod
```

### Step 3: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

**For Frontend only:**
```
REACT_APP_API_URL = https://your-backend-api.com/api
```

OR if backend is also on Vercel:
```
REACT_APP_API_URL = /api
```

**For Backend (if deployed):**
```
DB_HOST = your-database-host
DB_USER = your-db-user
DB_PASSWORD = your-db-password
DB_NAME = music_streaming
DB_PORT = 5432
JWT_SECRET = generate-a-random-secret
```

## Verify Deployment

After redeploying, check:

1. **Frontend loads:** Visit https://spotify-style-green.vercel.app/
   - Should see login/register page
   - Should NOT see 404

2. **API is available:** Visit https://spotify-style-green.vercel.app/api/health
   - Should see: `{"status":"Server is running"}`
   - If 404, backend needs separate deployment

3. **Console for errors:** Open browser DevTools (F12)
   - Check Console tab for any API errors
   - Should show connection attempts to `/api` endpoints

## Deployment Strategy Comparison

### Option A: Frontend Only on Vercel (Recommended for MVP)
```
Frontend → Vercel (this URL)
Backend  → Railway.app / Render.com / Heroku
Database → Supabase / Railway Database
```
**Pros:** Simpler, works better, scale independently
**Cons:** Manage multiple platforms

### Option B: Monorepo on Vercel (What you're trying now)
```
Everything → Vercel (same URL)
Database   → Supabase / Railway Database
```
**Pros:** Single deployment
**Cons:** Limited by Vercel's free plan constraints

## If Issue Persists: Detailed Debugging

### Check Build Logs

1. Go to Vercel Dashboard
2. Click your project: `spotify-style-green`
3. Click **Deployments**
4. Click the red X or failed deployment
5. Scroll down to see **Build Output**
6. Look for errors like:
   - `npm install failed` → Dependencies issue
   - `npm run build failed` → React build error
   - `missing file` → Path issue

### Common Issues & Fixes

**Issue: "Cannot find module 'react-scripts'"**
- Fix: Frontend `package.json` missing dependencies
- Solution: Ensure `package.json` has all dependencies listed

**Issue: "Build output directory not found"**
- Fix: Frontend not building to `/frontend/build`
- Solution: Verify `outputDirectory: "frontend/build"` in vercel.json

**Issue: "API requests failing"**
- Fix: Backend not deployed or wrong URL
- Solution: Set `REACT_APP_API_URL` environment variable

**Issue: "Cannot find index.html"**
- Fix: Wrong output directory path
- Solution: Ensure React build runs before deployment

### Test Locally First

Before pushing to Vercel, test locally:

```bash
# Build frontend
cd frontend
npm run build

# Check if build/ folder exists
ls build/

# Check if build/index.html exists
cat build/index.html
```

If build fails locally, it will also fail on Vercel.

## Next Steps

1. **Update vercel.json** ✓ (Done)
2. **Redeploy** on Vercel Dashboard
3. **Set environment variables** for your APIs
4. **Wait 1-2 minutes** for build to complete
5. **Test the URL** https://spotify-style-green.vercel.app/

## Still Not Working?

Share the **build output logs** from Vercel Dashboard and I can diagnose the exact issue.

