#!/usr/bin/env python3
"""
Script to add Lesson 6: Conflict Resolution Using Emotional Intelligence
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

# Lesson 6 content: Conflict Resolution Using Emotional Intelligence
LESSON_6_DATA = {
    "slug": "lesson-6-conflict-resolution-emotional-intelligence",
    "title": "Conflict Resolution Using Emotional Intelligence",
    "story": """
# The Team's Turning Point

James managed a diverse team of professionals in a competitive tech firm. The team had ambitious targets, but tensions simmered below the surface. A recent project deadline exposed cracks in their communication. James noticed that during meetings, team members interrupted each other, avoided eye contact, and left feeling more stressed than united. **The pressure to perform was tearing the team apart**.

One day, a minor disagreement spiraled into a heated argument between two team members, blocking progress and deepening mistrust. As the leader, James knew he had to step in, but he also recognized that pointing fingers would only worsen the divide. Instead, he called a team meeting focused solely on **rebuilding trust and resolving conflicts productively**.

He started the meeting with empathy, acknowledging the pressure everyone was under. Then, he asked each team member to share how the situation made them feel. For the first time, the team shared openly, admitting feelings of frustration, fear of failure, and stress. James facilitated the conversation, guiding them to listen to each other's experiences without judgment. 

By the end of the meeting, they understood each other's perspectives better, which led to a renewed sense of solidarity.

## 🎯 Key Takeaways

James's approach demonstrates how **emotional intelligence transforms conflict from destructive force into constructive opportunity**. By acknowledging and respecting emotions, you create a safe space for genuine conflict resolution.

### What Made James's Approach Effective?

1. **Emotional Recognition**: He noticed the team's stress and communication breakdown
2. **Self-Regulation**: He controlled his impulse to assign blame or give quick fixes
3. **Empathy**: He acknowledged everyone's feelings and pressure
4. **Social Awareness**: He understood the group dynamics and underlying tensions
5. **Relationship Management**: He facilitated open dialogue and mutual understanding
6. **Safe Space Creation**: He made it acceptable to share vulnerable feelings

### The EI Conflict Resolution Framework

**Traditional Conflict Response**: Focus on who's right, assign blame, enforce solutions
**EI Conflict Response**: Understand all perspectives, address emotions, collaborate on solutions

#### **The PEACE Method for EI Conflict Resolution:**

**P - Pause**: Take time to regulate your own emotions before responding
**E - Empathize**: Seek to understand all parties' feelings and perspectives  
**A - Acknowledge**: Validate emotions and concerns without judgment
**C - Collaborate**: Work together to find mutually acceptable solutions
**E - Evaluate**: Reflect on outcomes and relationship impact

### Why EI Makes Conflict Resolution More Effective

1. **Addresses Root Causes**: Gets to emotional needs, not just surface disagreements
2. **Preserves Relationships**: Maintains trust and respect through the process
3. **Creates Learning**: Transforms conflict into growth opportunities
4. **Prevents Escalation**: De-escalates tension through emotional validation
5. **Builds Stronger Teams**: Increases psychological safety and communication
    """,
    "reflection": """
# Reflection on Conflict Resolution Using Emotional Intelligence

## 🤔 Personal Connection

Have you been part of a team where unresolved conflicts impacted the work? What if everyone took a moment to listen to each other's perspectives with empathy?

**Imagine how much smoother collaboration would be if emotional intelligence guided your interactions during disagreements.**

### Deep Reflection Questions:

1. **Conflict Patterns**: How do you typically respond when someone disagrees with you or challenges your ideas? Do you get defensive, or do you stay curious?

2. **Empathy in Disagreement**: Do you take time to understand others' perspectives during conflicts, even when you strongly disagree?

