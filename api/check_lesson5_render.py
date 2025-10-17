"""
Check and create Lesson 5 placeholder on Render
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys

sys.path.append('/app')
from app.models import Lesson

async def check_lesson5():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        # Check if lesson 24 exists
        result = await session.execute(select(Lesson).where(Lesson.id == 24))
        lesson = result.scalar_one_or_none()
        
        if lesson:
            print(f"✅ Lesson 24 exists: {lesson.title}")
            print(f"   Module: {lesson.module_number}, Order: {lesson.order}")
        else:
            print("❌ Lesson 24 not found! Creating placeholder...")
            lesson = Lesson(
                id=24,
                title="Empathy: Read, Reflect, Relate",
                slug="empathy-read-reflect-relate",
                module_number=2,
                order=8,
                story="Loading content...",
                reflection="Loading content...",
                challenge="Loading content...",
                quiz='{"questions":[]}',
                is_published=True
            )
            session.add(lesson)
            await session.commit()
            print("✅ Lesson 24 created as placeholder")
        
        await engine.dispose()

# Run it
asyncio.run(check_lesson5())
