#!/usr/bin/env python3
"""
Deploy Lesson 3 to Render production database.
Run this in the Render API shell.
"""

import asyncio
import os
import sys
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel, select

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models import Lesson
from module2_lesson3_self_awareness import lesson3_content

async def deploy_lesson3():
    # Get database URL from environment
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ DATABASE_URL not found!")
        return
    
    # Fix for Render: Convert postgresql:// to postgresql+asyncpg://
    if database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    # Create engine
    engine = create_async_engine(database_url, echo=False)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        try:
            # Check if lesson exists
            result = await session.execute(
                select(Lesson).where(Lesson.id == lesson3_content['id'])
            )
            existing_lesson = result.scalar_one_or_none()
            
            if existing_lesson:
                print(f"📝 Updating Lesson {lesson3_content['id']}...")
                # Update existing lesson
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
                print(f"✨ Creating Lesson {lesson3_content['id']}...")
                # Create new lesson
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
            print(f"✅ Lesson {lesson3_content['id']}: {lesson3_content['title']} deployed successfully!")
            
            # Verify all Module 2 lessons
            result = await session.execute(
                select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
            )
            lessons = result.scalars().all()
            
            print("\n📚 Module 2 Lessons in Production:")
            for lesson in lessons:
                story_len = len(lesson.story) if lesson.story else 0
                print(f"   - Lesson {lesson.id}: {lesson.title} ({story_len:,} chars)")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            await session.rollback()
    
    await engine.dispose()

if __name__ == "__main__":
    print("🚀 Deploying Lesson 3 to Render...")
    asyncio.run(deploy_lesson3())
