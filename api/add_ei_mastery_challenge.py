#!/usr/bin/env python3
"""
Script to add the 15-Day Emotional Intelligence Mastery Plan
This can be added as a comprehensive challenge to an existing lesson or as a new lesson
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

# 15-Day EI Mastery Plan content
EI_MASTERY_PLAN = """
# 15-Day Emotional Intelligence Mastery Plan

**Objective**: Over the next 15 days, you'll dive into simple, meaningful practices to develop your emotional intelligence (EI). Each day's task is designed to be short and impactful—so by the end of this journey, you'll feel more connected, more aware, and ready to use EI in real-life situations!

## Phase 1: Self-Assessment & Goal Setting (Days 1–2)

### **Day 1: Self-Assessment**
Take a moment to sit with yourself and explore your strengths and areas to grow in each EI skill:

- **Self-Awareness**: How well do you know and recognize your emotions?
- **Self-Regulation**: How good are you at staying calm when things get tough?
- **Empathy**: Do you truly listen and connect with others' feelings?
- **Social Skills**: Are you able to communicate clearly and with ease?
- **Motivation**: What keeps you going when challenges arise?

**Rate yourself for each skill on a scale of 1 to 5.** Don't worry if some areas feel lower—they're just growth opportunities!

### **Day 2: Set Your EI Goals**
Let's set two meaningful goals for this journey. Based on your self-assessment, choose two skills to focus on. Here's a guide:

- **Self-Regulation Goal**: "I'll practice a deep breathing exercise daily to stay calm."
- **Empathy Goal**: "I'll make an effort to fully listen to others without interrupting."

**These goals are your anchors for the next two weeks**, keeping you motivated and focused!

---

## Phase 2: Daily Action Tasks & Practice (Days 3–10)

Each day's activity is quick but powerful, building one step at a time. Use these moments to pause and connect with yourself:

### **Day 3: Self-Awareness**
**Task**: Notice an emotion you feel today and write a sentence about what triggered it. This small act of awareness will grow with each step!

### **Day 4: Self-Regulation**
**Task**: During a stressful moment, pause and take 3 deep breaths to center yourself. Feel the difference it makes in your calm.

### **Day 5: Empathy**
**Task**: In a conversation today, listen closely and repeat back what the other person says to show understanding.

### **Day 6: Motivation**
**Task**: Reflect on a personal goal. Why does it matter to you? Write down your "why"—this is your fuel when things get challenging.

### **Day 7: Social Skills**
**Task**: Ask a clarifying question during a group discussion to show engagement and interest. Your curiosity strengthens connections.

### **Day 8: Self-Awareness**
**Task**: Keep a brief mood journal today. Notice any patterns—these insights are the start of better self-awareness.

### **Day 9: Self-Regulation**
**Task**: Use positive self-talk during a challenging task, like "I've got this" or "One step at a time." See how it shifts your mindset.

### **Day 10: Empathy**
**Task**: Observe someone's body language today and imagine what they might be feeling. Respond with kindness or a smile—small actions make a big impact.

---

## Phase 3: Real-Life Application & Reflection (Days 11–13)

### **Day 11: Choose Your EI Scenario**
Think about an upcoming or recent situation where you can apply your EI skills—perhaps a team meeting, a tough conversation, or a family discussion.

### **Day 12: Put EI into Action**
In the chosen scenario, focus on using the EI skills you've been practicing. Notice how self-awareness, empathy, or calm helps you respond thoughtfully.

### **Day 13: Reflect on Your Experience**
Write a short reflection about what happened. Consider these questions:
- Which EI skills did you use?
- How did your approach differ from your usual response?
- What impact did your response have on the situation and on others?

---

## Phase 4: Final Reflection & Your Personal EI Action Plan (Days 14–15)

### **Day 14: Summarize Your Key Takeaways**
Write down what you've learned about yourself over the last two weeks. Which skills came most naturally, and which ones did you find challenging? **Take pride in each insight—they're steps in your EI journey!**

### **Day 15: Create a Personal EI Action Plan**
Using what you've learned, create a simple plan to keep building your EI. Here's a framework to start:

