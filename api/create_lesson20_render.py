#!/usr/bin/env python
"""
Create Lesson 20 in Render PostgreSQL with The Red Line Meeting content
Run this in the Render API Shell
"""
import asyncio
import json
from sqlalchemy.ext.asyncio import AsyncSession
from app.deps import engine
from app.models import Lesson
from sqlalchemy import select
from module2_lesson1_redline import LESSON_1_REDLINE

async def create_lesson_20():
    """Create lesson 20 with complete interactive content"""
    async with AsyncSession(engine) as session:
        # First check what lessons exist in Module 2
        result = await session.execute(
            select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
        )
        existing_lessons = result.scalars().all()
        
        print(f"Found {len(existing_lessons)} lessons in Module 2:")
        for lesson in existing_lessons:
            print(f"  - ID {lesson.id}: {lesson.title}")
        
        # Check if lesson 20 exists
        result = await session.execute(
            select(Lesson).where(Lesson.id == 20)
        )
        lesson = result.scalar_one_or_none()
        
        if lesson:
            print(f"\n✅ Lesson 20 already exists: {lesson.title}")
            print("Updating with new content...")
            
            # Update existing
            lesson.title = LESSON_1_REDLINE["title"]
            lesson.slug = LESSON_1_REDLINE["slug"]
            lesson.story = LESSON_1_REDLINE["story"]
            lesson.reflection = LESSON_1_REDLINE["reflection"]
            lesson.challenge = LESSON_1_REDLINE["challenge"]
            lesson.quiz = json.dumps(LESSON_1_REDLINE["quiz"])
            lesson.order = LESSON_1_REDLINE["order"]
            lesson.module_number = LESSON_1_REDLINE["module_number"]
            lesson.is_published = True
            
            await session.commit()
            print(f"✅ Updated Lesson 20")
        else:
            print(f"\n📝 Creating new Lesson 20...")
            
            # Create new
            new_lesson = Lesson(
                id=LESSON_1_REDLINE["id"],
                title=LESSON_1_REDLINE["title"],
                slug=LESSON_1_REDLINE["slug"],
                story=LESSON_1_REDLINE["story"],
                reflection=LESSON_1_REDLINE["reflection"],
                challenge=LESSON_1_REDLINE["challenge"],
                quiz=json.dumps(LESSON_1_REDLINE["quiz"]),
                order=LESSON_1_REDLINE["order"],
                module_number=LESSON_1_REDLINE["module_number"],
                is_published=True
            )
            session.add(new_lesson)
            await session.commit()
            print(f"✅ Created Lesson 20: {new_lesson.title}")
        
        print(f"\n📊 Content Summary:")
        print(f"   - Story: {len(LESSON_1_REDLINE['story']):,} chars")
        print(f"   - Reflection: {len(LESSON_1_REDLINE['reflection']):,} chars")
        print(f"   - Challenge: {len(LESSON_1_REDLINE['challenge']):,} chars")
        print(f"   - Quiz: {len(LESSON_1_REDLINE['quiz']['questions'])} questions")
        print("\n🎉 Lesson 1 is now live on production!")
        print("   View at: https://resilience-frontend.onrender.com/lesson/20")

if __name__ == "__main__":
    asyncio.run(create_lesson_20())
