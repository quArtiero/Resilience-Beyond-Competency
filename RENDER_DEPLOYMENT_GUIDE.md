# 🚀 Complete Render Deployment Guide

## Prerequisites
- [ ] GitHub repository is up to date
- [ ] You have a Render account (free tier is fine to start)

---

## PART 1: Database Setup (5 minutes)

### Step 1: Create PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - **Name**: `resilience-mastery-db`
   - **Database**: Leave blank (auto-generated)
   - **User**: Leave blank (auto-generated)
   - **Region**: `Oregon (US West)`
   - **PostgreSQL Version**: `16`
   - **Instance Type**: `Free` (for testing) or `Starter` ($7/month for production)
4. Click **"Create Database"**
5. Wait for creation (2-3 minutes)
6. Once created, go to the database dashboard
7. Copy the **"Internal Database URL"** (starts with `postgresql://`)
   - Save this, you'll need it for the API!

---

## PART 2: API Backend Deployment (10 minutes)

### Step 2: Prepare API for Deployment

First, let's create necessary files:

#### Create `api/render.yaml` build configuration:
```yaml
databases:
  - name: resilience-mastery-db
    plan: free

services:
  - type: web
    name: resilience-mastery-api
    env: python
    plan: free
    buildCommand: "pip install -r requirements.txt"
    startCommand: "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: resilience-mastery-db
          property: connectionString
      - key: SECRET_KEY
        generateValue: true
      - key: ALGORITHM
        value: HS256
```

#### Update `api/requirements.txt` (add if missing):
```
psycopg2-binary==2.9.11
uvicorn[standard]==0.23.2
```

### Step 3: Deploy API Service
1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in:
   - **Name**: `resilience-mastery-api`
   - **Root Directory**: `api` ⚠️ IMPORTANT!
   - **Environment**: `Python 3`
   - **Branch**: `main`
   - **Region**: `Oregon (US West)`
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```bash
     uvicorn app.main:app --host 0.0.0.0 --port $PORT
     ```

### Step 4: Add API Environment Variables
Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste the Internal Database URL from Step 1 |
| `SECRET_KEY` | Click "Generate" for a random value |
| `ALGORITHM` | `HS256` |
| `PYTHON_VERSION` | `3.11` |

### Step 5: Deploy API
1. Click **"Create Web Service"**
2. Wait for build and deployment (5-10 minutes)
3. Once deployed, copy your API URL (e.g., `https://resilience-mastery-api.onrender.com`)

### Step 6: Initialize Database
After API is running:
1. In Render dashboard, go to your API service
2. Click **"Shell"** tab
3. Run these commands:
   ```bash
   # Run migrations
   cd /opt/render/project/src/api
   alembic upgrade head
   
   # Seed initial data
   python seed_comprehensive_course.py
   ```

---

## PART 3: Frontend Deployment (10 minutes)

### Step 7: Prepare Frontend for Deployment

#### Update `web/package.json`:
Add the serve package:
```json
{
  "dependencies": {
    "serve": "^14.2.0"
  }
}
```

#### Create `web/static.json`:
```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

### Step 8: Deploy Web Service
1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository (if not already connected)
4. Fill in:
   - **Name**: `resilience-mastery-web`
   - **Root Directory**: `web` ⚠️ IMPORTANT!
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Region**: `Oregon (US West)`
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Start Command**: 
     ```bash
     npx serve -s dist -l $PORT
     ```

### Step 9: Add Frontend Environment Variables
Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your API URL from Step 5 (e.g., `https://resilience-mastery-api.onrender.com`) |
| `NODE_VERSION` | `18` |

### Step 10: Deploy Frontend
1. Click **"Create Web Service"**
2. Wait for build and deployment (5-10 minutes)
3. Your app will be available at the provided URL!

---

## PART 4: Post-Deployment Setup (5 minutes)

### Step 11: Test the Application
1. Visit your frontend URL
2. Click "Sign Up" and create a test account
3. Verify you can:
   - [ ] Create an account
   - [ ] Log in
   - [ ] View lessons
   - [ ] Navigate through modules
   - [ ] Complete lessons

### Step 12: Set up Custom Domain (Optional)
1. In your web service dashboard
2. Click **"Settings"** → **"Custom Domains"**
3. Add your domain and follow DNS instructions

### Step 13: Configure CORS (If needed)
If you get CORS errors, update `api/app/main.py`:
```python
origins = [
    "https://resilience-mastery-web.onrender.com",  # Your frontend URL
    "http://localhost:5173",  # Keep for local development
]
```
Then push to GitHub to trigger redeploy.

---

## Troubleshooting

### If Database Connection Fails:
1. Check DATABASE_URL is correctly set in API environment variables
2. Make sure you're using the Internal Database URL, not External
3. Verify PostgreSQL version compatibility

### If Frontend Can't Connect to API:
1. Check VITE_API_URL is correctly set (no trailing slash)
2. Verify CORS settings in API
3. Check browser console for specific error messages

### If Build Fails:
1. Check build logs in Render dashboard
2. Verify all dependencies are in requirements.txt or package.json
3. Check Python/Node versions match your local setup

### If Application is Slow:
- Free tier services sleep after 15 minutes of inactivity
- First request will take 30-60 seconds to wake up
- Upgrade to Starter tier ($7/month) to keep always active

---

## Deployment Order Summary

1. ✅ Create PostgreSQL database
2. ✅ Deploy API backend with database URL
3. ✅ Initialize database with migrations and seed data
4. ✅ Deploy frontend with API URL
5. ✅ Test complete application
6. ✅ Configure custom domain (optional)

---

## Important URLs to Save

After deployment, you'll have:
- **Database**: Internal URL (private, only for API)
- **API**: `https://resilience-mastery-api.onrender.com`
- **Frontend**: `https://resilience-mastery-web.onrender.com`

## Cost Summary

### Free Tier:
- Database: Free (limited storage/connections)
- API: Free (spins down after 15 min)
- Frontend: Free (spins down after 15 min)
- **Total**: $0/month

### Production Tier (Recommended):
- Database: $7/month (Starter)
- API: $7/month (Starter)
- Frontend: $7/month (Starter)
- **Total**: $21/month

### Notes:
- Free tier is perfect for testing and demos
- Upgrade when you need always-on availability
- You can upgrade services individually as needed
