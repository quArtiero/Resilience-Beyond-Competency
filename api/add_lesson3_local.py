#!/usr/bin/env python3
"""
Add Lesson 3 (Self-Awareness) to local Docker database.
"""

import subprocess
import json
import sys
from module2_lesson3_self_awareness import lesson3_content

def run_docker_command(cmd):
    """Run a command in the Docker database container."""
    full_cmd = f'docker exec -i resilience-beyond-competency-db-1 psql -U postgres resilient_mastery -c "{cmd}"'
    result = subprocess.run(full_cmd, shell=True, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return False
    return True

def main():
    print("Adding Lesson 3: Self-Awareness to local database...")
    
    # Escape single quotes in content
    story = lesson3_content['story'].replace("'", "''")
    reflection = lesson3_content['reflection'].replace("'", "''")
    challenge = lesson3_content['challenge'].replace("'", "''")
    quiz = lesson3_content['quiz'].replace("'", "''")
    
    # Check if lesson exists
    check_cmd = f"SELECT id FROM lesson WHERE id = {lesson3_content['id']}"
    
    # Delete if exists
    delete_cmd = f"DELETE FROM lesson WHERE id = {lesson3_content['id']}"
    
    # Insert new lesson
    insert_cmd = f"""
    INSERT INTO lesson (
        id, slug, title, story, reflection, challenge, quiz, 
        \"order\", module_number, is_published
    ) VALUES (
        {lesson3_content['id']},
        '{lesson3_content['slug']}',
        '{lesson3_content['title']}',
        '{story}',
        '{reflection}',
        '{challenge}',
        '{quiz}',
        {lesson3_content['order']},
        {lesson3_content['module_number']},
        {lesson3_content['is_published']}
    )
    """
    
    # Execute commands
    print("Removing any existing lesson...")
    run_docker_command(delete_cmd)
    
    print("Inserting new lesson content...")
    if run_docker_command(insert_cmd):
        print("✅ Lesson 3 added successfully!")
        
        # Verify
        verify_cmd = "SELECT id, title, module_number FROM lesson WHERE module_number = 2 ORDER BY \"order\""
        print("\n📚 Module 2 lessons:")
        run_docker_command(verify_cmd)
    else:
        print("❌ Failed to add lesson")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
