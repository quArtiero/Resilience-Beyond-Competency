#!/usr/bin/env python3
"""
Fix JSON encoding issue in Module 3 lessons - content should be plain text with actual newlines
"""

import psycopg2
import json

# Render PostgreSQL connection with SSL
DATABASE_URL = 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require'

def fix_lesson_content():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    try:
        # Get all Module 3 lessons
        for lesson_id in [37, 38, 39, 40, 41, 42, 43]:
            print(f"\n📝 Checking Lesson {lesson_id}...")
            
            # Get the raw content
            cur.execute("""
                SELECT story::text, reflection::text, challenge::text 
                FROM lesson WHERE id = %s
            """, (lesson_id,))
            
            result = cur.fetchone()
            if result:
                story_raw = result[0]
                reflection_raw = result[1]
                challenge_raw = result[2]
                
                # Check if content is JSON-encoded (starts with quotes)
                needs_fix = False
                
                # Process story
                if story_raw and story_raw.startswith('"'):
                    try:
                        # Parse the JSON string to get actual content
                        story_actual = json.loads(story_raw)
                        # Now fix the placeholder text
                        story_fixed = story_actual.replace('Type your response...', '_____')
                        needs_fix = True
                        print(f"  - Fixing story content (was JSON-encoded)")
                    except:
                        story_fixed = story_raw
                else:
                    story_fixed = story_raw
                    if story_raw and 'Type your response' in story_raw:
                        story_fixed = story_raw.replace('Type your response...', '_____')
                        needs_fix = True
                        print(f"  - Fixing placeholder text in story")
                
                # Process reflection  
                if reflection_raw and reflection_raw.startswith('"'):
                    try:
                        reflection_actual = json.loads(reflection_raw)
                        reflection_fixed = reflection_actual.replace('Type your response...', '_____')
                        needs_fix = True
                        print(f"  - Fixing reflection content (was JSON-encoded)")
                    except:
                        reflection_fixed = reflection_raw
                else:
                    reflection_fixed = reflection_raw
                    if reflection_raw and 'Type your response' in reflection_raw:
                        reflection_fixed = reflection_raw.replace('Type your response...', '_____')
                        needs_fix = True
                        print(f"  - Fixing placeholder text in reflection")
                
                # Process challenge
                if challenge_raw and challenge_raw.startswith('"'):
                    try:
                        challenge_actual = json.loads(challenge_raw)
                        challenge_fixed = challenge_actual.replace('Type your response...', '_____')
                        needs_fix = True
                        print(f"  - Fixing challenge content (was JSON-encoded)")
                    except:
                        challenge_fixed = challenge_raw
                else:
                    challenge_fixed = challenge_raw
                    if challenge_raw and 'Type your response' in challenge_raw:
                        challenge_fixed = challenge_raw.replace('Type your response...', '_____')
                        needs_fix = True
                        print(f"  - Fixing placeholder text in challenge")
                
                if needs_fix:
                    # Update with plain text (not JSON)
                    cur.execute("""
                        UPDATE lesson 
                        SET story = %s, reflection = %s, challenge = %s
                        WHERE id = %s
                    """, (
                        story_fixed,
                        reflection_fixed,
                        challenge_fixed,
                        lesson_id
                    ))
                    print(f"  ✅ Fixed Lesson {lesson_id}")
                else:
                    print(f"  ✓ Lesson {lesson_id} OK")
        
        conn.commit()
        print("\n✅ All Module 3 lessons fixed!")
        
    except Exception as e:
        conn.rollback()
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    fix_lesson_content()
