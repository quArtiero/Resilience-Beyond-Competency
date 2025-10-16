-- Update Lesson 20 with The Red Line Meeting interactive content
UPDATE lesson 
SET 
    title = 'The Red Line Meeting',
    slug = 'emotional-intelligence-red-line-meeting',
    story = pg_read_file('/tmp/lesson20_story.txt'),
    reflection = pg_read_file('/tmp/lesson20_reflection.txt'),
    challenge = pg_read_file('/tmp/lesson20_challenge.txt'),
    quiz = pg_read_file('/tmp/lesson20_quiz.json')::jsonb::text
WHERE id = 20;

-- Verify the update
SELECT id, title, 
       LENGTH(story) as story_length,
       LENGTH(reflection) as reflection_length,
       LENGTH(challenge) as challenge_length,
       CASE 
         WHEN quiz IS NOT NULL AND quiz != '' THEN 'Has Quiz'
         ELSE 'No Quiz'
       END as quiz_status
FROM lesson 
WHERE id = 20;
