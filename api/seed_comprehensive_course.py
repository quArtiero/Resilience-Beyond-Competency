"""
Comprehensive seed script for the 6-module Resilience Beyond Competency course.
This replaces the existing lessons with the complete course structure.
"""
import asyncio
import json
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine
from app.models import Lesson
from new_course_structure import COURSE_MODULES

# Load environment variables
load_dotenv()


async def clear_existing_lessons():
    """Clear all existing lessons."""
    async with AsyncSession(engine) as session:
        try:
            # Delete all existing lessons (safely handle if tables don't exist)
            await session.execute(text("DELETE FROM lesson_completion"))
            print("✅ Cleared lesson completions")
        except Exception as e:
            print(f"ℹ️  No lesson_completion table to clear: {str(e)[:100]}...")
        
        try:
            await session.execute(text("DELETE FROM lesson"))
            print("✅ Cleared existing lessons")
        except Exception as e:
            print(f"ℹ️  No lesson table to clear: {str(e)[:100]}...")
        
        await session.commit()


async def create_lessons_from_modules():
    """Create lessons from the module structure."""
    async with AsyncSession(engine) as session:
        lesson_count = 0
        
        for module in COURSE_MODULES:
            print(f"\n📚 Creating Module {module['module_number']}: {module['module_title']}")
            
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
                    reflection="",  # Empty reflection for now
                    challenge="",   # Empty challenge for now
                    quiz=quiz_json,
                    order=lesson_data['order'],
                    module_number=module['module_number'],
                    is_published=True,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                
                session.add(lesson)
                lesson_count += 1
                print(f"  ✅ Created Lesson {lesson_data['order']}: {lesson_data['title']}")
        
        await session.commit()
        print(f"\n🎉 Successfully created {lesson_count} lessons!")
        return lesson_count


async def verify_lessons():
    """Verify that lessons were created correctly."""
    async with AsyncSession(engine) as session:
        result = await session.execute(text("SELECT COUNT(*) FROM lesson"))
        count = result.scalar()
        print(f"\n📊 Database verification:")
        print(f"   Total lessons in database: {count}")
        
        # Show lesson structure
        result = await session.execute(text("SELECT id, title, \"order\" FROM lesson ORDER BY \"order\""))
        lessons = result.fetchall()
        
        print(f"\n📋 Course Structure:")
        for lesson in lessons:
            print(f"   {lesson.order:2d}. {lesson.title}")


async def main():
    """Main function to seed the comprehensive course."""
    print("🚀 Starting comprehensive course seeding...")
    print("=" * 60)
    
    try:
        # Step 1: Clear existing data
        await clear_existing_lessons()
        
        # Step 2: Create new lessons
        await create_lessons_from_modules()
        
        # Step 3: Verify creation
        await verify_lessons()
        
        print("\n" + "=" * 60)
        print("✅ Course seeding completed successfully!")
        print("🎓 The Resilience Beyond Competency course is now ready!")
        
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        raise


if __name__ == "__main__":
    # Import datetime here to avoid circular imports
    from datetime import datetime
    asyncio.run(main())
