#!/usr/bin/env python3
"""
Add Lesson 4 to local Docker database
"""
import subprocess
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from module2_lesson4_self_regulation import lesson4_content

def main():
    print("📝 Adding Lesson 4: Self-Regulation to local database...")
    
    # Create SQL script
    sql_content = f"""
-- Delete existing lesson 23 if present
DELETE FROM lessoncompletion WHERE lesson_id = 23;
DELETE FROM lesson WHERE id = 23;

-- Insert Lesson 4
INSERT INTO lesson (
    id, slug, title, story, reflection, challenge, quiz,
    "order", module_number, is_published, created_at, updated_at
) VALUES (
    23,
    '{lesson4_content['slug']}',
    '{lesson4_content['title'].replace("'", "''")}',
    '{lesson4_content['story'].replace("'", "''")}',
    '{lesson4_content['reflection'].replace("'", "''")}',
    '{lesson4_content['challenge'].replace("'", "''")}',
    '{lesson4_content['quiz'].replace("'", "''")}',
    {lesson4_content['order']},
    {lesson4_content['module_number']},
    {lesson4_content['is_published']},
    NOW(),
    NOW()
);

-- Verify insertion
SELECT id, title, LENGTH(story) as story_length, LENGTH(reflection) as reflection_length, LENGTH(challenge) as challenge_length
FROM lesson 
WHERE id = 23;
"""
    
    # Write to file
    with open('/tmp/add_lesson4.sql', 'w') as f:
        f.write(sql_content)
    
    # Copy to container and execute
    subprocess.run("docker cp /tmp/add_lesson4.sql resilience-beyond-competency-db-1:/tmp/", shell=True)
    
    result = subprocess.run(
        'docker exec -i resilience-beyond-competency-db-1 psql -U postgres resilient_mastery < /tmp/add_lesson4.sql',
        shell=True,
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print("Errors:", result.stderr)
    
    # List all Module 2 lessons
    list_cmd = '''docker exec resilience-beyond-competency-db-1 psql -U postgres resilient_mastery -c "SELECT id, title FROM lesson WHERE module_number = 2 ORDER BY \\"order\\""'''
    subprocess.run(list_cmd, shell=True)
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
