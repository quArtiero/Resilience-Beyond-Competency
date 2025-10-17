"""
Add Lesson 5 (Empathy) to local Docker database
"""

import psycopg2
from module2_lesson5_empathy import lesson5_content

def add_lesson5():
    try:
        # Connect to PostgreSQL in Docker
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="resilient_mastery",
            user="postgres",
            password="postgres"
        )
        cur = conn.cursor()
        
        # Check if lesson 24 exists
        cur.execute("SELECT id FROM lesson WHERE id = 24")
        exists = cur.fetchone()
        
        if exists:
            print("Lesson 24 exists, updating...")
            cur.execute("""
                UPDATE lesson 
                SET title = %s, 
                    slug = %s, 
                    module_number = %s, 
                    "order" = %s,
                    story = %s,
                    reflection = %s,
                    challenge = %s,
                    quiz = %s,
                    is_published = %s,
                    updated_at = NOW()
                WHERE id = 24
            """, (
                lesson5_content['title'],
                lesson5_content['slug'],
                lesson5_content['module_number'],
                lesson5_content['order'],
                lesson5_content['story'],
                lesson5_content['reflection'],
                lesson5_content['challenge'],
                lesson5_content['quiz'],
                lesson5_content['is_published']
            ))
        else:
            print("Creating Lesson 24...")
            cur.execute("""
                INSERT INTO lesson (
                    id, title, slug, module_number, "order",
                    story, reflection, challenge, quiz, 
                    is_published, created_at, updated_at
                ) VALUES (
                    24, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW()
                )
            """, (
                lesson5_content['title'],
                lesson5_content['slug'],
                lesson5_content['module_number'],
                lesson5_content['order'],
                lesson5_content['story'],
                lesson5_content['reflection'],
                lesson5_content['challenge'],
                lesson5_content['quiz'],
                lesson5_content['is_published']
            ))
        
        conn.commit()
        
        # Verify
        cur.execute("SELECT id, title, module_number, \"order\" FROM lesson WHERE id = 24")
        lesson = cur.fetchone()
        if lesson:
            print(f"✅ Lesson {lesson[0]}: {lesson[1]}")
            print(f"   Module: {lesson[2]}, Order: {lesson[3]}")
            
            # Check content lengths
            cur.execute("""
                SELECT 
                    LENGTH(story) as story_len,
                    LENGTH(reflection) as ref_len,
                    LENGTH(challenge) as chal_len
                FROM lesson WHERE id = 24
            """)
            lengths = cur.fetchone()
            print(f"   Story: {lengths[0]} chars")
            print(f"   Reflection: {lengths[1]} chars")
            print(f"   Challenge: {lengths[2]} chars")
        
        cur.close()
        conn.close()
        print("\n✅ Lesson 5 added successfully!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    add_lesson5()
