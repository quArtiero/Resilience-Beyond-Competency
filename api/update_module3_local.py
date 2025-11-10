#!/usr/bin/env python3
"""
Update Module 3 lessons (39-43) in LOCAL Docker database
After running this, you can export the data to Render
"""

import psycopg2
from psycopg2.extras import Json
import sys

# Local PostgreSQL connection (Docker)
LOCAL_DATABASE_URL = 'postgresql://postgres:postgres@127.0.0.1:5432/resilient_mastery'

def check_connection():
    """Test the database connection"""
    try:
        conn = psycopg2.connect(LOCAL_DATABASE_URL)
        cur = conn.cursor()
        cur.execute("SELECT version()")
        version = cur.fetchone()
        print(f"✅ Connected to PostgreSQL: {version[0][:30]}...")
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

def check_lessons():
    """Check which lessons exist"""
    try:
        conn = psycopg2.connect(LOCAL_DATABASE_URL)
        cur = conn.cursor()
        cur.execute("SELECT id, title FROM lesson WHERE id IN (39, 40, 41, 42, 43) ORDER BY id")
        lessons = cur.fetchall()
        print("\n📚 Existing Module 3 lessons:")
        for lesson_id, title in lessons:
            print(f"  Lesson {lesson_id}: {title}")
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Error checking lessons: {e}")
        return False

def update_lesson_content():
    """Update the lesson content - simplified version"""
    try:
        conn = psycopg2.connect(LOCAL_DATABASE_URL)
        cur = conn.cursor()
        
        # For now, just update with a simple test to verify it works
        test_content = {
            "story": "# Test Story Content\n\nThis is a test update.",
            "reflection": "# Test Reflection\n\nReflection content here.",
            "challenge": "# Test Challenge\n\nChallenge content here."
        }
        
        # Update lessons 39-43
        for lesson_id in [39, 40, 41, 42, 43]:
            cur.execute("""
                UPDATE lesson 
                SET story = %s, reflection = %s, challenge = %s
                WHERE id = %s
            """, (
                Json(test_content['story']), 
                Json(test_content['reflection']), 
                Json(test_content['challenge']),
                lesson_id
            ))
            print(f"✅ Updated Lesson {lesson_id}")
        
        conn.commit()
        print("\n✅ All lessons updated successfully!")
        cur.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error updating lessons: {e}")
        if conn:
            conn.rollback()
            conn.close()
        return False

def main():
    print("🚀 Module 3 Lessons Update Script (LOCAL)")
    print("=" * 50)
    
    # Step 1: Test connection
    if not check_connection():
        print("\n❌ Cannot connect to database. Make sure Docker is running:")
        print("   docker-compose up -d")
        return
    
    # Step 2: Check existing lessons
    if not check_lessons():
        return
    
    # Step 3: Ask for confirmation
    print("\n⚠️  This will update lessons 39-43 with TEST content")
    response = input("Continue? (y/n): ")
    if response.lower() != 'y':
        print("❌ Update cancelled")
        return
    
    # Step 4: Update lessons
    if update_lesson_content():
        print("\n✅ Success! Lessons updated in LOCAL database")
        print("\n📝 Next steps:")
        print("1. Verify the updates locally")
        print("2. Export the data: docker-compose exec db pg_dump -U postgres resilient_mastery_db > backup.sql")
        print("3. Import to Render database")
    else:
        print("\n❌ Update failed")

if __name__ == "__main__":
    main()
