import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine

async def fix_cognitive_lesson():
    """Fix the incorrectly assigned Cognitive Flexibility lesson"""
    
    async with AsyncSession(engine) as session:
        print("🔍 Finding the misplaced lesson...")
        
        # Find the Cognitive Flexibility lesson
        result = await session.execute(text("""
            SELECT id, title, module_number, "order" 
            FROM lesson 
            WHERE title LIKE '%Cognitive%'
        """))
        
        lesson = result.fetchone()
        if lesson:
            print(f"Found: ID {lesson[0]}: {lesson[1]}")
            print(f"  Current Module: {lesson[2]}, Order: {lesson[3]}")
            
            # Update to Module 3
            await session.execute(text("""
                UPDATE lesson 
                SET module_number = 3, "order" = 11
                WHERE id = :lesson_id
            """), {"lesson_id": lesson[0]})
            
            await session.commit()
            print(f"✅ Moved to Module 3 with order 11")
        else:
            print("❌ Cognitive Flexibility lesson not found")
        
        # Verify the fix
        print("\n📊 Verification - Module 2 lessons after fix:")
        result = await session.execute(text("""
            SELECT "order", title 
            FROM lesson 
            WHERE module_number = 2 
            ORDER BY "order"
        """))
        
        for row in result.fetchall():
            print(f"  Order {row[0]:2d}: {row[1]}")
        
        print("\n📊 Module 3 lessons:")
        result = await session.execute(text("""
            SELECT "order", title 
            FROM lesson 
            WHERE module_number = 3 
            ORDER BY "order"
        """))
        
        for row in result.fetchall():
            print(f"  Order {row[0]:2d}: {row[1]}")

if __name__ == "__main__":
    asyncio.run(fix_cognitive_lesson())
