"""
Standalone deployment script for Lesson 4
Run this directly in Render API shell after creating placeholder
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
import os
import sys

sys.path.append('/app')
from app.models import Lesson

# Full lesson content
LESSON_4_CONTENT = {
    'story': """## The Switch You Need When Stakes Are High

**3:47 PM, Q4 Review Meeting**

Marcus watches his carefully prepared slides get dismissed in 12 seconds. "This isn't what we need," the CEO says, turning to the next presenter.

His body floods with heat. Thoughts spiral: *Six weeks wasted. They think I'm incompetent. My promotion is gone.*

**Old Marcus** would have:
- Defended aggressively (making it worse)
- Shut down completely (missing the feedback)
- Ruminated for days (destroying his week)

**New Marcus** (after this lesson) does something invisible but powerful:
- **3:47:15** - Notices the heat wave (SIGNAL)
- **3:47:20** - Initiates 90-second reset under the table
- **3:48:00** - Reframes: "Data about expectations, not judgment"
- **3:48:30** - Asks one clarifying question: "What would make this valuable for you?"
- **3:49:00** - Takes notes on the actual need
- **3:52:00** - Contributes one insight based on the new direction

Result: CEO remembers his agility, not his miss. Marcus saves 20 hours of rumination. Project pivots successfully.

## Here's Your Truth

**You're not broken for having strong reactions.** Your nervous system is doing exactly what it evolved to do—protect you from threats. The problem? It can't tell the difference between a charging bear and challenging feedback.

But here's what changes everything: **The 90-second biological window.**

Once triggered, your body's chemical response lasts approximately 90 seconds. After that, you're *choosing* to re-trigger by replaying the story. 

Master those 90 seconds, and you master your response to anything.

## Your Regulation Toolkit

### Tool 1: The 90-Second Reset
When cortisol floods your system, you have 90 seconds before your prefrontal cortex comes back online. Here's what to do in that window:

**Seconds 1-30: STOP**
- Pause all action
- Drop your shoulders
- Soften your jaw
- Count 4-7-8 breathing (3 rounds)

**Seconds 31-60: LABEL**
- Name the feeling in 5 words or less
- "Anger-shame-fear combo hitting"
- (Naming activates your prefrontal cortex)

**Seconds 61-90: CHOOSE**
- Ask: "What outcome do I actually want here?"
- Pick ONE next action under 30 seconds
- (Call a friend, take a walk, write one sentence)

*Use the reset timer tool to practice this until it's automatic.*

### Tool 2: The State Switch
Your physiology drives your psychology. Change your body, change your mind:

**The Power Pose Protocol**
- Stand up (non-negotiable)
- Arms wide or on hips
- Chin slightly up
- Hold 30 seconds
- (Drops cortisol 25%, raises testosterone 20%)

**The Temperature Hack**
- Cold water on wrists (cooling)
- Splash face 3x (reset)
- Or hold ice cube (sharp focus)
- (Activates mammalian dive response)

### Tool 3: Cognitive Reappraisal
Same facts, different story. The most powerful regulation tool:

**The Reframe Formula**
1. "The story I'm telling myself is..."
2. "Another equally true story could be..."
3. "The most useful story right now is..."

**Example:**
- Story 1: "They're attacking my competence"
- Story 2: "They're stressed about quarterly numbers"
- Useful story: "I'm getting valuable data about their priorities"

### Tool 4: The Grounding Sequence (5-4-3-2-1)
When everything feels too fast:
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

(This forces your brain out of future-fear into present-reality)

## The If-Then Implementation Plan

Regulation fails without a plan. Your triggered brain won't remember tools—unless you've pre-decided:

**Build Your Plan:**
- IF [specific trigger] happens
- THEN I will [specific action <30 seconds]

**Examples that work:**
- IF I see a critical email → THEN I stand up before responding
- IF someone interrupts me → THEN I take 3 breaths before speaking
- IF I feel heat in my chest → THEN I excuse myself for 90 seconds

**Examples that fail:**
- IF I get stressed → THEN I'll handle it better (too vague)
- IF something bad happens → THEN I'll stay calm (not specific)

## Why This Matters More Than Any Other Skill

One unregulated moment can:
- Destroy months of relationship building
- Derail a crucial presentation
- Cost you opportunities you've worked years for

But one well-regulated moment can:
- Turn conflict into collaboration
- Transform criticism into growth
- Convert crisis into leadership

**The math:** If you face 3 triggering moments per day, and each unregulated response costs you 2 hours of recovery/damage control, that's 30 hours per week. 

Master regulation, reclaim a full workday—every single week.

## Your Practice Path

Start with just one tool. Pick the one that feels most doable:
- Use the 90-second reset once today
- Do one state switch after any difficult interaction
- Practice one reframe before bed tonight

