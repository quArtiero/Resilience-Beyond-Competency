#!/usr/bin/env python
"""
Deploy Lesson 1 (The Red Line Meeting) to Render PostgreSQL database
Run this script on the Render API service shell
"""
import asyncio
import json
from sqlalchemy.ext.asyncio import AsyncSession
from app.deps import engine
from app.models import Lesson
from sqlalchemy import select

# The complete lesson content
LESSON_1_CONTENT = {
    "id": 20,
    "title": "The Red Line Meeting",
    "slug": "emotional-intelligence-red-line-meeting",
    "module_number": 2,
    "order": 4,
    "is_published": True
}

async def deploy_lesson_1():
    """Update lesson 20 with The Red Line Meeting content"""
    async with AsyncSession(engine) as session:
        # Check if lesson 20 exists
        result = await session.execute(
            select(Lesson).where(Lesson.id == 20)
        )
        lesson = result.scalar_one_or_none()
        
        if lesson:
            print(f"Found existing lesson: {lesson.title}")
            print("Updating with new interactive content...")
            
            # Update with new content
            lesson.title = LESSON_1_CONTENT["title"]
            lesson.slug = LESSON_1_CONTENT["slug"]
            
            # Note: The actual story, reflection, challenge, and quiz content
            # should be loaded from the module2_lesson1_redline.py file
            # For now, we'll just update the metadata
            
            await session.commit()
            print(f"✅ Updated Lesson {lesson.id}: {lesson.title}")
        else:
            print("❌ Lesson 20 not found in production database")
            print("Creating new lesson...")
            
            new_lesson = Lesson(
                id=LESSON_1_CONTENT["id"],
                title=LESSON_1_CONTENT["title"],
                slug=LESSON_1_CONTENT["slug"],
                module_number=LESSON_1_CONTENT["module_number"],
                order=LESSON_1_CONTENT["order"],
                is_published=LESSON_1_CONTENT["is_published"],
                story="",  # Will be updated with full content
                reflection="",
                challenge="",
                quiz=""
            )
            session.add(new_lesson)
            await session.commit()
            print(f"✅ Created Lesson {new_lesson.id}: {new_lesson.title}")

if __name__ == "__main__":
    asyncio.run(deploy_lesson_1())
    print("\n🎉 Deployment complete!")
    print("📱 Next steps:")
    print("1. Copy the full content from module2_lesson1_redline.py")
    print("2. Update the lesson with complete story, reflection, challenge, quiz")
    print("3. Restart the API service to ensure changes take effect")
