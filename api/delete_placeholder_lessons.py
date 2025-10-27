"""
Delete placeholder lessons from Module 3 on Render
"""

import asyncio
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os

async def delete_placeholders():
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
            from app.models import Lesson, LessonCompletion
            
            print("\n" + "="*60)
            print("DELETING PLACEHOLDER LESSONS")
            print("="*60)
            
            # The placeholder lesson IDs based on order 5 and 6
            # These are likely lessons with IDs 5 and 6 or lessons at those positions
            
            # First, let's check what lessons are at positions 5 and 6
            result = await session.execute(
                select(Lesson).where(Lesson.order.in_([5, 6]))
            )
            lessons_to_check = result.scalars().all()
            
            print("\nLessons found at order positions 5 and 6:")
            for lesson in lessons_to_check:
                print(f"  ID: {lesson.id}, Title: {lesson.title}, Module: {lesson.module_number}, Order: {lesson.order}")
            
            # Also check specifically for lessons with IDs 5 and 6
            result2 = await session.execute(
                select(Lesson).where(Lesson.id.in_([5, 6]))
            )
            lessons_by_id = result2.scalars().all()
            
            if lessons_by_id:
                print("\nLessons found with IDs 5 and 6:")
                for lesson in lessons_by_id:
                    print(f"  ID: {lesson.id}, Title: {lesson.title}, Module: {lesson.module_number}, Order: {lesson.order}")
            
            # Let's look for placeholder lessons in Module 3
            result3 = await session.execute(
                select(Lesson)
                .where(Lesson.module_number == 3)
                .where(Lesson.title.like('%Placeholder%'))
            )
            placeholder_lessons = result3.scalars().all()
            
            if placeholder_lessons:
                print("\nPlaceholder lessons found in Module 3:")
                for lesson in placeholder_lessons:
                    print(f"  ID: {lesson.id}, Title: {lesson.title}, Order: {lesson.order}")
            
            # Combine all potential lessons to delete
            all_potential = []
            if lessons_to_check:
                all_potential.extend(lessons_to_check)
            if lessons_by_id:
                all_potential.extend(lessons_by_id)
            if placeholder_lessons:
                all_potential.extend(placeholder_lessons)
            
            # Remove duplicates based on ID
            seen_ids = set()
            unique_lessons = []
            for lesson in all_potential:
                if lesson.id not in seen_ids:
                    seen_ids.add(lesson.id)
                    unique_lessons.append(lesson)
            all_potential = unique_lessons
            
            if not all_potential:
                print("\n❌ No placeholder lessons found to delete")
                return
            
            print("\n" + "-"*60)
            print("The following lessons will be deleted:")
            print("-"*60)
            
            lessons_to_delete = []
            for lesson in all_potential:
                # Only delete if it's a placeholder or in Module 3 with low IDs
                if ('placeholder' in lesson.title.lower() or 
                    (lesson.module_number == 3 and lesson.id in [5, 6]) or
                    (lesson.id in [5, 6] and lesson.module_number == 3)):
                    print(f"  ❌ ID: {lesson.id}, Title: {lesson.title}")
                    lessons_to_delete.append(lesson.id)
            
            if not lessons_to_delete:
                print("\nNo lessons matched deletion criteria")
                return
            
            # Confirm deletion
            print(f"\n⚠️  This will delete {len(lessons_to_delete)} lesson(s)")
            print("Proceeding with deletion...")
            
            # First delete any completions for these lessons
            completion_result = await session.execute(
                delete(LessonCompletion).where(LessonCompletion.lesson_id.in_(lessons_to_delete))
            )
            if completion_result.rowcount > 0:
                print(f"  Deleted {completion_result.rowcount} completion records")
            
            # Now delete the lessons
            lesson_result = await session.execute(
                delete(Lesson).where(Lesson.id.in_(lessons_to_delete))
            )
            
            await session.commit()
            
            print(f"\n✅ Successfully deleted {lesson_result.rowcount} placeholder lesson(s)")
            
            # Verify Module 3 status after deletion
            print("\n" + "-"*60)
            print("Module 3 lessons after cleanup:")
            print("-"*60)
            
            remaining = await session.execute(
                select(Lesson)
                .where(Lesson.module_number == 3)
                .order_by(Lesson.order)
            )
            remaining_lessons = remaining.scalars().all()
            
            for lesson in remaining_lessons:
                print(f"  ✓ ID: {lesson.id}, Order: {lesson.order}, Title: {lesson.title}")
            
            print(f"\nTotal Module 3 lessons remaining: {len(remaining_lessons)}")
                
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
            await session.rollback()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(delete_placeholders())
