#!/usr/bin/env python3
"""
Simple deployment script for Lesson 3 - run directly in Render shell
"""

import asyncio
import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import select
from app.models import Lesson

# Complete Lesson 3 content
lesson3_content = {
    'id': 22,
    'slug': 'self-awareness-mastery',
    'title': 'Self-Awareness: Triggers, Body Signals & Stories',
    'module_number': 2,
    'order': 6,
    'is_published': True,
    'story': """## The Three Lenses: See It to Steer It

*"Between stimulus and response, there is a space. In that space is our power to choose."* — Viktor Frankl

But here's the problem: **Most of us don't even know the space exists until after we've already reacted.**

### The Gap You're Missing

Picture this scene:

**9:47 AM** - Email arrives: "Need to discuss your project approach"
**9:47:03 AM** - Chest tightens
**9:47:05 AM** - Story forms: "I'm in trouble"
**9:47:08 AM** - Reply started: "I can explain..."
**9:47:45 AM** - Send.
**9:48 AM** - Regret.

Total time from trigger to regret: **73 seconds.**

Your body knew at 3 seconds. Your mind created a story at 5 seconds. But you didn't catch either signal, so the default program ran its course.

### The Self-Awareness Operating System

Self-awareness isn't meditation or journaling (though those help). It's a real-time detection system with three lenses:

#### Lens 1: Triggers (The Spark)
Situations that reliably ignite strong emotions. Not random — **predictable patterns**:
- **Time/Workload**: Last-minute requests when you're already at capacity
- **Ambiguity**: "We need to talk" with no context
- **Status Threats**: Being corrected in public
- **Fairness Violations**: Credit taken for your work
- **Value Conflicts**: Asked to compromise integrity

**The Truth**: You have 5-7 core triggers that account for 80% of your reactions. Name them, and you can prepare for them.

#### Lens 2: Body Signals (The Smoke)
Your body is an emotional seismograph, detecting tremors before the earthquake:
- **Jaw**: First to clench when frustrated
- **Chest**: Tightens with anxiety, flutters with excitement
- **Breath**: Shallow = stressed, held = bracing
- **Gut**: Drops with dread, knots with conflict
- **Shoulders**: Rise toward ears under pressure

**The Research**: Heart rate variability changes 30-90 seconds before conscious awareness of emotion (Porges, 2011). Your body is trying to warn you.

#### Lens 3: Stories (The Fire)
The instant interpretations your brain generates:
- **Catastrophizing**: "This ruins everything"
- **Mind-reading**: "They think I'm incompetent"
- **Personalization**: "It's my fault the team is struggling"
- **All-or-Nothing**: "If it's not perfect, it's worthless"
- **Filtering**: Only seeing the negative data

**The Mechanism**: Your brain is a meaning-making machine. It can't tolerate ambiguity, so it fills gaps with stories — usually worst-case ones when stressed.

### The Signal → Label → Choose Protocol

This is your new operating system:

**1. Signal** (0-3 seconds)
Body sends alert: jaw tight, chest compressed, breath held.

**2. Label** (3-10 seconds)
Name with precision: "I feel dismissed and time-pressed because the deadline moved without input."

**3. Choose** (10-30 seconds)
- **Name**: The specific emotion
- **Need**: What would help right now?
- **Next**: One ≤10-minute action

### Case Study: The Monday Morning Collision

**Sarah, Project Manager, 3 months into new role:**

**8:31 AM** - Arrives to find meeting moved up by 2 hours
**8:31:02** - Stomach drops (SIGNAL)
**8:31:05** - "They don't respect my time" (STORY)
**8:31:10** - Drafting angry Slack message...

**OLD SARAH**: Sends message. Team tensions rise. Meeting goes poorly. Day ruined.

**NEW SARAH** (trained in this system):
**8:31:02** - Notices stomach drop — "Okay, I'm triggered"
**8:31:10** - STOP + 3 breaths
**8:31:30** - Labels: "Frustrated + caught off-guard. Need: clarity on urgency"
**8:31:45** - Next: "Hi team, saw the time change. What shifted that made 10am critical? Want to make sure I'm prepared."

**Result**: Learns client moved their deadline. Team appreciates her calmness. Meeting productive.

**Time investment**: 45 seconds
**ROI**: Entire day salvaged

### The Neuroscience of Naming

When you label an emotion with precision ("I feel professionally dismissed" vs. "I'm pissed"), something remarkable happens:

1. **Prefrontal cortex activates** - Your thinking brain comes online
2. **Amygdala activity decreases by 50%** - The alarm center calms
3. **Heart rate variability improves** - Body shifts from threat to challenge mode

This is called **"affect labeling"** and it's been validated in dozens of fMRI studies (Lieberman et al., 2007).

**Simple formula**: Name it to tame it. But the name must be precise.

### Your Emotional Granularity Ladder

Most people use 3-7 emotion words. High performers use 30+. Here's your upgrade path:

**Stressed** →
- Overwhelmed (too much input)
- Time-pressed (too little time)
- Scattered (unclear priorities)
- Stretched (pulled in too many directions)
- Overloaded (weight exceeds capacity)

**Angry** →
- Frustrated (blocked progress)
- Defensive (protecting self)
- Indignant (unfair treatment)
- Protective (guarding others)
- Disappointed (unmet expectations)

**Anxious** →
- Uncertain (missing information)
- Exposed (vulnerable to judgment)
- Anticipatory (future-focused worry)
- Uneasy (something feels off)
- Pressured (external demands)

**The payoff**: People with higher emotional granularity have 30% better emotion regulation, 25% less anxiety, and 20% better relationship satisfaction (Kashdan et al., 2015).

### The Early Warning System

By the end of today's lesson, you'll build three tools:

1. **Trigger Map**: Your personal heat map of what sets you off
2. **Body Signal Bank**: Your early warning dashboard
3. **Story Rewriter**: Your automatic thought interceptor

Combined, these create an Early Warning System that catches reactions 30-60 seconds earlier — enough time to choose differently.

### The Paradox of Awareness

Here's what most people get wrong: **Self-awareness isn't about controlling emotions. It's about having OPTIONS.**

You'll still feel the trigger. The body signal will still fire. The story will still start forming.

But now you'll catch them in time to ask: "What would serve the purpose here?"

Sometimes the purpose calls for intensity. Sometimes for calm. Sometimes for questions. Sometimes for boundaries.

The power isn't in not feeling — it's in choosing what to do with what you feel.

*Ready to map your patterns? Let's start with your triggers...*""",
    'reflection': """## Personal Trigger Mapping

You've learned the three lenses. Now let's map YOUR specific patterns.

### Part 1: Trigger Library

<trigger-map>

### Part 2: Interoception Accuracy Training

Your body signals 30-90 seconds before your conscious mind catches up. Let's sharpen this detection system.

<interoception-scanner>

### Part 3: Story Pattern Recognition

Transform automatic thoughts into balanced perspectives using the ABC→A+RB framework.

<story-rewriter>

### Integration Questions

**Pattern Analysis**:
- Which trigger category showed up most for you?
- What body signal is your most reliable early warning?
- Which story pattern do you default to under stress?

**Cost Calculation**:
- How much time do you lose to trigger reactions weekly?
- Which relationship suffers most from your patterns?
- What opportunities have you missed due to poor recovery?

**Commitment to Practice**:
- What's your #1 trigger to practice with this week?
- Which body signal will you track daily?
- What story pattern will you actively rewrite?

### Your Early Warning If-Then Lines

Based on your mapping, write three implementation intentions:

1. **If** [specific trigger/context] and I notice [body signal], **then** I will [specific action].
   
2. **If** I catch myself thinking [story pattern], **then** I will [reframe strategy].
   
3. **If** I feel [body signal] during [situation], **then** I will [response protocol].

### The Compound Effect

Small improvements in self-awareness create dramatic results:
- Catch triggers 30 seconds earlier → 50% better responses
- Name emotions precisely → 30% faster recovery
- Rewrite one story daily → 40% less rumination

This isn't perfection. It's progress.""",
    'challenge': """## Your Self-Awareness Lab

<self-awareness-challenge>""",
    'quiz': '{"questions":[{"id":1,"type":"multiple_choice","text":"What\'s the earliest indicator you\'re about to react?","options":["The email you send","The first thought you think","A body signal (e.g., jaw/breath/chest)","The meeting outcome"],"correct":2,"explanation":"Body signals appear 30-90 seconds before conscious awareness. Your body is your early warning system."},{"id":2,"type":"multiple_choice","text":"Which is a precise emotional label?","options":["Bad","Stressed","Time-pressed and scattered","Fine"],"correct":2,"explanation":"Emotional granularity (precise labeling) reduces intensity and improves regulation by 30%."},{"id":3,"type":"multiple_choice","text":"Mind-reading (assuming what others think) is best countered by:","options":["Avoiding the person","Evidence check or asking a clarifying question","Believing your story harder","Waiting until tomorrow"],"correct":1,"explanation":"Replace assumptions with data. Either check evidence or ask directly what they\'re thinking."},{"id":4,"type":"multiple_choice","text":"The Signal → Label → Choose protocol takes approximately:","options":["5 minutes","10-30 seconds","2-3 minutes","An hour of reflection"],"correct":1,"explanation":"The protocol is designed to work in real-time: Signal (0-3s) → Label (3-10s) → Choose (10-30s)."},{"id":5,"type":"multiple_choice","text":"Emotional granularity (using precise emotion words) leads to:","options":["Overthinking","30% better regulation and 25% less anxiety","Emotional suppression","Increased sensitivity"],"correct":1,"explanation":"Research shows precise labeling activates the prefrontal cortex and calms the amygdala, improving regulation."}]}'
}

