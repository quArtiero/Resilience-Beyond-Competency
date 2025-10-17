#!/usr/bin/env python3
"""
Script to deploy Lesson 2 (EI Foundations & Baseline) to Render production database.
Run this in the Render API shell.
"""

import asyncio
import json
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy import select, delete
from sqlmodel import Session
import sys
import os

# Add parent directory to path to import models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.models import Lesson
from app.deps import get_session, DATABASE_URL

# Get the lesson content
lesson2_content = {
    "story": """## The Building Blocks: Your EI Operating System

*"Most people don't know their emotional patterns until it's too late. Today, we build your early warning system."*

### The Science Behind the 5 Pillars

Emotional Intelligence isn't one skill — it's five interconnected systems working together. Think of it like a high-performance engine: each component needs the others to function optimally.

**Research shows:** People with high EI earn 29% more on average, but here's what matters more — they report 23% less stress and 19% higher life satisfaction (Bradberry & Greaves, 2020).

### The 5 Pillars Explained

#### 1. Self-Awareness: Your Internal Radar
The ability to recognize emotions as they arise, not after they've hijacked you.

**The 90-Second Rule**: Emotions are chemical events that last 90 seconds in your body. After that, you're choosing to continue the story.

**Key Indicators**:
- You can name emotions beyond "good" or "bad"
- You notice physical sensations before emotional overwhelm
- You can predict your triggers with 80% accuracy

#### 2. Self-Regulation: Your Response Choice
The space between stimulus and response where your power lives.

**The STOP Protocol**:
- **S**top: Pause all action
- **T**ake a breath: Reset your nervous system
- **O**bserve: Name what's happening
- **P**roceed: Choose your response

**Why it works**: Your prefrontal cortex needs 6 seconds to override your amygdala. STOP gives you 10.

#### 3. Motivation: Your North Star
Internal drive that survives external pressure.

**The Values-Action Bridge**:
- Values without action = frustration
- Action without values = burnout
- Aligned action = sustained energy

**Micro-Metrics That Matter**:
- Energy after tasks (drain vs. gain)
- Sunday night feeling (dread vs. anticipation)
- Recovery time from setbacks

#### 4. Empathy: Your Connection Codec
Reading the room isn't about being nice — it's about being accurate.

**The 3 Levels**:
1. **Cognitive**: "I understand your logic"
2. **Emotional**: "I feel your feeling"
3. **Compassionate**: "I want to help"

**The Listen-Reflect-Label (LRL) Technique**:
- Listen for the emotion under the words
- Reflect back what you heard
- Label the emotion tentatively: "Sounds like you're..."

#### 5. Social Skills: Your Influence Amplifier
Emotional intelligence in action — managing relationships, not just emotions.

**The 5 Essential Moves**:
1. Clear requests with deadlines
2. Specific feedback using SBI (Situation-Behavior-Impact)
3. Repair after conflict
4. Boundary setting with alternatives
5. Influence through questions, not statements

### Your EI Baseline: Where Are You Now?

Before building, we measure. Not to judge, but to know where to focus.

**The Assessment Design**:
- 28 behavioral indicators across 5 pillars
- Focus on observable actions, not intentions
- Creates your personalized growth map

**What Your Score Means**:
- **<70**: Foundation Phase — Build awareness first
- **70-100**: Developing — Ready for advanced tools
- **100+**: Strong — Focus on consistency under pressure

### The Integration Secret

Here's what most EI training misses: **You don't need to master all five pillars**. You need one strong pillar that activates the others.

**The Cascade Effect**:
- Strong self-awareness → Better regulation
- Strong regulation → Clearer empathy
- Strong empathy → Better social skills
- Strong social skills → Higher motivation
- Strong motivation → Deeper awareness

Choose your entry point based on your lowest score, not your highest interest.

### The Neuroscience of Change

Your brain creates new neural pathways in 21 days, but only with:
1. **Daily practice** (minimum 5 minutes)
2. **Specific behavior** (not general intention)
3. **Immediate measurement** (same-day tracking)

That's why each lesson includes micro-practices — small enough to do daily, specific enough to measure, powerful enough to compound.

### Your Personal Laboratory

Think of the next week as your EI laboratory:
- **Hypothesis**: "If I practice X, then Y will improve"
- **Experiment**: One behavior, tracked daily
- **Data**: Simple metrics you can capture in 10 seconds
- **Analysis**: Weekly review of patterns

This isn't self-help — it's self-science.

### The Compounding Effect

Small improvements in EI create dramatic results because emotions are contagious:
- **You regulate better** → Team stays calmer
- **Team stays calmer** → Better decisions made
- **Better decisions** → Less crisis management
- **Less crisis** → More time for strategic work
- **Strategic work** → Higher impact results

One person's EI improvement can shift an entire team's performance.

### Setting Your Baseline

The assessment you're about to take isn't a test — it's a map. Answer based on your typical behavior under moderate stress, not your best day or worst day.

**Remember**: Lower scores indicate opportunity, not inadequacy. The people who grow fastest are those who start with clear awareness of their gaps.

### The Path Forward

After your baseline:
1. **Identify** your lowest pillar
2. **Select** one specific behavior to practice
3. **Track** daily with a simple metric
4. **Review** weekly for patterns
5. **Adjust** based on what works

This is how mastery builds — not through perfection, but through iteration.

*Ready to discover your EI baseline? Your assessment awaits in the Reflection section.*""",
    
    "reflection": """## Your EI Baseline Assessment

Take 10 minutes to establish your starting point across all five EI pillars.

<baseline-assessment>

## Reflection: Processing Your Results

Now that you have your baseline, let's deepen your understanding:

### Emotion Vocabulary Expansion

Most people use only 3-7 emotion words regularly. Precision in naming emotions is the foundation of regulation.

<emotion-granularity>

### Values Mapping Exercise

Connect your daily actions to what matters most:

<values-map>

### Integration Questions

**Pattern Recognition**:
- Which pillar score surprised you most? Why?
- When do you typically see your lowest pillar fail?
- What situations bring out your highest pillar?

**Connection Mapping**:
- How does your lowest pillar affect your work?
- Which relationships would improve if this pillar strengthened?
- What opportunities have you missed due to this gap?

**Commitment Clarity**:
- What's one specific behavior you'll practice this week?
- How will you measure improvement (observable metric)?
- Who will you share your commitment with for accountability?

### The Week Ahead

For the next 7 days, practice these daily minimums:
1. **Morning**: Name your emotional state in 3+ words
2. **Afternoon**: Use STOP protocol once
3. **Evening**: Log your lowest pillar moment

This creates the data for next week's deep dive into stress response tools.

Remember: Awareness without action is just interesting information. Pick one thing. Start today.""",
    
    "challenge": """## Your EI Operating System: Building the Compass

### Creating Your Personal EI Compass
*15-20 minutes to build your guide*

This becomes your one-page operating system for emotional intelligence. Keep it visible — it's your quick reference under pressure.

<ei-compass>

## Practice Drills: Choose Your Training

Select TWO drills based on your lowest pillars from your baseline assessment.

### Your 7-Day Practice Plan

Based on your assessment and chosen drills:

**Daily Minimums** (5-10 minutes total):
- **STOP Log**: Use STOP once, log the situation and outcome
- **Values Metric**: Track your 3 micro-metrics from the Values Map
- **Pillar Practice**: One drill targeting your lowest pillar

**Weekly Review** (10 minutes on Day 7):
- Count total STOP uses
- Calculate average stress reduction (pre → post)
- Note one situation where EI changed the outcome
- Identify next week's focus based on what you learned

### The Accountability Framework

Share your commitment: Text someone these three things:
1. Your lowest pillar score
2. The one behavior you're practicing
3. Your daily tracking metric

Their only job: Ask you once on Day 4: "How's your [behavior] practice going?"

That's it. Simple accountability doubles follow-through.

### Red Flag Moments to Practice

Look for these situations to apply your EI tools:
- Email that makes you angry → STOP before responding
- Meeting where you're interrupted → Use LRL
- Deadline pressure → Run 90-second reset
- Criticism received → Name feeling, identify need
- Conflict arising → Propose micro-test with metric

### Progress Markers

You'll know you're improving when:
- Response gap increases (pause before reacting)
- Recovery time decreases (return to baseline faster)  
- Precision increases (more specific than "fine" or "stressed")
- Options expand (see multiple responses, not just one)
- Influence grows (others calm in your presence)

### The Integration Challenge

This week's mission: Use your lowest pillar skill once per day in a real situation.

- **Monday**: Notice it's missing
- **Tuesday**: Attempt it awkwardly
- **Wednesday**: Refine based on yesterday
- **Thursday**: Try in a harder situation
- **Friday**: Combine with another tool
- **Weekend**: Reflect and adjust

### Exit Commitment

Complete these statements:
1. "My lowest pillar is _______ with a score of __/30."
2. "The specific behavior I'm practicing is _______, measured by _______."
3. "I'll know I'm improving when _______."
4. "My accountability partner is _______ and they'll check on _______."

### Homework for Next Lesson

Bring to Lesson 3:
- Your completed STOP logs (minimum 3)
- Your lowest pillar and one real trigger you faced
- One question about applying EI when you're already overwhelmed

**Bonus challenge**: Teach someone the difference between two of the five pillars. Teaching consolidates learning.

---

*You now have your baseline, your compass, and your practice plan. The only thing left? Execute.*

Next lesson: We'll build your complete stress response toolkit for when everything hits at once.""",
    
    "quiz": json.dumps({
        "questions": [
            {
                "id": 1,
                "type": "multiple_choice",
                "text": "According to the 90-Second Rule, how long do emotions last as chemical events in your body?",
                "options": [
                    "30 seconds",
                    "90 seconds",
                    "5 minutes",
                    "Until you process them"
                ],
                "correct": 1,
                "explanation": "Emotions are chemical events that last 90 seconds in your body. After that, you're choosing to continue the story by re-triggering the emotion through thought."
            },
            {
                "id": 2,
                "type": "multiple_choice",
                "text": "What does the 'O' stand for in the STOP protocol?",
                "options": [
                    "Organize your thoughts",
                    "Open your mind",
                    "Observe: Name what's happening",
                    "Overcome the emotion"
                ],
                "correct": 2,
                "explanation": "The 'O' stands for 'Observe: Name what's happening.' This step involves consciously identifying and labeling your emotional state and the situation."
            },
            {
                "id": 3,
                "type": "multiple_choice",
                "text": "Which EI pillar involves the Listen-Reflect-Label (LRL) technique?",
                "options": [
                    "Self-Awareness",
                    "Self-Regulation",
                    "Motivation",
                    "Empathy"
                ],
                "correct": 3,
                "explanation": "The Listen-Reflect-Label technique is a key tool for developing Empathy. It helps you accurately understand and acknowledge others' emotions."
            },
            {
                "id": 4,
                "type": "multiple_choice",
                "text": "What is the 'Cascade Effect' in EI development?",
                "options": [
                    "Emotions spreading from person to person",
                    "One strong pillar activating improvements in others",
                    "Stress accumulating over time",
                    "Skills declining without practice"
                ],
                "correct": 1,
                "explanation": "The Cascade Effect means strengthening one EI pillar naturally activates improvements in the others. For example, better self-awareness leads to better regulation, which enables clearer empathy."
            },
            {
                "id": 5,
                "type": "multiple_choice",
                "text": "How many seconds does your prefrontal cortex need to override your amygdala?",
                "options": [
                    "3 seconds",
                    "6 seconds",
                    "10 seconds",
                    "15 seconds"
                ],
                "correct": 1,
                "explanation": "Your prefrontal cortex needs 6 seconds to override your amygdala's emotional response. The STOP protocol gives you 10 seconds, ensuring you have enough time for conscious choice."
            }
        ]
    })
}

