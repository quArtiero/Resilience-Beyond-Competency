# 🚀 Deploying Lesson 6 to Render

## Status
- ✅ Code pushed to GitHub
- ⏳ Frontend and API services will auto-deploy (5-10 minutes)
- ⏳ Need to add Lesson 6 content to production database

## Step 1: Wait for Auto-Deployment
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Check that both services show "Deploy live" status:
   - `resilience-frontend` 
   - `resilience-mastery-api`

## Step 2: Add Lesson 6 to Production Database

### Option A: Using Python Script (Recommended)
1. Go to Render Dashboard → `resilience-mastery-api` → Shell
2. In the shell, run:
```python
python
```
3. Copy and paste the entire contents of `api/deploy_lesson6_standalone.py`
4. Exit Python: `exit()`

### Option B: Using SQL
1. Go to Render Dashboard → PostgreSQL → Connect → PSQL Command
2. Connect to database
3. Run:
```sql
-- Check if lesson exists
SELECT id, title FROM lesson WHERE id = 25;

-- If it doesn't exist, create it:
INSERT INTO lesson (
    id, module_number, "order", title, slug,
    story, reflection, challenge, quiz,
    is_published, created_at, updated_at
) VALUES (
    25, 2, 10, 
    'Social Skills: Clear, Kind, Direct Communication',
    'social-skills-clear-kind-direct',
    '(content from deploy_lesson6_standalone.py)',
    '(content from deploy_lesson6_standalone.py)', 
    '(content from deploy_lesson6_standalone.py)',
    '(quiz from deploy_lesson6_standalone.py)',
    TRUE, NOW(), NOW()
);
```

## Step 3: Verify Deployment
1. Visit: https://resilience-frontend.onrender.com
2. Login with your admin account
3. Navigate to Module 2 → Lesson 6
4. Check all tabs work:
   - Story (overview + expandable cards)
   - Reflection (5 practice drills)
   - Challenge (cases + protocol + tracker)
   - Quiz (5 questions)

## What's Included in This Deployment

### 11 New Interactive Components
1. `CommunicationOverview` - Onboarding and expectations
2. `CommunicationStoryCards` - Expandable theory sections
3. `SBIRewriter` - Transform harsh feedback
4. `RequestBuilder` - Convert vague to specific
5. `NoOptionPractice` - Boundary setting
6. `ClearRepairWorkshop` - Conflict repair
7. `AsyncTemplates` - Email/Slack templates
8. `CommunicationCommitment` - Integration check
9. `CommunicationCaseSimulator` - Real-world scenarios
10. `CommunicationProtocolBuilder` - Personal OS
11. `CommunicationTracker` - 7-day progress
12. `CommunicationExitCommitment` - Final commitment

### Improved Content Structure
- Clear instructions before each exercise
- Time estimates for all sections
- Progressive difficulty
- Context explaining WHY each tool matters
- Success criteria for practice

## Troubleshooting

### If components don't appear:
1. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check browser console for errors

### If lesson content is missing:
1. Verify in Render API shell:
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
import asyncio
import os

DATABASE_URL = os.getenv("DATABASE_URL").replace("postgresql://", "postgresql+asyncpg://")
engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)

async def check():
    async with AsyncSessionLocal() as session:
        result = await session.execute(text("SELECT id, title, LENGTH(story) FROM lesson WHERE id = 25"))
        print(result.fetchone())

asyncio.run(check())
```

## Success Metrics
- [ ] All 11 components render correctly
- [ ] Story tab has overview + expandable cards
- [ ] Reflection tab has 5 interactive drills
- [ ] Challenge tab has 3 parts with clear instructions
- [ ] Quiz has 5 working questions
- [ ] All data saves to localStorage
- [ ] Progress bars work correctly

## Next Steps
After successful deployment:
1. Test all interactive components
2. Check mobile responsiveness
3. Gather user feedback
4. Begin work on Lesson 7 (EI Mastery Sprint)
