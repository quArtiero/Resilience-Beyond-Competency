#!/usr/bin/env python3
"""
Script to add Lesson 4: Building Empathy
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

# Lesson 4 content: Building Empathy
LESSON_4_DATA = {
    "slug": "lesson-4-building-empathy",
    "title": "Building Empathy",
    "story": """
# The Customer Service Miracle

Sophie had been working in customer service for years, but she had never encountered a customer quite like Mr. Harris. He had called in, furious about an order mix-up that had left him without the product he needed for an important event. His voice boomed through the phone as he vented his frustration, and for a moment, Sophie felt defensive. It wasn't her fault that the order had gone wrong, and she could feel herself wanting to explain that.

But Sophie had learned a valuable lesson about empathy early in her career: **customers didn't just want their problems solved—they wanted to feel understood**. So, instead of rushing to fix the issue or explain what went wrong, Sophie listened. She didn't just hear Mr. Harris's words—she listened to the emotion behind them. He wasn't just angry about the order; he was stressed because he needed the product urgently, and the mistake had thrown off his plans.

> *"I understand why you're frustrated,"* Sophie said gently. *"Let me make this right for you."*

Her words had an immediate effect. Mr. Harris's tone softened, and the tension in his voice eased. By the end of the call, not only had Sophie resolved the issue, but Mr. Harris thanked her for her understanding and promised to continue shopping with the company.

## 🎯 Key Takeaways

Sophie's story shows how powerful empathy can be. By taking the time to understand the customer's frustration, she was able to turn a negative experience into a positive one. **Empathy is about more than just hearing someone—it's about understanding their emotions and responding in a way that acknowledges their feelings.**

### What Made Sophie's Response Effective?

1. **Active Listening**: She listened to both words and emotions
2. **Perspective-Taking**: She understood Mr. Harris's stress beyond the immediate complaint
3. **Emotional Validation**: She acknowledged his feelings before addressing the problem
4. **Solution Focus**: After showing understanding, she focused on making it right
5. **Genuine Care**: Her response was authentic and caring, not scripted

### The Empathy Advantage

**In Professional Settings:**
- Builds stronger relationships with colleagues and clients
- Reduces conflict and misunderstandings
- Improves team collaboration and communication
- Enhances leadership effectiveness
- Increases customer satisfaction and loyalty

**In Personal Relationships:**
- Deepens connections with family and friends
- Reduces relationship conflicts
- Improves communication and understanding
- Builds trust and emotional safety
- Enhances overall relationship satisfaction
    """,
    "reflection": """
# Reflection on Building Empathy

## 🤔 Personal Connection

Have you ever been in a conversation where you felt like the other person wasn't listening? What about a time when someone truly understood how you felt? How did that change the way you communicated?

### Deep Reflection Questions:

1. **Listening Skills Assessment**: How well do you listen to others during conversations? Do you listen to respond, or do you listen to understand?

2. **Emotional Understanding**: How can you better understand the emotions behind people's words? What clues do you look for?

3. **Perspective-Taking**: When someone is upset or frustrated, how often do you try to see the situation from their point of view?

4. **Response Patterns**: Do you tend to immediately offer solutions, or do you first acknowledge how the person is feeling?

---

## 💭 Scenario-Based Reflection

**Consider this workplace scenario**: A colleague approaches you, clearly stressed, and says: *"This project is impossible! The deadlines are unrealistic, and I don't think I can handle it."*

### Two Different Response Approaches:

**Response A (Problem-Focused)**: 
*"Have you tried breaking it down into smaller tasks? Maybe you should talk to the manager about extending the deadline."*

**Response B (Empathy-First)**: 
*"It sounds like you're feeling really overwhelmed right now. That must be stressful to feel like the expectations are beyond what's manageable."*

### Reflection Questions:
- Which response would make you feel more understood?
- How might each response affect the conversation that follows?
- What would happen if you combined empathy with problem-solving?

---

## 🔍 Self-Assessment: Your Empathy Skills

Rate yourself honestly (1-5 scale) on these empathy dimensions:

1. **Active Listening**: I give people my full attention when they speak
2. **Emotional Recognition**: I can identify emotions in others' voices and expressions
3. **Perspective-Taking**: I try to understand situations from others' viewpoints
4. **Emotional Validation**: I acknowledge others' feelings before offering solutions
5. **Genuine Care**: My responses come from authentic concern for others

### Areas for Growth:
- Which dimension scored lowest for you?
- What specific situations challenge your empathy the most?
- Who in your life could benefit from more empathetic responses from you?

---

## 🎯 Empathy in Action

**This week, commit to practicing empathy in one specific relationship or situation.** 

### Your Empathy Goal:
Write about:
- **Who** you'll practice empathy with (colleague, family member, friend)
- **What** specific empathy skills you'll focus on (listening, validation, perspective-taking)
- **When** you'll be most intentional about practicing (during meetings, conversations, conflicts)
- **How** you'll remind yourself to respond with empathy first

### Reflection Prompt:
*How would your relationships change if you made an effort to truly listen to others, not just to their words, but to the emotions behind them?*
    """,
    "challenge": """
# 7-Day Empathy Building Challenge

Since you now know how to apply empathy to your life: **LET'S PRACTICE!!**

## 🎯 Your Mission

Over the next week, make a conscious effort to practice empathy in your conversations. When someone is speaking, focus on listening to both their words and their emotions. Reflect on how this changes the dynamic of the conversation.

## 📅 Daily Practice Schedule

### **Day 1: Active Listening Foundation**
- **Focus**: Practice active listening during conversations
- **Goal**: Give your full attention to at least 3 conversations today
- **Technique**: Put away devices, make eye contact, avoid interrupting
- **Reflection**: Notice how people respond when they feel truly heard

### **Day 2: Emotional Awareness**
- **Focus**: Listen for emotions behind the words
- **Goal**: Identify the feelings people express, not just the facts
- **Technique**: Ask yourself "What emotion is this person experiencing?"
- **Reflection**: How does recognizing emotions change your understanding?

### **Day 3: Empathetic Responding**
- **Focus**: Respond with empathy and observe the outcome
- **Goal**: Acknowledge feelings before offering solutions or advice
- **Technique**: Start responses with "It sounds like you're feeling..." or "That must be..."
- **Reflection**: How do people react when you validate their emotions first?

### **Day 4: Perspective-Taking Practice**
- **Focus**: Try to see situations from others' viewpoints
- **Goal**: Before responding, ask yourself "How would I feel in their situation?"
- **Technique**: Imagine you're in their position with their circumstances
- **Reflection**: How does perspective-taking change your responses?

### **Day 5: Difficult Conversation Empathy**
- **Focus**: Practice empathy during challenging or tense conversations
- **Goal**: Stay empathetic even when you disagree or feel defensive
- **Technique**: Focus on understanding their experience, not defending your position
- **Reflection**: How does empathy affect conflict resolution?

### **Day 6: Workplace Empathy**
- **Focus**: Apply empathy in professional settings
- **Goal**: Practice empathetic leadership or collaboration
- **Technique**: Consider colleagues' perspectives during meetings and decisions
- **Reflection**: How does workplace empathy affect team dynamics?

### **Day 7: Integration and Planning**
- **Focus**: Reflect on the week and plan for ongoing empathy practice
- **Goal**: Identify which empathy skills to continue developing
- **Technique**: Choose 1-2 empathy practices to make habitual
- **Reflection**: What changes have you noticed in your relationships?

## 🛠️ Empathy Techniques Toolkit

### **Active Listening Techniques:**
1. **Full Attention**: Put away distractions, face the person, make appropriate eye contact
2. **Minimal Encouragers**: Use "mm-hmm," "I see," "tell me more" to show engagement
3. **Paraphrasing**: "So what I'm hearing is..." to confirm understanding
4. **Emotional Reflection**: "It sounds like you're feeling..." to validate emotions

### **Perspective-Taking Techniques:**
1. **The Switch**: Imagine you're in their exact situation with their background
2. **The Why**: Ask "What might make someone feel/act this way?"
3. **The Context**: Consider their current stress, challenges, or circumstances
4. **The History**: Think about their past experiences that might influence their reaction