3. **Emotional Awareness**: How well do you recognize when emotions (yours and others') are escalating during disagreements?

4. **Communication Style**: During conflicts, do you focus more on being right or on understanding and resolving the issue?

5. **Team Dynamics**: How do unresolved conflicts affect the overall atmosphere and productivity in your workplace or relationships?

---

## 💭 Conflict Scenario Analysis

**Consider this workplace conflict scenario**: 
You've proposed a new process that you believe will improve efficiency. A colleague publicly challenges your idea in a meeting, saying it's "unrealistic and will create more problems than it solves." You feel your face flush with embarrassment and frustration.

### Two Response Approaches:

**Response A (Defensive/Reactive)**: 
*"That's not true. You haven't even looked at the data I provided. This process has worked successfully in other departments."*

**Response B (EI-Guided)**: 
*"I can see you have concerns about this approach. Help me understand what specific problems you're worried about so we can address them together."*

### Reflection Questions:
- Which response is more likely to lead to productive dialogue?
- How might each response affect team dynamics and future collaboration?
- What emotions might be driving your colleague's resistance?
- How could you use the PEACE method in this situation?

---

## 🔍 Conflict Resolution Self-Assessment

Rate yourself honestly (1-5 scale) on these conflict resolution dimensions:

1. **Emotional Self-Regulation**: I stay calm and composed during disagreements
2. **Active Listening**: I listen to understand, not just to respond or defend
3. **Empathy**: I try to see conflicts from all parties' perspectives
4. **Open Communication**: I express my views clearly without attacking others
5. **Solution Focus**: I prioritize resolving issues over being right
6. **Relationship Preservation**: I consider the long-term relationship impact of my responses

### Areas for Growth:
- Which dimension is most challenging for you during conflicts?
- What specific types of conflicts trigger your strongest emotional reactions?
- Who in your life could benefit from more emotionally intelligent conflict resolution?

---

## 🎯 Your Conflict Resolution Goal

**This week, commit to applying emotional intelligence in one conflict or disagreement.**

### Your EI Conflict Plan:
Write about:
- **Situation**: What conflict or potential disagreement will you approach differently?
- **EI Skills**: Which specific EI skills will you focus on (self-regulation, empathy, active listening)?
- **PEACE Method**: How will you apply Pause, Empathize, Acknowledge, Collaborate, Evaluate?
- **Relationship Goal**: What outcome do you hope for beyond just resolving the immediate issue?

### Reflection Prompt:
*How might conflicts change if everyone approached disagreements with empathy and active listening? What would be different in your relationships and workplace?*
    """,
    "challenge": """
# 7-Day Conflict Resolution Challenge

Now that you understand how emotional intelligence transforms conflict resolution: **Let's practice!!**

## 🎯 Your Mission

Apply emotional intelligence principles to handle disagreements and conflicts more constructively. Focus on understanding all perspectives and preserving relationships while addressing issues effectively.

## 📅 Daily Practice Schedule

### **Day 1: Conflict Awareness Building**
- **Focus**: Notice conflict patterns and emotional triggers
- **Activity**: Observe disagreements around you (workplace, family, social) without intervening
- **Technique**: Identify when emotions escalate and what triggers defensive responses
- **Reflection**: What patterns do you notice in how people handle disagreements?

### **Day 2: Self-Regulation Practice**
- **Focus**: Practice staying calm during minor disagreements
- **Activity**: When someone disagrees with you, pause before responding
- **Technique**: Use deep breathing and ask yourself "What outcome do I want here?"
- **Reflection**: How does regulating your emotions change the dynamic of disagreements?

### **Day 3: Active Listening in Disagreements**
- **Focus**: Listen to understand opposing viewpoints completely
- **Activity**: In any disagreement, focus entirely on understanding the other person's perspective
- **Technique**: Paraphrase what you heard before sharing your own view
- **Reflection**: How does truly listening change the other person's response to you?

### **Day 4: Empathy During Conflict**
- **Focus**: Practice seeing conflicts from all parties' perspectives
- **Activity**: In any disagreement, ask yourself "What might make them feel this way?"
- **Technique**: Acknowledge others' emotions before addressing the issue
- **Reflection**: How does empathy affect the intensity and resolution of conflicts?

### **Day 5: PEACE Method Application**
- **Focus**: Apply the complete PEACE framework to a real conflict
- **Activity**: Use Pause, Empathize, Acknowledge, Collaborate, Evaluate in one disagreement
- **Technique**: Mentally walk through each step before and during the conflict
- **Reflection**: Which part of the PEACE method was most challenging? Most effective?

### **Day 6: Difficult Conversation Practice**
- **Focus**: Address a conflict you've been avoiding using EI principles
- **Activity**: Have one difficult conversation you've been postponing
- **Technique**: Start with empathy, focus on understanding, collaborate on solutions
- **Reflection**: How did approaching the conversation with EI change the outcome?

### **Day 7: Team Dynamics Improvement**
- **Focus**: Apply EI conflict resolution in group settings
- **Activity**: Facilitate or participate in group problem-solving using EI principles
- **Technique**: Ensure all voices are heard, acknowledge emotions, build consensus
- **Reflection**: How does EI-guided conflict resolution affect overall team dynamics?

## 🛠️ Conflict Resolution Toolkit

### **The PEACE Method in Detail:**

#### **P - Pause**
- Take 3 deep breaths before responding
- Ask yourself: "What outcome do I want from this interaction?"
- Check your emotional state and regulate if needed
- Consider the other person's possible emotional state

#### **E - Empathize**
- Try to understand their perspective and feelings
- Ask yourself: "What might make someone feel or act this way?"
- Consider their background, stress level, and current circumstances
- Look for the valid concerns behind their position

#### **A - Acknowledge**
- Validate their emotions: "I can see this is frustrating for you"
- Acknowledge their perspective: "I understand your concern about..."
- Show respect for their experience even if you disagree
- Create emotional safety before addressing the issue

#### **C - Collaborate**
- Shift from "me vs. you" to "us vs. the problem"
- Ask: "How can we work together to address this?"
- Explore multiple solutions that consider everyone's needs
- Focus on shared goals and mutual interests

#### **E - Evaluate**
- Reflect on the resolution process and outcomes
- Check in on relationships and emotional impact
- Learn from what worked and what could be improved
- Plan for preventing similar conflicts in the future

### **De-escalation Techniques:**
1. **Lower Your Voice**: Speak more softly to encourage the other person to match
2. **Use "I" Statements**: "I feel..." rather than "You always..."
3. **Find Common Ground**: Identify shared goals or values
4. **Ask Questions**: "Help me understand..." instead of making assumptions
5. **Take Breaks**: Pause heated discussions to allow emotions to settle

### **Emotional Validation Phrases:**
- "I can see this is really important to you"
- "It sounds like you're feeling frustrated about..."
- "I understand why you might see it that way"
- "Your concerns make sense given your experience"
- "I appreciate you sharing your perspective"

## 📊 Success Metrics

Track your conflict resolution development:

### **Conflict Outcomes:**
- **Resolution Speed**: Are conflicts resolved more quickly?
- **Relationship Quality**: Are relationships maintained or strengthened through conflicts?
- **Understanding**: Do all parties feel heard and understood?
- **Solution Quality**: Are solutions more creative and mutually satisfactory?

### **Personal Growth:**
- **Emotional Regulation**: How well do you stay calm during disagreements?
- **Empathy**: How effectively do you understand others' perspectives?
- **Communication**: How clearly do you express yourself without attacking?
- **Leadership**: How well do you facilitate resolution when conflicts involve others?

### **Team/Relationship Impact:**
- **Trust**: Do people trust you more to handle conflicts fairly?
- **Openness**: Are people more willing to share concerns with you?
- **Collaboration**: Is teamwork more effective after conflicts are resolved?
- **Prevention**: Are you better at preventing conflicts through early intervention?

## 💬 Conflict Resolution Reflection

**Think back to a recent conflict** and analyze it using your new EI framework:

### **Conflict Analysis:**
- **Situation**: What was the disagreement about?
- **Emotions**: What emotions were you and others experiencing?
- **Response**: How did you handle it? What worked? What didn't?
- **EI Application**: How could you have used emotional intelligence differently?
- **Learning**: What would you do differently now with your EI knowledge?

### **Future Conflict Preparation:**
- **Triggers**: What types of conflicts are most challenging for you?
- **Strategies**: Which EI techniques will you focus on developing?
- **Support**: Who can help you practice and improve your conflict resolution skills?
- **Goals**: What specific improvement do you want to see in how you handle disagreements?

**Write down one thing you'll do differently in future conflicts based on what you've learned about emotional intelligence and conflict resolution.**

Remember: **Conflict is inevitable, but destructive conflict is optional.** With emotional intelligence, you can transform disagreements into opportunities for deeper understanding, stronger relationships, and better solutions.
    """,
    "quiz": json.dumps({
        "questions": [
            {
                "id": 1,
                "question": "What did James focus on during the team meeting to help resolve conflict?",
                "type": "multiple_choice",
                "options": [
                    "Identifying who was right and who was wrong",
                    "Encouraging open sharing of emotions and perspectives",
                    "Setting stricter rules for team behavior",
                    "Threatening consequences for future conflicts"
                ],
                "correct_answer": 1,
                "explanation": "James created a safe space for team members to share their feelings and perspectives openly. This emotional transparency and mutual understanding was key to resolving the underlying tensions."
            },
            {
                "id": 2,
                "question": "Which of the following reflects an emotionally intelligent response to conflict?",
                "type": "multiple_choice",
                "options": [
                    "Avoiding the conflict until it resolves itself",
                    "Creating space for open communication and understanding",
                    "Immediately implementing a solution to stop the disagreement",
                    "Focusing only on the facts and ignoring emotions"
                ],
                "correct_answer": 1,
                "explanation": "Emotionally intelligent conflict resolution involves creating psychological safety for open dialogue, acknowledging emotions, and facilitating mutual understanding before working toward solutions."
            },
            {
                "id": 3,
                "question": "During a disagreement with a colleague, they share that they're feeling overwhelmed. What's an emotionally intelligent way to respond?",
                "type": "multiple_choice",
                "options": [
                    "Tell them they shouldn't feel that way",
                    "Immediately offer solutions to reduce their workload",
                    "Take time to acknowledge their feelings and ask how you can support them",
                    "Change the subject to avoid dealing with their emotions"
                ],
                "correct_answer": 2,
                "explanation": "Acknowledging their feelings first shows empathy and creates emotional safety. Asking how you can support them demonstrates genuine care and opens the door for collaborative problem-solving."
            },
            {
                "id": 4,
                "question": "Which of these are effective EI-based techniques for handling conflicts? (Select all that apply)",
                "type": "multiple_select",
                "options": [
                    "Actively listening without interrupting",
                    "Proving you're right with more evidence",
                    "Respecting others' feelings even if you disagree",
                    "Asking clarifying questions to understand the other person's perspective",
                    "Avoiding eye contact to prevent escalation"
                ],
                "correct_answers": [0, 2, 3],
                "explanation": "Effective EI conflict resolution involves active listening, respecting others' emotions, and seeking to understand their perspective. Proving you're right or avoiding engagement typically escalates rather than resolves conflicts."
            },
            {
                "id": 5,
                "question": "Empathy is only useful in resolving personal conflicts, not workplace disputes.",
                "type": "true_false",
                "correct_answer": False,
                "explanation": "Empathy is equally valuable in workplace conflicts. Understanding colleagues' perspectives, pressures, and emotions can transform professional disagreements into collaborative problem-solving opportunities, as James demonstrated with his team."
            },
            {
                "id": 6,
                "question": "According to the PEACE method, what should you do first when conflict arises?",
                "type": "multiple_choice",
                "options": [
                    "Immediately state your position clearly",
                    "Pause to regulate your emotions and consider the situation",
                    "Ask the other person to explain their viewpoint",
                    "Look for a compromise solution"
                ],
                "correct_answer": 1,
                "explanation": "The PEACE method starts with Pause - taking time to regulate your own emotions and consider the situation before responding. This prevents reactive responses that often escalate conflicts."
            }
        ]
    }),
    "order": 8,  # This should come after the motivation lesson
    "module_number": 2,  # Part of the Emotional Intelligence module
    "is_published": True
}

async def add_lesson_6():
    """Add Lesson 6: Conflict Resolution Using Emotional Intelligence to the database."""
    async with AsyncSession(engine) as session:
        try:
            # Check if lesson already exists
            result = await session.execute(
                text("SELECT COUNT(*) FROM lesson WHERE slug = :slug"), 
                {"slug": LESSON_6_DATA["slug"]}
            )
            existing_count = result.scalar()
            
            if existing_count and existing_count > 0:
                print("✅ Lesson 6: Conflict Resolution already exists. Skipping creation.")
                return
            
            print("🚀 Creating Lesson 6: Conflict Resolution Using Emotional Intelligence...")
            
            # Create lesson object with current timestamp
            lesson = Lesson(
                **LESSON_6_DATA,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            session.add(lesson)
            await session.commit()
            await session.refresh(lesson)
            
            print(f"✅ Successfully created Lesson 6: Conflict Resolution!")
            print(f"   📝 Title: {lesson.title}")
            print(f"   🔗 Slug: {lesson.slug}")
            print(f"   📊 Order: {lesson.order}")
            print(f"   📚 Module: {lesson.module_number} (Emotional Intelligence)")
            print(f"   🆔 ID: {lesson.id}")
            
        except Exception as e:
            print(f"❌ Error creating lesson: {e}")
            raise

async def verify_complete_module():
    """Verify the lesson was created and show complete Module 2 structure."""
    async with AsyncSession(engine) as session:
        # Check our new lesson
        result = await session.execute(
            text("SELECT id, title, slug, \"order\", module_number FROM lesson WHERE slug = :slug"),
            {"slug": LESSON_6_DATA["slug"]}
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
        
        print(f"\n📚 COMPLETE Module 2: Emotional Intelligence")
        print("=" * 50)
        for i, lesson in enumerate(module_2_lessons, 1):
            print(f"   {i}. {lesson.title} (Order: {lesson.order}, ID: {lesson.id})")
        
        print(f"\n🎓 Module 2 now includes {len(module_2_lessons)} comprehensive EI lessons!")
        print("🧠 Complete EI skill coverage: Self-Awareness → Self-Regulation → Empathy → Motivation → Conflict Resolution")

async def main():
    """Main function to add and verify the lesson."""
    print("🎓 Adding Lesson 6: Conflict Resolution Using Emotional Intelligence")
    print("=" * 70)
    
    await add_lesson_6()
    await verify_complete_module()
    
    print("\n" + "=" * 70)
    print("✅ Lesson 6: Conflict Resolution creation completed!")
    print("🌐 You can now view it in your course at: http://localhost:5173")
    print("💡 This lesson focuses on applying EI to transform conflicts into collaboration")
    print("👥 Features James's team leadership story about productive conflict resolution")
    print("🎯 Completes the comprehensive Emotional Intelligence module!")

if __name__ == "__main__":
    asyncio.run(main())
