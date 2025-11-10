#!/usr/bin/env python3
"""
Check what's actually in Module 3 lessons and show the content
"""

import psycopg2
from psycopg2.extras import Json

# Render PostgreSQL connection with SSL
DATABASE_URL = 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require'

def check_content():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    try:
        # Check lesson 41 story specifically
        cur.execute("""
            SELECT LEFT(story::text, 1000)
            FROM lesson WHERE id = 41
        """)
        result = cur.fetchone()
        if result:
            print("Lesson 41 Story Preview (first 1000 chars):")
            print("-" * 50)
            print(result[0])
            print("-" * 50)
            
            # Check for the problematic pattern
            if "Type your response" in result[0]:
                print("\n⚠️  Found 'Type your response' in content!")
                print("This needs to be replaced with _____ markers")
            elif "_____" in result[0]:
                print("\n✓ Found _____ markers in content")
            else:
                print("\n❓ No input field markers found at all")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    check_content()
