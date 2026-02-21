# Vercel Deployment Guide

## Recommended Deployment Strategy

This is a full-stack application that requires separate deployments:

### Option 1: Deploy Separately (Recommended)

**Frontend on Vercel:**
1. Fork/Push just the `frontend` folder to a GitHub repo
2. Create new Vercel project from that repo
3. Build command: `npm run build`
4. Output directory: `build`

**Backend on Railway/Heroku/Render:**
1. Deploy backend separately (not supported natively on Vercel free plan)
2. Set environment variables on the hosting platform
3. Update FRONTEND_URL in backend .env

### Option 2: Deploy Together (Vercel + PostgreSQL)

This requires:
- Vercel (Frontend + Serverless Backend)
- External PostgreSQL database (Supabase, Railway, etc.)
- Proper environment configuration

## Setup Instructions

### 1. Environment Variables

Set these in your Vercel dashboard:

**Backend Variables:**
```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=music_streaming
JWT_SECRET=generate_random_secret_key
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend Variables:**
```
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

### 2. Database Setup

1. Create a PostgreSQL database on:
   - [Supabase](https://supabase.com) (Free tier includes 500MB storage)
   - [Railway](https://railway.app)
   - [Render](https://render.com)

2. Update DB_HOST, DB_USER, DB_PASSWORD with your database credentials

3. Run migrations on the database:
```bash
npm run migration
npm run seed
```

### 3. Deployment Steps

#### For Vercel Monorepo Deployment:

1. Push both frontend and backend to GitHub
2. Create Vercel project from your repo root
3. Vercel will auto-detect the monorepo structure with `vercel.json`

#### For Separate Deployments (Better):

**Frontend:**
```bash
cd frontend
npm install
npm run build
# Deploy to Vercel via GitHub
```

**Backend (Railway Example):**
```bash
# Push backend to GitHub
# Connect to Railway
# Set environment variables in Railway dashboard
# Railway will auto-deploy
```

## Testing After Deployment

1. Visit your frontend URL
2. Register a new account
3. Test song search and playback
4. Verify playlist creation works
5. Check browser console for API errors

## Troubleshooting

**"Cannot GET /" error:**
- Frontend not built properly
- Check Vercel build logs
- Ensure build command is correct

**API calls failing:**
- Check CORS settings (should allow your frontend domain)
- Verify API URL in frontend config
- Check backend environment variables

**Database connection errors:**
- Verify database credentials in environment variables
- Test connection with psql CLI tool
- Ensure firewall allows connection from Vercel IP

**Static files not loading:**
- Check output directory setting
- Verify build process creates `/build` folder

## Free Hosting Options

- **Frontend:** Vercel (Free, generous limits)
- **Backend:** Railway (Free $5/month credit), Render (Free tier)
- **Database:** Supabase (Free 500MB), Railway (Included)

