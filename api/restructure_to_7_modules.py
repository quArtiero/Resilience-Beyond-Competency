import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine

async def restructure_to_7_modules():
    """Restructure the course to match the 7-module Resilient Mastery structure"""
    
    async with AsyncSession(engine) as session:
        print("🔄 RESTRUCTURING TO 7-MODULE RESILIENT MASTERY")
        print("=" * 60)
        
        # Step 1: Merge Introduction lessons into Module 1 (Emotional Intelligence)
        print("\n📋 Step 1: Merging Introduction lessons into Emotional Intelligence...")
        
        # Move Introduction lessons to be part of Module 1
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 1, "order" = 1
            WHERE title = 'Overview of Resilience & Competency'
        """))
        
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 1, "order" = 2
            WHERE title = 'Goals of the Course'
        """))
        
        # Update existing Emotional Intelligence lessons to Module 1
        ei_updates = [
            ("Welcome to Emotional Intelligence Module", 3),
            ("The Importance of Emotional Intelligence", 4),
            ("Developing Self-Awareness", 5),
            ("Managing Emotions (Self-Regulation)", 6),
            ("Building Empathy", 7),
            ("Motivation and Resilience", 8),
            ("Conflict Resolution Using Emotional Intelligence", 9),
            ("Final Project: Emotional Intelligence Mastery Plan (15 Days)", 10)
        ]
        
        for title, order in ei_updates:
            await session.execute(text("""
                UPDATE lesson 
                SET module_number = 1, "order" = :order
                WHERE title = :title
            """), {"title": title, "order": order})
        
        print("  ✅ Module 1: Emotional Intelligence (10 lessons)")
        
        # Step 2: Update Cognitive Flexibility to Module 2
        print("\n📋 Step 2: Setting Cognitive Flexibility as Module 2...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 2, "order" = 11
            WHERE title LIKE '%Cognitive Flexibility%'
        """))
        print("  ✅ Module 2: Cognitive Flexibility")
        
        # Step 3: Update Grit and Perseverance to Module 3
        print("\n📋 Step 3: Setting Grit and Perseverance as Module 3...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 3, "order" = 12
            WHERE title LIKE '%Grit and Perseverance%'
        """))
        print("  ✅ Module 3: Grit and Perseverance")
        
        # Step 4: Adaptability and Agility as Module 4 (single lesson)
        print("\n📋 Step 4: Setting Adaptability and Agility as Module 4...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 4, "order" = 13
            WHERE title LIKE '%Adaptability and Agility%'
        """))
        print("  ✅ Module 4: Adaptability and Agility")
        
        # Step 5: Problem-Solving as Module 5
        print("\n📋 Step 5: Setting Problem-Solving as Module 5...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 5, "order" = 14
            WHERE title LIKE '%Problem-Solving%'
        """))
        print("  ✅ Module 5: Problem-Solving and Decision-Making")
        
        # Step 6: Effective Communication as Module 6
        print("\n📋 Step 6: Setting Effective Communication as Module 6...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 6, "order" = 15
            WHERE title LIKE '%Effective Communication%'
        """))
        print("  ✅ Module 6: Effective Communication and Collaboration")
        
        # Step 7: Continuous Learning as Module 7
        print("\n📋 Step 7: Setting Continuous Learning as Module 7...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 7, "order" = 16
            WHERE title LIKE '%Continuous Learning%'
        """))
        print("  ✅ Module 7: Continuous Learning and Growth Mindset")
        
        await session.commit()
        print("\n✅ Restructuring complete!")
        
        # Verify the new structure
        print("\n" + "=" * 60)
        print("📊 VERIFIED 7-MODULE RESILIENT MASTERY STRUCTURE:")
        print("=" * 60)
        
        module_names = {
            1: '🧠 Emotional Intelligence: The Foundation of Resilience',
            2: '🔄 Cognitive Flexibility: Reframing the Mind',
            3: '💪 Grit and Perseverance: The Science of Staying Power',
            4: '🌊 Adaptability and Agility: Thriving in Uncertainty',
            5: '🎯 Problem-Solving and Decision-Making: Turning Chaos into Clarity',
            6: '🤝 Effective Communication and Collaboration: Building Trust in Teams',
            7: '📚 Continuous Learning and Growth Mindset: Becoming Unstoppable'
        }
        
        result = await session.execute(text("""
            SELECT module_number, COUNT(*) as count
            FROM lesson
            GROUP BY module_number
            ORDER BY module_number
        """))
        
        for row in result.fetchall():
            mod_num, count = row
            module_name = module_names.get(mod_num, f'Module {mod_num}')
            print(f"\nModule {mod_num}: {module_name}")
            print(f"  Lessons: {count}")
            
            # Get lesson titles for this module
            lessons_result = await session.execute(text("""
                SELECT title, "order"
                FROM lesson
                WHERE module_number = :mod_num
                ORDER BY "order"
            """), {"mod_num": mod_num})
            
            for lesson_title, order in lessons_result.fetchall():
                title_display = lesson_title[:60] + "..." if len(lesson_title) > 60 else lesson_title
                print(f"    {order:2d}. {title_display}")

if __name__ == "__main__":
    asyncio.run(restructure_to_7_modules())
