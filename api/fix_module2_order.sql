-- Check current Module 2 lesson ordering
SELECT id, title, "order" 
FROM lesson 
WHERE module_number = 2 
ORDER BY "order";

-- Fix the ordering for Module 2 lessons
-- Assuming Module 1 has 2 lessons (orders 1-2), Module 2 should start at order 3
UPDATE lesson SET "order" = 3 WHERE id = 20;  -- The Red Line Meeting (1st in Module 2)
UPDATE lesson SET "order" = 4 WHERE id = 21;  -- EI Foundations (2nd in Module 2)
UPDATE lesson SET "order" = 5 WHERE id = 22;  -- Self-Awareness (3rd in Module 2)
UPDATE lesson SET "order" = 6 WHERE id = 23;  -- Self-Regulation (4th in Module 2)

-- Verify the fix
SELECT id, title, "order" 
FROM lesson 
WHERE module_number = 2 
ORDER BY "order";
