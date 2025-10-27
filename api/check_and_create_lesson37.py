"""
Check if Lesson 37 exists on Render and create if missing
"""

import os
import psycopg2
from urllib.parse import urlparse

# Get database URL
DATABASE_URL = os.environ.get('DATABASE_URL', '')

if not DATABASE_URL:
    print("ERROR: DATABASE_URL not set")
    exit(1)

# Parse the DATABASE_URL
url = urlparse(DATABASE_URL)
db_config = {
    'dbname': url.path[1:],
    'user': url.username,
    'password': url.password,
    'host': url.hostname,
    'port': url.port
}

print("Connecting to database...")

try:
    # Connect to database
    conn = psycopg2.connect(**db_config)
    cur = conn.cursor()
    
    print("\n" + "="*60)
    print("CHECKING LESSON 37 STATUS")
    print("="*60)
    
    # Check if Lesson 37 exists
    cur.execute("SELECT id, title, module_number, \"order\", LENGTH(story) as story_len FROM lesson WHERE id = 37")
    lesson = cur.fetchone()
    
    if lesson:
        print(f"\n✅ Lesson 37 EXISTS:")
        print(f"  - ID: {lesson[0]}")
        print(f"  - Title: {lesson[1]}")
        print(f"  - Module: {lesson[2]}")
        print(f"  - Order: {lesson[3]}")
        print(f"  - Story Length: {lesson[4]} characters")
        
        if lesson[4] < 100:
            print("\n⚠️  WARNING: Story content seems too short. May need to update content.")
    else:
        print("\n❌ Lesson 37 NOT FOUND - Creating it now...")
        
        # Create Lesson 37
        cur.execute("""
            INSERT INTO lesson (
                id, slug, title, module_number, "order", is_published,
                story, reflection, challenge, quiz
            ) VALUES (
                37, 
                'the-bridge-in-the-storm',
                'The Bridge in the Storm',
                3,
                11,
                true,
                'Placeholder - needs content update',
                'Placeholder - needs content update',
                'Placeholder - needs content update',
                '{}'::jsonb
            )
        """)
        
        conn.commit()
        print("✅ Lesson 37 created as placeholder. Run deploy_lesson37_render.py to add full content.")
    
    # Show all Module 3 lessons
    print("\n" + "-"*60)
    print("All Module 3 lessons:")
    print("-"*60)
    
    cur.execute("""
        SELECT id, title, "order", is_published 
        FROM lesson 
        WHERE module_number = 3 
        ORDER BY "order"
    """)
    
    lessons = cur.fetchall()
    
    if lessons:
        for lesson in lessons:
            status = "✅ Published" if lesson[3] else "⚠️ Unpublished"
            print(f"  [{status}] ID: {lesson[0]:3} | Order: {lesson[2]:2} | {lesson[1]}")
        print(f"\nTotal: {len(lessons)} lessons in Module 3")
    else:
        print("  No lessons found in Module 3")
    
    cur.close()
    conn.close()
    print("\n✅ Check complete")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
    if 'conn' in locals():
        conn.rollback()
        conn.close()
