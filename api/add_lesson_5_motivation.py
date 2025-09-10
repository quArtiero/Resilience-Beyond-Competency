#!/usr/bin/env python3
"""
Script to add Lesson 5: Motivation and Resilience
"""
import asyncio
import json
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

# Import from the API directory
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'api'))

from app.deps import engine
from app.models import Lesson

# Lesson 5 content: Motivation and Resilience
LESSON_5_DATA = {
    "slug": "lesson-5-motivation-and-resilience",
    "title": "Motivation and Resilience",
    "story": """
# The Marathon Runner's Motivation

Sarah, a former college athlete, had always loved running, but training for her first marathon proved to be more challenging than she'd expected. The rigorous training schedule pushed her body and mind to the limit, and as the miles stacked up, so did her exhaustion. Initially, she was motivated by the idea of finishing a marathon—crossing that finish line felt like it would make all the sacrifices worth it. But halfway through her training program, **the excitement wore off, replaced by dread each time she laced up her running shoes**.

One morning, after barely finishing a run, she slumped onto her living room floor, frustrated and close to tears. Her coach called later that day, sensing something was wrong, and asked her a simple but powerful question: 

> *"Why did you start this journey in the first place?"*

Sarah thought back to her initial motivation—she wanted to prove to herself that she could push through mental and physical limits. This journey was about **resilience**, about challenging herself, and about carrying through on a promise she made to herself.

Over the next few weeks, Sarah refocused her mindset. Each mile became a lesson in resilience, and instead of focusing solely on the finish line, she appreciated each moment of progress. On race day, Sarah wasn't just running to finish—**she was running for every mile of determination that got her there**.

## 🎯 Key Takeaways

Sarah's story demonstrates how **motivation powered by emotional intelligence** goes far beyond simple goal-setting. By using self-awareness and self-regulation, you can fuel motivation even when challenges arise.

### What Made Sarah's Transformation Possible?

1. **Self-Awareness**: She recognized when her motivation was flagging
2. **Emotional Honesty**: She acknowledged her frustration and exhaustion
3. **Purpose Reconnection**: She remembered her deeper "why" 
4. **Mindset Shift**: From outcome-focused to process-focused thinking
5. **Meaning-Making**: Each challenge became part of the growth journey
6. **Emotional Regulation**: She managed discouragement and maintained forward momentum

### The Emotional Intelligence - Motivation Connection

**Traditional Motivation**: "I want to achieve X"
**EI-Powered Motivation**: "I want to achieve X because it represents Y values and will help me grow in Z ways"

**Surface Motivation**: External rewards, recognition, competition
**Deep Motivation**: Personal values, character development, meaningful contribution

### Why EI-Powered Motivation Lasts Longer

1. **Values Alignment**: Connected to core personal values and beliefs
2. **Emotional Resilience**: Prepared for setbacks and challenges
3. **Growth Mindset**: Focused on learning and development, not just outcomes
4. **Self-Compassion**: Kind to yourself during difficult periods
5. **Purpose Clarity**: Clear understanding of why the goal matters
    """,
    "reflection": """
# Reflection on Motivation and Resilience

## 🤔 Personal Connection

Have you ever set a big goal, only to feel your motivation wane over time? What if you could reconnect with the reasons that inspired you to start?

**Motivation isn't just about the goal—it's about the meaning you attach to it.**

### Deep Reflection Questions:

1. **Emotional Connection**: Do you know the deeper emotional reasons why you're pursuing your current goals? What values do they represent?

2. **Sustaining Drive**: How can emotional intelligence help you overcome obstacles when motivation naturally decreases?

3. **Motivation Patterns**: When do you typically lose motivation? What emotional or mental patterns contribute to this?

4. **Purpose Clarity**: What does your most important current goal mean to you beyond just the achievement itself?

---

## 💭 Scenario-Based Reflection

**Consider Sarah's transformation**: She shifted from outcome-focused motivation ("finishing the marathon") to process-focused motivation ("proving I can push through limits and keep promises to myself").

### Your Motivation Shift:

Think about a current goal or challenge you're facing:

**Current Motivation (Surface Level)**: 
- What do you want to achieve?
- What external rewards or recognition are you seeking?

**Deeper Motivation (Values Level)**:
- Why does this goal matter to your personal growth?
- What character qualities will you develop through pursuing it?
- How does this goal align with your core values?
- What will you prove to yourself by achieving it?

### Reflection Questions:

1. **Journey vs. Destination**: How would your approach change if you focused on the journey itself instead of just the destination?

2. **Resilience Building**: What specific challenges in pursuing this goal are actually building your resilience muscles?

3. **Emotional Fuel**: What emotions (pride, determination, love, service) could fuel your motivation when external excitement fades?

4. **Self-Awareness**: What internal signals tell you when your motivation is flagging? How can you recognize these early?

5. **Meaning-Making**: How can you find meaning and growth in the difficult parts of your journey, not just the successful moments?

---

## 🎯 Your Motivation Profile

### Current Goal Analysis:
**Write about your most important current goal:**

1. **The Goal**: What are you working toward?
2. **Surface Motivation**: What initially excited you about this goal?
3. **Deep Motivation**: Why does this goal truly matter to you?
4. **Values Connection**: How does this goal reflect your core values?
5. **Resilience Opportunity**: How is pursuing this goal building your resilience?

### Motivation Sustainability Plan:
**Create your personal motivation sustainability strategy:**

1. **Purpose Reminders**: How will you regularly reconnect with your deeper "why"?
2. **Progress Celebration**: How will you acknowledge growth and learning along the way?
3. **Challenge Reframing**: How will you view obstacles as resilience-building opportunities?
4. **Emotional Support**: Who can help you maintain motivation during difficult periods?
5. **Meaning Rituals**: What practices will help you find meaning in the daily work?

**Reflection Prompt**: *Take a moment to reflect: what does your goal mean to you, and how can your emotional intelligence sustain your journey?*
    """,
    "challenge": """
# 7-Day Motivation & Resilience Challenge

Since you now understand how emotional intelligence fuels sustainable motivation: **LET'S PRACTICE!!**

## 🎯 Your Mission

Reflect on a personal goal and use emotional intelligence to deepen and sustain your motivation. Create a "motivation booster" system that you can use whenever you need encouragement.

## 📅 Daily Practice Schedule

### **Day 1: Goal Audit and Purpose Discovery**
- **Focus**: Identify your most important current goal and explore your deeper motivations
- **Activity**: Write about why this goal matters beyond the achievement itself
- **Technique**: Ask yourself "Why?" five times to get to the core motivation
- **Reflection**: What values does this goal represent? How does it contribute to your growth?

### **Day 2: Motivation Archaeology**
- **Focus**: Dig deeper into the emotional roots of your motivation
- **Activity**: Identify the emotions that fuel your drive (pride, love, service, growth, etc.)
- **Technique**: Connect your goal to specific people, experiences, or values that matter to you
- **Reflection**: What emotional triggers can reignite your motivation when it fades?

### **Day 3: Challenge Reframing**
- **Focus**: Transform obstacles from motivation-killers into resilience-builders
- **Activity**: Identify current challenges in pursuing your goal and reframe them positively
- **Technique**: For each obstacle, ask "How is this challenge building my resilience?"
- **Reflection**: How can difficulties become part of your growth story rather than roadblocks?

### **Day 4: Progress Recognition**
- **Focus**: Celebrate the journey and acknowledge growth already achieved
- **Activity**: Document all progress, learning, and growth since starting your goal
- **Technique**: Create a "wins list" including both outcomes and character development
- **Reflection**: How has pursuing this goal already changed you for the better?

### **Day 5: Motivation Booster Creation**
- **Focus**: Create your personal motivation renewal system
- **Activity**: Build a collection of reminders, quotes, images, and reasons that reignite your drive
- **Technique**: Include emotional triggers, value connections, and progress evidence
- **Reflection**: What specific reminders most effectively reconnect you to your purpose?

### **Day 6: Support System Activation**
- **Focus**: Engage your support network in sustaining your motivation
- **Activity**: Share your goal and deeper motivations with someone who can encourage you
- **Technique**: Ask for specific support in maintaining motivation during difficult periods
- **Reflection**: How does sharing your deeper "why" with others strengthen your commitment?

### **Day 7: Integration and Commitment Renewal**
- **Focus**: Integrate insights and renew your commitment with enhanced understanding
- **Activity**: Write a new commitment statement that includes your deeper motivations
- **Technique**: Combine your original goal with your discovered values and growth opportunities
- **Reflection**: How has this week changed your relationship with your goal and motivation?

## 🛠️ Motivation & Resilience Toolkit

### **When Motivation Feels Low:**
1. **Purpose Reconnection**: Review your deeper "why" and values connection
2. **Progress Review**: Look at your growth and learning, not just outcomes
3. **Meaning-Making**: Find significance in current challenges and obstacles
4. **Emotional Check-In**: Acknowledge current feelings without judgment
5. **Support Activation**: Reach out to people who believe in your journey

### **For Building Resilience Through Goals:**
1. **Challenge Reframing**: View obstacles as resilience training opportunities
2. **Growth Mindset**: Focus on learning and development over perfection
3. **Process Appreciation**: Find joy and meaning in the daily work
4. **Setback Recovery**: Have a plan for getting back on track after difficulties
5. **Identity Integration**: Let pursuing the goal become part of who you are

### **Motivation Booster Elements:**
1. **Visual Reminders**: Photos, quotes, or symbols that connect to your deeper why
2. **Story Collection**: Examples of others who overcame similar challenges
3. **Values Statements**: Written reminders of what this goal represents
4. **Progress Evidence**: Documentation of growth and learning achieved
5. **Future Vision**: Clear picture of who you'll become through this journey

## 📊 Success Metrics

Track your motivation and resilience development:

### **Motivation Sustainability:**
- **Consistency**: How regularly are you taking action toward your goal?
- **Enthusiasm**: How do you feel about your goal compared to when you started?
- **Purpose Clarity**: How clear are you about why this goal matters?
- **Resilience**: How quickly do you recover from setbacks or bad days?

### **Emotional Intelligence Application:**
- **Self-Awareness**: How well do you recognize motivation fluctuations?
- **Self-Regulation**: How effectively do you manage discouragement?
- **Values Alignment**: How connected do you feel to your deeper purpose?
- **Growth Mindset**: How well do you find meaning in challenges?

## 💬 Share Your Journey

**Try to journal this process!!** Document your motivation transformation by writing about:

### **Motivation Discovery:**
- What deeper motivations did you discover about your goal?
- How did connecting to your values change your perspective?
- What surprised you about your emotional relationship with your goal?

### **Resilience Building:**
- How are current challenges building your resilience?
- What have you learned about yourself through pursuing this goal?
- How has your relationship with setbacks and obstacles evolved?

### **Practical Application:**
- Which motivation techniques work best for you?
- How has emotional intelligence enhanced your goal pursuit?
- What advice would you give to someone facing similar motivation challenges?

**Feel free to share how you felt in the discussion section below!**

Remember: **Sustainable motivation comes from emotional intelligence—knowing yourself, managing your emotions, and connecting deeply to what matters most to you.** When you understand the emotional roots of your drive, you can maintain motivation even through the most challenging periods.
    """,
    "quiz": json.dumps({
        "questions": [
            {
                "id": 1,
                "question": "In Sarah's story, what reconnected her to her motivation?",
                "type": "multiple_choice",
                "options": [
                    "The excitement of race day approaching",
                    "Rediscovering her reasons for starting the marathon journey",
                    "Her coach pushing her to train harder",
                    "Comparing herself to other runners"
                ],
                "correct_answer": 1,
                "explanation": "Sarah's coach helped her reconnect with her original purpose: proving to herself that she could push through mental and physical limits. This deeper motivation sustained her through the difficult training period."
            },
            {
                "id": 2,
                "question": "Which of the following best describes motivation driven by emotional intelligence?",
                "type": "multiple_choice",
                "options": [
                    "Focusing only on external rewards and recognition",
                    "Harnessing personal reasons that connect to your values and growth",
                    "Avoiding any emotional connection to goals",
                    "Relying solely on willpower and discipline"
                ],
                "correct_answer": 1,
                "explanation": "EI-powered motivation connects to personal values, character development, and meaningful growth rather than just external outcomes. This creates sustainable drive that persists through challenges."
            },
            {
                "id": 3,
                "question": "You've set a goal to complete a project at work, but halfway through, it feels tedious. How might emotional intelligence help you regain motivation?",
                "type": "multiple_choice",
                "options": [
                    "Push through with pure willpower and ignore the feelings",
                    "Acknowledge your initial reasons and focus on the purpose of the work",
                    "Give up and choose an easier project",
                    "Complain to colleagues about how boring the project is"
                ],
                "correct_answer": 1,
                "explanation": "Emotional intelligence involves acknowledging your feelings while reconnecting with your deeper purpose. Understanding why the project matters and what you'll learn from it can reignite motivation."
            },
            {
                "id": 4,
                "question": "Which actions reflect using emotional intelligence to stay motivated? (Select all that apply)",
                "type": "multiple_select",
                "options": [
                    "Regularly revisiting why a goal matters to you",
                    "Ignoring emotional obstacles and pushing through",
                    "Recognizing emotional obstacles and finding ways to address them",
                    "Celebrating small milestones along the way",
                    "Comparing your progress to others constantly"
                ],
                "correct_answers": [0, 2, 3],
                "explanation": "EI-powered motivation involves reconnecting with purpose, addressing emotional challenges constructively, and celebrating progress. Ignoring emotions or constant comparison undermines sustainable motivation."
            },
            {
                "id": 5,
                "question": "Emotional intelligence is only useful at the beginning of a challenging journey, not during setbacks.",
                "type": "true_false",
                "correct_answer": False,
                "explanation": "Emotional intelligence is especially valuable during setbacks and challenging periods. It helps you process difficult emotions, reconnect with purpose, and maintain resilience when motivation naturally fluctuates."
            },
            {
                "id": 6,
                "question": "What was the key difference between Sarah's initial motivation and her renewed motivation?",
                "type": "multiple_choice",
                "options": [
                    "She focused more on winning the race",
                    "She shifted from outcome-focused to process and growth-focused motivation",
                    "She trained with more intensity",
                    "She set easier, more achievable goals"
                ],
                "correct_answer": 1,
                "explanation": "Sarah shifted from focusing solely on the finish line (outcome) to appreciating each mile as a lesson in resilience (process). This process-focused, growth-oriented motivation proved more sustainable through challenges."
            }
        ]
    }),
    "order": 7,  # This should come after the empathy lesson
    "module_number": 2,  # Part of the Emotional Intelligence module
    "is_published": True
}

