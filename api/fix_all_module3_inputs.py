#!/usr/bin/env python3
"""
Fix ALL Module 3 lessons (38-43) to have proper _____ markers for input fields
"""

import psycopg2
from psycopg2.extras import Json
import re

# Render PostgreSQL connection with SSL
DATABASE_URL = 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require'

def fix_content(content):
    """Replace 'Type your response...' and similar patterns with _____ markers"""
    if not content:
        return content
    
    # Replace various patterns that should be input fields
    patterns_to_replace = [
        (r'\nType your response\.\.\.\n', ': _____'),
        (r'Type your response\.\.\.', '_____'),
        (r':\s*\n\s*Type your response\.\.\.', ': _____'),
        (r':\s+Type your response\.\.\.', ': _____'),
        # Also handle any standalone placeholder text
        (r'^\s*Type your response\.\.\.\s*$', '_____'),
    ]
    
    fixed_content = content
    for pattern, replacement in patterns_to_replace:
        fixed_content = re.sub(pattern, replacement, fixed_content, flags=re.MULTILINE)
    
    return fixed_content

def get_lesson_content(cur, lesson_id):
    """Get current content for a lesson"""
    cur.execute("""
        SELECT story::text, reflection::text, challenge::text, quiz::text
        FROM lesson WHERE id = %s
    """, (lesson_id,))
    result = cur.fetchone()
    if result:
        return {
            'story': result[0],
            'reflection': result[1],
            'challenge': result[2],
            'quiz': result[3]
        }
    return None

def update_lesson(cur, lesson_id, content):
    """Update lesson with fixed content"""
    # Fix each content type
    fixed_story = fix_content(content.get('story'))
    fixed_reflection = fix_content(content.get('reflection'))
    fixed_challenge = fix_content(content.get('challenge'))
    
    # Update the lesson
    cur.execute("""
        UPDATE lesson 
        SET story = %s, reflection = %s, challenge = %s
        WHERE id = %s
    """, (
        Json(fixed_story) if fixed_story else Json(content.get('story')),
        Json(fixed_reflection) if fixed_reflection else Json(content.get('reflection')),
        Json(fixed_challenge) if fixed_challenge else Json(content.get('challenge')),
        lesson_id
    ))

def main():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    try:
        # Fix lessons 38-43 (37 is reportedly working)
        for lesson_id in [38, 39, 40, 41, 42, 43]:
            print(f"\n📝 Processing Lesson {lesson_id}...")
            
            # Get current content
            content = get_lesson_content(cur, lesson_id)
            
            if content:
                # Check if content needs fixing
                story = content.get('story', '')
                reflection = content.get('reflection', '')
                challenge = content.get('challenge', '')
                
                needs_fix = False
                if 'Type your response' in story:
                    print(f"  - Found placeholder text in story")
                    needs_fix = True
                if 'Type your response' in reflection:
                    print(f"  - Found placeholder text in reflection")
                    needs_fix = True
                if 'Type your response' in challenge:
                    print(f"  - Found placeholder text in challenge")
                    needs_fix = True
                
                if needs_fix:
                    # Update with fixed content
                    update_lesson(cur, lesson_id, content)
                    print(f"  ✅ Fixed Lesson {lesson_id}")
                else:
                    print(f"  ✓ Lesson {lesson_id} looks OK")
            else:
                print(f"  ❌ Lesson {lesson_id} not found")
        
        # Commit all changes
        conn.commit()
        print("\n✅ Successfully fixed all Module 3 lessons!")
        
    except Exception as e:
        conn.rollback()
        print(f"\n❌ Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    main()
