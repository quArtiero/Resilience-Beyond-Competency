#!/usr/bin/env python3
"""
Update Module 1 to remove challenges and ensure interactive reflections
"""

import psycopg2
from psycopg2.extras import Json

# Render PostgreSQL connection with SSL
DATABASE_URL = 'postgresql://resilience_mastery_db_user:tFjVtiSEfWF5revzf6HBBGX8ot4fYpmf@dpg-d3ogbv3ipnbc73fvsf1g-a.oregon-postgres.render.com/resilience_mastery_db?sslmode=require'

def update_module1():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Update Lesson 1 - Remove challenge, ensure interactive reflection
    lesson1_updates = {
        "reflection": """# Reflection: Your Resilience Starting Point

## Quick Self-Assessment

Take a moment to understand where you are right now.

### Your Current Resilience Level

**Overall, I rate my resilience**: _____ (1-10)

**I handle stress**: _____ (poorly/okay/well/excellently)

**When things go wrong, my first thought is**: _____

## Your Resilience Story

Think about a recent challenge you faced:

**The situation was**: _____

**I responded by**: _____

**What helped me most**: _____

**What I learned**: _____

## Identify Your Patterns

When facing difficulties, I usually:
- [ ] Feel overwhelmed initially
- [ ] Jump straight into problem-solving
- [ ] Seek support from others
- [ ] Need time alone to process
- [ ] Try to ignore it
- [ ] Get angry or frustrated
- [ ] Look for someone to blame
- [ ] Look for lessons to learn

## Your Strengths & Growth Areas

**My biggest strength in tough times**: _____

**What I do well**: _____

**Where I struggle most**: _____

**One thing I want to improve**: _____

## Your Support System

**People I can count on**: _____

**How I typically ask for help**: _____

**What stops me from reaching out**: _____

## Quick Resilience Check

Rate yourself on these key areas (1-5):

**Emotional awareness**: _____ 
**Stress management**: _____
**Adaptability**: _____
**Problem-solving**: _____
**Optimism**: _____
**Self-care**: _____
**Seeking support**: _____

## Your Starting Point Declaration

**Right now, I am someone who**: _____

**When challenges arise, I typically**: _____

**By the end of this course, I want to**: _____

**The biggest change I want to make**: _____

## One Thing to Remember

**What's one strength you already have that you can build on?**: _____

**What's one small step you can take today?**: _____""",
        
        "challenge": ""  # Empty challenge
    }
    
    # Update Lesson 2 - Remove challenge, enhance reflection
    lesson2_updates = {
        "reflection": """# Reflection: Your Personal Goals

## Define Your Transformation

Let's get clear on what you want from this journey.

### Your Big Why

**I'm here because**: _____

**The cost of NOT changing is**: _____

**What success means to me**: _____

## Set Your Learning Goals

For each area, rate your current level and set a target:

### Emotional Intelligence
**Current level (1-10)**: _____
**Target level**: _____
**Most important skill to develop**: _____

### Mental Flexibility
**Current level (1-10)**: _____
**Target level**: _____
**Biggest mental block to overcome**: _____

### Resilience & Grit
**Current level (1-10)**: _____
**Target level**: _____
**Where I need more persistence**: _____

### Communication
**Current level (1-10)**: _____
**Target level**: _____
**Key relationship to improve**: _____

## Your Learning Commitment

I commit to:
- [ ] Being honest about my growth
- [ ] Practicing what I learn
- [ ] Being patient with myself
- [ ] Asking for help when needed
- [ ] Celebrating small wins
- [ ] Staying curious
- [ ] Trusting the process

## Potential Obstacles

**What might get in my way**: _____

**My plan to overcome this**: _____

**Who can help me stay on track**: _____

## Your Success Metrics

**I'll know I'm making progress when**: _____

**A specific situation I want to handle better**: _____

**The person I want to become is someone who**: _____

## Learning Preferences

How do you learn best?
- [ ] Reading and reflecting
- [ ] Trying things out
- [ ] Discussing with others
- [ ] Teaching what I learn
- [ ] Writing notes
- [ ] Real-world practice

**I learn best when**: _____

## Your Time Commitment

**I can dedicate _____ minutes per day to this**

**The best time for me to learn is**: _____

**I'll protect this time by**: _____

## Quick Win Goal

**One thing I'll implement this week**: _____

**How I'll know it's working**: _____

**My reward for following through**: _____

## Your Growth Mantra

**Write a one-line mantra for your journey**: _____

## Final Commitment

**I, _____, commit to showing up for my growth.**

**Even when it's hard, I will remember**: _____

**My first action after this lesson**: _____""",
        
        "challenge": ""  # Empty challenge
    }
    
    try:
        # Update Lesson 1
        cur.execute("""
            UPDATE lesson 
            SET reflection = %s, challenge = %s
            WHERE id = 1
        """, (
            lesson1_updates['reflection'],
            lesson1_updates['challenge']
        ))
        print("✅ Updated Lesson 1: Removed challenge, enhanced reflection")
        
        # Update Lesson 2
        cur.execute("""
            UPDATE lesson 
            SET reflection = %s, challenge = %s
            WHERE id = 2
        """, (
            lesson2_updates['reflection'],
            lesson2_updates['challenge']
        ))
        print("✅ Updated Lesson 2: Removed challenge, enhanced reflection")
        
        conn.commit()
        print("\n✅ Module 1 updated: No challenges, interactive reflections!")
        
    except Exception as e:
        conn.rollback()
        print(f"❌ Error: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    update_module1()
