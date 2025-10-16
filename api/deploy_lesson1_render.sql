-- Deploy Lesson 1 (The Red Line Meeting) to Render PostgreSQL
-- Run this in the Render PostgreSQL console

-- First, check what we have for lesson 20
SELECT id, title, module_number, "order", LENGTH(story) as story_len 
FROM lesson 
WHERE id = 20;

-- Create temporary files for content (you'll need to upload these via psql)
-- Or update directly with the content

-- Note: Due to size limitations, you should:
-- 1. Connect to Render PostgreSQL using psql from your local machine
-- 2. Run the update with the full content from module2_lesson1_redline.py

-- For now, let's update the metadata
UPDATE lesson 
SET 
    title = 'The Red Line Meeting',
    slug = 'emotional-intelligence-red-line-meeting'
WHERE id = 20;

-- Verify the update
SELECT id, title, slug 
FROM lesson 
WHERE id = 20;
