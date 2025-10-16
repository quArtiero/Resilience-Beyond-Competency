-- Add Module 3: Cognitive Flexibility lessons (IDs 37-43)
-- Run this in the Render shell to add all missing lessons

-- Check what lessons exist
SELECT id, title, module_number, "order" FROM lesson ORDER BY "order";

-- Shift existing lessons to make room (if needed)
UPDATE lesson SET "order" = "order" + 31 WHERE "order" >= 5;

-- Add all Module 3 lessons
INSERT INTO lesson (id, slug, title, story, reflection, challenge, quiz, "order", module_number, is_published, created_at, updated_at) 
VALUES 
(37, 'lesson-1-bridge-storm', 'The Bridge in the Storm', 
'# The Bridge in the Storm

Sarah stood at the edge of a bridge during a storm, her life''s certainties shaking. This lesson explores cognitive flexibility through her journey of transformation.',
'Reflection content for Bridge in the Storm', 
'Challenge content for Bridge in the Storm',
'{"questions": [{"id": 1, "question": "What are the three levels of cognitive flexibility?", "type": "multiple_choice", "options": ["Basic, Intermediate, Advanced", "Tactical, Strategic, Identity", "Personal, Professional, Social"], "correct_answer": 1}]}',
5, 3, true, NOW(), NOW()),

(38, 'lesson-2-what-is-cognitive-flexibility', 'What Is Cognitive Flexibility?',
'# What Is Cognitive Flexibility?

The science of mental agility and how your brain adapts to change.',
'Reflection on cognitive flexibility concepts',
'Practice exercises for flexibility',
'{"questions": [{"id": 1, "question": "What are the four dimensions of cognitive flexibility?", "type": "multiple_choice", "options": ["Speed, Accuracy, Memory, Focus", "Attention Switching, Mental Set Shifting, Perspective Taking, Creative Recombination"], "correct_answer": 1}]}',
6, 3, true, NOW(), NOW()),

(39, 'lesson-3-barriers-biases', 'Barriers & Biases',
'# Barriers & Biases

Understanding what blocks our mental flexibility.',
'Reflect on your cognitive biases',
'Challenge your biases this week',
'{"questions": [{"id": 1, "question": "What is confirmation bias?", "type": "multiple_choice", "options": ["Seeking information that confirms beliefs", "Confirming appointments", "Being biased toward confirmation"], "correct_answer": 0}]}',
7, 3, true, NOW(), NOW()),

(40, 'lesson-4-tools-reframing', 'Tools for Reframing',
'# Tools for Reframing

Practical techniques to shift perspective.',
'Practice reframing exercises',
'Week-long reframing challenge',
'{"questions": [{"id": 1, "question": "What does FLIP stand for?", "type": "multiple_choice", "options": ["Focus, Label, Investigate, Pivot", "Find, Learn, Implement, Practice"], "correct_answer": 0}]}',
8, 3, true, NOW(), NOW()),

(41, 'lesson-5-flexibility-action', 'Flexibility in Action',
'# Flexibility in Action

Applying flexibility to work, relationships, and growth.',
'Assess your flexibility in different life domains',
'72-hour flexibility sprint',
'{"questions": [{"id": 1, "question": "In which domains can we apply cognitive flexibility?", "type": "multiple_choice", "options": ["Work, Relationships, Personal Growth", "Only at work", "Only in emergencies"], "correct_answer": 0}]}',
9, 3, true, NOW(), NOW()),

(42, 'lesson-6-reflection-integration', 'Reflection & Integration',
'# Reflection & Integration

Making flexibility your default operating system.',
'Deep reflection on your flexibility journey',
'Design your personal flexibility system',
'{"questions": [{"id": 1, "question": "What are the three levels of flexibility mastery?", "type": "multiple_choice", "options": ["Awareness, Application, Integration", "Beginner, Expert, Master"], "correct_answer": 0}]}',
10, 3, true, NOW(), NOW()),

(43, 'lesson-7-reframe-challenge', 'The 7-Day Reframe Challenge',
'# The 7-Day Reframe Challenge

Your capstone flexibility experience.',
'Reflect on your 7-day journey',
'Complete the 7-day reframe challenge',
'{"questions": [{"id": 1, "question": "What is the daily commitment for the challenge?", "type": "multiple_choice", "options": ["One reframe per day", "One hour of study", "One journal entry"], "correct_answer": 0}]}',
11, 3, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Verify the complete structure
SELECT module_number, COUNT(*) as lesson_count 
FROM lesson 
GROUP BY module_number 
ORDER BY module_number;

-- Show all lessons
SELECT id, title, module_number, "order" 
FROM lesson 
ORDER BY "order";