Remember: Regulation isn't about never feeling. It's about feeling fully, then choosing wisely.

---

*"Between stimulus and response, there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom."* - Viktor Frankl

Ready? Let's build your regulation protocol.""",

    'reflection': """## Your Self-Regulation Lab

You've learned the tools. Now let's customize them for YOUR nervous system.

### The 90-Second Reset Timer

<regulation-reset-timer>

### Your Personal Grounding Practice

<grounding-exercise>

### Master Reappraisal 

<reappraisal-builder>

### Integration Check

**Identify Your Top 3 Triggers**
Think about the last month. What situations consistently dysregulate you?

**Tool Preference Ranking**
Based on trying each tool, rank them 1-4:
- 90-Second Reset
- State Switch  
- Reappraisal
- Grounding (5-4-3-2-1)

**Your Quick-Access Stack**
Build your personal regulation stack:
1. My go-to tool (for most situations)
2. My backup tool (when go-to isn't enough)
3. My nuclear option (for extreme situations)

**Commit to Track**
Which metric will you track this week?
- Number of resets used
- Time to recovery after triggers
- Situations successfully regulated
- Hours saved from rumination""",

    'challenge': """## Your Regulation Challenge Lab

### Part 1: If-Then Plan Factory

<if-then-planner>

### Part 2: Mini-Case Simulations

Practice regulation in realistic scenarios.

<regulation-simulator>

### Part 3: Your Personal Protocol Card

<protocol-card-builder>

### Part 4: State Switch Tracker

<state-switch-tracker>

### Exit Reflection

Complete these:
1. "My fastest regulation tool is _____ because _____"
2. "My most challenging trigger to regulate is _____"
3. "If I master this one skill, it will save me _____ hours/week"
4. "Tomorrow I'll practice when _____"

*Remember: Every regulated moment is a victory. Start with just one today.*""",

    'quiz': """{"questions":[{"id":1,"type":"multiple_choice","text":"First move when you notice tunnel vision?","options":["Send the email faster","Run a 90-second reset or 5-4-3-2-1","Open more tabs","Argue your case"],"correct":1,"explanation":"Lower arousal before deciding. Tunnel vision indicates high stress - you need to regulate before taking action."},{"id":2,"type":"multiple_choice","text":"Reappraisal is best described as...","options":["Denying the facts","Changing the meaning while keeping the facts","Venting privately","Waiting it out"],"correct":1,"explanation":"Same facts, new frame. Reappraisal changes interpretation, not reality."},{"id":3,"type":"multiple_choice","text":"A strong If-Then plan must be...","options":["Inspirational","General and flexible","Tiny, specific, executable in <2 min","Aggressive and bold"],"correct":2,"explanation":"Precision makes it runnable under stress. Vague plans fail when you need them most."},{"id":4,"type":"multiple_choice","text":"Why does the state switch (physical change) work?","options":["It's a distraction","Physiology drives psychology","It wastes time until you calm down","Placebo effect"],"correct":1,"explanation":"Your body changes your brain chemistry. Physical state directly impacts mental state."},{"id":5,"type":"multiple_choice","text":"You have 3 back-to-back triggering events. Best approach?","options":["Handle them all at once","One reset after all three","Reset after EACH trigger","Push through"],"correct":2,"explanation":"Triggers compound if not cleared. Each event needs its own reset to prevent accumulation."}]}"""
}

async def update_lesson4():
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL.startswith("postgresql://"):
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    print("📦 Connecting to database...")
    
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        try:
            # Update lesson 23
            result = await session.execute(select(Lesson).where(Lesson.id == 23))
            lesson = result.scalar_one_or_none()
            
            if not lesson:
                print("❌ Lesson 23 not found! Run deploy_lesson4_simple.py first")
                return
            
            print("📝 Updating Lesson 23 with full content...")
            lesson.story = LESSON_4_CONTENT['story']
            lesson.reflection = LESSON_4_CONTENT['reflection']
            lesson.challenge = LESSON_4_CONTENT['challenge']
            lesson.quiz = LESSON_4_CONTENT['quiz']
            
            await session.commit()
            print("✅ Lesson 4 content updated successfully!")
            
            # Verify
            print(f"📚 Story length: {len(lesson.story)} chars")
            print(f"💭 Reflection length: {len(lesson.reflection)} chars")
            print(f"🎯 Challenge length: {len(lesson.challenge)} chars")
            print(f"❓ Quiz questions: {lesson.quiz.count('question')}")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            await session.rollback()
        finally:
            await engine.dispose()

# Run it
asyncio.run(update_lesson4())
print("\n🎉 Deployment complete!")