async def main():
    """Deploy Lesson 2 to Render production database."""
    print("Connecting to database...")
    
    # Create async engine
    engine = create_async_engine(DATABASE_URL)
    
    async with AsyncSession(engine) as session:
        try:
            # First, check if lesson already exists
            result = await session.execute(
                select(Lesson).where(Lesson.id == 21)
            )
            existing_lesson = result.scalar_one_or_none()
            
            if existing_lesson:
                print(f"Updating existing Lesson 21: {existing_lesson.title}")
                # Update existing lesson
                existing_lesson.title = "EI Foundations & Baseline"
                existing_lesson.description = "Establish your EI baseline across all five pillars and build your personal operating system"
                existing_lesson.module_number = 2
                existing_lesson.order = 5
                existing_lesson.is_published = True
                existing_lesson.story = lesson2_content["story"]
                existing_lesson.reflection = lesson2_content["reflection"]
                existing_lesson.challenge = lesson2_content["challenge"]
                existing_lesson.quiz = lesson2_content["quiz"]
                existing_lesson.updated_at = datetime.utcnow()
            else:
                print("Creating new Lesson 21: EI Foundations & Baseline")
                # Create new lesson
                new_lesson = Lesson(
                    id=21,
                    title="EI Foundations & Baseline",
                    description="Establish your EI baseline across all five pillars and build your personal operating system",
                    module_number=2,
                    order=5,
                    is_published=True,
                    story=lesson2_content["story"],
                    reflection=lesson2_content["reflection"],
                    challenge=lesson2_content["challenge"],
                    quiz=lesson2_content["quiz"]
                )
                session.add(new_lesson)
            
            await session.commit()
            print("✅ Lesson 2 deployed successfully!")
            
            # Now clean up placeholder lessons in Module 2
            print("\nCleaning up Module 2 placeholder lessons...")
            
            # Get all Module 2 lessons
            result = await session.execute(
                select(Lesson).where(Lesson.module_number == 2)
            )
            module2_lessons = result.scalars().all()
            
            print(f"Found {len(module2_lessons)} lessons in Module 2:")
            for lesson in module2_lessons:
                print(f"  - ID {lesson.id}: {lesson.title}")
            
            # Keep only lessons 20 and 21, remove others
            placeholder_ids = [l.id for l in module2_lessons if l.id not in [20, 21]]
            
            if placeholder_ids:
                print(f"\nRemoving placeholder lessons: {placeholder_ids}")
                await session.execute(
                    delete(Lesson).where(Lesson.id.in_(placeholder_ids))
                )
                await session.commit()
                print(f"✅ Removed {len(placeholder_ids)} placeholder lessons")
            else:
                print("✅ No placeholder lessons to remove")
            
            # Verify final state
            result = await session.execute(
                select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
            )
            final_lessons = result.scalars().all()
            
            print("\n✅ Module 2 now contains:")
            for lesson in final_lessons:
                print(f"  - Lesson {lesson.order - 3}: {lesson.title}")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            import traceback
            traceback.print_exc()
            await session.rollback()
            raise

if __name__ == "__main__":
    asyncio.run(main())
