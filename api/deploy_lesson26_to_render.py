"""
Deploy Lesson 26 (EI Mastery Capstone) to Render database
"""

import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os

# Import the lesson content
from module2_lesson7_capstone import lesson_data

async def deploy_lesson():
    # Get database URL from environment
    DATABASE_URL = os.environ.get('DATABASE_URL', '')
    if DATABASE_URL.startswith('postgresql://'):
        DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')
    
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL not set")
        return
    
    print(f"Connecting to database...")
    
    # Create async engine
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    
    async with AsyncSessionLocal() as session:
        try:
            # Import Lesson model
            from app.models import Lesson
            
            # Check if lesson 26 exists
            result = await session.execute(
                select(Lesson).where(Lesson.id == 26)
            )
            lesson = result.scalar_one_or_none()
            
            if lesson:
                print(f"Updating existing Lesson 26: {lesson.title}")
                # Update existing lesson
                lesson.story = lesson_data['story']
                lesson.reflection = lesson_data['reflection']
                lesson.challenge = lesson_data['challenge']
                lesson.quiz = lesson_data['quiz']
                await session.commit()
                print("✅ Lesson 26 updated successfully!")
            else:
                print("Lesson 26 not found. Creating new lesson...")
                # Create new lesson
                new_lesson = Lesson(
                    id=26,
                    slug="ei-mastery-capstone",
                    title="EI Mastery Capstone: 15-Day Plan with Metrics",
                    module_number=2,
                    order=19,
                    is_published=True,
                    story=lesson_data['story'],
                    reflection=lesson_data['reflection'],
                    challenge=lesson_data['challenge'],
                    quiz=lesson_data['quiz']
                )
                session.add(new_lesson)
                await session.commit()
                print("✅ Lesson 26 created successfully!")
                
        except Exception as e:
            print(f"Error: {e}")
            await session.rollback()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(deploy_lesson())
