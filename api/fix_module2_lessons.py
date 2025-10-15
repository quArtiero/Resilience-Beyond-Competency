import asyncio
import json
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.deps import engine
from app.models import Lesson

async def update_module2_lessons():
    """Update Module 2 to have the correct 8 lessons as designed in the frontend"""
    
    async with AsyncSession(engine) as session:
        # First, let's clear existing Module 2 lessons
        print("🗑️  Clearing existing Module 2 lessons...")
        await session.execute(text("""
            DELETE FROM lesson_completion 
            WHERE lesson_id IN (SELECT id FROM lesson WHERE module_number = 2)
        """))
        await session.execute(text("DELETE FROM lesson WHERE module_number = 2"))
        await session.commit()
        
        # Define the 8 lessons for Module 2 as shown in frontend
        module2_lessons = [
            {
                "order": 3,
                "title": "Welcome to Emotional Intelligence",
                "content": """# Welcome to Emotional Intelligence

## Introduction to EQ

Emotional Intelligence (EQ) is your ability to recognize, understand, and manage emotions effectively. This module will transform how you interact with yourself and others.

### What You'll Learn

In this comprehensive module on Emotional Intelligence, you'll discover:

1. **The foundations of emotional intelligence** - Understanding the core components
2. **Why EQ matters more than IQ** - The research and real-world applications
3. **Self-awareness techniques** - Methods to recognize your emotional patterns
4. **Emotion regulation strategies** - Tools to manage your emotional responses
5. **Empathy development** - Building deeper connections with others
6. **Motivation and resilience** - Using emotions to fuel positive action
7. **Conflict resolution** - Navigating disagreements with emotional wisdom
8. **Practical application** - Implementing EQ in your daily life

### The Journey Ahead

This module is designed as a progressive journey. Each lesson builds upon the previous one, creating a comprehensive understanding of emotional intelligence.

Remember: Emotional intelligence is a skill that can be developed at any age. With practice and dedication, you can significantly improve your EQ.""",
                "reflection": "Think about a recent situation where emotions played a significant role. How did you handle it? What would you do differently now?",
                "challenge": "For the next 24 hours, practice naming your emotions as they arise. Simply pause and identify: 'I am feeling [emotion] because [reason].'",
                "quiz": {
                    "questions": [
                        {
                            "type": "multiple_choice",
                            "question": "What does EQ stand for?",
                            "options": ["Emotional Quotient", "Energy Quality", "Equal Questions", "Expert Qualification"],
                            "correct": 0
                        }
                    ]
                }
            },
            {
                "order": 4,
                "title": "The Importance of Emotional Intelligence",
                "content": """# The Importance of Emotional Intelligence

## Why EQ Matters More Than Ever

Research shows that emotional intelligence is responsible for 58% of success in all job types. It's the single biggest predictor of performance and the strongest driver of leadership and personal excellence.

### The Science Behind EQ

Studies from Harvard, Stanford, and Carnegie Foundation show that 85% of career success comes from well-developed soft skills, with only 15% from technical knowledge.

### Key Benefits of High EQ

1. **Better Relationships** - Deeper connections and understanding
2. **Improved Decision Making** - Less reactive, more thoughtful choices
3. **Enhanced Leadership** - Inspire and motivate others effectively
4. **Stress Management** - Better coping mechanisms for challenges
5. **Increased Empathy** - Understanding others' perspectives
6. **Greater Self-Awareness** - Know your triggers and patterns
7. **Conflict Resolution** - Navigate disagreements constructively
8. **Career Advancement** - Stand out in the workplace

### Real-World Impact

People with high EQ earn $29,000 more annually on average. They're promoted more frequently and report higher job satisfaction.""",
                "reflection": "Consider your current relationships and career. Where could improved emotional intelligence make the biggest difference?",
                "challenge": "Interview someone you admire about how they handle emotions in challenging situations. Take notes on their strategies.",
                "quiz": {
                    "questions": [
                        {
                            "type": "true_false",
                            "question": "Emotional intelligence is a fixed trait that cannot be improved.",
                            "correct": false
                        }
                    ]
                }
            },
            {
                "order": 5,
                "title": "Developing Self-Awareness",
                "content": """# Developing Self-Awareness

## The Foundation of Emotional Intelligence

Self-awareness is the cornerstone of EQ. It's your ability to recognize and understand your emotions as they occur, and comprehend how they affect your thoughts and behavior.

### The Three Pillars of Self-Awareness

1. **Emotional Awareness** - Recognizing emotions in real-time
2. **Accurate Self-Assessment** - Knowing your strengths and limitations
3. **Self-Confidence** - Being secure in your worth and capabilities

### Techniques for Building Self-Awareness

#### 1. Mindfulness Meditation
- Practice 10 minutes daily
- Focus on present-moment awareness
- Notice thoughts and feelings without judgment

#### 2. Emotional Journaling
- Write about emotional experiences daily
- Identify patterns and triggers
- Track emotional responses over time

#### 3. Body Scan Technique
- Notice physical sensations linked to emotions
- Understand how emotions manifest physically
- Develop early warning system for emotional states

#### 4. Feedback Seeking
- Ask trusted friends for honest input
- Be open to constructive criticism
- Use 360-degree feedback when possible

### The Window of Tolerance

Understanding your emotional range and when you're operating optimally versus when you're triggered is crucial for self-management.""",
                "reflection": "What are three emotions you struggle to recognize in yourself? How might better awareness of these emotions help you?",
                "challenge": "Keep an emotion log for one week. Note the emotion, trigger, intensity (1-10), and your response. Look for patterns.",
                "quiz": {
                    "questions": [
                        {
                            "type": "multiple_choice",
                            "question": "Which is NOT a pillar of self-awareness?",
                            "options": ["Emotional Awareness", "Social Media Presence", "Accurate Self-Assessment", "Self-Confidence"],
                            "correct": 1
                        }
                    ]
                }
            },
            {
                "order": 6,
                "title": "Managing Emotions (Self-Regulation)",
                "content": """# Managing Emotions (Self-Regulation)

## Mastering Your Emotional Responses

Self-regulation is your ability to manage disruptive emotions and impulses effectively. It's not about suppressing emotions but channeling them constructively.

### Core Components of Self-Regulation

1. **Emotional Self-Control** - Managing disruptive impulses
2. **Adaptability** - Flexibility in face of change
3. **Achievement Orientation** - Drive to improve
4. **Positive Outlook** - Persistence despite setbacks

### Practical Regulation Strategies

#### The STOP Technique
- **S**top what you're doing
- **T**ake a breath
- **O**bserve your thoughts and feelings
- **P**roceed with awareness

#### Cognitive Reframing
Transform negative thoughts into balanced perspectives:
- "This is terrible" → "This is challenging but manageable"
- "I can't handle this" → "I can learn to handle this"
- "Everything is ruined" → "This is a setback I can recover from"

#### The 6-Second Rule
The chemical rush of emotion lasts about 6 seconds. Count to 6 before responding to allow the initial wave to pass.

### Advanced Techniques

1. **Emotional Labeling** - Name emotions to tame them
2. **Distress Tolerance** - Skills for crisis situations
3. **Opposite Action** - Act opposite to emotional urge when unhelpful
4. **Self-Soothing** - Healthy ways to calm yourself""",
                "reflection": "What emotion do you find hardest to regulate? What typically triggers it and how do you currently cope?",
                "challenge": "Practice the STOP technique 5 times this week when you feel strong emotions arising. Document the results.",
                "quiz": {
                    "questions": [
                        {
                            "type": "true_false",
                            "question": "Self-regulation means suppressing all negative emotions.",
                            "correct": false
                        }
                    ]
                }
            },
            {
                "order": 7,
                "title": "Building Empathy",
                "content": """# Building Empathy

## Understanding and Connecting with Others

Empathy is your ability to understand and share the feelings of others. It's the bridge between self-awareness and social skills.

### Types of Empathy

1. **Cognitive Empathy** - Understanding others' thoughts and perspectives
2. **Emotional Empathy** - Feeling what others feel
3. **Compassionate Empathy** - Being moved to help others

### Developing Empathetic Skills

#### Active Listening Techniques
- Give full attention (no phones!)
- Use eye contact and open body language
- Reflect back what you hear
- Ask clarifying questions
- Avoid immediately offering solutions

#### Perspective-Taking Exercises
1. **The Empty Chair** - Imagine the other person's viewpoint
2. **Role Reversal** - Mentally switch positions in conflicts
3. **Cultural Immersion** - Learn about different backgrounds
4. **Story Sharing** - Listen to others' life experiences

### Empathy Blockers to Avoid

- Judging too quickly
- Offering unsolicited advice
- Comparing their experience to yours
- Minimizing their feelings
- Being distracted or preoccupied

### Building Empathy Daily

- Practice curiosity about others' experiences
- Read fiction to understand different perspectives
- Volunteer to connect with diverse groups
- Ask "How are you really?" and listen deeply""",
                "reflection": "Think of someone you find difficult to empathize with. What might be blocking your empathy? How could you overcome this?",
                "challenge": "Have three conversations this week where you focus entirely on understanding the other person without offering advice or sharing your own experiences.",
                "quiz": {
                    "questions": [
                        {
                            "type": "multiple_choice",
                            "question": "Which type of empathy involves feeling what others feel?",
                            "options": ["Cognitive Empathy", "Emotional Empathy", "Compassionate Empathy", "Practical Empathy"],
                            "correct": 1
                        }
                    ]
                }
            },
            {
                "order": 8,
                "title": "Motivation and Resilience Through EQ",
                "content": """# Motivation and Resilience Through EQ

## Harnessing Emotions for Success

Emotional intelligence fuels intrinsic motivation and builds resilience. Learn to use your emotions as a source of energy and direction.

### The Motivation-Emotion Connection

Emotions are the fuel for motivation. Positive emotions broaden possibilities while managed negative emotions can drive necessary change.

### Building Intrinsic Motivation

#### 1. Connect to Your Values
- Identify core values driving you
- Align goals with personal values
- Use values as decision filters

#### 2. Cultivate Growth Mindset
- View challenges as opportunities
- Embrace "not yet" instead of "can't"
- Celebrate effort over outcome

#### 3. Find Your Flow States
- Identify activities that fully engage you
- Create conditions for flow
- Use flow to recharge motivation

### Emotional Resilience Strategies

#### The Resilience Formula
**Resilience = (Self-Awareness + Self-Regulation + Optimism + Mental Agility) × Social Support**

#### Building Emotional Reserves
1. **Gratitude Practice** - Daily appreciation builds positivity
2. **Meaning-Making** - Find purpose in challenges
3. **Social Connection** - Maintain support networks
4. **Self-Compassion** - Treat yourself kindly in setbacks
5. **Hope Building** - Create pathways to goals

### Bouncing Forward, Not Back

True resilience isn't returning to baseline—it's growing stronger through adversity.""",
                "reflection": "What emotional patterns help or hinder your motivation? How can you leverage EQ to maintain drive during difficult times?",
                "challenge": "Create a 'Resilience Ritual' - a set of 3-5 practices you'll do daily this week to build emotional reserves.",
                "quiz": {
                    "questions": [
                        {
                            "type": "true_false",
                            "question": "Resilience means bouncing back to exactly where you were before a setback.",
                            "correct": false
                        }
                    ]
                }
            },
            {
                "order": 9,
                "title": "Conflict Resolution Using Emotional Intelligence",
                "content": """# Conflict Resolution Using Emotional Intelligence

## Navigating Disagreements with Emotional Wisdom

Conflicts are inevitable, but with high EQ, they become opportunities for growth and stronger relationships.

### The EQ Approach to Conflict

1. **Recognize** - Identify emotions in play (yours and theirs)
2. **Regulate** - Manage your emotional response
3. **Understand** - Seek to comprehend all perspectives
4. **Communicate** - Express needs without attacking
5. **Collaborate** - Find mutually beneficial solutions

### De-escalation Techniques

#### The DESC Script
- **D**escribe the situation objectively
- **E**xpress your feelings and concerns
- **S**pecify desired changes
- **C**onsequences positive outcomes of resolution

#### Emotional Aikido
Like the martial art, redirect emotional energy rather than meeting force with force:
- Acknowledge their emotions
- Find shared concerns
- Redirect toward solutions

### Managing Difficult Conversations

#### Before the Conversation
- Check your emotional state
- Set positive intentions
- Prepare key points calmly
- Consider their perspective

#### During the Conversation
- Use "I" statements
- Listen for emotions behind words
- Take breaks if emotions escalate
- Focus on interests, not positions

### Building Bridges, Not Walls

Remember: The goal isn't to win but to understand and find solutions that work for everyone involved.""",
                "reflection": "Think of a recent conflict. How could applying EQ principles have changed the outcome?",
                "challenge": "Practice the DESC script with a minor conflict this week. Notice how structure helps manage emotions.",
                "quiz": {
                    "questions": [
                        {
                            "type": "multiple_choice",
                            "question": "In the DESC script, what does 'S' stand for?",
                            "options": ["Sympathize", "Specify", "Surrender", "Strategize"],
                            "correct": 1
                        }
                    ]
                }
            },
            {
                "order": 10,
                "title": "Final Project: Emotional Intelligence Action Plan",
                "content": """# Final Project: Emotional Intelligence Action Plan

## Putting It All Together

Create a comprehensive EQ development plan tailored to your unique needs and goals.

### Your EQ Assessment

#### Current State Analysis
Rate yourself (1-10) in each area:
- Self-Awareness: ___
- Self-Regulation: ___
- Motivation: ___
- Empathy: ___
- Social Skills: ___

#### Identify Growth Areas
Select 2-3 areas for focused development based on:
- Lowest scores
- Most impact on your goals
- Personal interest

### 30-Day Action Plan

#### Week 1: Foundation Building
- Daily emotion check-ins (3x)
- Mindfulness practice (10 min)
- Emotion journaling (evening)

#### Week 2: Skill Development
- Practice one regulation technique daily
- Active listening in 2 conversations
- Seek feedback from one person

#### Week 3: Application
- Use EQ in one challenging situation
- Practice empathy with difficult person
- Navigate one conflict mindfully

#### Week 4: Integration
- Reflect on progress
- Adjust strategies
- Plan next 30 days

### Success Metrics

Define how you'll measure progress:
- Behavioral changes observed
- Feedback from others
- Personal satisfaction scores
- Specific situation outcomes

### Your EQ Vision

Write a statement describing your ideal emotionally intelligent self one year from now.""",
                "reflection": "What's the single biggest change you want to make in your emotional intelligence? What's the first step?",
                "challenge": "Complete your full 30-day action plan and commit to starting tomorrow. Share with an accountability partner.",
                "quiz": {
                    "questions": [
                        {
                            "type": "true_false",
                            "question": "Developing emotional intelligence is a one-time achievement rather than an ongoing process.",
                            "correct": false
                        }
                    ]
                }
            }
        ]
        
        # Now create the lessons
        print("✨ Creating 8 lessons for Module 2: Emotional Intelligence")
        for lesson_data in module2_lessons:
            quiz_json = json.dumps(lesson_data['quiz'])
            
            lesson = Lesson(
                slug=f"lesson-{lesson_data['order']}-{lesson_data['title'].lower().replace(' ', '-')}",
                title=lesson_data['title'],
                story=lesson_data['content'],
                reflection=lesson_data['reflection'],
                challenge=lesson_data['challenge'],
                quiz=quiz_json,
                order=lesson_data['order'],
                module_number=2,
                is_published=True,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            session.add(lesson)
            print(f"  ✅ Created Lesson {lesson_data['order']}: {lesson_data['title']}")
        
        await session.commit()
        
        # Now we need to update the order of other lessons to accommodate
        print("\n🔄 Updating order of subsequent modules...")
        
        # Module 3 lessons should now be orders 11-12
        await session.execute(text("""
            UPDATE lesson SET "order" = 11 WHERE title = 'Breaking Mental Patterns'
        """))
        await session.execute(text("""
            UPDATE lesson SET "order" = 12 WHERE title = 'Reframing Challenges'
        """))
        
        # Module 4 lessons should now be orders 13-14
        await session.execute(text("""
            UPDATE lesson SET "order" = 13 WHERE title = 'The Psychology of Persistence'
        """))
        await session.execute(text("""
            UPDATE lesson SET "order" = 14 WHERE title = 'Overcoming Setbacks'
        """))
        
        # Module 5 lessons should now be orders 15-16
        await session.execute(text("""
            UPDATE lesson SET "order" = 15 WHERE title = 'Embracing Uncertainty'
        """))
        await session.execute(text("""
            UPDATE lesson SET "order" = 16 WHERE title = 'Adaptive Leadership'
        """))
        
        # Module 6 lessons should now be orders 17-18
        await session.execute(text("""
            UPDATE lesson SET "order" = 17 WHERE title = 'Integrating Your Learning'
        """))
        await session.execute(text("""
            UPDATE lesson SET "order" = 18 WHERE title = 'Your Personal Action Plan'
        """))
        
        await session.commit()
        
        print("  ✅ Updated lesson order for all subsequent modules")
        
        # Verify the changes
        print("\n📊 Verification - New Course Structure:")
        result = await session.execute(text("""
            SELECT module_number, "order", title
            FROM lesson
            ORDER BY "order"
        """))
        
        current_module = 0
        for row in result.fetchall():
            if row[0] != current_module:
                current_module = row[0]
                print(f"\n  Module {current_module}:")
            print(f"    Lesson {row[1]:2d}: {row[2]}")
        
        print("\n🎉 Successfully updated Module 2 with 8 comprehensive lessons!")
        print("   The database now matches your frontend design.")

if __name__ == "__main__":
    asyncio.run(update_module2_lessons())
