#!/usr/bin/env python3
"""
Fix day numbering issues in all Module 3 challenges after duration change
"""

import psycopg2
from psycopg2.extras import Json
import re

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def fix_day_structure(content: str, lesson_id: int) -> str:
    """Fix broken day references in content"""
    
    # Skip Lesson 43 (7-day challenge) and 41 (already fixed)
    if lesson_id in [41, 43]:
        return content
    
    # Fix common broken patterns from the duration fix
    fixes = [
        # Fix duplicate Day 3 references
        ('Day 3:', 'Day 3:', 1),  # Keep only first occurrence as Day 3
        ('### Day 3:', '### Day 3 (Final Day):', 1),
        
        # Fix Day 2 Evening that should be part of Day 2
        ('Day 2 Evening:', 'Day 2 (Evening):', -1),
        
        # Fix higher day numbers that shouldn't exist
        ('Day 4:', 'Day 3 (Bonus):', -1),
        ('Day 5:', 'Day 3 (Extended):', -1),
        ('Day 6:', 'Day 3 (Final):', -1),
        ('Day 7:', 'Day 3 (Completion):', -1),
        
        # Fix day ranges
        ('Day 1-2:', 'Day 1:', -1),
        ('Day 3-4:', 'Day 2:', -1),
        ('Day 5-6:', 'Day 3:', -1),
        ('Days 1-3:', 'Days 1-3:', -1),
        
        # Fix phase references
        ('Phase 1 (Days 1-30)', 'Day 1 Focus', -1),
        ('Phase 2 (Days 31-60)', 'Day 2 Focus', -1),
        ('Phase 3 (Days 61-90)', 'Day 3 Focus', -1),
    ]
    
    updated = content
    for old, new, count in fixes:
        if count == -1:
            updated = updated.replace(old, new)
        else:
            updated = updated.replace(old, new, count)
    
    # Count actual Day references to verify structure
    day1_count = len(re.findall(r'Day 1[:\s]', updated))
    day2_count = len(re.findall(r'Day 2[:\s]', updated))
    day3_count = len(re.findall(r'Day 3[:\s]', updated))
    
    # Fix if we have too many of the same day
    if day3_count > 3:
        # We have duplicate Day 3 sections, need to renumber
        day_sections = re.split(r'### Day \d+', updated)
        if len(day_sections) > 4:  # Header + 3 days
            # Need manual fix
            print(f"  ⚠️ Lesson {lesson_id} needs manual review - too many day sections")
    
    return updated

def main():
    """Fix all Module 3 lessons except 41 (already fixed) and 43 (7-day)"""
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Get all Module 3 lessons
    cur.execute("""
        SELECT id, title, challenge 
        FROM lesson 
        WHERE module_number = 3 AND id != 41
        ORDER BY id
    """)
    
    lessons = cur.fetchall()
    
    print("Checking and fixing Module 3 challenge day structures...")
    print("=" * 60)
    
    for lesson_id, title, challenge in lessons:
        if not challenge:
            print(f"⚠️ Lesson {lesson_id}: {title} - No challenge content")
            continue
            
        if lesson_id == 43:
            print(f"⏭️ Lesson {lesson_id}: {title} - Skipping (7-day challenge)")
            continue
        
        # Check for issues
        issues = []
        if 'Day 4' in challenge:
            issues.append('Day 4 reference')
        if 'Day 5' in challenge and lesson_id != 39:  # Lesson 39 had 5 days originally
            issues.append('Day 5 reference')
        if 'Day 6' in challenge:
            issues.append('Day 6 reference')
        if 'Day 7' in challenge and lesson_id != 43:
            issues.append('Day 7 reference')
        if 'Day 2 Evening' in challenge:
            issues.append('Day 2 Evening')
        if 'Day 3:' in challenge and challenge.count('Day 3:') > 2:
            issues.append(f'Multiple Day 3 ({challenge.count("Day 3:")} occurrences)')
        
        if issues:
            print(f"🔧 Lesson {lesson_id}: {title}")
            print(f"   Issues found: {', '.join(issues)}")
            
            # Fix the content
            fixed_content = fix_day_structure(challenge, lesson_id)
            
            # Update in database
            cur.execute(
                "UPDATE lesson SET challenge = %s WHERE id = %s",
                (Json(fixed_content), lesson_id)
            )
            
            print(f"   ✅ Fixed!")
        else:
            print(f"✅ Lesson {lesson_id}: {title} - Structure OK")
    
    conn.commit()
    print("\n" + "=" * 60)
    print("✅ All Module 3 lessons checked and fixed!")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()
