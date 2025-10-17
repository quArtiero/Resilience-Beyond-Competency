# Deploy Lesson 2 to Render - Step by Step Guide

## Prerequisites
- Frontend changes already committed and pushed ✅
- Render services running

## Step 1: Commit and Push Backend Changes

```bash
git add -A
git commit -m "Add Lesson 2: EI Foundations & Baseline with interactive components"
git push origin main
```

## Step 2: Wait for Render to Deploy

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Check that both services have rebuilt:
   - `resilience-mastery-api` - Wait for "Deploy live"
   - `resilience-frontend` - Wait for "Live"

## Step 3: Deploy Lesson 2 Content to Database

1. Go to your Render API service (`resilience-mastery-api`)
2. Click on "Shell" tab
3. Copy and run these commands:

```bash
# Enter the shell
cd api

# Copy the deployment script content
cat > deploy_lesson2_to_render.py << 'EOF'
# [The entire content of deploy_lesson2_to_render.py will be here]
EOF

# Run the deployment script
python deploy_lesson2_to_render.py
```

**Expected Output:**
```
Connecting to database...
Creating new Lesson 21: EI Foundations & Baseline
✅ Lesson 2 deployed successfully!

Cleaning up Module 2 placeholder lessons...
Found X lessons in Module 2:
  - ID 20: The Red Line Meeting
  - ID 21: EI Foundations & Baseline
  - ID XX: [placeholder lessons]

Removing placeholder lessons: [list of IDs]
✅ Removed X placeholder lessons

✅ Module 2 now contains:
  - Lesson 1: The Red Line Meeting
  - Lesson 2: EI Foundations & Baseline
```

## Step 4: Verify Deployment

1. Go to your live site: https://resilience-frontend.onrender.com
2. Navigate to Module 2: Emotional Intelligence
3. Verify you see ONLY:
   - Lesson 1: The Red Line Meeting ✅
   - Lesson 2: EI Foundations & Baseline ✅
   - (No placeholder lessons)

## Step 5: Test the Interactive Components

### In Lesson 2:

**Story Tab:**
- Should show the full theory and framework

**Reflection Tab:**
- 5-Pillar Baseline Assessment (interactive rating scale)
- Emotion Granularity Exercise (emotion mapping)
- Values Mapping Exercise (values to actions)

**Challenge Tab:**
- EI Compass Builder (interactive form)
- 7-Day Practice Plan
- Accountability Framework

**Quiz Tab:**
- 5 questions about EI foundations

## Troubleshooting

### If the deployment script fails:

1. Check if Lesson 21 already exists:
```python
from app.models import Lesson
from sqlalchemy.ext.asyncio import AsyncSession
from app.deps import get_session
import asyncio

async def check():
    async with get_session() as session:
        lesson = await session.get(Lesson, 21)
        if lesson:
            print(f"Found: {lesson.title}")
        else:
            print("Lesson 21 not found")

asyncio.run(check())
```

2. If needed, manually update or create the lesson using the script

### If placeholder lessons remain:

Run this to clean them up:
```python
from app.models import Lesson
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.deps import get_session
import asyncio

async def cleanup():
    async with get_session() as session:
        # Delete all Module 2 lessons except 20 and 21
        await session.execute(
            delete(Lesson).where(
                (Lesson.module_number == 2) & 
                (~Lesson.id.in_([20, 21]))
            )
        )
        await session.commit()
        print("Cleaned up!")

asyncio.run(cleanup())
```

## Success Criteria

✅ Only 2 lessons in Module 2 (The Red Line Meeting & EI Foundations & Baseline)  
✅ All interactive components work in Lesson 2  
✅ Quiz loads properly  
✅ No placeholder content visible

## Next Steps

Once verified, Module 2 has its first two production-ready lessons! Ready to continue with Lesson 3 when you are.
