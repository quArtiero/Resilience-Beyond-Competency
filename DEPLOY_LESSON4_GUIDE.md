# 🚀 Deploying Lesson 4 to Render

## Step 1: Wait for Frontend to Rebuild
The frontend should auto-rebuild on Render after your push. Check:
- https://dashboard.render.com → `resilience-frontend` → Check if build is in progress

## Step 2: Deploy Lesson 4 Content to Database

### Option A: Using Render Shell (Recommended)

1. Go to https://dashboard.render.com
2. Click on `resilience-mastery-api` service
3. Click "Shell" tab
4. Run these commands:

```bash
# First, check if Lesson 23 exists
cd /app
python
```

Then paste this Python code:
```python
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys
sys.path.append('/app')
from app.models import Lesson

async def check_lesson4():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        result = await session.execute(select(Lesson).where(Lesson.id == 23))
        lesson = result.scalar_one_or_none()
        
        if lesson:
            print(f"✅ Lesson 23 exists: {lesson.title}")
        else:
            print("❌ Lesson 23 not found! Creating...")
            lesson = Lesson(
                id=23,
                title="Self-Regulation: Calm on Command",
                slug="self-regulation-calm-on-command",
                module_number=2,
                order=4,
                story="Loading...",
                reflection="Loading...",
                challenge="Loading...",
                quiz='{"questions":[]}',
                is_published=True
            )
            session.add(lesson)
            await session.commit()
            print("✅ Created")
        
        await engine.dispose()

asyncio.run(check_lesson4())
```

5. Exit Python: `exit()`

6. If Lesson 23 was created or needs updating, run:
```bash
python deploy_lesson4_to_render.py
```

This will update the lesson with the full content.

### Option B: Using SQL (If Python Script Fails)

1. In Render Shell, connect to database:
```bash
psql $DATABASE_URL
```

2. Check if lesson exists:
```sql
SELECT id, title FROM lesson WHERE id = 23;
```

3. If it doesn't exist, the Python script above should have created it.

4. To verify the update worked:
```sql
SELECT 
  id, 
  title, 
  module_number, 
  "order",
  LENGTH(story) as story_len,
  LENGTH(reflection) as ref_len,
  LENGTH(challenge) as chal_len
FROM lesson 
WHERE id = 23;
```

5. Exit psql: `\q`

## Step 3: Verify Deployment

1. Visit your deployed site: https://resilience-frontend.onrender.com
2. Log in with demo account (if needed)
3. Navigate to **Module 2 → Lesson 4**
4. Check all tabs:
   - **Story**: Should show the opening narrative
   - **Reflection**: Should have 4 interactive components
   - **Challenge**: Should have 5 interactive sections (including Exit Reflection)
   - **Quiz**: Should have 5 questions

## Troubleshooting

### If Components Don't Show Up:
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for errors (F12)

### If Database Update Fails:
1. Make sure you're in the `/app` directory
2. Wait a few minutes for the latest code to deploy
3. Try the SQL approach instead

## ✅ Success Indicators

You'll know it's working when:
- All 4 tabs load without errors
- Interactive components are clickable and save state
- Quiz questions display with options
- Exit Reflection shows completion prompts

## 📝 Notes

- The frontend should auto-rebuild within 5-10 minutes of pushing
- Database updates are immediate once executed
- All interactive components save to browser localStorage
