#!/usr/bin/env python3
"""
Restore the comprehensive lessons we created
"""
import asyncio
import json
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'api'))

from app.deps import engine
from app.models import Lesson

async def restore_comprehensive_lessons():
    """Restore the lessons with proper content and styling."""
    async with AsyncSession(engine) as session:
        try:
            # Check current lesson count
            result = await session.execute(text("SELECT COUNT(*) FROM lesson"))
            count = result.scalar()
            print(f"📚 Current lessons in database: {count}")
            
            # If we only have basic lessons, add comprehensive course
            if count <= 2:
                print("🚀 Restoring comprehensive course content...")
                
                # Import and run comprehensive seeding
                from new_course_structure import COURSE_MODULES
                
                lesson_count = 0
                for module in COURSE_MODULES:
                    print(f"📚 Creating Module {module['module_number']}: {module['module_title']}")
                    
                    for lesson_data in module['lessons']:
                        # Convert quiz dictionary to JSON string
                        quiz_json = json.dumps(lesson_data['quiz'], indent=2)
                        
                        # Create lesson object
                        title_clean = lesson_data['title'].lower().replace(' ', '-').replace('?', '').replace("'", '').replace(':', '')
                        slug = f"lesson-{lesson_data['order']}-{title_clean}"
                        lesson = Lesson(
                            slug=slug,
                            title=lesson_data['title'],
                            story=lesson_data['content'],
                            reflection="# Reflection\n\nTake time to reflect on this lesson and its applications to your life.",
                            challenge="# Challenge\n\nApply what you've learned through practical exercises.",
                            quiz=quiz_json,
                            order=lesson_data['order'],
                            module_number=module['module_number'],
                            is_published=True,
                            created_at=datetime.utcnow(),
                            updated_at=datetime.utcnow()
                        )
                        
                        session.add(lesson)
                        lesson_count += 1
                        print(f"  ✅ Created: {lesson_data['title']}")
                
                await session.commit()
                print(f"\n🎉 Successfully restored {lesson_count} comprehensive lessons!")
            else:
                print("✅ Lessons already exist, no restoration needed")
                
        except Exception as e:
            print(f"❌ Error restoring lessons: {e}")

async def verify_lessons():
    """Verify lessons and show structure."""
    async with AsyncSession(engine) as session:
        result = await session.execute(text("SELECT id, title, \"order\", module_number FROM lesson ORDER BY \"order\""))
        lessons = result.fetchall()
        
        print(f"\n📋 Current lesson structure:")
        for lesson in lessons:
            print(f"   {lesson.order}: {lesson.title} (Module {lesson.module_number})")

if __name__ == "__main__":
    asyncio.run(restore_comprehensive_lessons())
    asyncio.run(verify_lessons())
