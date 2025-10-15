import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine

async def fix_all_modules():
    """Fix all module assignments and order numbers to match frontend expectations"""
    
    async with AsyncSession(engine) as session:
        print("🔧 COMPREHENSIVE MODULE FIX")
        print("=" * 60)
        
        # Define the correct module assignments based on lesson titles
        fixes = [
            # Fix Module 3 - Should be Cognitive Flexibility
            ("UPDATE lesson SET module_number = 3, \"order\" = 11 WHERE title LIKE '%Cognitive Flexibility%'", 
             "Cognitive Flexibility → Module 3"),
            
            # Fix Module 4 - Should be Grit and Perseverance  
            ("UPDATE lesson SET module_number = 4, \"order\" = 12 WHERE title LIKE '%Grit and Perseverance%'",
             "Grit and Perseverance → Module 4"),
            
            # Fix Module 5 - Should be Adaptability and Agility
            ("UPDATE lesson SET module_number = 5, \"order\" = 13 WHERE title LIKE '%Adaptability and Agility%'",
             "Adaptability and Agility → Module 5"),
            
            # Fix Module 5 - Problem-Solving should also be in Module 5
            ("UPDATE lesson SET module_number = 5, \"order\" = 14 WHERE title LIKE '%Problem-Solving%'",
             "Problem-Solving → Module 5 (second lesson)"),
            
            # Fix Module 6 - Should be Final Reflections
            ("UPDATE lesson SET module_number = 6, \"order\" = 15 WHERE title LIKE '%Effective Communication%'",
             "Effective Communication → Module 6"),
            
            # Module 7 lesson should be moved to Module 6
            ("UPDATE lesson SET module_number = 6, \"order\" = 16 WHERE title LIKE '%Continuous Learning%'",
             "Continuous Learning → Module 6 (second lesson)"),
        ]
        
        print("📝 Applying fixes...")
        for query, description in fixes:
            print(f"  → {description}")
            await session.execute(text(query))
        
        await session.commit()
        print("\n✅ All fixes applied!")
        
        # Verify the new structure
        print("\n" + "=" * 60)
        print("📊 VERIFIED STRUCTURE AFTER FIXES:")
        print("=" * 60)
        
        result = await session.execute(text("""
            SELECT module_number, "order", id, title
            FROM lesson
            ORDER BY "order"
        """))
        
        module_names = {
            1: '🌱 Introduction to Resilience',
            2: '🧠 Emotional Intelligence', 
            3: '🔄 Cognitive Flexibility',
            4: '💪 Grit and Perseverance',
            5: '🌊 Adaptability and Agility',
            6: '🎯 Final Reflections'
        }
        
        current_module = 0
        module_counts = {}
        
        for row in result.fetchall():
            mod_num, order, id, title = row
            
            if mod_num not in module_counts:
                module_counts[mod_num] = 0
            module_counts[mod_num] += 1
            
            if mod_num != current_module:
                current_module = mod_num
                module_name = module_names.get(mod_num, f'Module {mod_num}')
                print(f"\n{module_name}")
                print("-" * 50)
            
            # Truncate long titles
            title_display = title[:50] + "..." if len(title) > 50 else title
            print(f"  Order {order:2d} | ID {id:3d} | {title_display}")
        
        # Summary
        print("\n" + "=" * 60)
        print("📈 MODULE SUMMARY:")
        for mod_num in sorted(module_counts.keys()):
            module_name = module_names.get(mod_num, f'Module {mod_num}')
            count = module_counts[mod_num]
            status = "✅" if mod_num == 2 and count == 8 else "✅" if count >= 1 else "❌"
            print(f"{status} {module_name}: {count} lessons")
        
        # Check for any module 7
        result = await session.execute(text("SELECT COUNT(*) FROM lesson WHERE module_number = 7"))
        mod7_count = result.scalar()
        if mod7_count > 0:
            print(f"⚠️  Warning: Module 7 still has {mod7_count} lessons (should be 0)")
        else:
            print("✅ No Module 7 lessons (correct)")

if __name__ == "__main__":
    asyncio.run(fix_all_modules())
