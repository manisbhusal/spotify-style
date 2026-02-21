# Deployment Checklist - Vercel

## Current Status
- ❌ Frontend: Not loading (404 error on spotify-style-green.vercel.app)
- 🔄 Backend: Not deployed (needs separate service)
- ❌ Database: Not configured

## Root Cause
- `vercel.json` was using invalid builder configuration
- Frontend wasn't being built properly

## What I Fixed
- ✅ Updated `vercel.json` with correct build configuration
- ✅ Set proper output directory: `frontend/build`
- ✅ Fixed route rewrites for React SPA

## What You Need To Do

### Immediate Actions (5 minutes)

**1. Redeploy on Vercel**
- [ ] Go to https://vercel.com/dashboard
- [ ] Find project: `spotify-style-green`
- [ ] Click **Deployments** tab
- [ ] Click **Redeploy** on the most recent deployment
- [ ] Wait for build to complete (should take 1-3 minutes)
- [ ] Visit https://spotify-style-green.vercel.app/
- [ ] Verify you see login/register page (not 404)

**2. Check Build Output**
If still 404 after redeploying:
- [ ] Click the deployment in Vercel
- [ ] Scroll to **Build Output** section
- [ ] Look for error messages
- [ ] Share the error details

### Backend Deployment (Separate Service Required)

Vercel can't easily host a Node.js/Express backend. Choose one:

**Option A: Railway.app (Recommended)**
- [ ] Sign up at https://railway.app
- [ ] Create new project
- [ ] Connect GitHub repo
- [ ] Deploy `backend` folder
- [ ] Copy deployment URL
- [ ] Set environment variables:
  - DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
  - JWT_SECRET

**Option B: Render.com**
- [ ] Sign up at https://render.com
- [ ] New Web Service from GitHub
- [ ] Point to `backend` folder
- [ ] Set environment variables
- [ ] Deploy

**Option C: Heroku (Free tier removed, but still option)**
- [ ] Alternative to Railway/Render

### Database Setup

**Option A: Supabase (Easiest)**
- [ ] Sign up at https://supabase.com
- [ ] Create new project
- [ ] PostgreSQL database created automatically
- [ ] Copy connection string
- [ ] Use in backend environment variables:
  ```
  DB_HOST=...supabase.co
  DB_USER=postgres
  DB_PASSWORD=...
  DB_NAME=postgres
  DB_PORT=5432
  ```

**Option B: Railway Database (Included with Railway)**
- [ ] When creating Railway project, add PostgreSQL
- [ ] Connection details auto-populated
- [ ] Use in environment variables

### Final Configuration

**Set Frontend Environment Variables:**
In Vercel Dashboard → Settings → Environment Variables:
```
REACT_APP_API_URL = https://your-railway-app.up.railway.app/api
```
(Replace with your actual backend URL)

**Set Backend Environment Variables:**
In Railway/Render Dashboard → Environment:
```
DB_HOST = your-database-host
DB_USER = postgres
DB_PASSWORD = your-password
DB_NAME = music_streaming
DB_PORT = 5432
JWT_SECRET = generate-random-key-32-chars
FRONTEND_URL = https://spotify-style-green.vercel.app
PORT = 3000
```

## Testing After Full Deployment

1. **Frontend loads** → Visit `spotify-style-green.vercel.app`
2. **Register account** → Create user with email/password
3. **Login works** → Verify authentication working
4. **Songs load** → See list of demo songs
5. **Search works** → Try searching for "Taylor"
6. **Play works** → Click play button
7. **Playlists work** → Create and manage playlists

## Troubleshooting

If Frontend Still Shows 404:
- [ ] Check Vercel build logs
- [ ] Ensure `vercel.json` exists in root
- [ ] Ensure `frontend/package.json` exists
- [ ] Verify `npm run build` works locally

If Backend API Fails:
- [ ] Check Railway/Render logs
- [ ] Verify database connection
- [ ] Check environment variable names
- [ ] Test with `/api/health` endpoint

If Database Won't Connect:
- [ ] Verify DB_HOST in environment
- [ ] Verify DB_USER and DB_PASSWORD
- [ ] Test connection with psql CLI
- [ ] Check firewall IP whitelist

## Files Ready for Deployment

✅ Frontend - Complete
✅ Backend - Complete  
✅ Database Schema - Complete
✅ Demo Data - Ready (run `npm run seed`)
✅ vercel.json - Fixed
✅ Environment Config - Ready

## Support

If you hit any errors:
1. Check `DEPLOYMENT_TROUBLESHOOTING.md` in root
2. Check Vercel/Railway build logs
3. Share the error message and I can help debug

