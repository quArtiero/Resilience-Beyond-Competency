-- Remove any existing lesson 22 (accounting for foreign keys)
DELETE FROM lessoncompletion WHERE lesson_id = 22;
DELETE FROM lesson WHERE id = 22;

-- Insert Lesson 3: Self-Awareness
INSERT INTO lesson (
    id, 
    slug, 
    title, 
    story, 
    reflection, 
    challenge, 
    quiz, 
    "order", 
    module_number, 
    is_published,
    created_at,
    updated_at
) VALUES (
    22,
    'self-awareness-mastery',
    'Self-Awareness: Triggers, Body Signals & Stories',
    '## The Three Lenses: See It to Steer It

Content placeholder - see full content in module2_lesson3_self_awareness.py',
    '## Personal Trigger Mapping

Content placeholder - see full content in module2_lesson3_self_awareness.py',
    '## Your Self-Awareness Lab

Content placeholder - see full content in module2_lesson3_self_awareness.py',
    '{"questions":[{"id":1,"type":"multiple_choice","text":"What''s the earliest indicator you''re about to react?","options":["The email you send","The first thought you think","A body signal (e.g., jaw/breath/chest)","The meeting outcome"],"correct":2,"explanation":"Body signals appear 30-90 seconds before conscious awareness. Your body is your early warning system."},{"id":2,"type":"multiple_choice","text":"Which is a precise emotional label?","options":["Bad","Stressed","Time-pressed and scattered","Fine"],"correct":2,"explanation":"Emotional granularity (precise labeling) reduces intensity and improves regulation by 30%."},{"id":3,"type":"multiple_choice","text":"Mind-reading (assuming what others think) is best countered by:","options":["Avoiding the person","Evidence check or asking a clarifying question","Believing your story harder","Waiting until tomorrow"],"correct":1,"explanation":"Replace assumptions with data. Either check evidence or ask directly what they''re thinking."},{"id":4,"type":"multiple_choice","text":"The Signal → Label → Choose protocol takes approximately:","options":["5 minutes","10-30 seconds","2-3 minutes","An hour of reflection"],"correct":1,"explanation":"The protocol is designed to work in real-time: Signal (0-3s) → Label (3-10s) → Choose (10-30s)."},{"id":5,"type":"multiple_choice","text":"Emotional granularity (using precise emotion words) leads to:","options":["Overthinking","30% better regulation and 25% less anxiety","Emotional suppression","Increased sensitivity"],"correct":1,"explanation":"Research shows precise labeling activates the prefrontal cortex and calms the amygdala, improving regulation."}]}',
    6,
    2,
    true,
    NOW(),
    NOW()
);

-- Verify insertion
SELECT id, title, module_number, "order" 
FROM lesson 
WHERE module_number = 2 
ORDER BY "order";
