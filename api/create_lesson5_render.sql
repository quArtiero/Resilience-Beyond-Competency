-- Quick script to create Lesson 5 if it doesn't exist
-- Run in Render psql shell

-- Check if exists
SELECT id, title, module_number, "order" FROM lesson WHERE id = 24;

-- If it doesn't exist, create it
INSERT INTO lesson (
    id, 
    title, 
    slug, 
    module_number, 
    "order",
    story,
    reflection, 
    challenge,
    quiz,
    is_published,
    created_at,
    updated_at
) 
SELECT 
    24,
    'Empathy: Read, Reflect, Relate',
    'empathy-read-reflect-relate',
    2,
    8,
    'See full content in deployment script',
    '<lrl-drill>

### 3 Hats + Needs Mapping

<three-hats-drill>

### Async Empathy Rewriter

<async-empathy-drill>

### 30-Second EAR Practice

<ear-practice>',
    '<empathy-case-simulator>

### Build Your Personal Empathy Protocol

<empathy-protocol-builder>

### 7-Day Empathy Tracker

<empathy-tracker>',
    '{"questions":[{"id":1,"type":"multiple_choice","text":"Empathy in this course is best defined as...","options":["Agreeing to keep peace","Accurately reflecting the other person''s view/need in a way they recognize","Giving fast advice","Avoiding boundaries"],"correct":1}]}',
    true,
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM lesson WHERE id = 24
);

-- Verify it was created/exists
SELECT id, title, module_number, "order", is_published FROM lesson WHERE id = 24;
