#!/usr/bin/env python
"""
Check what EI lessons exist in the local database
"""
import sqlite3

# Connect to SQLite database
conn = sqlite3.connect('resilient_mastery.db')
cursor = conn.cursor()

# Check Module 2 lessons
cursor.execute("""
    SELECT id, "order", title, 
           LENGTH(story) as story_len,
           LENGTH(reflection) as reflection_len,
           LENGTH(challenge) as challenge_len
    FROM lesson 
    WHERE module_number = 2
    ORDER BY "order"
""")

lessons = cursor.fetchall()

print("\n🔍 MODULE 2 (EMOTIONAL INTELLIGENCE) LESSONS:")
print("=" * 70)
print(f"{'ID':<4} {'Order':<7} {'Title':<35} {'Story':<8} {'Reflect':<8} {'Challenge'}")
print("-" * 70)

for lesson in lessons:
    id_num, order, title, story_len, reflect_len, challenge_len = lesson
    print(f"{id_num:<4} {order:<7} {title[:33]:<35} {story_len:<8} {reflect_len:<8} {challenge_len}")

print(f"\n📊 Total EI lessons found: {len(lessons)}")

# Check all lessons to see the full picture
cursor.execute("""
    SELECT module_number, COUNT(*) as count
    FROM lesson
    GROUP BY module_number
    ORDER BY module_number
""")

module_counts = cursor.fetchall()
print("\n📚 ALL MODULES:")
for module, count in module_counts:
    print(f"  Module {module}: {count} lessons")

# Check if lesson 20 exists
cursor.execute("SELECT id, title FROM lesson WHERE id = 20")
lesson_20 = cursor.fetchone()
if lesson_20:
    print(f"\n✅ Lesson 20 exists: {lesson_20[1]}")
else:
    print("\n❌ Lesson 20 (The Red Line Meeting) not found")

conn.close()
