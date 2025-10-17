#!/usr/bin/env python
"""
Add Lesson 2 (EI Foundations & Baseline) to local database
"""
import json
import psycopg2

# Import lesson content
from module2_lesson2_foundations import LESSON_2_FOUNDATIONS

# Connect to Docker PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="resilient_mastery",
    user="postgres",
    password="postgres"
)
cursor = conn.cursor()

# Check if lesson exists
cursor.execute("SELECT id, title FROM lesson WHERE id = %s", (LESSON_2_FOUNDATIONS["id"],))
existing = cursor.fetchone()

if existing:
    print(f"Updating existing lesson: {existing[1]}")
    # Update existing
    cursor.execute("""
        UPDATE lesson 
        SET title = %s,
            slug = %s,
            story = %s,
            reflection = %s,
            challenge = %s,
            quiz = %s,
            "order" = %s,
            module_number = %s,
            is_published = TRUE
        WHERE id = %s
    """, (
        LESSON_2_FOUNDATIONS["title"],
        LESSON_2_FOUNDATIONS["slug"],
        LESSON_2_FOUNDATIONS["story"],
        LESSON_2_FOUNDATIONS["reflection"],
        LESSON_2_FOUNDATIONS["challenge"],
        json.dumps(LESSON_2_FOUNDATIONS["quiz"]),
        LESSON_2_FOUNDATIONS["order"],
        LESSON_2_FOUNDATIONS["module_number"],
        LESSON_2_FOUNDATIONS["id"]
    ))
else:
    print(f"Creating new lesson: {LESSON_2_FOUNDATIONS['title']}")
    # Insert new
    cursor.execute("""
        INSERT INTO lesson (id, title, slug, story, reflection, challenge, quiz, "order", module_number, is_published)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, TRUE)
    """, (
        LESSON_2_FOUNDATIONS["id"],
        LESSON_2_FOUNDATIONS["title"],
        LESSON_2_FOUNDATIONS["slug"],
        LESSON_2_FOUNDATIONS["story"],
        LESSON_2_FOUNDATIONS["reflection"],
        LESSON_2_FOUNDATIONS["challenge"],
        json.dumps(LESSON_2_FOUNDATIONS["quiz"]),
        LESSON_2_FOUNDATIONS["order"],
        LESSON_2_FOUNDATIONS["module_number"]
    ))

conn.commit()
print(f"✅ Lesson {LESSON_2_FOUNDATIONS['id']}: {LESSON_2_FOUNDATIONS['title']} is ready!")
print(f"   Story: {len(LESSON_2_FOUNDATIONS['story']):,} chars")
print(f"   Reflection: {len(LESSON_2_FOUNDATIONS['reflection']):,} chars")
print(f"   Challenge: {len(LESSON_2_FOUNDATIONS['challenge']):,} chars")
print(f"   Quiz: {len(LESSON_2_FOUNDATIONS['quiz']['questions'])} questions")
print("\n📱 Interactive components included:")
print("   - Baseline Assessment (5-pillar rating system)")
print("   - Emotion Granularity (vocabulary builder)")
print("   - Values Map (values → behaviors → metrics)")
print("   - EI Compass (personal operating system)")
print("\n🚀 View it at: http://localhost:5173/lesson/21")

cursor.close()
conn.close()
