"""
Fix the ordering of Module 2 lessons
Run this in Render API shell to correct the lesson order
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys

sys.path.append('/app')
from app.models import Lesson

async def fix_lesson_ordering():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    print("📦 Connecting to database...")
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        try:
            # Define correct ordering for Module 2 lessons
            correct_order = {
                20: 3,  # Lesson 1: The Red Line Meeting (order = 3)
                21: 4,  # Lesson 2: EI Foundations & Baseline (order = 4)
                22: 5,  # Lesson 3: Self-Awareness (order = 5)
                23: 6,  # Lesson 4: Self-Regulation (order = 6)
            }
            
            print("\n📊 Current lesson ordering:")
            # First, check current state
            result = await session.execute(
                select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
            )
            lessons = result.scalars().all()
            
            for lesson in lessons:
                print(f"  ID {lesson.id}: {lesson.title} - Order: {lesson.order}")
            
            print("\n🔧 Updating lesson order...")
            # Update each lesson
            for lesson_id, new_order in correct_order.items():
                result = await session.execute(
                    select(Lesson).where(Lesson.id == lesson_id)
                )
                lesson = result.scalar_one_or_none()
                
                if lesson:
                    old_order = lesson.order
                    lesson.order = new_order
                    print(f"  ✅ Lesson {lesson_id}: {lesson.title}")
                    print(f"     Order: {old_order} → {new_order}")
                else:
                    print(f"  ❌ Lesson {lesson_id} not found")
            
            await session.commit()
            print("\n✅ Ordering fixed successfully!")
            
            # Verify the new order
            print("\n📊 New lesson ordering:")
            result = await session.execute(
                select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
            )
            lessons = result.scalars().all()
            
            for i, lesson in enumerate(lessons, 1):
                print(f"  {i}. {lesson.title} (ID: {lesson.id}, Order: {lesson.order})")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            await session.rollback()
        finally:
            await engine.dispose()

# Run it
asyncio.run(fix_lesson_ordering())
print("\n🎉 Module 2 lessons are now in correct order!")
