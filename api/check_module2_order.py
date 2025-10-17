"""
Quick check of Module 2 lesson ordering
Run this in Render shell to see current order
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys

sys.path.append('/app')
from app.models import Lesson

async def check_order():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        # Get all Module 2 lessons
        result = await session.execute(
            select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
        )
        lessons = result.scalars().all()
        
        print("\n📊 Module 2 Lessons (sorted by 'order' field):")
        print("-" * 50)
        for i, lesson in enumerate(lessons, 1):
            print(f"{i}. ID {lesson.id}: {lesson.title}")
            print(f"   Order value: {lesson.order}")
        
        print("\n✅ What the correct order should be:")
        print("-" * 50)
        print("1. ID 20: The Red Line Meeting")
        print("2. ID 21: EI Foundations & Baseline")
        print("3. ID 22: Self-Awareness: Triggers")
        print("4. ID 23: Self-Regulation: Calm on Command")
        
        await engine.dispose()

asyncio.run(check_order())
