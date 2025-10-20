#!/usr/bin/env python3
"""
Add Lesson 6: Social Skills - Clear, Kind, Direct Communication to local Docker database
"""

import sys
import os

# Add the module2_lesson6_social_skills module to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from module2_lesson6_social_skills import get_lesson6_content

def create_add_script():
    """Create SQL script to add lesson 6"""
    lesson = get_lesson6_content()
    
    # Escape single quotes in content
    story = lesson['story'].replace("'", "''")
    reflection = lesson['reflection'].replace("'", "''")
    challenge = lesson['challenge'].replace("'", "''")
    quiz = lesson['quiz'].replace("'", "''")
    
    sql = f"""
-- Delete existing Lesson 6 if it exists
DELETE FROM lessoncompletion WHERE lesson_id = 25;
DELETE FROM lesson WHERE id = 25;

-- Insert Lesson 6: Social Skills
INSERT INTO lesson (
    id, 
    module_number, 
    "order", 
    title, 
    slug,
    story, 
    reflection, 
    challenge, 
    quiz,
    is_published,
    created_at,
    updated_at
) VALUES (
    25,
    2,
    10,
    'Social Skills: Clear, Kind, Direct Communication',
    'social-skills-clear-kind-direct',
    '{story}',
    '{reflection}',
    '{challenge}',
    '{quiz}',
    TRUE,
    NOW(),
    NOW()
);
"""
    
    # Write SQL to file
    with open('add_lesson6_docker.sql', 'w') as f:
        f.write(sql)
    
    print("Created add_lesson6_docker.sql")
    print("\nTo add Lesson 6 to your Docker database:")
    print("1. Make sure Docker is running: docker-compose up -d")
    print("2. Copy SQL file to container: docker cp add_lesson6_docker.sql resilience-beyond-competency-db-1:/tmp/")
    print("3. Execute SQL: docker exec -it resilience-beyond-competency-db-1 psql -U postgres -d resilient_mastery -f /tmp/add_lesson6_docker.sql")
    print("4. Restart API: docker-compose restart api")

if __name__ == "__main__":
    create_add_script()