- **Self-Awareness Practice**: "Reflect on emotions after challenging moments."
- **Empathy Practice**: "Listen fully before responding, especially when in a hurry."
- **Self-Regulation Practice**: "Use deep breathing before stressful situations."

**Optional**: Share your experience with a peer or mentor. Let them know your goals and ask for support on this journey.

---

## 🎯 **Success Indicators**

By the end of 15 days, you should notice:
- **Increased emotional awareness** in daily situations
- **Better emotional regulation** during stress or conflict
- **Improved listening skills** and deeper connections with others
- **More thoughtful responses** rather than reactive behaviors
- **Enhanced motivation** connected to your deeper values
- **Stronger relationships** through empathetic communication

## 💡 **Tips for Success**

1. **Start Small**: Each day's task is designed to be manageable - don't overthink it
2. **Be Consistent**: Daily practice builds neural pathways for lasting change
3. **Stay Curious**: Approach each task with genuine curiosity about yourself and others
4. **Practice Self-Compassion**: Be kind to yourself as you develop these skills
5. **Document Your Journey**: Keep notes about insights and progress
6. **Share Your Experience**: Consider discussing your learning with trusted others

**Remember**: Emotional intelligence is a lifelong journey, not a destination. These 15 days are just the beginning of developing skills that will serve you in every area of life!
"""

async def add_mastery_plan():
    """Add the 15-Day EI Mastery Plan as an enhanced challenge to an existing lesson."""
    async with AsyncSession(engine) as session:
        try:
            # Find the "Welcome to Emotional Intelligence Module" lesson to enhance
            result = await session.execute(
                text("SELECT id, title, challenge FROM lesson WHERE title LIKE '%Welcome to Emotional Intelligence%' AND module_number = 2")
            )
            lesson = result.first()
            
            if not lesson:
                print("❌ Could not find the EI module introduction lesson to enhance.")
                return
            
            print(f"🚀 Enhancing lesson: {lesson.title}")
            print("📚 Adding 15-Day EI Mastery Plan as comprehensive challenge...")
            
            # Update the lesson with the enhanced challenge content
            await session.execute(
                text("UPDATE lesson SET challenge = :new_challenge, updated_at = :updated_at WHERE id = :lesson_id"),
                {
                    "new_challenge": EI_MASTERY_PLAN,
                    "updated_at": datetime.utcnow(),
                    "lesson_id": lesson.id
                }
            )
            
            await session.commit()
            
            print(f"✅ Successfully added 15-Day EI Mastery Plan!")
            print(f"   📝 Enhanced Lesson: {lesson.title}")
            print(f"   🆔 Lesson ID: {lesson.id}")
            print(f"   📊 Challenge Content: 15-day comprehensive EI development program")
            
        except Exception as e:
            print(f"❌ Error adding mastery plan: {e}")
            raise

async def verify_enhancement():
    """Verify the mastery plan was added correctly."""
    async with AsyncSession(engine) as session:
        result = await session.execute(
            text("SELECT id, title, LEFT(challenge, 100) as challenge_preview FROM lesson WHERE title LIKE '%Welcome to Emotional Intelligence%' AND module_number = 2")
        )
        lesson = result.first()
        
        if lesson and "15-Day" in lesson.challenge_preview:
            print(f"\n📊 Enhancement verification:")
            print(f"   ✅ 15-Day EI Mastery Plan successfully added")
            print(f"   📝 Lesson ID: {lesson.id}")
            print(f"   📚 Title: {lesson.title}")
            print(f"   🎯 Challenge Preview: {lesson.challenge_preview}...")
        else:
            print("❌ Enhancement not found or not properly added")

async def main():
    """Main function to add the EI Mastery Plan."""
    print("🧠 Adding 15-Day Emotional Intelligence Mastery Plan")
    print("=" * 60)
    
    await add_mastery_plan()
    await verify_enhancement()
    
    print("\n" + "=" * 60)
    print("✅ 15-Day EI Mastery Plan enhancement completed!")
    print("🌐 You can now access it in the Challenge tab of the EI module introduction")
    print("📅 Provides comprehensive 15-day structured EI development program")
    print("🎯 Perfect for learners who want intensive, guided EI skill building")

if __name__ == "__main__":
    asyncio.run(main())
