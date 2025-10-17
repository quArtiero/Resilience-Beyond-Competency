"""
Deploy Lesson 4 (Self-Regulation) to Render Production Database
Run this directly in the Render API shell
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select, SQLModel
import os
import sys

# Add the app directory to path
sys.path.append('/app')

# Import after path is set
from app.models import Lesson

# Get content from the module
from module2_lesson4_self_regulation import LESSON_4

async def deploy_lesson4():
    # Get database URL from environment
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        print("❌ DATABASE_URL not found in environment")
        return
    
    # Fix for Render: Convert postgresql:// to postgresql+asyncpg://
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    print(f"📦 Connecting to database...")
    
    # Create async engine
    engine = create_async_engine(DATABASE_URL, echo=False)
    
    # Create session
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        try:
            # Check if lesson 23 exists
            result = await session.execute(
                select(Lesson).where(Lesson.id == 23)
            )
            lesson = result.scalar_one_or_none()
            
            if lesson:
                print("📝 Updating existing Lesson 23...")
                lesson.title = LESSON_4['title']
                lesson.slug = LESSON_4['slug']
                lesson.module_number = LESSON_4['module_number']
                lesson.order = LESSON_4['order']
                lesson.story = LESSON_4['story']
                lesson.reflection = LESSON_4['reflection']
                lesson.challenge = LESSON_4['challenge']
                lesson.quiz = LESSON_4['quiz']
                lesson.is_published = True
            else:
                print("✨ Creating new Lesson 23...")
                lesson = Lesson(
                    id=23,
                    title=LESSON_4['title'],
                    slug=LESSON_4['slug'],
                    module_number=LESSON_4['module_number'],
                    order=LESSON_4['order'],
                    story=LESSON_4['story'],
                    reflection=LESSON_4['reflection'],
                    challenge=LESSON_4['challenge'],
                    quiz=LESSON_4['quiz'],
                    is_published=True
                )
                session.add(lesson)
            
            await session.commit()
            print("✅ Lesson 4 deployed successfully!")
            
            # Verify
            result = await session.execute(
                select(Lesson).where(Lesson.id == 23)
            )
            lesson = result.scalar_one_or_none()
            if lesson:
                print(f"📚 Title: {lesson.title}")
                print(f"📊 Module: {lesson.module_number}")
                print(f"🔢 Order: {lesson.order}")
                print(f"✅ Published: {lesson.is_published}")
                print(f"📖 Story length: {len(lesson.story)} chars")
                print(f"💭 Reflection length: {len(lesson.reflection)} chars")
                print(f"🎯 Challenge length: {len(lesson.challenge)} chars")
                print(f"❓ Quiz questions: {lesson.quiz.count('question')}")
            
        except Exception as e:
            print(f"❌ Error deploying lesson: {e}")
            await session.rollback()
            raise
        finally:
            await engine.dispose()

# Run the deployment
if __name__ == "__main__":
    asyncio.run(deploy_lesson4())
    print("\n🎉 Deployment complete!")
