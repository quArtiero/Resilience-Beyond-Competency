#!/usr/bin/env python
"""
Update Module 2, Lesson 1 in Docker PostgreSQL database
"""
import psycopg2
import json
from module2_lesson1_redline import LESSON_1_REDLINE

# Connect to Docker PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="resilient_mastery",
    user="postgres",
    password="postgres"
)
cursor = conn.cursor()

# Prepare quiz data as JSON string
quiz_json = json.dumps(LESSON_1_REDLINE["quiz"])

# Update the existing Lesson 20
cursor.execute("""
    UPDATE lesson 
    SET title = %s,
        slug = %s,
        story = %s,
        reflection = %s,
        challenge = %s,
        quiz = %s
    WHERE id = %s
""", (
    LESSON_1_REDLINE["title"],
    LESSON_1_REDLINE["slug"],
    LESSON_1_REDLINE["story"],
    LESSON_1_REDLINE["reflection"],
    LESSON_1_REDLINE["challenge"],
    quiz_json,
    LESSON_1_REDLINE["id"]
))

# Check if update was successful
if cursor.rowcount > 0:
    print(f"✅ Updated Lesson {LESSON_1_REDLINE['id']}: {LESSON_1_REDLINE['title']}")
    print(f"   - Story: {len(LESSON_1_REDLINE['story']):,} chars")
    print(f"   - Interactive components: Yes")
    print(f"   - Quiz questions: {len(LESSON_1_REDLINE['quiz']['questions'])}")
else:
    print(f"❌ Lesson {LESSON_1_REDLINE['id']} not found")

# Commit and close
conn.commit()
cursor.close()
conn.close()

print("\n🎉 Module 2, Lesson 1 is now interactive!")
print("   View it at: http://localhost:5173/lesson/20")
print("\n📱 Interactive components included:")
print("   - EQ Assessment with spider chart")
print("   - Breathing exercise with countdown")
print("   - If-Then Planner for situation handling")
print("   - Interactive worksheets and reflection")
print("   - Comprehensive quiz")
