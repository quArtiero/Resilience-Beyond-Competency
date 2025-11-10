#!/usr/bin/env python3
"""
Fix Lesson 41 content in Render database with proper _____ markers
"""

import psycopg2
from psycopg2.extras import Json
import os

# Render PostgreSQL connection with SSL
DATABASE_URL = 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require'

def fix_lesson_41():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Lesson 41 story with proper _____ markers
    lesson_41_story = """# Flexibility in Action

## The Jazz Session

Nina watched the senior engineers debate for the third hour. The system architecture meeting had devolved into a battle of egos, each person defending their approach like a fortress.

"What if we're all right?" Nina said quietly.

The room turned to the junior developer.

"I mean," Nina continued, gaining confidence, "what if we built it modularly? Use Tom's caching strategy for the API, Sarah's event-driven design for real-time features, and Marcus's monolithic approach for the admin panel. Jazz, not symphony."

The room was silent. Then Tom laughed. "The junior just out-architected all of us."

## The Flexibility Field Guide

Cognitive flexibility isn't a concept—it's a practice. Here's how it looks in the wild:

### Flexibility at Work

**Scenario**: Project requirements change mid-sprint
- **Rigid Response**: "This always happens! We need better planning!"
- **Flexible Response**: "Interesting. What new information prompted this change?"
- **Action**: Rapid pivot planning session
- **Result**: Team adapts in 2 hours vs. 2 days of complaints

**Your Work Challenge**: _____
- Rigid response tendency: _____
- Flexible response option: _____
- Next action: _____

**Scenario**: Your idea gets shot down in a meeting
- **Rigid Response**: Defend, argue, withdraw
- **Flexible Response**: "What concerns does my idea raise?"
- **Action**: Iterate based on feedback
- **Result**: Version 2.0 gets approved

**Your Recent Rejection**: _____
- How you responded: _____
- How you could flex: _____
- What you'll try next: _____

### Flexibility in Relationships

**Scenario**: Partner wants to change vacation plans
- **Rigid Response**: "But we already decided!"
- **Flexible Response**: "Tell me what you're excited about"
- **Action**: Explore the new possibility together
- **Result**: Discover an even better option

**Your Relationship Tension**: _____
- Your fixed position: _____
- Their perspective: _____
- The flexible middle: _____

**Scenario**: Friend cancels plans last minute (again)
- **Rigid Response**: "They don't value my time"
- **Flexible Response**: "Something must be going on"
- **Action**: Check in with curiosity, not judgment
- **Result**: Uncover they're struggling with anxiety

**Your Recurring Frustration**: _____
- Your assumption: _____
- Alternative explanation: _____
- Curious question to ask: _____

### Flexibility in Problem-Solving

**The Flexibility Algorithm**:
1. Define the problem broadly
2. Generate 5 wildly different solutions
3. Combine elements from each
4. Test the hybrid
5. Iterate based on results

**Practice Problem**: You need to learn a new skill but have no time
- Solution 1 (Traditional): Take an online course
- Solution 2 (Social): Find someone to teach you
- Solution 3 (Experiential): Jump in and learn by doing
- Solution 4 (Efficient): Learn only what you immediately need
- Solution 5 (Creative): Teach others to force yourself to learn

**Hybrid Solution**: _____

### Flexibility in Communication

**The Flexible Conversation Model**:

Instead of: "You're wrong"
Try: "I see it differently"

Instead of: "That won't work"
Try: "What would need to be true for that to work?"

Instead of: "No"
Try: "Yes, if..."

Instead of: "But..."
Try: "Yes, and..."

**Your Communication Upgrade**:
- Phrase you overuse: _____
- Flexible alternative: _____
- Where to practice: _____

## The Daily Flexibility Workout

### Morning: The Options Generator (3 minutes)
Look at your calendar. For each meeting/task, generate 2 alternatives:
- Meeting → Could be email/video/walking meeting
- Task → Could be delegated/automated/eliminated
- Problem → Could be opportunity/lesson/gift

### Midday: The Perspective Shift (2 minutes)
Whatever is frustrating you right now:
1. Name it: _____
2. Default reaction: _____
3. Opposite reaction: _____
4. Third option: _____
5. Choose consciously: _____

### Evening: The Flexibility Review (3 minutes)
- Where was I rigid today? _____
- What did it cost? _____
- How could I have flexed? _____
- Tomorrow I will: _____

## The Flexibility Paradox

Here's the counterintuitive truth: **The more options you see, the more committed you can be to your choice.**

When you choose from only one option, you're trapped.
When you choose from multiple options, you're empowered.

This is why flexible people are often the most decisive—they've considered alternatives and chosen consciously.

## Real-World Flexibility Scenarios

### Scenario 1: The Meeting From Hell
You're in a meeting that's going nowhere. People are talking in circles.

**Rigid Options**:
- Suffer in silence
- Aggressively take over
- Check out mentally

**Flexible Interventions**:
- "Could we pause and clarify our outcome?"
- "What if we broke into pairs for 5 minutes?"
- "Should we table this and gather more data?"
- "Let's each write our solution silently first"

**Your Move**: _____

### Scenario 2: The Impossible Deadline
Your boss wants something done in half the usual time.

**Rigid Options**:
- Say it's impossible
- Kill yourself trying
- Do a terrible job

**Flexible Approaches**:
- "What's the minimum viable version?"
- "What if we borrowed resources?"
- "Could we deliver in phases?"
- "What's driving this timeline?"

**Your Strategy**: _____

### Scenario 3: The Family Drama
Family member brings up old conflict at dinner.

**Rigid Options**:
- Engage in the same old fight
- Storm out
- Shut down

**Flexible Responses**:
- "That was hard for all of us"
- "How do you wish it had gone?"
- "What do you need from me now?"
- "Should we talk about this privately?"

**Your Choice**: _____

## Nina's Leadership Moment

Six months later, Nina was leading the architecture team. Not because of seniority—she had the least. But because she had something more valuable: the ability to hold multiple perspectives simultaneously.

In her first team meeting as lead, she introduced a new rule: "Every solution needs three versions before we choose. Not to create work, but to ensure we're choosing, not defaulting."

Tom, her former senior, smiled. "You know what you've built here? A jazz ensemble. Everyone gets a solo, but we're all playing the same song."

Nina nodded. "And the song can change. That's the point."

## Your Flexibility Action Plan

### This Week's Practice
Choose one area to flex:
- [ ] Communication style
- [ ] Problem-solving approach
- [ ] Daily routine
- [ ] Relationship dynamic
- [ ] Work method

**Specific Flexibility Goal**: _____

### The Three Experiments
1. **The Opposite Day**: Do one thing opposite to your norm
2. **The Yes Day**: Say yes to three things you'd usually decline
3. **The Options Day**: Generate 3 options for every decision

### Your Flexibility Metrics
Track for one week:
- Rigid responses caught: _____
- Flexible alternatives generated: _____
- New approaches tried: _____
- Unexpected outcomes: _____

## The Flexibility Manifesto

"I am water, not ice.
I flow around obstacles rather than breaking against them.
I take the shape of my container while maintaining my essence.
I can be gentle like rain or powerful like the ocean.
My strength is not in my rigidity but in my adaptability.
Today, I choose to flow."

Remember: **Flexibility is not indecision. It's conscious choice from expanded options.**"""
    
    try:
        # Update lesson 41 story content
        cur.execute("""
            UPDATE lesson 
            SET story = %s
            WHERE id = 41
        """, (Json(lesson_41_story),))
        
        conn.commit()
        print("✅ Fixed Lesson 41 story content with proper _____ markers!")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error updating lesson: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    fix_lesson_41()
