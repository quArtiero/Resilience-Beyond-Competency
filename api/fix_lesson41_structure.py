#!/usr/bin/env python3
"""
Fix Lesson 41 "Flexibility in Action" challenge structure - properly organize into 3 days
"""

import psycopg2
from psycopg2.extras import Json

# Database connection
DATABASE_URL = "postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require"

def fix_lesson_41():
    """Fix the broken day structure in Lesson 41"""
    
    # Properly structured 3-day challenge
    new_challenge = """# Challenge: The Flexibility Olympics

## Your Training Ground

For the next 3 days, you'll compete in daily flexibility events, earning points for each successful flex. Goal: 100+ points to reach Flexibility Master status.

## The Events

### Day 1: The Perspective Marathon & Solution Gymnastics

#### Morning Event: The Three-Story Building
Take any problem and tell three completely different stories about it:
- The Victim Story: _____
- The Hero Story: _____
- The Teacher Story: _____
Points: 10 for each compelling story

#### Afternoon Event: The Five-Way Solve
Pick your biggest current problem:
- Solution 1 (Logical): _____
- Solution 2 (Creative): _____
- Solution 3 (Collaborative): _____
- Solution 4 (Radical): _____
- Solution 5 (Do Nothing): _____
Points: 5 for each unique solution

#### Evening Event: The Enemy's Gift
Think of someone who frustrates you:
- Their perspective: _____
- Their positive intention: _____
- What they're teaching you: _____
Points: 15 for genuine understanding

Day 1 Total: _____ / 70 possible

### Day 2: Communication & Emotion Flex

#### Morning Event: The Language Swap
Replace your default phrases:
- Instead of "but" → used "and": _____ times (2 points each)
- Instead of "no" → used "yes, if": _____ times (3 points each)
- Instead of "you should" → used "what if": _____ times (3 points each)

#### Afternoon Event: The Feeling Flip
Transform negative emotions:
- Anger → Curiosity: _____
- Fear → Excitement: _____
- Frustration → Fascination: _____
Points: 10 for each successful flip

#### Evening Event: The Style Shifter
Communicate in three different styles:
- Like a coach: _____
- Like a poet: _____
- Like a scientist: _____
Points: 5 for each authentic shift

Day 2 Total: _____ / variable (aim for 50+)

### Day 3: Integration Championship

#### Morning Event: The Opposite Experiment
Do three things opposite to your normal way:
1. _____ Points: 10
2. _____ Points: 10
3. _____ Points: 10

#### Afternoon Event: The Decision Sprint
Make 5 decisions differently than usual:
1. _____ Points: 5
2. _____ Points: 5
3. _____ Points: 5
4. _____ Points: 5
5. _____ Points: 5

#### Evening Event: The Flexibility Story
Write about your 3-day flexibility journey:
- Biggest surprise: _____
- Hardest flex: _____
- Most valuable skill: _____
- What you'll keep doing: _____
Points: 20 for deep reflection

Day 3 Total: _____ / 75 possible

## Scoring Your Performance

Daily Scores:
- Day 1: _____ / 70
- Day 2: _____ / 50+
- Day 3: _____ / 75

Total Score: _____ points

## Achievement Levels

- 50-75 points: Flexibility Beginner 🌱
- 76-100 points: Flexibility Practitioner 🌿
- 101-125 points: Flexibility Athlete 🌳
- 126-150 points: Flexibility Master 🏅
- 151+ points: Flexibility Olympian 🏆

## Bonus Challenges (10 points each)

- [ ] Change strongly held opinion based on evidence
- [ ] Admit you were wrong publicly
- [ ] Ask for help with something you usually do alone
- [ ] Say yes to something scary
- [ ] Solve problem using child's approach
- [ ] Spend hour in beginner's mind
- [ ] Teach someone a flexibility technique

## Your Flexibility Trophy

At the end of your 3 days, write your victory speech:

"This week I discovered that I can _____. 

I was surprised that _____. 

I'm most proud of _____. 

Going forward, I commit to _____."

## The Flexibility Pledge

"I competed in the Flexibility Olympics not to win, but to grow. Each event stretched me beyond my comfortable patterns. I discovered that rigidity is a choice, and flexibility is a skill. I earned _____ points, but more importantly, I earned freedom from my own limitations."

Share your results with: _____

Celebrate your flexibility with: _____

Remember: Every flex makes you stronger. Every stretch makes you freer. Every choice makes you more alive."""

    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    print("Fixing Lesson 41: Flexibility in Action...")
    print("=" * 60)
    
    # Update the lesson
    cur.execute(
        "UPDATE lesson SET challenge = %s WHERE id = 41",
        (Json(new_challenge),)
    )
    
    conn.commit()
    
    print("✅ Lesson 41 challenge structure fixed!")
    print("\nChanges made:")
    print("• Properly organized into 3 clear days")
    print("• Fixed duplicate day numbers")
    print("• Removed confusing 'Day 2 Evening' sections")
    print("• Balanced point distribution across days")
    print("• Simplified events to fit 3-day timeline")
    print("• Day 1: Perspective & Solutions (70 points)")
    print("• Day 2: Communication & Emotions (50+ points)")
    print("• Day 3: Integration & Reflection (75 points)")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    fix_lesson_41()
