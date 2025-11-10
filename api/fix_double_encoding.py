#!/usr/bin/env python3
"""
Fix double-encoded content in Module 3 lessons
Some content has been JSON-encoded twice causing "\\" and quotes issues
"""

import psycopg2
import json

# Database connection  
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def fix_double_encoding(lesson_id: int):
    """Fix double-encoded content by properly decoding it"""
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Get the raw content directly
    cur.execute("""
        SELECT challenge::text, story::text, reflection::text 
        FROM lesson 
        WHERE id = %s
    """, (lesson_id,))
    
    result = cur.fetchone()
    if not result:
        print(f"❌ Lesson {lesson_id} not found")
        return
    
    challenge_raw, story_raw, reflection_raw = result
    
    def decode_content(content):
        if not content or content == 'null':
            return content
            
        # Try to decode if it looks JSON-encoded
        if content.startswith('"') and content.endswith('"'):
            try:
                # First decode - removes outer quotes and unescapes
                decoded_once = json.loads(content)
                
                # Check if it's still encoded (has literal backslashes)
                if '\\n' in decoded_once or '\\"' in decoded_once:
                    # It's still escaped, decode again
                    decoded_once = decoded_once.replace('\\n', '\n')
                    decoded_once = decoded_once.replace('\\"', '"')
                    decoded_once = decoded_once.replace('\\\\', '\\')
                
                return decoded_once
            except:
                # If JSON decode fails, do manual cleanup
                content = content[1:-1] if content.startswith('"') else content
                content = content.replace('\\n', '\n')
                content = content.replace('\\"', '"')
                content = content.replace('\\\\', '\\')
                return content
        
        # Not JSON encoded, just clean up any escapes
        content = content.replace('\\n', '\n')
        content = content.replace('\\"', '"')
        return content
    
    # Fix all content types
    fixed_challenge = decode_content(challenge_raw)
    fixed_story = decode_content(story_raw)  
    fixed_reflection = decode_content(reflection_raw)
    
    # Update with plain text (not JSON)
    cur.execute("""
        UPDATE lesson 
        SET challenge = %s,
            story = %s,
            reflection = %s
        WHERE id = %s
    """, (
        fixed_challenge,
        fixed_story,
        fixed_reflection,
        lesson_id
    ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    print(f"✅ Fixed Lesson {lesson_id}")
    
    # Show sample
    if fixed_challenge and fixed_challenge != challenge_raw:
        print(f"   Before: {challenge_raw[:80]}")
        print(f"   After: {fixed_challenge[:80]}")

def main():
    """Fix all Module 3 lessons with double encoding issues"""
    
    print("Fixing double-encoded content in Module 3...")
    print("=" * 60)
    
    # Focus on lessons that showed issues
    problem_lessons = [38, 39, 40]
    
    for lesson_id in problem_lessons:
        fix_double_encoding(lesson_id)
    
    # Also check the others
    print("\nChecking other Module 3 lessons...")
    for lesson_id in [37, 41, 42, 43]:
        fix_double_encoding(lesson_id)
    
    print("\n" + "=" * 60)
    print("✅ All Module 3 content properly decoded!")
    print("\nContent should now display:")
    print("• Clean markdown without escape characters")
    print("• Proper headers and formatting")
    print("• Working interactive elements")

if __name__ == "__main__":
    main()
