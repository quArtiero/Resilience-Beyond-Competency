#!/usr/bin/env python3
"""
Fix Module 3 challenge durations - Max 3 days except for Lesson 43 (7-Day Challenge)
"""

import psycopg2
from psycopg2.extras import Json
import re

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def update_challenge_duration(lesson_id: int, old_days: int, new_days: int, challenge_content: str) -> str:
    """Update challenge duration in the content"""
    
    # Replace various day patterns
    patterns = [
        (f'{old_days}-Day', f'{new_days}-Day'),
        (f'{old_days}-day', f'{new_days}-day'),
        (f'{old_days} Day', f'{new_days} Day'),
        (f'{old_days} day', f'{new_days} day'),
        (f'next {old_days} days', f'next {new_days} days'),
        (f'Days 1-{old_days}', f'Days 1-{new_days}'),
        (f'Day 1-{old_days}', f'Day 1-{new_days}'),
        (f'Days {old_days}', f'Days {new_days}'),
        (f'Day {old_days}:', f'Day {new_days}:'),
        (f'{old_days} days', f'{new_days} days')
    ]
    
    updated_content = challenge_content
    for old_pattern, new_pattern in patterns:
        updated_content = updated_content.replace(old_pattern, new_pattern)
    
    # Special handling for lesson 42 (was 90-day)
    if lesson_id == 42:
        # Change from 90-Day to 3-Day
        updated_content = updated_content.replace('90-Day Flexibility Transformation', '3-Day Flexibility Foundation')
        updated_content = updated_content.replace('90 days', '3 days')
        updated_content = updated_content.replace('Phase 1: Foundation (Days 1-30)', 'Day 1: Foundation')
        updated_content = updated_content.replace('Phase 2: Expansion (Days 31-60)', 'Day 2: Expansion')
        updated_content = updated_content.replace('Phase 3: Mastery (Days 61-90)', 'Day 3: Integration')
        updated_content = updated_content.replace('Days 1-30', 'Day 1')
        updated_content = updated_content.replace('Days 31-60', 'Day 2')
        updated_content = updated_content.replace('Days 61-90', 'Day 3')
        updated_content = updated_content.replace('30 days', '1 day')
        updated_content = updated_content.replace('60 days', '2 days')
        updated_content = updated_content.replace('90 days', '3 days')
    
    # Special handling for lesson 40 (was 30-day)
    if lesson_id == 40:
        updated_content = updated_content.replace('30-Day', '3-Day')
        updated_content = updated_content.replace('30 days', '3 days')
        updated_content = updated_content.replace('7-Day Reframe Revolution', '3-Day Reframe Revolution')
        updated_content = updated_content.replace('The 7-Day Journey', 'The 3-Day Journey')
        updated_content = updated_content.replace('Day 1-2:', 'Day 1:')
        updated_content = updated_content.replace('Day 3-4:', 'Day 2:')
        updated_content = updated_content.replace('Day 5-6:', 'Day 3:')
        updated_content = updated_content.replace('Day 7:', 'Day 3 Evening:')
        
    # For lesson 43 - keep as 7-day but fix any 90-day references
    if lesson_id == 43:
        updated_content = updated_content.replace('90-day', '7-day')
        updated_content = updated_content.replace('90 days', '7 days')
        updated_content = updated_content.replace('90 Days', '7 Days')
        
    # Update daily structure for 3-day challenges
    if new_days == 3 and lesson_id not in [43]:
        # Simplify daily breakdowns
        updated_content = updated_content.replace('Day 1-2:', 'Day 1:')
        updated_content = updated_content.replace('Day 3-4:', 'Day 2:')
        updated_content = updated_content.replace('Day 5-6:', 'Day 3:')
        updated_content = updated_content.replace('Day 7:', 'Day 3 Bonus:')
        updated_content = updated_content.replace('Day 5:', 'Day 3:')
        updated_content = updated_content.replace('Day 4:', 'Day 2 Evening:')
        
    return updated_content

def main():
    """Fix challenge durations for Module 3"""
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Define the new durations
    updates = [
        # (lesson_id, old_duration, new_duration, title)
        (37, 7, 3, "The Bridge in the Storm"),
        (38, 7, 3, "What Is Cognitive Flexibility?"),
        (39, 5, 3, "Barriers & Biases"),
        (40, 30, 3, "Tools for Reframing"),  # Was 30 days!
        (41, 7, 3, "Flexibility in Action"),
        (42, 90, 3, "Reflection & Integration"),  # Was 90 days!
        (43, 90, 7, "The 7-Day Reframe Challenge")  # Keep as 7 days
    ]
    
    print("Updating Module 3 challenge durations...")
    print("=" * 60)
    
    for lesson_id, old_days, new_days, title in updates:
        # Fetch current challenge content
        cur.execute("SELECT challenge FROM lesson WHERE id = %s", (lesson_id,))
        result = cur.fetchone()
        
        if result and result[0]:
            challenge_content = result[0]
            
            # Update the content
            updated_content = update_challenge_duration(lesson_id, old_days, new_days, challenge_content)
            
            # Save back to database
            cur.execute(
                "UPDATE lesson SET challenge = %s WHERE id = %s",
                (Json(updated_content), lesson_id)
            )
            
            print(f"✅ Lesson {lesson_id}: {title}")
            print(f"   Changed from {old_days} days to {new_days} days")
            
            # Show a sample of the changes
            if '90-Day' in challenge_content or '30-Day' in challenge_content or '7-Day' in challenge_content:
                old_title = re.search(r'# (.+)', challenge_content)
                new_title = re.search(r'# (.+)', updated_content)
                if old_title and new_title:
                    print(f"   Title: {old_title.group(1)} → {new_title.group(1)}")
        else:
            print(f"⚠️ Lesson {lesson_id}: No challenge content found")
        
        print()
    
    conn.commit()
    print("=" * 60)
    print("✅ All Module 3 challenge durations updated!")
    print("\nSummary:")
    print("• Lessons 37-42: Now 3-day challenges")
    print("• Lesson 43: Remains 7-day challenge (as intended)")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    main()
