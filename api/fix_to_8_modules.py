import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine

async def fix_to_8_modules():
    """Fix to 8-module structure: Introduction + 7 Resilient Mastery modules"""
    
    async with AsyncSession(engine) as session:
        print("🔄 FIXING TO 8-MODULE STRUCTURE")
        print("=" * 60)
        print("Module 1: Introduction to Resilience")
        print("Module 2: Emotional Intelligence") 
        print("Module 3: Cognitive Flexibility")
        print("Module 4: Grit and Perseverance")
        print("Module 5: Adaptability and Agility")
        print("Module 6: Problem-Solving and Decision-Making")
        print("Module 7: Effective Communication and Collaboration")
        print("Module 8: Continuous Learning and Growth Mindset")
        print("=" * 60)
        
        # Step 1: Move Introduction lessons back to Module 1
        print("\n📋 Step 1: Setting Introduction as Module 1...")
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
        print("  ✅ Module 1: Introduction (2 lessons)")
        
        # Step 2: Move Emotional Intelligence to Module 2
        print("\n📋 Step 2: Setting Emotional Intelligence as Module 2...")
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
                SET module_number = 2, "order" = :order
                WHERE title = :title
            """), {"title": title, "order": order})
        print("  ✅ Module 2: Emotional Intelligence (8 lessons)")
        
        # Step 3: Cognitive Flexibility as Module 3
        print("\n📋 Step 3: Setting Cognitive Flexibility as Module 3...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 3, "order" = 11
            WHERE title LIKE '%Cognitive Flexibility%'
        """))
        print("  ✅ Module 3: Cognitive Flexibility")
        
        # Step 4: Grit and Perseverance as Module 4
        print("\n📋 Step 4: Setting Grit and Perseverance as Module 4...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 4, "order" = 12
            WHERE title LIKE '%Grit and Perseverance%'
        """))
        print("  ✅ Module 4: Grit and Perseverance")
        
        # Step 5: Adaptability and Agility as Module 5
        print("\n📋 Step 5: Setting Adaptability and Agility as Module 5...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 5, "order" = 13
            WHERE title LIKE '%Adaptability and Agility%'
        """))
        print("  ✅ Module 5: Adaptability and Agility")
        
        # Step 6: Problem-Solving as Module 6
        print("\n📋 Step 6: Setting Problem-Solving as Module 6...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 6, "order" = 14
            WHERE title LIKE '%Problem-Solving%'
        """))
        print("  ✅ Module 6: Problem-Solving and Decision-Making")
        
        # Step 7: Effective Communication as Module 7
        print("\n📋 Step 7: Setting Effective Communication as Module 7...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 7, "order" = 15
            WHERE title LIKE '%Effective Communication%'
        """))
        print("  ✅ Module 7: Effective Communication and Collaboration")
        
        # Step 8: Continuous Learning as Module 8
        print("\n📋 Step 8: Setting Continuous Learning as Module 8...")
        await session.execute(text("""
            UPDATE lesson 
            SET module_number = 8, "order" = 16
            WHERE title LIKE '%Continuous Learning%'
        """))
        print("  ✅ Module 8: Continuous Learning and Growth Mindset")
        
        await session.commit()
        print("\n✅ Fixed to 8-module structure!")
        
        # Verify the structure
        print("\n" + "=" * 60)
        print("📊 VERIFIED 8-MODULE STRUCTURE:")
        print("=" * 60)
        
        module_names = {
            1: '🌱 Introduction to Resilience',
            2: '🧠 Emotional Intelligence: The Foundation of Resilience',
            3: '🔄 Cognitive Flexibility: Reframing the Mind',
            4: '💪 Grit and Perseverance: The Science of Staying Power',
            5: '🌊 Adaptability and Agility: Thriving in Uncertainty',
            6: '🎯 Problem-Solving and Decision-Making: Turning Chaos into Clarity',
            7: '🤝 Effective Communication and Collaboration: Building Trust in Teams',
            8: '📚 Continuous Learning and Growth Mindset: Becoming Unstoppable'
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
            print(f"\n{module_name}")
            print(f"  Lessons: {count}")
            
            # Get lesson titles
            lessons_result = await session.execute(text("""
                SELECT title, "order"
                FROM lesson
                WHERE module_number = :mod_num
                ORDER BY "order"
                LIMIT 3
            """), {"mod_num": mod_num})
            
            for lesson_title, order in lessons_result.fetchall():
                title_display = lesson_title[:50] + "..." if len(lesson_title) > 50 else lesson_title
                print(f"    {order:2d}. {title_display}")
            
            if count > 3:
                print(f"    ... and {count - 3} more")

if __name__ == "__main__":
    asyncio.run(fix_to_8_modules())
