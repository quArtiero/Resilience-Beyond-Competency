# 🚀 Deployment Checklist

## Pre-Deployment (Local)
- [ ] Commit all changes to GitHub
- [ ] Files added:
  - [ ] `web/static.json` ✅ Created
  - [ ] `api/requirements.txt` ✅ Updated with psycopg2-binary
  - [ ] `api/app/main.py` ✅ Updated CORS configuration
- [ ] Push to main branch:
  ```bash
  git add .
  git commit -m "Prepare for Render deployment"
  git push origin main
  ```

## Step 1: Database (5 min)
- [ ] Create PostgreSQL on Render
- [ ] Name: `resilience-mastery-db`
- [ ] Copy **Internal Database URL**: ________________________

## Step 2: API Backend (10 min)
- [ ] Create Web Service on Render
- [ ] Name: `resilience-mastery-api`
- [ ] **Root Directory**: `api` ⚠️
- [ ] Environment Variables:
  - [ ] DATABASE_URL = (paste from Step 1)
  - [ ] SECRET_KEY = (generate)
  - [ ] ALGORITHM = HS256
  - [ ] FRONTEND_URL = (will add after frontend deploys)
- [ ] Deploy and wait for green checkmark
- [ ] Copy API URL: ________________________

## Step 3: Initialize Database (5 min)
- [ ] Go to API service → Shell tab
- [ ] Run migrations:
  ```bash
  alembic upgrade head
  ```
- [ ] Seed data:
  ```bash
  python seed_comprehensive_course.py
  ```

## Step 4: Frontend (10 min)
- [ ] Create Web Service on Render
- [ ] Name: `resilience-mastery-web`
- [ ] **Root Directory**: `web` ⚠️
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npx serve -s dist -l $PORT`
- [ ] Environment Variables:
  - [ ] VITE_API_URL = (paste from Step 2, NO trailing slash)
  - [ ] NODE_VERSION = 18
- [ ] Deploy and wait for green checkmark
- [ ] Copy Frontend URL: ________________________

## Step 5: Update API CORS (2 min)
- [ ] Go back to API service settings
- [ ] Add environment variable:
  - [ ] FRONTEND_URL = (paste from Step 4)
- [ ] API will auto-redeploy

## Step 6: Test Everything (5 min)
- [ ] Visit frontend URL
- [ ] Create test account
- [ ] Login
- [ ] View lessons
- [ ] Navigate modules
- [ ] Test Lesson 7 (most complex)

## Troubleshooting Quick Fixes

### "Cannot connect to API"
```bash
# Check VITE_API_URL has no trailing slash
# Should be: https://api-name.onrender.com
# Not: https://api-name.onrender.com/
```

### "CORS Error"
```bash
# In API Environment Variables, ensure:
FRONTEND_URL=https://your-frontend.onrender.com
# Then manually redeploy API
```

### "Database Connection Failed"
```bash
# Use Internal Database URL, not External
# Format: postgresql://user:pass@host/dbname
```

### "First load is slow"
- Normal for free tier (services sleep)
- Upgrade to Starter ($7/month) for always-on

## Your Deployed URLs

| Service | URL | Status |
|---------|-----|--------|
| Database | (internal only) | ⬜ |
| API | __________________ | ⬜ |
| Frontend | __________________ | ⬜ |

## Total Time: ~30 minutes

✅ Done! Your app is live!
