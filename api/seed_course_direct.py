"""
Direct database seeding script - seeds comprehensive course without dependencies
"""
import sqlite3
import json
from datetime import datetime
from new_course_structure import COURSE_MODULES

def seed_database():
    # Connect to database
    conn = sqlite3.connect('resilient_mastery.db')
    cursor = conn.cursor()
    
    print("🚀 Starting comprehensive course seeding...")
    print("=" * 60)
    
    # Clear existing lessons
    cursor.execute("DELETE FROM lessoncompletion")
    cursor.execute("DELETE FROM lesson")
    print("✅ Cleared existing lessons")
    
    lesson_count = 0
    
    for module in COURSE_MODULES:
        print(f"\n📚 Creating Module {module['module_number']}: {module['module_title']}")
        
        for lesson_data in module['lessons']:
            # Convert quiz dictionary to JSON string
            quiz_json = json.dumps(lesson_data['quiz'], indent=2)
            
            # Create lesson slug
            title_clean = lesson_data['title'].lower().replace(' ', '-').replace('?', '').replace("'", '').replace(':', '')
            slug = f"lesson-{lesson_data['order']}-{title_clean}"
            
            # Get content from lesson_data
            story_content = lesson_data.get('content', '')
            reflection_content = lesson_data.get('reflection', '')
            challenge_content = lesson_data.get('challenge', '')
            
            # Insert lesson
            cursor.execute('''
                INSERT INTO lesson (
                    slug, title, story, reflection, challenge, quiz, 
                    "order", module_number, is_published, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                slug,
                lesson_data['title'],
                story_content,
                reflection_content, 
                challenge_content,
                quiz_json,
                lesson_data['order'],
                module['module_number'],
                True,
                datetime.utcnow().isoformat(),
                datetime.utcnow().isoformat()
            ))
            
            lesson_count += 1
            print(f"  ✅ Created Lesson {lesson_data['order']}: {lesson_data['title']}")
    
    conn.commit()
    print(f"\n🎉 Successfully created {lesson_count} lessons!")
    
    # Verify the seeding
    cursor.execute("SELECT COUNT(*) FROM lesson")
    total = cursor.fetchone()[0]
    
    cursor.execute("SELECT module_number, COUNT(*) FROM lesson GROUP BY module_number ORDER BY module_number")
    modules = cursor.fetchall()
    
    print(f"\n📊 Database verification:")
    print(f"   Total lessons in database: {total}")
    print(f"\n📋 Lessons per module:")
    for mod_num, count in modules:
        print(f"   Module {mod_num}: {count} lessons")
    
    conn.close()
    print("\n✅ Course seeding completed successfully!")
    print("🎓 The Resilience Beyond Competency course is now ready!")

if __name__ == "__main__":
    seed_database()
