"""
Delete specific Module 3 placeholder lessons (IDs 5 and 6)
"""

import asyncio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os

async def delete_specific_placeholders():
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
            print("\n" + "="*60)
            print("DELETING MODULE 3 PLACEHOLDER LESSONS")
            print("="*60)
            
            # First check what we're deleting
            check_result = await session.execute(
                text("SELECT id, title, module_number, \"order\" FROM lesson WHERE id IN (5, 6)")
            )
            lessons = check_result.fetchall()
            
            if not lessons:
                print("\n✅ Lessons 5 and 6 already deleted or don't exist")
                return
            
            print("\nLessons to delete:")
            for lesson in lessons:
                print(f"  ❌ ID: {lesson[0]}, Title: {lesson[1]}, Module: {lesson[2]}, Order: {lesson[3]}")
            
            # Delete completions first
            print("\nDeleting any completion records...")
            completion_result = await session.execute(
                text("DELETE FROM lessoncompletion WHERE lesson_id IN (5, 6)")
            )
            await session.commit()
            print(f"  Deleted {completion_result.rowcount} completion records")
            
            # Delete reflections if table exists
            try:
                reflection_result = await session.execute(
                    text("DELETE FROM reflection WHERE lesson_id IN (5, 6)")
                )
                await session.commit()
                print(f"  Deleted {reflection_result.rowcount} reflection records")
            except:
                print("  No reflection records to delete")
            
            # Now delete the lessons
            print("\nDeleting lessons...")
            lesson_result = await session.execute(
                text("DELETE FROM lesson WHERE id IN (5, 6)")
            )
            await session.commit()
            
            print(f"\n✅ Successfully deleted {lesson_result.rowcount} placeholder lesson(s)")
            
            # Show remaining Module 3 lessons
            print("\n" + "-"*60)
            print("Module 3 lessons after cleanup:")
            print("-"*60)
            
            remaining = await session.execute(
                text("SELECT id, title, \"order\" FROM lesson WHERE module_number = 3 ORDER BY \"order\"")
            )
            remaining_lessons = remaining.fetchall()
            
            if remaining_lessons:
                for lesson in remaining_lessons:
                    print(f"  ✓ ID: {lesson[0]}, Order: {lesson[2]}, Title: {lesson[1]}")
                print(f"\nTotal Module 3 lessons remaining: {len(remaining_lessons)}")
            else:
                print("  No Module 3 lessons remaining - ready to add proper lessons!")
                
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
            await session.rollback()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(delete_specific_placeholders())
