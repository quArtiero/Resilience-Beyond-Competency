"""
Fix Module 3 lessons on Render - adds any missing lessons
"""

import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os
import json

async def fix_module3():
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
            from app.models import Lesson
            
            # Define Module 3 lessons
            module3_lessons = [
                {
                    'id': 37,
                    'slug': 'the-bridge-in-the-storm',
                    'title': 'The Bridge in the Storm',
                    'order': 11,
                    'story': '# The Bridge in the Storm\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                },
                {
                    'id': 38,
                    'slug': 'what-is-cognitive-flexibility',
                    'title': 'What Is Cognitive Flexibility?',
                    'order': 12,
                    'story': '# What Is Cognitive Flexibility?\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                },
                {
                    'id': 39,
                    'slug': 'barriers-and-biases',
                    'title': 'Barriers & Biases: Why Flexibility Fails',
                    'order': 13,
                    'story': '# Barriers & Biases\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                },
                {
                    'id': 40,
                    'slug': 'tools-for-reframing',
                    'title': 'Tools for Reframing',
                    'order': 14,
                    'story': '# Tools for Reframing\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                },
                {
                    'id': 41,
                    'slug': 'flexibility-in-action',
                    'title': 'Flexibility in Action',
                    'order': 15,
                    'story': '# Flexibility in Action\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                },
                {
                    'id': 42,
                    'slug': 'reflection-and-integration',
                    'title': 'Reflection & Integration: Make Flexibility Your Default',
                    'order': 16,
                    'story': '# Reflection & Integration\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                },
                {
                    'id': 43,
                    'slug': '7-day-reframe-challenge',
                    'title': 'The 7-Day Reframe Challenge (Capstone)',
                    'order': 17,
                    'story': '# The 7-Day Reframe Challenge\n\nContent loading...',
                    'reflection': '# Reflection\n\nContent loading...',
                    'challenge': '# Challenge\n\nContent loading...',
                    'quiz': '{"questions":[]}'
                }
            ]
            
            # Check and create missing lessons
            for lesson_data in module3_lessons:
                # Check if lesson exists
                result = await session.execute(
                    select(Lesson).where(Lesson.id == lesson_data['id'])
                )
                existing = result.scalar_one_or_none()
                
                if existing:
                    print(f"✅ Lesson {lesson_data['id']} already exists: {existing.title}")
                    
                    # Check if it needs order fix
                    if existing.order != lesson_data['order']:
                        print(f"   Fixing order: {existing.order} -> {lesson_data['order']}")
                        existing.order = lesson_data['order']
                        await session.commit()
                        
                    # Check if module number is correct
                    if existing.module_number != 3:
                        print(f"   Fixing module: {existing.module_number} -> 3")
                        existing.module_number = 3
                        await session.commit()
                        
                else:
                    print(f"❌ Lesson {lesson_data['id']} missing. Creating...")
                    
                    new_lesson = Lesson(
                        id=lesson_data['id'],
                        slug=lesson_data['slug'],
                        title=lesson_data['title'],
                        module_number=3,
                        order=lesson_data['order'],
                        is_published=True,
                        story=lesson_data['story'],
                        reflection=lesson_data['reflection'],
                        challenge=lesson_data['challenge'],
                        quiz=lesson_data['quiz']
                    )
                    
                    session.add(new_lesson)
                    await session.commit()
                    print(f"   ✅ Created Lesson {lesson_data['id']}")
            
            print("\n" + "="*60)
            print("Module 3 lessons have been verified/fixed!")
            print("="*60)
            print("\nNOTE: Lesson content may still need to be populated.")
            print("Use the individual lesson deployment scripts to add full content.")
                
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
            await session.rollback()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(fix_module3())