async def add_lesson_5():
    """Add Lesson 5: Motivation and Resilience to the database."""
    async with AsyncSession(engine) as session:
        try:
            # Check if lesson already exists
            result = await session.execute(
                text("SELECT COUNT(*) FROM lesson WHERE slug = :slug"), 
                {"slug": LESSON_5_DATA["slug"]}
            )
            existing_count = result.scalar()
            
            if existing_count and existing_count > 0:
                print("✅ Lesson 5: Motivation and Resilience already exists. Skipping creation.")
                return
            
            print("🚀 Creating Lesson 5: Motivation and Resilience...")
            
            # Create lesson object with current timestamp
            lesson = Lesson(
                **LESSON_5_DATA,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            session.add(lesson)
            await session.commit()
            await session.refresh(lesson)
            
            print(f"✅ Successfully created Lesson 5: Motivation and Resilience!")
            print(f"   📝 Title: {lesson.title}")
            print(f"   🔗 Slug: {lesson.slug}")
            print(f"   📊 Order: {lesson.order}")
            print(f"   📚 Module: {lesson.module_number} (Emotional Intelligence)")
            print(f"   🆔 ID: {lesson.id}")
            
        except Exception as e:
            print(f"❌ Error creating lesson: {e}")
            raise

async def verify_lesson_and_module():
    """Verify the lesson was created and show complete Module 2 structure."""
    async with AsyncSession(engine) as session:
        # Check our new lesson
        result = await session.execute(
            text("SELECT id, title, slug, \"order\", module_number FROM lesson WHERE slug = :slug"),
            {"slug": LESSON_5_DATA["slug"]}
        )
        lesson = result.first()
        
        if lesson:
            print(f"\n📊 New lesson verification:")
            print(f"   ✅ Lesson found in database")
            print(f"   📝 ID: {lesson.id}")
            print(f"   📚 Title: {lesson.title}")
            print(f"   📊 Order: {lesson.order}")
            print(f"   🏷️  Module: {lesson.module_number}")
        
        # Show complete Module 2 (Emotional Intelligence) structure
        result = await session.execute(
            text("SELECT id, title, \"order\" FROM lesson WHERE module_number = 2 ORDER BY \"order\"")
        )
        module_2_lessons = result.fetchall()
        
        print(f"\n📚 Complete Module 2: Emotional Intelligence lessons:")
        for lesson in module_2_lessons:
            print(f"   Order {lesson.order}: {lesson.title} (ID: {lesson.id})")
        
        print(f"\n🎓 Module 2 now includes {len(module_2_lessons)} comprehensive EI lessons!")

async def main():
    """Main function to add and verify the lesson."""
    print("🎓 Adding Lesson 5: Motivation and Resilience")
    print("=" * 60)
    
    await add_lesson_5()
    await verify_lesson_and_module()
    
    print("\n" + "=" * 60)
    print("✅ Lesson 5: Motivation and Resilience creation completed!")
    print("🌐 You can now view it in your course at: http://localhost:5173")
    print("💡 This lesson focuses on sustainable motivation through emotional intelligence")
    print("🏃‍♀️ Features Sarah's inspiring marathon story about purpose-driven motivation")

if __name__ == "__main__":
    asyncio.run(main())