### **Empathetic Response Techniques:**
1. **Validate First**: Acknowledge feelings before addressing facts
2. **Use Empathetic Language**: "That must be difficult," "I can understand why you'd feel that way"
3. **Ask Clarifying Questions**: "Help me understand..." "What's that like for you?"
4. **Avoid Immediate Solutions**: Resist the urge to fix before understanding

## 📊 Success Metrics

Track your empathy development by noting:

### **Conversation Quality:**
- **Duration**: Do conversations last longer when you're empathetic?
- **Depth**: Do people share more when they feel understood?
- **Resolution**: Are conflicts resolved more easily?
- **Connection**: Do you feel more connected to others?

### **Relationship Changes:**
- **Trust**: Do people seem to trust you more?
- **Openness**: Are others more open with you?
- **Collaboration**: Is teamwork more effective?
- **Conflict**: Are disagreements less frequent or intense?

### **Personal Growth:**
- **Awareness**: Are you more aware of others' emotions?
- **Patience**: Are you less quick to judge or react?
- **Understanding**: Do you see situations from multiple perspectives?
- **Compassion**: Do you feel more caring toward others?

## 💬 Journal Your Empathy Journey

**Try to journal this process!!** Consider documenting:

### **Daily Empathy Moments:**
- **Situation**: What conversation or interaction stood out?
- **Empathy Applied**: Which technique did you use?
- **Response**: How did the other person react?
- **Learning**: What did you discover about empathy or yourself?

### **Weekly Reflection:**
- **Biggest Success**: When did empathy make the most difference?
- **Greatest Challenge**: What situation was hardest to respond to empathetically?
- **Relationship Impact**: How did your relationships change this week?
- **Personal Growth**: What did you learn about yourself and others?

### **Empathy Insights:**
- Which empathy techniques work best for you?
- What barriers to empathy did you discover?
- How does practicing empathy affect your own emotional state?
- What surprised you about others' responses to empathy?

**Feel free to share how you felt in the discussion section below!**

