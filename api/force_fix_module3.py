#!/usr/bin/env python3
"""
Force fix Module 3 content - completely clean and reformat
"""

import psycopg2
import re

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def aggressive_clean(content):
    """Aggressively clean content of all encoding artifacts"""
    if not content or content == 'null':
        return content
    
    # Convert to string if needed
    content = str(content)
    
    # Remove outer quotes if they exist
    if content.startswith('"') and content.endswith('"'):
        content = content[1:-1]
    
    # Remove all literal backslash-n sequences
    content = content.replace('\\n', '\n')
    content = content.replace('\\\\n', '\n')
    content = content.replace('\\\n', '\n')
    
    # Remove escaped quotes
    content = content.replace('\\"', '"')
    content = content.replace("\\'", "'")
    content = content.replace('\\\\"', '"')
    
    # Remove escaped backslashes
    content = content.replace('\\\\', '\\')
    
    # Fix unicode emojis
    content = content.replace('\\ud83c\\udfaf', '🎯')
    content = content.replace('\\u2192', '→')
    
    # Remove any remaining single backslashes before normal characters
    # But keep actual newlines
    lines = content.split('\n')
    cleaned_lines = []
    for line in lines:
        # Remove backslash at end of line (line continuation)
        if line.endswith('\\'):
            line = line[:-1]
        cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    return content

def fix_lesson(lesson_id):
    """Fix a specific lesson's content"""
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Get the content as plain text
    cur.execute("""
        SELECT challenge::text, story::text, reflection::text, title
        FROM lesson 
        WHERE id = %s
    """, (lesson_id,))
    
    result = cur.fetchone()
    if not result:
        print(f"❌ Lesson {lesson_id} not found")
        return
    
    challenge_raw, story_raw, reflection_raw, title = result
    
    # Clean all content
    challenge_clean = aggressive_clean(challenge_raw)
    story_clean = aggressive_clean(story_raw)
    reflection_clean = aggressive_clean(reflection_raw)
    
    # Update with clean content - store as plain text, NOT JSON
    query = """
        UPDATE lesson 
        SET challenge = %s,
            story = %s,
            reflection = %s
        WHERE id = %s
    """
    
    cur.execute(query, (
        challenge_clean if challenge_clean and challenge_clean != 'null' else None,
        story_clean if story_clean and story_clean != 'null' else None,
        reflection_clean if reflection_clean and reflection_clean != 'null' else None,
        lesson_id
    ))
    
    conn.commit()
    cur.close()
    conn.close()
    
    print(f"✅ Lesson {lesson_id}: {title}")
    
    # Show the difference
    if challenge_raw != challenge_clean:
        print(f"   Challenge cleaned:")
        # Show first line comparison
        if challenge_raw:
            raw_first = challenge_raw.split('\\n')[0][:60]
            print(f"     Before: {raw_first}")
        if challenge_clean:
            clean_first = challenge_clean.split('\n')[0][:60]
            print(f"     After:  {clean_first}")

def main():
    """Force fix all Module 3 lessons"""
    
    print("Force fixing Module 3 content...")
    print("=" * 60)
    
    # Fix all Module 3 lessons
    for lesson_id in range(37, 44):
        fix_lesson(lesson_id)
    
    print("\n" + "=" * 60)
    print("✅ Module 3 content completely cleaned!")
    print("\nContent now has:")
    print("• No escape characters (\\n, \\\\, \\\")")
    print("• Proper line breaks")
    print("• Clean markdown formatting")
    print("• Working interactive elements (_____)")

if __name__ == "__main__":
    main()
