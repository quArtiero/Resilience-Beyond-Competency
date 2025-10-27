"""
Simple deletion of Module 3 placeholder lessons (IDs 5 and 6)
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
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
    
    async with engine.connect() as conn:
        try:
            print("\n" + "="*60)
            print("DELETING MODULE 3 PLACEHOLDER LESSONS (IDs 5 and 6)")
            print("="*60)
            
            # Begin transaction
            trans = await conn.begin()
            
            try:
                # First check what we're deleting
                result = await conn.execute(
                    text("SELECT id, title, module_number FROM lesson WHERE id IN (5, 6)")
                )
                lessons = result.fetchall()
                
                if not lessons:
                    print("\n✅ Lessons 5 and 6 already deleted or don't exist")
                    await trans.rollback()
                    return
                
                print("\nFound lessons to delete:")
                for lesson in lessons:
                    print(f"  ❌ ID: {lesson[0]}, Title: {lesson[1]}, Module: {lesson[2]}")
                
                # Delete completions first
                print("\nStep 1: Deleting completion records...")
                result = await conn.execute(
                    text("DELETE FROM lessoncompletion WHERE lesson_id IN (5, 6)")
                )
                print(f"  ✅ Deleted {result.rowcount} completion records")
                
                # Delete lessons
                print("\nStep 2: Deleting lessons...")
                result = await conn.execute(
                    text("DELETE FROM lesson WHERE id IN (5, 6)")
                )
                print(f"  ✅ Deleted {result.rowcount} lessons")
                
                # Commit transaction
                await trans.commit()
                print("\n✅ SUCCESS! Placeholder lessons deleted")
                
            except Exception as e:
                await trans.rollback()
                print(f"\n❌ Transaction failed: {e}")
                raise
            
            # Show remaining Module 3 lessons
            print("\n" + "-"*60)
            print("Module 3 lessons remaining:")
            print("-"*60)
            
            result = await conn.execute(
                text("SELECT id, title FROM lesson WHERE module_number = 3 ORDER BY \"order\"")
            )
            remaining = result.fetchall()
            
            if remaining:
                for lesson in remaining:
                    print(f"  ✓ ID: {lesson[0]}, Title: {lesson[1]}")
                print(f"\nTotal: {len(remaining)} lessons in Module 3")
            else:
                print("  No lessons in Module 3 - ready to add new content!")
                
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            await engine.dispose()

# Need to import text
from sqlalchemy import text

if __name__ == "__main__":
    asyncio.run(delete_placeholders())
