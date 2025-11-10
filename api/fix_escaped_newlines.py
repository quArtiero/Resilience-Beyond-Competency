#!/usr/bin/env python3
"""
Fix escaped newlines in Module 3 challenge content
The content has literal \n instead of actual newlines
"""

import psycopg2
from psycopg2.extras import Json

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def fix_escaped_content(lesson_id: int):
    """Fix escaped newlines and ensure proper formatting"""
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Get current content
    cur.execute("""
        SELECT challenge, story, reflection 
        FROM lesson 
        WHERE id = %s
    """, (lesson_id,))
    
    result = cur.fetchone()
    if not result:
        print(f"❌ Lesson {lesson_id} not found")
        return
    
    challenge, story, reflection = result
    
    # Function to fix escaped content
    def unescape_content(content):
        if not content:
            return content
        
        # If content starts and ends with quotes, it's double-encoded
        if isinstance(content, str):
            # Remove outer quotes if present
            if content.startswith('"') and content.endswith('"'):
                content = content[1:-1]
            
            # Replace literal \n with actual newlines
            content = content.replace('\\n', '\n')
            
            # Fix escaped quotes
            content = content.replace('\\"', '"')
            content = content.replace("\\'", "'")
            
            # Fix any double-escaped backslashes
            content = content.replace('\\\\', '\\')
            
        return content
    
    # Fix all three content types
    fixed_challenge = unescape_content(challenge)
    fixed_story = unescape_content(story)
    fixed_reflection = unescape_content(reflection)
    
    # Update the database
    cur.execute("""
        UPDATE lesson 
        SET challenge = %s,
            story = %s,
            reflection = %s
        WHERE id = %s
    """, (
        Json(fixed_challenge) if fixed_challenge else None,
        Json(fixed_story) if fixed_story else None,
        Json(fixed_reflection) if fixed_reflection else None,
        lesson_id
    ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    print(f"✅ Fixed Lesson {lesson_id}")
    
    # Show a sample of the fix
    if fixed_challenge and challenge != fixed_challenge:
        print(f"   Sample before: {challenge[:100]}")
        print(f"   Sample after: {fixed_challenge[:100]}")

def main():
    """Fix all Module 3 lessons"""
    
    print("Fixing escaped newlines in Module 3 challenges...")
    print("=" * 60)
    
    # Fix all Module 3 lessons
    for lesson_id in range(37, 44):
        fix_escaped_content(lesson_id)
    
    print("\n" + "=" * 60)
    print("✅ All Module 3 lessons fixed!")
    print("\nThe content should now render properly with:")
    print("• Proper line breaks instead of \\n")
    print("• Headers displaying correctly")
    print("• Interactive elements working")

if __name__ == "__main__":
    main()
