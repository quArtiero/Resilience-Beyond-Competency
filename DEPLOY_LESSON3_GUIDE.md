# 🚀 Deploy Lesson 3 to Render - Step by Step Guide

## Prerequisites
✅ Frontend changes pushed to GitHub (DONE)  
✅ Render frontend will auto-deploy (wait ~5 minutes)  

## Steps to Deploy Lesson 3 Content to Production

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com/
- Find your **resilience-mastery-api** service
- Click on it to open the service page

### 2. Open the Shell
- Click on the **"Shell"** tab in the left sidebar
- Wait for the shell to load (shows `render@srv-...:/app$`)

### 3. Copy Module Files
First, copy the lesson content file:
```bash
cd /app
cat > module2_lesson3_self_awareness.py << 'EOF'
# Copy the ENTIRE content of api/module2_lesson3_self_awareness.py here
# (The file is too large to paste here, use the actual file content)
EOF
```

### 4. Run the Deployment Script
```bash
cd /app
cat > deploy_lesson3.py << 'EOF'
import asyncio
import os
import sys
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel, select

sys.path.append('/app')
from app.models import Lesson
from module2_lesson3_self_awareness import lesson3_content

async def deploy_lesson3():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found!")
        return
    
    if database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    engine = create_async_engine(database_url, echo=False)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        try:
            result = await session.execute(
                select(Lesson).where(Lesson.id == lesson3_content['id'])
            )
            existing_lesson = result.scalar_one_or_none()
            
            if existing_lesson:
                print(f"Updating Lesson {lesson3_content['id']}...")
                existing_lesson.title = lesson3_content['title']
                existing_lesson.slug = lesson3_content['slug']
                existing_lesson.story = lesson3_content['story']
                existing_lesson.reflection = lesson3_content['reflection']
                existing_lesson.challenge = lesson3_content['challenge']
                existing_lesson.quiz = lesson3_content['quiz']
                existing_lesson.order = lesson3_content['order']
                existing_lesson.module_number = lesson3_content['module_number']
                existing_lesson.is_published = lesson3_content['is_published']
            else:
                print(f"Creating Lesson {lesson3_content['id']}...")
                new_lesson = Lesson(
                    id=lesson3_content['id'],
                    title=lesson3_content['title'],
                    slug=lesson3_content['slug'],
                    story=lesson3_content['story'],
                    reflection=lesson3_content['reflection'],
                    challenge=lesson3_content['challenge'],
                    quiz=lesson3_content['quiz'],
                    order=lesson3_content['order'],
                    module_number=lesson3_content['module_number'],
                    is_published=lesson3_content['is_published']
                )
                session.add(new_lesson)
            
            await session.commit()
            print(f"✅ Lesson {lesson3_content['id']}: {lesson3_content['title']} deployed!")
            
        except Exception as e:
            print(f"Error: {e}")
            await session.rollback()
    
    await engine.dispose()

asyncio.run(deploy_lesson3())
EOF

python deploy_lesson3.py
```

### 5. Verify Deployment
After running the script, verify by checking:
```bash
python -c "
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys
sys.path.append('/app')
from app.models import Lesson

async def check():
    db_url = os.getenv('DATABASE_URL')
    if db_url.startswith('postgresql://'):
        db_url = db_url.replace('postgresql://', 'postgresql+asyncpg://', 1)
    engine = create_async_engine(db_url)
    async with AsyncSession(engine) as session:
        result = await session.execute(
            select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
        )
        lessons = result.scalars().all()
        print('\\n📚 Module 2 Lessons:')
        for lesson in lessons:
            chars = len(lesson.story) if lesson.story else 0
            print(f'  - L{lesson.id}: {lesson.title[:30]}... ({chars:,} chars)')
    await engine.dispose()

asyncio.run(check())
"
```

## Expected Output
You should see:
```
✅ Lesson 22: Self-Awareness: Triggers, Body Signals & Stories deployed!

📚 Module 2 Lessons:
  - L26: Welcome to Emotional Intellig... (2,119 chars)
  - L20: The Red Line Meeting... (10,930 chars)
  - L21: EI Foundations & Baseline... (8,456 chars)
  - L22: Self-Awareness: Triggers, Bod... (6,170 chars)
  - L23: Building Empathy... (2,049 chars)
  - L24: Motivation and Resilience... (2,056 chars)
  - L27: Conflict Resolution Using Emo... (1,902 chars)
  - L28: Final Project: Emotional Inte... (916 chars)
```

## 6. Test on Production Site
- Visit: https://resilience-frontend.onrender.com
- Login with your credentials
- Navigate to Module 2 → Lesson 3
- Test all 4 tabs:
  - **Story**: Read the content
  - **Reflection**: Test TriggerMap, InteroceptionScanner, StoryRewriter
  - **Challenge**: Test all 4 sections of SelfAwarenessChallenge
  - **Quiz**: Take the 5-question quiz

## Troubleshooting

### If you get "module not found" error:
Make sure you copied the `module2_lesson3_self_awareness.py` file correctly.

### If you get database connection error:
The DATABASE_URL should be automatically available in the Render shell environment.

### If the lesson doesn't appear:
1. Check if the frontend has finished deploying (takes ~5 minutes)
2. Try refreshing the page or logging out/in
3. Clear browser cache

## Success Indicators
✅ Script runs without errors  
✅ Lesson 22 shows 6,170+ characters  
✅ All interactive components load on production site  
✅ Quiz questions display correctly  

---

**Note**: The frontend will auto-deploy from GitHub push (already done). 
Wait 5-10 minutes for it to complete before testing the production site.