Remember: **Empathy is a skill that grows stronger with practice.** The more you consciously practice understanding others' perspectives and emotions, the more natural and effective it becomes.
    """,
    "quiz": json.dumps({
        "questions": [
            {
                "id": 1,
                "question": "What is the key lesson Sophie learned about customer service and empathy?",
                "type": "multiple_choice",
                "options": [
                    "Always apologize even when it's not your fault",
                    "Customers want to feel understood, not just have their problems solved",
                    "Fix the problem as quickly as possible without discussion",
                    "Explain company policies to justify what happened"
                ],
                "correct_answer": 1,
                "explanation": "Sophie learned that customers need emotional validation and understanding, not just technical problem-solving. Feeling heard and understood is often as important as getting the issue resolved."
            },
            {
                "id": 2,
                "question": "What effect did Sophie's empathetic response have on Mr. Harris during the call?",
                "type": "multiple_choice",
                "options": [
                    "He became more angry and demanded compensation",
                    "He hung up the phone immediately",
                    "His tone softened and the tension eased",
                    "He asked to speak to a manager"
                ],
                "correct_answer": 2,
                "explanation": "When Sophie showed genuine understanding and empathy, Mr. Harris's emotional state immediately shifted. His tone softened and tension eased because he felt heard and understood."
            },
            {
                "id": 3,
                "question": "What is empathy in the context of the story?",
                "type": "multiple_choice",
                "options": [
                    "Agreeing with everything the customer says",
                    "Feeling sorry for people who have problems",
                    "Seeing the world from someone else's perspective and understanding their emotions",
                    "Solving problems quickly without emotional discussion"
                ],
                "correct_answer": 2,
                "explanation": "Empathy is the ability to understand and share the feelings of others by seeing situations from their perspective. It's about emotional understanding, not just agreement or sympathy."
            },
            {
                "id": 4,
                "question": "Which of the following are effective ways to show empathy in a conversation? (Select all that apply)",
                "type": "multiple_select",
                "options": [
                    "Making eye contact and actively listening",
                    "Interrupting to share your own similar experience",
                    "Acknowledging the other person's feelings",
                    "Immediately offering solutions to fix their problem",
                    "Asking clarifying questions to understand better"
                ],
                "correct_answers": [0, 2, 4],
                "explanation": "Effective empathy involves active listening with eye contact, acknowledging feelings, and asking questions to understand better. Interrupting or rushing to solutions can prevent true empathetic connection."
            },
            {
                "id": 5,
                "question": "Empathy requires you to always agree with the other person's perspective.",
                "type": "true_false",
                "correct_answer": False,
                "explanation": "Empathy is about understanding and acknowledging someone's feelings and perspective, not necessarily agreeing with them. You can empathize with someone's emotions while having different views on the situation."
            },
            {
                "id": 6,
                "question": "You're managing a team, and one of your team members has been missing deadlines. Instead of assuming laziness, what might an empathetic leader do?",
                "type": "multiple_choice",
                "options": [
                    "Immediately write them up for poor performance",
                    "Speak to the team member privately, asking if there's something personal affecting their work",
                    "Announce to the team that missing deadlines is unacceptable",
                    "Ignore the issue and hope it resolves itself"
                ],
                "correct_answer": 1,
                "explanation": "An empathetic leader would seek to understand the root cause by having a private, caring conversation. There might be personal challenges, workload issues, or other factors affecting performance that can be addressed with understanding."
            }
        ]
    }),
    "order": 6,  # This should come after the other EI lessons
    "module_number": 2,  # Part of the Emotional Intelligence module
    "is_published": True
}

async def add_lesson_4():
    """Add Lesson 4: Building Empathy to the database."""
    async with AsyncSession(engine) as session:
        try:
            # Check if lesson already exists
            result = await session.execute(
                text("SELECT COUNT(*) FROM lesson WHERE slug = :slug"), 
                {"slug": LESSON_4_DATA["slug"]}
            )
            existing_count = result.scalar()
            
            if existing_count and existing_count > 0:
                print("✅ Lesson 4: Building Empathy already exists. Skipping creation.")
                return
            
            print("🚀 Creating Lesson 4: Building Empathy...")
            
            # Create lesson object with current timestamp
            lesson = Lesson(
                **LESSON_4_DATA,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            session.add(lesson)
            await session.commit()
            await session.refresh(lesson)
            
            print(f"✅ Successfully created Lesson 4: Building Empathy!")
            print(f"   📝 Title: {lesson.title}")
            print(f"   🔗 Slug: {lesson.slug}")
            print(f"   📊 Order: {lesson.order}")
            print(f"   📚 Module: {lesson.module_number} (Emotional Intelligence)")
            print(f"   🆔 ID: {lesson.id}")
            
        except Exception as e:
            print(f"❌ Error creating lesson: {e}")
            raise

async def verify_lesson():
    """Verify the lesson was created correctly and show module structure."""
    async with AsyncSession(engine) as session:
        # Check our new lesson
        result = await session.execute(
            text("SELECT id, title, slug, \"order\", module_number FROM lesson WHERE slug = :slug"),
            {"slug": LESSON_4_DATA["slug"]}
        )
        lesson = result.first()
        
        if lesson:
            print(f"\n📊 New lesson verification:")
            print(f"   ✅ Lesson found in database")
            print(f"   📝 ID: {lesson.id}")
            print(f"   📚 Title: {lesson.title}")
            print(f"   📊 Order: {lesson.order}")
            print(f"   🏷️  Module: {lesson.module_number}")
        
        # Show all Module 2 (Emotional Intelligence) lessons
        result = await session.execute(
            text("SELECT id, title, \"order\" FROM lesson WHERE module_number = 2 ORDER BY \"order\"")
        )
        module_2_lessons = result.fetchall()
        
        print(f"\n📚 Module 2: Emotional Intelligence lessons:")
        for lesson in module_2_lessons:
            print(f"   Order {lesson.order}: {lesson.title} (ID: {lesson.id})")

async def main():
    """Main function to add and verify the lesson."""
    print("🎓 Adding Lesson 4: Building Empathy")
    print("=" * 60)
    
    await add_lesson_4()
    await verify_lesson()
    
    print("\n" + "=" * 60)
    print("✅ Lesson 4: Building Empathy creation completed!")
    print("🌐 You can now view it in your course at: http://localhost:5173")
    print("💡 This lesson focuses on active listening and perspective-taking skills")

if __name__ == "__main__":
    asyncio.run(main())