async def deploy_lesson3():
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found!")
        return
    
    if database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    engine = create_async_engine(database_url, echo=False)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        try:
            result = await session.execute(
                select(Lesson).where(Lesson.id == lesson3_content['id'])
            )
            existing_lesson = result.scalar_one_or_none()
            
            if existing_lesson:
                print(f"Updating Lesson {lesson3_content['id']}...")
                existing_lesson.title = lesson3_content['title']
                existing_lesson.slug = lesson3_content['slug']
                existing_lesson.story = lesson3_content['story']
                existing_lesson.reflection = lesson3_content['reflection']
                existing_lesson.challenge = lesson3_content['challenge']
                existing_lesson.quiz = lesson3_content['quiz']
                existing_lesson.order = lesson3_content['order']
                existing_lesson.module_number = lesson3_content['module_number']
                existing_lesson.is_published = lesson3_content['is_published']
            else:
                print(f"Creating Lesson {lesson3_content['id']}...")
                new_lesson = Lesson(
                    id=lesson3_content['id'],
                    title=lesson3_content['title'],
                    slug=lesson3_content['slug'],
                    story=lesson3_content['story'],
                    reflection=lesson3_content['reflection'],
                    challenge=lesson3_content['challenge'],
                    quiz=lesson3_content['quiz'],
                    order=lesson3_content['order'],
                    module_number=lesson3_content['module_number'],
                    is_published=lesson3_content['is_published']
                )
                session.add(new_lesson)
            
            await session.commit()
            print(f"✅ Lesson {lesson3_content['id']}: {lesson3_content['title']} deployed!")
            
            result = await session.execute(
                select(Lesson).where(Lesson.module_number == 2).order_by(Lesson.order)
            )
            lessons = result.scalars().all()
            
            print("\n📚 Module 2 Lessons:")
            for lesson in lessons:
                chars = len(lesson.story) if lesson.story else 0
                print(f"  - L{lesson.id}: {lesson.title[:30]}... ({chars:,} chars)")
            
        except Exception as e:
            print(f"Error: {e}")
            await session.rollback()
    
    await engine.dispose()

if __name__ == "__main__":
    print("🚀 Deploying Lesson 3...")
    asyncio.run(deploy_lesson3())
