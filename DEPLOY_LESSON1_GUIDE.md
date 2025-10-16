# 🚀 Deploy Lesson 1 (The Red Line Meeting) to Production

## Overview
This guide will help you deploy the new interactive Lesson 1 content to your production site on Render.

## Step 1: Commit and Push Frontend Changes
The frontend components are already built. Let's push them:

```bash
git add -A
git commit -m "Add interactive Lesson 1: The Red Line Meeting with full EI components"
git push origin main
```

This will trigger automatic deployment of:
- `RedLineReflection.tsx` - Interactive reflection component
- `RedLineChallenge.tsx` - 72-hour challenge tracker
- `EnhancedLessonContent.tsx` - Updated to handle Lesson 20 components

## Step 2: Update Production Database

### Option A: Using Render Dashboard (Recommended)
1. Go to your Render Dashboard
2. Click on your PostgreSQL database service
3. Go to the "Shell" tab
4. Run these commands:

```bash
# Connect to PostgreSQL
psql

# Check current lesson 20
SELECT id, title, LENGTH(story) as size FROM lesson WHERE id = 20;
```

### Option B: Connect from Local Machine
1. Get your database connection string from Render
2. Use the connection string to connect:

```bash
# From your local machine
cd api

# Set the DATABASE_URL (get this from Render dashboard)
export DATABASE_URL="postgresql://user:pass@host/dbname"

# Run the update script
python update_render_lesson.py
```

## Step 3: Update Lesson Content in Production

Since the lesson content is large, we'll update it in chunks:

### Quick Method (via Render Shell):
1. SSH into your API service on Render
2. Run this Python script:

```python
# In Render API Shell
python
```

Then paste:

```python
import psycopg2
import json

# Connect to database
conn = psycopg2.connect(database="resilient_mastery")
cursor = conn.cursor()

# Update lesson 20 metadata
cursor.execute("""
    UPDATE lesson 
    SET title = %s, slug = %s
    WHERE id = 20
""", (
    "The Red Line Meeting",
    "emotional-intelligence-red-line-meeting"
))

conn.commit()
print("✅ Lesson 20 updated!")
cursor.close()
conn.close()
```

## Step 4: Full Content Update

To update with the complete interactive content, you'll need to:

1. Copy the content files to Render
2. Update via SQL

### Create update script locally:
```bash
cd api
python -c "
from module2_lesson1_redline import LESSON_1_REDLINE
import json

# Create SQL update file
with open('update_prod_lesson20.sql', 'w') as f:
    story = LESSON_1_REDLINE['story'].replace(\"'\", \"''\")
    reflection = LESSON_1_REDLINE['reflection'].replace(\"'\", \"''\")
    challenge = LESSON_1_REDLINE['challenge'].replace(\"'\", \"''\")
    quiz = json.dumps(LESSON_1_REDLINE['quiz']).replace(\"'\", \"''\")
    
    f.write(f'''
UPDATE lesson 
SET 
    title = 'The Red Line Meeting',
    slug = 'emotional-intelligence-red-line-meeting',
    story = '{story}',
    reflection = '{reflection}',
    challenge = '{challenge}',
    quiz = '{quiz}'
WHERE id = 20;
    ''')
print('SQL file created: update_prod_lesson20.sql')
"
```

## Step 5: Apply the Update

### Via Render PostgreSQL Console:
1. Go to Render Dashboard → PostgreSQL → Shell
2. Upload and run the SQL file:

```sql
-- In PostgreSQL shell
\i /path/to/update_prod_lesson20.sql

-- Verify
SELECT id, title, LENGTH(story) as story_size FROM lesson WHERE id = 20;
```

## Step 6: Verify Deployment

1. **Check Frontend Deploy:**
   - Go to Render Dashboard → Web Service
   - Check deploy logs for success
   - Should see "Build successful"

2. **Check API:**
   - Visit: https://resilience-mastery-api.onrender.com/api/lessons/20
   - Should return the updated lesson

3. **Check Live Site:**
   - Visit: https://resilience-frontend.onrender.com/lesson/20
   - Test all three tabs:
     - Story (with EQ Assessment, Breathing Exercise, If-Then Planner)
     - Reflection (fully interactive form)
     - Challenge (72-hour tracker)
   - Test the quiz

## Step 7: Clear Cache (if needed)

If changes don't appear:
1. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Clear localStorage: Open DevTools → Application → Storage → Clear

## Troubleshooting

### Issue: Components not showing
**Solution:** Check browser console for errors, ensure all components were deployed

### Issue: Database not updating
**Solution:** Check Render logs, ensure migrations ran, verify connection

### Issue: CORS errors
**Solution:** Already configured to allow all origins in production

## Summary

After completing these steps, your production site will have:
- ✅ Lesson 1: The Red Line Meeting (fully interactive)
- ✅ Story tab with 3 interactive components
- ✅ Reflection tab with comprehensive form
- ✅ Challenge tab with 72-hour tracker
- ✅ Quiz with 8 scenario questions

## Next Steps

Once Lesson 1 is live, you can:
1. Monitor user engagement
2. Collect feedback
3. Proceed with Lesson 2-7 development
4. Apply same deployment process for future lessons

---

**Support:** If you encounter issues, check:
- Render service logs
- Browser console
- PostgreSQL query results
- Network tab for API calls
