import asyncio
import json
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine
from app.models import Lesson

async def add_cognitive_flexibility_lessons():
    """Add the comprehensive 7-lesson structure for Module 3: Cognitive Flexibility"""
    
    async with AsyncSession(engine) as session:
        print("🔄 UPDATING MODULE 3: COGNITIVE FLEXIBILITY")
        print("=" * 60)
        
        # First, clear existing Module 3 lessons
        print("📋 Step 1: Clearing existing Module 3 placeholder...")
        
        # Try to clear lesson_completion if table exists
        try:
            await session.execute(text("""
                DELETE FROM lesson_completion 
                WHERE lesson_id IN (SELECT id FROM lesson WHERE module_number = 3)
            """))
            await session.commit()
        except Exception as e:
            print(f"  ℹ️  No lesson_completion table or no records to clear")
            await session.rollback()
        
        # Clear the lessons themselves
        await session.execute(text("DELETE FROM lesson WHERE module_number = 3"))
        await session.commit()
        print("  ✅ Cleared existing Module 3 lessons")
        
        # Lesson 1: The Bridge in the Storm (Full Content)
        lesson1_story = """# The Bridge in the Storm

## Opening Hook

A storm takes the town's only bridge in the night.

By morning, fear is a chorus: *We're cut off. We'll run out. We'll wait for rescue.*

In a noisy town hall, one person—Aline—sketches quietly.

"Maybe," she says, "we don't need a bridge right now."

The room stops.

That afternoon, fishing boats become a ferry line. Food crosses. Medicine crosses. People cross.

Weeks later, a new bridge rises—but the ferry remains. The town now has two ways forward.

**Cognitive flexibility is what happened in that silence between panic and possibility.**

It's the mind's ability to shift frames, invent alternatives, and move with reality without losing purpose.

> "Cognitive Flexibility begins the moment you ask, *What else could work?*"

## The Story (Expanded)

A wooden bridge holds a small coastal town together. Overnight, a storm snaps it apart. In the morning, supply trucks can't pass. Parents can't commute. Local leaders gather in a hall to debate engineering drawings, funding approvals, and repair timelines. Anxiety mounts.

Aline, a young engineer, listens. She recognizes a familiar pattern: the town is solving the right problem at the wrong time scale. They're treating an immediate mobility crisis as a long-horizon infrastructure project.

She flips the frame: **What if the goal today is not "rebuild" but "reconnect"?**

Within hours, she coordinates fishermen into a safe ferry route, schedules crossings, and posts a sign-up at the market. The town moves again. When the new bridge is built weeks later, the ferry remains—not as an artifact of crisis, but as a redundancy. One loss created two options.

**Key idea:** Flexibility doesn't discard long-term plans; it re-sequences them. *First, stabilize; then, optimize.*

## What Flexibility Looked Like Here

### The Mechanics of Reframing:

1. **Frame detection:** Aline noticed the group's implicit frame: "bridge or nothing."
2. **Goal relabeling:** From rebuild → reconnect.
3. **Option generation under constraint:** What is already available? (boats, people, willingness, water route)
4. **Sequencing:** Immediate continuity now; permanent solution later.
5. **Redundancy as resilience:** Keep both solutions to reduce future shock.

> **Flexibility in one sentence:** Change the frame, keep the purpose.
> Purpose was connection, not bridge. Once purpose is clear, options multiply.

## The Two Questions of Flexibility

1. **What is the purpose here—really?**
2. **Given reality as it is, what else could achieve it now?**

Everything else—creativity, empathy, speed—stems from these two moves.

## Practice: The 90-Second Reframe

### "Bridge → Purpose → Options"

Pick a situation where your usual method broke. Do three rapid steps:

1. **Name the bridge** (the method that broke)
2. **Name the purpose** (what you actually need)
3. **List 3 options** available in 90 seconds that serve the purpose

**Tip:** Don't judge quality yet. Quantity first, then pick the best for now.

## Case Study: The Campus App Launch

You're leading a student team launching a campus app this week. The dev tells you iOS build approval is delayed by 10 days. Marketing is waiting. Sponsors want proof of traction in 7 days.

Your first thought is: "We have to delay the launch."

**Pause. New frame:** "The purpose this week is evidence of traction, not App Store presence."

### Choose your path:

**Path A: Web Landing + Waitlist**
Spin up a simple landing page capturing emails and demo signups; run a 48-hour ambassador push; share heatmaps and signups with sponsors.

**Path B: TestFlight Beta**
Recruit 100 users via TestFlight links; track engagement and NPS; present usage metrics as "pre-launch traction."

**Path C: Feature Prototype + Surveys**
Publish interactive Figma prototype; run guided usability tests; capture Likert scores and quotes; present qualitative traction."""

        lesson1_reflection = """# Reflection & Journal Prompts

## Your Bridge Moment

Think of a recent "bridge moment"—a plan or support system failed. 

1. **What did you try first?**
2. **What frame were you using?** (e.g., "must restore the old plan," "must wait," "must assign blame," "must keep control.")
3. **If you switched the frame from restore to reconnect, what quick alternative would have been available?**

Write in short bullet points; you'll reuse them later.

## Cognitive Flexibility Baseline

Rate yourself 1–5 (1 = rarely, 5 = almost always):

1. When a plan fails, I can quickly think of at least two alternatives.
2. I can hold two different explanations for the same event without getting upset.
3. I change my approach when new information appears, even if it contradicts my initial plan.
4. In conflict, I can restate the other person's viewpoint better than they can.
5. I look for what's available now instead of fixating on what's missing.
6. I can pivot from "Who's at fault?" to "What's the next best move?"
7. I regularly ask, "What else could this mean?" before reacting.

### Scoring:
- **7–14:** Rigid by default → great growth headroom.
- **15–24:** Mixed flexibility → powerful returns from technique practice.
- **25–35:** Strong flexibility → focus on speed, empathy, and consistency.

Record your total in your journal; we'll revisit in Lesson 7.

## Discussion Prompt

"Describe a time you unconsciously clung to the bridge instead of the purpose. What changed once you renamed the goal? What option surprised you?"

## Exit Ticket

Write one sentence completing: "If my bridge falls this week, my purpose is ____, and my backup path is ____." """

        lesson1_challenge = """# The 90-Second Reframe Challenge

## Daily Micro-Habit

Once per day, ask "What else could work?" in any small annoyance:
- Commute delays
- Study blocks interrupted
- Messages unclear
- Workout equipment unavailable

Write the best alternative you tried.

## Practice Exercise: Bridge → Purpose → Options

1. **Identify your "bridge"** - the method/plan that broke
2. **Clarify your purpose** - what you actually need to achieve
3. **Generate 3 options in 90 seconds** - focus on quantity over quality first

### Examples:

**Bridge broke:** Usual study schedule  
**Purpose:** Retain information  
**Options:** Switch time blocks, spaced recall method, tutor swap

**Bridge broke:** Primary supplier unavailable  
**Purpose:** Receive materials  
**Options:** Secondary supplier, partial shipments, redesign with substitute

**Bridge broke:** Team member unavailable  
**Purpose:** Ship draft by Friday  
**Options:** Split the draft, async comments, template reuse

## Homework for Next Lesson

Bring to Lesson 2: One example where "What else?" produced a better outcome than your first plan.

## Remember

> **One-sentence takeaway:** Change the frame, keep the purpose.

When facing any obstacle this week, pause and ask:
1. What's the real purpose here?
2. What else could achieve it now?"""

        lesson1_quiz = {
            "questions": [
                {
                    "type": "multiple_choice",
                    "question": "Which statement best captures Aline's flexible move?",
                    "options": [
                        "She ignored the bridge problem",
                        "She reframed the immediate goal from rebuilding to reconnecting",
                        "She waited for experts to decide",
                        "She replaced the bridge with a permanent ferry only"
                    ],
                    "correct": 1,
                    "feedback": "Flexibility preserves purpose and changes method/sequence."
                },
                {
                    "type": "multiple_choice",
                    "question": "Which order reflects the 90-second reframe?",
                    "options": [
                        "Options → Purpose → Bridge",
                        "Purpose → Options → Bridge",
                        "Bridge → Purpose → Options",
                        "Bridge → Options → Purpose"
                    ],
                    "correct": 2,
                    "feedback": "Name the broken method, restate the goal, list options."
                },
                {
                    "type": "multiple_choice",
                    "question": "Which is NOT a flexibility behavior?",
                    "options": [
                        "Generating multiple pathways under constraints",
                        "Holding two interpretations at once",
                        "Doubling down on the original plan because it's familiar",
                        "Changing sequence while preserving purpose"
                    ],
                    "correct": 2,
                    "feedback": "Rigidity clings to the first plan despite new info."
                },
                {
                    "type": "multiple_choice",
                    "question": "Best example of purpose clarity?",
                    "options": [
                        "Publish on the App Store by Friday",
                        "Demonstrate real user traction this week",
                        "Convince sponsors to be patient",
                        "Ship everything at once"
                    ],
                    "correct": 1,
                    "feedback": "Purpose focuses on the outcome you actually need now."
                },
                {
                    "type": "multiple_choice",
                    "question": "After reframing, what's the next step?",
                    "options": [
                        "Evaluate options forever",
                        "Pick one workable option and execute fast",
                        "Return to the old plan",
                        "Assign blame"
                    ],
                    "correct": 1,
                    "feedback": "Flexibility is action-oriented; pick, test, learn."
                }
            ]
        }
        
        # Define all 7 lessons for Module 3
        cognitive_flexibility_lessons = [
            {
                "order": 11,
                "title": "The Bridge in the Storm",
                "slug": "lesson-11-the-bridge-in-the-storm",
                "story": lesson1_story,
                "reflection": lesson1_reflection,
                "challenge": lesson1_challenge,
                "quiz": lesson1_quiz
            },
            {
                "order": 12,
                "title": "What Is Cognitive Flexibility?",
                "slug": "lesson-12-what-is-cognitive-flexibility",
                "story": "# Coming Soon\n\nDefinitions, neuroscience, and why it's central to resilience.",
                "reflection": "Coming soon",
                "challenge": "Coming soon",
                "quiz": {"questions": []}
            },
            {
                "order": 13,
                "title": "Barriers and Biases",
                "slug": "lesson-13-barriers-and-biases",
                "story": "# Coming Soon\n\nEgo, fear, comfort bias, and how rigidity forms.",
                "reflection": "Coming soon",
                "challenge": "Coming soon",
                "quiz": {"questions": []}
            },
            {
                "order": 14,
                "title": "Tools for Reframing",
                "slug": "lesson-14-tools-for-reframing",
                "story": "# Coming Soon\n\n'What Else?', Reverse Thinking, Perspective Switching, Zoom Out/Zoom In.",
                "reflection": "Coming soon",
                "challenge": "Coming soon",
                "quiz": {"questions": []}
            },
            {
                "order": 15,
                "title": "Flexibility in Action",
                "slug": "lesson-15-flexibility-in-action",
                "story": "# Coming Soon\n\nReal-world applications (work, relationships, personal growth).",
                "reflection": "Coming soon",
                "challenge": "Coming soon",
                "quiz": {"questions": []}
            },
            {
                "order": 16,
                "title": "Reflection & Integration",
                "slug": "lesson-16-reflection-integration",
                "story": "# Coming Soon\n\nPractice prompts + quiz.",
                "reflection": "Coming soon",
                "challenge": "Coming soon",
                "quiz": {"questions": []}
            },
            {
                "order": 17,
                "title": "The 7-Day Reframe Challenge",
                "slug": "lesson-17-7-day-reframe-challenge",
                "story": "# Coming Soon\n\nMini-project applying everything learned.",
                "reflection": "Coming soon",
                "challenge": "Coming soon",
                "quiz": {"questions": []}
            }
        ]
        
        # Now we need to shift all subsequent lessons' order numbers
        print("\n📋 Step 2: Adjusting lesson order numbers for modules 4-8...")
        
        # Shift Module 4 lesson (was 12, now 18)
        await session.execute(text("""
            UPDATE lesson SET "order" = 18 
            WHERE module_number = 4 AND title LIKE '%Grit and Perseverance%'
        """))
        
        # Shift Module 5 lesson (was 13, now 19)
        await session.execute(text("""
            UPDATE lesson SET "order" = 19
            WHERE module_number = 5 AND title LIKE '%Adaptability and Agility%'
        """))
        
        # Shift Module 6 lesson (was 14, now 20)
        await session.execute(text("""
            UPDATE lesson SET "order" = 20
            WHERE module_number = 6 AND title LIKE '%Problem-Solving%'
        """))
        
        # Shift Module 7 lesson (was 15, now 21)
        await session.execute(text("""
            UPDATE lesson SET "order" = 21
            WHERE module_number = 7 AND title LIKE '%Effective Communication%'
        """))
        
        # Shift Module 8 lesson (was 16, now 22)
        await session.execute(text("""
            UPDATE lesson SET "order" = 22
            WHERE module_number = 8 AND title LIKE '%Continuous Learning%'
        """))
        
        await session.commit()
        print("  ✅ Adjusted order numbers for subsequent modules")
        
        # Add the new Module 3 lessons
        print("\n📋 Step 3: Adding 7 lessons for Cognitive Flexibility...")
        
        for lesson_data in cognitive_flexibility_lessons:
            lesson = Lesson(
                slug=lesson_data["slug"],
                title=lesson_data["title"],
                story=lesson_data["story"],
                reflection=lesson_data["reflection"],
                challenge=lesson_data["challenge"],
                quiz=json.dumps(lesson_data["quiz"]),
                order=lesson_data["order"],
                module_number=3,
                is_published=True,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            session.add(lesson)
            print(f"  ✅ Added Lesson {lesson_data['order']}: {lesson_data['title']}")
        
        await session.commit()
        
        # Verify the structure
        print("\n" + "=" * 60)
        print("📊 VERIFICATION - Module 3 Structure:")
        print("=" * 60)
        
        result = await session.execute(text("""
            SELECT "order", title
            FROM lesson
            WHERE module_number = 3
            ORDER BY "order"
        """))
        
        print("\n🔄 Module 3: Cognitive Flexibility — Reframing the Mind")
        for order, title in result.fetchall():
            status = "✅ Full Content" if order == 11 else "📝 Placeholder"
            print(f"  Lesson {order}: {title} [{status}]")
        
        # Check total lessons
        result = await session.execute(text("SELECT COUNT(*) FROM lesson"))
        total = result.scalar()
        print(f"\n📊 Total lessons in database: {total}")
        
        print("\n🎉 Successfully added Cognitive Flexibility module with 7 lessons!")
        print("   Lesson 1 'The Bridge in the Storm' has full content")
        print("   Lessons 2-7 are ready for content updates")

if __name__ == "__main__":
    asyncio.run(add_cognitive_flexibility_lessons())
