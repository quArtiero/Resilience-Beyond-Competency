# 📚 Consolidated Deployment Guide

## 🚀 Deploying New Lessons to Render

### Step 1: Create Lesson Content Module
Create a new file `api/module2_lesson[N]_[name].py` with:
```python
lesson_content = {
    'id': lesson_id,
    'module_number': 2,
    'order': lesson_order,
    'title': 'Lesson Title',
    'slug': 'lesson-slug',
    'story': '...',
    'reflection': '...',
    'challenge': '...',
    'quiz': '{"questions":[...]}'
}
```

### Step 2: Create Components (if needed)
Add any interactive components to `web/src/components/`

### Step 3: Update EnhancedLessonContent.tsx
Add parsing logic for your lesson's interactive elements

### Step 4: Test Locally
```bash
docker-compose up -d
# Add to local DB via Python script
docker-compose restart api web
```

### Step 5: Push to GitHub
```bash
git add -A
git commit -m "Add Lesson X: Title"
git push
```

### Step 6: Deploy to Production
After Render auto-deploys (5-10 min):

1. Go to Render Dashboard → API Service → Shell
2. Add lesson to production DB:
```python
python
# Import and run your lesson module
from module2_lessonX import get_lessonX_content
lesson = get_lessonX_content()
# Use SQLAlchemy to insert/update
```

## 🛠️ Common Tasks

### Check Production Database
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
        result = await session.execute(text("SELECT id, title, module_number FROM lesson ORDER BY module_number, \"order\""))
        for row in result:
            print(f"Lesson {row[0]}: {row[1]} (Module {row[2]})")

asyncio.run(check())
```

### Fix TypeScript Errors
Common issues:
- Unused imports: Remove them
- Unused parameters: Remove or prefix with `_`
- Missing types: Add explicit type annotations

## 📁 Project Structure

```
resilience-beyond-competency/
├── api/
│   ├── app/              # Core FastAPI application
│   ├── alembic/          # Database migrations
│   ├── tests/            # API tests
│   ├── module2_lesson*.py # Lesson content modules
│   ├── seed_all_lessons.py # Seed all lessons
│   └── requirements.txt  # Python dependencies
├── web/
│   ├── src/
│   │   ├── components/   # React components (73+ files)
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── api/          # API client
│   └── package.json      # Node dependencies
├── docker-compose.yml     # Local development setup
└── README.md             # Project documentation
```

## 🔑 Environment Variables

### Render Services Need:
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret
- `VITE_API_URL` - Frontend API endpoint

## 🐛 Troubleshooting

### Build Failures
- Check TypeScript errors in build logs
- Remove unused imports
- Fix type annotations

### Database Issues
- Ensure `postgresql://` is replaced with `postgresql+asyncpg://`
- Check if lesson ID already exists before inserting
- Use proper async/await patterns

### CORS Errors
- API allows `*` origins in production (temporary)
- Check API URL configuration in frontend

## 📝 Lesson Status

| Module | Lessons Completed | Status |
|--------|------------------|--------|
| Module 1 | 2/2 | ✅ Complete |
| Module 2 | 6/7 | 🏗️ In Progress |
| Module 3 | 7/7 | ✅ Complete |
| Module 4-8 | 0/? | 📋 Planned |
