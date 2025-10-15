import asyncio
import json
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine

async def update_lesson2_cognitive():
    """Update Lesson 2: What Is Cognitive Flexibility? with full content"""
    
    async with AsyncSession(engine) as session:
        print("📚 UPDATING LESSON 2: WHAT IS COGNITIVE FLEXIBILITY?")
        print("=" * 60)
        
        # Lesson 2 Story Content
        lesson2_story = """# What Is Cognitive Flexibility?

## Quick Bridge from Lesson 1

In Lesson 1, Aline's insight was to keep the purpose but change the method.

Today we unpack the mechanics behind that move. What is cognitive flexibility—really? How does it work in the brain? And how do we train it deliberately?

## Precise Definition

**Cognitive flexibility** is the ability to adapt how you think—to shift frames, rules, or strategies when the situation changes—while staying anchored to a clear purpose.

### In practice, it shows up as:

- **Set-shifting:** switching between tasks, rules, or mental models.
- **Perspective-taking:** holding multiple viewpoints without becoming defensive.
- **Option generation:** producing alternate pathways under constraints.
- **Sequencing:** changing the order (stabilize → optimize) without losing the outcome.

### Not the same as:

- **Multitasking:** doing many things at once (often lower quality).
- **Agreeableness:** saying yes to everything.
- **Randomness:** changing for the sake of novelty.
- **Indecision:** delaying choices forever.

> **One-liner:** Cognitive flexibility = change the frame; keep the purpose; move with reality.

## Why It Matters

### Key Benefits:

1. **Performance under pressure:** Flexible people pivot early, prevent spirals, and preserve momentum.
2. **Learning speed:** They update beliefs with new evidence ("I was wrong; that's useful").
3. **Innovation:** Constraints become prompts, not prisons.
4. **Relationships:** Flexibility softens conflict; you can argue the other side fairly.
5. **Resilience:** You bounce forward—not just back—because each change adds a tool.

### Micro-example:
- **Plan:** run outdoors; it rains.
- **Rigid reaction:** "Workout ruined."
- **Flexible sequence:** Purpose = train cardio. Options: stair intervals, jump-rope, bodyweight circuits. You train anyway—goal preserved.

## The (Simplified) Neuroscience

*This is a learner-friendly sketch, not a medical text.*

### Brain Systems Involved:

1. **Prefrontal Cortex (PFC):** plans, holds goals, and switches strategies when the context changes.

2. **Anterior Cingulate Cortex (ACC):** detects conflict ("old rule vs. new rule") and cues adjustment.

3. **Basal Ganglia / Striatal loops:** help shift between "habit mode" and "explore/adjust" mode.

4. **Neuroplasticity:** repeated practice of reframing and switching strengthens these circuits. Flexibility is trainable.

> **Takeaway:** Your brain isn't a fixed gearbox; it's a transmission you can learn to shift smoothly.

## Four Pillars of Flexibility (Core Model)

Use these pillars to label what you're practicing in later lessons:

### 1. Frame Awareness
- Spot the current frame (the assumption/method you're using).
- Ask: What is the purpose behind this frame?

### 2. Set-Shifting
- Change the rule or strategy when the situation changes.
- Example: from "optimize speed" → "prioritize safety."

### 3. Perspective-Taking
- See the problem through another lens (customer, critic, mentor, beginner).
- Empathy fuels better options.

### 4. Option Laddering
- Generate at least three viable paths; pick one to test now; keep a backup.

**Glue concept:** **Sequencing**—stabilize first, then optimize. (Aline: ferry now, bridge later.)

## Common Misconceptions

**Myth:** "Flexible = flaky."  
**Reality:** Flexible people are purpose-anchored; they adjust methods, not values.

**Myth:** "Flexibility is talent."  
**Reality:** It's a trainable skill set: label → shift → test → learn.

**Myth:** "Flexibility = constant change."  
**Reality:** Change only when reality or purpose demands it.

## Quick Glossary

- **Frame:** the lens/method you're currently using.
- **Purpose:** the underlying outcome you're trying to achieve.
- **Set-Shifting:** changing rules/strategies when context changes.
- **Perspective-Taking:** deliberately viewing the problem from other roles.
- **Option Ladder:** generating multiple pathways and picking one to test now.
- **Sequencing:** stabilizing first; optimizing later."""

        lesson2_reflection = """# Drills & Practice

## Drill 1: Frame-Spotting (7–10 minutes)

**Goal:** Train Frame Awareness by separating method (bridge) from purpose (reconnect).

**Instructions:** Read each statement. Write:
1. The assumed method
2. The true purpose
3. Two alternative methods that preserve the purpose

### Statements to Analyze:

1. "We have to meet in person to make this decision."
2. "The launch must be on Friday or it's a failure."
3. "If we can't afford a full data platform, we can't personalize."
4. "I need absolute quiet to study effectively."
5. "Without that teammate, this project can't move."

### Example (for #1):
- **Method:** in-person meeting.
- **Purpose:** high-quality decision with shared context.
- **Alternatives:** async memo + annotated comments; 20-min video huddle with decision brief.

**Timer suggestion:** 8:00 minutes total.

### Debrief (journal, 3 bullets):
- Which items were hardest to reframe? Why?
- Did you notice a pattern in your default methods?
- Which alternative felt surprisingly workable?

## Drill 2: Switching Muscle (5–8 minutes)

**Goal:** Practice Set-Shifting quickly and cleanly.

Pick one of the two mini-drills below:

### A) Alphabet-Number Switch (2–3 minutes)
Write: A-1-B-2-C-3 … up to M-13 (or as far as you can in 2 minutes) without errors.
- If you stumble, pause, breathe, resume slowly.
- Notice: the feel of switching is effortful at first—then it smooths.

### B) Constraint Creativity — 5 Uses (3–5 minutes)
- Choose an everyday object (paperclip, rubber band, receipt).
- In 3 minutes, list 5 uses beyond the obvious.
- Round 2 (optional): impose a constraint (e.g., "only outdoors") and generate 3 more.

This trains option generation under rules changes.

### Reflection (2 bullets):
- What improved when you slowed down 10%?
- Which cue helped (saying the rule aloud, chunking, visualizing)?

## Mini Cases: Flexible vs. Rigid (8–10 minutes)

### Case 1: Supplier Shortage
**Rigid:** "We wait; production stops."  
**Flexible:** Purpose = fulfill core orders. Options: partial runs; prioritize top SKUs; temporary material substitutes approved by QA; communicate revised lead times transparently.

### Case 2: Team Conflict
**Rigid:** "Convince them I'm right."  
**Flexible:** Purpose = align on criteria. Options: define decision rubric; run a time-boxed A/B test; agree on a reversal condition if data disagrees.

### Case 3: Exam Prep
**Rigid:** "I must reread the chapter."  
**Flexible:** Purpose = recall under pressure. Options: spaced retrieval, practice problems first, teach-back in a 3-minute voice memo.

**Prompt:** Pick one case you've lived. Write the rigid script you used, then rewrite a flexible script using the four pillars (Frame → Shift → Perspective → Options).

## Exit Ticket (journal, 2 minutes)

Complete:

1. "My most common frame is ________, and the purpose behind it is ________."

2. "A new option ladder I can try this week: 1) ___ 2) ___ 3) ___." """

        lesson2_challenge = """# Daily Practice & Homework

## Daily Micro-Rep (3–5 minutes)

Do the Alphabet-Number or 5 Uses drill once a day for 5 days. Record what changes:
- Speed improvements
- Calmness level
- Option count increases

### Option A: Alphabet-Number Switch
- Day 1: Baseline time to M-13
- Day 2-3: Focus on smoothness over speed
- Day 4-5: Push for speed while maintaining accuracy

### Option B: 5 Uses Challenge
- Day 1: Common object (paperclip)
- Day 2: Kitchen item (spatula)
- Day 3: Office supply (post-it note)
- Day 4: Personal item (shoelace)
- Day 5: Random object you spot

## Homework for Lesson 3

**Bring to Lesson 3 (Barriers & Biases):** One situation where you noticed your frame and chose to shift it (even just once).

Document:
- The original frame you were using
- The moment you noticed it
- The new frame you tried
- What happened as a result

## Practice Reminders

1. **Frame Awareness:** Throughout your day, pause and ask: "What frame am I using right now?"

2. **Purpose Check:** Before reacting to obstacles, ask: "What's the real purpose here?"

3. **Option Generation:** When stuck, force yourself to list 3 alternatives before choosing.

## Bonus Challenge

**The Perspective Flip:** Once this week, in a disagreement:
1. State the other person's position better than they can
2. Find one valid point in their view
3. Suggest a third option neither of you considered

Record what shifts in the conversation."""

        lesson2_quiz = {
            "questions": [
                {
                    "type": "multiple_choice",
                    "question": "Which is the best definition of cognitive flexibility?",
                    "options": [
                        "Doing many tasks at once",
                        "Willingness to agree with others",
                        "Adapting thinking/rules to changing context while staying purpose-anchored",
                        "Starting over every time plans change"
                    ],
                    "correct": 2,
                    "feedback": "Flexibility preserves purpose and adapts method/sequence."
                },
                {
                    "type": "multiple_choice",
                    "question": "Which element belongs to cognitive flexibility?",
                    "options": [
                        "Set-shifting",
                        "Rumination",
                        "Perfectionism",
                        "Blame assignment"
                    ],
                    "correct": 0,
                    "feedback": "Set-shifting is a core component; the others inhibit flexibility."
                },
                {
                    "type": "multiple_choice",
                    "question": "Identify the frame vs. purpose: 'We must present in PowerPoint.'",
                    "options": [
                        "Frame = presenting; Purpose = share a story",
                        "Frame = PowerPoint; Purpose = communicate clearly and persuasively",
                        "Frame = communication; Purpose = slides",
                        "Frame = slides; Purpose = design"
                    ],
                    "correct": 1,
                    "feedback": "The tool is the frame; clarity/persuasion is the purpose."
                },
                {
                    "type": "multiple_choice",
                    "question": "Which practice most directly trains set-shifting?",
                    "options": [
                        "Memorizing longer lists",
                        "Alphabet-Number switching",
                        "Reading inspirational quotes",
                        "Extending meeting length"
                    ],
                    "correct": 1,
                    "feedback": "Alternating rules under time pressure builds switching ability."
                },
                {
                    "type": "multiple_choice",
                    "question": "Best example of sequencing for resilience:",
                    "options": [
                        "Delay action until you can do it perfectly",
                        "Stabilize with a quick workaround, then optimize later",
                        "Change everything at once",
                        "Ignore constraints to maintain momentum"
                    ],
                    "correct": 1,
                    "feedback": "\"Stabilize now; optimize later\" preserves outcomes under stress."
                }
            ]
        }
        
        # Update the lesson
        print("📝 Updating Lesson 12 content...")
        
        result = await session.execute(text("""
            UPDATE lesson 
            SET story = :story,
                reflection = :reflection,
                challenge = :challenge,
                quiz = :quiz,
                updated_at = :updated_at
            WHERE module_number = 3 AND "order" = 12
            RETURNING id, title
        """), {
            "story": lesson2_story,
            "reflection": lesson2_reflection,
            "challenge": lesson2_challenge,
            "quiz": json.dumps(lesson2_quiz),
            "updated_at": datetime.utcnow()
        })
        
        lesson = result.fetchone()
        if lesson:
            print(f"  ✅ Updated Lesson {lesson[0]}: {lesson[1]}")
        else:
            print("  ❌ Lesson not found")
            
        await session.commit()
        
        # Verify the update
        print("\n📊 Verification:")
        result = await session.execute(text("""
            SELECT "order", title, 
                   LENGTH(story) as story_len,
                   LENGTH(reflection) as refl_len,
                   LENGTH(challenge) as chal_len
            FROM lesson 
            WHERE module_number = 3
            ORDER BY "order"
        """))
        
        print("\nModule 3: Cognitive Flexibility — Lesson Status:")
        for order, title, story_len, refl_len, chal_len in result.fetchall():
            if story_len > 100:
                status = "✅ Full Content"
            else:
                status = "📝 Placeholder"
            print(f"  Lesson {order}: {title}")
            print(f"    Content sizes: Story={story_len}, Reflection={refl_len}, Challenge={chal_len}")
            print(f"    Status: {status}")
        
        print("\n🎉 Successfully updated Lesson 2: What Is Cognitive Flexibility!")

if __name__ == "__main__":
    asyncio.run(update_lesson2_cognitive())
