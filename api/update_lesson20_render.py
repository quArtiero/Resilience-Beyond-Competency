#!/usr/bin/env python
"""
Update Lesson 20 on Render PostgreSQL with The Red Line Meeting content
Run this in the Render API Shell after the code is deployed
"""
import asyncio
import json
from sqlalchemy.ext.asyncio import AsyncSession
from app.deps import engine
from app.models import Lesson
from sqlalchemy import select
from module2_lesson1_redline import LESSON_1_REDLINE

async def update_lesson_20():
    """Update lesson 20 with complete interactive content"""
    async with AsyncSession(engine) as session:
        # Get lesson 20
        result = await session.execute(
            select(Lesson).where(Lesson.id == 20)
        )
        lesson = result.scalar_one_or_none()
        
        if lesson:
            print(f"Found lesson: {lesson.title}")
            print(f"Current size: {len(lesson.story)} chars")
            print("Updating with interactive content...")
            
            # Update with full content
            lesson.title = LESSON_1_REDLINE["title"]
            lesson.slug = LESSON_1_REDLINE["slug"]
            lesson.story = LESSON_1_REDLINE["story"]
            lesson.reflection = LESSON_1_REDLINE["reflection"]
            lesson.challenge = LESSON_1_REDLINE["challenge"]
            lesson.quiz = json.dumps(LESSON_1_REDLINE["quiz"])
            
            await session.commit()
            
            print(f"✅ Updated Lesson {lesson.id}: {lesson.title}")
            print(f"   Story: {len(lesson.story):,} chars")
            print(f"   Reflection: {len(lesson.reflection):,} chars")
            print(f"   Challenge: {len(lesson.challenge):,} chars")
            print(f"   Quiz: {len(LESSON_1_REDLINE['quiz']['questions'])} questions")
            print("\n🎉 Lesson 1 is now live on production!")
            print("   View at: https://resilience-frontend.onrender.com/lesson/20")
        else:
            print("❌ Lesson 20 not found!")
            print("You may need to seed the database first")

if __name__ == "__main__":
    asyncio.run(update_lesson_20())
