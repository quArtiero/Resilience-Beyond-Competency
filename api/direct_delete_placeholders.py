"""
Direct SQL deletion of placeholder lessons
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
    print("DELETING MODULE 3 PLACEHOLDER LESSONS (IDs 5 and 6)")
    print("="*60)
    
    # Check what we're deleting
    cur.execute("SELECT id, title, module_number FROM lesson WHERE id IN (5, 6)")
    lessons = cur.fetchall()
    
    if not lessons:
        print("\n✅ Lessons 5 and 6 already deleted or don't exist")
    else:
        print("\nFound lessons to delete:")
        for lesson in lessons:
            print(f"  ❌ ID: {lesson[0]}, Title: {lesson[1]}, Module: {lesson[2]}")
        
        # Delete completions
        print("\nStep 1: Deleting completion records...")
        cur.execute("DELETE FROM lessoncompletion WHERE lesson_id IN (5, 6)")
        print(f"  ✅ Deleted {cur.rowcount} completion records")
        
        # Delete lessons
        print("\nStep 2: Deleting lessons...")
        cur.execute("DELETE FROM lesson WHERE id IN (5, 6)")
        print(f"  ✅ Deleted {cur.rowcount} lessons")
        
        # Commit changes
        conn.commit()
        print("\n✅ SUCCESS! Changes committed to database")
    
    # Show remaining Module 3 lessons
    print("\n" + "-"*60)
    print("Module 3 lessons remaining:")
    print("-"*60)
    
    cur.execute("SELECT id, title FROM lesson WHERE module_number = 3 ORDER BY \"order\"")
    remaining = cur.fetchall()
    
    if remaining:
        for lesson in remaining:
            print(f"  ✓ ID: {lesson[0]}, Title: {lesson[1]}")
        print(f"\nTotal: {len(remaining)} lessons in Module 3")
    else:
        print("  No lessons in Module 3 - ready to add new content!")
    
    cur.close()
    conn.close()
    print("\n✅ Database connection closed")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
    if 'conn' in locals():
        conn.rollback()
        conn.close()
