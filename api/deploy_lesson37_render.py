"""
Deploy Lesson 37 (The Bridge in the Storm) to Render with interactive components
"""

import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os
import json

async def deploy_lesson37():
    # Full lesson content with interactive components
    story_content = """# The Bridge in the Storm

## Opening Hook

A storm takes the town's only bridge in the night.

By morning, fear is a chorus: *We're cut off. We'll run out. We'll wait for rescue.*

In a noisy town hall, 100 people shout over each other.

An 8-year-old girl raises her hand: "Can't we build a raft?"

The room goes quiet. The 'disaster' cracks. The real work begins.

---

## 📖 Core Narrative

### The Setup

Sarah Martinez had led her software team for three years. They'd survived market shifts, budget cuts, and a pandemic. But nothing prepared her for the Monday morning when their biggest client—60% of revenue—announced they were switching vendors in 30 days.

The conference room erupted:
- "We're finished!"
- "I knew we should have diversified!"
- "Who's updating their resume first?"

Sarah felt the same panic. Her mortgage payment flashed through her mind. Her daughter's college fund. The team she'd promised stability.

But then she remembered something her mentor once said: *"When everyone's looking at the closed door, find the window."*

### The Shift

Sarah stood up. "Okay, we lost our bridge. What are our rafts?"

Confused silence.

"The client is leaving. That's the storm, and it took our bridge. But we're not on an island. We have 30 days, skills, other contacts, and half-finished products. What can we build?"

Mark, the pessimist: "You can't replace 60% of revenue in—"

"Not trying to," Sarah interrupted. "I'm trying to find the 10% we can secure this week. Then another 10% next week. Let's stop staring at the bridge underwater and start building rafts."

### The Reframe Process

Over the next 2 hours, the team shifted from mourning to mapping:

1. **From "We lost everything" → "We have 40% stable revenue"**
2. **From "30 days to doom" → "30 days to pivot"**
3. **From "The client betrayed us" → "The client taught us about concentration risk"**
4. **From "We're victims" → "We're free to pursue delayed opportunities"**

### The Actions

By noon, they had:
- Listed 5 warm leads they'd ignored while servicing the big client
- Identified 2 products they could launch in 2 weeks
- Found 3 team members excited to finally try new approaches
- Calculated they needed just 35% new revenue to break even (not 60%)

### The Outcome

**Week 1:** Secured 12% new revenue from existing client expansion
**Week 2:** Launched micro-product, adding 8% recurring revenue
**Week 3:** Signed 2 of the 5 warm leads for 15% combined
**Week 4:** The departing client, impressed by their pivot, offered a 6-month extension for critical services

**Total:** 41% new/extended revenue, plus valuable diversification

But the real transformation? The team now had a protocol:
- When crisis hits, spend maximum 10 minutes on impact acknowledgment
- Immediately shift to "What can we control?"
- List assets, not just losses
- Find the smallest viable next step
- Build momentum, not perfect solutions

### The Twist

Six months later, Sarah got a call. The big client wanted them back—their new vendor had failed. 

The team voted: Take them as one of many clients, never again as the only bridge.

---

## 🎯 Key Patterns in Cognitive Flexibility

What Sarah demonstrated wasn't toxic positivity or denial. It was **cognitive flexibility**: the ability to shift mental frames when circumstances change.

### The Three Core Skills:

1. **Cognitive Shifting**
   - Moving between problem and solution focus
   - Switching from loss to opportunity framing
   - Changing time horizons (crisis → growth)

2. **Cognitive Inhibition**
   - Stopping the catastrophic thinking spiral
   - Suppressing the urge for immediate (poor) decisions
   - Blocking out unhelpful voices to think clearly

3. **Working Memory Updating**
   - Replacing outdated assumptions ("we need this client")
   - Incorporating new information rapidly
   - Holding multiple scenarios simultaneously

### Why Most People Stay Rigid:

- **Amygdala Hijack**: Fear locks us into one perspective
- **Confirmation Bias**: We see only evidence supporting our panic
- **Social Contagion**: Group panic reinforces rigid thinking
- **Identity Protection**: Admitting we can adapt feels like admitting we were wrong

### The Flexibility Formula:

**STOP** → **SHIFT** → **SELECT** → **START**

1. **STOP** the automatic response
2. **SHIFT** to at least 2 other perspectives
3. **SELECT** the most useful frame for action
4. **START** with the smallest viable step

---

## 🧪 Interactive Element

### Your Flexibility Self-Assessment

Rate yourself on how often you demonstrate these flexibility indicators:

- I catch myself in rigid thinking patterns
- I can find multiple interpretations of events
- I shift strategies when the first isn't working
- I update my views with new information
- I see obstacles as puzzles, not walls

*Rate each item from 1 (Never) to 5 (Always)*

---

## 📊 The Research

Studies show that cognitive flexibility:
- Predicts career success better than IQ (r=0.67)
- Reduces anxiety symptoms by 45% in 8 weeks
- Increases problem-solving speed by 3x
- Improves relationship satisfaction by 34%

But here's the surprise: It's highly trainable. 

Just like physical flexibility, mental flexibility improves with specific exercises. Sarah's team didn't become flexible overnight—they practiced specific drills that rewired their default responses.

---

## 🌉 Your Bridge Moment

Think about your current "bridge"—something you believe is essential, irreplaceable, the only way:
- A job/client
- An approach/method
- A relationship dynamic
- An identity/role

Now imagine: Tonight, a storm takes that bridge.

Tomorrow morning, what rafts could you build?

Not would you want to—but could you, if you had to?

That thought experiment—that flash of "Oh, I could..."—that's cognitive flexibility awakening.

You don't need to burn your bridges. But knowing you could build a raft changes everything about how you walk across them.

---

## ⚡ Quick Win Challenge

This week, practice "The Reframe Reflex":

1. When something goes wrong, time yourself
2. Write down your first thought
3. Force yourself to write 2 alternative interpretations
4. Pick the one most likely to generate useful action
5. Act on that frame for just 10 minutes

Track: How many minutes from problem to reframe?

Goal: Get it under 5 minutes by week's end.

Remember: The storm doesn't ask permission. But neither does your ability to build."""

    reflection_content = """# 🤔 Reflection: Your Bridge Moments

## Personal Inventory

Think deeply about Sarah's story and your own experiences:

### 1. Identifying Your Bridges

**What are your "bridges"—things you believe you cannot lose or function without?**
_____

**Which of these bridges might actually be limiting your growth?**
_____

### 2. Your Rigidity Patterns

**When did you last stay stuck in one way of thinking despite evidence it wasn't working?**
_____

**What kept you locked in that perspective?**
- Fear of being wrong
- Investment in being right  
- Social pressure
- Identity protection
- Other: _____

### 3. Flexibility Moments

**Describe a time when you successfully shifted perspectives and it changed everything:**
_____

**What enabled that shift?**
_____

## The Reframe Practice

For each scenario below, write your immediate thought, then force two reframes:

**Scenario: Your proposal gets rejected**
- First thought: _____
- Reframe 1: _____
- Reframe 2: _____

**Scenario: Someone criticizes your work publicly**
- First thought: _____
- Reframe 1: _____  
- Reframe 2: _____

## Building Your Flexibility Protocol

Complete this protocol for future use:

**When I notice rigid thinking, I will:**
1. _____
2. _____
3. _____

**My personal flexibility mantra:**
_____

**One bridge I'm ready to see as optional:**
_____

## Deep Questions

- What would change if you truly believed every problem has at least 3 solutions?
- How might your stress levels shift if you saw obstacles as puzzles?
- What becomes possible when you stop protecting your need to be right?

Remember: Flexibility isn't about having no anchors—it's about choosing which anchors serve you and which ones are just familiar prisons."""

    challenge_content = """# 🎯 7-Day Cognitive Flexibility Challenge

## Your Mission

Transform your mental rigidity into cognitive agility through daily practice.

## Daily Protocol (10 minutes)

### Morning Prime (2 minutes)
Before checking phone/email, ask:
- "What am I assuming about today?"
- "What else could be true?"

### The Daily Reframe (5 minutes)
1. Identify one frustration/worry/problem
2. Write your initial frame
3. Generate 3 alternative perspectives
4. Choose the most empowering one
5. Take one action from that frame

### Evening Flexibility Score (3 minutes)
Rate your day 1-10:
- How quickly did I shift perspectives?
- How often did I catch rigid thinking?
- How well did I act from useful frames?

## Progressive Challenges

### Day 1-2: Observation
- Just notice rigid thoughts
- No judgment, just awareness
- Count how many times you think "have to" or "only way"

### Day 3-4: Simple Shifts  
- Practice on minor annoyances
- Traffic → audio book time
- Waiting → breathing practice
- Mistake → learning data

### Day 5-6: Complex Reframes
- Apply to real challenges
- Conflict → understanding opportunity
- Setback → redirection
- Loss → space for new

### Day 7: Integration Test
- Share your biggest reframe with someone
- Teach them the STOP-SHIFT-SELECT-START process
- Help them reframe one challenge

## Tracking Template

**Day ___: Date: _____**

Morning assumptions challenged: _____

Today's reframe:
- Situation: _____
- Initial frame: _____
- Alternative 1: _____
- Alternative 2: _____
- Alternative 3: _____
- Chosen frame: _____
- Action taken: _____

Flexibility score: ___/10

Insight gained: _____

## Success Metrics

✓ 5+ reframes completed
✓ Average flexibility score > 6
✓ Response time to challenges decreased
✓ Shared learning with 1+ person

## The Neuroscience Boost

Each reframe literally creates new neural pathways. You're not just thinking differently—you're rebuilding your brain's default response system.

By day 7, your brain will start automatically generating alternatives. 

That's not optimism. That's neuroplasticity in action.

## Your Commitment

"I commit to practicing cognitive flexibility for 7 days, knowing that mental agility is a skill I can develop, not a trait I lack."

Signed: _____
Date: _____"""

    quiz_content = {
        "questions": [
            {
                "id": 1,
                "question": "What was the key insight that shifted Sarah's team from panic to action?",
                "type": "multiple_choice",
                "options": [
                    "They needed to work harder",
                    "They should stop looking at the closed door and find windows",
                    "They should immediately find a replacement client",
                    "They should cut all expenses"
                ],
                "correct_answer": "They should stop looking at the closed door and find windows"
            },
            {
                "id": 2,
                "question": "What percentage of new revenue did Sarah's team secure by week 4?",
                "type": "multiple_choice",
                "options": [
                    "60%",
                    "35%", 
                    "41%",
                    "100%"
                ],
                "correct_answer": "41%"
            },
            {
                "id": 3,
                "question": "What are the three core skills of cognitive flexibility?",
                "type": "multiple_choice",
                "options": [
                    "Planning, Executing, Reviewing",
                    "Cognitive Shifting, Cognitive Inhibition, Working Memory Updating",
                    "Problem-solving, Decision-making, Critical thinking",
                    "Attention, Memory, Processing"
                ],
                "correct_answer": "Cognitive Shifting, Cognitive Inhibition, Working Memory Updating"
            },
            {
                "id": 4,
                "question": "What is the 'Flexibility Formula' presented in the lesson?",
                "type": "multiple_choice",
                "options": [
                    "THINK → ACT → REVIEW → ADJUST",
                    "STOP → SHIFT → SELECT → START",
                    "OBSERVE → ORIENT → DECIDE → ACT",
                    "PLAN → DO → CHECK → ADJUST"
                ],
                "correct_answer": "STOP → SHIFT → SELECT → START"
            },
            {
                "id": 5,
                "question": "According to the research, cognitive flexibility predicts career success better than:",
                "type": "multiple_choice",
                "options": [
                    "Education level",
                    "Years of experience",
                    "IQ",
                    "Social connections"
                ],
                "correct_answer": "IQ"
            },
            {
                "id": 6,
                "question": "What was the team's ultimate decision about the big client who wanted to return?",
                "type": "multiple_choice",
                "options": [
                    "Reject them completely",
                    "Take them back as the primary client",
                    "Take them as one of many clients, never again as the only bridge",
                    "Demand double the payment"
                ],
                "correct_answer": "Take them as one of many clients, never again as the only bridge"
            }
        ]
    }

    # Database connection and update
    DATABASE_URL = os.environ.get('DATABASE_URL', '')
    if DATABASE_URL.startswith('postgresql://'):
        DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')
    
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL not set")
        return
    
    print(f"Connecting to database...")
    
    engine = create_async_engine(DATABASE_URL)
    AsyncSessionLocal = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    
    async with AsyncSessionLocal() as session:
        try:
            from app.models import Lesson
            
            # Check if lesson exists
            result = await session.execute(
                select(Lesson).where(Lesson.id == 37)
            )
            lesson = result.scalar_one_or_none()
            
            if lesson:
                print(f"Updating Lesson 37: {lesson.title}")
                lesson.story = story_content
                lesson.reflection = reflection_content
                lesson.challenge = challenge_content
                lesson.quiz = json.dumps(quiz_content)
                lesson.module_number = 3
                lesson.order = 11
                lesson.is_published = True
                await session.commit()
                print("✅ Lesson 37 updated successfully with interactive components!")
            else:
                print("Creating Lesson 37...")
                new_lesson = Lesson(
                    id=37,
                    slug="the-bridge-in-the-storm",
                    title="The Bridge in the Storm",
                    module_number=3,
                    order=11,
                    is_published=True,
                    story=story_content,
                    reflection=reflection_content,
                    challenge=challenge_content,
                    quiz=json.dumps(quiz_content)
                )
                session.add(new_lesson)
                await session.commit()
                print("✅ Lesson 37 created successfully with interactive components!")
                
        except Exception as e:
            print(f"Error: {e}")
            await session.rollback()
        finally:
            await engine.dispose()

if __name__ == "__main__":
    asyncio.run(deploy_lesson37())
