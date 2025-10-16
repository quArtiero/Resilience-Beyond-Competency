#!/usr/bin/env python
"""
Add Module 2, Lesson 1: The Red Line Meeting to local database
"""
import asyncio
import json
from sqlalchemy.ext.asyncio import AsyncSession
from app.deps import engine
from app.models import Lesson
from sqlalchemy import select
from module2_lesson1_redline import LESSON_1_REDLINE

async def add_lesson_1():
    async with AsyncSession(engine) as session:
        # Check if it exists
        result = await session.execute(
            select(Lesson).where(Lesson.id == LESSON_1_REDLINE["id"])
        )
        existing = result.scalar_one_or_none()
        
        if existing:
            # Update existing
            for key, value in LESSON_1_REDLINE.items():
                if key == "quiz" and isinstance(value, dict):
                    value = json.dumps(value)
                setattr(existing, key, value)
            print(f"✅ Updated existing Lesson {LESSON_1_REDLINE['id']}: {LESSON_1_REDLINE['title']}")
        else:
            # Create new
            quiz_data = LESSON_1_REDLINE["quiz"]
            if isinstance(quiz_data, dict):
                quiz_data = json.dumps(quiz_data)
                
            lesson = Lesson(
                id=LESSON_1_REDLINE["id"],
                title=LESSON_1_REDLINE["title"],
                slug=LESSON_1_REDLINE["slug"],
                module_number=LESSON_1_REDLINE["module_number"],
                order=LESSON_1_REDLINE["order"],
                story=LESSON_1_REDLINE["story"],
                reflection=LESSON_1_REDLINE["reflection"],
                challenge=LESSON_1_REDLINE["challenge"],
                quiz=quiz_data,
                is_published=True
            )
            session.add(lesson)
            print(f"✅ Added new Lesson {LESSON_1_REDLINE['id']}: {LESSON_1_REDLINE['title']}")
        
        await session.commit()
        print("\n🎉 Module 2, Lesson 1: The Red Line Meeting is ready!")
        print("   View it at: http://localhost:5173/lesson/20")

if __name__ == "__main__":
    asyncio.run(add_lesson_1())
